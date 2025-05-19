// import { NextResponse } from 'next/server';
// import { PrismaClient } from "@prisma/client";
// import { getTotalSugMelhoria,getTodosSugMelhoria } from '@/app/utils/sugestaoMelhoriaUtils';


// const prisma = new PrismaClient();

// // GET: Lista todas as sugestões
// export async function GET() {
//   try {
//     const [sug_melhoria, getTotalSugMelhoria] = await Promise.all([
//       prisma.sugestao_melhoria.findMany({
//         include: {
//           usuario: true, // inclui os dados do usuário relacionado
//         },
//         orderBy: {
//           sugestao_melhoria_id: 'asc', // ordena da mais recente para a mais antiga (desc)
//         },
//       }),
//       prisma.sugestao_melhoria.count(),
//     ]);

//     return NextResponse.json({ sug_melhoria, getTotalSugMelhoria }, { status: 200 });
//   } catch (error: any) {
//     console.error('Erro ao buscar sugestões:', error);
//     return NextResponse.json(
//       {
//         error: 'Erro ao buscar sugestões',
//         details: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { name, suggestion, userId, tipoEmblemaId } = body;

//     if (!name || !suggestion || !userId || !tipoEmblemaId) {
//       return NextResponse.json({ error: 'Campos obrigatórios não preenchidos' }, { status: 400 });
//     }

//     const novaSugestao = await prisma.sugestao_melhoria.create({
//       data: {
//         sugestao_melhoria_nome: name,
//         sugestao_melhoria_descricao: suggestion,
//         sugestao_melhoria_status: 'enviado', // ou qualquer status padrão
//         usuario_id: parseInt(userId),
//         tipo_emblema_id: tipoEmblemaId,
//       }
//     });

//     return NextResponse.json(novaSugestao, { status: 201 });
//   } catch (error) {
//     console.error('Erro ao salvar sugestão:', error);
//     return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getTodosSugMelhoria, getTotalSugMelhoria } from '@/app/utils/sugestaoMelhoriaUtils';

const prisma = new PrismaClient();


export async function GET() {
  try {
    const sugestoes = await getTodosSugMelhoria();
    const total = await getTotalSugMelhoria();

    return NextResponse.json(
      {
        sug_melhoria: sugestoes,
        totalSugMelhoria: total,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erro ao buscar sugestões:', error);
    return NextResponse.json(
      {
        error: 'Erro ao buscar sugestões',
        details: error.message || "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}







export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      sugestao_melhoria_nome,
      sugestao_melhoria_descricao,
      sugestao_melhoria_status,
      usuario_id,
      tipo_emblema_id,
    } = body;

    if (
      !sugestao_melhoria_nome ||
      !sugestao_melhoria_descricao ||
      usuario_id === undefined ||
      tipo_emblema_id === undefined
    ) {
      return NextResponse.json(
        { error: "Campos obrigatórios não preenchidos" },
        { status: 400 }
      );
    }

    const usuarioIdNum = typeof usuario_id === 'string' ? parseInt(usuario_id) : usuario_id;
    const tipoEmblemaIdNum = typeof tipo_emblema_id === 'string' ? parseInt(tipo_emblema_id) : tipo_emblema_id;

    if (isNaN(usuarioIdNum) || isNaN(tipoEmblemaIdNum)) {
      return NextResponse.json(
        { error: "IDs inválidos" },
        { status: 400 }
      );
    }

    const novaSugestao = await prisma.sugestao_melhoria.create({
      data: {
        sugestao_melhoria_nome,
        sugestao_melhoria_descricao,
        sugestao_melhoria_status: sugestao_melhoria_status || "enviado",
        usuario_id: usuarioIdNum,
        tipo_emblema_id: tipoEmblemaIdNum,
      },
    });

    return NextResponse.json(novaSugestao, { status: 201 });

  } catch (error: unknown) {
    console.error("Erro ao salvar sugestão:", error);
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
