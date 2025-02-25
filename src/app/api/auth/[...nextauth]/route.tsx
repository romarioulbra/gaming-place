
import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client"; 

const prisma = new PrismaClient();

const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Sessão expira em 1 dias
    updateAge: 12 * 60 * 60, // Atualiza o token a cada 12 horas
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" },
      },
      
      async authorize(credentials) {
        // Verifica o email no banco de dados
        const usuario = await prisma.usuarios.findUnique({
          where: { usuario_email: credentials?.email },
        });

        if (!usuario) {
          throw new Error("Usuário não encontrado.");
        }

        // Verifica a senha
        const isValid = await bcrypt.compare(credentials?.senha || "", usuario.usuario_senha);
        if (!isValid) {
          throw new Error("Senha inválida.");
        }

// xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx ideia de Join xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx

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
// Atenção neste bloco
// xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx ideia de Join xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx

        // Retorna os dados do usuário para a sessão
        return { 
          id: usuario.usuario_id, 
          email: usuario.usuario_email, 
          nome: usuario.usuario_nome, 
          nivel: usuario.usuario_nivel,
          // perfil_imagem: perfil.perfil_imagem || "/img/avatar.jpg", // Garante uma imagem padrão
          perfil_imagem: perfil.perfil_imagem,
          cidade: perfil.perfil_cidade,

        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.nome = user.nome;
        token.nivel = user.nivel;
        token.perfil_imagem = user.perfil_imagem; // Adiciona a imagem ao token
        token.cidade = user.perfil_cidade; // Adiciona a imagem ao token
      }
      return token;
    },
    
    async session({ session, token }) {
      session.usuario = {
        id: token.id,
        email: token.email,
        nome: token.nome,
        nivel: token.nivel,
        perfil_imagem: token.perfil_imagem, // Adiciona a imagem à sessão
        cidade: token.perfil_cidade, 
      };
      return session;
    },
  },
  pages: {
    signIn: "/dashboard/usuario/login", // Garante que a página de login seja usada corretamente
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Exportação obrigatória para o App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };

