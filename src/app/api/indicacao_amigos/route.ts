// // Funcionando perfietamente

// import { NextResponse } from "next/server";
// import { PrismaClient } from '@prisma/client';
// import nodemailer from 'nodemailer';

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("Dados recebidos:", body);

//     // Validação dos campos
//     const requiredFields = [
//       'usuario_indicador_id', 
//       'indicacao_amigo_email_indicador',
//       'indicacao_amigo_email_indicado'
//     ];
    
//     const missingFields = requiredFields.filter(field => !body[field]);
    
//     if (missingFields.length > 0) {
//       return NextResponse.json(
//         { 
//           error: "Campos obrigatórios faltando",
//           missingFields 
//         },
//         { status: 400 }
//       );
//     }

//     // 1. Gravar no banco de dados
//     const indicacao = await prisma.indicacao_amigo.create({
//       data: {
//         usuario_indicador_id: Number(body.usuario_indicador_id),
//         indicacao_amigo_email_indicador: body.indicacao_amigo_email_indicador,
//         indicacao_amigo_email_indicado: body.indicacao_amigo_email_indicado,
//         status_convite: body.status_convite || 'enviado',
//         data_indicacao: new Date(),
//       }
//     });

//     // 2. Enviar e-mail
//     const transporter = nodemailer.createTransport({
//       host: process.env.SRV_SMTP,
//       port: Number(process.env.PORTA),
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: body.indicacao_amigo_email_indicado,
//       subject: "Você foi indicado no GamingPlace!",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb;">
//           <div style="max-width: 600px; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1); text-align: center;">
//             <h2 style="color: #1e293b;">Você foi indicado no GamingPlace!</h2>
//             <p style="color: #475569; text-align: justify;">
//               O Gaming Place é uma plataforma gamificada que concentra todos os jogos desenvolvidos na ULBRA Palmas.
//               Organizamos jogos em categorias como saúde, social, educação e acessibilidade.
//             </p>
//             <p style="color: #475569;">
//               <strong>${body.indicacao_amigo_email_indicador}</strong> te indicou para conhecer nossa plataforma!
//             </p>
//             <p style="color: #475569;">
//               Clique no botão abaixo para acessar:
//             </p>
//             <a href="${process.env.LINK_SERVIDOR}" style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">
//               Acessar GamingPlace
//             </a>
//             <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
//               © ${new Date().getFullYear()} GamingPlace. Todos os direitos reservados.
//             </p>
//           </div>
//         </div>
//       `,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("E-mail enviado:", info.messageId);

//     return NextResponse.json({
//       success: true,
//       message: "Indicação registrada e e-mail enviado com sucesso!",
//       data: indicacao
//     });

//   } catch (error) {
//     console.error("Erro completo:", error);
//     return NextResponse.json(
//       { 
//         error: "Erro no servidor",
//         details: error instanceof Error ? error.message : String(error)
//       },
//       { status: 500 }
//     );
//   }
// }




// // Alternativa com TOKEN testar para funcionar
// import { NextResponse } from "next/server";
// import { PrismaClient } from '@prisma/client';
// import nodemailer from 'nodemailer';
// import jwt from 'jsonwebtoken';

// const prisma = new PrismaClient();

// const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSecreto';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("Dados recebidos:", body);

//     const requiredFields = [
//       'usuario_indicador_id', 
//       'indicacao_amigo_email_indicador',
//       'indicacao_amigo_email_indicado'
//     ];
    
//     const missingFields = requiredFields.filter(field => !body[field]);
    
//     if (missingFields.length > 0) {
//       return NextResponse.json(
//         { 
//           error: "Campos obrigatórios faltando",
//           missingFields 
//         },
//         { status: 400 }
//       );
//     }

//     // Grava no banco
//     const indicacao = await prisma.indicacao_amigo.create({
//       data: {
//         usuario_indicador_id: Number(body.usuario_indicador_id),
//         indicacao_amigo_email_indicador: body.indicacao_amigo_email_indicador,
//         indicacao_amigo_email_indicado: body.indicacao_amigo_email_indicado,
//         status_convite: body.status_convite || 'enviado',
//         data_indicacao: new Date(),
//       }
//     });

//     // Gera token JWT com email e id do indicador e indicações
//     const tokenPayload = {
//       email: body.indicacao_amigo_email_indicado,
//       usuario_indicador_id: Number(body.usuario_indicador_id),
//       indicacao_id: indicacao.id,
//     };

//     const token = jwt.sign(tokenPayload, JWT_SECRET, {
//       expiresIn: '7d', // expira em 7 dias
//     });

//     // Monta link com token
//     const emailEncoded = encodeURIComponent(body.indicacao_amigo_email_indicado);
//     const linkAcesso = `${process.env.LINK_SERVIDOR}/${emailEncoded}?token=${token}`;

