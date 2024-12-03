// "use client";
// import Link from "next/link";
// import { useState} from "react";
// import { FaBars, FaTimes } from "react-icons/fa"; // Ícones para abrir/fechar o menu
// import { SlGameController } from "react-icons/sl";
// import { usePathname } from "next/navigation";

// export default function Navbar({nivelUsuario}) {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname(); // Obter a rota atual
 
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };


// // Links baseados no nível do usuário
// const getLinksNivelUsuario = () => {
//   switch (nivelUsuario) {
//     case "Normal":
//       return [
//         { label: "Ínicio", path: "/" },
//         { label: "Sobre", path: "/sobre" },
//         { label: "Jogos", path: "/jogos/categorias" },
//         { label: "Conta", path: "/conta" },
//       ];
      
//     case "Administrador":
//       return [
//         { label: "Ínicio", path: "/" },
//         { label: "Sobre", path: "/sobre" },
//         { label: "Jogos", path: "/jogos/categorias" },
//         { label: "Conta", path: "/conta" },
//         { label: "Configuração", path: "/configuracao" },
//       ];
//     case "Logado":
//       return [
//         { label: "Ínicio", path: "/" },
//         { label: "Sobre", path: "/sobre" },
//         { label: "Jogos", path: "/jogos/categorias" },
//         { label: "Conta", path: "/conta" },
//       ];
//     default:
//       return [
//         { label: "Ínicio", path: "/" },
//         { label: "Sobre", path: "/sobre" },
//         { label: "Jogos", path: "/jogos/categorias" },
//         { label: "Conta", path: "/conta" },
//       ];
//   }
// };

// const links = getLinksNivelUsuario();


//   return (
//     <nav className="bg-purple-800 text-white fixed w-full top-0 z-50 border-b-2 border-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
//         {/* Logo */}
//         <div className="flex items-center text-white text-xl font-bold space-x-2">
//           <SlGameController className="w-7 h-7 text-white" />
//           <Link href="/">Gaming Place</Link>
//         </div>

//         {/* Ícone do Menu (hambúrguer) */}
//         <div className="lg:hidden">
//           <button onClick={toggleMenu} className="focus:outline-none">
//             {isOpen ? (
//               <FaTimes className="text-2xl" /> // Ícone para fechar o menu
//             ) : (
//               <FaBars className="text-2xl" /> // Ícone para abrir o menu
//             )}
//           </button>
//         </div>

//         {/* Links do Menu - Visíveis em dispositivos grandes */}
//         <div className="hidden lg:flex space-x-6">
//           {links.map((link) => (
//             <Link
//               key={link.path}
//               href={link.path}
//               className={`${
//                 pathname === link.path
//                   ? "bg-pink-600 text-white font-bold py-2 px-4 rounded"
//                   : "text-lg py-2 px-3 hover:bg-purple-500 hover:text-grey-200 rounded-md"
//               } transition duration-300`}
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Menu Mobile - Controlado pelo estado `isOpen` */}
//       <div
//         className={`lg:hidden bg-purple-900 text-white text-left space-y-2 py-4 font-bold absolute top-16 left-0 w-full transition-transform duration-300 ${
//           isOpen ? "block" : "hidden"
//         }`}
//       >
//         {links.map((link) => (
//           <Link
//             key={link.path}
//             href={link.path}
//             className={`${
//               pathname === link.path
//                 ? "bg-pink-500 text-white font-bold py-2 px-4 rounded ml-2"
//                 : "block text-lg py-2 px-3 hover:bg-purple-500"
//             } transition duration-300`}
//             onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
//           >
//             {link.label}
//           </Link>
//         ))}
//       </div>
//     </nav>
//   );
// }


"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { SlGameController } from "react-icons/sl";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar({ nivelUsuario }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para o dropdown do perfil
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
        ];
      case "Logado":
        return [
          { label: "Ínicio", path: "/" },
          { label: "Sobre", path: "/sobre" },
          { label: "Jogos", path: "/jogos/categorias" },
          { label: "Conta", path: "/conta" },
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
        {/* Logo */}
        <div className="flex items-center text-white text-xl font-bold space-x-2">
          <SlGameController className="w-7 h-7 text-white" />
          <Link href="/">Gaming Place</Link>
        </div>

        {/* Ícone do Menu (hambúrguer) */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Links do Menu - Visíveis em dispositivos grandes */}
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
                  <p className="text-center font-bold mt-2">Olá, Romario!</p>
                  <p className="text-center text-sm text-gray-500">
                    romariodp07@gmail.com
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

      {/* Menu Mobile - Controlado pelo estado `isOpen` */}
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
