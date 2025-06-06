'use client'
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

import { FaGaugeHigh } from "react-icons/fa6";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const listaData = [
    {
      title: "Configurações Gerais",
      link: "/config/geral"
    },
    {
      title: "Usuários",
      link: "/config/perfil"
    },
   {
      title: "Jogos",
      link: "/config/notificacoes"
    },
    {
      title: "Categorias de Jogos",
      link: "/config/seguranca"
    }
  ];

  return (
    <>
      {/* Menu Lateral */}
      <aside className={`fixed top-0 left-0 w-64 bg-violet-800 text-white p-4 h-full transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:relative z-20`}>
          <h3 className="text-2xl font-bold mb-6 mt-24 flex"> <FaGaugeHigh className='mr-1'/> Configurações</h3>

          {listaData.map((lista, index) => (
            <Link key={index} href={lista.link} className="block text-lg hover:text-blue-400 ">
                <div className="space-y-4 mb-3">{ lista.title }</div> 
            </Link>
          ))}
      </aside>

      {/* Botão de Menu para dispositivos móveis */}
      <button
        onClick={toggleMenu}
        className="absolute top-4 left-4 text-3xl text-gray-800 sm:hidden z-30 mt-14"
      >
        {isOpen ? <FaTimes className='text-white' /> : <FaBars className='text-gray-500'/>} {/* Alterna entre o ícone de hambúrguer e "X" */}
      </button>
    </>
  );
}
