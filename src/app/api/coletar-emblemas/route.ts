import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { usuarioId, tipoEmblemaId } = await req.json();

    // Busca pontos acumulados para esse tipo de emblema
    const usuarioEmblema = await prisma.usuario_tipo_emblema.findFirst({
      where: { usuarioId, tipoEmblemaId },
    });

    if (!usuarioEmblema || usuarioEmblema.usuario_emblema_pontos <= 0) {
      return NextResponse.json({ error: "Nenhum ponto a coletar." }, { status: 400 });
    }

    const pontosColetados = usuarioEmblema.usuario_emblema_pontos;

    // Atualiza os pontos no perfil
    const perfil = await prisma.perfis.update({
      where: { usuarioId },
      data: {
        perfil_pontos: {
          increment: pontosColetados,
        },
      },
    });

    // Verifica se ultrapassou a meta para subir nível
    const tipoEmblema = await prisma.tipo_emblemas.findUnique({
      where: { tipo_emblema_id: tipoEmblemaId },
    });

    let novoNivel = perfil.perfil_nivel;

    if (perfil.perfil_pontos >= tipoEmblema?.emblemas_pontos!) {
      novoNivel += 1;

      await prisma.perfis.update({
        where: { usuarioId },
        data: { perfil_nivel: novoNivel },
      });
    }

    // Reseta os pontos do tipo_emblema após coleta
    await prisma.usuario_tipo_emblema.updateMany({
      where: { usuarioId, tipoEmblemaId },
      data: {
        usuario_emblema_pontos: 0,
        usuario_emblema_status: "coletado",
      },
    });

    return NextResponse.json({ sucesso: true, pontosColetados, novoNivel });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao coletar emblema." }, { status: 500 });
  }
}
