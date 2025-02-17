// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function PATCH(req: Request, { params }: { params: { perfil_id: string } }) {
//   try {
//     const perfilId = parseInt(params.perfil_id); // Convertendo ID para número
//     if (isNaN(perfilId)) {
//       return NextResponse.json({ error: "ID inválido" }, { status: 400 });
//     }

//     const { perfil_imagem, perfil_cidade } = await req.json();

//     const perfil = await prisma.perfis.update({
//       where: { perfil_id: perfilId },
//       data: { perfil_imagem, perfil_cidade },
//     });

//     return NextResponse.json({ success: true, perfil }, { status: 200 });
//   } catch (error) {
//     console.error("Erro ao atualizar perfil:", error);
//     return NextResponse.json({ error: "Erro ao atualizar perfil" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs/promises";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { perfil_id: string } }) {
  try {
    const { perfil_id } = params;

    // Validação do ID
    const perfilIdNumber = Number(perfil_id);
    if (isNaN(perfilIdNumber)) {
      return NextResponse.json({ error: "ID do Perfil inválido." }, { status: 400 });
    }

    const formData = await req.formData();

    // Obter dados do formulário
    const perfil_cidade = formData.get("perfil_cidade");
    const file = formData.get("perfil_imagem") as File;

    // Validação dos campos obrigatórios
    if (!perfil_cidade) {
      return NextResponse.json({ error: "O campo cidade é obrigatório." }, { status: 400 });
    }

    const updateData: any = {
      perfil_cidade: perfil_cidade.toString(),
    };

    // Verificar e processar a imagem de perfil
    if (file) {
      // Validar tipo do arquivo
      if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "Apenas arquivos de imagens são permitidos." }, { status: 400 });
      }

      // Recuperar perfil atual
      const currentPerfil = await prisma.perfis.findUnique({
        where: { perfil_id: perfilIdNumber },
      });

      if (!currentPerfil) {
        return NextResponse.json({ error: "Perfil não encontrado." }, { status: 404 });
      }

      // Remover arquivo antigo, se existir
      if (currentPerfil.perfil_imagem) {
        const oldFilePath = path.join(process.cwd(), "public", currentPerfil.perfil_imagem);
        try {
          await fs.unlink(oldFilePath);
        } catch (error) {
          console.warn("Erro ao remover imagem antiga:", oldFilePath, error);
        }
      }

      // Criar nome único para o novo arquivo
      const now = new Date();
      const uniqueFileName = `${now.toISOString().replace(/[-:.TZ]/g, "_")}_${file.name}`;

      // Caminho do diretório de upload
      const uploadsDir = path.join(process.cwd(), "public", "upload", "perfil");
      await fs.mkdir(uploadsDir, { recursive: true });

      // Salvar o novo arquivo
      const filePath = path.join(uploadsDir, uniqueFileName);
      const fileData = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, fileData);

      // Atualizar o caminho da imagem no banco
      updateData.perfil_imagem = `/upload/perfil/${uniqueFileName}`;
    }

    // Atualizar os dados no banco
    console.log("Dados sendo atualizados:", updateData);
    const updatedPerfil = await prisma.perfis.update({
      where: { perfil_id: perfilIdNumber },
      data: updateData,
    });

    return NextResponse.json(updatedPerfil, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar Perfil:", {
      message: error instanceof Error ? error.message : "Erro desconhecido",
      stack: error instanceof Error ? error.stack : "Sem stack trace",
    });
    return NextResponse.json({ error: "Erro ao atualizar Perfil." }, { status: 500 });
  }
}
