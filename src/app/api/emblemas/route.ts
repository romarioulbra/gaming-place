'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getTodosEmblemas, getTotalEmblemas  } from '@/app/utils/emblemasUtils';

const prisma = new PrismaClient();


// Função de Listagem de Dados de Jogos com Categorias de Jogos
export async function GET() {
  try {
    const [emblemas, totalEmblemas] = await Promise.all([
      getTodosEmblemas(),
      getTotalEmblemas(),
    ]);

    return NextResponse.json({ emblemas, totalEmblemas }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: "Erro ao buscar Jogos", details: err.message },
      { status: 500 }
    );
  }
}



// Função de Inserção de Dados
export async function POST(req: Request) {
  try {
    
    const formData = await req.formData();
    console.log("FormData recebido:", formData);
    const emblema_nome = formData.get("emblema_nome");
    const emblema_criterio = formData.get("emblema_criterio");
    const emblemas_pontos = formData.get("emblemas_pontos");
    const emblemas_status = formData.get("emblemas_status");
    const file = formData.get("emblema_imagem") as File;

       if (!emblema_nome || !file ) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios!" }, { status: 400 });
    }

    // Verifica o tipo do arquivo
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Apenas arquivos de imagem são permitidos." }, { status: 400 });
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
    const uploadsDir = path.join(process.cwd(), "public", "upload", "emblemas");
    await fs.mkdir(uploadsDir, { recursive: true }); // Garante que o diretório exista

    const filePath = path.join(uploadsDir, uniqueFileName);
    const fileData = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, fileData);

    // Salvando os dados no banco
    const newEmblemas = await prisma.emblemas.create({
      data: {
        emblema_nome: String(emblema_nome),
        emblema_criterio: String(emblema_criterio),
        emblemas_pontos: Number(emblemas_pontos),
        emblemas_status: String(emblemas_status),
        emblema_imagem: `/upload/emblemas/${uniqueFileName}`,
      },
    });

    return NextResponse.json(newEmblemas, { status: 201 });
  } catch (error) {
    const err = error as Error;
    console.error("Erro ao lançar jogo:", err.message, err.stack);
    return NextResponse.json({ error: "Erro ao lançar Novo Emblema." }, { status: 500 });
  }
}

