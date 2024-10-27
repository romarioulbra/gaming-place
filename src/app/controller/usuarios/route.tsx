'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Função de Inserção de Dados
export async function POST(req: Request) {
  const { usuario_nome, usuario_email, usuario_senha,usuario_nivel } = await req.json();

  try {
    const newUsuario = await prisma.usuarios.create({
      data: {
        usuario_nome,
        usuario_email,
        usuario_senha,
        usuario_nivel
      },
    });

    return NextResponse.json(newUsuario, { status: 201 });
  } catch (error) {
   console.error('Erro ao criar usuario:', error);
    return NextResponse.json({ error: 'Erro ao criar Usuario.' }, { status: 500 });
  }
}

// Função de Listagem de Dados
export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany(); // Busca todos os registros
    return NextResponse.json(usuarios, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar usuarios:', error);
    return NextResponse.json({ error: 'Erro ao buscar usuarios.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


// Função de Alteração de Dados
export async function PUT(req: Request) {
  const { usuario_id, usuario_nome, usuario_email, usuario_senha,usuario_nivel } = await req.json();

  try {
    const updatedUsuario = await prisma.usuario.update({
      where: { id: Number(usuario_id) },
      data: {
        usuario_nome,
        usuario_email,
        usuario_senha,
        usuario_nivel
      },
    });

    return NextResponse.json(updatedUsuario, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar Usuario:', error);
    return NextResponse.json({ error: 'Erro ao atualizar Usuário.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


// Função de Exclusão de Dados
export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    await prisma.usuario.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Usuário excluído com sucesso.' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return NextResponse.json({ error: 'Erro ao excluir usuário.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

