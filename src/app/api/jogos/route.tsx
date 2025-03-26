'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getTodosJogos, getTotalJogos } from '@/app/utils/jogoUtils';


const prisma = new PrismaClient();
// Função de Listagem de Dados de Jogos com Categorias de Jogos
// export async function GET() {
//   try {
//     const jogos = await prisma.jogos.findMany({
//       select: {
//         jogos_id: true,
//         jogos_nome: true,
//         jogos_descricao: true,
//         jogos_link: true,
//         jogos_url_img: true,
//         jogos_autor: true,
//         categoria_jogo_id: true, // Inclui o ID da categoria
//         categoria_jogos: { // Inclui a tabela relacionada (assumindo que o relacionamento é definido no Prisma)
//           select: {
//             categoria_jogo_id: true, // Chave primária da categoria
//             categoria_jogo_area_atuacao: true, // Campo da área de atuação da categoria
//           }
//         }
//       },
//     });
    
//     return NextResponse.json(jogos, { status: 200 });
//   } catch (error) {
//     console.error('Erro ao buscar Jogos:', error.message);
//     return NextResponse.json(
//       { error: 'Erro ao buscar Jogos', details: error.message },
//       { status: 500 }
//     );
//   }
// }


export async function GET() {
  try {
    const [jogos, totalJogos] = await Promise.all([
      getTodosJogos(),
      getTotalJogos(),
    ]);

    return NextResponse.json({ jogos, totalJogos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar Jogos", details: error.message },
      { status: 500 }
    );
  }
}



// Função de Inserção de Dados
export async function POST(req: Request) {
  try {
    
    const formData = await req.formData();
    console.log("FormData recebido:", formData);

    const jogos_nome = formData.get("jogos_nome");
    const jogos_descricao = formData.get("jogos_descricao");
    const jogos_link = formData.get("jogos_link");
    const jogos_autor = formData.get("jogos_autor");
    const categoria_jogo_id = parseInt(String(formData.get("categoria_jogo_id")), 10);
    const file = formData.get("jogos_url_img") as File;

       if (!jogos_nome || !file || isNaN(categoria_jogo_id)) {
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
    const uploadsDir = path.join(process.cwd(), "public", "upload", "jogos");
    await fs.mkdir(uploadsDir, { recursive: true }); // Garante que o diretório exista

    const filePath = path.join(uploadsDir, uniqueFileName);
    const fileData = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, fileData);

    // Salvando os dados no banco
    const newJogos = await prisma.jogos.create({
      data: {
        jogos_nome: String(jogos_nome),
        jogos_descricao: String(jogos_descricao),
        jogos_link: String(jogos_link),
        jogos_autor: String(jogos_autor),
        categoria_jogo_id,
        jogos_url_img: `/upload/jogos/${uniqueFileName}`,
      },
    });

    return NextResponse.json(newJogos, { status: 201 });
  } catch (error) {
    console.error("Erro ao lançar jogo:", error.message, error.stack);
    return NextResponse.json({ error: "Erro ao lançar Jogo Novo." }, { status: 500 });
  }
}

