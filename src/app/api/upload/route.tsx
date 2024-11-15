import { NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import { PrismaClient } from '@prisma/client'; // Ajuste o caminho conforme sua configuração

export const config = {
  api: {
    bodyParser: false, // Desativa o parser padrão
  },
};

export async function POST(req: Request) {
  const form = new IncomingForm({
    multiples: false,
    uploadDir: path.join(process.cwd(), "public/upload/jogos"),
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Erro ao processar upload:", err);
        return reject(NextResponse.json({ error: "Erro no upload" }, { status: 500 }));
      }

      try {
        // Salve a imagem
        const file = files.file;
        const filePath = file.filepath;
        const fileName = path.basename(filePath);
        const fileUrl = `/upload/jogos/${fileName}`;

        // Salve os dados no banco de dados
        const novoJogo = await prisma.jogos.create({
          data: {
            jogos_nome: fields.jogos_nome as string,
            jogos_descricao: fields.jogos_descricao as string,
            jogos_link: fields.jogos_link as string,
            jogos_url_img: fileUrl,
          },
        });

        resolve(
          NextResponse.json({ success: true, jogo: novoJogo }, { status: 200 })
        );
      } catch (dbError) {
        console.error("Erro ao salvar no banco:", dbError);
        reject(
          NextResponse.json({ error: "Erro ao salvar no banco" }, { status: 500 })
        );
      }
    });
  });
}


// Teste uploadFile
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
