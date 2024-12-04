"use client";
import Link from "next/link";
import { SlLogout,SlUser  } from "react-icons/sl";
import { useSession,signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function NavbarPerfil(){
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para o dropdown do perfil

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { data: session, status } = useSession();

  if (!session) {
    return <p>Você precisa estar logado para acessar o Dashboard.</p>;
  }

 // Acessa os dados do usuário na sessão
 const { nome, nivel, email } = session.usuario;


  return(
    <>
      <nav className="bg-indigo-500 text-black py-4 mt-16 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-bold">Dashboard</div>
          <div className="flex space-x-4 text-slate-200 ">

          {nivel !== "Administrador" && (
            <Link href="/usuarios/perfil" className="hover:text-secondary flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md text-sm">
              <SlUser className=""/>
              <span>Perfil</span>
            </Link>
            )}
            <button 
              onClick={() => signOut({ callbackUrl: "/conta" })} // Redireciona para a página de login após o logout
              className="hover:text-secondary flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md text-sm"
            >
              <SlLogout />
              <span>Logout</span>
            </button>


            {/* Dropdown do Perfil */}
            <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
              <Image
                src="/img/avatar.jpg" // Substitua pela URL do avatar do usuário
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full border border-white"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg">
                <div className="p-4 border-b">
                  <Image
                    src="/img/avatar.jpg" // Substitua pela URL do avatar
                    alt="Avatar"
                    width={70}
                    height={70}
                    className="rounded-full mx-auto"
                  />
                  <p className="text-center font-bold mt-2">Olá, {nome}!</p>
                  <p className="text-center text-sm text-gray-500">
                    {email}
                  </p>
                </div>
                <ul className="p-4 space-y-2">
                  <li>
                    <Link
                      href="/conta"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      Gerenciar Conta
                    </Link>
                  </li>
                  <li>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-md">
                      Histórico de Pesquisa
                    </button>
                  </li>
                  <li>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-md">
                      Excluir últimos 15 minutos
                    </button>
                  </li>
                  <li>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-md">
                      Itens Salvos
                    </button>
                  </li>
                </ul>
              </div>
            )}

          </div>
          </div>
        </div>
      </nav>
    </>
  );
}