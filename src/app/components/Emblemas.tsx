// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import EmblemasList from "./EmblemasList";
// import Image from "next/image";
// import Confetti from "react-confetti";
// import { useSession } from "next-auth/react";

// export default function Emblemas() {
//   const { data: session } = useSession();
//   const [emblemas, setEmblemas] = useState([]);
//   const [emblemasDesbloqueados, setEmblemasDesbloqueados] = useState([]);
//   const [selectedEmblema, setSelectedEmblema] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });


//   useEffect(() => {
//     async function fetchEmblemas() {
//       try {
//         const response = await axios.get("/api/emblemas");
//         setEmblemas(response.data.emblemas);
//       } catch (error) {
//         console.error("Erro ao buscar emblemas:", error);
//       }
//     }
//     fetchEmblemas();
//   }, []);



// useEffect(() => {
//   const fetchEmblemasDesbloqueados = async () => {
//     if (!session?.usuario?.id) return;

//     try {
//       const res = await axios.get(`/api/emblemas-desbloqueados?usuarioId=${session.usuario.id}`);
//       setEmblemasDesbloqueados(res.data.emblemas);
//     } catch (error) {
//       console.error("Erro ao buscar emblemas desbloqueados:", error);
//     }
//   };

//   fetchEmblemasDesbloqueados();
// }, [session]);



//   useEffect(() => {
//     const updateSize = () => {
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     };

//     updateSize();
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);

//   useEffect(() => {
//     if (showConfetti) {
//       const timer = setTimeout(() => setShowConfetti(false), 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [showConfetti]);

//   const handleOpenModal = (emblema) => {
//     setSelectedEmblema(emblema);
//     setIsOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsOpen(false);
//     setShowConfetti(true);
//   };

//   // Combina os emblemas com dados de progresso se estiverem desbloqueados
//   const emblemasCompletos = emblemas.map((emb) => {
//     const progresso = emblemasDesbloqueados.find((d) => d.tipo_emblema.id === emb.id);
//     return {
//       ...emb,
//       desbloqueado: !!progresso,
//       pontos: progresso?.usuario_emblema_pontos || 0,
//     };
//   });

//   return (
//     <>
//       {showConfetti && (
//         <div className="fixed inset-0 z-50 pointer-events-none">
//           <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={400} gravity={0.2} />
//         </div>
//       )}

//       <div className="max-w-4xl mx-auto bg-purple-800 bg-opacity-30 rounded-lg p-6 shadow-lg border border-purple-500">
//         <h2 className="text-center text-white text-xl font-bold mb-4">Emblemas</h2>
//         <EmblemasList emblemas={emblemasCompletos} handleOpenModal={handleOpenModal}  />
//       </div>

//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-gradient-to-b from-purple-900 to-purple-700 text-white rounded-xl w-96 p-6 shadow-2xl relative animate-fadeIn">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-3 right-3 text-gray-300 hover:text-white transition"
//               aria-label="Fechar"
//             >
//               ✕
//             </button>
//             <div className="flex flex-col items-center">
//               <div className="w-28 h-28 rounded-full overflow-hidden bg-white flex items-center justify-center mb-4 shadow-md">
//                 <Image
//                   src={selectedEmblema?.emblema_imagem || "/img/emblema_padrao.png"}
//                   alt={`Emblema ${selectedEmblema?.emblema_nome}`}
//                   width={112}
//                   height={112}
//                   className="object-cover"
//                 />
//               </div>
//               <h2 className="text-lg font-bold">Suas Recompensas</h2>
//               <p className="mt-2 text-sm text-gray-300 text-center">
//                 Você ativou o emblema: <span className="font-bold">{selectedEmblema?.emblema_nome}</span>
//               </p>
//               <p className="mt-2 text-sm text-yellow-400">
//                 Meta de Pontos: <span className="font-bold">{selectedEmblema?.emblemas_pontos || 0}</span>
//               </p>
//               <p className="mt-2 text-sm text-yellow-400">
//                 Você possui: <span className="font-bold">{selectedEmblema?.pontos || 0}</span>
//               </p>
//               <button
//                 onClick={handleCloseModal}
//                 className="mt-5 px-6 py-2 bg-pink-500 rounded-lg font-bold hover:bg-pink-600 transition duration-200"
//               >
//                 Coletar
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import EmblemasList from "./EmblemasList";
// import Image from "next/image";
// import Confetti from "react-confetti";
// import { useSession } from "next-auth/react";

