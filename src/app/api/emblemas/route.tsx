'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const prisma = new PrismaClient();
// Função de Listagem de Dados de Jogos com Categorias de Jogos
export async function GET() {
  try {
    const emblemas = await prisma.emblemas.findMany({ 
      select: {
        emblema_id: true,
        emblema_nome: true,
        emblema_criterio: true,
        emblema_imagem: true,
        emblemas_pontos: true,
        emblemas_status: true, 
      },
    });
    
    return NextResponse.json(emblemas, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar Jogos:', error.message);
    return NextResponse.json(
      { error: 'Erro ao buscar Jogos', details: error.message },
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
        emblemas_pontos: String(emblemas_pontos),
        emblemas_status: String(emblemas_status),
        emblema_imagem: `/upload/emblemas/${uniqueFileName}`,
      },
    });

    return NextResponse.json(newEmblemas, { status: 201 });
  } catch (error) {
    console.error("Erro ao lançar jogo:", error.message, error.stack);
    return NextResponse.json({ error: "Erro ao lançar Novo Emblema." }, { status: 500 });
  }
}



// Funcionando a todo vapor
// export async function DELETE(req: Request) {
//   const { searchParams } = new URL(req.url);
//   let jogo_id = searchParams.get("jogo_id") || null;
 
  
//   console.log("Query Parameters:", searchParams.toString()); // Loga todos os parâmetros
//   console.log("Jogo ID:", jogo_id); // Loga o valor específico de jogo_id

//   if (!jogo_id || isNaN(Number(jogo_id))) {
//     const body = await req.json();
//     jogo_id = body?.jogo_id; // Tenta pegar o ID do corpo da requisição
//   }

//   if (!jogo_id || isNaN(Number(jogo_id))) {
//     return NextResponse.json({ error: "ID inválido ou não fornecido!" }, { status: 400 });
//   }

//   try {
//     // Busca o registro no banco
//     const jogo = await prisma.jogos.findUnique({
//       where: { jogo_id: Number(jogo_id) },
//       include: { categoria_jogo: true }, // Inclui dados da categoria associada
//     });

//     if (!jogo) {
//       return NextResponse.json({ error: "Jogo não encontrado!" }, { status: 404 });
//     }

//     // Caminho do arquivo a ser excluído
//     const filePath = path.join(process.cwd(), "public", jogo.jogos_url_img);

//     // Exclui o arquivo do diretório
//     try {
//       await fs.unlink(filePath);
//     } catch (err) {
//       console.warn("Erro ao excluir o arquivo associado ao jogo:", err);
//     }

//     // Verifica se há uma categoria associada ao jogo e a exclui
//     if (jogo.categoria_jogo_id) {
//       await prisma.categoria_jogos.delete({
//         where: { categoria_jogo_id: jogo.categoria_jogo_id },
//       });
//     }

//     // Exclui o jogo
//     await prisma.jogos.delete({
//       where: { jogo_id: Number(jogo_id) },
//     });

//     return NextResponse.json({ message: "Jogo e categoria associados excluídos com sucesso!" }, { status: 200 });
//   } catch (error) {
//     console.error("Erro ao excluir o registro:", error);
//     return NextResponse.json({ error: "Erro ao excluir registro." }, { status: 500 });
//   }
// }



// export async function DELETE(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const jogo_id = Number(searchParams.get("jogo_id"));

//     console.log("Recebido jogo_id:", jogo_id);

//     if (isNaN(jogo_id)) {
//       console.warn("ID não fornecido ou inválido");
//       return NextResponse.json({ error: "ID inválido ou não fornecido!" }, { status: 400 });
//     }

//     // Buscar o jogo no banco de dados
//     console.log("Buscando jogo no banco de dados...");
//     const jogo = await prisma.jogos.findUnique({
//       where: { jogo_id },
//       include: { categoria_jogo: true },
//     });

//     if (!jogo) {
//       console.warn("Jogo não encontrado!");
//       return NextResponse.json({ error: "Jogo não encontrado!" }, { status: 404 });
//     }

//     console.log("Jogo encontrado:", jogo);

//     // Excluir arquivos associados
//     if (jogo.jogos_url_img) {
//       const filePath = path.join(process.cwd(), "public", jogo.jogos_url_img);
//       console.log("Tentando excluir arquivo:", filePath);
//       try {
//         await fs.unlink(filePath);
//         console.log("Arquivo excluído com sucesso!");
//       } catch (err) {
//         console.warn("Erro ao excluir o arquivo:", err);
//       }
//     }

//     // Excluir categoria associada
//     if (jogo.categoria_jogo_id) {
//       console.log("Excluindo categoria associada com ID:", jogo.categoria_jogo_id);
//       await prisma.categoria_jogos.delete({
//         where: { categoria_jogo_id: jogo.categoria_jogo_id },
//       });
//       console.log("Categoria associada excluída com sucesso!");
//     }

//     // Excluir o jogo
//     console.log("Excluindo jogo com ID:", jogo_id);
//     await prisma.jogos.delete({
//       where: { jogo_id },
//     });
//     console.log("Jogo excluído com sucesso!");

//     return NextResponse.json({ message: "Jogo e categoria associados excluídos com sucesso!" }, { status: 200 });
//   } catch (error) {
//     console.error("Erro durante a exclusão:", error);
//     return NextResponse.json({ error: "Erro no servidor ao excluir registro." }, { status: 500 });
//   }
// }


// export async function DELETE(req: Request) {
//   console.log("Início da função DELETE"); // Primeiro log
//   try {
//     const { searchParams } = new URL(req.url); // Pode falhar aqui
//     console.log("URL processada com sucesso:", req.url);

//     const jogo_id = searchParams.get("jogo_id");
//     console.log("ID recebido:", jogo_id);

//     if (!jogo_id || isNaN(Number(jogo_id))) {
//       console.warn("ID inválido ou não fornecido!");
//       return NextResponse.json({ error: "ID inválido ou não fornecido!" }, { status: 400 });
//     }

//     // Bloco principal (sem alterações)
//   } catch (error) {
//     console.error("Erro fora do bloco try:", error); // Log de erro específico
//     return NextResponse.json({ error: "Erro no servidor ao excluir registro." }, { status: 500 });
//   }
// }
