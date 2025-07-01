// // /app/api/ecoletar-emblemas/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { usuarioId, pontos } = await req.json();

//     // Validação dos dados
//     if (!usuarioId || pontos === undefined) {
//       return NextResponse.json(
//         { error: "Usuário e pontos são obrigatórios." },
//         { status: 400 }
//       );
//     }

//     const pontosNumber = Number(pontos);
//     if (isNaN(pontosNumber)) {
//       return NextResponse.json(
//         { error: "Pontos devem ser um número válido." },
//         { status: 400 }
//       );
//     }

//     // Primeiro encontra o perfil pelo usuarioId
//     const perfil = await prisma.perfis.findFirst({
//       where: { usuario: Number(usuarioId) }
//     });

//     if (!perfil) {
//       return NextResponse.json(
//         { error: "Perfil do usuário não encontrado." },
//         { status: 404 }
//       );
//     }

//     // Atualiza usando o perfil_id como chave única
//     const perfilAtualizado = await prisma.perfis.update({
//       where: { perfil_id: perfil.perfil_id },
//       data: {
//         perfil_pontos: {
//           increment: pontosNumber,
//         },
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       pontosAtuais: perfilAtualizado.perfil_pontos,
//     });

//   } catch (error) {
//     console.error("Erro detalhado:", error);
//     return NextResponse.json(
//       { 
//         error: "Erro interno ao atualizar pontos.",
//         details: error instanceof Error ? error.message : String(error)
//       },
//       { status: 500 }
//     );
//   }
// }

// /app/api/ecoletar-emblemas/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { usuarioId, emblemaId } = await req.json();

    // Validação rigorosa
    if (!usuarioId || !emblemaId) {
      return NextResponse.json(
        { error: "IDs de usuário e emblema são obrigatórios" },
        { status: 400 }
      );
    }

    // Transação atômica com tratamento completo
    const resultado = await prisma.$transaction(async (prisma) => {
      // 1. Busca o emblema do usuário
      const emblemaUsuario = await prisma.usuario_tipo_emblema.findFirst({
        where: {
          usuarioId: Number(usuarioId),
          tipoEmblemaId: Number(emblemaId),
          usuario_emblema_status: "DESBLOQUEADO"
        }
      });

      if (!emblemaUsuario) {
        throw new Error("Emblema não encontrado ou já bloqueado");
      }

      // 2. Atualiza o emblema
      const emblemaAtualizado = await prisma.usuario_tipo_emblema.update({
        where: { usuario_emblema_id: emblemaUsuario.usuario_emblema_id },
        data: {
          usuario_emblema_status: "BLOQUEADO",
          usuario_emblemas_pontos_acumulativo: {
            increment: emblemaUsuario.usuario_emblema_pontos
          },
          usuario_emblema_pontos: 0
        }
      });

      // 3. Atualiza o perfil (CORREÇÃO: usando 'usuario' ao invés de 'usuarioId')
      await prisma.perfis.updateMany({
        where: { usuario: Number(usuarioId) }, // <<< CORREÇÃO AQUI
        data: {
          perfil_pontos: {
            increment: emblemaUsuario.usuario_emblema_pontos
          }
        }
      });

      return {
        pontosTransferidos: emblemaUsuario.usuario_emblema_pontos,
        novosAcumulativos: emblemaAtualizado.usuario_emblemas_pontos_acumulativo
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