// export default function Emblemas() {
//   const { data: session } = useSession();
//   const [emblemas, setEmblemas] = useState([]);
//   const [emblemasUsuario, setEmblemasUsuario] = useState([]);
//   const [selectedEmblema, setSelectedEmblema] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     async function fetchEmblemas() {
//       try {
//         const response = await axios.get("/api/emblemas");
//         setEmblemas(response.data.emblemas);
//       } catch (error) {
//         console.error("Erro ao buscar emblemas:", error);
//       }
//     }
//     fetchEmblemas();
//   }, []);

//   useEffect(() => {
//     const fetchEmblemasUsuario = async () => {
//       if (!session?.usuario?.id) return;

//       try {
//         const res = await axios.get(`/api/emblemas-desbloqueados?usuarioId=${session.usuario.id}`);
//         setEmblemasUsuario(res.data.emblemas);
//       } catch (error) {
//         console.error("Erro ao buscar emblemas do usuário:", error);
//       }
//     };

//     fetchEmblemasUsuario();
//   }, [session]);

//   useEffect(() => {
//     const updateSize = () => {
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     };

//     updateSize();
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);

//   useEffect(() => {
//     if (showConfetti) {
//       const timer = setTimeout(() => setShowConfetti(false), 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [showConfetti]);

//   const handleOpenModal = (emblema) => {
//     setSelectedEmblema(emblema);
//     setIsOpen(true);
//   };

//   const handleCloseModal = async () => {
//     if (selectedEmblema?.desbloqueado) {
//     try {
//       // Chama a API para adicionar pontos
//       await axios.post("/api/coletar-emblemas", {
//         usuarioId: session?.usuario?.id,
//         pontos: selectedEmblema.pontos,
//       });
      
//       // Atualiza o estado local se necessário
//       // (opcional - você pode recarregar os dados do perfil)
//     } catch (error) {
//       console.error("Erro ao coletar emblema:", error);
//     }
//   }
//     setIsOpen(false);
//     setShowConfetti(true);
//   };


//   // Combina os emblemas com dados de progresso do usuário
//   // const emblemasCompletos = emblemas.map((emblema) => {
//   //   const emblemaUsuario = emblemasUsuario.find(
//   //     (eu) => eu.tipo_emblema?.id === emblema.id
//   //   );

//   //   // Aplica a lógica de bloqueio/desbloqueio
//   //   const pontos = emblemaUsuario?.usuario_emblema_pontos || 0;
//   //   const status = emblemaUsuario?.usuario_emblema_status || "BLOQUEADO";
//   //   const desbloqueado = status === "DESBLOQUEADO" && pontos > 0;

//   //   return {
//   //     ...emblema,
//   //     desbloqueado,
//   //     pontos,
//   //     status,
//   //     // Mantém a referência ao registro do usuário para uso no modal
//   //     registroUsuario: emblemaUsuario
//   //   };
//   // });

//   const emblemasCompletos = emblemas.map((emblema) => {
//   // Encontra o emblema correspondente nos dados do usuário
//   const emblemaUsuario = emblemasUsuario.find(
//     (eu) => eu.emblema_id === emblema.emblema_id
//   );

//   // Se encontrou nos dados do usuário, usa esses valores
//   if (emblemaUsuario) {
//     return {
//       ...emblema,
//       desbloqueado: emblemaUsuario.desbloqueado,
//       pontos: emblemaUsuario.pontos,
//       status: emblemaUsuario.status
//     };
//   }

//   // Se não encontrou, usa os valores padrão do emblema
//   return {
//     ...emblema,
//     desbloqueado: false,
//     pontos: 0,
//     status: 'BLOQUEADO'
//   };
// });

