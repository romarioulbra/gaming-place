'use client'
import React from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate'; 

import { GrCaretPrevious,GrCaretNext  } from "react-icons/gr";
import { FaPencilAlt,FaTrashAlt,FaTrash  } from "react-icons/fa";
import { ModalFormulario } from './ModalFormulario';
import AlterarUsuarios from '../configuracao/usuarios/alterar/AlterarUsuario';

interface TableProps {
  data: { categoria_jogo_id: number; categoria_jogo_area_atuacao: string; }[];
}


export default function TabelaCatJogos({ data }: TableProps) {

    
    const nomeModulo= 'Categoria de Jogos';
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

  // ============== Métodos de Modais Final ===================//


    
    // ================= PAGINAÇÃO DAS TABELAS ================= //
    
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
  
    // Filtra os dados com base no termo de pesquisa
    const filteredData = data.filter(
      item =>    
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
          
            <table className="min-w-full bg-gray-800 text-white rounded-lg table-auto border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-900 text-gray-300">
                  <th className="py-3 px-6 text-left border border-gray-700">ID</th>
                  <th className="py-3 px-6 text-left border border-gray-700">Área de Atuação</th>
                  <th className="py-3 px-6 text-left border border-gray-700">Ação</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item,index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-3 px-6 border border-gray-700">{item.categoria_jogo_id}</td>
                    <td className="py-3 px-6 border border-gray-700">{item.categoria_jogo_area_atuacao}</td>
                    <td className="py-4 px-6 border border-gray-700 flex space-x-4"> 
                      
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
                {/* Formulário de edição */}
                <AlterarUsuarios
                  dados = {selectedItem}
                >              
                </AlterarUsuarios>
                  {/* Botão Alterar centralizado */}
                <div className="flex justify-center mt-6 bg-gray-100 py-4 rounded-b-lg space-x-4">
                  <button
                    type="button"
                    className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
                  >
                    Alterar
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Conteúdo do Modal para Exclusão */}
                  <div className="flex justify-center">
                    <FaTrash className="flex w-10 h-10 mb-3 mt-3" />
                  </div>
                
                  <div className="flex flex-col text-center space-y-2">
                    <p className="text-red-800 font-semibold">Este processo é irreversível!</p>
                    <p>Tem certeza que deseja excluir o registro:</p>
                    <p className=''>{`${selectedItem?.categoria_jogo_id} - ${selectedItem?.categoria_jogo_area_atuacao}?`}</p>
                  </div>

                {/* Botões de Confirmar Exclusão e Cancelar */}
                <div className="flex justify-center mt-6 bg-gray-100 py-4 rounded-b-lg space-x-4">
                  
                  <button
                    type="button"
                    onClick={fecharModal}
                    className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      console.log("Item excluído com sucesso!");
                      fecharModal();
                    }}
                    className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
                  >
                    Excluir
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
