import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getTodosCatEmblemas() {
  try {
    return await prisma.tipo_emblemas.findMany({
      include: {
        emblema: {
          select: {
            emblema_nome: true, // só traz o nome
          },
        },
      },
    });
  } catch (error) {
    console.error("Erro ao buscar categorias de emblemas:", error);
    throw new Error("Erro ao buscar categorias de emblemas");
  }
}


// Função para contar o total de Emblemas
export async function getTotalCatEmblemas() {
  try {
    return await prisma.tipo_emblemas.count();
  } catch (error) {
    console.error("Erro ao contar Emblemas:", error);
    throw new Error("Erro ao contar Emblemas");
  }
}
