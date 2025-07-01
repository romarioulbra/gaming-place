// 'use client'

// import { useState, useEffect } from "react";
// import { SlGameController } from "react-icons/sl"; // Ícone de game
// import Image from "next/image";
// import Link from "next/link";
// import axios from "axios";
// import { useSession } from "next-auth/react"; // Importando o hook useSession

// export default function ListaComImagem() {
//   const { data: session } = useSession(); // Obtendo o estado da sessão
//   const [catJogos, setCatJogos] = useState([]);
//   const [jogos, setJogos] = useState([]);
//   const [selectedGame, setSelectedGame] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(false); // Estado de carregamento durante a seleção do jogo

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [catResponse, jogosResponse] = await Promise.all([
//           axios.get('/api/categoria_jogos'),
//           axios.get('/api/jogos')
//         ]);
//         setCatJogos(catResponse.data.cat_jogos);
//         setJogos(jogosResponse.data.jogos);
//         setSelectedGame(jogosResponse.data[0] || null);
//       } catch (error) {
//         console.error('Erro ao buscar dados:', error);
//       }
//     }
//     fetchData();
//   }, []);

 
//   const filteredJogos = selectedCategory && selectedCategory !== "todas"
//     ? jogos.filter(
//         (game) => game.categoria_jogos?.categoria_jogo_area_atuacao.toLowerCase() === selectedCategory.toLowerCase()
//       )
//     : jogos;

//   const isCategoryEmpty = selectedCategory && filteredJogos.length === 0;

//   const handleSelectGame = (game) => {
//     setLoading(true); // Ativa o carregamento quando um jogo é selecionado
//     setSelectedGame(null); // Limpa a seleção anterior

//     // Simula um pequeno atraso para demonstrar o carregamento
//     setTimeout(() => {
//       setSelectedGame(game);
//       setLoading(false); // Desativa o carregamento após a seleção do jogo
//     }, 2000); // Tempo de simulação de carregamento (ajuste conforme necessário)
//   };

//   return (
//     <>
//       <header className="text-center py-8 bg-indigo-800 shadow-lg mt-12">
//         <h1 className="text-4xl font-extrabold text-white">Jogos Existentes</h1>
//         <p className="mt-2 text-lg font-light text-indigo-300">
//           Conheça os mais diversos jogos da Ulbra Palmas.
//         </p>
//       </header>

//       <div className="flex flex-col justify-center items-center h-[790px] bg-gray-100">
//         <div className="mb-2 mt-2 ">
//           <label htmlFor="categoria" className="text-lg font-semibold text-indigo-800 mb-2 block text-center">
//             Categorias
//           </label>
//           <select
//             id="categoria"
//             className="w-96 mb-2 px-4 py-3 rounded-lg shadow-lg text-indigo-800 border border-indigo-300 bg-white hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             value={selectedCategory}
//           >
//             <option value="" disabled>Selecione uma categoria</option>
//             <option value="todas">Todas as Categorias</option>
//             {catJogos.map((categoria) => (
//               <option key={categoria.categoria_jogo_id} value={categoria.categoria_jogo_area_atuacao}>
//                 {categoria.categoria_jogo_area_atuacao}
//               </option>
//             ))}
//           </select>
//         </div>

//         {isCategoryEmpty && (
//           <p className="text-red-500 font-semibold text-xl mb-3 -mt-4">
//             Categoria inexistente, por favor informe outra categoria.
//           </p>
//         )}

//         {/* <div className="w-full h-[600px] bg-white shadow-lg shadow-slate-500 overflow-hidden flex border-white border-2 p-2 "> */}
//         <div className="w-full h-[600px] bg-white shadow-lg shadow-slate-500 overflow-hidden flex border-white border-2 p-2 m-2 sm:m-4 md:m-6 lg:m-8 xl:m-10">
          
//           <ul className="list-none p-0 m-0 w-1/3 sm:w-1/3 bg-gray-300 flex flex-col border-r h-full overflow-y-auto custom-scroll">
//             {filteredJogos.map((game) => (
//               <li
//                 key={game.id}
//                 className={`p-4 border-b border-white text-center hover:bg-gray-400 font-bold ${selectedGame?.id === game.id ? "bg-indigo-500 text-white" : ""}`}
//                 onClick={() => handleSelectGame(game)}
//                 style={{ caretColor: "transparent" }}
//                 tabIndex={-1}
//               >
//                 {game.jogos_nome}
//               </li>
//             ))}
//           </ul>

//           <div className="flex-1 flex flex-col items-center justify-center text-center p-4 ml-2 mr-2">
//             {loading ? (
//             // indigo claro MUITO BOM
//             <div className="w-full h-full flex justify-center items-center bg-indigo-100">
//               <div className="flex flex-col items-center">
//                 <SlGameController className="text-5xl text-indigo-700 animate-spin-left-right mb-4 transition-transform duration-[2000ms] transform scale-125" />
//                 <p className="text-xl text-indigo-700">Carregando...</p>
//               </div>
//             </div>
            
//             ) : (
//               <>
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                   {selectedGame?.jogos_nome || "Jogo Selecionado"} | 
                  
//                   <span className="mt-2 text-black-500 font-semibold uppercase text-sm ml-2">
//                     {selectedGame?.categoria_jogos?.categoria_jogo_area_atuacao || "Sem Categoria"}
//                   </span>
//                 </h2>

//                 {selectedGame && (
//                   <>
//                     <Image
//                       src={selectedGame.jogos_url_img || "/default-image.jpg"}
//                       alt={selectedGame.jogos_nome || "Imagem do Jogo"}
//                       width={250}
//                       height={250}
//                       className="rounded-lg shadow-lg shadow-slate-500 object-cover"
//                     />
//                     <div className="mt-2 mb-2">
//                       <p className="text-gray-600 text-justify mt-4 h-22">
//                         {selectedGame.jogos_descricao || "Descrição indisponível."}
//                       </p>
//                     </div>
                 
//                     {session ? (
//                       <div className="mt-16 ">
//                         <Link href={selectedGame.jogos_link} target="_blank" passHref>
//                           <button className="bg-fuchsia-500 text-white rounded w-15 m-3 p-3">Acessar Jogo</button>
//                         </Link>
//                       </div>
//                     ) : (
//                       <p className="text-red-500 font-semibold mt-4">Você precisa estar logado para acessar o jogo.</p>
//                     )}
//                   </>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


// 'use client'

// import { useState, useEffect } from "react";
// import { SlGameController } from "react-icons/sl";
// import Image from "next/image";
// import Link from "next/link";
// import axios from "axios";
// import { useSession } from "next-auth/react";

// // Tipos para os dados
// type CategoriaJogo = {
//   categoria_jogo_id: number;
//   categoria_jogo_area_atuacao: string;
// };

// type Jogo = {
//   id: number;
//   jogos_nome: string;
//   jogos_descricao: string;
//   jogos_url_img: string;
//   jogos_link: string;
//   categoria_jogos?: {
//     categoria_jogo_area_atuacao: string;
//   };
// };

// export default function ListaComImagem() {
//   const { data: session } = useSession();
//   const [catJogos, setCatJogos] = useState<CategoriaJogo[]>([]);
//   const [jogos, setJogos] = useState<Jogo[]>([]);
//   const [selectedGame, setSelectedGame] = useState<Jogo | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setError("");
//         const [catResponse, jogosResponse] = await Promise.all([
//           axios.get('/api/categoria_jogos'),
//           axios.get('/api/jogos')
//         ]);
//         setCatJogos(catResponse.data.cat_jogos);
//         setJogos(jogosResponse.data.jogos);
//         if (jogosResponse.data.jogos.length > 0) {
//           setSelectedGame(jogosResponse.data.jogos[0]);
//         }
//       } catch (error) {
//         console.error('Erro ao buscar dados:', error);
//         setError("Erro ao carregar jogos. Tente novamente mais tarde.");
//       }
//     }
//     fetchData();
//   }, []);

//   const filteredJogos = selectedCategory && selectedCategory !== "todas"
//     ? jogos.filter(
//         (game) => game.categoria_jogos?.categoria_jogo_area_atuacao.toLowerCase() === selectedCategory.toLowerCase()
//       )
//     : jogos;

//   const isCategoryEmpty = selectedCategory && filteredJogos.length === 0;

//   const handleSelectGame = (game: Jogo) => {
//     setLoading(true);
//     setSelectedGame(null);

//     setTimeout(() => {
//       setSelectedGame(game);
//       setLoading(false);
//     }, 300);
//   };

//   // Função para formatar corretamente a URL (expressão regular corrigida)
//   const formatExternalUrl = (url: string): string => {
//     if (!url) return "#";
    
//     // Expressão regular corrigida - remove protocolos, localhost e caminhos
//     const cleanedUrl = url.replace(
//       /^(https?:\/\/)?(localhost(:\d+)?)?(\/jogos)?\/?/i, 
//       ''
//     ).trim();
    
//     // Se estiver vazio ou não for um domínio válido, retorna fallback
//     if (!cleanedUrl || !cleanedUrl.includes('.')) return "#";
    
//     // Remove barras extras no final
//     const finalUrl = cleanedUrl.replace(/\/+$/, '');
    
//     // Retorna a URL formatada para uso externo
//     return finalUrl.startsWith('www.') || /^https?:\/\//i.test(finalUrl)
//       ? finalUrl
//       : `www.${finalUrl}`;
//   };

//   return (
//     <>
//       <header className="text-center py-8 bg-indigo-800 shadow-lg mt-12">
//         <h1 className="text-4xl font-extrabold text-white">Jogos Existentes</h1>
//         <p className="mt-2 text-lg font-light text-indigo-300">
//           Conheça os mais diversos jogos da Ulbra Palmas
//         </p>
//       </header>

//       {error && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mx-auto max-w-4xl mt-4">
//           <p>{error}</p>
//         </div>
//       )}

//       <div className="flex flex-col justify-center items-center min-h-[790px] bg-gray-100 p-4">
//         <div className="mb-4 w-full max-w-4xl">
//           <label htmlFor="categoria" className="text-lg font-semibold text-indigo-800 mb-2 block text-center">
//             Categorias
//           </label>
//           <select
//             id="categoria"
//             className="w-full max-w-md mx-auto px-4 py-3 rounded-lg shadow-lg text-indigo-800 border border-indigo-300 bg-white hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             value={selectedCategory}
//           >
//             <option value="" disabled>Selecione uma categoria</option>
//             <option value="todas">Todas as Categorias</option>
//             {catJogos.map((categoria) => (
//               <option key={categoria.categoria_jogo_id} value={categoria.categoria_jogo_area_atuacao}>
//                 {categoria.categoria_jogo_area_atuacao}
//               </option>
//             ))}
//           </select>
//         </div>

//         {isCategoryEmpty && (
//           <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-4xl w-full mb-4">
//             <p>Categoria sem jogos disponíveis. Selecione outra categoria.</p>
//           </div>
//         )}

//         <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row border border-gray-200">
//           <div className="w-full md:w-1/3 bg-gray-100 max-h-[600px] overflow-y-auto">
//             <ul className="divide-y divide-gray-200">
//               {filteredJogos.map((game) => (
//                 <li
//                   key={game.id}
//                   className={`p-4 hover:bg-gray-200 cursor-pointer transition-colors ${
//                     selectedGame?.id === game.id ? "bg-indigo-100 border-l-4 border-indigo-500" : ""
//                   }`}
//                   onClick={() => handleSelectGame(game)}
//                 >
//                   <h3 className="font-semibold text-gray-800">{game.jogos_nome}</h3>
//                   <p className="text-sm text-gray-500 mt-1">
//                     {game.categoria_jogos?.categoria_jogo_area_atuacao || "Sem categoria"}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="w-full md:w-2/3 p-6 flex flex-col items-center justify-center min-h-[400px]">
//             {loading ? (
//               <div className="flex flex-col items-center justify-center h-full">
//                 <SlGameController className="text-5xl text-indigo-600 animate-spin mb-4" />
//                 <p className="text-lg text-indigo-700">Carregando jogo...</p>
//               </div>
//             ) : selectedGame ? (
//               <>
//                 <div className="text-center mb-6">
//                   <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                     {selectedGame.jogos_nome}
//                   </h2>
//                   <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full uppercase font-semibold">
//                     {selectedGame.categoria_jogos?.categoria_jogo_area_atuacao || "Sem categoria"}
//                   </span>
//                 </div>

//                 <div className="mb-6 w-full max-w-md">
//                   <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
//                     <Image
//                       src={selectedGame.jogos_url_img || "/default-game.jpg"}
//                       alt={selectedGame.jogos_nome || "Imagem do jogo"}
//                       fill
//                       className="object-cover"
//                       priority
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-6 w-full max-w-2xl">
//                   <p className="text-gray-700 text-center">
//                     {selectedGame.jogos_descricao || "Descrição não disponível."}
//                   </p>
//                 </div>

//                 {session ? (
//                   <Link
//                     href={`https://${formatExternalUrl(selectedGame.jogos_link)}`}
//                     passHref
//                     legacyBehavior
//                   >
//                     <a 
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
//                     >
//                       Acessar Jogo
//                       <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                       </svg>
//                     </a>
//                   </Link>
//                 ) : (
//                   <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4">
//                     <p>Você precisa estar logado para acessar este jogo.</p>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="text-center">
//                 <p className="text-gray-500">Selecione um jogo para visualizar os detalhes</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

'use client'

import { useState, useEffect } from "react";
import { SlGameController } from "react-icons/sl";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";

// Tipos para os dados
type CategoriaJogo = {
  categoria_jogo_id: number;
  categoria_jogo_area_atuacao: string;
};

type Jogo = {
  id: number;
  jogos_nome: string;
  jogos_descricao: string;
  jogos_url_img: string;
  jogos_link: string;
  categoria_jogos?: {
    categoria_jogo_area_atuacao: string;
  };
};

export default function ListaComImagem() {
  const { data: session } = useSession();
  const [catJogos, setCatJogos] = useState<CategoriaJogo[]>([]);
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [selectedGame, setSelectedGame] = useState<Jogo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setError("");
        const [catResponse, jogosResponse] = await Promise.all([
          axios.get('/api/categoria_jogos'),
          axios.get('/api/jogos')
        ]);
        setCatJogos(catResponse.data.cat_jogos);
        setJogos(jogosResponse.data.jogos);
        if (jogosResponse.data.jogos.length > 0) {
          setSelectedGame(jogosResponse.data.jogos[0]);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError("Erro ao carregar jogos. Tente novamente mais tarde.");
      }
    }
    fetchData();
  }, []);

  const filteredJogos = selectedCategory && selectedCategory !== "todas"
    ? jogos.filter(
        (game) => game.categoria_jogos?.categoria_jogo_area_atuacao.toLowerCase() === selectedCategory.toLowerCase()
      )
    : jogos;

  const isCategoryEmpty = selectedCategory && filteredJogos.length === 0;

  const handleSelectGame = (game: Jogo) => {
    setLoading(true);
    setSelectedGame(null);

    setTimeout(() => {
      setSelectedGame(game);
      setLoading(false);
    }, 300);
  };

  // Função corrigida para tratamento de URLs
  const getValidUrl = (url: string): string => {
    if (!url) return "#";
    
    // Remove qualquer prefixo de localhost ou caminho
    const cleanedUrl = url
      .replace(/^(https?:\/\/)?(localhost(:\d+)?)?(\/jogos)?\/?/i, '')
      .trim();
    
    // Se estiver vazio ou não for um domínio válido
    if (!cleanedUrl || !cleanedUrl.includes('.')) return "#";
    
    // Remove barras no final se existirem
    const trimmedUrl = cleanedUrl.replace(/\/+$/, '');
    
    // Retorna com protocolo relativo (//) para evitar problemas
    return `//${trimmedUrl}`;
  };

  return (
    <>
      <header className="text-center py-8 bg-indigo-800 shadow-lg mt-12">
        <h1 className="text-4xl font-extrabold text-white">Jogos Existentes</h1>
        <p className="mt-2 text-lg font-light text-indigo-300">
          Conheça os mais diversos jogos da Ulbra Palmas
        </p>
      </header>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mx-auto max-w-4xl mt-4">
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-col justify-center items-center h-[790px] bg-gray-100">
        <div className="mb-2 mt-2">
          <label htmlFor="categoria" className="text-lg font-semibold text-indigo-800 mb-2 block text-center">
            Categorias
          </label>
          <select
            id="categoria"
            className="w-96 mb-2 px-4 py-3 rounded-lg shadow-lg text-indigo-800 border border-indigo-300 bg-white hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="" disabled>Selecione uma categoria</option>
            <option value="todas">Todas as Categorias</option>
            {catJogos.map((categoria) => (
              <option key={categoria.categoria_jogo_id} value={categoria.categoria_jogo_area_atuacao}>
                {categoria.categoria_jogo_area_atuacao}
              </option>
            ))}
          </select>
        </div>

        {isCategoryEmpty && (
          <p className="text-red-500 font-semibold text-xl mb-3 -mt-4">
            Categoria inexistente, por favor informe outra categoria.
          </p>
        )}

        <div className="w-full h-[600px] bg-white shadow-lg shadow-slate-500 overflow-hidden flex border-white border-2 p-2">
          <ul className="list-none p-0 m-0 w-1/3 bg-gray-300 flex flex-col border-r h-full overflow-y-auto custom-scroll">
            {filteredJogos.map((game) => (
              <li
                key={game.id}
                className={`p-4 border-b border-white text-center hover:bg-gray-400 font-bold ${selectedGame?.id === game.id ? "bg-indigo-500 text-white" : ""}`}
                onClick={() => handleSelectGame(game)}
                style={{ caretColor: "transparent" }}
                tabIndex={-1}
              >
                {game.jogos_nome}
              </li>
            ))}
          </ul>

          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 ml-2 mr-2">
            {loading ? (
              <div className="w-full h-full flex justify-center items-center bg-indigo-100">
                <div className="flex flex-col items-center">
                  <SlGameController className="text-5xl text-indigo-700 animate-spin-left-right mb-4 transition-transform duration-[2000ms] transform scale-125" />
                  <p className="text-xl text-indigo-700">Carregando...</p>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {selectedGame?.jogos_nome || "Jogo Selecionado"} | 
                  <span className="mt-2 text-black-500 font-semibold uppercase text-sm ml-2">
                    {selectedGame?.categoria_jogos?.categoria_jogo_area_atuacao || "Sem Categoria"}
                  </span>
                </h2>

                {selectedGame && (
                  <>
                    <Image
                      src={selectedGame.jogos_url_img || "/default-image.jpg"}
                      alt={selectedGame.jogos_nome || "Imagem do Jogo"}
                      width={250}
                      height={250}
                      className="rounded-lg shadow-lg shadow-slate-500 object-cover"
                    />
                    <div className="mt-2 mb-2">
                      <p className="text-gray-600 text-justify mt-4 h-22">
                        {selectedGame.jogos_descricao || "Descrição indisponível."}
                      </p>
                    </div>
                 
                    {session ? (
                      <div className="mt-16">
                        <a 
                          href={getValidUrl(selectedGame.jogos_link)} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-fuchsia-500 text-white rounded w-15 m-3 p-3 inline-block"
                        >
                          Acessar Jogo
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                        </a>

                      </div>
                    ) : (
                      <p className="text-red-500 font-semibold mt-4">Você precisa estar logado para acessar o jogo.</p>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}