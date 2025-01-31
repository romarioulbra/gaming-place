'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ListaComImagem() {
  // Estado inicial de jogos
  const [jogos, setJogos] = useState([
    { id: 1, jogos_url_img: "/img/montanha.jpg", jogos_nome: "Jogo 1", jogos_descricao: "Este é um jogo incrível de ação e aventura.Este é um jogo incrível de ação e aventura.Este é um jogo incrível de ação e aventura.Este é um jogo incrível de ação e aventura.", categoria_jogos: { categoria_jogo_area_atuacao: "Ação" } },
    { id: 2, jogos_url_img: "/img/aranha.jpeg", jogos_nome: "Jogo 2", jogos_descricao: "Explore um mundo fascinante e cheio de desafios.", categoria_jogos: { categoria_jogo_area_atuacao: "Aventura" } },
    { id: 3, jogos_url_img: "/img/montanha.jpg", jogos_nome: "Jogo 3", jogos_descricao: "Enfrente batalhas épicas em uma jornada inesquecível.", categoria_jogos: { categoria_jogo_area_atuacao: "RPG" } },
    { id: 4, jogos_url_img: "/img/montanha.png", jogos_nome: "Jogo 4", jogos_descricao: "Divirta-se com partidas emocionantes e dinâmicas.", categoria_jogos: { categoria_jogo_area_atuacao: "Esportes" } },
    { id: 5, jogos_url_img: "/img/montanha.png", jogos_nome: "Jogo 5", jogos_descricao: "Divirta-se com partidas emocionantes e dinâmicas.", categoria_jogos: { categoria_jogo_area_atuacao: "Esportes" } },
    { id: 6, jogos_url_img: "/img/montanha.png", jogos_nome: "Jogo 6", jogos_descricao: "Divirta-se com partidas emocionantes e dinâmicas.", categoria_jogos: { categoria_jogo_area_atuacao: "RPG" } },
    { id: 7, jogos_url_img: "/img/montanha.png", jogos_nome: "Jogo 7", jogos_descricao: "Divirta-se com partidas emocionantes e dinâmicas.", categoria_jogos: { categoria_jogo_area_atuacao: "Esportes" } },
    { id: 8, jogos_url_img: "/img/montanha.png", jogos_nome: "Jogo 8", jogos_descricao: "Divirta-se com partidas emocionantes e dinâmicas.", categoria_jogos: { categoria_jogo_area_atuacao: "RPG" } },
    { id: 9, jogos_url_img: "/img/montanha.png", jogos_nome: "Jogo 9", jogos_descricao: "Divirta-se com partidas emocionantes e dinâmicas.", categoria_jogos: { categoria_jogo_area_atuacao: "Esportes" } },
    { id: 10, jogos_url_img: "/img/montanha.png", jogos_nome: "Jogo 10", jogos_descricao: "Divirta-se com partidas emocionantes e dinâmicas.", categoria_jogos: { categoria_jogo_area_atuacao: "Aventura" } },
    { id: 11, jogos_url_img: "/img/montanha.png", jogos_nome: "Jogo 11", jogos_descricao: "Divirta-se com partidas emocionantes e dinâmicas.", categoria_jogos: { categoria_jogo_area_atuacao: "Esportes" } },
    { id: 12, jogos_url_img: "/img/montanha.png", jogos_nome: "Jogo 12", jogos_descricao: "Divirta-se com partidas emocionantes e dinâmicas.", categoria_jogos: { categoria_jogo_area_atuacao: "RPG" } },
    { id: 13, jogos_url_img: "/img/montanha.png", jogos_nome: "Jogo 13", jogos_descricao: "Divirta-se com partidas emocionantes e dinâmicas.", categoria_jogos: { categoria_jogo_area_atuacao: "Esportes" } },
    { id: 13, jogos_url_img: "/img/montanha.png", jogos_nome: "Jogo 14", jogos_descricao: "Divirta-se com partidas emocionantes e dinâmicas.", categoria_jogos: { categoria_jogo_area_atuacao: "Aventura" } },
    { id: 13, jogos_url_img: "/img/montanha.png", jogos_nome: "Jogo 15", jogos_descricao: "Divirta-se com partidas emocionantes e dinâmicas.", categoria_jogos: { categoria_jogo_area_atuacao: "Esportes" } },
  ]);


  // const handleGoBack = () => {
  //   window.history.back();  // Volta para a página anterior
  // };


  // Estado para o jogo selecionado
  const [selectedGame, setSelectedGame] = useState(jogos[0]);

  // Estado para a categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState("");

  // Função para filtrar jogos pela categoria
  const filteredJogos = selectedCategory && selectedCategory !== "todas"
    ? jogos.filter(
        (game) => game.categoria_jogos.categoria_jogo_area_atuacao.toLowerCase() === selectedCategory.toLowerCase()
      )
    : jogos;

  // Verificar se há jogos filtrados
  const isCategoryEmpty = selectedCategory && filteredJogos.length === 0;

  return (
    <>
      {/* Header */}
      <header className="text-center py-8 bg-indigo-800 shadow-lg mt-12">
        <h1 className="text-4xl font-extrabold text-white">Jogos Existentes</h1>
        <p className="mt-2 text-lg font-light text-indigo-300">
          Conheça os mais diversos jogos da Ulbra Palmas.
        </p>
      </header>

      {/* Conteúdo principal */}
      <div className="flex flex-col justify-center items-center h-[790px] bg-gray-100">
        {/* Seletor de categorias */}
        <div className="mb-4 -mt-10">
          <label
            htmlFor="categoria"
            className="text-lg font-semibold text-indigo-800 mb-2 block text-center"
          >
            Categorias
          </label>

          <select
            id="categoria"
            className="w-96 mb-5 px-4 py-3 rounded-lg shadow-lg text-indigo-800 border border-indigo-300 bg-white hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            onChange={(e) => setSelectedCategory(e.target.value)} // Atualiza o estado da categoria
            value={selectedCategory}
          >
            <option value="" disabled selected>
              Selecione uma categoria
            </option>
            <option value="todas">Todas as Categorias</option> {/* Nova opção */}
            <option value="acao">Ação</option>
            <option value="aventura">Aventura</option>
            <option value="rpg">RPG</option>
            <option value="esportes">Esportes</option>
          </select>
        </div>


        {/* Mensagem de categoria inexistente */}
        {isCategoryEmpty && (
          <p className="text-red-500 font-semibold text-xl mb-3 -mt-4">
            Categoria inexistente, por favor informe outra categoria.
          </p>
        )}
        {/* Card com lista e painel de detalhes */}
        <div className="w-full h-[600px] bg-white shadow-lg shadow-slate-500 overflow-hidden flex border-white border-4">
          {/* Lista de jogos filtrada */}
          <ul className="list-none p-0 m-0 w-1/3 bg-gray-300 flex flex-col border-r h-full overflow-y-auto custom-scroll">
            {filteredJogos.map((game) => (
              <li
                key={game.id}
                className={`p-4 border-b border-white text-center hover:bg-gray-400 font-bold ${
                  selectedGame.id === game.id ? "bg-indigo-500 text-white" : ""
                }`}
                onClick={() => setSelectedGame(game)} // Exibe os detalhes do jogo selecionado
                style={{ caretColor: "transparent" }} // Remove o cursor piscante
                tabIndex={-1} // Remove a capacidade de foco
              >
                {game.jogos_nome}
              </li>
            ))}
          </ul>


      {/* Painel de detalhes */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {selectedGame.jogos_nome || "Jogo Selecionado"}
        </h2>

        <Image
          src={selectedGame.jogos_url_img || "/default-image.jpg"}
          alt={selectedGame.jogos_nome || "Imagem do Jogo"}
          width={300}
          height={300}
          className="rounded-lg shadow-lg  shadow-slate-500"
        />

        <p className="text-gray-600 text-justify mt-4">
          {selectedGame.jogos_descricao || "Descrição indisponível."}
        </p>

        <span className="mt-2 text-green-500 font-semibold uppercase text-sm">
          {selectedGame.categoria_jogos?.categoria_jogo_area_atuacao || "Sem Categoria"}
        </span>
        <div>
          <Link href="https://www.youtube.com/">
            <button className="bg-fuchsia-500 text-white rounded w-15 m-3 p-3">Acessar Jogo</button>
          </Link>

          {/* <a target="_blank" href="https://www.youtube.com/" className="bg-fuchsia-500 text-white rounded w-15 m-3 p-3 mt-3">
              Acessar Jogo
          </a> */}

          {/* <button
        onClick={handleGoBack}
        className="bg-blue-500 text-white rounded w-15 m-3 p-3"
      >
        Voltar
      </button> */}

        </div>

        {/* <Link href="https://www.youtube.com/">
        <a target="_blank" className="bg-fuchsia-500 text-white rounded w-15 m-3 p-3">
          Acessar Jogo
        </a>
      </Link> */}

      </div>
    </div>
      </div>

    </>
  );
}
