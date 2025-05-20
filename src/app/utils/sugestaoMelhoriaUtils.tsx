import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Função para buscar todos os jogos com suas categorias
export async function getTodosSugMelhoria() {
  try {
    return await prisma.sugestao_melhoria.findMany({
      select: {
        sugestao_melhoria_id: true,
        sugestao_melhoria_nome: true,
        sugestao_melhoria_descricao: true,
        sugestao_melhoria_status: true,
        usuario: {
          select: { usuario_nome: true },
        },
        tipo_emblema: {
          select: { tipo_emblema_criterio: true },
        },
      },
    });
  } catch (error) {
    console.error("Erro ao buscar Sugestão e Melhorias:", error);
    throw new Error("Erro ao buscar Sugestão e Melhorias");
  }
}


// Função para contar o total de Sugestão e Melhoria
export async function getTotalSugMelhoria() {
  try {
    const count = await prisma.sugestao_melhoria.count();
    console.log("Total de sugestões/melhorias:", count);
    return count;
  } catch (error) {
    console.error("Erro ao contar Sugestão e Melhorias:", error);
    throw new Error("Erro ao contar Sugestão e Melhorias");
  }
}
