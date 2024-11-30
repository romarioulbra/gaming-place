import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
 // Para verificar a senha
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
    async jwt({ token, usuario }) {
      if (usuario) {
        token.id = usuario.id;
        token.email = usuario.email;
        token.nome = usuario.nome;
        token.nivel = usuario.nivel;
      }
      return token;
    },
    async session({ session, token }) {
      session.usuario = token;
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