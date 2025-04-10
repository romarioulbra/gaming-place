import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, name, suggestion, userId } = body;

    if (!title || !name || !suggestion || !userId) {
      return NextResponse.json({ error: 'Campos obrigatórios não preenchidos' }, { status: 400 });
    }

    const novaSugestao = await prisma.sugestao_melhoria.create({
      data: {
        sugestao_melhoria_titulo: title,
        sugestao_melhoria_nome: name,
        sugestao_melhoria_descricao: suggestion,
        sugestao_melhoria_status: 'enviado', // ou qualquer status padrão
        usuario_id: parseInt(userId),
      }
    });

    return NextResponse.json(novaSugestao, { status: 201 });
  } catch (error) {
    console.error('Erro ao salvar sugestão:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { title, name, suggestion, userId } = body;

//     if (!title || !name || !suggestion || !userId) {
//       return NextResponse.json({ error: 'Campos obrigatórios não preenchidos' }, { status: 400 });
//     }

//     // Cria a nova sugestão
//     const novaSugestao = await prisma.sugestao_melhoria.create({
//       data: {
//         sugestao_melhoria_titulo: title,
//         sugestao_melhoria_nome: name,
//         sugestao_melhoria_descricao: suggestion,
//         sugestao_melhoria_status: 'enviado',
//         usuario_id: parseInt(userId),
//       }
//     });

//     // Atualiza os pontos do perfil
//     const perfil = await prisma.perfis.updateMany({
//       where: {
//         usuario: parseInt(userId),
//       },
//       data: {
//         perfil_pontos: {
//           increment: 100,
//         }
//       }
//     });

//     return NextResponse.json({ novaSugestao, pontosAtualizados: perfil }, { status: 201 });
//   } catch (error) {
//     console.error('Erro ao salvar sugestão:', error);
//     return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
//   }
// }


