'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';


const prisma = new PrismaClient();

// Função de Listagem de Dados
export async function GET() {
  try {
    const cat_jogos = await prisma.categoria_jogos.findMany({
      select: {
        categoria_jogo_id: true,
        categoria_jogo_area_atuacao: true,
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



// Função de Inserção de Dados
// export async function POST(req: Request) {
//   const { categoria_jogo_area_atuacao } = await req.json();

//   try {
//     const newCatJogos = await prisma.categoria_jogos.create({
//       data: {
//        categoria_jogo_area_atuacao
//       },
//     });

//     return NextResponse.json(newCatJogos, { status: 201 });
//   } catch (error) {
//    console.error('Erro ao criar nova Categoria de Jogos:', error);
//     return NextResponse.json({ error: 'Erro ao criar Categoria de Jogos.' }, { status: 500 });
//   }
// }



// Função de Inserção de Dados com Upload
// Configuração para desabilitar o bodyParser padrão do Next.js
// export const config = {
//   api: {
//     bodyParser: false, // Desativa o bodyParser
//   },
// };

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const categoria_jogo_area_atuacao = formData.get("categoria_jogo_area_atuacao") ;
    const file = formData.get("categoria_jogo_icone") as File;

    if (!categoria_jogo_area_atuacao || !file) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios!" }, { status: 400 });
    }

    // Verifica o tipo do arquivo
    if (file.type !== "image/svg+xml") {
      return NextResponse.json({ error: "Apenas arquivos SVG são permitidos." }, { status: 400 });
    }

    // Salvando o arquivo SVG no servidor
    const uploadsDir = path.join(process.cwd(), "public", "upload", "categoria_jogos");
    await fs.mkdir(uploadsDir, { recursive: true }); // Garante que o diretório exista

    const filePath = path.join(uploadsDir, file.name);
    const fileData = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, fileData);

    // Salvando os dados no banco
    const newCatJogos = await prisma.categoria_jogos.create({
      data: {
        categoria_jogo_area_atuacao,
        categoria_jogo_icone: `/upload/categoria_jogos/${file.name}`, // Caminho do ícone salvo
      },
    });

    return NextResponse.json(newCatJogos, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar nova Categoria de Jogos:", error);
    return NextResponse.json({ error: "Erro ao criar Categoria de Jogos." }, { status: 500 });
  }
}



// Função de Exclusão de Dados
export async function DELETE(req: Request) {
  
  const { searchParams } = new URL(req.url);  
  const categoria_jogo_id = searchParams.get("categoria_jogo_id"); // Captura o ID do registro a ser excluído

  if (!categoria_jogo_id || isNaN(Number(categoria_jogo_id))) {
    return NextResponse.json({ error: "ID inválido ou não fornecido" }, { status: 400 });
  }

  try {
    await prisma.categoria_jogos.delete({
      where: { categoria_jogo_id: Number(categoria_jogo_id) },
    });

    return NextResponse.json({ message: "Registro excluído com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir o registro:', error);
    return NextResponse.json({ error: 'Erro ao excluir registro.' }, { status: 500 });
  } 
}

