
// FUNCIONA APENAS PARA GRAVAÇÃO DOS ARQUIVOS
// 'use server';

// import { PrismaClient } from '@prisma/client';
// import { NextResponse } from 'next/server';

// // Inicialize o Prisma
// const prisma = new PrismaClient();

// export async function PUT(req: Request, { params }: { params: { categoria_jogo_id: string } }) {
//   try {
//     console.log("Iniciando PUT...");
//     console.log("Parâmetros recebidos:", params);

//     const body = await req.json();
//     console.log("Dados recebidos no body:", body);

//     // Verifique se o ID é válido
//     if (isNaN(Number(params.categoria_jogo_id))) {
//       return NextResponse.json(
//         { error: "ID inválido fornecido" },
//         { status: 400 }
//       );
//     }

//     // Atualizar no banco de dados
//     const categoriaAtualizada = await prisma.categoria_jogos.update({
//       where: { categoria_jogo_id: Number(params.categoria_jogo_id) },
//       data: body,
//     });

//     console.log("Categoria atualizada com sucesso:", categoriaAtualizada);

//     return NextResponse.json(categoriaAtualizada);
//   } catch (error: any) {
//     console.error("Erro ao atualizar categoria:", error);

//     return NextResponse.json(
//       { error: error.message || "Erro interno do servidor" },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; 
import path from "path";
import fs from "fs/promises";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { categoria_jogo_id: string } }) {
  try {
    const { categoria_jogo_id } = params;
    const formData = await req.formData();

    const categoria_jogo_area_atuacao = formData.get("categoria_jogo_area_atuacao");
    const file = formData.get("categoria_jogo_icone") as File;

    if (!categoria_jogo_id) {
      return NextResponse.json({ error: "ID da categoria é obrigatório." }, { status: 400 });
    }

    // Objeto para armazenar os dados de atualização
    const updateData: any = {};

    // Atualiza a área de atuação, se fornecida
    if (categoria_jogo_area_atuacao) {
      updateData.categoria_jogo_area_atuacao = categoria_jogo_area_atuacao.toString();
    }

    // Verifica se há um arquivo para atualizar
    if (file) {
      // Verifica o tipo do arquivo
      if (file.type !== "image/svg+xml") {
        return NextResponse.json({ error: "Apenas arquivos SVG são permitidos." }, { status: 400 });
      }

      // Recupera o registro atual para obter o caminho do arquivo antigo
      const currentCategory = await prisma.categoria_jogos.findUnique({
        where: { categoria_jogo_id: Number(categoria_jogo_id) },
      });

      if (!currentCategory) {
        return NextResponse.json({ error: "Categoria não encontrada." }, { status: 404 });
      }

      // Remove o arquivo antigo, se existir
      if (currentCategory.categoria_jogo_icone) {
        const oldFilePath = path.join(process.cwd(), "public", currentCategory.categoria_jogo_icone);
        try {
          await fs.unlink(oldFilePath); // Remove o arquivo antigo
        } catch (error) {
          console.warn("Não foi possível remover o arquivo antigo:", oldFilePath, error);
        }
      }

      // Cria um nome único para o novo arquivo
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const uniqueFileName = `${day}_${month}_${year}_${hours}-${minutes}-${seconds}_${file.name}`;

      // Caminho do diretório de upload
      const uploadsDir = path.join(process.cwd(), "public", "upload", "categoria_jogos");
      await fs.mkdir(uploadsDir, { recursive: true });

      const filePath = path.join(uploadsDir, uniqueFileName);
      const fileData = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, fileData);

      // Atualiza o caminho do ícone no banco de dados
      updateData.categoria_jogo_icone = `/upload/categoria_jogos/${uniqueFileName}`;
    }

    // Atualiza os dados no banco de dados
    const updatedCategory = await prisma.categoria_jogos.update({
      where: { categoria_jogo_id: Number(categoria_jogo_id) },
      data: updateData,
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar Categoria de Jogos:", error);
    return NextResponse.json({ error: "Erro ao atualizar Categoria de Jogos." }, { status: 500 });
  }
}
