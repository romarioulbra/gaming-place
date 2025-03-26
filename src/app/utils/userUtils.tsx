import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para buscar todos os usuários
export async function getAllUsuarios() {
  return await prisma.usuarios.findMany({
    select: {
      usuario_id: true,
      usuario_nome: true,
      usuario_email: true,
      usuario_nivel: true,
    },
  });
}

// Função para contar o total de usuários
export async function getTotalUsuarios() {
  return await prisma.usuarios.count();
}
