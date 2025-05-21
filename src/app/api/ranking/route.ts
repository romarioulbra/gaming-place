import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
      // const ranking = await prisma.perfis.findMany({
      //   orderBy: { perfil_pontos: "desc" },
      //   select: {
      //     perfil_id: true,
      //     perfil_imagem: true,
      //     perfil_cidade: true,
      //     perfil_pontos: true,
      //     perfil_nivel: true,
      //     emblema: true,
      //     usuario: {
      //       select: {
      //         usuario_nome: true, // Certifique-se de que Prisma está retornando corretamente
      //       },
      //     },
      //   },
      //   include: {
      //     usuario: true, // Garante que os dados do usuário sejam carregados
      //   },
      // });


      const ranking = await prisma.perfis.findMany({
        orderBy: { perfil_pontos: "desc" },
        select: {
          perfil_id: true,
          perfil_imagem: true,
          perfil_cidade: true,
          perfil_pontos: true,
          perfil_nivel: true,
          emblema: true,
          perfil_usuarios: {  // 🔹 Nome correto da relação no Prisma
            select: {
              usuario_nome: true, // Agora sim pegamos o nome do usuário
            },
          },
        },
      });

    return NextResponse.json(ranking);
  } catch (error) {
    console.error("Erro ao buscar ranking:", error);
    return NextResponse.json({ error: "Erro ao buscar ranking" }, { status: 500 });
  }
}
