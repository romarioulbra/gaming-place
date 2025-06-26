// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { usuarioId, tipoEmblemaId } = await req.json();

//     // Busca pontos acumulados para esse tipo de emblema
//     const usuarioEmblema = await prisma.usuario_tipo_emblema.findFirst({
//       where: { usuarioId, tipoEmblemaId },
//     });

//     if (!usuarioEmblema || usuarioEmblema.usuario_emblema_pontos <= 0) {
//       return NextResponse.json({ error: "Nenhum ponto a coletar." }, { status: 400 });
//     }

//     const pontosColetados = usuarioEmblema.usuario_emblema_pontos;

//     // Atualiza os pontos no perfil
//     const perfil = await prisma.perfis.update({
//       where: { usuarioId },
//       data: {
//         perfil_pontos: {
//           increment: pontosColetados,
//         },
//       },
//     });

//     // Verifica se ultrapassou a meta para subir nível
//     const tipoEmblema = await prisma.tipo_emblemas.findUnique({
//       where: { tipo_emblema_id: tipoEmblemaId },
//     });

//     let novoNivel = perfil.perfil_nivel;

//     if (perfil.perfil_pontos >= tipoEmblema?.emblemas_pontos!) {
//       novoNivel += 1;

//       await prisma.perfis.update({
//         where: { usuarioId },
//         data: { perfil_nivel: novoNivel },
//       });
//     }

//     // Reseta os pontos do tipo_emblema após coleta
//     await prisma.usuario_tipo_emblema.updateMany({
//       where: { usuarioId, tipoEmblemaId },
//       data: {
//         usuario_emblema_pontos: 0,
//         usuario_emblema_status: "coletado",
//       },
//     });

//     return NextResponse.json({ sucesso: true, pontosColetados, novoNivel });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Erro ao coletar emblema." }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { usuarioId, pontos } = await req.json();

    // Validação dos dados
    if (!usuarioId || pontos === undefined) {
      return NextResponse.json(
        { error: "Usuário e pontos são obrigatórios." },
        { status: 400 }
      );
    }

    const pontosNumber = Number(pontos);
    if (isNaN(pontosNumber)) {
      return NextResponse.json(
        { error: "Pontos devem ser um número válido." },
        { status: 400 }
      );
    }

    // Primeiro encontra o perfil pelo usuarioId
    const perfil = await prisma.perfis.findFirst({
      where: { usuario: Number(usuarioId) }
    });

    if (!perfil) {
      return NextResponse.json(
        { error: "Perfil do usuário não encontrado." },
        { status: 404 }
      );
    }

    // Atualiza usando o perfil_id como chave única
    const perfilAtualizado = await prisma.perfis.update({
      where: { perfil_id: perfil.perfil_id },
      data: {
        perfil_pontos: {
          increment: pontosNumber,
        },
      },
    });

    return NextResponse.json({
      success: true,
      pontosAtuais: perfilAtualizado.perfil_pontos,
    });

  } catch (error) {
    console.error("Erro detalhado:", error);
    return NextResponse.json(
      { 
        error: "Erro interno ao atualizar pontos.",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}