//   return (
//     <>
//       {showConfetti && (
//         <div className="fixed inset-0 z-50 pointer-events-none">
//           <Confetti 
//             width={windowSize.width} 
//             height={windowSize.height} 
//             recycle={false} 
//             numberOfPieces={400} 
//             gravity={0.2} 
//           />
//         </div>
//       )}

//       <div className="max-w-4xl mx-auto bg-purple-800 bg-opacity-30 rounded-lg p-6 shadow-lg border border-purple-500">
//         <h2 className="text-center text-white text-xl font-bold mb-4">Emblemas</h2>
//         <EmblemasList 
//           emblemas={emblemasCompletos} 
//           handleOpenModal={handleOpenModal} 
//         />
//       </div>

//       {isOpen && selectedEmblema && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-gradient-to-b from-purple-900 to-purple-700 text-white rounded-xl w-96 p-6 shadow-2xl relative animate-fadeIn">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-3 right-3 text-gray-300 hover:text-white transition"
//               aria-label="Fechar"
//             >
//               ✕
//             </button>
//             <div className="flex flex-col items-center">
//               <div className="w-28 h-28 rounded-full overflow-hidden bg-white flex items-center justify-center mb-4 shadow-md">
//                 <Image
//                   src={selectedEmblema.emblema_imagem || "/img/emblema_padrao.png"}
//                   alt={`Emblema ${selectedEmblema.emblema_nome}`}
//                   width={112}
//                   height={112}
//                   className="object-cover"
//                 />
//               </div>
//               <h2 className="text-lg font-bold">
//                 {selectedEmblema.desbloqueado ? "Emblema Conquistado!" : "Emblema Bloqueado"}
//               </h2>
//               <p className="mt-2 text-sm text-gray-300 text-center">
//                 {selectedEmblema.desbloqueado 
//                   ? `Você desbloqueou: ${selectedEmblema.emblema_nome}`
//                   : `Continue progredindo para desbloquear: ${selectedEmblema.emblema_nome}`}
//               </p>
//               <p className="mt-2 text-sm text-yellow-400">
//                 Pontos necessários: <span className="font-bold">{selectedEmblema.emblemas_pontos || 0}</span>
//               </p>
//               <p className="mt-2 text-sm text-yellow-400">
//                 Seus pontos: <span className="font-bold">{selectedEmblema.pontos || 0}</span>
//               </p>
//               <button
//                 onClick={async () => {
//                   await handleCloseModal();
//                 }}
//                 className={`mt-5 px-6 py-2 rounded-lg font-bold transition duration-200 ${
//                   selectedEmblema.desbloqueado 
//                     ? "bg-pink-500 hover:bg-pink-600" 
//                     : "bg-gray-500 hover:bg-gray-600"
//                 }`}
//               >
//                 {selectedEmblema.desbloqueado ? "Coletar" : "Entendido"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import EmblemasList from "./EmblemasList";
import Image from "next/image";
import Confetti from "react-confetti";
import { useSession } from "next-auth/react";

type EmblemasProps = {
  onEmblemCollected?: () => void; // Adicione esta linha
};

