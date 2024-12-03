"use client";
import Link from "next/link";
import { SlLogout,SlUser  } from "react-icons/sl";
import { signOut } from "next-auth/react";

export default function NavbarPerfil(){
  
  return(
    <>
      <nav className="bg-indigo-500 text-black py-4 mt-16 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-bold">Dashboard</div>
          <div className="flex space-x-4 text-slate-200">
            <Link href="/usuarios/perfil" className="hover:text-secondary flex items-center space-x-2 hover:bg-indigo-400 hover:p-1">
              <SlUser className=""/>
              <span>Perfil</span>
            </Link>
            <button 
              onClick={() => signOut({ callbackUrl: "/conta" })} // Redireciona para a página de login após o logout
              className="hover:text-secondary flex items-center space-x-2"
            >
              <SlLogout />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}