"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import EmblemasList from "./EmblemasList";
import Image from "next/image";
import Confetti from "react-confetti";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy, FaLock, FaCheckCircle, FaArrowRight, FaCrown } from "react-icons/fa";
import { FiX, FiLoader, FiCheckCircle as FiCheck, FiAward, FiStar } from "react-icons/fi";
import { GiLaurelsTrophy } from "react-icons/gi";

// Tipos completos
type Emblema = {
  emblema_id: number;
  emblema_nome: string;
  emblema_criterio: string;
  emblema_imagem: string;
  emblemas_pontos: number;
  emblemas_status: string;
};

type EmblemaUsuario = {
  emblema_id: number;
  desbloqueado: boolean;
  pontos: number;
  pontos_acumulativos: number;
  status: 'BLOQUEADO' | 'DESBLOQUEADO';
  coletado: boolean;
};

type EmblemasProps = {
  onEmblemCollected?: () => void;
};

type EmblemaCompleto = Emblema & EmblemaUsuario;

export default function Emblemas({ onEmblemCollected }: EmblemasProps) {
  const { data: session } = useSession();
  const [emblemas, setEmblemas] = useState<Emblema[]>([]);
  const [emblemasUsuario, setEmblemasUsuario] = useState<EmblemaUsuario[]>([]);
  const [selectedEmblema, setSelectedEmblema] = useState<EmblemaCompleto | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isCollecting, setIsCollecting] = useState(false);
  const [refreshProgress, setRefreshProgress] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'level-up';
  } | null>(null);

  // Busca todos os emblemas disponíveis
  useEffect(() => {
    async function fetchEmblemas() {
      try {
        const response = await axios.get<{ emblemas: Emblema[] }>("/api/emblemas");
        setEmblemas(response.data.emblemas);
      } catch (error) {
        console.error("Erro ao buscar emblemas:", error);
        setNotification({
          message: "Erro ao carregar emblemas",
          type: "error"
        });
      }
    }
    fetchEmblemas();
  }, []);

  // Busca os emblemas do usuário
  useEffect(() => {
    const fetchEmblemasUsuario = async () => {
      if (!session?.usuario?.id) return;

      try {
        const res = await axios.get<{ emblemas: EmblemaUsuario[] }>(
          `/api/emblemas-desbloqueados?usuarioId=${session.usuario.id}`
        );
        setEmblemasUsuario(res.data.emblemas);
      } catch (error) {
        console.error("Erro ao buscar emblemas do usuário:", error);
        setNotification({
          message: "Erro ao carregar seus emblemas",
          type: "error"
        });
      }
    };

    fetchEmblemasUsuario();
  }, [session, refreshProgress]);

  // Atualiza o tamanho da janela para o confetti
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Limpa o confetti após 4 segundos
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  // Limpa a notificação após 5 segundos
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleOpenModal = (emblema: EmblemaCompleto) => {
    setSelectedEmblema(emblema);
    setIsOpen(true);
  };

  const handleCollectEmblem = async () => {
    if (!selectedEmblema?.desbloqueado || isCollecting || !selectedEmblema.emblema_id) return;
    
    setIsCollecting(true);
    
    try {
      const response = await axios.post("/api/coletar-emblemas", {
        usuarioId: session?.usuario?.id,
        emblemaId: selectedEmblema.emblema_id
      });

      if (!response.data.success) {
        throw new Error(response.data.error || "Falha na coleta");
      }

      setEmblemasUsuario(prev => 
        prev.map(e => 
          e.emblema_id === selectedEmblema.emblema_id 
            ? { 
              ...e, 
              status: "BLOQUEADO",
              pontos: 0,
              pontos_acumulativos: response.data.data.novosAcumulativos,
              coletado: true
            } 
            : e
        )
      );
      
      setRefreshProgress(prev => !prev);
      setShowConfetti(true);
      onEmblemCollected?.();

      if (response.data.data.nivelAumentado) {
        setNotification({
          message: `🎉 Parabéns! Você subiu para o nível ${response.data.data.novoNivel || 'novo'}!`,
          type: "level-up"
        });
      } else {
        setNotification({
          message: `✅ Emblema coletado com sucesso! +${selectedEmblema.pontos} pontos!`,
          type: "success"
        });
      }

    } catch (error) {
      console.error("Erro ao coletar emblema:", error);
      setNotification({
        message: "❌ Erro ao coletar emblema. Tente novamente.",
        type: "error"
      });
    } finally {
      setIsCollecting(false);
      setIsOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // Combina os emblemas com os dados do usuário
  const emblemasCompletos: EmblemaCompleto[] = emblemas.map((emblema) => {
    const emblemaUsuario = emblemasUsuario.find(
      (eu) => eu.emblema_id === emblema.emblema_id
    );

    return {
      ...emblema,
      desbloqueado: emblemaUsuario?.desbloqueado || false,
      pontos: emblemaUsuario?.pontos || 0,
      pontos_acumulativos: emblemaUsuario?.pontos_acumulativos || 0,
      status: emblemaUsuario?.status || 'BLOQUEADO',
      coletado: emblemaUsuario?.coletado || false
    };
  });

  return (
    <div className="relative">
      {/* Notificação */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 ${
              notification.type === 'success' 
                ? 'bg-green-500 text-white' 
                : notification.type === 'error'
                  ? 'bg-red-500 text-white'
                  : notification.type === 'level-up'
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                    : 'bg-blue-500 text-white'
            }`}
          >
            {notification.type === 'success' ? (
              <FiCheck className="text-xl" />
            ) : notification.type === 'error' ? (
              <FiX className="text-xl" />
            ) : notification.type === 'level-up' ? (
              <FaCrown className="text-xl" />
            ) : (
              <FiStar className="text-xl" />
            )}
            <span className="font-medium">{notification.message}</span>
            <button 
              onClick={() => setNotification(null)} 
              className="ml-2 hover:opacity-80 transition-opacity"
            >
              <FiX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <Confetti 
            width={windowSize.width} 
            height={windowSize.height} 
            recycle={false} 
            numberOfPieces={400} 
            gravity={0.2} 
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-purple-800 bg-opacity-30 rounded-lg p-6 shadow-lg border border-purple-500">
        <h2 className="text-center text-white text-xl font-bold mb-4">Emblemas</h2>
        <EmblemasList 
          emblemas={emblemasCompletos} 
          handleOpenModal={handleOpenModal} 
        />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && selectedEmblema && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-gradient-to-b from-purple-900 to-purple-700 text-white rounded-xl w-full max-w-md p-6 shadow-xl relative border border-purple-400"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-300 hover:text-white transition z-10"
                aria-label="Fechar"
              >
                <FiX className="text-xl" />
              </button>

              <div className="flex flex-col items-center">
                {/* Ícone do emblema */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-28 h-28 rounded-full overflow-hidden flex items-center justify-center mb-6 ${
                    selectedEmblema.coletado 
                      ? "bg-green-500/20 border-2 border-green-400"
                      : selectedEmblema.desbloqueado
                        ? "bg-yellow-500/20 border-2 border-yellow-400"
                        : "bg-gray-500/20 border-2 border-gray-500"
                  }`}
                >
                  <Image
                    src={selectedEmblema.emblema_imagem || "/img/emblema_padrao.png"}
                    alt={`Emblema ${selectedEmblema.emblema_nome}`}
                    width={112}
                    height={112}
                    className="object-cover p-3"
                  />
                </motion.div>

                {/* Título */}
                <h2 className="text-xl font-bold mb-2">
                  {selectedEmblema.desbloqueado 
                    ? selectedEmblema.coletado 
                      ? "Emblema Coletado!" 
                      : "Emblema Conquistado!"
                    : "Emblema Bloqueado"}
                </h2>

                {/* Descrição */}
                <p className="text-center text-purple-100 mb-4">
                  {selectedEmblema.desbloqueado 
                    ? selectedEmblema.coletado
                      ? `Você já coletou: ${selectedEmblema.emblema_nome}`
                      : `Você desbloqueou: ${selectedEmblema.emblema_nome}`
                    : `Continue progredindo para desbloquear: ${selectedEmblema.emblema_nome}`}
                </p>

                {/* Estatísticas */}
                <div className="w-full space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Pontos necessários:</span>
                    <span className="font-bold text-yellow-300">
                      {selectedEmblema.emblemas_pontos}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Seus pontos atuais:</span>
                    <span className="font-bold text-yellow-300">
                      {selectedEmblema.pontos}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Pontos acumulados:</span>
                    <span className="font-bold text-green-300">
                      {selectedEmblema.pontos_acumulativos}
                    </span>
                  </div>
                </div>

                {/* Botão de ação */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={selectedEmblema.desbloqueado ? handleCollectEmblem : handleCloseModal}
                  disabled={(selectedEmblema.desbloqueado && selectedEmblema.coletado) || isCollecting}
                  className={`w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
                    selectedEmblema.desbloqueado 
                      ? selectedEmblema.coletado
                        ? "bg-green-600 cursor-default"
                        : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                      : "bg-gray-600 hover:bg-gray-700"
                  }`}
                >
                  {isCollecting ? (
                    <>
                      <FiLoader className="animate-spin" />
                      Processando...
                    </>
                  ) : selectedEmblema.coletado ? (
                    <>
                      <FiCheck />
                      Coletado
                    </>
                  ) : selectedEmblema.desbloqueado ? (
                    <>
                      <FiAward />
                      Coletar Emblema
                    </>
                  ) : (
                    "Entendido"
                  )}
                </motion.button>

                {selectedEmblema.desbloqueado && !selectedEmblema.coletado && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-3 text-sm text-green-300"
                  >
                    +{selectedEmblema.pontos} pontos serão adicionados ao seu perfil!
                  </motion.p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { FaTrophy, FaLock, FaCheckCircle, FaArrowRight } from "react-icons/fa";
// import { FiX, FiLoader } from "react-icons/fi";
// import { GiLaurelsTrophy } from "react-icons/gi";
// import { IoMdNotificationsOutline } from "react-icons/io";

// // Tipos
// type Emblema = {
//   emblema_id: number;
//   emblema_nome: string;
//   emblema_criterio: string;
//   emblema_imagem: string;
//   emblemas_pontos: number;
//   emblemas_status: string;
// };

// type EmblemaUsuario = {
//   emblema_id: number;
//   desbloqueado: boolean;
//   pontos: number;
//   pontos_acumulativos: number;
//   status: 'BLOQUEADO' | 'DESBLOQUEADO';
//   coletado: boolean;
// };

// type EmblemasProps = {
//   onEmblemCollected?: () => void;
// };

// type EmblemaCompleto = Emblema & EmblemaUsuario;

// export default function Emblemas({ onEmblemCollected }: EmblemasProps) {
//   const { data: session } = useSession();
//   const [emblemas, setEmblemas] = useState<Emblema[]>([]);
//   const [emblemasUsuario, setEmblemasUsuario] = useState<EmblemaUsuario[]>([]);
//   const [selectedEmblema, setSelectedEmblema] = useState<EmblemaCompleto | null>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [isCollecting, setIsCollecting] = useState(false);
//   const [refreshProgress, setRefreshProgress] = useState(false);
//   const [notification, setNotification] = useState<{message: string; type: 'success' | 'error'} | null>(null);

//   // Busca todos os emblemas disponíveis
//   useEffect(() => {
//     async function fetchEmblemas() {
//       try {
//         const response = await axios.get<{ emblemas: Emblema[] }>("/api/emblemas");
//         setEmblemas(response.data.emblemas);
//       } catch (error) {
//         console.error("Erro ao buscar emblemas:", error);
//         setNotification({message: "Erro ao carregar emblemas", type: "error"});
//       }
//     }
//     fetchEmblemas();
//   }, []);

//   // Busca os emblemas do usuário
//   useEffect(() => {
//     const fetchEmblemasUsuario = async () => {
//       if (!session?.usuario?.id) return;

//       try {
//         const res = await axios.get<{ emblemas: EmblemaUsuario[] }>(
//           `/api/emblemas-desbloqueados?usuarioId=${session.usuario.id}`
//         );
//         setEmblemasUsuario(res.data.emblemas);
//       } catch (error) {
//         console.error("Erro ao buscar emblemas do usuário:", error);
//         setNotification({message: "Erro ao carregar seus emblemas", type: "error"});
//       }
//     };

//     fetchEmblemasUsuario();
//   }, [session, refreshProgress]);

//   // Limpa a notificação após 4 segundos
//   useEffect(() => {
//     if (notification) {
//       const timer = setTimeout(() => setNotification(null), 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [notification]);

//   const handleOpenModal = (emblema: EmblemaCompleto) => {
//     setSelectedEmblema(emblema);
//     setIsOpen(true);
//   };

//   const handleCollectEmblem = async () => {
//     if (!selectedEmblema?.desbloqueado || isCollecting || !selectedEmblema.emblema_id) return;
    
//     setIsCollecting(true);
    
//     try {
//       const response = await axios.post("/api/coletar-emblemas", {
//         usuarioId: session?.usuario?.id,
//         emblemaId: selectedEmblema.emblema_id
//       });

//       if (!response.data.success) {
//         throw new Error(response.data.error || "Falha na coleta");
//       }

//       setEmblemasUsuario(prev => 
//         prev.map(e => 
//           e.emblema_id === selectedEmblema.emblema_id 
//             ? { 
//               ...e, 
//               status: "BLOQUEADO",
//               pontos: 0,
//               pontos_acumulativos: response.data.data.novosAcumulativos,
//               coletado: true
//             } 
//             : e
//         )
//       );
      
//       setRefreshProgress(prev => !prev);
//       setShowConfetti(true);
//       onEmblemCollected?.();

//       if (response.data.data.nivelAumentado) {
//         setNotification({
//           message: `🎉 Parabéns! Você subiu para o nível ${response.data.data.novoNivel || 'novo'}!`,
//           type: "success"
//         });
//       } else {
//         setNotification({
//           message: `✅ Emblema coletado com sucesso! +${selectedEmblema.pontos} pontos!`,
//           type: "success"
//         });
//       }

//     } catch (error) {
//       console.error("Erro ao coletar emblema:", error);
//       setNotification({
//         message: "❌ Erro ao coletar emblema. Tente novamente.",
//         type: "error"
//       });
//     } finally {
//       setIsCollecting(false);
//       setIsOpen(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setIsOpen(false);
//   };

//   // Combina os emblemas com os dados do usuário
//   const emblemasCompletos: EmblemaCompleto[] = emblemas.map((emblema) => {
//     const emblemaUsuario = emblemasUsuario.find(
//       (eu) => eu.emblema_id === emblema.emblema_id
//     );

//     return {
//       ...emblema,
//       desbloqueado: emblemaUsuario?.desbloqueado || false,
//       pontos: emblemaUsuario?.pontos || 0,
//       pontos_acumulativos: emblemaUsuario?.pontos_acumulativos || 0,
//       status: emblemaUsuario?.status || 'BLOQUEADO',
//       coletado: emblemaUsuario?.coletado || false
//     };
//   });

//   return (
//     <div className="relative">
//       {/* Notificação */}
//       <AnimatePresence>
//         {notification && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 ${
//               notification.type === 'success' 
//                 ? 'bg-green-500 text-white' 
//                 : 'bg-red-500 text-white'
//             }`}
//           >
//             {notification.type === 'success' ? (
//               <FaCheckCircle className="text-xl" />
//             ) : (
//               <IoMdNotificationsOutline className="text-xl" />
//             )}
//             <span className="font-medium">{notification.message}</span>
//             <button 
//               onClick={() => setNotification(null)} 
//               className="ml-2 hover:opacity-80"
//             >
//               <FiX />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Confetti */}
//       {showConfetti && (
//         <div className="fixed inset-0 z-40 pointer-events-none">
//           <motion.div
//             initial={{ opacity: 1 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 4 }}
//             className="absolute inset-0"
//           >
//             {[...Array(100)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ 
//                   x: Math.random() * window.innerWidth,
//                   y: -50,
//                   rotate: Math.random() * 360
//                 }}
//                 animate={{
//                   y: window.innerHeight,
//                   rotate: Math.random() * 360,
//                   opacity: [1, 0.5, 0]
//                 }}
//                 transition={{
//                   duration: 3 + Math.random() * 2,
//                   repeat: 0,
//                   ease: "linear"
//                 }}
//                 className="absolute text-yellow-400 text-2xl"
//                 style={{ left: `${Math.random() * 100}%` }}
//               >
//                 <GiLaurelsTrophy />
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       )}

//       {/* Lista de Emblemas */}
//       <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl p-6 shadow-lg border border-purple-500">
//         <h2 className="text-center text-white text-2xl font-bold mb-6 flex items-center justify-center gap-2">
//           <FaTrophy className="text-yellow-400" />
//           Meus Emblemas
//           <FaTrophy className="text-yellow-400" />
//         </h2>
        
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {emblemasCompletos.map((emblema) => (
//             <motion.div
//               key={emblema.emblema_id}
//               whileHover={{ y: -5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => handleOpenModal(emblema)}
//               className={`relative group cursor-pointer ${
//                 !emblema.desbloqueado ? "opacity-60" : ""
//               }`}
//             >
//               <div className={`relative w-full aspect-square rounded-2xl overflow-hidden border-2 ${
//                 emblema.desbloqueado
//                   ? emblema.coletado
//                     ? "border-green-500"
//                     : "border-yellow-400"
//                   : "border-gray-500"
//               }`}>
//                 <Image
//                   src={emblema.emblema_imagem || "/img/emblema_padrao.png"}
//                   alt={`Emblema ${emblema.emblema_nome}`}
//                   fill
//                   className="object-cover"
//                 />
                
//                 {!emblema.desbloqueado && (
//                   <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
//                     <FaLock className="text-gray-300 text-xl" />
//                   </div>
//                 )}
                
//                 {emblema.coletado && (
//                   <div className="absolute top-1 right-1 bg-green-500 rounded-full p-1">
//                     <FaCheckCircle className="text-white text-xs" />
//                   </div>
//                 )}
//               </div>
              
//               <div className="mt-2 text-center">
//                 <h3 className="text-sm font-semibold text-white truncate">
//                   {emblema.emblema_nome}
//                 </h3>
//                 <div className="flex items-center justify-center gap-1 text-xs">
//                   <span className={`${
//                     emblema.desbloqueado ? "text-yellow-300" : "text-gray-400"
//                   }`}>
//                     {emblema.pontos || 0}/{emblema.emblemas_pontos} pts
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {isOpen && selectedEmblema && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 50 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 50 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white rounded-2xl w-full max-w-md p-6 shadow-xl relative overflow-hidden border border-purple-400"
//             >
//               {/* Efeitos de fundo */}
//               <div className="absolute inset-0 overflow-hidden">
//                 <motion.div
//                   animate={{
//                     x: [0, 100, 0],
//                     opacity: [0.1, 0.3, 0.1]
//                   }}
//                   transition={{
//                     duration: 6,
//                     repeat: Infinity,
//                     ease: "linear"
//                   }}
//                   className="absolute top-0 left-0 w-32 h-full bg-white/10 transform -skew-x-12"
//                 />
//               </div>

//               <button
//                 onClick={handleCloseModal}
//                 className="absolute top-4 right-4 text-gray-300 hover:text-white transition z-10"
//                 aria-label="Fechar"
//               >
//                 <FiX className="text-xl" />
//               </button>

//               <div className="relative z-10 flex flex-col items-center">
//                 {/* Ícone do emblema */}
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`w-32 h-32 rounded-full overflow-hidden flex items-center justify-center mb-6 shadow-lg border-4 ${
//                     selectedEmblema.coletado 
//                       ? "border-green-400 bg-green-400/20"
//                       : selectedEmblema.desbloqueado
//                         ? "border-yellow-400 bg-yellow-400/20"
//                         : "border-gray-500 bg-gray-500/20"
//                   }`}
//                 >
//                   <Image
//                     src={selectedEmblema.emblema_imagem || "/img/emblema_padrao.png"}
//                     alt={`Emblema ${selectedEmblema.emblema_nome}`}
//                     width={128}
//                     height={128}
//                     className="object-cover p-4"
//                   />
//                 </motion.div>

//                 {/* Título */}
//                 <motion.h2 
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 }}
//                   className="text-2xl font-bold text-center mb-2 flex items-center gap-2"
//                 >
//                   {selectedEmblema.desbloqueado 
//                     ? selectedEmblema.coletado 
//                       ? <>
//                           <FaCheckCircle className="text-green-400" />
//                           Emblema Coletado!
//                         </>
//                       : <>
//                           <GiLaurelsTrophy className="text-yellow-400" />
//                           Emblema Conquistado!
//                         </>
//                     : <>
//                         <FaLock className="text-gray-400" />
//                         Emblema Bloqueado
//                       </>}
//                 </motion.h2>

//                 {/* Descrição */}
//                 <motion.p
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="text-center text-purple-100 mb-6"
//                 >
//                   {selectedEmblema.desbloqueado 
//                     ? selectedEmblema.coletado
//                       ? `Você já coletou este emblema e ganhou ${selectedEmblema.pontos_acumulativos} pontos no total!`
//                       : `Você conquistou o emblema "${selectedEmblema.emblema_nome}"!`
//                     : `Continue progredindo para desbloquear o emblema "${selectedEmblema.emblema_nome}"`}
//                 </motion.p>

//                 {/* Estatísticas */}
//                 <motion.div 
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="w-full space-y-3 mb-6 bg-purple-900/50 rounded-lg p-4"
//                 >
//                   <div className="flex justify-between items-center">
//                     <span className="text-purple-200 flex items-center gap-2">
//                       <FaArrowRight className="text-xs" />
//                       Pontos necessários:
//                     </span>
//                     <span className="font-bold text-yellow-300">
//                       {selectedEmblema.emblemas_pontos || 0}
//                     </span>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <span className="text-purple-200 flex items-center gap-2">
//                       <FaArrowRight className="text-xs" />
//                       Seus pontos atuais:
//                     </span>
//                     <span className="font-bold text-yellow-300">
//                       {selectedEmblema.pontos || 0}
//                     </span>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <span className="text-purple-200 flex items-center gap-2">
//                       <FaArrowRight className="text-xs" />
//                       Pontos acumulados:
//                     </span>
//                     <span className="font-bold text-green-300">
//                       {selectedEmblema.pontos_acumulativos || 0}
//                     </span>
//                   </div>
//                 </motion.div>

//                 {/* Botão de ação */}
//                 <motion.button
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                   onClick={selectedEmblema.desbloqueado ? handleCollectEmblem : handleCloseModal}
//                   disabled={(selectedEmblema.desbloqueado && selectedEmblema.coletado) || isCollecting}
//                   className={`w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
//                     selectedEmblema.desbloqueado 
//                       ? selectedEmblema.coletado
//                         ? "bg-green-600/90 cursor-default"
//                         : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-lg" + 
//                           (isCollecting ? " opacity-70" : "")
//                       : "bg-gray-600 hover:bg-gray-700"
//                   }`}
//                 >
//                   {isCollecting 
//                     ? <>
//                         <FiLoader className="animate-spin" />
//                         Processando...
//                       </>
//                     : selectedEmblema.coletado 
//                       ? <>
//                           <FaCheckCircle />
//                           Emblema Coletado
//                         </>
//                       : selectedEmblema.desbloqueado 
//                         ? <>
//                             <GiLaurelsTrophy />
//                             Coletar Emblema
//                           </> 
//                         : "Entendido"}
//                 </motion.button>

//                 {selectedEmblema.desbloqueado && !selectedEmblema.coletado && (
//                   <motion.p
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.4 }}
//                     className="mt-4 text-sm text-green-300 flex items-center gap-2"
//                   >
//                     <FaArrowRight className="text-xs" />
//                     +{selectedEmblema.pontos} pontos serão adicionados ao seu perfil!
//                   </motion.p>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }