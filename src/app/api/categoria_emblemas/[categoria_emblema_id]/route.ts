// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

// // Tipagem padrão aceita pelo App Router
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { categoria_emblema_id: string } }
// ) {
//   const categoriaEmblemaId = parseInt(params.categoria_emblema_id);

//   if (isNaN(categoriaEmblemaId)) {
//     return NextResponse.json({ error: 'ID inválido.' }, { status: 400 });
//   }

//   const categoriaExistente = await prisma.tipo_emblemas.findUnique({
//     where: { tipo_emblema_id: categoriaEmblemaId },
//   });

//   if (!categoriaExistente) {
//     return NextResponse.json({ error: 'Categoria não encontrada.' }, { status: 404 });
//   }

//   await prisma.tipo_emblemas.delete({
//     where: { tipo_emblema_id: categoriaEmblemaId },
//   });

//   return NextResponse.json({
//     success: true,
//     message: 'Categoria excluída com sucesso.',
//     deletedId: categoriaEmblemaId,
//   });
// }



// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { categoria_emblema_id: string } }
// ) {
//   const categoriaEmblemaId = parseInt(params.categoria_emblema_id);

//   if (isNaN(categoriaEmblemaId)) {
//     return NextResponse.json({ error: 'ID inválido.' }, { status: 400 });
//   }

//   const body = await req.json();
//   const { emblema_id, tipo_emblema_criterio, tipo_emblema_pontos } = body;

//   if (!emblema_id || !tipo_emblema_criterio || tipo_emblema_pontos === undefined) {
//     return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
//   }

//   const categoria = await prisma.tipo_emblemas.findUnique({
//     where: { tipo_emblema_id: categoriaEmblemaId },
//   });

//   if (!categoria) {
//     return NextResponse.json({ error: 'Categoria não encontrada.' }, { status: 404 });
//   }

//   const emblema = await prisma.emblemas.findUnique({
//     where: { emblema_id },
//   });

//   if (!emblema) {
//     return NextResponse.json({ error: 'Emblema não encontrado.' }, { status: 404 });
//   }

//   const atualizada = await prisma.tipo_emblemas.update({
//     where: { tipo_emblema_id: categoriaEmblemaId },
//     data: {
//       emblema_id,
//       tipo_emblema_criterio,
//       tipo_emblema_pontos,
//     },
//     include: {
//       emblema: {
//         select: {
//           emblema_nome: true,
//         },
//       },
//     },
//   });

//   return NextResponse.json({ success: true, data: atualizada });
// }


import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Tipagem padrão aceita pelo App Router
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ categoria_emblema_id: string }> }
) {
  const categoriaEmblemaId = parseInt((await params).categoria_emblema_id)

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
  { params }: { params: Promise<{ categoria_emblema_id: string }> }
) {
  const categoriaEmblemaId = parseInt((await params).categoria_emblema_id)

  if (isNaN(categoriaEmblemaId)) {
    return NextResponse.json({ error: 'ID inválido.' }, { status: 400 })
  }

  const body = await req.json()
  const { emblema_id, tipo_emblema_criterio, tipo_emblema_pontos } = body

  if (!emblema_id || !tipo_emblema_criterio || tipo_emblema_pontos === undefined) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
  }

  const categoria = await prisma.tipo_emblemas.findUnique({
    where: { tipo_emblema_id: categoriaEmblemaId },
  })

  if (!categoria) {
    return NextResponse.json({ error: 'Categoria não encontrada.' }, { status: 404 })
  }

  const emblema = await prisma.emblemas.findUnique({
    where: { emblema_id },
  })

  if (!emblema) {
    return NextResponse.json({ error: 'Emblema não encontrado.' }, { status: 404 })
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
  })

  return NextResponse.json({ success: true, data: atualizada })
}
