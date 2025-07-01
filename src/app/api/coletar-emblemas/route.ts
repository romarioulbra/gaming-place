// /app/api/coletar-emblemas/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { usuarioId, emblemaId } = await req.json();

    if (!usuarioId || !emblemaId) {
      return NextResponse.json(
        { error: "IDs de usuário e emblema são obrigatórios" },
        { status: 400 }
      );
    }

    const resultado = await prisma.$transaction(async (prisma) => {
      // 1. Busca o emblema do usuário e os dados do emblema base
      const emblemaUsuario = await prisma.usuario_tipo_emblema.findFirst({
        where: {
          usuarioId: Number(usuarioId),
          tipoEmblemaId: Number(emblemaId),
          usuario_emblema_status: "DESBLOQUEADO"
        },
        include: {
          tipoEmblema: {
            include: {
              emblema: true
            }
          }
        }
      });

      if (!emblemaUsuario || !emblemaUsuario.tipoEmblema?.emblema) {
        throw new Error("Emblema não encontrado ou já bloqueado");
      }

      const emblemaBase = emblemaUsuario.tipoEmblema.emblema;
      const pontosAtuais = emblemaUsuario.usuario_emblema_pontos;
      const pontosAcumulativosAtuais = emblemaUsuario.usuario_emblemas_pontos_acumulativo || 0;
      let novosPontosAcumulativos = pontosAcumulativosAtuais + pontosAtuais;
      let nivelAumentado = false;
      let novoNivel: number | null = null;

      // 2. Verifica se deve aumentar o nível
      const deveAumentarNivel = novosPontosAcumulativos >= emblemaBase.emblemas_pontos;
      
      if (deveAumentarNivel) {
        // Busca o nível atual primeiro
        const perfilAtual = await prisma.perfis.findFirst({
          where: { usuario: Number(usuarioId) }
        });
        
        if (!perfilAtual) {
          throw new Error("Perfil do usuário não encontrado");
        }

        const nivelAtual = perfilAtual.perfil_nivel || 0;
        const niveisAumentar = Math.floor(novosPontosAcumulativos / emblemaBase.emblemas_pontos);
        novoNivel = nivelAtual + niveisAumentar;
        
        // Atualiza o nível do perfil
        await prisma.perfis.updateMany({
          where: { usuario: Number(usuarioId) },
          data: {
            perfil_nivel: novoNivel
          }
        });

        // Zera os pontos acumulativos
        novosPontosAcumulativos = 0;
        nivelAumentado = true;
      }

      // 3. Atualiza o emblema do usuário
      const emblemaAtualizado = await prisma.usuario_tipo_emblema.update({
        where: { usuario_emblema_id: emblemaUsuario.usuario_emblema_id },
        data: {
          usuario_emblema_status: "BLOQUEADO",
          usuario_emblemas_pontos_acumulativo: novosPontosAcumulativos,
          usuario_emblema_pontos: 0
        }
      });

      // 4. Atualiza os pontos do perfil
      await prisma.perfis.updateMany({
        where: { usuario: Number(usuarioId) },
        data: {
          perfil_pontos: {
            increment: pontosAtuais
          }
        }
      });

      return {
        pontosTransferidos: pontosAtuais,
        novosAcumulativos: novosPontosAcumulativos,
        nivelAumentado,
        novoNivel
      };
    });

    return NextResponse.json({
      success: true,
      data: resultado
    });

  } catch (error: any) {
    console.error("Erro detalhado:", {
      message: error.message,
      stack: error.stack
    });

    return NextResponse.json(
      {
        error: "Erro ao processar a coleta",
        debug: error.message
      },
      { status: 500 }
    );
  }
}