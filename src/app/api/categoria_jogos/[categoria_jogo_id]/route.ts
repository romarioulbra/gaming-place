import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; 
import path from "path";
import fs from "fs/promises";



const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ categoria_jogo_id: string }> }
) {
  const { categoria_jogo_id } = await params;

  try {
    // Busca os jogos da categoria específica
    const jogos = await prisma.jogos.findMany({
      where: {
        categoria_jogo_id: parseInt(categoria_jogo_id, 10),
      },
      select: {
        jogos_id: true,
        jogos_nome: true,
        jogos_descricao: true,
        jogos_link: true,
        jogos_url_img: true,
        jogos_autor: true,
      },
    });

    return NextResponse.json(jogos, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar jogos da categoria:", error.message);
    return NextResponse.json(
      { error: "Erro ao buscar jogos da categoria", details: error.message },
      { status: 500 }
    );
  }
}



interface CategoriaJogoUpdateData {
  categoria_jogo_area_atuacao?: string;
  categoria_jogo_icone?: string;
}


export async function PUT(req: NextRequest, { params }: { params: Promise<{ categoria_jogo_id: string }> }) {
  try {
    const { categoria_jogo_id } = await params;
    const formData = await req.formData();

    const categoria_jogo_area_atuacao = formData.get("categoria_jogo_area_atuacao");
    const file = formData.get("categoria_jogo_icone") as File;

    if (!categoria_jogo_id) {
      return NextResponse.json({ error: "ID da categoria é obrigatório." }, { status: 400 });
    }

    // Objeto para armazenar os dados de atualização
    // const updateData: any = {};
    const updateData: CategoriaJogoUpdateData = {};


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

