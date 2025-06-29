// types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    usuario: {
      id: number;
      email: string;
      name: string;
      nivel: string;
      perfil_imagem: string;
      cidade: string;
    };
  }

  interface JWT {
    id: number;
    email: string;
    name: string;
    nivel: string;
    perfil_imagem: string;
    perfil_cidade: string;
  }
}
