import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    console.log('Entrou no try')
    const { pathname } = request.nextUrl;
    const id = pathname.split('/').pop();

    const sugestaoId = parseInt(id || '');
    if (isNaN(sugestaoId)) {
      return NextResponse.json({ error: 'ID da sugestão inválido' }, { status: 400 });
    }

    const { status } = await request.json();
    if (!status || !['validada', 'rejeitada'].includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido. Deve ser "validada" ou "rejeitada"' },
        { status: 400 }
      );
    }

    // Atualiza o status da sugestão
    const sugestao = await prisma.sugestao_melhoria.update({
      where: { sugestao_melhoria_id: sugestaoId },
      data: { sugestao_melhoria_status: status },
      include: {
        tipo_emblema: true,
        usuario: true
      }
    });

    console.log('Sugestão atualizada:', sugestao);

    if (status === 'validada') {
      if (!sugestao.tipo_emblema || !sugestao.usuario) {
        throw new Error('Dados relacionados (tipo_emblema ou usuario) não encontrados');
      }

      await processarEmblemaUsuario(sugestao);
      // await atualizarPontosPerfil(sugestao.usuario_id);
    }

    return NextResponse.json({
      success: true,
      message: 'Status atualizado com sucesso'
    });

  } catch (error: any) {
    console.error('Erro completo:', error);
    return NextResponse.json({
      error: 'Erro ao processar validação',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

// async function processarEmblemaUsuario(sugestao: any) {
//   const usuarioEmblema = await prisma.usuario_tipo_emblema.findFirst({
//     where: {
//       usuarioId: sugestao.usuario_id,
//       tipoEmblemaId: sugestao.tipo_emblema_id
//     }
//   });

//   const pontos = sugestao.tipo_emblema.tipo_emblema_pontos;

//   if (!usuarioEmblema) {
//     await prisma.usuario_tipo_emblema.create({
//       data: {
//         usuarioId: sugestao.usuario_id,
//         tipoEmblemaId: sugestao.tipo_emblema_id,
//         usuario_emblema_pontos: pontos,
//         sugestao_id: sugestao.sugestao_melhoria_id
//       }
//     });
//   } else {
//     await prisma.usuario_tipo_emblema.update({
//       where: { usuario_emblema_id: usuarioEmblema.usuario_emblema_id },
//       data: {
//         usuario_emblema_pontos: { increment: pontos }
//       }
//     });
//   }
// }


async function processarEmblemaUsuario(sugestao: any) {
  const usuarioEmblema = await prisma.usuario_tipo_emblema.findFirst({
    where: {
      usuarioId: sugestao.usuario_id,
      tipoEmblemaId: sugestao.tipo_emblema_id
    }
  });

  const pontos = sugestao.tipo_emblema.tipo_emblema_pontos;

  if (!usuarioEmblema) {
    // Cria novo registro, já com status 'DESBLOQUEADO' pois pontos > 0
    await prisma.usuario_tipo_emblema.create({
      data: {
        usuarioId: sugestao.usuario_id,
        tipoEmblemaId: sugestao.tipo_emblema_id,
        usuario_emblema_pontos: pontos,
        usuario_emblema_status: pontos > 0 ? 'DESBLOQUEADO' : 'BLOQUEADO',
        sugestao_id: sugestao.sugestao_melhoria_id
      }
    });
  } else {
    // Incrementa pontos e atualiza status conforme o novo valor
    const novosPontos = usuarioEmblema.usuario_emblema_pontos + pontos;
    
    await prisma.usuario_tipo_emblema.update({
      where: { usuario_emblema_id: usuarioEmblema.usuario_emblema_id },
      data: {
        usuario_emblema_pontos: { increment: pontos },
        usuario_emblema_status: novosPontos > 0 ? 'DESBLOQUEADO' : 'BLOQUEADO'
      }
    });
  }
}

// async function atualizarPontosPerfil(usuarioId: number) {
//   try {
//     // 1. Calcular a soma TOTAL de todos os pontos dos emblemas do usuário
//     const { _sum } = await prisma.usuario_tipo_emblema.aggregate({
//       where: { usuarioId },
//       _sum: { usuario_emblema_pontos: true }
//     });

//     const totalPontos = _sum.usuario_emblema_pontos || 0;

//     // 2. Encontrar todos os emblemas que podem ser desbloqueados com esses pontos
//     const emblemasDesbloqueados = await prisma.emblemas.findMany({
//       where: { emblemas_pontos: { lte: totalPontos } }
//     });

//     // 3. Verificar se o perfil já existe
//     const perfilExistente = await prisma.perfis.findFirst({
//       where: { usuario: usuarioId }
//     });

//     // 4. Calcular o nível baseado nos pontos totais
//     const novoNivel = Math.floor(totalPontos / 1000) + 1;

//     if (perfilExistente) {
//       // Atualizar perfil existente com os pontos TOTAIS (não somar novamente)
//       await prisma.perfis.update({
//         where: { perfil_id: perfilExistente.perfil_id },
//         data: {
//           perfil_pontos: totalPontos, // Usar o total calculado, não somar com o existente
//           perfil_nivel: novoNivel,
//           emblema: {
//             // Conectar todos os emblemas desbloqueados (substitui os anteriores)
//             set: emblemasDesbloqueados.map(e => ({ emblema_id: e.emblema_id }))
//           }
//         }
//       });
//     } else {
//       // Criar novo perfil com os pontos totais
//       await prisma.perfis.create({
//         data: {
//           usuario: usuarioId,
//           perfil_pontos: totalPontos,
//           perfil_nivel: novoNivel,
//           emblema: {
//             connect: emblemasDesbloqueados.map(e => ({ emblema_id: e.emblema_id }))
//           }
//         }
//       });
//     }
//   } catch (error) {
//     console.error('Erro ao atualizar perfil:', error);
//     throw error;
//   }
// }

