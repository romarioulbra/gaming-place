'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Função de Listagem de Dados
export async function GET() {
  try {
    const cat_jogos = await prisma.categoria_jogos.findMany({
      select: {
        categoria_jogo_id: true,
        categoria_jogo_area_atuacao: true,
      },
    });
    return NextResponse.json(cat_jogos, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar Categorias de Jogos:', error.message);
    return NextResponse.json(
      { error: 'Erro ao buscar Categorias de Jogos', details: error.message },
      { status: 500 }
    );
  }
}


// Função de Inserção de Dados
export async function POST(req: Request) {
  const { categoria_jogo_area_atuacao } = await req.json();

  try {
    const newCatJogos = await prisma.categoria_jogos.create({
      data: {
       categoria_jogo_area_atuacao
      },
    });

    return NextResponse.json(newCatJogos, { status: 201 });
  } catch (error) {
   console.error('Erro ao criar nova Categoria de Jogos:', error);
    return NextResponse.json({ error: 'Erro ao criar Categoria de Jogos.' }, { status: 500 });
  }
}



// Função de Alteração de Dados
export async function PUT(req: Request) {
  const { categoria_jogo_id, categoria_jogo_area_atuacao } = await req.json();

  try {
    const updatedCatJogos = await prisma.categoria_jogos.update({
      where: { categoria_jogo_id: Number(categoria_jogo_id) },
      data: {
        categoria_jogo_area_atuacao
      },
    });

    return NextResponse.json(updatedCatJogos, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar Categorias de Jogos', error);
    return NextResponse.json({ error: 'Erro ao atualizar Categorias de Jogos.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


// Função de Exclusão de Dados
export async function DELETE(req: Request) {
  const { categoria_jogo_id } = await req.json();

  try {
    await prisma.categoria_jogos.delete({
      where: { categoria_jogo_id: Number(categoria_jogo_id) },
    });

    return NextResponse.json({ message: 'Categoria de Jogos excluída com sucesso.' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir Categoria de Jogos:', error);
    return NextResponse.json({ error: 'Erro ao excluir Categoria de Jogos.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

