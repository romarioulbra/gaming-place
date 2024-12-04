'use client';
import React from "react";
import Image from "next/image";
import { useSession,signOut } from "next-auth/react";
// import Navbar from "../../components/MenuNavbar";


export default function Dashboard() {
  const { data: session, status } = useSession();

  if (!session) {
    return <p>Você precisa estar logado para acessar o Dashboard.</p>;
  }

 // Acessa os dados do usuário na sessão
 const { nome, nivel } = session.usuario;

  return (
    <>
      {/* <Navbar nivelUsuario={nivel}/> */}
      <div className="min-h-screen bg-gradient-to-b from-gray-300 to-indigo-200 pt-4">

        {/* Boas-vindas */}
        <main className="flex flex-col items-center justify-center text-center mt-10">
          {/* Imagem inserida precisa ser quadrada */}
          <Image
            className="rounded-full mx-auto object-cover"
            width={200}
            height={200}
            src="/img/avatar.jpg"
            alt="Foto do usuário"
          />
            <h1 className="text-4xl font-extrabold text-text mt-6">Bem-vindo, <span className="text-pink-600">{nome}</span>!</h1>
            <p className="mt-4 text-lg text-text">Nível: {nivel}</p>
            <p className="mt-4 text-lg text-text">Estamos felizes em ter você por aqui!</p>
        
            <div className="mt-8 w-full max-w-md mx-auto">
              <div className="bg-pink-300 h-2 rounded-full">
                <div className="bg-pink-600 h-2 rounded-full w-[70%]"></div>
              </div>
              <p className="mt-2 text-sm text-text text-black font-bold">Seu nível: 2 | XP: 350/500</p>
            </div>
        </main>

        <section className="mt-12 px-4 max-w-md mx-auto text-left">
          <h2 className="text-2xl font-semibold text-green-600">
            Desafios Atuais
          </h2>
          <ul className="mt-6 space-y-4">
            <li className="flex justify-between items-center bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
              <div>
                <h3 className="text-gray-800 font-semibold">Desafio 1</h3>
                <p className="text-sm text-gray-500">Complete 5 tarefas hoje</p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Ver
              </button>
            </li>
            <li className="flex justify-between items-center bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
              <div>
                <h3 className="text-gray-800 font-semibold">Desafio 2</h3>
                <p className="text-sm text-gray-500">Ganhe 100 pontos de XP</p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Ver
              </button>
            </li>
          </ul>
        </section>
      </div>
    </>   
  );
}
