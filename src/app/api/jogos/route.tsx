'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
// Função de Listagem de Dados
export async function GET() {
  try {
    const jogos = await prisma.jogos.findMany({
      select: {
        jogos_id: true,
        jogos_nome: true,
        jogos_descricao: true,
        jogos_link: true,
        jogos_url_img: true,
      },
    });
    return NextResponse.json(jogos, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar Jogos:', error.message);
    return NextResponse.json(
      { error: 'Erro ao buscar Jogos', details: error.message },
      { status: 500 }
    );
  }
}


// Função de Inserção de Dados
export async function POST(req: Request) {
  // const { jogos_nome,jogos_descricao,jogos_link,jogos_url_img,categoria_jogo_id  } = await req.json();
  const { jogos_nome,jogos_descricao,jogos_link,jogos_url_img } = await req.json();

  try {
    const newJogos = await prisma.jogos.create({
      data: {
       jogos_nome,
       jogos_descricao,
       jogos_link,
       jogos_url_img,
      },
    });


    // const newJogos = await prisma.jogos.create({
    //   data: {
    //    jogos_nome,
    //    jogos_descricao,
    //    jogos_link,
    //    jogos_url_img,
    //    jogos_categorias: {
    //     connect: {
    //       categoria_jogo_id: Number(categoria_jogo_id),
    //     },
    //   },
    //   },
    // });

    return NextResponse.json(newJogos, { status: 201 });
  } catch (error) {
   console.error('Erro ao criar novo Jogo:', error);
    return NextResponse.json({ error: 'Erro ao criar Jogo.' }, { status: 500 });
  }
}



// Função de Alteração de Dados
export async function PUT(req: Request) {
  const { jogos_nome,jogos_descricao,jogos_link,jogos_url_img } = await req.json();

  try {
    const updatedCatJogos = await prisma.jogos.update({
      where: { jogos_id: Number(jogos_id) },
      data: {
        jogos_nome,
        jogos_descricao,
        jogos_link,
        jogos_url_img
      },
    });

    return NextResponse.json(updatedCatJogos, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar os Jogos', error);
    return NextResponse.json({ error: 'Erro ao atualizar Jogos.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


// Função de Exclusão de Dados
export async function DELETE(req: Request) {
  
  const { searchParams } = new URL(req.url);
  
  const jogos_id = searchParams.get("jogos_id"); // Captura o ID do registro a ser excluído

  if (!jogos_id || isNaN(Number(jogos_id))) {
    return NextResponse.json({ error: "ID inválido ou não fornecido" }, { status: 400 });
  }

  try {
    await prisma.jogos.delete({
      where: { jogos_id: Number(jogos_id) },
    });

    return NextResponse.json({ message: "Registro excluído com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir o registro:', error);
    return NextResponse.json({ error: 'Erro ao excluir registro.' }, { status: 500 });
  } 
  // finally {
  //   // await prisma.$disconnect();
  // }
}

