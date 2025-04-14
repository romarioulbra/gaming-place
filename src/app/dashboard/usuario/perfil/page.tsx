"use client";
import Ranking from "@/app/components/Ranking";
import Image from "next/image";
import Emblemas from "@/app/components/Emblemas";
import { useSession } from "next-auth/react";
import BarraProgresso from "@/app/components/BarraProgresso";
import { useState, useEffect } from "react";
import ModalAdicionarAmigo from "@/app/components/ModalAdicionarAmigo";
import  EnviarSugestão from "../../../components/EnviarSugestão";


export default function Perfil() {
  const { data: session, status } = useSession();

  const [perfil, setPerfil] = useState({
    perfil_imagem: "/img/avatar_perfil.jpg",
    perfil_cidade: "Cidade não informada",
    perfil_pontos: 0,
    perfil_nivel: 1,
    emblema: 0,
  });

  useEffect(() => {
    if (session?.usuario?.id) {
      fetch("/api/perfis") 
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setPerfil(data);
          }
        })
        .catch((error) => console.error("Erro ao buscar perfil:", error));
    }
  }, [session]);

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (!session?.usuario) {
    return <p>Usuário não autenticado.</p>;
  }

  const { nome, email, nivel, id } = session.usuario;
  const { perfil_imagem, perfil_cidade, perfil_pontos, emblema } = perfil;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log(session);
  return (
    <div className="bg-gradient-to-b from-gray-300 to-indigo-200 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl p-6 bg-purple-600 text-white rounded-xl shadow-lg space-y-6 m-2">
        
        {/* Perfil */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={perfil_imagem}
              alt="Foto de perfil"
              className="rounded-full object-cover w-24 h-24 mx-auto border-1 border-slate-500 shadow-md shadow-indigo-800"
              width={100}
              height={100}
            />
            <div>
              <h2 className="text-2xl font-bold">{nome}</h2>
              <p className="text-sm text-gray-300">{email}</p>
              <p className="text-sm text-gray-300">{perfil_cidade}</p>
            </div>
          </div>
          <div>
            <p className="text-sm">Troféus: <span className="font-bold">{emblema}</span></p>
            <p className="text-sm">Pontos: <span className="font-bold text-yellow-400">{perfil_pontos}</span></p>
            <p className="text-sm">Nível: <span className="font-bold text-green-400">{nivel}</span></p>
          </div>
        </div>

        <BarraProgresso />
        <Emblemas />
        <Ranking />

        {/* Botões de Ação */}
        <div className="flex space-x-4">
          <button 
            className="flex-1 bg-pink-600 py-2 rounded-lg hover:bg-pink-700"
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar amigos
          </button>
          
          {/* <button className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700">
            Enviar sugestão
          </button> */}

          <EnviarSugestão dadosUsuario={session}/>
        </div>

        {/* Renderiza o modal quando estiver aberto */}
        {isModalOpen && <ModalAdicionarAmigo isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
      </div>
    </div>
  );
}
