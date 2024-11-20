'use client'
import React from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate'; 

import { GrCaretPrevious,GrCaretNext  } from "react-icons/gr";
import { FaPencilAlt,FaTrashAlt,FaTrash  } from "react-icons/fa";
import { ModalFormulario } from './ModalFormulario';
import AlterarJogosCategoria from '../configuracao/jogos_categoria/alterar/page';
interface TableProps {
  data: { categoria_jogo_id: number; categoria_jogo_area_atuacao: string;}[];
}


export default function TabelaPadrao({ data,atributosCabTab,atributosDados}: TableProps) {

    
    const nomeModulo= 'Jogos';
    const [isLoading, setIsLoading] = useState(false);
    const [modalText, setModalText] = useState("Tem certeza que deseja excluir o Registro abaixo?");
    const [tabelaDados,setTabelaDados] = useState(data);
    const [modalAberto,setModalAberto] = useState(false);
    const [modalType, setModalType] = useState<'editar' | 'excluir' | null>(null);
    
    // ============== Métodos de Modais Inicio===================//
 
  // ********  ******** Modal Abrir Editar ********  ******** 

    const [selectedItem,setSelectedItem] = useState<TableProps>();
    
    function handleEditModal(item: TableProps){
      setSelectedItem(item);    
      setModalType('editar');
      setModalAberto(!modalAberto)
    }

  // ********  ******** ============== ******** ********

  // ********  ******** Modal Abrir Excluir ********  ******** 
  function handleDeletarModal(item: TableProps){
    setSelectedItem(item);
    setModalType('excluir');
    setModalAberto(!modalAberto)
  }
  // ********  ******** ============== ******** ********

  // ********  ******** Modal Fechar ********  ******** 
  function fecharModal() {
    setModalAberto(false);
    setModalType(null);
    setSelectedItem(null);
  }

  const id = selectedItem?.categoria_jogo_id || null;
  const nome = selectedItem?.categoria_jogo_area_atuacao || null;

  // ============== Métodos de Modais Final ===================//

    
    // ================= PAGINAÇÃO DAS TABELAS ================= //
    
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
  
    // Filtra os dados com base no termo de pesquisa
    const filteredData = data.filter(
      item =>
        // item.categoria_jogo_id.includes(searchTerm.toLowerCase()) ||
        item.categoria_jogo_area_atuacao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Calcular os dados para a página atual
    const offset = currentPage * itemsPerPage;
    const paginatedData = filteredData.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  
    // Muda a página atual
    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };
  
    // ================= PAGINAÇÃO DAS TABELAS ================= //
    
  return (
    <div className="flex-auto ml-4 mr-4 mt-4 mb-4"> 
      <div className="overflow-x-auto mx-auto mt-8 mb-8 p-8 border border-gray-300 shadow-lg rounded-lg justify-between items-center">
        <div  className="flex flex-col items-end p-4">
            <input
                type="text"
                placeholder="Pesquisar..."
                className="mb-4 px-4 py-2 border border-gray-600 rounded "
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(0); // Reseta para a primeira página em cada nova pesquisa
                }}
              /> 
          
            <table className="min-w-full bg-white text-black rounded-lg table-auto border-collapse border border-black">
              <thead>
              
                {/* <tr className="bg-purple-900 text-gray-300 "> */}
                <tr className="bg-neutral-900 text-gray-300 ">
                  {atributosCabTab.map((atributo, index) => (
                    <th
                      key={index}
                      className="py-3 px-6 text-left border border-white"
                    >
                      {atributo}
                    </th>
                  ))}
                  <th className="py-3 px-6 text-left ">Ação</th>
                </tr>
              </thead>
              <tbody className='border border-black'>
                {paginatedData.map((item,index) => (
                  <tr
                    key={index}
                    className="border-b border-black hover:bg-gray-200 hover:border  hover:border-fuchsia-300 transition-colors"
                  > 
                 
                  {atributosDados.map((atributoArray, idx) => (
                    <td key={idx} className="py-3 px-6 border border-black">
                      {item[atributoArray]}
                    </td>
                  ))}
                    <td className="py-4 px-6  flex space-x-4"> 
                      
                      {/* Botão Editar */}
                      <button 
                          onClick={() => handleEditModal(item)}
                          className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors border border-white shadow-md shadow-yellow-500/50">
                          <FaPencilAlt className="w-5 h-5 mr-2" />
                      </button>

                      {/* Botão Excluir */}
                      <button 
                          className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors border border-white shadow-md shadow-red-500/50"
                          onClick={() => handleDeletarModal(item)}
                      >  
                        <FaTrashAlt className="w-5 h-5 mr-2" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            
          {/* Modal Editar*/}
          <ModalFormulario 
            modalAberto={modalAberto} 
            fecharModal={handleEditModal} 
            titulo={modalType === 'editar' ? 'Modo de Alteração' : 'Modo de Exclusão'} 
            subtitulo={modalType === 'editar' ? `Edição de dados de ${nomeModulo}` : `Exclusão de Item`}
            modalType = 'editar'
          >
         

            {modalType === 'editar' ? (
              <div>
                <AlterarJogosCategoria
                  dados = {selectedItem}
                >              
                </AlterarJogosCategoria>
                
              </div>
            ) : (
              <>
                {/* Conteúdo do Modal para Exclusão */}
                  <div className="flex justify-center">
                    <FaTrash className="flex w-10 h-10 mb-3 mt-3 transition-transform duration-300 hover:scale-125"/>
                  </div>
                
                  <div className="flex flex-col text-center space-y-2">
                    <p className="text-red-800 font-semibold">Este processo é irreversível!</p>
                    <p className="text-blue-800 font-semibold">{modalText}</p>
                    {/* <p className='bg-yellow-100 p-3 text-2xl'>{`${selectedItem?.jogos_id} - ${selectedItem?.jogos_nome}`}</p> */}
                    <p className='bg-yellow-100 p-3 text-2xl'>{id} - {nome}</p>
                  </div>

                
                {/* Botões de Confirmar Exclusão e Cancelar */}
                <div className="flex flex-col mt-6 py-4 rounded-b-lg space-x-4">
                  <button
                    type="button"
                    onClick={async () => {
                      if (!id) {
                        console.error("Erro: Selected Item está vazio!");
                        return;
                      }
                  
                      setModalText("Excluindo registro, por favor aguarde...");
                      setIsLoading(true);
                  
                      try {
                        const endpoint = `/api/categoria_jogos?categoria_jogo_id=${id}`;
                        const response = await fetch(endpoint, {
                          method: "DELETE",
                        });
                  
                        if (!response.ok) {
                          throw new Error(`Erro ao excluir o registro: ${response.status}`);
                        }
                  
                        const data = await response.json();
                        console.log("Resposta da API:", data);
                  
                        setModalText("Registro excluído com sucesso!");
                        
                        // Aguarde 2 segundos antes de fechar o modal
                        setTimeout(() => {
                          fecharModal();
                          location.reload();
                        }, 2000);

                      } catch (error) {
                        console.error("Erro ao excluir o item:", error.message);
                        setModalText("Erro ao excluir o registro. Tente novamente.");
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                    className={`px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md ${
                      isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
                    } transition`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Excluindo..." : "Excluir"}
                  </button>
                </div>
              </>  
              )}
            </ModalFormulario>

        {/* Componente de Paginação */}
        <ReactPaginate
          previousLabel={<GrCaretPrevious size={20} />}
          nextLabel={<GrCaretNext size={20}/>}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"flex mt-4 space-x-2"}
          pageClassName={"px-4 py-2 bg-indigo-600 rounded text-white cursor-pointer hover:bg-indigo-700"}
          activeClassName={"bg-indigo-800"}
          previousClassName={"px-4 py-2 bg-indigo-600 rounded text-white cursor-pointer hover:bg-indigo-700"}
          nextClassName={"px-4 py-2 bg-indigo-600 rounded text-white cursor-pointer hover:bg-indigo-700"}
          breakClassName={"px-4 py-2 text-gray-400"}
          disabledClassName={"bg-gray-600 cursor-not-allowed"}
        />
        </div>
      </div>
    </div>
  );
}
