"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AcessoNegado from "@/app/components/UsuarioInacessivel";
import { TypewriterEffect } from "@/app/components/EscreverEfeito";

export default function Dashboard() {
  const {data: session} = useSession();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      // Função para buscar o perfil do usuário
      const fetchPerfil = async () => {
        try {
          const response = await fetch("/api/perfis");
          if (response.ok) {
            const data = await response.json();
            setPerfil(data); // Armazena os dados do perfil no estado
          } else {
            console.error("Erro ao buscar perfil:", response.statusText);
          }
        } catch (error) {
          console.error("Erro ao buscar perfil:", error);
        } finally {
          setLoading(false); // Finaliza o carregamento
        }
      };

      fetchPerfil();
    }
  }, [session]);

  if (!session) {
    return <AcessoNegado />;
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!perfil) {
    return <p>Perfil não encontrado.</p>;
  }

  // Acessa os dados do usuário na sessão e do perfil
  const { nome, nivel } = session.usuario;
  const { perfil_imagem, perfil_pontos, perfil_nivel } = perfil;

  const xp = 500; // XP necessário para o próximo nível

  // Calcula a porcentagem da barra de progresso
  const progresso = Math.min((perfil_pontos / xp) * 100, 100); // Garante que não ultrapasse 100%



  const fullText = [
    "Peersonalize seu perfil, ",
    "acompanhe seu progresso, ",
    "ganhe pontos e desbloqueie emblemas, ",
    "dispute posições no ranking e ",
    "indique amigos para recompensas exclusivas. ",
    "Explore, evolua e celebre cada conquista!"
  ].join(''); // Junta tudo em uma única string


  // const paragrafoText = "AAqui você pode acompanhar seu progresso, interagir com a comunidade e desbloquear novas conquistas!"

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-300 to-indigo-200 pt-14">
        {/* Boas-vindas */}
        <main className="flex flex-col items-center justify-center text-center">
          {/* Exibe a imagem do perfil com efeitos */}
          <div className="relative w-60 h-60 rounded-full p-1 transition-all duration-300">
            <div className="absolute inset-0 bg-white/20 rounded-full"></div> {/* Fundo desfocado */}
            <Image
              className="rounded-full object-cover w-full h-full border-4 border-white hover:scale-105 transition-transform duration-300"
              width={200}
              height={200}
              src={perfil_imagem || "/img/avatar_perfil.jpg"} 
              alt="Foto do usuário"
            />
            <div className="absolute inset-0 rounded-full border-4 border-white shadow-[0_0_20px_5px_rgba(255,255,255,0.8)]"></div> {/* Brilho ao redor da imagem */}
          </div>

          <h1 className="text-4xl font-extrabold text-text mt-6">
            Bem-vindo, <span className="text-pink-600">{nome}</span>!
          </h1>
          <p className="mt-4 text-lg text-text">Nível: {nivel}</p>
          <p className="mt-4 text-lg text-text">Estamos felizes em ter você por aqui!</p>

          {/* Barra de progresso do XP */}
          <div className="mt-8 w-full max-w-md mx-auto">
            <div className="bg-gray-400 h-3 rounded-full overflow-hidden">
              <div
                className="bg-pink-600 h-full transition-all duration-500"
                style={{ width: `${progresso}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-black font-bold">
              Seu nível: {perfil_nivel} | XP: {perfil_pontos} / {xp}
            </p>
          </div>
        </main>

        <div className="mt-16 mx-8 text-center bg-white/30 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white/40 hover:-translate-y-1 hover:bg-white/40 group">
          <h2 className="text-2xl font-extrabold text-black mb-4 drop-shadow-lg bg-gradient-to-r from-black/80 to-black/60 bg-clip-text text-transparent">
            Seu Espaço, Suas Conquistas
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 inline-block">🚀</span>
          </h2>
          <div className="text-black/90 leading-relaxed text-lg [text-shadow:_0_1px_2px_rgb(255_255_255_/_80%)]">
            <TypewriterEffect 
              text={fullText}
              speed={30}
              delay={500}
              cursor={true}
              blinkWhenComplete={true} // Ativa o efeito de piscar
              blinkSpeed={600} // Velocidade do piscar (opcional)
              className="font-semibold"
            />
          </div>
        </div>
      </div>
    </>
  );
}
