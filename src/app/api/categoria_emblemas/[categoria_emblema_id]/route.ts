// import { PrismaClient } from '@prisma/client'
// import { NextResponse } from 'next/server'

// const prisma = new PrismaClient()

// export async function DELETE(
//   request: Request,
//   { params }: { params: { categoria_emblema_id: string } }
// ) {
//   try {
//     const categoriaEmblemaId = parseInt(params.categoria_emblema_id);

//     // Validação do ID
//     if (isNaN(categoriaEmblemaId)) {
//       return NextResponse.json(
//         { error: 'ID da categoria de emblema inválido.' },
//         { status: 400 }
//       );
//     }

//     // Verifica se existe antes de deletar
//     const categoriaExistente = await prisma.tipo_emblemas.findUnique({
//       where: { tipo_emblema_id: categoriaEmblemaId }
//     });

//     if (!categoriaExistente) {
//       return NextResponse.json(
//         { error: 'Categoria de emblema não encontrada.' },
//         { status: 404 }
//       );
//     }

//     // Executa a exclusão
//     await prisma.tipo_emblemas.delete({
//       where: { tipo_emblema_id: categoriaEmblemaId }
//     });

//     return NextResponse.json(
//       { 
//         success: true,
//         message: 'Categoria de emblema excluída com sucesso.',
//         deletedId: categoriaEmblemaId
//       },
//       { status: 200 }
//     );
    
//   } catch (error: unknown) {
//     const err = error as Error;
//     console.error('Erro ao excluir categoria de emblema:', err);
//     return NextResponse.json(
//       { 
//         success: false,
//         error: 'Erro interno ao processar a exclusão.',
//         details: err.message
//       },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }


// export async function PUT(
//   request: Request,
//   { params }: { params: { categoria_emblema_id: string } }
// ) {
//   try {
//     // Extrai o ID da URL
//     const categoriaEmblemaId = parseInt(params.categoria_emblema_id);
    
//     if (isNaN(categoriaEmblemaId)) {
//       return NextResponse.json(
//         { error: 'ID da categoria de emblema inválido' },
//         { status: 400 }
//       );
//     }

//     // Parseia os dados do corpo da requisição
//     const body = await request.json();
//     const { emblema_id, tipo_emblema_criterio, tipo_emblema_pontos } = body;

//     // Validação dos dados
//     if (!emblema_id || !tipo_emblema_criterio || tipo_emblema_pontos === undefined) {
//       return NextResponse.json(
//         { error: 'Todos os campos são obrigatórios' },
//         { status: 400 }
//       );
//     }

//     // Verifica se a categoria existe
//     const categoriaExistente = await prisma.tipo_emblemas.findUnique({
//       where: { tipo_emblema_id: categoriaEmblemaId },
//     });

//     if (!categoriaExistente) {
//       return NextResponse.json(
//         { error: 'Categoria de emblema não encontrada' },
//         { status: 404 }
//       );
//     }

//     // Verifica se o emblema existe
//     const emblemaExistente = await prisma.emblemas.findUnique({
//       where: { emblema_id: emblema_id },
//     });

//     if (!emblemaExistente) {
//       return NextResponse.json(
//         { error: 'Emblema não encontrado' },
//         { status: 404 }
//       );
//     }

//     // Atualiza a categoria no banco de dados
//     const categoriaAtualizada = await prisma.tipo_emblemas.update({
//       where: { tipo_emblema_id: categoriaEmblemaId },
//       data: {
//         emblema_id,
//         tipo_emblema_criterio,
//         tipo_emblema_pontos,
//       },
//       include: {
//         emblema: {
//           select: {
//             emblema_nome: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       data: {
//         tipo_emblema_id: categoriaAtualizada.tipo_emblema_id,
//         emblema_id: categoriaAtualizada.emblema_id,
//         emblema_nome: categoriaAtualizada.emblema?.emblema_nome,
//         tipo_emblema_criterio: categoriaAtualizada.tipo_emblema_criterio,
//         tipo_emblema_pontos: categoriaAtualizada.tipo_emblema_pontos,
//       },
//     });

//   } catch (error: unknown) {
//     const err = error as Error;
//     console.error('Erro ao atualizar categoria de emblema:', err);
//     return NextResponse.json(
//       { error: 'Erro interno do servidor', details: err.message },
//       { status: 500 }
//     );
//   }
// }




import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Tipagem padrão aceita pelo App Router
export async function DELETE(
  req: NextRequest,
  { params }: { params: { categoria_emblema_id: string } }
) {
  const categoriaEmblemaId = parseInt(params.categoria_emblema_id);

  if (isNaN(categoriaEmblemaId)) {
    return NextResponse.json({ error: 'ID inválido.' }, { status: 400 });
  }

  const categoriaExistente = await prisma.tipo_emblemas.findUnique({
    where: { tipo_emblema_id: categoriaEmblemaId },
  });

  if (!categoriaExistente) {
    return NextResponse.json({ error: 'Categoria não encontrada.' }, { status: 404 });
  }

  await prisma.tipo_emblemas.delete({
    where: { tipo_emblema_id: categoriaEmblemaId },
  });

  return NextResponse.json({
    success: true,
    message: 'Categoria excluída com sucesso.',
    deletedId: categoriaEmblemaId,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { categoria_emblema_id: string } }
) {
  const categoriaEmblemaId = parseInt(params.categoria_emblema_id);

  if (isNaN(categoriaEmblemaId)) {
    return NextResponse.json({ error: 'ID inválido.' }, { status: 400 });
  }

  const body = await req.json();
  const { emblema_id, tipo_emblema_criterio, tipo_emblema_pontos } = body;

  if (!emblema_id || !tipo_emblema_criterio || tipo_emblema_pontos === undefined) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
  }

  const categoria = await prisma.tipo_emblemas.findUnique({
    where: { tipo_emblema_id: categoriaEmblemaId },
  });

  if (!categoria) {
    return NextResponse.json({ error: 'Categoria não encontrada.' }, { status: 404 });
  }

  const emblema = await prisma.emblemas.findUnique({
    where: { emblema_id },
  });

  if (!emblema) {
    return NextResponse.json({ error: 'Emblema não encontrado.' }, { status: 404 });
  }

  const atualizada = await prisma.tipo_emblemas.update({
    where: { tipo_emblema_id: categoriaEmblemaId },
    data: {
      emblema_id,
      tipo_emblema_criterio,
      tipo_emblema_pontos,
    },
    include: {
      emblema: {
        select: {
          emblema_nome: true,
        },
      },
    },
  });

  return NextResponse.json({ success: true, data: atualizada });
}
