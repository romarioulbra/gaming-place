// /app/api/emblemas-desbloqueados/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const usuarioId = Number(searchParams.get("usuarioId"));

  if (!usuarioId) {
    return NextResponse.json({ error: "Usuário não informado." }, { status: 400 });
  }

  try {
    // Busca todos os emblemas do sistema
    const todosEmblemas = await prisma.emblemas.findMany();
    
    // Busca os emblemas do usuário com seus status e pontos
    const emblemasUsuario = await prisma.usuario_tipo_emblema.findMany({
      where: { usuarioId },
      include: {
        tipoEmblema: {
          include: {
            emblema: true
          }
        }
      }
    });

    // Combina os dados
    const emblemasFormatados = todosEmblemas.map((emblema) => {
      const registroUsuario = emblemasUsuario.find(
        eu => eu.tipoEmblema?.emblema_id === emblema.emblema_id
      );

      if (!registroUsuario) {
        return {
          ...emblema,
          desbloqueado: false,
          pontos: 0,
          pontos_acumulativos: 0,
          status: "BLOQUEADO",
          coletado: false
        };
      }

    const desbloqueado = registroUsuario.usuario_emblema_status === "DESBLOQUEADO";
    const coletado = registroUsuario.usuario_emblema_status === "BLOQUEADO" && 
                   registroUsuario.usuario_emblema_pontos === 0;

      return {
       ...emblema,
        desbloqueado,
        pontos: desbloqueado ? registroUsuario.usuario_emblema_pontos : 0,
        pontos_acumulativos: registroUsuario.usuario_emblemas_pontos_acumulativo,
        status: registroUsuario.usuario_emblema_status,
        coletado
      };
    });

    return NextResponse.json({ emblemas: emblemasFormatados });
  } catch (error) {
    console.error("Erro ao buscar emblemas:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}