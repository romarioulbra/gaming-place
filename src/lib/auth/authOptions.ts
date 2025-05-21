import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 12 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const usuario = await prisma.usuarios.findUnique({
          where: { usuario_email: credentials?.email },
        });

        if (!usuario) throw new Error("Usuário não encontrado.");

        const isValid = await bcrypt.compare(credentials?.senha || "", usuario.usuario_senha);
        if (!isValid) throw new Error("Senha inválida.");

        const perfil = await prisma.perfis.findFirst({
          where: { usuario: usuario.usuario_id },
          select: {
            perfil_id: true,
            perfil_imagem: true,
            perfil_cidade: true,
            perfil_pontos: true,
            perfil_nivel: true,
            emblema: true,
          },
        });

        if (!perfil) throw new Error("Perfil não encontrado.");

        return {
          id: usuario.usuario_id,
          email: usuario.usuario_email,
          nome: usuario.usuario_nome,
          nivel: usuario.usuario_nivel,
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
        token.perfil_imagem = user.perfil_imagem;
        token.perfil_cidade = user.cidade;
      }
      return token;
    },
    async session({ session, token }) {
      session.usuario = {
        id: token.id,
        email: token.email,
        nome: token.nome,
        nivel: token.nivel,
        perfil_imagem: token.perfil_imagem,
        cidade: token.perfil_cidade,
      };
      return session;
    },
  },
  pages: {
    signIn: "/dashboard/usuario/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
