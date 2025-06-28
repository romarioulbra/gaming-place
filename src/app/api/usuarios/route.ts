'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getAllUsuarios, getTotalUsuarios  } from '@/app/utils/userUtils';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSecreto';

export async function GET() {
  try {
    const [users, totalUsuarios] = await Promise.all([
      getAllUsuarios(),
      getTotalUsuarios(),
    ]);

    return NextResponse.json({ users, totalUsuarios }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: 'Erro ao buscar usuários', details: err.message },
      { status: 500 }
    );
  }
}


// // Função de Inserção de Dados
// export async function POST(req: Request) {
  
//   const { usuario_nome, usuario_email, usuario_senha, usuario_nivel } = await req.json();

//   try {
//     // Gerar hash da senha
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(usuario_senha, salt);

//     // Criar usuário e perfil ao mesmo tempo
//     const newUsuario = await prisma.usuarios.create({
//       data: {
//         usuario_nome,
//         usuario_email,
//         usuario_senha: hashedPassword,
//         usuario_nivel,
//         perfis: {
//           create: {
//             perfil_imagem: "/img/avatar.jpg", // Imagem padrão
//             perfil_cidade: "",
//             perfil_pontos: 0, // Valor inicial de pontos
//             perfil_nivel: 1, // Nível inicial
//             emblema: 1,
//           },
//         },
//       },
//       include: {
//         perfis: true, // Retorna o perfil junto com o usuário criado
//       },
//     });

//     return NextResponse.json(newUsuario, { status: 201 });
//   } catch (error) {
//     console.error("Erro ao criar usuário e perfil:", error);
//     return NextResponse.json({ error: "Erro ao criar usuário e perfil." }, { status: 500 });
//   }
// }


// // Função de Exclusão de Dados
// export async function DELETE(req: Request) {
  
//   const { searchParams } = new URL(req.url);  
//   const usuario_id = searchParams.get("usuario_id"); // Captura o ID do registro a ser excluído

//   if (!usuario_id || isNaN(Number(usuario_id))) {
//     return NextResponse.json({ error: "ID inválido ou não fornecido" }, { status: 400 });
//   }

//   try {
//     await prisma.usuarios.delete({
//       where: { usuario_id: Number(usuario_id) },
//     });

//     return NextResponse.json({ message: "Registro excluído com sucesso!" }, { status: 200 });
//   } catch (error) {
//     console.error('Erro ao excluir o registro:', error);
//     return NextResponse.json({ error: 'Erro ao excluir registro.' }, { status: 500 });
//   } 
// }


export async function POST(req: Request) {
  const body = await req.json();
  const { usuario_nome, usuario_email, usuario_senha, token } = body;

  try {
    const existing = await prisma.usuarios.findUnique({
      where: { usuario_email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "E-mail já cadastrado. Tente fazer login ou use outro." },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(usuario_senha, salt);

    let perfil_pontos = 0;
    let usuario_indicador_id: number | null = null;
    let indicacao_id: number | null = null;

    if (token) {
      try {
        const payload = jwt.verify(token, JWT_SECRET) as {
          email: string;
          usuario_indicador_id: number;
          indicacao_id: number;
        };

        if (payload.email === usuario_email) {
          // Verifica se o usuario_indicador realmente existe
          const indicadorExiste = await prisma.usuarios.findUnique({
            where: { usuario_id: payload.usuario_indicador_id },
          });

          if (indicadorExiste) {
            usuario_indicador_id = payload.usuario_indicador_id;
            indicacao_id = payload.indicacao_id;
            perfil_pontos = 50;
          }
        }
      } catch (err) {
        console.warn("Token de indicação inválido ou expirado.");
      }
    }

    const newUsuario = await prisma.usuarios.create({
      data: {
        usuario_nome,
        usuario_email,
        usuario_senha: hashedPassword,
        usuario_nivel: "Normal",
        perfis: {
          create: {
            perfil_imagem: "/img/avatar.jpg",
            perfil_cidade: "",
            perfil_pontos,
            perfil_nivel: 1,
            emblema: 1,
          },
        },
      },
      include: {
        perfis: true,
      },
    });

    if (usuario_indicador_id && indicacao_id) {
      await prisma.$transaction([
        prisma.indicacao_amigo.update({
          where: { indicacao_amigo_id: indicacao_id },
          data: { status_convite: "CADASTRADO" },
        }),
        prisma.perfis.updateMany({
          where: { usuario: usuario_indicador_id },
          data: {
            perfil_pontos: {
              increment: 100,
            },
          },
        }),
      ]);
    }

    return NextResponse.json(newUsuario, { status: 201 });

  } catch (error: any) {
    console.error("Erro ao criar usuário e perfil:", error);
    return NextResponse.json(
      {
        error: "Erro ao criar usuário e perfil.",
        message: error?.message || "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
