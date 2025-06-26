import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ sugestaoId: string }> }
) {
  try {
    // Acesso direto aos parâmetros (Next.js 15)
    const id = Number((await params).sugestaoId);
    
    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    
    if (!body.status || !['validada', 'rejeitada', 'enviada'].includes(body.status)) {
      return NextResponse.json(
        { error: "Status inválido ou não fornecido" },
        { status: 400 }
      );
    }

    // Busca a sugestão existente com relacionamentos
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
      return NextResponse.json(
        { error: "Sugestão não encontrada" },
        { status: 404 }
      );
    }

    // Atualização principal
    const sugestaoAtualizada = await prisma.sugestao_melhoria.update({
      where: { sugestao_melhoria_id: id },
      data: { sugestao_melhoria_status: body.status },
    });

    // Lógica de pontos e emblemas
    if (body.status === "validada" && 
        sugestaoExistente.sugestao_melhoria_status !== "validada") {
      
      if (sugestaoExistente.usuario?.perfis?.length > 0) {
        const perfilUsuario = sugestaoExistente.usuario.perfis[0];
        const pontosIncremento = 100;

        await prisma.$transaction(async (tx) => {
          // Atualização de pontos
          await tx.perfis.update({
            where: { perfil_id: perfilUsuario.perfil_id },
            data: { perfil_pontos: { increment: pontosIncremento } },
          });

          // Lógica de emblema (opcional)
          const novoTotalPontos = perfilUsuario.perfil_pontos + pontosIncremento;
          const emblemaAtual = perfilUsuario.emblema;
          
          const emblemaSuperior = await tx.emblemas.findFirst({
            where: {
              emblemas_pontos: {
                gt: emblemaAtual ? parseInt(emblemaAtual.toString()) : 0,
                lte: novoTotalPontos,
              },
            },
            orderBy: { emblemas_pontos: 'asc' },
          });

          if (emblemaSuperior) {
            await tx.perfis.update({
              where: { perfil_id: perfilUsuario.perfil_id },
              data: { emblema: emblemaSuperior.emblema_id },
            });
          }
        });
      }
    }

    return NextResponse.json(sugestaoAtualizada);
    
  } catch (error) {
    console.error("Erro ao atualizar sugestão:", error);
    return NextResponse.json(
      { 
        error: "Erro interno ao atualizar sugestão",
        details: error instanceof Error ? error.message : null,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}




export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ sugestaoId: string }> }
) {
  try {
    const id = parseInt((await params).sugestaoId);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    // Verifica se existe antes de deletar
    const sugestao = await prisma.sugestao_melhoria.findUnique({
      where: { sugestao_melhoria_id: id },
    });

    if (!sugestao) {
      return NextResponse.json(
        { error: 'Sugestão não encontrada' },
        { status: 404 }
      );
    }

    await prisma.sugestao_melhoria.delete({
      where: { sugestao_melhoria_id: id },
    });

    // Retorna resposta JSON explícita
    return NextResponse.json(
      { success: true, message: 'Sugestão excluída com sucesso' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao excluir sugestão:', error);
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}