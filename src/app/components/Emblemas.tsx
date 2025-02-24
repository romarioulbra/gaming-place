// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import EmblemasList from './EmblemasList';
// import Image from 'next/image';
// import Confetti from 'react-confetti'; // Importando o Confetti

// export default function Emblemas() {
//   const [emblemas, setEmblemas] = useState([]);
//   const [selectedEmblema, setSelectedEmblema] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false); // Estado para o confete

//   const handleOpenModal = (emblema) => {
//     setSelectedEmblema(emblema);
//     setIsOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsOpen(false);
//     setShowConfetti(true); // Ativar o confete ao fechar o modal
//   };

//   useEffect(() => {
//     async function fetchEmblemas() {
//       try {
//         const response = await axios.get('/api/emblemas');
//         setEmblemas(response.data);
//       } catch (error) {
//         console.error('Erro ao buscar emblemas:', error);
//       }
//     }
//     fetchEmblemas();
//   }, []);

//   // Resetando o confete após um tempo
//   useEffect(() => {
//     if (showConfetti) {
//       setTimeout(() => {
//         setShowConfetti(false); // Desativa o confete após 4 segundos
//       }, 5000);
//     }
//   }, [showConfetti]);

//   return (
//     <div>
//       {/* Confete */}
//       {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

//       {/* Componente de lista de emblemas */}
//       <div className="max-w-5xl mx-auto bg-purple-900 bg-opacity-20 rounded-lg p-4 shadow-lg border border-purple-400">
//         <EmblemasList emblemas={emblemas} handleOpenModal={handleOpenModal} />
//       </div>

//       {/* Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-purple-900 text-white rounded-lg w-96 p-6 shadow-lg relative">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-3 right-3 text-white hover:text-gray-300"
//             >
//               ✕
//             </button>
//             <div className="flex flex-col items-center">
//               <div className="w-24 h-24 rounded-full overflow-hidden bg-white flex items-center justify-center mb-4">
//                 <Image
//                   src={`${selectedEmblema?.emblema_imagem}`}
//                   alt={`Emblema ${selectedEmblema?.emblema_nome}`}
//                   className="object-cover"
//                   width={100}
//                   height={100}
//                 />
//               </div>
//               <h2 className="text-lg font-bold">Parabéns! Recompensa coletada</h2>
//               <p className="mt-2 text-sm">
//                 Você selecionou o emblema:{" "}
//                 <span className="font-bold">{selectedEmblema?.emblema_nome}</span>
//               </p>
//               <p className="mt-2 text-sm">
//                 Pontos Conquistados:{" "}
//                 <span className="font-bold">{selectedEmblema?.emblemas_pontos || 0}</span>
//               </p>
//               <button
//                 onClick={handleCloseModal}
//                 className="mt-4 px-6 py-2 bg-pink-500 rounded text-white font-bold hover:bg-pink-600"
//               >
//                 Fechar
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import EmblemasList from "./EmblemasList";
import Image from "next/image";
import Confetti from "react-confetti";

export default function Emblemas() {
  const [emblemas, setEmblemas] = useState([]);
  const [selectedEmblema, setSelectedEmblema] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    async function fetchEmblemas() {
      try {
        const response = await axios.get("/api/emblemas");
        setEmblemas(response.data);
      } catch (error) {
        console.error("Erro ao buscar emblemas:", error);
      }
    }
    fetchEmblemas();
  }, []);

  // Controla o tempo do confete
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

  const handleCloseModal = () => {
    setIsOpen(false);
    setShowConfetti(true);
  };

  return (
    <div className="relative">
      {/* Confete */}
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} gravity={0.2} />}

      {/* Lista de Emblemas */}
      <div className="max-w-4xl mx-auto bg-purple-800 bg-opacity-30 rounded-lg p-6 shadow-lg border border-purple-500">
        <h2 className="text-center text-white text-xl font-bold mb-4">Emblemas</h2>
        <EmblemasList emblemas={emblemas} handleOpenModal={handleOpenModal} />
      </div>

      {/* Modal de Emblema */}
      {isOpen && (
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
                  src={selectedEmblema?.emblema_imagem || "/img/emblema_padrao.png"}
                  alt={`Emblema ${selectedEmblema?.emblema_nome}`}
                  width={112}
                  height={112}
                  className="object-cover"
                />
              </div>
              <h2 className="text-lg font-bold">🎉 Parabéns! Recompensa coletada</h2>
              <p className="mt-2 text-sm text-gray-300 text-center">
                Você conquistou o emblema: <span className="font-bold">{selectedEmblema?.emblema_nome}</span>
              </p>
              <p className="mt-2 text-sm text-yellow-400">
                Pontos Ganhos: <span className="font-bold">{selectedEmblema?.emblemas_pontos || 0}</span>
              </p>
              <button
                onClick={handleCloseModal}
                className="mt-5 px-6 py-2 bg-pink-500 rounded-lg font-bold hover:bg-pink-600 transition duration-200"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
