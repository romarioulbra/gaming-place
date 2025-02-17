"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { SlGameController } from "react-icons/sl";
import { usePathname } from "next/navigation";


export default function Navbar() {
  
  const nivelUsuario = 'Normal'
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const getLinksNivelUsuario = () => {
    switch (nivelUsuario) {
      case "Normal":
        return [
          { label: "Ínicio", path: "/" },
          { label: "Sobre", path: "/sobre" },
          { label: "Jogos", path: "/jogos/categorias" },
          { label: "Conta", path: "/conta" },
        ];
      case "Administrador":
        return [
          { label: "Ínicio", path: "/" },
          { label: "Sobre", path: "/sobre" },
          { label: "Jogos", path: "/jogos/categorias" },
          { label: "Conta", path: "/conta" },
          { label: "Configuração", path: "/configuracao" },
          { label: "Perfil", path: "/dashboard/administrador" },
        ];
      case "Logado":
        return [
          { label: "Ínicio", path: "/" },
          { label: "Sobre", path: "/sobre" },
          { label: "Jogos", path: "/jogos/categorias" },
          { label: "Conta", path: "/conta" },
          { label: "Perfil", path: "/dashboard/usuario_login" },
        ];
      default:
        return [
          { label: "Ínicio", path: "/" },
          { label: "Sobre", path: "/sobre" },
          { label: "Jogos", path: "/jogos/categorias" },
          { label: "Conta", path: "/conta" },
        ];
    }
  };

  const links = getLinksNivelUsuario();

  return (
    <nav className="bg-purple-800 text-white fixed w-full top-0 z-50 border-b-2 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

        <div className="flex items-center text-white text-xl font-bold space-x-2">
          <SlGameController className="w-7 h-7 text-white" />
          <Link href="/">Gaming Place</Link>
        </div>


        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>


        <div className="hidden lg:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${
                pathname === link.path
                  ? "bg-pink-600 text-white font-bold py-2 px-4 rounded"
                  : "text-lg py-2 px-3 hover:bg-purple-500 hover:text-grey-200 rounded-md"
              } transition duration-300`}
            >
              {link.label}
            </Link>
          ))}
          
        </div>
      </div>

      <div
        className={`lg:hidden bg-purple-900 text-white text-left space-y-2 py-4 font-bold absolute top-16 left-0 w-full transition-transform duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`${
              pathname === link.path
                ? "bg-pink-500 text-white font-bold py-2 px-4 rounded ml-2"
                : "block text-lg py-2 px-3 hover:bg-purple-500"
            } transition duration-300`}
            onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
