// 'use server';

// import { PrismaClient } from '@prisma/client';
// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';

// // Inicialize o Prisma
// const prisma = new PrismaClient();

// export async function PUT(req: Request, { params }: { params: { usuario_id: string } }) {
//   try {
//     console.log("Iniciando PUT...");
//     console.log("Parâmetros recebidos:", params);

//     const body = await req.json();
//     console.log("Dados recebidos no body:", body);

//     // Verifique se o ID é válido
//     if (isNaN(Number(params.usuario_id))) {
//       return NextResponse.json(
//         { error: "ID inválido fornecido" },
//         { status: 400 }
//       );
//     }

//     const { usuario_senha, ...restoDoBody } = body;

//     // Processar senha, se fornecida
//     let hashedPassword;
//     if (usuario_senha) {
//       console.log("Senha fornecida, aplicando bcrypt...");
//       const salt = await bcrypt.genSalt(10);
//       hashedPassword = await bcrypt.hash(usuario_senha, salt);
//     }

//     // Atualizar no banco de dados
//     const usuarioAtualizado = await prisma.usuarios.update({
//       where: { usuario_id: Number(params.usuario_id) },
//       data: {
//         ...restoDoBody,
//         ...(usuario_senha && { usuario_senha: hashedPassword }), // Atualiza a senha se ela for fornecida
//       },
//     });

//     console.log("Dados de Usuário atualizado com sucesso:", usuarioAtualizado);

//     return NextResponse.json(usuarioAtualizado);
//   } catch (error: any) {
//     console.error("Erro ao atualizar usuário:", error);

//     return NextResponse.json(
//       { error: error.message || "Erro interno do servidor" },
//       { status: 500 }
//     );
//   }
// }

'use server';

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Inicialize o Prisma
const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { usuario_id: string } }) {
  try {
    console.log("Iniciando PUT...");
    console.log("Parâmetros recebidos:", params);

    const body = await req.json();
    console.log("Dados recebidos no body:", body);

    // Verifique se o ID é válido
    if (isNaN(Number(params.usuario_id))) {
      return NextResponse.json(
        { error: "ID inválido fornecido" },
        { status: 400 }
      );
    }

    const { usuario_senha, ...restoDoBody } = body;

    // Processar senha, se fornecida
    let hashedPassword;
    if (usuario_senha) {
      console.log("Senha fornecida, aplicando bcrypt...");
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(usuario_senha, salt);
    }

    // Atualizar no banco de dados
    const usuarioAtualizado = await prisma.usuarios.update({
      where: { usuario_id: Number(params.usuario_id) },
      data: {
        ...restoDoBody,
        ...(usuario_senha && { usuario_senha: hashedPassword }), // Atualiza a senha se ela for fornecida
      },
    });

    console.log("Dados de Usuário atualizado com sucesso:", usuarioAtualizado);

    return NextResponse.json(usuarioAtualizado);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao atualizar usuário:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    console.error("Erro desconhecido ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
