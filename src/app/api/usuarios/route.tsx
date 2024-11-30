'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';
 // Para verificar senhas criptografadas
// import jwt from "jsonwebtoken"; // Para autenticação com tokens (opcional)

const prisma = new PrismaClient();

// Função de Listagem de Dados
export async function GET() {
  try {
    const users = await prisma.usuarios.findMany({
      select: {
        usuario_id: true,
        usuario_nome: true,
        usuario_email: true,
        usuario_senha: true,
        usuario_nivel: true,
        usuario_criacao: true,
        usuario_alteracao: true,
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.message);
    return NextResponse.json(
      { error: 'Erro ao buscar usuários', details: error.message },
      { status: 500 }
    );
  }
}





// Função de Inserção de Dados Funcionando total
// export async function POST(req: Request) {
//   const { usuario_nome, usuario_email, usuario_senha,usuario_nivel } = await req.json();

//   try {
//     const newUsuario = await prisma.usuarios.create({
//       data: {
//         usuario_nome,
//         usuario_email,
//         usuario_senha,
//         usuario_nivel
//       },
//     });

//     return NextResponse.json(newUsuario, { status: 201 });
//   } catch (error) {
//    console.error('Erro ao criar usuario:', error);
//     return NextResponse.json({ error: 'Erro ao criar Usuario.' }, { status: 500 });
//   }
// }

// Função de Inserção de Dados
export async function POST(req: Request) {
  const { usuario_nome, usuario_email, usuario_senha, usuario_nivel } = await req.json();

  try {
    // Gerar o hash da senha antes de salvar no banco
    const salt = await bcrypt.genSalt(10); // Número de rounds (10 é padrão)
    const hashedPassword = await bcrypt.hash(usuario_senha, salt);

    // Criar o novo usuário com a senha criptografada
    const newUsuario = await prisma.usuarios.create({
      data: {
        usuario_nome,
        usuario_email,
        usuario_senha: hashedPassword, // Salvar a senha criptografada
        usuario_nivel,
      },
    });

    return NextResponse.json(newUsuario, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json({ error: 'Erro ao criar usuário.' }, { status: 500 });
  }
}





// Inserção com token

// export async function POST(req: Request) {
//   try {
//     const { email, senha } = await req.json();

//     // Verifica se o email foi enviado
//     if (!email || !senha) {
//       return NextResponse.json(
//         { error: "Email e senha são obrigatórios." },
//         { status: 400 }
//       );
//     }

//     // Busca o usuário no banco de dados pelo email
//     const usuario = await prisma.usuarios.findUnique({
//       where: { usuario_email: email },
//     });

//     if (!usuario) {
//       return NextResponse.json(
//         { error: "Email não cadastrado." },
//         { status: 404 }
//       );
//     }

//     // Verifica a senha utilizando bcrypt
//     const senhaCorreta = await bcrypt.compare(senha, usuario.usuario_senha);

//     if (!senhaCorreta) {
//       return NextResponse.json(
//         { error: "Senha incorreta." },
//         { status: 401 }
//       );
//     }

//     // Se necessário, gere um token JWT (opcional)
//     const token = jwt.sign(
//       { id: usuario.usuario_id, nivel: usuario.usuario_nivel },
//       process.env.JWT_SECRET || "secreta",
//       { expiresIn: "1h" }
//     );

//     return NextResponse.json({
//       message: "Login bem-sucedido!",
//       token, // Inclua o token se necessário
//       usuario: {
//         id: usuario.usuario_id,
//         nome: usuario.usuario_nome,
//         email: usuario.usuario_email,
//         nivel: usuario.usuario_nivel,
//       },
//     });
//   } catch (error) {
//     console.error("Erro ao processar o login:", error);
//     return NextResponse.json(
//       { error: "Erro ao processar o login." },
//       { status: 500 }
//     );
//   }
// }





// Função de Alteração de Dados funcionando Total
// export async function PUT(req: Request) {
//   const { usuario_id, usuario_nome, usuario_email, usuario_senha,usuario_nivel } = await req.json();

//   try {
//     const updatedUsuario = await prisma.usuarios.update({
//       where: { id: Number(usuario_id) },
//       data: {
//         usuario_nome,
//         usuario_email,
//         usuario_senha,
//         usuario_nivel
//       },
//     });

//     return NextResponse.json(updatedUsuario, { status: 200 });
//   } catch (error) {
//     console.error('Erro ao atualizar Usuario:', error);
//     return NextResponse.json({ error: 'Erro ao atualizar Usuário.' }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }


// Função de Alteração de Dados
// export async function PUT(req: Request) {
//   const { usuario_id, usuario_nome, usuario_email, usuario_senha, usuario_nivel } = await req.json();

//   try {
//     let hashedPassword;

//     // Se uma nova senha for fornecida, criptografe-a
//     if (usuario_senha) {
//       const salt = await bcrypt.genSalt(10); // Define o número de rounds para o bcrypt
//       hashedPassword = await bcrypt.hash(usuario_senha, salt);
//     }

//     // Atualizar os dados no banco
//     const updatedUsuario = await prisma.usuarios.update({
//       where: { id: Number(usuario_id) },
//       data: {
//         usuario_nome,
//         usuario_email,
//         ...(usuario_senha && { usuario_senha: hashedPassword }), // Atualiza a senha apenas se fornecida
//         usuario_nivel,
//       },
//     });

//     return NextResponse.json(updatedUsuario, { status: 200 });
//   } catch (error) {
//     console.error('Erro ao atualizar Usuário:', error);
//     return NextResponse.json({ error: 'Erro ao atualizar Usuário.' }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }



// Função de Exclusão de Dados
export async function DELETE(req: Request) {
  
  const { searchParams } = new URL(req.url);  
  const usuario_id = searchParams.get("usuario_id"); // Captura o ID do registro a ser excluído

  if (!usuario_id || isNaN(Number(usuario_id))) {
    return NextResponse.json({ error: "ID inválido ou não fornecido" }, { status: 400 });
  }

  try {
    await prisma.usuarios.delete({
      where: { usuario_id: Number(usuario_id) },
    });

    return NextResponse.json({ message: "Registro excluído com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir o registro:', error);
    return NextResponse.json({ error: 'Erro ao excluir registro.' }, { status: 500 });
  } 
}