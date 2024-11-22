'use server';

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Inicialize o Prisma
const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { usuario_id: string } }) {
  try {
    console.log("Iniciando PUT...");
    console.log("Parâmetros recebidos:", params);

    const body = await req.json();
    console.log("Dados recebidos no body:", body);

    // Verifique se o ID é válido
    if (isNaN(Number(params.usuario_id))) {
      return NextResponse.json(
        { error: "ID inválido fornecido" },
        { status: 400 }
      );
    }

    // Atualizar no banco de dados
    const usuarioAtualizado = await prisma.usuarios.update({
      where: { usuario_id: Number(params.usuario_id) },
      data: body,
    });

    console.log("Categoria atualizada com sucesso:", usuarioAtualizado);

    return NextResponse.json(usuarioAtualizado);
  } catch (error: any) {
    console.error("Erro ao atualizar categoria:", error);

    return NextResponse.json(
      { error: error.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
