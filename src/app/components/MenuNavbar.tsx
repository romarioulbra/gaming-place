// "use client";
// import Link from "next/link";
// import { useState} from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { SlGameController } from "react-icons/sl";
// import { usePathname } from "next/navigation";

// export default function Navbar() {
  
//   const nivelUsuario = 'Normal'
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };


//   const getLinksNivelUsuario = () => {
//     switch (nivelUsuario) {
//       case "Normal":
//         return [
//           { label: "Início", path: "/" },
//           { label: "Sobre", path: "/sobre" },
//           { label: "Jogos", path: "/jogos/categorias" },
//           { label: "Conta", path: "/conta" },
//         ];
//       case "Administrador":
//         return [
//           { label: "Início", path: "/" },
//           { label: "Sobre", path: "/sobre" },
//           { label: "Jogos", path: "/jogos/categorias" },
//           { label: "Conta", path: "/conta" },
//           { label: "Configuração", path: "/configuracao" },
//           { label: "Perfil", path: "/dashboard/administrador" },
//         ];
//       case "Logado":
//         return [
//           { label: "Início", path: "/" },
//           { label: "Sobre", path: "/sobre" },
//           { label: "Jogos", path: "/jogos/categorias" },
//           { label: "Conta", path: "/conta" },
//           { label: "Perfil", path: "/dashboard/usuario_login" },
//         ];
//       default:
//         return [
//           { label: "Início", path: "/" },
//           { label: "Sobre", path: "/sobre" },
//           { label: "Jogos", path: "/jogos/categorias" },
//           { label: "Conta", path: "/conta" },
//         ];
//     }
//   };

//   const links = getLinksNivelUsuario();


//   return (
//     <nav className="bg-purple-800 text-white fixed w-full top-0 z-50 border-b-2 border-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

//         <div className="flex items-center text-white text-xl font-bold space-x-2">
//           <SlGameController className="w-7 h-7 text-white" />
//           <Link href="/">Gaming Place</Link>
//         </div>


//         <div className="lg:hidden">
//           <button onClick={toggleMenu} className="focus:outline-none">
//             {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
//           </button>
//         </div>


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
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { SlGameController } from "react-icons/sl";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"
import { IoChevronForward } from "react-icons/io5";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [perfil, setPerfil] = useState({
    perfil_imagem: "/img/avatar_perfil.jpg",
    perfil_cidade: "Cidade não informada",
    perfil_pontos: 0,
    perfil_nivel: 1,
    emblema: 0,
  });


  const handleProfileClick = () => {
    if (status === "authenticated") {
      if (session.usuario.nivel === "Administrador") {
        router.push("/dashboard/administrador");
      } else {
        router.push("/dashboard/usuario/login");
      }
    } else {
      router.push("/conta");
    }
  };


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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getLinksNivelUsuario = () => {
    if (status !== "authenticated") {
      return [
        { label: "Início", path: "/" },
        { label: "Sobre", path: "/sobre" },
        { label: "Jogos", path: "/jogos/categorias" },
        { label: "Login", path: "/conta" },
      ];
    }
  
    switch (session.usuario.nivel) {
      case "Administrador":
        return [
          { label: "Início", path: "/" },
          { label: "Sobre", path: "/sobre" },
          { label: "Jogos", path: "/jogos/categorias" },
          { label: "Conta", path: "/conta" },
          // { label: "Configuração", path: "/configuracao" },
        ];
      default:
        return [
          { label: "Início", path: "/" },
          { label: "Sobre", path: "/sobre" },
          { label: "Jogos", path: "/jogos/categorias" },
          { label: "Conta", path: "/conta" },
        ];
    }
  };

  const links = getLinksNivelUsuario();

  if (status === "loading") {
    return (
      <nav className="bg-purple-800 text-white fixed w-full top-0 z-50 border-b-2 border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <p>Carregando...</p>
        </div>
      </nav>
    );
  }

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

        <div className="hidden lg:flex space-x-6 items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={
                pathname === link.path
                  ? "bg-pink-600 text-white font-bold py-2 px-4 rounded"
                  : "text-lg py-2 px-3 hover:bg-purple-500 hover:text-grey-200 rounded-md"
              }
            >
              {link.label}
            </Link>
          ))}

          {status === "authenticated" && (
            <div className="flex items-center ml-4 cursor-pointer" onClick={handleProfileClick}>
              <Image
                src={perfil.perfil_imagem}
                alt="Foto de perfil"
                className="rounded-full object-cover w-10 h-10 border-1 border-slate-200 hover:border-pink-500 transition-all"
                width={40}
                height={40}
              />
            </div>
          )}
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
            className={
              pathname === link.path
                ? "bg-pink-500 text-white font-bold py-2 px-4 rounded ml-2"
                : "block text-lg py-2 px-3 hover:bg-purple-500"
            }
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        {status === "authenticated" && (
          <motion.div
            className="flex items-center px-4 py-2 cursor-pointer rounded-lg"
            onClick={handleProfileClick}
            whileHover={{ 
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              scale: 1.02 
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src={perfil.perfil_imagem}
                alt="Foto de perfil"
                className="rounded-full object-cover w-10 h-10 border-2 border-indigo-500"
                width={40}
                height={40}
              />
            </motion.div>
            
            <div className="ml-3 overflow-hidden">
              <motion.p 
                className="text-sm font-bold truncate"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {session.usuario.nome}
              </motion.p>
              <motion.p 
                className="text-xs text-gray-300 truncate"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Nível: <span className="text-indigo-300">{session.usuario.nivel}</span>
              </motion.p>
            </div>
            
            {/* Ícone animado */}
            <motion.div
              className="ml-auto"
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <IoChevronForward className="h-4 w-4 text-gray-400" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}