// import { NextResponse } from "next/server";
// import { IncomingForm } from "formidable";
// import fs from "fs";
// import path from "path";
// import { PrismaClient } from '@prisma/client'; // Ajuste o caminho conforme sua configuração

// export const config = {
//   api: {
//     bodyParser: false, // Desativa o parser padrão
//   },
// };

// export async function POST(req: Request) {
//   const form = new IncomingForm({
//     multiples: false,
//     uploadDir: path.join(process.cwd(), "public/upload/jogos"),
//     keepExtensions: true,
//   });

//   return new Promise((resolve, reject) => {
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error("Erro ao processar upload:", err);
//         return reject(NextResponse.json({ error: "Erro no upload" }, { status: 500 }));
//       }

//       try {
//         // Salve a imagem
//         const file = files.file;
//         const filePath = file.filepath;
//         const fileName = path.basename(filePath);
//         const fileUrl = `/upload/jogos/${fileName}`;

//         // Salve os dados no banco de dados
//         const novoJogo = await prisma.jogos.create({
//           data: {
//             jogos_nome: fields.jogos_nome as string,
//             jogos_descricao: fields.jogos_descricao as string,
//             jogos_link: fields.jogos_link as string,
//             jogos_url_img: fileUrl,
//           },
//         });

//         resolve(
//           NextResponse.json({ success: true, jogo: novoJogo }, { status: 200 })
//         );
//       } catch (dbError) {
//         console.error("Erro ao salvar no banco:", dbError);
//         reject(
//           NextResponse.json({ error: "Erro ao salvar no banco" }, { status: 500 })
//         );
//       }
//     });
//   });
// }



// import { NextRequest, NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// import path from "path";

// export const config = {
//   api: {
//     bodyParser: false, // Necessário desativar o bodyParser para manipular arquivos
//   },
// };

// export async function POST(req: NextRequest) {
//   try {
//     // Ler os dados do corpo da requisição como um `formData`
//     const formData = await req.formData();

//     // Pegar o arquivo do formulário
//     const file = formData.get("file") as File | null;
//     if (!file) {
//       return NextResponse.json({ success: false, error: "Nenhum arquivo enviado" }, { status: 400 });
//     }

//     // Converter o arquivo para Buffer
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Salvar o arquivo no disco
//     const uploadDir = path.join(process.cwd(), "public/upload/jogos");
//     const filePath = path.join(uploadDir, file.name);

//     // Certifique-se de que o diretório existe
//     await fs.promises.mkdir(uploadDir, { recursive: true });

//     await writeFile(filePath, buffer);

//     // Retornar a URL do arquivo salvo
//     const fileUrl = `/upload/jogos/${file.name}`;

//     return NextResponse.json({ success: true, url: fileUrl }, { status: 200 });
//   } catch (error) {
//     console.error("Erro no upload:", error);
//     return NextResponse.json({ success: false, error: "Erro no upload do arquivo" }, { status: 500 });
//   }
// }




// 'use server'
// import { writeFile } from "fs/promises";
// import { NextRequest, NextResponse } from "next/server";
// import path from "path";
// import { PrismaClient } from "@prisma/client";
// import fs from "fs";

// const prisma = new PrismaClient();

// export const config = {
//   api: {
//     bodyParser: false, // Necessário desativar o bodyParser para manipular arquivos
//   },
// };

// export async function POST(request: NextRequest) {
//   try {
//     // Obter os dados enviados via formulário
//     const data = await request.formData();
//     console.log('entrou no try')
//     console.log(data);
    
//     // Obter o arquivo
//     const file: File | null = data.get("file") as unknown as File;
//     if (!file) {
//       return NextResponse.json({ success: false, message: "Arquivo não enviado" }, { status: 400 });
//     }

//     // Converter o arquivo para Buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // Caminho para salvar o arquivo
//     const uploadDir = path.join(process.cwd(), "public/upload/jogos");
//     const filePath = path.join(uploadDir, file.name);

//     // Criar o diretório se não existir
//     await fs.promises.mkdir(uploadDir, { recursive: true });

//     // Salvar o arquivo no diretório
//     await writeFile(filePath, buffer);
//     console.log(`Arquivo salvo em: ${filePath}`);

