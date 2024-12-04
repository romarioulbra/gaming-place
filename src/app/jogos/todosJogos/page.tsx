// 'use client'
// import Image from "next/image";
// import ReactPaginate from 'react-paginate';
// import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
// import { useState } from "react";
// import Fly from "@/app/components/Flyout";

// export default function TodosJogos() {
//   const itemsPerPage = 12;
//   const [currentPage, setCurrentPage] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Dados simulados
//   const data = [
//     { jogos_nome: "Jogo 1", jogos_link: "/link1" },
//     { jogos_nome: "Jogo 2", jogos_link: "/link2" },
//     { jogos_nome: "Jogo 3", jogos_link: "/link3" },
//     { jogos_nome: "Jogo 4", jogos_link: "/link4" },
//     { jogos_nome: "Jogo 5", jogos_link: "/link5" },
//     { jogos_nome: "Jogo 6", jogos_link: "/link6" },
//     { jogos_nome: "Jogo 7", jogos_link: "/link7" },
//     { jogos_nome: "Jogo 8", jogos_link: "/link8" },
//     { jogos_nome: "Jogo 9", jogos_link: "/link9" },
//     { jogos_nome: "Jogo 10", jogos_link: "/link10" },
//     { jogos_nome: "Jogo 11", jogos_link: "/link10" },
//     { jogos_nome: "Jogo 12", jogos_link: "/link10" },
//     { jogos_nome: "Jogo 13", jogos_link: "/link10" },
//     { jogos_nome: "Jogo 14", jogos_link: "/link10" }
//   ];

//   // Filtragem de dados
//   const filteredData = data.filter(item =>
//     item.jogos_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.jogos_link.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const offset = currentPage * itemsPerPage;
//   const paginatedData = filteredData.slice(offset, offset + itemsPerPage);
//   const pageCount = Math.ceil(filteredData.length / itemsPerPage);

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   return (
//     <>
//       <div className="h-screen pt-4 bg-gray-200 -mb-28">

//         <header className="text-center py-8 bg-indigo-800 shadow-lg mt-12">
//           <h1 className="text-4xl font-extrabold text-white">Jogos Existentes</h1>
//             <p className="mt-2 text-lg font-light text-indigo-300">
//               Conheça os mais diversos jogos do Ulbra Palmas.
//             </p>
//         </header>

          
//         <div className="flex flex-col md:flex-row items-center bg-gray-500 text-white rounded-lg overflow-hidden shadow-lg shadow-stone-700 max-w-3xl mx-auto border-white border-4">
//       {/* Texto */}
//       <div className="p-6 flex-1">
//         <h2 className="text-3xl font-bold mb-4 text-indigo-800 text-center">VitalQuest</h2>
//         <p className="text-gray-200 mb-6 leading-relaxed text-justify">
//           VitalQuest é um jogo inovador centrado na saúde, projetado para promover hábitos saudáveis e conscientização.
//           Desenvolvido para diversas plataformas, o jogo utiliza tecnologia de realidade virtual e elementos de
//           gamificação para envolver os jogadores em desafios relacionados à saúde.
//         </p>
//         <button className="bg-pink-500 hover:bg-pink-600 transition-colors py-2 px-4 rounded font-semibold text-white w-full">
//           Conhecer jogo
//         </button>
//       </div>

//       {/* Imagem */}
//       {/* <div className="flex items-center justify-center w-full md:w-1/2 h-64 md:h-auto md:mb-10">
//         <div className="relative ">
//           <Image
//             src="/img/montanha.jpg" // Substitua pelo caminho da sua imagem
//             alt="VitalQuest Image"
//             layout="fill"
//             objectFit="contain"
//             className="rounded-lg"
//             // width={250}
//             // height={250}
//           />
//         </div>
//       </div> */}

//       {/* Imagem */}
//       <div className="flex items-center justify-center w-full md:w-1/2 h-64 md:h-auto md:mb-10">
        
//          <div className="relative  mt-3 mr-3   w-52 h-52 lg:w-full lg:h-full md:w-full md:h-full sm:w-52 sm:h-52 ">
//           <Image
//             src="/img/montanha.jpg" // Substitua pelo caminho da sua imagem
//             alt="VitalQuest Image"
//             // layout="fill" // A imagem vai preencher a div
//             objectFit="cover" // A imagem vai cobrir a área sem distorcer
//             className="rounded-lg"
//             width={250}
//             height={250}
//           />
//         </div>
//       </div>


//     </div>
        


//       </div>
//     </>
//   );
// }

'use client'

// import { useState } from "react";

// export default function ListaComImagem() {
//   // Define as imagens e os itens
//   const items = [
//     { id: 1, label: "Item 1", image: "/img/montanha.jpg" },
//     { id: 2, label: "Item 2", image: "/img/aranha.jpeg" },
//     { id: 3, label: "Item 3", image: "/img/montanha.jpg" },
//     { id: 4, label: "Item 4", image: "/img/montanha.png" },
//   ];

//   // Estado para controlar a imagem selecionada
//   const [selectedImage, setSelectedImage] = useState(items[0].image);

//   return (
//     <div style={styles.container}>
//       {/* Lista de itens */}
//       <ul style={styles.list}>
//         {items.map((item) => (
//           <li
//             key={item.id}
//             style={styles.listItem}
//             onClick={() => setSelectedImage(item.image)}
//           >
//             {item.label}
//           </li>
//         ))}
//       </ul>

//       {/* Área de imagem */}
//       <div style={styles.imageContainer}>
//         <img src={selectedImage} alt="Selecionada" style={styles.image} />
//       </div>
//     </div>
//   );
// }

// // Estilos inline para simplificar
// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "row",
//     height: "100vh",
//     backgroundColor: "#f4f4f4",
//   },
//   list: {
//     listStyleType: "none",
//     padding: "0",
//     margin: "0",
//     width: "20%",
//     backgroundColor: "#ddd",
//     display: "flex",
//     flexDirection: "column",
//     borderRight: "1px solid #ccc",
//   },
//   listItem: {
//     padding: "15px",
//     cursor: "pointer",
//     borderBottom: "1px solid #ccc",
//     textAlign: "center",
//   },
//   listItemHover: {
//     backgroundColor: "#bbb",
//   },
//   imageContainer: {
//     flex: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image: {
//     maxWidth: "90%",
//     maxHeight: "90%",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//   },
// };


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
