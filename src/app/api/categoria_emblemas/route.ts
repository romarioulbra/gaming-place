'use server'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { getTodosCatEmblemas, getTotalCatEmblemas   } from '@/app/utils/catEmblemasUtils';

const prisma = new PrismaClient()

export async function GET() {
  try {
    const [cat_emblemas, totalCatEmblemas] = await Promise.all([
      getTodosCatEmblemas(),
      getTotalCatEmblemas(),
    ]);

    // Substitui emblema_id pelo nome do emblema
    const dadosTratados = cat_emblemas.map((item) => ({
      ...item,
      emblema_id: item.emblema?.emblema_nome || 'Sem nome',
    }));

    return NextResponse.json(
      { cat_emblemas: dadosTratados, totalCatEmblemas },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar Categorias de Emblemas', details: error.message },
      { status: 500 }
    );
  }
}


// POST - cadastrar novo tipo_emblema
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 415 }
      );
    }

    const body = await req.json();
    
    // Validação dos campos
    if (!body.tipo_emblema_criterio || typeof body.tipo_emblema_criterio !== 'string') {
      return NextResponse.json(
        { error: 'tipo_emblema_criterio é obrigatório e deve ser uma string' },
        { status: 400 }
      );
    }

    if (!body.tipo_emblema_pontos || isNaN(Number(body.tipo_emblema_pontos)) || Number(body.tipo_emblema_pontos) < 0) {
      return NextResponse.json(
        { error: 'tipo_emblema_pontos é obrigatório e deve ser um número positivo' },
        { status: 400 }
      );
    }

    if (!body.emblema_id || isNaN(Number(body.emblema_id))) {
      return NextResponse.json(
        { error: 'emblema_id é obrigatório e deve ser um número' },
        { status: 400 }
      );
    }

    // Verificar se o emblema existe
    const emblemaExistente = await prisma.emblemas.findUnique({
      where: { emblema_id: Number(body.emblema_id) },
    });

    if (!emblemaExistente) {
      return NextResponse.json(
        { error: 'Emblema não encontrado' },
        { status: 404 }
      );
    }

    const novoTipo = await prisma.tipo_emblemas.create({
      data: {
        tipo_emblema_criterio: body.tipo_emblema_criterio.trim(),
        tipo_emblema_pontos: Number(body.tipo_emblema_pontos),
        emblema_id: Number(body.emblema_id),
      },
    });

    return NextResponse.json(novoTipo, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar tipo de emblema:', error);
    
    if (error instanceof Error) {
      // Verificar se é um erro de violação de chave única ou outra restrição do banco
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'Já existe uma categoria com esses critérios' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'Erro ao criar tipo de emblema', details: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erro desconhecido ao criar tipo de emblema' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}