export default function Emblemas() {
  const { data: session } = useSession();
  const [emblemas, setEmblemas] = useState([]);
  const [emblemasUsuario, setEmblemasUsuario] = useState([]);
  const [selectedEmblema, setSelectedEmblema] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isCollecting, setIsCollecting] = useState(false);
  const [refreshProgress, setRefreshProgress] = useState(false);

  // Busca todos os emblemas disponíveis
  useEffect(() => {
    async function fetchEmblemas() {
      try {
        const response = await axios.get("/api/emblemas");
        setEmblemas(response.data.emblemas);
      } catch (error) {
        console.error("Erro ao buscar emblemas:", error);
      }
    }
    fetchEmblemas();
  }, []);

  // Busca os emblemas do usuário
  useEffect(() => {
    const fetchEmblemasUsuario = async () => {
      if (!session?.usuario?.id) return;

      try {
        const res = await axios.get(
          `/api/emblemas-desbloqueados?usuarioId=${session.usuario.id}`
        );
        setEmblemasUsuario(res.data.emblemas);
      } catch (error) {
        console.error("Erro ao buscar emblemas do usuário:", error);
      }
    };

    fetchEmblemasUsuario();
  }, [session]);

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

  const handleOpenModal = (emblema) => {
    setSelectedEmblema(emblema);
    setIsOpen(true);
  };

  const handleCollectEmblem = async () => {
    if (!selectedEmblema?.desbloqueado || isCollecting) return;
    
    setIsCollecting(true);
    
    try {
      await axios.post("/api/coletar-emblemas", {
        usuarioId: session?.usuario?.id,
        pontos: selectedEmblema.pontos,
      });
      
      // Atualiza o estado local para refletir a coleta
      setEmblemasUsuario(prev => 
        prev.map(e => 
          e.emblema_id === selectedEmblema.emblema_id 
            ? { ...e, coletado: true } 
            : e
        )
      );
      setRefreshProgress(prev => !prev);
      setShowConfetti(true);
    } catch (error) {
      console.error("Erro ao coletar emblema:", error);
    } finally {
      setIsCollecting(false);
      setIsOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // Combina os emblemas com os dados do usuário
  const emblemasCompletos = emblemas.map((emblema) => {
    const emblemaUsuario = emblemasUsuario.find(
      (eu) => eu.emblema_id === emblema.emblema_id
    );

    if (emblemaUsuario) {
      return {
        ...emblema,
        desbloqueado: emblemaUsuario.desbloqueado,
        pontos: emblemaUsuario.pontos,
        status: emblemaUsuario.status,
        coletado: emblemaUsuario.coletado || false
      };
    }

    return {
      ...emblema,
      desbloqueado: false,
      pontos: 0,
      status: 'BLOQUEADO',
      coletado: false
    };
  });

  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
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

      {isOpen && selectedEmblema && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gradient-to-b from-purple-900 to-purple-700 text-white rounded-xl w-96 p-6 shadow-2xl relative animate-fadeIn">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-300 hover:text-white transition"
              aria-label="Fechar"
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-white flex items-center justify-center mb-4 shadow-md">
                <Image
                  src={selectedEmblema.emblema_imagem || "/img/emblema_padrao.png"}
                  alt={`Emblema ${selectedEmblema.emblema_nome}`}
                  width={112}
                  height={112}
                  className="object-cover"
                />
              </div>
              <h2 className="text-lg font-bold">
                {selectedEmblema.desbloqueado 
                  ? selectedEmblema.coletado 
                    ? "Emblema Coletado!" 
                    : "Emblema Conquistado!"
                  : "Emblema Bloqueado"}
              </h2>
              <p className="mt-2 text-sm text-gray-300 text-center">
                {selectedEmblema.desbloqueado 
                  ? selectedEmblema.coletado
                    ? `Você já coletou: ${selectedEmblema.emblema_nome}`
                    : `Você desbloqueou: ${selectedEmblema.emblema_nome}`
                  : `Continue progredindo para desbloquear: ${selectedEmblema.emblema_nome}`}
              </p>
              <p className="mt-2 text-sm text-yellow-400">
                Pontos necessários: <span className="font-bold">{selectedEmblema.emblemas_pontos || 0}</span>
              </p>
              <p className="mt-2 text-sm text-yellow-400">
                Seus pontos: <span className="font-bold">{selectedEmblema.pontos || 0}</span>
              </p>
              <button
                onClick={selectedEmblema.desbloqueado ? handleCollectEmblem : handleCloseModal}
                disabled={(selectedEmblema.desbloqueado && selectedEmblema.coletado) || isCollecting}
                className={`mt-5 px-6 py-2 rounded-lg font-bold transition duration-200 ${
                  selectedEmblema.desbloqueado 
                    ? selectedEmblema.coletado
                      ? "bg-green-500 cursor-default"
                      : "bg-pink-500 hover:bg-pink-600" + (isCollecting ? " opacity-50" : "")
                    : "bg-gray-500 hover:bg-gray-600"
                }`}
              >
                {isCollecting 
                  ? "Processando..." 
                  : selectedEmblema.coletado 
                    ? "Coletado"
                    : selectedEmblema.desbloqueado 
                      ? "Coletar" 
                      : "Entendido"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}