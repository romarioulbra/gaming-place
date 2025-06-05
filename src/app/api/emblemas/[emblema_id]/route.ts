
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient,Prisma } from "@prisma/client"; 
import path from "path";
import fs from "fs/promises";

const prisma = new PrismaClient();



// export async function PUT(req: NextRequest, { params }: { params: { emblema_id: string } }) {
//   try {
//     const { emblema_id } = params;

//     if (!emblema_id) {
//       return NextResponse.json({ error: "ID do Emblema é obrigatório." }, { status: 400 });
//     }

//     const emblemaIdNumber = Number(emblema_id);
//     if (isNaN(emblemaIdNumber)) {
//       return NextResponse.json({ error: "ID do Emblema inválido." }, { status: 400 });
//     }

//     const formData = await req.formData();
//     const emblema_nome = formData.get("emblema_nome")?.toString();
//     const emblema_criterio = formData.get("emblema_criterio")?.toString();
//     const emblemas_pontos = formData.get("emblemas_pontos")?.toString();
//     const emblemas_status = formData.get("emblemas_status")?.toString();
//     const file = formData.get("emblema_imagem") as File;

//     // Verifica se o emblema existe
//     const currentEmblema = await prisma.emblemas.findUnique({
//       where: { emblema_id: emblemaIdNumber },
//     });

//     if (!currentEmblema) {
//       return NextResponse.json({ error: "Emblema não encontrado." }, { status: 404 });
//     }

//     // Dados para atualização
//     const updateData: Prisma.emblemasUpdateInput = {};
//     if (emblema_nome) updateData.emblema_nome = emblema_nome;
//     if (emblema_criterio) updateData.emblema_criterio = emblema_criterio;
//     if (emblemas_pontos) updateData.emblemas_pontos = emblemas_pontos;
//     if (emblemas_status) updateData.emblemas_status = emblemas_status;

//     // Processa a imagem se houver uma nova
//     if (file) {
//       if (!file.type.startsWith("image/")) {
//         return NextResponse.json({ error: "Apenas arquivos de imagens são permitidos." }, { status: 400 });
//       }

//       // Remove a imagem antiga se existir
//       if (currentEmblema.emblema_imagem) {
//         const oldFilePath = path.join(process.cwd(), "public", currentEmblema.emblema_imagem);
//         try {
//           await fs.unlink(oldFilePath);
//         } catch (error) {
//           console.warn("Não foi possível remover o arquivo antigo:", oldFilePath, error);
//         }
//       }

//       // Cria um nome único para o novo arquivo
//       const now = new Date();
//       const timestamp = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-${String(now.getSeconds()).padStart(2, "0")}`;
//       const uniqueFileName = `${timestamp}_${file.name}`;

//       // Caminho para salvar o arquivo
//       const uploadsDir = path.join(process.cwd(), "public", "upload", "emblemas");
//       await fs.mkdir(uploadsDir, { recursive: true });

//       const filePath = path.join(uploadsDir, uniqueFileName);
//       const fileData = Buffer.from(await file.arrayBuffer());
//       await fs.writeFile(filePath, fileData);

//       // Atualiza o caminho da imagem
//       updateData.emblema_imagem = `/upload/emblemas/${uniqueFileName}`;
//     }

//     // Atualiza os dados no banco de dados
//     const updatedEmblema = await prisma.emblemas.update({
//       where: { emblema_id: emblemaIdNumber },
//       data: updateData,
//     });

//     return NextResponse.json(updatedEmblema, { status: 200 });
//   } catch (error) {
//     console.error("Erro ao atualizar Emblema:", error);
//     return NextResponse.json({ error: "Erro ao atualizar o Emblema." }, { status: 500 });
//   }
// }

