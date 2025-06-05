import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { status } = await request.json();
  const sugestaoId = parseInt(params.id);

  try {
    // 1. Atualizar status da sugestão
    const sugestao = await prisma.sugestao_melhoria.update({
      where: { sugestao_melhoria_id: sugestaoId },
      data: { sugestao_melhoria_status: status },
      include: {
        tipo_emblema: true,
        usuario: true
      }
    });

    if (status === 'validada') {
      // 2. Verificar se já existe registro do usuário com este tipo de emblema
      const usuarioEmblema = await prisma.usuario_tipo_emblema.findFirst({
        where: {
          usuarioId: sugestao.usuario_id,
          tipoEmblemaId: sugestao.tipo_emblema_id
        }
      });

      if (!usuarioEmblema) {
        // 3. Criar novo registro se não existir
        await prisma.usuario_tipo_emblema.create({
          data: {
            usuarioId: sugestao.usuario_id,
            tipoEmblemaId: sugestao.tipo_emblema_id,
            usuario_emblema_pontos: sugestao.tipo_emblema.tipo_emblema_pontos,
            sugestao_id: sugestao.sugestao_melhoria_id,
            data_desbloqueio: new Date()
          }
        });
      } else {
        // 4. Atualizar pontos se já existir
        await prisma.usuario_tipo_emblema.update({
          where: { usuario_emblema_id: usuarioEmblema.usuario_emblema_id },
          data: {
            usuario_emblema_pontos: {
              increment: sugestao.tipo_emblema.tipo_emblema_pontos
            }
          }
        });
      }

      // 5. Atualizar pontos totais no perfil
      await atualizarPontosPerfil(sugestao.usuario_id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar validação' },
      { status: 500 }
    );
  }
}

async function atualizarPontosPerfil(usuarioId: number) {
  // 1. Calcular pontos totais do usuário
  const pontosTotais = await prisma.usuario_tipo_emblema.aggregate({
    where: { usuarioId },
    _sum: { usuario_emblema_pontos: true }
  });

  const totalPontos = pontosTotais._sum.usuario_emblema_pontos || 0;

  // 2. Encontrar emblemas que o usuário pode desbloquear
  const emblemasDesbloqueados = await prisma.emblemas.findMany({
    where: {
      emblemas_pontos: {
        lte: totalPontos
      }
    }
  });

  // 3. Atualizar perfil do usuário
  await prisma.perfis.update({
    where: { usuario: usuarioId },
    data: {
      perfil_pontos: totalPontos,
      // Atualizar nível baseado em alguma lógica (ex: 1000 pontos por nível)
      perfil_nivel: Math.floor(totalPontos / 1000) + 1,
      // Adicionar emblemas desbloqueados
      emblema: {
        connect: emblemasDesbloqueados.map(emb => ({ emblema_id: emb.emblema_id }))
      }
    }
  });
}