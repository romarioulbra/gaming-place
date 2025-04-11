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

//     const sugestaoAtualizada = await prisma.sugestao_melhoria.update({
//       where: { sugestao_melhoria_id: id }, // <- CORREÇÃO AQUI
//       data: {
//         sugestao_melhoria_status: body.status,
//       },
//     });

//     return NextResponse.json(sugestaoAtualizada);
//   } catch (error) {
//     console.error("Erro ao atualizar sugestão:", error);
//     return new NextResponse("Erro interno ao atualizar sugestão", { status: 500 });
//   }
// }

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

    // Verifica se a sugestão existe e obtém o status atual e o usuário associado
    const sugestaoExistente = await prisma.sugestao_melhoria.findUnique({
      where: { sugestao_melhoria_id: id },
      include: {
        usuario: {
          include: {
            perfis: true,
          },
        },
      },
    });

    if (!sugestaoExistente) {
      return new NextResponse("Sugestão não encontrada", { status: 404 });
    }

    // Atualiza o status da sugestão
    const sugestaoAtualizada = await prisma.sugestao_melhoria.update({
      where: { sugestao_melhoria_id: id },
      data: {
        sugestao_melhoria_status: body.status,
      },
    });

    // Verifica se:
    // 1. O novo status é "validada"
    // 2. O status anterior NÃO era "validada" (para evitar incrementos múltiplos)
    // 3. Há um usuário associado com perfil
    if (body.status === "validada" && 
        sugestaoExistente.sugestao_melhoria_status !== "validada" && 
        sugestaoExistente.usuario?.perfis?.length > 0) {
      
      const perfilUsuario = sugestaoExistente.usuario.perfis[0];

      // Incrementa os pontos no perfil do usuário
      await prisma.perfis.update({
        where: { perfil_id: perfilUsuario.perfil_id },
        data: {
          perfil_pontos: {
            increment: 100, // Valor a ser incrementado
          },
        },
      });

      // Verifica se o usuário atingiu pontos suficientes para um novo emblema
      const novoTotalPontos = perfilUsuario.perfil_pontos + 100;
      const emblemasDisponiveis = await prisma.emblemas.findMany({
        orderBy: {
          emblemas_pontos: 'asc',
        },
      });

      // Encontra o emblema mais adequado para o novo total de pontos
      const novoEmblema = emblemasDisponiveis.reduce((prev, current) => {
        const prevPontos = parseInt(prev.emblemas_pontos);
        const currentPontos = parseInt(current.emblemas_pontos);
        return (prevPontos <= novoTotalPontos && currentPontos > novoTotalPontos) ? 
               prev : current;
      });

      // Atualiza o emblema do perfil se necessário
      if (novoEmblema.emblema_id !== perfilUsuario.emblema) {
        await prisma.perfis.update({
          where: { perfil_id: perfilUsuario.perfil_id },
          data: {
            emblema: novoEmblema.emblema_id,
          },
        });
      }
    }

    return NextResponse.json(sugestaoAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar sugestão:", error);
    return new NextResponse("Erro interno ao atualizar sugestão", { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      }),
    });
  } finally {
    await prisma.$disconnect();
  }
}