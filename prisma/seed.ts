import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

async function main() {
  // Criar um emblema padrão
  const emblemaPadrao = await prisma.emblemas.upsert({
    where: { emblema_id: 1 },
    update: {},
    create: {
      emblema_nome: 'Iniciante',
      emblema_criterio: 'Primeiro login no sistema',
      emblema_imagem: 'url_da_imagem_padrao.png',
      emblemas_pontos: '10',
      emblemas_status: 'Ativo',
    },
  });

  // Criar um usuário administrador
  const senhaCriptografada = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const usuarioAdmin = await prisma.usuarios.upsert({
    where: { usuario_email: ADMIN_EMAIL },
    update: {},
    create: {
      usuario_nome: 'Administrador',
      usuario_email: ADMIN_EMAIL,
      usuario_senha: senhaCriptografada,
      usuario_nivel: 'admin',
    },
  });

  // Criar um perfil padrão associado ao administrador e ao emblema
  await prisma.perfis.upsert({
    where: { perfil_id: 1 },
    update: {},
    create: {
      perfil_imagem: 'default-avatar.png',
      perfil_cidade: 'Cidade Padrão',
      perfil_pontos: 0,
      perfil_nivel: 1,
      usuario: usuarioAdmin.usuario_id,
      emblema: emblemaPadrao.emblema_id,
    },
  });

  console.log('Seed executado com sucesso! 🚀');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
