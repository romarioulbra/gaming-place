import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { sugestaoId: string } }
) {
  try {
    const body = await request.json();
    const id = parseInt(params.sugestaoId);

    if (isNaN(id)) {
      return new NextResponse("ID inválido", { status: 400 });
    }

    const sugestaoAtualizada = await prisma.sugestao_melhoria.update({
      where: { sugestao_melhoria_id: id }, // <- CORREÇÃO AQUI
      data: {
        sugestao_melhoria_status: body.status,
      },
    });

    return NextResponse.json(sugestaoAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar sugestão:", error);
    return new NextResponse("Erro interno ao atualizar sugestão", { status: 500 });
  }
}


// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { sugestaoId: string } }
// ) {
//   try {
//     const body = await request.json();
//     const id = parseInt(params.sugestaoId);

//     if (isNaN(id)) {
//       return new NextResponse("ID inválido", { status: 400 });
//     }

//     // 1. Primeiro atualiza o status da sugestão
//     const sugestaoAtualizada = await prisma.sugestao_melhoria.update({
//       where: { sugestao_melhoria_id: id },
//       data: {
//         sugestao_melhoria_status: body.status,
//       },
//       include: {
//         usuario: {
//           include: {
//             perfis: true, // Inclui o perfil do usuário associado
//           },
//         },
//       },
//     });

//     // 2. Verifica se o novo status é "validada" e se há um usuário associado
//     if (body.status === "validada" && sugestaoAtualizada.usuario) {
//       const perfilUsuario = sugestaoAtualizada.usuario.perfis[0]; // Pega o primeiro perfil

//       if (perfilUsuario) {
//         // 3. Incrementa os pontos (ATENÇÃO: verifique se o perfil já foi premiado antes)
//         await prisma.perfis.update({
//           where: { perfil_id: perfilUsuario.perfil_id },
//           data: {
//             perfil_pontos: {
//               increment: 100,
//             },
//           },
//         });
//       }
//     }

//     return NextResponse.json(sugestaoAtualizada);
//   } catch (error) {
//     console.error("Erro ao atualizar sugestão:", error);
//     return new NextResponse("Erro interno ao atualizar sugestão", { status: 500 });
//   }
// }