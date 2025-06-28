import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { AuthOptions } from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";


const prisma = new PrismaClient();

export async function GET() {
  try {
    // Obtém a sessão do usuário autenticado
    const session = await getServerSession(authOptions);

    // Verifica se o usuário está autenticado
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    // Buscar o perfil no banco pelo email do usuário logado
    const usuario  = await prisma.usuarios.findUnique({
      where: { usuario_email: session.user.email }, // Certifique-se que `usuario` é o campo correto no banco
      select: { usuario_id: true }, // Apenas pegar o ID
    });

    if (!usuario) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }


     // Agora buscar o perfil com base no usuario_id
     const perfil = await prisma.perfis.findFirst({
      where: { usuario: usuario.usuario_id }, // Agora usa o ID correto
      select: {
        perfil_id: true,
        perfil_imagem: true,
        perfil_cidade: true,
        perfil_pontos: true,
        perfil_nivel: true,
        emblema: true,
      },
    });

    if (!perfil) {
      return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 });
    }


    return NextResponse.json(perfil);
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return NextResponse.json({ error: "Erro interno ao buscar perfil" }, { status: 500 });
  }
}

