import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para buscar todos os jogos com suas categorias
export async function getTodosCatJogos() {
  try {
    return await prisma.categoria_jogos.findMany({
      select: {
        categoria_jogo_id: true,
        categoria_jogo_area_atuacao: true,
        categoria_jogo_icone: true,
      },
  
    });
  } catch (error) {
    console.error("Erro ao buscar categorias de jogos:", error);
    throw new Error("Erro ao buscar categorias de jogos");
  }
}

// Função para contar o total de jogos
export async function getTotalCatJogos() {
  try {
    return await prisma.categoria_jogos.count();
  } catch (error) {
    console.error("Erro ao contar categorias de jogos:", error);
    throw new Error("Erro ao contar categorias de jogos");
  }
}
