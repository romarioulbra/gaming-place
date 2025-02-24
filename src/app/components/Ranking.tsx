// import Image from "next/image";

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Ranking(){

//   const [ranking, setRanking] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchRanking() {
//       try {
//         const response = await axios.get("/api/perfis"); // Use axios.get
//         setRanking(response.data); // Os dados estão em response.data
//       } catch (err) {
//         setError(err);
//         console.error("Erro ao buscar dados do ranking:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchRanking();
//   }, []);

//   console.log(ranking)
//   return(
//     <>
//       <div className="bg-purple-800 p-4 rounded-xl border border-purple-400">
//          <h3 className="text-lg font-bold">Ranking</h3>
//           <ul className="mt-2 space-y-2">
//             {[
//               { name: "Jaiminho", points: 1320 },
//               { name: "Zaya", points: 999 },
//               { name: "Dona Florinda", points: 950 },
//               { name: "Chaves", points: 740 },
//               { name: "Michel Teló", points: 610 },
//             ].map((user, index) => (
           
//               <li
//                 key={index}
//                 className="flex justify-between items-center bg-purple-700 p-2 rounded-lg"
//               >
//                 <div className="flex items-center space-x-2">
//                   <Image
//                      src={`/img/menin.png`}
//                     alt={user.name}
//                     className="w-10 h-10 rounded-full"
//                     width={100}
//                     height={100}
//                   />
//                   <span>{user.name}</span>
//                 </div>
//                 <span className="text-yellow-400 font-bold">
//                   {user.points} 🏆
//                 </span>
//               </li>
//             ))}
//           </ul>
//       </div>
//     </>
//   );
// }


"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface Perfil {
  perfil_id: number;
  perfil_imagem: string;
  perfil_cidade: string;
  perfil_pontos: number;
  perfil_nivel: string | number;
  emblema: string | number;
  usuario: string | number;
}

export default function Ranking() {
  const [ranking, setRanking] = useState<Perfil[]>([]); // Estado precisa vir antes do useEffect
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRanking() {
      try {
        console.log("Buscando ranking...");
        const response = await axios.get("/api/perfis");

        if (response.data && Array.isArray(response.data)) {
          setRanking(response.data);
        } else {
          throw new Error("Dados recebidos não são um array");
        }
      } catch (err: any) {
        setError(err?.message || "Erro ao carregar os dados");
        console.error("Erro ao buscar dados do ranking:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRanking();
  }, []);

  console.log("Ranking carregado:", ranking);

  return (
    <div className="bg-purple-800 p-4 rounded-xl border border-purple-400">
      <h3 className="text-lg font-bold text-white">Ranking</h3>
      <ul className="mt-2 space-y-2">
        {loading ? (
          <div className="text-white">Carregando...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : ranking.length > 0 ? (
          ranking.slice(0, 5).map((rank) => (
            <li
              key={rank.perfil_id}
              className="flex justify-between items-center bg-purple-700 p-2 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <Image
                  src={rank.perfil_imagem || "/img/menin.png"} // Fallback de imagem
                  alt={rank.usuario?.toString() || "Perfil"}
                  className="w-10 h-10 rounded-full object-cover"
                  width={40}
                  height={40}
                />
                <div>
                  <span className="text-white font-semibold">
                    {rank.usuario}
                  </span>
                  <p className="text-xs text-gray-300">{rank.perfil_cidade}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-yellow-400 font-bold">
                  {rank.perfil_pontos} 🏆
                </span>
                <p className="text-xs text-gray-300">{rank.perfil_nivel}</p>
              </div>
            </li>
          ))
        ) : (
          <div className="text-white">Nenhum usuário listado</div>
        )}
      </ul>
    </div>
  );
}
