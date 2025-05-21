// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import PodiumModal from "./PodiumModal";

// interface Perfil {
//   perfil_id: number;
//   perfil_imagem: string;
//   perfil_cidade: string;
//   perfil_pontos: number;
//   perfil_nivel: string | number;
//   emblema: string | number;
//   perfil_usuarios: { usuario_nome: string };
// }

// export default function Ranking() {
//   const [ranking, setRanking] = useState<Perfil[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showPodium, setShowPodium] = useState(false);

//   useEffect(() => {
//     async function fetchRanking() {
//       try {
//         console.log("Buscando ranking...");
//         const response = await axios.get("/api/ranking");

//         if (response.data && Array.isArray(response.data)) {
//           setRanking(response.data);
//         } else {
//           throw new Error("Dados recebidos não são um array");
//         }
//       } catch (err: any) {
//         setError(err?.message || "Erro ao carregar os dados");
//         console.error("Erro ao buscar dados do ranking:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchRanking();
//   }, []);

//   const getMedalImage = (index: number) => {
//     switch (index) {
//       case 0:
//         return "/icons/ouro.png";
//       case 1:
//         return "/icons/prata.png";
//       case 2:
//         return "/icons/bronze.png";
//       default:
//         return "/icons/padrao.png";
//     }
//   };

//   return (
//     <div className="bg-purple-800 p-4 rounded-xl border border-purple-400 relative">
//       <div className="flex justify-between items-center mb-2">
//         <h3 className="text-lg font-bold text-white">Ranking</h3>
//         {ranking.length > 0 && (
//          <button
//          onClick={() => setShowPodium(true)}
//          className="relative overflow-hidden group bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
//        >
//          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
         
//          <span className="relative tracking-wide flex items-center justify-center gap-2">
//            <svg 
//              xmlns="http://www.w3.org/2000/svg" 
//              className="h-4 w-4 text-yellow-300" 
//              viewBox="0 0 20 20" 
//              fill="currentColor"
//            >
//              <path 
//                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
//              />
//            </svg>
//            Pódio
//          </span>
         
//          <span className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400/30 rounded-xl transition-all duration-300" />
//        </button>
//         )}
//       </div>

//       <ul
//         className={`mt-2 space-y-2 ${
//           ranking.length > 5 ? "max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800" : ""
//         }`}
//       >
//         {loading ? (
//           <div className="text-white">Carregando...</div>
//         ) : error ? (
//           <div className="text-red-400">{error}</div>
//         ) : ranking.length > 0 ? (
//           ranking.map((rank, index) => (
//             <li
//               key={rank.perfil_id}
//               className="flex justify-between items-center bg-purple-700 p-2 rounded-lg"
//             >
//               <div className="flex items-center space-x-2">
//                 <span className="text-gray-300 text-sm w-5">{index + 1}º</span>
//                 <Image
//                   src={rank.perfil_imagem || "/img/menin.png"}
//                   alt={rank.perfil_usuarios?.usuario_nome || "Usuário desconhecido"}
//                   className="w-10 h-10 rounded-full object-cover"
//                   width={40}
//                   height={40}
//                 />
//                 <div>
//                   <span className="text-white font-semibold">
//                     {rank.perfil_usuarios?.usuario_nome
//                       ? rank.perfil_usuarios.usuario_nome
//                           .toLowerCase()
//                           .replace(/^\w/, (c) => c.toUpperCase())
//                       : "Usuário desconhecido"}
//                   </span>
//                   <p className="text-xs text-gray-300">{rank.perfil_cidade}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className="text-yellow-400 font-bold">
//                   {rank.perfil_pontos}
//                 </span>
//                 <Image
//                   src={getMedalImage(index)}
//                   alt="Medalha"
//                   width={20}
//                   height={20}
//                   className="object-contain"
//                 />
//               </div>
//             </li>
//           ))
//         ) : (
//           <div className="text-white">Nenhum usuário listado</div>
//         )}
//       </ul>

//       {/* Modal do Pódio */}
//       <PodiumModal 
//         show={showPodium} 
//         onClose={() => setShowPodium(false)} 
//         topThree={ranking.slice(0, 3)} 
//       />
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import PodiumModal from "./PodiumModal";

interface Perfil {
  perfil_id: number;
  perfil_imagem: string;
  perfil_cidade: string;
  perfil_pontos: number;
  perfil_nivel: string | number;
  emblema: string | number;
  perfil_usuarios: { usuario_nome: string };
}

export default function Ranking() {
  const [ranking, setRanking] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPodium, setShowPodium] = useState(false);

  useEffect(() => {
    async function fetchRanking() {
      try {
        console.log("Buscando ranking...");
        const response = await axios.get("/api/ranking");

        if (response.data && Array.isArray(response.data)) {
          setRanking(response.data);
        } else {
          throw new Error("Dados recebidos não são um array");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro ao carregar os dados");
        }
        console.error("Erro ao buscar dados do ranking:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRanking();
  }, []);

  const getMedalImage = (index: number) => {
    switch (index) {
      case 0:
        return "/icons/ouro.png";
      case 1:
        return "/icons/prata.png";
      case 2:
        return "/icons/bronze.png";
      default:
        return "/icons/padrao.png";
    }
  };

  return (
    <div className="bg-purple-800 p-4 rounded-xl border border-purple-400 relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-white">Ranking</h3>
        {ranking.length > 0 && (
          <button
            onClick={() => setShowPodium(true)}
            className="relative overflow-hidden group bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
          >
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

            <span className="relative tracking-wide flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              Pódio
            </span>

            <span className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400/30 rounded-xl transition-all duration-300" />
          </button>
        )}
      </div>

      <ul
        className={`mt-2 space-y-2 ${
          ranking.length > 5
            ? "max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800"
            : ""
        }`}
      >
        {loading ? (
          <div className="text-white">Carregando...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : ranking.length > 0 ? (
          ranking.map((rank, index) => (
            <li
              key={rank.perfil_id}
              className="flex justify-between items-center bg-purple-700 p-2 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 text-sm w-5">{index + 1}º</span>
                <Image
                  src={rank.perfil_imagem || "/img/menin.png"}
                  alt={rank.perfil_usuarios?.usuario_nome || "Usuário desconhecido"}
                  className="w-10 h-10 rounded-full object-cover"
                  width={40}
                  height={40}
                />
                <div>
                  <span className="text-white font-semibold">
                    {rank.perfil_usuarios?.usuario_nome
                      ? rank.perfil_usuarios.usuario_nome
                          .toLowerCase()
                          .replace(/^\w/, (c) => c.toUpperCase())
                      : "Usuário desconhecido"}
                  </span>
                  <p className="text-xs text-gray-300">{rank.perfil_cidade}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 font-bold">{rank.perfil_pontos}</span>
                <Image
                  src={getMedalImage(index)}
                  alt="Medalha"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            </li>
          ))
        ) : (
          <div className="text-white">Nenhum usuário listado</div>
        )}
      </ul>

      {/* Modal do Pódio */}
      <PodiumModal show={showPodium} onClose={() => setShowPodium(false)} topThree={ranking.slice(0, 3)} />
    </div>
  );
}