//     // Gerar a URL pública do arquivo
//     const fileUrl = `/upload/jogos/${file.name}`;

//     // Obter os campos do formulário
//     const jogos_nome = data.get("jogos_nome") as string;
//     const jogos_descricao = data.get("jogos_descricao") as string;
//     const jogos_link = data.get("jogos_link") as string;

//     if (!jogos_nome || !jogos_descricao || !jogos_link) {
//       return NextResponse.json({ success: false, message: "Campos obrigatórios não preenchidos" }, { status: 400 });
//     }

//     // Salvar os dados no banco de dados
//     const novoJogo = await prisma.jogos.create({
//       data: {
//         jogos_nome,
//         jogos_descricao,
//         jogos_link,
//         jogos_url_img: fileUrl, // Salva a URL da imagem no banco
//       },
//     });

//     // Retornar resposta de sucesso
//     return NextResponse.json({ success: true, jogo: novoJogo }, { status: 201 });
//   } catch (error) {
//     console.log('entrou no catch')
//     console.error("Erro ao processar requisição:", error);
//     return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 });
//   }
// }




// Teste uploadFile aqui grava os arquivos na pasta upload
// import { writeFile } from "fs/promises";
// import { NextRequest, NextResponse } from "next/server";
// import path from "path";

// export async function POST(request: NextRequest) {
//   const data = await request.formData();
//   const file: File | null = data.get("file") as unknown as File;

//   if (!file) {
//     return NextResponse.json({ success: false });
//   }

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const filePath = path.join(process.cwd(), "public/upload/jogos", file.name);
//   await writeFile(filePath, buffer);
//   console.log(`open ${filePath} to see the uploaded file`);

//   return NextResponse.json({ success: true });
// }


// Somente para os arquivos
'use server'
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs"; // Importação necessária

export const config = {
  api: {
    bodyParser: false, // Necessário desativar o bodyParser para manipular arquivos
  },
};

export async function POST(request: NextRequest) {
  try {
    // Obter os dados enviados via formulário
    const formData = await request.formData();
    
    // Obter o arquivo
    const file: File | null = formData.get("file") as File;
    if (!file) {
      return NextResponse.json(
        { success: false, message: "Arquivo não enviado" },
        { status: 400 }
      );
    }

    // Validar o tipo do arquivo (opcional, mas recomendado)
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Tipo de arquivo não suportado" },
        { status: 400 }
      );
    }

    // Gerar um nome único para evitar conflitos
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileName = `${uniqueSuffix}-${file.name}`;
    
    // Converter o arquivo para Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Caminho para salvar o arquivo
    const uploadDir = path.join(process.cwd(), "public/upload/jogos");
    const filePath = path.join(uploadDir, fileName);

    // Criar o diretório se não existir
    await fs.promises.mkdir(uploadDir, { recursive: true });

    // Salvar o arquivo no diretório
    await writeFile(filePath, buffer);
    console.log(`Arquivo salvo em: ${filePath}`);

    // Gerar a URL pública do arquivo
    const fileUrl = `/upload/jogos/${fileName}`;

    return NextResponse.json({ success: true, url: fileUrl }, { status: 201 });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { success: false, message: "Erro no upload do arquivo" },
      { status: 500 }
    );
  }
}






// teste alternativo
// import {NextApiRequest, NextApiResponse} from "next";
// import {IncomingForm} from "formidable";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
//     if (req.method !== 'POST') {
//         // Return error 
//     res.status(405).json("Method not allowed for File Upload");
//     }
//     // Do your authentication magic here first 
//     // Get the headers using req.headers.<header name> ....
//     try {
//         const data: { files: any } = await new Promise((resolve, reject) => {
//             const form = new IncomingForm();
//             form.parse(req, (err: any, fields: any, files: any) => {
//                 if (err) reject({err});
//                 resolve({files});
//             });
//         });

//         Object.keys(data.files).forEach((key) => {
//             // Here you can handle the file, e.g. save it to disk, upload to cloud storage, etc.
//             console.log(`Received file ${key}:`, data.files[key]);
//         });

//         res.status(200).json("Successfully received file(s)");
//     } catch (error: any) {
//         res.status(500).json(error.message);
//     }
// };