export async function PUT(req: NextRequest, { params }: { params: { emblema_id: string } }) {
  try {
    const { emblema_id } = params;

    if (!emblema_id) {
      return NextResponse.json({ error: "ID do Emblema é obrigatório." }, { status: 400 });
    }

    const emblemaIdNumber = Number(emblema_id);
    if (isNaN(emblemaIdNumber)) {
      return NextResponse.json({ error: "ID do Emblema inválido." }, { status: 400 });
    }

    const formData = await req.formData();
    const emblema_nome = formData.get("emblema_nome")?.toString();
    const emblema_criterio = formData.get("emblema_criterio")?.toString();
    const emblemas_pontos = formData.get("emblemas_pontos")?.toString();
    const emblemas_status = formData.get("emblemas_status")?.toString();
    const file = formData.get("emblema_imagem") as File;

    // Verifica se o emblema existe
    const currentEmblema = await prisma.emblemas.findUnique({
      where: { emblema_id: emblemaIdNumber },
    });

    if (!currentEmblema) {
      return NextResponse.json({ error: "Emblema não encontrado." }, { status: 404 });
    }

    // Dados para atualização
    const updateData: Prisma.emblemasUpdateInput = {};
    if (emblema_nome) updateData.emblema_nome = emblema_nome;
    if (emblema_criterio) updateData.emblema_criterio = emblema_criterio;

    if (emblemas_pontos) {
      const pontos = Number(emblemas_pontos);
      if (isNaN(pontos)) {
        return NextResponse.json({ error: "Pontos do emblema inválidos." }, { status: 400 });
      }
      updateData.emblemas_pontos = pontos;
    }

    if (emblemas_status) updateData.emblemas_status = emblemas_status;

    // Processa a imagem se houver uma nova
    if (file) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "Apenas arquivos de imagens são permitidos." }, { status: 400 });
      }

      // Remove a imagem antiga se existir
      if (currentEmblema.emblema_imagem) {
        const oldFilePath = path.join(process.cwd(), "public", currentEmblema.emblema_imagem);
        try {
          await fs.unlink(oldFilePath);
        } catch (error) {
          console.warn("Não foi possível remover o arquivo antigo:", oldFilePath, error);
        }
      }

      // Cria um nome único para o novo arquivo
      const now = new Date();
      const timestamp = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-${String(now.getSeconds()).padStart(2, "0")}`;
      const uniqueFileName = `${timestamp}_${file.name}`;

      // Caminho para salvar o arquivo
      const uploadsDir = path.join(process.cwd(), "public", "upload", "emblemas");
      await fs.mkdir(uploadsDir, { recursive: true });

      const filePath = path.join(uploadsDir, uniqueFileName);
      const fileData = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, fileData);

      // Atualiza o caminho da imagem
      updateData.emblema_imagem = `/upload/emblemas/${uniqueFileName}`;
    }

    // Atualiza os dados no banco de dados
    const updatedEmblema = await prisma.emblemas.update({
      where: { emblema_id: emblemaIdNumber },
      data: updateData,
    });

    return NextResponse.json(updatedEmblema, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar Emblema:", error);
    return NextResponse.json({ error: "Erro ao atualizar o Emblema." }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest, { params }: { params: { emblema_id: string } }) {
  try {
    const { emblema_id } = params;

    if (!emblema_id) {
      return NextResponse.json({ error: "ID do Emblema é obrigatório." }, { status: 400 });
    }

    const emblemaIdNumber = Number(emblema_id);
    if (isNaN(emblemaIdNumber)) {
      return NextResponse.json({ error: "ID do Emblema inválido." }, { status: 400 });
    }

    // Verifica se o emblema existe no banco de dados
    const emblema = await prisma.emblemas.findUnique({
      where: { emblema_id: emblemaIdNumber },
    });

    if (!emblema) {
      return NextResponse.json({ error: "Emblema não encontrado." }, { status: 404 });
    }

    // Remove a imagem associada ao emblema, se existir
    if (emblema.emblema_imagem) {
      const oldFilePath = path.join(process.cwd(), "public", emblema.emblema_imagem);
      try {
        await fs.unlink(oldFilePath); // Remove o arquivo da imagem do diretório
      } catch (error) {
        console.warn("Não foi possível remover o arquivo antigo:", oldFilePath, error);
      }
    }

    // Exclui o registro do emblema no banco de dados
    await prisma.emblemas.delete({
      where: { emblema_id: emblemaIdNumber },
    });

    return NextResponse.json({ message: "Emblema excluído com sucesso." }, { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir Emblema:", error);
    return NextResponse.json({ error: "Erro ao excluir o Emblema." }, { status: 500 });
  }
}