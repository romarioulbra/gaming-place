// ESTA É A BASE MAIS SEGURA
"use client";
import Ranking from "@/app/components/Ranking";
import Image from "next/image";
import Emblemas from "@/app/components/Emblemas";
import { useSession } from "next-auth/react";
import BarraProgresso from "@/app/components/BarraProgresso";
import { useState, useEffect } from "react";
import ModalAdicionarAmigo from "@/app/components/ModalAdicionarAmigo";
import EnviarSugestão from "../../../components/EnviarSugestão";
import { getTituloNivel } from "@/app/utils/niveisPerfilUtils";

export default function Perfil() {
  const { data: session, status } = useSession();
  const [refreshProgress, setRefreshProgress] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);


  // Mover todos os hooks para o topo, antes de retornos condicionais
  const [perfil, setPerfil] = useState({
    perfil_imagem: "/img/avatar_perfil.jpg",
    perfil_cidade: "Cidade não informada",
    perfil_pontos: 0,
    perfil_nivel: 1,
    emblema: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (!session?.usuario) {
    return <p>Usuário não autenticado.</p>;
  }

  // Remove 'id' pois não está sendo usado
  const { nome, email, nivel } = session.usuario;
  const { perfil_imagem, perfil_cidade, perfil_pontos, emblema } = perfil;
  const {perfil_nivel } = perfil;
  
  // Animação para os itens do perfil
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };


  return (
    <div className="bg-gradient-to-b from-gray-300 to-indigo-200 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl p-6 bg-purple-600 text-white rounded-xl shadow-lg space-y-6 m-2">
        
        {/* Perfil */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={perfil_imagem}
              alt="Foto de perfil"
              className="rounded-full object-cover w-24 h-24 mx-auto border-1 border-slate-500 shadow-md shadow-indigo-800"
              width={100}
              height={100}
            />
            <div>
              <h2 className="text-2xl font-bold">{nome}</h2>
              <p className="text-sm text-gray-300">{email}</p>
              <p className="text-sm text-gray-300">{perfil_cidade}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm">Pontos: <span className="font-bold text-yellow-400">{perfil_pontos}</span></p>
            <p className="text-sm">Nível: <span className="font-bold text-green-400">{nivel}</span></p>
            {/* Adicione esta linha para mostrar o título do nível */}
            <p className="text-sm">Título: <span className="font-bold text-blue-300">{getTituloNivel(perfil_nivel)}</span></p>
          </div>
        </div>

        <BarraProgresso shouldRefresh={refreshProgress}/>
        <Emblemas onEmblemCollected={() => setRefreshKey(prev => prev + 1)} />
        <Ranking />

        {/* Botões de Ação */}
        <div className="flex space-x-4">
          <button 
            className="flex-1 bg-pink-600 py-2 rounded-lg hover:bg-pink-700"
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar amigos
          </button>

          {/* <EnviarSugestão dadosUsuario={session}/> */}
          <EnviarSugestão dadosUsuario={{
              usuario: {
                id: session.usuario.id,
                nome: session.usuario.nome,
                email: session.usuario.email
              }
            }} />
        </div>

        {/* Renderiza o modal quando estiver aberto */}
        {isModalOpen && <ModalAdicionarAmigo isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>}
      </div>
    </div>
  );
}






// Este LAYOUT FICOU MUITO BOM
// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { FaTrophy, FaStar, FaMedal, FaUserFriends, FaLightbulb } from "react-icons/fa";
// import Ranking from "@/app/components/Ranking";
// import Emblemas from "@/app/components/Emblemas";
// import BarraProgresso from "@/app/components/BarraProgresso";
// import ModalAdicionarAmigo from "@/app/components/ModalAdicionarAmigo";
// import EnviarSugestão from "../../../components/EnviarSugestão";
// import { getTituloNivel,getCorNivel } from "@/app/utils/niveisPerfilUtils";


// export default function Perfil() {
//   const { data: session, status } = useSession();
//   const [refreshProgress, setRefreshProgress] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [perfil, setPerfil] = useState({
//     perfil_imagem: "/img/avatar_perfil.jpg",
//     perfil_cidade: "Cidade não informada",
//     perfil_pontos: 0,
//     perfil_nivel: 1,
//     emblema: 0,
//   });

//   useEffect(() => {
//     if (session?.usuario?.id) {
//       fetch("/api/perfis")
//         .then((res) => res.json())
//         .then((data) => {
//           if (!data.error) {
//             setPerfil(data);
//           }
//         })
//         .catch((error) => console.error("Erro ao buscar perfil:", error));
//     }
//   }, [session]);

//   if (status === "loading") {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   if (!session?.usuario) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-xl text-purple-700">Usuário não autenticado.</p>
//       </div>
//     );
//   }

//   const { nome, email } = session.usuario;
//   const { perfil_imagem, perfil_cidade, perfil_pontos, perfil_nivel } = perfil;
//   const corNivel = getCorNivel(perfil_nivel);

//   // Animations
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100
//       }
//     }
//   };

//   const cardHover = {
//     hover: {
//       y: -5,
//       boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
//       transition: {
//         type: "spring",
//         stiffness: 300
//       }
//     }
//   };

//   return (
//     <div className="bg-gradient-to-b from-gray-100 to-indigo-100 min-h-screen flex justify-center items-center p-4">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="w-full max-w-4xl bg-gradient-to-br from-purple-700 to-purple-900 text-white rounded-2xl shadow-2xl overflow-hidden"
//       >
//         {/* Header com gradiente */}
//         <motion.div 
//           className={`h-2 bg-gradient-to-r ${corNivel}`}
//           variants={itemVariants}
//         />
        
//         <div className="p-6 space-y-6">
//           {/* Seção do Perfil */}
//           <motion.div 
//             className="flex flex-col md:flex-row items-center justify-between gap-6"
//             variants={containerVariants}
//           >
//             {/* Foto e Informações Básicas */}
//             <motion.div 
//               className="flex items-center gap-4 flex-1"
//               variants={itemVariants}
//             >
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="relative"
//               >
//                 <Image
//                   src={perfil_imagem}
//                   alt="Foto de perfil"
//                   width={96}
//                   height={96}
//                   className="rounded-full object-cover w-24 h-24 border-4 border-white shadow-lg"
//                 />
//                 <motion.div
//                   animate={{
//                     scale: [1, 1.1, 1],
//                     opacity: [0.7, 1, 0.7]
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity
//                   }}
//                   className="absolute inset-0 rounded-full border-2 border-purple-300 pointer-events-none"
//                 />
//               </motion.div>
              
//               <div>
//                 <motion.h2 
//                   variants={itemVariants}
//                   className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
//                 >
//                   {nome}
//                 </motion.h2>
//                 <motion.p 
//                   variants={itemVariants}
//                   className="text-sm text-purple-100"
//                 >
//                   {email}
//                 </motion.p>
//                 <motion.p 
//                   variants={itemVariants}
//                   className="text-sm text-purple-100"
//                 >
//                   {perfil_cidade}
//                 </motion.p>
//               </div>
//             </motion.div>
            
//             {/* Status Cards */}
//             <motion.div 
//               className="flex flex-col gap-3 w-full md:w-auto"
//               variants={containerVariants}
//             >
//               {/* Card de Pontos */}
//               <motion.div
//                 variants={itemVariants}
//                 whileHover="hover"
//                 variants={cardHover}
//                 className="bg-purple-800/50 backdrop-blur-sm rounded-xl p-4 shadow-md"
//               >
//                 <div className="flex items-center gap-3">
//                   <motion.div
//                     animate={{ rotate: [0, 15, -15, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   >
//                     <FaStar className="text-2xl text-yellow-400" />
//                   </motion.div>
//                   <div>
//                     <p className="text-xs text-purple-200 font-medium">PONTOS</p>
//                     <p className="text-2xl font-bold text-yellow-400">
//                       {perfil_pontos.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
              
//               {/* Card de Nível */}
//               <motion.div
//                 variants={itemVariants}
//                 whileHover="hover"
//                 variants={cardHover}
//                 className={`bg-gradient-to-br ${corNivel} rounded-xl p-4 shadow-md`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <motion.div
//                       animate={{ y: [0, -5, 0] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                     >
//                       <FaTrophy className="text-2xl text-white" />
//                     </motion.div>
//                     <div>
//                       <p className="text-xs text-white/80 font-medium">NÍVEL</p>
//                       <p className="text-2xl font-bold text-white">
//                         {perfil_nivel}
//                       </p>
//                     </div>
//                   </div>
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", delay: 0.5 }}
//                     className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full flex items-center"
//                   >
//                     <FaMedal className="text-yellow-400 mr-1" />
//                     <span className="text-xs font-bold text-white">
//                       {getTituloNivel(perfil_nivel)}
//                     </span>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </motion.div>

//           {/* Barra de Progresso */}
//           <motion.div variants={itemVariants}>
//             <BarraProgresso shouldRefresh={refreshProgress} />
//           </motion.div>

//           {/* Componentes de Emblemas e Ranking */}
//           <motion.div 
//             className="grid gap-6 md:grid-cols-2"
//             variants={containerVariants}
//           >
//             <motion.div variants={itemVariants}>
//               <Emblemas onEmblemCollected={() => setRefreshKey(prev => prev + 1)} />
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <Ranking />
//             </motion.div>
//           </motion.div>

//           {/* Botões de Ação */}
//           <motion.div 
//             className="flex flex-col sm:flex-row gap-4"
//             variants={containerVariants}
//           >
//             <motion.button
//               variants={itemVariants}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={() => setIsModalOpen(true)}
//               className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg"
//             >
//               <FaUserFriends className="text-lg" />
//               Adicionar amigos
//             </motion.button>

//             <motion.button
//               variants={itemVariants}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg"
//             >
//               <FaLightbulb className="text-lg" />
//               Enviar sugestão
//             </motion.button>
//           </motion.div>
//         </div>

//         {/* Modal */}
//         <AnimatePresence>
//           {isModalOpen && (
//             <ModalAdicionarAmigo 
//               isOpen={isModalOpen} 
//               setIsOpen={setIsModalOpen}
//             />
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// }
