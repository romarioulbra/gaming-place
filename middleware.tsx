import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Obter URL da requisição
  const url = req.nextUrl.clone();

  // Rotas protegidas
  const adminPaths = ['/dashboard/administrador'];
  const userPaths = ['/dashboard/usuario_login'];

  // Verificar se o token existe
  if (!token) {
    url.pathname = '/auth/login'; // Redirecionar para login
    return NextResponse.redirect(url);
  }

  // Controle de acesso para administrador
  if (adminPaths.includes(url.pathname)) {
    if (token.usuario_nivel !== 'Administrador') {
      url.pathname = '/403'; // Página de acesso negado
      return NextResponse.redirect(url);
    }
  }

  // Controle de acesso para usuários logados
  if (userPaths.includes(url.pathname)) {
    if (!['Administrador', 'Logado'].includes(token.usuario_nivel)) {
      url.pathname = '/403'; // Página de acesso negado
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configurar onde o middleware será aplicado
export const config = {
  matcher: ['/dashboard/:path*'], // Aplica às rotas do dashboard
};
