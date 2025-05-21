// 'use client'
// import { useEffect,useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import Link from 'next/link';
// import { MdVideogameAssetOff } from "react-icons/md";


// export default function Jogos() {
//     // //Buscando Dados do BD para Recarregar na página
//     const [jogos, setJogos] = useState([]);
//     const [telaSemJogo, setTelaSemJogo] = useState(false);

//     useEffect(() => {
//       async function fetchJogos() {
//         try {
//           const response = await axios.get('/api/jogos');
//           setJogos(response.data.jogos);
//         } catch (error) {
//           console.error('Erro ao buscar Todos os Jogos:', error);
//         }
//       }
//       fetchJogos();
//     }, []);

//      console.log(jogos);


//   return (
//      <>
//       <header className="text-center py-8 bg-indigo-800 shadow-lg mt-12">
//         <h1 className="text-4xl font-extrabold text-white">Jogos Disponíveis</h1>
//       </header>

//       {telaSemJogo ? (
//         <div className="h-screen bg-gray-200 flex flex-col items-center justify-center">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold text-black">
//               Nenhum Jogo foi Lançado no Sistema!
//             </h1>
//             <p className="text-lg mt-2 text-gray-600 font-bold">
//               Por favor, informe ao Desenvolvedor
//             </p>
//           </div>
//           <MdVideogameAssetOff className="w-40 h-40 text-purple-700 hover:scale-110 transition-transform duration-300 mt-5" />
//         </div>
//       ) : (
        
//         <div className="min-h-screen bg-gray-200 py-8">
//           <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
//             {jogos.slice(0, 4).map((game, index) => (
//               <div
//                 key={index}
//                 className="flex bg-gray-800 rounded-lg shadow-lg overflow-hidden"
//               >
//                 <div className="relative w-1/3 h-auto">
//                   <Image
//                     src={game.jogos_url_img || "/default-image.jpg"} // Use uma imagem padrão caso não exista
//                     alt={game.jogos_nome || "Jogo"}
//                     layout="responsive"
//                     width={250}
//                     height={250}
//                     objectFit="cover"
//                     className="rounded-l-lg"
//                   />
//                 </div>
//                 <div className="p-4 flex flex-col justify-between">
//                   <div>
//                     <span className="text-sm text-green-500 font-semibold uppercase">
//                       Categoria: {game.categoria_jogos?.categoria_jogo_area_atuacao || "Sem Categoria"}
//                     </span>
//                     <h2 className="text-white text-xl font-bold mt-2">
//                       {game.jogos_nome || "Nome do Jogo"}
//                     </h2>
//                     <p className="text-gray-400 text-sm mt-2">
//                       {game.jogos_descricao || "Descrição indisponível."}
//                     </p>
//                     <div className="text-sm mb-2 text-fuchsia-500 font-semibold uppercase text-right block ">
//                      <p>Desenvolvido por:  {game.jogos_autor || "Autor Desconhecido"}</p>
//                     </div>
//                   </div>
//                   <button className="bg-fuchsia-700 hover:bg-pink-600 transition-colors py-2 px-4 rounded font-semibold  text-white ">
//                     Conhecer Jogo
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex items-center justify-center mt-4">
//             <Link href="/jogos/todosJogos">
//               <button className="bg-pink-500 hover:bg-pink-600 transition-colors py-2 px-4 rounded font-semibold  text-white ">
//                 Mais Jogos
//               </button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </>
 
//   );
// }


'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from 'next/link';
import { MdVideogameAssetOff } from "react-icons/md";

export default function Jogos() {
  const [jogos, setJogos] = useState([]);
  const [telaSemJogo, setTelaSemJogo] = useState(false);

  useEffect(() => {
    async function fetchJogos() {
      try {
        const response = await axios.get('/api/jogos');
        const jogosRecebidos = response.data.jogos || [];

        setJogos(jogosRecebidos);
        setTelaSemJogo(jogosRecebidos.length === 0);
      } catch (error) {
        console.error('Erro ao buscar Todos os Jogos:', error);
        setTelaSemJogo(true); // caso dê erro, pode mostrar a tela sem jogo
      }
    }
    fetchJogos();
  }, []);

  return (
    <>
      <header className="text-center py-8 bg-indigo-800 shadow-lg mt-12">
        <h1 className="text-4xl font-extrabold text-white">Jogos Disponíveis</h1>
      </header>

      {telaSemJogo ? (
        <div className="h-screen bg-gray-200 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black">
              Nenhum Jogo foi Lançado no Sistema!
            </h1>
            <p className="text-lg mt-2 text-gray-600 font-bold">
              Por favor, informe ao Desenvolvedor
            </p>
          </div>
          <MdVideogameAssetOff className="w-40 h-40 text-purple-700 hover:scale-110 transition-transform duration-300 mt-5" />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-200 py-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
            {jogos.slice(0, 4).map((game, index) => (
              <div
                key={index}
                className="flex bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative w-1/3 h-auto">
                  <Image
                    src={game.jogos_url_img || "/default-image.jpg"}
                    alt={game.jogos_nome || "Jogo"}
                    layout="responsive"
                    width={250}
                    height={250}
                    objectFit="cover"
                    className="rounded-l-lg"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-sm text-green-500 font-semibold uppercase">
                      Categoria: {game.categoria_jogos?.categoria_jogo_area_atuacao || "Sem Categoria"}
                    </span>
                    <h2 className="text-white text-xl font-bold mt-2">
                      {game.jogos_nome || "Nome do Jogo"}
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                      {game.jogos_descricao || "Descrição indisponível."}
                    </p>
                    <div className="text-sm mb-2 text-fuchsia-500 font-semibold uppercase text-right block ">
                      <p>Desenvolvido por:  {game.jogos_autor || "Autor Desconhecido"}</p>
                    </div>
                  </div>
                  <button className="bg-fuchsia-700 hover:bg-pink-600 transition-colors py-2 px-4 rounded font-semibold  text-white ">
                    Conhecer Jogo
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-4">
            <Link href="/jogos/todosJogos">
              <button className="bg-pink-500 hover:bg-pink-600 transition-colors py-2 px-4 rounded font-semibold  text-white ">
                Mais Jogos
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
