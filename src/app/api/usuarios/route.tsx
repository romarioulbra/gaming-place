'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';

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
  const { usuario_nome, usuario_email, usuario_senha, usuario_nivel } = await req.json();

  try {
    // Gerar o hash da senha antes de salvar no banco
    const salt = await bcrypt.genSalt(10); // Número de rounds (10 é padrão)
    const hashedPassword = await bcrypt.hash(usuario_senha, salt);

    // Criar o novo usuário com a senha criptografada
    const newUsuario = await prisma.usuarios.create({
      data: {
        usuario_nome,
        usuario_email,
        usuario_senha: hashedPassword, // Salvar a senha criptografada
        usuario_nivel,
      },
    });

    return NextResponse.json(newUsuario, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json({ error: 'Erro ao criar usuário.' }, { status: 500 });
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