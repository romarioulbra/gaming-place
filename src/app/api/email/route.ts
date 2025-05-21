import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email} = await req.json();
    const accessLink = process.env.LINK_SERVIDOR;

    if (!name || !email ) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SRV_SMTP,
      port: process.env.PORTA,
      secure: false, // true para 465, false para outros
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Bem-vindo ao GamingPlace!",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb;">
          <div style="max-width: 600px; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1); text-align: center;">
      
            <h2 style="color: #1e293b;">Bem-vindo ao GamingPlace!</h2>
            <p style="color: #475569; alignt-text:justify">
              O Gaming Place é uma plataforma gamificada que concentra todos os jogos desenvolvidos na ULBRA Palmas. 
              Organizamos jogos em categorias como saúde, social, educação e acessibilidade, facilitando o acesso e a divulgação 
              dos desenvolvedores. Um ambiente único, pensado para unir diversão e aprendizado.
            </p>          
            <p style="color: #475569;">
              Esta mensagem foi enviada por <span style="color: #1e40af; font-weight: bold;">${name}</span> para te recomendar a conhecer a nossa plataforma incrível!
            </p> 
            <p style="color: #475569;">
              Clique no botão abaixo para acessar e reconhecer a plataforma!
            </p>
            <a href="${accessLink}" style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
              Acessar GamingPlace
            </a>
            <p style="font-size: 12px; color: #94a3b8;">© 2025 GamingPlace. Todos os direitos reservados.</p>
          </div>
        </div>
      `,
    };


      try {
        const info = await transporter.sendMail(mailOptions);
        console.log("E-mail enviado:", info);
        return NextResponse.json({ success: true, message: "E-mail enviado com sucesso!" });
      } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return NextResponse.json({ error: "Erro ao enviar e-mail" }, { status: 500 });
      }


    await transporter.sendMail(mailOptions);

    // return NextResponse.json({ success: true, message: "E-mail enviado com sucesso!" });
    return NextResponse.json({ success: true, message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return NextResponse.json({ error: "Erro ao enviar e-mail" }, { status: 500 });
  }
}
