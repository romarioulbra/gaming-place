// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gamingplace.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123';
const DEFAULT_USER_PASSWORD = 'User@123';

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // 1. Criar categorias de jogos com imagens específicas
  console.log('🎮 Criando categorias de jogos...');
  const categorias = await prisma.categoria_jogos.createMany({
    data: [
      {
        categoria_jogo_area_atuacao: 'Comunidade',
        categoria_jogo_icone: '/icons/categoria_jogos/comunidade.svg'
      },
      {
        categoria_jogo_area_atuacao: 'Educação',
        categoria_jogo_icone: '/icons/categoria_jogos/educacao.svg'
      },
      {
        categoria_jogo_area_atuacao: 'Meio Ambiente',
        categoria_jogo_icone: '/icons/categoria_jogos/meio-ambiente.svg'
      },
      {
        categoria_jogo_area_atuacao: 'Saúde',
        categoria_jogo_icone: '/icons/categoria_jogos/saude.svg'
      }
    ],
    skipDuplicates: true
  });

  // 2. Criar emblemas com imagens específicas
  console.log('🛡️ Criando emblemas...');
  const emblemas = await prisma.emblemas.createMany({
    data: [
      {
        emblema_id: 1,
        emblema_nome: 'Dora Aventureira',
        emblema_criterio: 'Completou 3 jogos de aventura',
        emblema_imagem: '/img/emblemas/dora_aventureira.png',
        emblemas_pontos: '30',
        emblemas_status: 'Ativo'
      },
      {
        emblema_id: 2,
        emblema_nome: 'Harry Potter',
        emblema_criterio: 'Completou 5 jogos de magia',
        emblema_imagem: '/img/emblemas/harry_potter.jpg',
        emblemas_pontos: '50',
        emblemas_status: 'Ativo'
      },
      {
        emblema_id: 3,
        emblema_nome: 'Manhattan',
        emblema_criterio: 'Completou 7 jogos de estratégia',
        emblema_imagem: '/img/emblemas/manhattan.jpg',
        emblemas_pontos: '70',
        emblemas_status: 'Ativo'
      },
      {
        emblema_id: 4,
        emblema_nome: 'Robin Hood',
        emblema_criterio: 'Completou 10 jogos de aventura',
        emblema_imagem: '/img/emblemas/robin_hood.png',
        emblemas_pontos: '100',
        emblemas_status: 'Ativo'
      },
      {
        emblema_id: 5,
        emblema_nome: 'Tio Patinhas',
        emblema_criterio: 'Conquistou todos os emblemas',
        emblema_imagem: '/img/emblemas/tio_patinhas.png',
        emblemas_pontos: '200',
        emblemas_status: 'Ativo'
      }
    ],
    skipDuplicates: true
  });

  // 3. Criar tipo de emblemas
  console.log('🏆 Criando tipos de emblemas...');
  const tipoEmblemas = await prisma.tipo_emblemas.createMany({
    data: [
      {
        tipo_emblema_id: 1,
        tipo_emblema_criterio: 'Completou 3 jogos',
        tipo_emblema_pontos: 30,
        emblema_id: 1 // Dora Aventureira
      },
      {
        tipo_emblema_id: 2,
        tipo_emblema_criterio: 'Completou 5 jogos',
        tipo_emblema_pontos: 50,
        emblema_id: 2 // Harry Potter
      },
      {
        tipo_emblema_id: 3,
        tipo_emblema_criterio: 'Completou 7 jogos',
        tipo_emblema_pontos: 70,
        emblema_id: 3 // Manhattan
      },
      {
        tipo_emblema_id: 4,
        tipo_emblema_criterio: 'Completou 10 jogos',
        tipo_emblema_pontos: 100,
        emblema_id: 4 // Robin Hood
      },
      {
        tipo_emblema_id: 5,
        tipo_emblema_criterio: 'Conquistou todos os emblemas',
        tipo_emblema_pontos: 200,
        emblema_id: 5 // Tio Patinhas
      }
    ],
    skipDuplicates: true
  });

  // 4. Criar usuário administrador com avatar padrão
  console.log('👑 Criando usuário administrador...');
  const senhaAdminCriptografada = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const usuarioAdmin = await prisma.usuarios.upsert({
    where: { usuario_email: ADMIN_EMAIL },
    update: {},
    create: {
      usuario_nome: 'Administrador',
      usuario_email: ADMIN_EMAIL,
      usuario_senha: senhaAdminCriptografada,
      usuario_nivel: 'Administrador',
      perfis: {
        create: {
          perfil_imagem: '/img/perfil/avatar_perfil.jpg',
          perfil_cidade: 'Palmas',
          perfil_pontos: 1000,
          perfil_nivel: 10,
          emblema: 5 // Tio Patinhas (emblema mais alto)
        }
      }
    },
    include: {
      perfis: true
    }
  });

  // 5. Criar usuário normal com avatar padrão
  console.log('👤 Criando usuário normal...');
  const senhaUserCriptografada = await bcrypt.hash(DEFAULT_USER_PASSWORD, 10);
  const usuarioNormal = await prisma.usuarios.upsert({
    where: { usuario_email: 'user@gamingplace.com' },
    update: {},
    create: {
      usuario_nome: 'Usuário Normal',
      usuario_email: 'user@gamingplace.com',
      usuario_senha: senhaUserCriptografada,
      usuario_nivel: 'Normal',
      perfis: {
        create: {
          perfil_imagem: '/img/perfil/avatar_perfil.jpg',
          perfil_cidade: 'Palmas',
          perfil_pontos: 100,
          perfil_nivel: 1,
          emblema: 1 // Dora Aventureira (emblema inicial)
        }
      }
    },
    include: {
      perfis: true
    }
  });

  // 6. Criar jogos de exemplo
  console.log('🕹️ Criando jogos de exemplo...');
  const jogos = await prisma.jogos.createMany({
    data: [
      {
        jogos_nome: 'Aventura na Comunidade',
        jogos_descricao: 'Ajude a construir uma comunidade melhor',
        jogos_link: 'https://jogo-comunidade.com',
        jogos_url_img: '/img/jogos/comunidade.jpg',
        jogos_autor: 'Equipe Gaming Place',
        categoria_jogo_id: 1 // Comunidade
      },
      {
        jogos_nome: 'Desafios Educacionais',
        jogos_descricao: 'Aprenda brincando com desafios educativos',
        jogos_link: 'https://jogo-educacao.com',
        jogos_url_img: '/img/jogos/educacao.jpg',
        jogos_autor: 'Equipe Gaming Place',
        categoria_jogo_id: 2 // Educação
      },
      {
        jogos_nome: 'Guardião do Meio Ambiente',
        jogos_descricao: 'Proteja a natureza neste jogo emocionante',
        jogos_link: 'https://jogo-meio-ambiente.com',
        jogos_url_img: '/img/jogos/meio-ambiente.jpg',
        jogos_autor: 'Equipe Gaming Place',
        categoria_jogo_id: 3 // Meio Ambiente
      },
      {
        jogos_nome: 'Aventura na Saúde',
        jogos_descricao: 'Aprenda sobre saúde de forma divertida',
        jogos_link: 'https://jogo-saude.com',
        jogos_url_img: '/img/jogos/saude.jpg',
        jogos_autor: 'Equipe Gaming Place',
        categoria_jogo_id: 4 // Saúde
      }
    ],
    skipDuplicates: true
  });

  console.log('✅ Seed concluído com sucesso!');
  console.log('🔑 Credenciais do administrador:');
  console.log(`📧 Email: ${ADMIN_EMAIL}`);
  console.log(`🔒 Senha: ${ADMIN_PASSWORD}`);
  console.log('👤 Credenciais do usuário normal:');
  console.log('📧 Email: user@gamingplace.com');
  console.log(`🔒 Senha: ${DEFAULT_USER_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });