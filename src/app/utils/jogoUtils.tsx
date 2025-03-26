import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para buscar todos os jogos com suas categorias
export async function getTodosJogos() {
  try {
    return await prisma.jogos.findMany({
      select: {
        jogos_id: true,
        jogos_nome: true,
        jogos_descricao: true,
        jogos_link: true,
        jogos_url_img: true,
        jogos_autor: true,
        categoria_jogo_id: true,
        categoria_jogos: { 
          select: {
            categoria_jogo_id: true,
            categoria_jogo_area_atuacao: true,
          }
        }
      },
    });
  } catch (error) {
    console.error("Erro ao buscar jogos:", error);
    throw new Error("Erro ao buscar jogos");
  }
}

// Função para contar o total de jogos
export async function getTotalJogos() {
  try {
    return await prisma.jogos.count();
  } catch (error) {
    console.error("Erro ao contar jogos:", error);
    throw new Error("Erro ao contar jogos");
  }
}