//     // Configura o email
//     const transporter = nodemailer.createTransport({
//       host: process.env.SRV_SMTP,
//       port: Number(process.env.PORTA),
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: body.indicacao_amigo_email_indicado,
//       subject: "Você foi indicado no GamingPlace!",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb;">
//           <div style="max-width: 600px; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1); text-align: center;">
//             <h2 style="color: #1e293b;">Você foi indicado no GamingPlace!</h2>
//             <p style="color: #475569; text-align: justify;">
//               O Gaming Place é uma plataforma gamificada que concentra todos os jogos desenvolvidos na ULBRA Palmas.
//               Organizamos jogos em categorias como saúde, social, educação e acessibilidade.
//             </p>
//             <p style="color: #475569;">
//               <strong>${body.indicacao_amigo_email_indicador}</strong> te indicou para conhecer nossa plataforma!
//             </p>
//             <p style="color: #475569;">
//               Clique no botão abaixo para acessar:
//             </p>
//             <a href="${linkAcesso}" style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">
//               Acessar GamingPlace
//             </a>
//             <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
//               © ${new Date().getFullYear()} GamingPlace. Todos os direitos reservados.
//             </p>
//           </div>
//         </div>
//       `,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("E-mail enviado:", info.messageId);

//     return NextResponse.json({
//       success: true,
//       message: "Indicação registrada e e-mail enviado com sucesso!",
//       data: indicacao
//     });

//   } catch (error) {
//     console.error("Erro completo:", error);
//     return NextResponse.json(
//       { 
//         error: "Erro no servidor",
//         details: error instanceof Error ? error.message : String(error)
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSecreto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Dados recebidos:", body);

    const requiredFields = [
      'usuario_indicador_id',
      'indicacao_amigo_email_indicador',
      'indicacao_amigo_email_indicado'
    ];

    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Campos obrigatórios faltando",
          missingFields
        },
        { status: 400 }
      );
    }

    // Verifica se o usuário indicador existe
    const usuarioIndicador = await prisma.usuarios.findUnique({
      where: { usuario_id: Number(body.usuario_indicador_id) },
    });

    if (!usuarioIndicador) {
      return NextResponse.json(
        {
          error: "Usuário indicador não encontrado com o ID fornecido."
        },
        { status: 404 }
      );
    }

    // Grava a indicação no banco
    const indicacao = await prisma.indicacao_amigo.create({
      data: {
        usuario_indicador_id: Number(body.usuario_indicador_id),
        indicacao_amigo_email_indicador: body.indicacao_amigo_email_indicador,
        indicacao_amigo_email_indicado: body.indicacao_amigo_email_indicado,
        status_convite: body.status_convite?.toUpperCase() || 'ENVIADO',
        data_indicacao: new Date(),
      }
    });

    // Gera token JWT com dados da indicação
    const tokenPayload = {
      email: body.indicacao_amigo_email_indicado,
      usuario_indicador_id: Number(body.usuario_indicador_id),
      indicacao_id: indicacao.indicacao_amigo_id,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: '7d',
    });

    // Monta o link com o token
    const emailEncoded = encodeURIComponent(body.indicacao_amigo_email_indicado);
    const linkAcesso = `${process.env.LINK_SERVIDOR}/${emailEncoded}?token=${token}`;

    // Configura o e-mail
    const transporter = nodemailer.createTransport({
      host: process.env.SRV_SMTP,
      port: Number(process.env.PORTA),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: body.indicacao_amigo_email_indicado,
      subject: "Você foi indicado no GamingPlace!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb;">
          <div style="max-width: 600px; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1); text-align: center;">
            <h2 style="color: #1e293b;">Você foi indicado no GamingPlace!</h2>
            <p style="color: #475569; text-align: justify;">
              O Gaming Place é uma plataforma gamificada que concentra todos os jogos desenvolvidos na ULBRA Palmas.
              Organizamos jogos em categorias como saúde, social, educação e acessibilidade.
            </p>
            <p style="color: #475569;">
              <strong>${body.indicacao_amigo_email_indicador}</strong> te indicou para conhecer nossa plataforma!
            </p>
            <p style="color: #475569;">
              Clique no botão abaixo para acessar:
            </p>
            <a href="${linkAcesso}" style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">
              Acessar GamingPlace
            </a>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
              © ${new Date().getFullYear()} GamingPlace. Todos os direitos reservados.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado:", info.messageId);

    return NextResponse.json({
      success: true,
      message: "Indicação registrada e e-mail enviado com sucesso!",
      data: indicacao
    });

  } catch (error) {
    console.error("Erro completo:", error);
    return NextResponse.json(
      {
        error: "Erro no servidor",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
