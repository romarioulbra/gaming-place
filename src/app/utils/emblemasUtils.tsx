import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para buscar todos os jogos com suas categorias
export async function getTodosEmblemas() {
  try {
    return await prisma.emblemas.findMany({
      select: {
        emblema_id: true,
        emblema_nome: true,
        emblema_criterio: true,
        emblema_imagem: true,
        emblemas_pontos: true,
        emblemas_status: true,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar Emblemas:", error);
    throw new Error("Erro ao buscar Emblemas");
  }
}

// Função para contar o total de Emblemas
export async function getTotalEmblemas() {
  try {
    return await prisma.emblemas.count();
  } catch (error) {
    console.error("Erro ao contar Emblemas:", error);
    throw new Error("Erro ao contar Emblemas");
  }
}

