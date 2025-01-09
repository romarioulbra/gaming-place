
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; 
import path from "path";
import fs from "fs/promises";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { jogos_id: string } }) {
  try {
    const { jogos_id } = params;
    const formData = await req.formData();
    
    const jogos_nome = formData.get("jogos_nome");
    const jogos_descricao = formData.get("jogos_descricao");
    const jogos_link = formData.get("jogos_link");
    const jogos_autor = formData.get("jogos_autor");
    const categoria_jogo_id = formData.get("categoria_jogo_id");
    
    const file = formData.get("jogos_url_img") as File;

    if (!jogos_id) {
      return NextResponse.json({ error: "ID do Jogo é obrigatório." }, { status: 400 });
    }

    // Objeto para armazenar os dados de atualização
    const updateData: any = {};

    // Atualiza a área de atuação, se fornecida
    if (jogos_nome) {
      updateData.jogos_nome = jogos_nome.toString();
      updateData.jogos_descricao = jogos_descricao.toString();
      updateData.jogos_link = jogos_link.toString();
      updateData.jogos_autor = jogos_autor.toString();
      updateData.categoria_jogo_id = categoria_jogo_id;
    }

    // Verifica se há um arquivo para atualizar
    if (file) {
      // Verifica o tipo do arquivo
      if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "Apenas arquivos de imagens são permitidos." }, { status: 400 });
      }

      // Recupera o registro atual para obter o caminho do arquivo antigo
      const currentCategory = await prisma.jogos.findUnique({
        where: { jogos_id: Number(jogos_id) },
      });

      const jogosIdNumber = Number(jogos_id);
        if (isNaN(jogosIdNumber)) {
          return NextResponse.json({ error: "ID do Jogo inválido." }, { status: 400 });
        }


      if (!currentCategory) {
        return NextResponse.json({ error: "Jogo não encontrado." }, { status: 404 });
      }

      // Remove o arquivo antigo, se existir
      if (currentCategory.jogos_url_img) {
        const oldFilePath = path.join(process.cwd(), "public", currentCategory.jogos_url_img);
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
      const uploadsDir = path.join(process.cwd(), "public", "upload", "jogos");
      await fs.mkdir(uploadsDir, { recursive: true });

      const filePath = path.join(uploadsDir, uniqueFileName);
      const fileData = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, fileData);

      // Atualiza o caminho do ícone no banco de dados
      updateData.jogos_url_img = `/upload/jogos/${uniqueFileName}`;
    }

    // Atualiza os dados no banco de dados
    const updatedCategory = await prisma.jogos.update({
      where: { jogos_id: Number(jogos_id) },
      data: updateData,
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar Jogo:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json({ error: "Erro ao atualizar Jogo." }, { status: 500 });
  }
}

