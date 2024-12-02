import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
 import { PrismaClient } from "@prisma/client"; // Usando Prisma como exemplo para banco

const prisma = new PrismaClient();

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" },
      },
      
      async authorize(credentials) {
        // Verifique o email no banco de dados
        const usuario = await prisma.usuarios.findUnique({
          where: { usuario_email: credentials?.email },
        });

        if (!usuario) {
          throw new Error("Usuário não encontrado.");
        }

        // Verifique a senha
        const isValid = await bcrypt.compare(credentials?.senha || "", usuario.usuario_senha);
        if (!isValid) {
          throw new Error("Senha inválida.");
        }

        // Retorne os dados do usuário para a sessão
        return { id: usuario.usuario_id, email: usuario.usuario_email, nome: usuario.usuario_nome, nivel: usuario.usuario_nivel };
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
      }
      return token;
    },
    
    async session({ session, token }) {
      session.usuario = {
        id: token.id,
        email: token.email,
        nome: token.nome,
        nivel: token.nivel,
      };
      return session;
    },
  },
  pages: {
    signIn: "/dashboard",
  },
};

// Exportação obrigatória para o App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };