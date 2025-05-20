import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getTodosSugMelhoria, getTotalSugMelhoria } from '@/app/utils/sugestaoMelhoriaUtils';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('Iniciando busca de sugestões...');
    const [sugestoes, total] = await Promise.all([
      getTodosSugMelhoria(),
      getTotalSugMelhoria()
    ]);

    console.log(`Encontradas ${sugestoes.length} sugestões de ${total} total`);
    
    return NextResponse.json({
      sug_melhoria: sugestoes,
      totalSugMelhoria: total,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Erro completo:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return NextResponse.json({
      error: 'Erro ao buscar sugestões',
      details: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'Erro interno',
      type: error.name
    }, { status: 500 });
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
