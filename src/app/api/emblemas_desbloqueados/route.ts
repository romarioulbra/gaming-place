// /app/api/emblemas-desbloqueados/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const usuarioId = Number(searchParams.get("usuarioId"));

  if (!usuarioId) {
    return NextResponse.json({ error: "Usuário não informado." }, { status: 400 });
  }

  try {
    // Busca todos os emblemas desbloqueados do usuário
    // const emblemas = await prisma.usuario_tipo_emblema.findMany({
    //   where: {
    //     usuarioId,
    //     usuario_emblema_status: "desbloqueado",
    //   },
    //   include: {
    //     tipo_emblema: true,
    //   },
    // });
    const emblemas = await prisma.usuario_tipo_emblema.findMany({
  where: {
    usuarioId,
  },
  include: {
    tipo_emblema: true,
  },
});


    return NextResponse.json({ emblemas });
  } catch (error) {
    console.error("Erro ao buscar emblemas desbloqueados:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
