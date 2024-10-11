"use client";

import Link from 'next/link';
import { SlGameController } from "react-icons/sl";
import { usePathname } from 'next/navigation'; // para obter a rota atual

export default function NavbarActive() {
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
    <nav className="bg-violet-500 p-4 border-b-2 border-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex text-white text-xl font-bold space-x-2 items-center">
          <SlGameController />
          <Link href="/">Gaming Place</Link>
        </div>

        {/* Links de navegação */}
        <div className="space-x-4">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${
                pathname === link.path
                  ? 'bg-pink-600 text-white font-bold py-2 px-4 rounded' // Estilo do botão rosa para a página ativa
                  : 'text-white hover:text-gray-300' // Estilo padrão para os outros links
              } transition duration-300`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
