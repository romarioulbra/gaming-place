'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Função de Listagem de Dados
export async function GET() {
  try {
    const users = await prisma.usuarios.findMany({
      select: {
        usuario_id: true,
        usuario_nome: true,
        usuario_email: true,
        usuario_senha: true,
        usuario_nivel: true,
        usuario_criacao: true,
        usuario_alteracao: true,
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.message);
    return NextResponse.json(
      { error: 'Erro ao buscar usuários', details: error.message },
      { status: 500 }
    );
  }
}


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



// Função de Alteração de Dados
export async function PUT(req: Request) {
  const { usuario_id, usuario_nome, usuario_email, usuario_senha,usuario_nivel } = await req.json();

  try {
    const updatedUsuario = await prisma.usuarios.update({
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
  
  const { searchParams } = new URL(req.url);  
  const usuario_id = searchParams.get("usuario_id"); // Captura o ID do registro a ser excluído

  if (!usuario_id || isNaN(Number(usuario_id))) {
    return NextResponse.json({ error: "ID inválido ou não fornecido" }, { status: 400 });
  }

  try {
    await prisma.usuarios.delete({
      where: { usuario_id: Number(usuario_id) },
    });

    return NextResponse.json({ message: "Registro excluído com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir o registro:', error);
    return NextResponse.json({ error: 'Erro ao excluir registro.' }, { status: 500 });
  } 
}