'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';


const prisma = new PrismaClient();

// Função de Listagem de Todas as Categorias
export async function GET() {
  try {
    const cat_jogos = await prisma.categoria_jogos.findMany({
      select: {
        categoria_jogo_id: true,
        categoria_jogo_area_atuacao: true,
        categoria_jogo_icone: true,
      },
    });
    return NextResponse.json(cat_jogos, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar Categorias de Jogos:', error.message);
    return NextResponse.json(
      { error: 'Erro ao buscar Categorias de Jogos', details: error.message },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const categoria_jogo_area_atuacao = formData.get("categoria_jogo_area_atuacao");
    const file = formData.get("categoria_jogo_icone") as File;

    if (!categoria_jogo_area_atuacao || !file) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios!" }, { status: 400 });
    }

    // Verifica o tipo do arquivo
    if (file.type !== "image/svg+xml") {
      return NextResponse.json({ error: "Apenas arquivos SVG são permitidos." }, { status: 400 });
    }

    // Formata a data atual para o formato desejado: dia_mes_ano_h-m-s
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Meses começam de 0, então adicionamos +1
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Construa o nome do arquivo com base na data e hora
    const uniqueFileName = `${day}_${month}_${year}_${hours}-${minutes}-${seconds}_${file.name}`;

    // Caminho do diretório de upload
    const uploadsDir = path.join(process.cwd(), "public", "upload", "categoria_jogos");
    await fs.mkdir(uploadsDir, { recursive: true }); // Garante que o diretório exista

    const filePath = path.join(uploadsDir, uniqueFileName);
    const fileData = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, fileData);

    // Salvando os dados no banco
    const newCatJogos = await prisma.categoria_jogos.create({
      data: {
        categoria_jogo_area_atuacao: String(categoria_jogo_area_atuacao),
        categoria_jogo_icone: `/upload/categoria_jogos/${uniqueFileName}`, // Caminho do ícone salvo
      },
    });

    return NextResponse.json(newCatJogos, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar nova Categoria de Jogos:", error);
    return NextResponse.json({ error: "Erro ao criar Categoria de Jogos." }, { status: 500 });
  }
}


// Funcionando a todo vapor
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoria_jogo_id = searchParams.get("categoria_jogo_id");

  if (!categoria_jogo_id || isNaN(Number(categoria_jogo_id))) {
    return NextResponse.json({ error: "ID inválido ou não fornecido!" }, { status: 400 });
  }

  try {
    // Busca o registro no banco
    const categoria = await prisma.categoria_jogos.findUnique({
      where: { categoria_jogo_id: Number(categoria_jogo_id) },
    });

    if (!categoria) {
      return NextResponse.json({ error: "Registro não encontrado!" }, { status: 404 });
    }

    // Caminho do arquivo a ser excluído
    const filePath = path.join(process.cwd(), "public", categoria.categoria_jogo_icone);

    // Exclui o arquivo do diretório
    await fs.unlink(filePath).catch((err) => {
      console.error("Erro ao excluir o arquivo:", err);
    });

    // Exclui o registro no banco de dados
    await prisma.categoria_jogos.delete({
      where: { categoria_jogo_id: Number(categoria_jogo_id) },
    });

    return NextResponse.json({ message: "Registro excluído com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir o registro:", error);
    return NextResponse.json({ error: "Erro ao excluir registro." }, { status: 500 });
  }
}
