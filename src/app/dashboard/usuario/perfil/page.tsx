// Último que estava funcionando
// "use client";
// import Ranking from "@/app/components/Ranking";
// import Image from "next/image";
// import Emblemas from "@/app/components/Emblemas";
// import { useSession } from "next-auth/react";
// import BarraProgresso from "@/app/components/BarraProgresso";
// import React from "react";

// export default function Perfil() {
//   const { data: session, status } = useSession();

//   if (!session) {
//     return <p>Carregando...</p>;
//   }

//   // Extraindo os dados do usuário diretamente da sessão
//   const { nome, nivel, email, perfil_imagem, perfil_cidade, perfil_pontos, emblema } = session.usuario;

//   console.log(session);
  
//   return (
//     <div className="bg-gradient-to-b from-gray-300 to-indigo-200 min-h-screen flex justify-center items-center">
//       <div className="w-full max-w-4xl p-6 bg-purple-600 text-white rounded-xl shadow-lg space-y-6 m-2">
        
//         {/* Perfil */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Image
//               src={perfil_imagem || "/img/avatar.jpg"} // Se não houver imagem, usa padrão
//               alt="Foto de perfil"
//               className="rounded-full object-cover w-24 h-24 mx-auto border-1 border-slate-500 shadow-md shadow-indigo-800"
//               width={100}
//               height={100}
//             />
//             <div>
//               <h2 className="text-2xl font-bold">{nome}</h2>
//               <p className="text-sm text-gray-300">{email}</p>
//               <p className="text-sm text-gray-300">{perfil_cidade || "Cidade não informada"}</p>
//             </div>
//           </div>
//           <div>
//             <p className="text-sm">Troféus: <span className="font-bold">{emblema || 0}</span></p>
//             <p className="text-sm">Pontos: <span className="font-bold text-yellow-400">{perfil_pontos || 0}</span></p>
//             <p className="text-sm">Nível: <span className="font-bold text-green-400">{nivel}</span></p>
//           </div>
//         </div>

//         {/* Barra de Progresso */}
//         <div>
//           <p className="text-sm mb-1">Progresso</p>
//           <div className="w-full bg-gray-700 rounded-full h-2">
//             <div
//               className="bg-yellow-400 h-2 rounded-full"
//               style={{ width: '60%' }}
//             ></div>
//           </div>
//         </div>

//         <BarraProgresso/>
//         <Emblemas/>
//         <Ranking/>

//         {/* Botões de Ação */}
//         <div className="flex space-x-4">
//           <button className="flex-1 bg-pink-600 py-2 rounded-lg hover:bg-pink-700">
//             Adicionar amigos
//           </button>
//           <button className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700">
//             Enviar sugestão
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import Ranking from "@/app/components/Ranking";
import Image from "next/image";
import Emblemas from "@/app/components/Emblemas";
import { useSession } from "next-auth/react";
import BarraProgresso from "@/app/components/BarraProgresso";
import { useState, useEffect } from "react";

export default function Perfil() {
  const { data: session, status } = useSession();
  const [perfil, setPerfil] = useState({
    perfil_imagem: "/img/avatar.jpg",
    perfil_cidade: "Cidade não informada",
    perfil_pontos: 0,
    perfil_nivel: 1,
    emblema: 0,
  });

  useEffect(() => {
    if (session?.usuario?.id) {
      fetch("/api/perfis") // Corrigido o endpoint
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

  const { nome, email, nivel } = session.usuario;
  const { perfil_imagem, perfil_cidade, perfil_pontos, emblema } = perfil;

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
          <div>
            <p className="text-sm">Troféus: <span className="font-bold">{emblema}</span></p>
            <p className="text-sm">Pontos: <span className="font-bold text-yellow-400">{perfil_pontos}</span></p>
            <p className="text-sm">Nível: <span className="font-bold text-green-400">{nivel}</span></p>
          </div>
        </div>

        {/* Barra de Progresso */}
        {/* <div>
          <p className="text-sm mb-1">Progresso</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${(perfil_pontos / 1000) * 100}%` }}></div>
          </div>
        </div> */}

        <BarraProgresso />
        <Emblemas />
        <Ranking />

        {/* Botões de Ação */}
        <div className="flex space-x-4">
          <button className="flex-1 bg-pink-600 py-2 rounded-lg hover:bg-pink-700">
            Adicionar amigos
          </button>
          <button className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700">
            Enviar sugestão
          </button>
        </div>
      </div>
    </div>
  );
}
