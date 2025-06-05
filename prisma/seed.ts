// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123';

const USER_EMAIL = process.env.USER_EMAIL || 'user@gmail.com';
const USER_PASSWORD = process.env.USER_PASSWORD || 'User@123';
// const DEFAULT_USER_PASSWORD = process.env.DEFAULT_USER_PASSWORD || 'User@123';

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // 1. Criar categorias de jogos com imagens específicas
  console.log('🎮 Criando categorias de jogos...');
  const categorias = await prisma.categoria_jogos.createMany({
    data: [
      {
        categoria_jogo_area_atuacao: 'Comunidade',
        categoria_jogo_icone: '/upload/categoria_jogos/comunidade.svg'
      },
      {
        categoria_jogo_area_atuacao: 'Educação',
        categoria_jogo_icone: '/upload/categoria_jogos/educacao.svg'
      },
      {
        categoria_jogo_area_atuacao: 'Meio Ambiente',
        categoria_jogo_icone: '/upload/categoria_jogos/meio-ambiente.svg'
      },
      {
        categoria_jogo_area_atuacao: 'Saúde',
        categoria_jogo_icone: '/upload/categoria_jogos/saude.svg'
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
        emblema_criterio: 'Explorador, curioso, desbravador',
        emblema_imagem: '/upload/emblemas/dora_aventureira.png',
        // emblemas_pontos_atuais:'0',
        emblemas_pontos: 900,
        emblemas_status: 'desbloqueado'
      },
      {
        emblema_id: 2,
        emblema_nome: 'Harry Potter',
        emblema_criterio: 'Criativo, geek, amante de conhecimento',
        emblema_imagem: '/upload/emblemas/harry_potter.jpg',
        // emblemas_pontos_atuais:'0',
        emblemas_pontos: 500,
        emblemas_status: 'bloqueado'
      },
      {
        emblema_id: 3,
        emblema_nome: 'Manhattan',
        emblema_criterio: 'Estrategista, competitivo e elegante',
        emblema_imagem: '/upload/emblemas/manhattan.jpg',
        // emblemas_pontos_atuais:'0',
        emblemas_pontos: 600,
        emblemas_status: 'bloqueado'
      },
      {
        emblema_id: 4,
        emblema_nome: 'Robin Hood',
        emblema_criterio: 'Colaborativo, altruísta, espírito de equipe',
        emblema_imagem: '/upload/emblemas/robin_hood.png',
        // emblemas_pontos_atuais:'0',
        emblemas_pontos: 500,
        emblemas_status: 'bloqueado'
      },
      {
        emblema_id: 5,
        emblema_nome: 'Tio Patinhas',
        emblema_criterio: 'Econômico, acumulador, analítico',
        emblema_imagem: '/upload/emblemas/tio_patinhas.png',
        // emblemas_pontos_atuais:'0',
        emblemas_pontos: 750,
        emblemas_status: 'bloqueado'
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
        tipo_emblema_criterio: 'Reportar bugs ou inconsistências que afetam a jogabilidade',
        tipo_emblema_pontos: 100,
        emblema_id: 1 // Dora Aventureira
      },
      {
        tipo_emblema_id: 2,
        tipo_emblema_criterio: 'Sugerir nomes, personagens ou histórias para jogos em desenvolvimento',
        tipo_emblema_pontos: 50,
        emblema_id: 2 // Harry Potter
      },
      {
        tipo_emblema_id: 3,
        tipo_emblema_criterio: 'Sugerir melhorias ou atualizações para jogos da plataforma',
        tipo_emblema_pontos: 85,
        emblema_id: 3 // Manhattan
      },
      {
        tipo_emblema_id: 4,
        tipo_emblema_criterio: 'Enviar feedbacks construtivos sobre experiências multiplayer',
        tipo_emblema_pontos: 100,
        emblema_id: 4 // Robin Hood
      },
      {
        tipo_emblema_id: 5,
        tipo_emblema_criterio: 'Postar avaliações de jogos gratuitos ou acessíveis',
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
          perfil_imagem: '/upload/perfil/avatar_perfil.jpg',
          perfil_cidade: 'Palmas',
          perfil_pontos: 0,
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
  const senhaUserCriptografada = await bcrypt.hash(USER_PASSWORD, 10);
  const usuarioNormal = await prisma.usuarios.upsert({
    where: { usuario_email: USER_EMAIL},
    update: {},
    create: {
      usuario_nome: 'Normal',
      usuario_email: USER_EMAIL,
      usuario_senha: senhaUserCriptografada,
      usuario_nivel: 'Normal',
      perfis: {
        create: {
          perfil_imagem: '/upload/perfil/avatar_perfil.jpg',
          perfil_cidade: 'Palmas',
          perfil_pontos: 0,
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
        jogos_nome: 'Logic Girl',
        jogos_descricao: 'Um jogo mobile para incentivar mulheres na aprendizagem de logica de programação e despertar o interesse para a área de TI.',
        jogos_link: 'https://play.unity.com/en/games/1abfdfae-9416-4a88-b1a0-c640e97d5654/logic-girl',
        jogos_url_img: '/img/logic_girl.png',
        jogos_autor: 'Stefan Luks',
        categoria_jogo_id: 1 // Comunidade
      },
      {
        jogos_nome: 'KnightScrum',
        jogos_descricao: 'É um jogo mobile de gênero RPG, desenvolvido com intuito de auxiliar no estudo e na prática dos conceitos da Métodologia de Desenvolvimento Ágil Scrum',
        jogos_link: 'http://www.knightscrum.com.br/',
        jogos_url_img: '/img/KnightScrum.png',
        jogos_autor: 'Raphael A Bentes',
        categoria_jogo_id: 2 // Educação
      },
      {
        jogos_nome: 'Terra Verde',
        jogos_descricao: 'Terraverde é um jogo para dispositivos móveis (Android) estilo RPG (Role-Playing Game) simplificado',
        jogos_link: 'https://sites.google.com/rede.ulbra.br/terraverde',
        jogos_url_img: '/img/jogos/meio-ambiente.jpg',
        jogos_autor: 'Adan',
        categoria_jogo_id: 3 // Meio Ambiente
      },
      {
        jogos_nome: 'Aventura na Saúde',
        jogos_descricao: 'Aprenda sobre saúde de forma divertida',
        jogos_link: 'https://jogo-saude.com',
        jogos_url_img: '/img/terraVerde.jpg',
        jogos_autor: 'Equipe Gaming Place',
        categoria_jogo_id: 4 // Saúde
      }
    ],
    skipDuplicates: true
  });

  // 7. Relacionar usuário normal aos tipos de emblema
  console.log('🔗 Relacionando usuário normal aos tipos de emblemas...');
  const tiposEmblemas = await prisma.tipo_emblemas.findMany();

  await Promise.all(
    tiposEmblemas.map(async (tipo) => {
      const status = tipo.emblema_id === 1 ? 'DESBLOQUEADO' : 'BLOQUEADO';

      await prisma.usuario_tipo_emblema.upsert({
        where: {
          usuarioId_tipoEmblemaId: {
            usuarioId: usuarioNormal.usuario_id,
            tipoEmblemaId: tipo.tipo_emblema_id,
          },
        },
        update: {},
        create: {
          usuarioId: usuarioNormal.usuario_id,
          tipoEmblemaId: tipo.tipo_emblema_id,
          usuario_emblema_pontos: 0,
          usuario_emblema_status: status,
        }
      });
    })
  );


  console.log('✅ Seed concluído com sucesso!');
  console.log('🔑 Credenciais do administrador:');
  console.log(`📧 Email: ${ADMIN_EMAIL}`);
  console.log(`🔒 Senha: ${ADMIN_PASSWORD}`);
  console.log('👤 Credenciais do usuário normal:');
  console.log(`📧 Email: ${USER_EMAIL}`);
  console.log(`🔒 Senha: ${USER_PASSWORD}`);

}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });