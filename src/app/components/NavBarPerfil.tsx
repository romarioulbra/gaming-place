"use client";

import Link from "next/link";
import { SlLogout, SlUser } from "react-icons/sl";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import PerfilDropdown from "./PerfilDropdown";

export default function NavbarPerfil() {
  const { data: session, status, update } = useSession();
  
  // Defina valores padrão para evitar erros caso session seja undefined
  const nome = session?.usuario?.nome || "Usuário";
  const nivel = session?.usuario?.nivel || "Padrão";
  const email = session?.usuario?.email || "email@exemplo.com";
  const perfil_imagem = session?.usuario?.perfil_imagem || "/img/avatar.jpg";

  // Estado para armazenar a imagem do perfil
  const [perfilImagem, setPerfilImagem] = useState(perfil_imagem);

  // Atualiza o estado da imagem quando a sessão muda
  useEffect(() => {
    setPerfilImagem(perfil_imagem);
  }, [perfil_imagem]);

  const handleImageChange = async (novaImagem: string) => {
    setPerfilImagem(novaImagem);
    await update({ usuario: { ...session.usuario, perfil_imagem: novaImagem } });
  };

  // Enquanto a sessão está carregando, exibe um indicador de carregamento
  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  // Se não houver sessão, exibe uma mensagem de login necessário
  if (!session) {
    return <p>Você precisa estar logado para acessar o Dashboard.</p>;
  }

  return (
    <nav className="bg-indigo-500 text-black py-4 mt-16 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {nivel !== "Administrador" ? (
          <Link href="/dashboard/usuario/login">
            <div className="text-2xl font-bold">Dashboard</div>
          </Link>
        ) : (
          <div className="text-2xl font-bold">Dashboard</div>
        )}
        <div className="flex space-x-2 text-slate-200">
          {nivel !== "Administrador" && (
            <Link
              href="/dashboard/usuario/perfil"
              className="hover:text-secondary flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md text-sm"
            >
              <SlUser />
              <span>Perfil</span>
            </Link>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/conta" })}
            className="hover:text-secondary flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md text-sm"
          >
            <SlLogout />
            <span>Logout</span>
          </button>

          {/* Dropdown do Perfil */}
          <PerfilDropdown
            avatarUrl={perfilImagem} // Passa a imagem dinâmica
            nome={nome}
            email={email}
            onImageChange={handleImageChange} // Passa a função para atualizar a imagem
          />
        </div>
      </div>
    </nav>
  );
}


// "use client";

// import Link from "next/link";
// import { SlLogout, SlUser, SlSettings } from "react-icons/sl";
// import { useSession, signOut } from "next-auth/react";
// import { useState, useEffect } from "react";
// import PerfilDropdown from "./PerfilDropdown";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { FaChevronDown } from "react-icons/fa";

// export default function NavbarPerfil() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const { data: session, status, update } = useSession();

//   const nome = session?.usuario?.nome || "Usuário";
//   const nivel = session?.usuario?.nivel || "Padrão";
//   const email = session?.usuario?.email || "email@exemplo.com";
//   const perfil_imagem = session?.usuario?.perfil_imagem || "/img/avatar.jpg";

//   const [perfilImagem, setPerfilImagem] = useState(perfil_imagem);

//   useEffect(() => {
//     setPerfilImagem(perfil_imagem);
//   }, [perfil_imagem]);

//   const handleImageChange = async (novaImagem: string) => {
//     setPerfilImagem(novaImagem);
//     await update({ usuario: { ...session?.usuario, perfil_imagem: novaImagem } });
//   };

//   if (status === "loading") return <p>Carregando...</p>;
//   if (!session) return <p>Você precisa estar logado para acessar o Dashboard.</p>;

//   return (
//     <nav className="bg-indigo-500 text-black py-4 mt-16 shadow-md">
//       <div className="container mx-auto flex justify-between items-center px-4">
//         {nivel !== "Administrador" ? (
//           <Link href="/dashboard/usuario/login">
//             <div className="text-2xl font-bold text-white">Dashboard</div>
//           </Link>
//         ) : (
//           <div className="text-2xl font-bold text-white">Dashboard</div>
//         )}

//         <div className="flex space-x-4 text-slate-200 items-center relative">
//           {nivel !== "Administrador" && (
//             <Link
//               href="/dashboard/usuario/perfil"
//               className="hover:text-white flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md text-sm transition-colors"
//             >
//               <SlUser />
//               <span>Perfil</span>
//             </Link>
//           )}

//           <button
//             onClick={() => signOut({ callbackUrl: "/conta" })}
//             className="hover:text-white flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md text-sm transition-colors"
//           >
//             <SlLogout />
//             <span>Sair</span>
//           </button>

//           {/* Botão de Perfil com animação */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//             className="relative"
//           >
//             <motion.div
//               className="flex items-center px-4 py-2 cursor-pointer bg-indigo-600 rounded-xl shadow-md hover:shadow-xl transition-all"
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={() => setIsDropdownOpen((prev) => !prev)}
//             >
//               <motion.div
//                 className="relative"
//                 animate={{
//                   boxShadow: isDropdownOpen
//                     ? "0 0 0 4px rgba(255, 255, 255, 0.4)"
//                     : "0 0 0 0px rgba(255, 255, 255, 0)",
//                 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <motion.div
//                   className="rounded-full"
//                   animate={{ scale: [1, 1.05, 1] }}
//                   transition={{
//                     repeat: Infinity,
//                     repeatType: "loop",
//                     duration: 2,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   <Image
//                     src={perfilImagem}
//                     alt="Foto de perfil"
//                     className="rounded-full object-cover w-10 h-10 border-2 border-white"
//                     width={40}
//                     height={40}
//                   />
//                 </motion.div>
//               </motion.div>

//               <div className="ml-3 text-white text-left">
//                 <p className="text-sm font-bold leading-tight">{nome}</p>
//                 <p className="text-xs text-gray-200">Nível: {nivel}</p>
//               </div>

//               <motion.div
//                 className="ml-2 text-white"
//                 animate={{ rotate: isDropdownOpen ? 180 : 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <FaChevronDown size={14} />
//               </motion.div>
//             </motion.div>

//             <AnimatePresence>
//               {isDropdownOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 overflow-hidden"
//                 >
//                   {/* Header do dropdown */}
//                   <div className="p-4 border-b">
//                     <div className="flex items-center gap-3">
//                       <Image
//                         src={perfilImagem}
//                         alt="Foto de perfil"
//                         className="rounded-full object-cover w-12 h-12 border-2 border-indigo-100"
//                         width={48}
//                         height={48}
//                       />
//                       <div>
//                         <p className="font-medium text-gray-800">{nome}</p>
//                         <p className="text-xs text-gray-500">{email}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Opções do menu */}
//                   <div className="py-1">
//                     <Link
//                       href="/dashboard/usuario/perfil"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors"
//                     >
//                       {/* <SlUser className="mr-3 text-indigo-500" />
//                       <span>Editar Perfil</span> */}
//                     </Link>
                    
//                     {/* <Link
//                       href="/dashboard/configuracoes"
//                       onClick={() => setIsDropdownOpen(false)}
//                       className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors"
//                     >
//                       <SlSettings className="mr-3 text-indigo-500" />
//                       <span>Notificações</span>
//                     </Link> */}
//                   </div>

//                   {/* Componente original PerfilDropdown (se ainda necessário) */}
//                   <div className="flex items-center gap-2">
//                     <PerfilDropdown
//                       avatarUrl={perfilImagem}
//                       nome={nome}
//                       email={email}
//                       onImageChange={handleImageChange}
//                       onClose={() => setIsDropdownOpen(false)}
//                     />
//                     <span className="text-sm text-gray-700">Editar Perfil</span>
//                   </div>

//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         </div>
//       </div>
//     </nav>
//   );
// }




// "use client";

// import Link from "next/link";
// import { SlLogout, SlUser } from "react-icons/sl";
// import { useSession, signOut } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiChevronDown, FiX } from "react-icons/fi";

// export default function NavbarPerfil() {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const { data: session, status, update } = useSession();
  
//   // Valores padrão
//   const nome = session?.usuario?.nome || "Usuário";
//   const nivel = session?.usuario?.nivel || "Padrão";
//   const email = session?.usuario?.email || "email@exemplo.com";
//   const perfil_imagem = session?.usuario?.perfil_imagem || "/img/avatar.jpg";

//   const [perfilImagem, setPerfilImagem] = useState(perfil_imagem);

//   useEffect(() => {
//     setPerfilImagem(perfil_imagem);
//   }, [perfil_imagem]);

//   const handleImageChange = async (novaImagem: string) => {
//     setPerfilImagem(novaImagem);
//     await update({ usuario: { ...session?.usuario, perfil_imagem: novaImagem } });
//   };

//   if (status === "loading") {
//     return (
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-indigo-500 py-4 mt-16 shadow-md"
//       >
//         <div className="container mx-auto flex justify-between items-center px-4">
//           <motion.div 
//             className="h-8 bg-indigo-400 rounded w-32"
//             animate={{ opacity: [0.5, 1, 0.5] }}
//             transition={{ repeat: Infinity, duration: 1.5 }}
//           />
//           <div className="flex space-x-2">
//             <motion.div 
//               className="h-8 w-8 bg-indigo-400 rounded-full"
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
//             />
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

//   if (!session) {
//     return (
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-indigo-500 py-4 mt-16 shadow-md"
//       >
//         <div className="container mx-auto flex justify-between items-center px-4">
//           <Link href="/">
//             <motion.p 
//               className="text-2xl font-bold text-white"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Dashboard
//             </motion.p>
//           </Link>
//           <Link href="/conta">
//             <motion.button
//               className="px-4 py-2 bg-white text-indigo-600 rounded-md font-medium"
//               whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Login
//             </motion.button>
//           </Link>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <>
//       <motion.nav 
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="bg-indigo-500 text-black py-4 mt-16 shadow-md"
//       >
//         <div className="container mx-auto flex justify-between items-center px-4">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {nivel !== "Administrador" ? (
//               <Link href="/dashboard/usuario/login">
//                 <div className="text-2xl font-bold text-white">Dashboard</div>
//               </Link>
//             ) : (
//               <div className="text-2xl font-bold text-white">Dashboard</div>
//             )}
//           </motion.div>

//           <div className="flex items-center space-x-4 text-slate-200">
//             {nivel !== "Administrador" && (
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   href="/dashboard/usuario/perfil"
//                   className="hover:text-white flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md text-sm transition-colors"
//                 >
//                   <SlUser className="text-lg" />
//                   <span>Perfil</span>
//                 </Link>
//               </motion.div>
//             )}

//             <motion.button
//               onClick={() => signOut({ callbackUrl: "/conta" })}
//               className="hover:text-white flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md text-sm transition-colors"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <SlLogout className="text-lg" />
//               <span>Sair</span>
//             </motion.button>

//             {/* Botão para abrir o drawer */}
//             <motion.div
//               className="relative cursor-pointer"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsDrawerOpen(true)}
//             >
//               <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
//                 <img 
//                   src={perfilImagem} 
//                   alt="Foto de perfil" 
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Drawer do Perfil */}
//       <AnimatePresence>
//         {isDrawerOpen && (
//           <>
//             {/* Overlay escuro */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.5 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black z-40"
//               onClick={() => setIsDrawerOpen(false)}
//             />

//             {/* Drawer em si */}
//             <motion.div
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ type: 'tween', ease: 'easeInOut' }}
//               className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 p-4"
//             >
//               {/* Cabeçalho do drawer */}
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">Meu Perfil</h2>
//                 <button 
//                   onClick={() => setIsDrawerOpen(false)}
//                   className="p-1 rounded-full hover:bg-gray-100"
//                 >
//                   <FiX className="text-lg" />
//                 </button>
//               </div>

//               {/* Seção do perfil */}
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="relative">
//                   <img
//                     src={perfilImagem}
//                     alt="Foto de perfil"
//                     className="w-16 h-16 rounded-full object-cover"
//                   />
//                   <button className="absolute -bottom-1 -right-1 bg-indigo-500 text-white p-1 rounded-full">
//                     <SlUser className="text-xs" />
//                   </button>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">{nome}</h3>
//                   <p className="text-sm text-gray-600">{email}</p>
//                   <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
//                     {nivel}
//                   </span>
//                 </div>
//               </div>

//               {/* Opções do menu */}
//               <div className="space-y-2">
//                 <Link
//                   href="/dashboard/usuario/perfil"
//                   className="block px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
//                   onClick={() => setIsDrawerOpen(false)}
//                 >
//                   Editar Perfil
//                 </Link>
//                 <Link
//                   href="/dashboard/configuracoes"
//                   className="block px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
//                   onClick={() => setIsDrawerOpen(false)}
//                 >
//                   Configurações
//                 </Link>
//                 <button
//                   onClick={() => {
//                     setIsDrawerOpen(false);
//                     signOut({ callbackUrl: "/conta" });
//                   }}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
//                 >
//                   Sair da Conta
//                 </button>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }