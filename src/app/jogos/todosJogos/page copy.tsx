// 'use client'
// import Image from "next/image";
//   export default function TodosJogos() { 


    // useEffect(() => {
    //   async function fetchCatJogos() {
    //     try {
    //       const response = await axios.get('/api/categoria_jogos');
    //       setcatJogos(response.data);
    //       // console.log(catJogos); 
    //     } catch (error) {
    //       console.error('Erro ao buscar Categoria de Jogos:', error);
    //     }
    //   }
    //   fetchCatJogos();
    // }, []);

    
    
//   return (
//     <>
//       <div className="h-screen pt-4 bg-gray-200 -mb-28">
//         <h3 className="text-center text-2xl font-semibold text-black mb-6 mt-20">
//           Jogos Existentes
//         </h3>

//           <div className="flex flex-col items-center mt-5">
//             {/* Div Scrollable ajustada */}
//             <div
//               id="scrollableDiv"
//               className="bg-gray-100 border-2 border-white rounded-2xl w-full max-w-6xl h-[70vh] overflow-y-auto scrollbar-custom p-4"
//             >
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {Array.from({ length: 50 }, (_, i) => (
//                   <div
//                     key={i}
//                     className="relative w-full h-40 overflow-hidden group rounded-lg shadow-md shadow-stone-700 border-2 border-white"
//                   >
//                     <Image
//                       src={`/img/fant.jpg`} // Substitua por caminhos reais, se necessário
//                       alt={`Card ${i + 1}`}
//                       layout="fill"
//                       objectFit="cover"
//                       className="w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-110 group-hover:rotate-2 group-hover:brightness-75"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-500 flex items-center justify-center">
//                       <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                         Card {i + 1}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//       </div> 
//     </>
//   );
// }
'use client'
import Image from "next/image";
import ReactPaginate from 'react-paginate';
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import { useState } from "react";
import Fly from "@/app/components/Flyout";

export default function TodosJogos() {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Dados simulados
  const data = [
    { jogos_nome: "Jogo 1", jogos_link: "/link1" },
    { jogos_nome: "Jogo 2", jogos_link: "/link2" },
    { jogos_nome: "Jogo 3", jogos_link: "/link3" },
    { jogos_nome: "Jogo 4", jogos_link: "/link4" },
    { jogos_nome: "Jogo 5", jogos_link: "/link5" },
    { jogos_nome: "Jogo 6", jogos_link: "/link6" },
    { jogos_nome: "Jogo 7", jogos_link: "/link7" },
    { jogos_nome: "Jogo 8", jogos_link: "/link8" },
    { jogos_nome: "Jogo 9", jogos_link: "/link9" },
    { jogos_nome: "Jogo 10", jogos_link: "/link10" },
    { jogos_nome: "Jogo 11", jogos_link: "/link10" },
    { jogos_nome: "Jogo 12", jogos_link: "/link10" },
    { jogos_nome: "Jogo 13", jogos_link: "/link10" },
    { jogos_nome: "Jogo 14", jogos_link: "/link10" }
  ];

  // Filtragem de dados
  const filteredData = data.filter(item =>
    item.jogos_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jogos_link.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const paginatedData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className="h-screen pt-4 bg-gray-200 -mb-28">

        <header className="text-center py-8 bg-indigo-800 shadow-lg mt-12">
          <h1 className="text-4xl font-extrabold text-white">Jogos Existentes</h1>
            <p className="mt-2 text-lg font-light text-indigo-300">
              Conheça os mais diversos jogos do Ulbra Palmas.
            </p>
        </header>

        {/* parametros icone,cor,item/menu,link */}
        <div className="">
            <Fly/>
        </div>

        <div className="flex flex-col items-center p-4 mt-2">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="mb-4 px-4 py-2 border border-gray-600 rounded"
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
          />

          <div className="flex flex-col items-center mt-5 w-full">
            {/* Ajuste da Div de Scroll */}
            <div
              id="scrollableDiv"
              className="bg-gray-100 border-2 border-white rounded-2xl w-full max-w-6xl h-[53vh] p-4 overflow-auto mb-2"
            >
              {/* Aqui é onde seus cards seriam listados */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                {paginatedData.map((item, index) => (
                  <div
                    key={index}
                    className="relative w-full h-40 overflow-hidden group rounded-lg shadow-md shadow-stone-700 border-2 border-white"
                  >
                    <Image
                      src={`/img/fant.jpg`} // Substitua com o caminho correto da imagem
                      alt={item.jogos_nome}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-110 group-hover:rotate-2 group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-500 flex items-center justify-center">
                      <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {item.jogos_nome}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Componente de Paginação */}
          <ReactPaginate
            previousLabel={<GrCaretPrevious size={20} />}
            nextLabel={<GrCaretNext size={20} />}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"flex mt-4 space-x-2 justify-center"}
            pageClassName={"px-4 py-2 bg-indigo-600 rounded text-white cursor-pointer hover:bg-indigo-700"}
            activeClassName={"bg-indigo-800"}
            previousClassName={"px-4 py-2 bg-indigo-600 rounded text-white cursor-pointer hover:bg-indigo-700"}
            nextClassName={"px-4 py-2 bg-indigo-600 rounded text-white cursor-pointer hover:bg-indigo-700"}
            breakClassName={"px-4 py-2 text-gray-400"}
            disabledClassName={"bg-gray-600 cursor-not-allowed"}
          />
        </div>
      </div>
    </>
  );
}

