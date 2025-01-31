"use client";
import Link from "next/link";
import { SlLogout,SlUser  } from "react-icons/sl";
import { useSession,signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import PerfilDropdown from "./PerfilDropdown";

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
          
          {nivel !== "Administrador" ? (
            <Link href="/dashboard/usuario/login"> 
              {/* <div className="text-2xl font-bold">Dashboard</div> */}
              <div className="text-2xl font-bold">Dashboard</div>
            </Link>
          ):(
              <div className="text-2xl font-bold">Dashboard</div>
          )}
          <div className="flex space-x-2 text-slate-200 ">

          {nivel !== "Administrador" && (
            <Link href="/dashboard/usuario/perfil" className="hover:text-secondary flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md text-sm">
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
            <PerfilDropdown
              avatarUrl="/img/avatar.jpg" // URL do avatar
              nome={nome}           // Nome do usuário
              email={email}      // Email do usuário
            />
          </div>
        </div>
      </nav>
    </>
  );
}