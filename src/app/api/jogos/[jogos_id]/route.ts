
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client"; 
import path from "path";
import fs from "fs/promises";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: Promise<{ jogos_id: string }> }) {
  try {
    const { jogos_id } = await params;

    // Validação do ID
    const jogosIdNumber = Number(jogos_id);
    if (isNaN(jogosIdNumber)) {
      return NextResponse.json({ error: "ID do Jogo inválido." }, { status: 400 });
    }

    const formData = await req.formData();

    // Obter dados do formulário
    const jogos_nome = formData.get("jogos_nome");
    const jogos_descricao = formData.get("jogos_descricao");
    const jogos_link = formData.get("jogos_link");
    const jogos_autor = formData.get("jogos_autor");
    const categoria_jogo_id = formData.get("categoria_jogo_id");
    const file = formData.get("jogos_url_img") as File;

    // Validação dos campos obrigatórios
    if (!jogos_nome || !jogos_descricao || !jogos_link || !jogos_autor || !categoria_jogo_id) {
      return NextResponse.json({ error: "Todos os campos obrigatórios devem ser preenchidos." }, { status: 400 });
    }

    const updateData: Prisma.jogosUpdateInput  = {
      jogos_nome: jogos_nome.toString(),
      jogos_descricao: jogos_descricao.toString(),
      jogos_link: jogos_link.toString(),
      jogos_autor: jogos_autor.toString(),
      categoria_jogo_id: Number(categoria_jogo_id),
    };

    // Verificar e processar o arquivo de imagem
    if (file) {
      // Validar tipo do arquivo
      if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "Apenas arquivos de imagens são permitidos." }, { status: 400 });
      }

      // Recuperar jogo atual
      const currentGame = await prisma.jogos.findUnique({
        where: { jogos_id: jogosIdNumber },
      });

      if (!currentGame) {
        return NextResponse.json({ error: "Jogo não encontrado." }, { status: 404 });
      }

      // Remover arquivo antigo, se existir
      if (currentGame.jogos_url_img) {
        const oldFilePath = path.join(process.cwd(), "public", currentGame.jogos_url_img);
        try {
          await fs.unlink(oldFilePath);
        } catch (error) {
          console.warn("Erro ao remover arquivo antigo:", oldFilePath, error);
        }
      }

      // Criar nome único para o novo arquivo
      const now = new Date();
      const uniqueFileName = `${now.toISOString().replace(/[-:.TZ]/g, "_")}_${file.name}`;

      // Caminho do diretório de upload
      const uploadsDir = path.join(process.cwd(), "public", "upload", "jogos");
      await fs.mkdir(uploadsDir, { recursive: true });

      // Salvar o novo arquivo
      const filePath = path.join(uploadsDir, uniqueFileName);
      const fileData = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, fileData);

      // Atualizar o caminho da imagem
      updateData.jogos_url_img = `/upload/jogos/${uniqueFileName}`;
    }

    // Atualizar os dados no banco
    console.log("Dados sendo atualizados:", updateData);
    const updatedGame = await prisma.jogos.update({
      where: { jogos_id: jogosIdNumber },
      data: updateData,
    });

    return NextResponse.json(updatedGame, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar Jogo:", {
      message: error instanceof Error ? error.message : "Erro desconhecido",
      stack: error instanceof Error ? error.stack : "Sem stack trace",
    });
    return NextResponse.json({ error: "Erro ao atualizar Jogo." }, { status: 500 });
  }
}



// Verifica se o método é DELETE
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ jogos_id: string }> }) {
  try {
    const { jogos_id } = await params;

    if (!jogos_id) {
      return NextResponse.json({ error: "ID do Jogo é obrigatório." }, { status: 400 });
    }

    const jogosIdNumber = Number(jogos_id);
    if (isNaN(jogosIdNumber)) {
      return NextResponse.json({ error: "ID do Jogo inválido." }, { status: 400 });
    }

    // Busca o jogo para garantir que ele existe e também inclui a categoria
    const jogo = await prisma.jogos.findUnique({
      where: { jogos_id: jogosIdNumber },
      include: { categoria_jogos: true },
    });

    if (!jogo) {
      return NextResponse.json({ error: "Jogo não encontrado." }, { status: 404 });
    }

    // Remove a imagem associada ao jogo, se existir
    if (jogo.jogos_url_img) {
      const oldFilePath = path.join(process.cwd(), "public", jogo.jogos_url_img);
      try {
        await fs.unlink(oldFilePath); // Remove o arquivo da imagem
      } catch (error) {
        console.warn("Não foi possível remover o arquivo antigo:", oldFilePath, error);
      }
    }

    // Exclui o jogo
    await prisma.jogos.delete({
      where: { jogos_id: jogosIdNumber },
    });

    // Verifica se a categoria tem outros jogos
    const categoria = await prisma.categoria_jogos.findUnique({
      where: { categoria_jogo_id: jogo.categoria_jogo_id },
      include: { jogos: true },  // Verifica os jogos associados à categoria
    });

    // Se não houver mais jogos associados à categoria, exclui a categoria
    if (categoria && categoria.jogos.length === 0) {
      await prisma.categoria_jogos.delete({
        where: { categoria_jogo_id: categoria.categoria_jogo_id },
      });
    }

    return NextResponse.json({ message: "Jogo excluído com sucesso." }, { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir Jogo:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json({ error: "Erro ao excluir Jogo." }, { status: 500 });
  }
}