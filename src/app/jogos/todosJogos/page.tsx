'use client'

import { useState, useEffect } from "react";
import { SlGameController } from "react-icons/sl"; // Ícone de game
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react"; // Importando o hook useSession

export default function ListaComImagem() {
  const { data: session } = useSession(); // Obtendo o estado da sessão
  const [catJogos, setCatJogos] = useState([]);
  const [jogos, setJogos] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carregamento durante a seleção do jogo

  useEffect(() => {
    async function fetchData() {
      try {
        const [catResponse, jogosResponse] = await Promise.all([
          axios.get('/api/categoria_jogos'),
          axios.get('/api/jogos')
        ]);
        setCatJogos(catResponse.data.cat_jogos);
        setJogos(jogosResponse.data.jogos);
        setSelectedGame(jogosResponse.data[0] || null);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
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

  const handleSelectGame = (game) => {
    setLoading(true); // Ativa o carregamento quando um jogo é selecionado
    setSelectedGame(null); // Limpa a seleção anterior

    // Simula um pequeno atraso para demonstrar o carregamento
    setTimeout(() => {
      setSelectedGame(game);
      setLoading(false); // Desativa o carregamento após a seleção do jogo
    }, 2000); // Tempo de simulação de carregamento (ajuste conforme necessário)
  };

  return (
    <>
      <header className="text-center py-8 bg-indigo-800 shadow-lg mt-12">
        <h1 className="text-4xl font-extrabold text-white">Jogos Existentes</h1>
        <p className="mt-2 text-lg font-light text-indigo-300">
          Conheça os mais diversos jogos da Ulbra Palmas.
        </p>
      </header>

      <div className="flex flex-col justify-center items-center h-[790px] bg-gray-100">
        <div className="mb-2 mt-2 ">
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

        {/* <div className="w-full h-[600px] bg-white shadow-lg shadow-slate-500 overflow-hidden flex border-white border-2 p-2 "> */}
        <div className="w-full h-[600px] bg-white shadow-lg shadow-slate-500 overflow-hidden flex border-white border-2 p-2 m-2 sm:m-4 md:m-6 lg:m-8 xl:m-10">
          
          <ul className="list-none p-0 m-0 w-1/3 sm:w-1/3 bg-gray-300 flex flex-col border-r h-full overflow-y-auto custom-scroll">
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
            //   <div className="w-full h-full flex justify-center items-center bg-purple-300">
            //   <div className="flex flex-col items-center">
            //     <SlGameController
            //       className="text-5xl text-purple-800 animate-spin-left-right mb-4 transition-transform duration-[2000ms] transform scale-125"
            //     />
            //     <p className="text-xl text-purple-800">Carregando...</p>
            //   </div>
            // </div>
            
            // amarelo
            // <div className="w-full h-full flex justify-center items-center bg-amber-100">
            //   <div className="flex flex-col items-center">
            //     <SlGameController
            //       className="text-5xl text-indigo-800 animate-spin-left-right mb-4 transition-transform duration-[2000ms] transform scale-125"
            //     />
            //     <p className="text-xl text-indigo-800">Carregando...</p>
            //   </div>
            // </div>

            // esverdeado
            // <div className="w-full h-full flex justify-center items-center bg-teal-100">
            //   <div className="flex flex-col items-center">
            //     <SlGameController
            //       className="text-5xl text-indigo-700 animate-spin-left-right mb-4 transition-transform duration-[2000ms] transform scale-125"
            //     />
            //     <p className="text-xl text-indigo-700">Carregando...</p>
            //   </div>
            // </div>

            // indigo claro MUITO BOM
            <div className="w-full h-full flex justify-center items-center bg-indigo-100">
              <div className="flex flex-col items-center">
                <SlGameController className="text-5xl text-indigo-700 animate-spin-left-right mb-4 transition-transform duration-[2000ms] transform scale-125" />
                <p className="text-xl text-indigo-700">Carregando...</p>
              </div>
            </div>
            
            // Lilás MUITO BOM
            // <div className="w-full h-full flex justify-center items-center bg-purple-200">
            //   <div className="flex flex-col items-center">
            //     <SlGameController className="text-5xl text-purple-700 animate-spin-left-right mb-4 transition-transform duration-[2000ms] transform scale-125" />
            //     <p className="text-xl text-purple-700">Carregando...</p>
            //   </div>
            // </div>
             
            // Cinza Azulado MUITO BOM 
            // <div className="w-full h-full flex justify-center items-center bg-gray-100">
            //   <div className="flex flex-col items-center">
            //     <SlGameController className="text-5xl text-indigo-600 animate-spin-left-right mb-4 transition-transform duration-[2000ms] transform scale-125" />
            //     <p className="text-xl text-indigo-600">Carregando...</p>
            //   </div>
            // </div>

            
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
                      <div className="mt-16 ">
                        <Link href={selectedGame.jogos_link} target="_blank" passHref>
                          <button className="bg-fuchsia-500 text-white rounded w-15 m-3 p-3">Acessar Jogo</button>
                        </Link>
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
