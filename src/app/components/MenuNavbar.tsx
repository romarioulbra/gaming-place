"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones para abrir/fechar o menu
import { SlGameController } from "react-icons/sl";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname(); // Obter a rota atual

  // Links de navegação
  const links = [
    { label: 'Inicio', path: '/' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Jogos', path: '/jogos' },
    { label: 'Conta', path: '/conta' },
    { label: 'Configuracao', path: '/configuracao' },
  ];


  return (
    <nav className="bg-violet-500 text-white fixed w-full top-0 z-50 border-b-2 border-white">
       {/* className=" p-4 border-b-2 border-white" */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        
        <div className="flex text-white text-xl font-bold space-x-2 items-center">
          <SlGameController />
          <Link href="/">Gaming Place</Link>
        </div>

        {/* Menu icon (hambúrguer) */}
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              <FaTimes className="text-2xl" /> // Ícone para fechar o menu
            ) : (
              <FaBars className="text-2xl" /> // Ícone para abrir o menu
            )}
          </button>
        </div>

       {/* Links do Menu - Oculto por padrão em dispositivos pequenos e visível em dispositivos grandes */}
       <div className="hidden lg:flex lg:space-x-6">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${
                pathname === link.path
                  ? 'bg-pink-600 text-white font-bold py-2 px-4 rounded' // Estilo do link ativo
                  : 'text-lg py-2 px-3 hover:bg-gray-700 rounded-md' // Estilo padrão para os links
              } transition duration-300`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Menu Mobile - Exibe quando o ícone é clicado */}
      {isOpen && (
        <div className="lg:hidden bg-pink-600 text-white text-left space-y-2 py-4 font-bold">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${
                pathname === link.path
                  ? 'bg-pink-500 text-white font-bold py-2 px-4 rounded' // Estilo do link ativo
                  : 'block text-lg py-2 px-3 hover:bg-violet-500' // Estilo padrão para os outros links
              } transition duration-300`}
              onClick={() => setIsOpen(false)} // Fechar menu ao clicar no link
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
