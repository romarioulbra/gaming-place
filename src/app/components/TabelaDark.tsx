'use client'
import React from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate'; 

import { FaPencilAlt,FaTrashAlt  } from "react-icons/fa";
import Modal from '../components/Modal';
import { GrCaretPrevious,GrCaretNext  } from "react-icons/gr";

interface TableProps {
  data: { id: number; usuario_nome: string; usuario_email: string; usuario_senha: string;usuario_nivel: string }[];
}


export default function TabelaDark({ data }: TableProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
      title: "",
      content: "",
      onConfirm: null,
    });

    // Função para abrir o modal para edição
    const handleEditClick = (item) => {
      setModalContent({
        title: "Editar Item",
        content: `Deseja editar os dados de ${item.nome}?`,
        onConfirm: () => handleEditConfirm(item),
      });
      setIsModalOpen(true);
    };

    // Função para confirmar a edição (aqui você pode adicionar a lógica de edição)
    const handleEditConfirm = (item) => {
      console.log("Editando item:", item);
      setIsModalOpen(false);
    };

    // Função para abrir o modal para exclusão
    const handleDeleteClick = (item) => {
      setModalContent({
        title: "Excluir Item",
        content: `Tem certeza que deseja excluir ${item.nome}?`,
        onConfirm: () => handleDeleteConfirm(item),
      });
      setIsModalOpen(true);
    };

    // Função para confirmar a exclusão (aqui você pode adicionar a lógica de exclusão)
    const handleDeleteConfirm = (item) => {
      console.log("Excluindo item:", item);
      setIsModalOpen(false);
    };
 
    
    // ================= PAGINAÇÃO DAS TABELAS ================= //
    
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
  
    // Filtra os dados com base no termo de pesquisa
    const filteredData = data.filter(
      item =>
        item.usuario_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.usuario_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.usuario_nivel.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="overflow-x-auto p-8 border border-gray-300 shadow-lg rounded-lg">
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
                <th className="py-3 px-6 text-left border border-gray-700">Nome</th>
                <th className="py-3 px-6 text-left border border-gray-700">Email</th>
                <th className="py-3 px-6 text-left border border-gray-700">Senha</th>
                <th className="py-3 px-6 text-left border border-gray-700">Nível</th>
                <th className="py-3 px-6 text-left border border-gray-700">Ação</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-6 border border-gray-700">{item.id}</td>
                  <td className="py-3 px-6 border border-gray-700">{item.usuario_nome}</td>
                  <td className="py-3 px-6 border border-gray-700">{item.usuario_email}</td>
                  <td className="py-3 px-6 border border-gray-700">{item.usuario_senha}</td>
                  <td className="py-3 px-6 border border-gray-700">{item.usuario_nivel}</td>
                  <td className="py-4 px-6 border border-gray-700 flex space-x-4"> 
                    {/* Botão Editar */}
                    <button 
                        
                        onClick={() => handleEditClick(item)}
                        className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors border border-white shadow-md shadow-yellow-500/50">
                        <FaPencilAlt className="w-5 h-5 mr-2" />
                    </button>
                    {/* Botão Excluir */}
                    <button 
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors border border-white shadow-md shadow-red-500/50"
                        onClick={() => handleDeleteClick(item)}
                    >
                          
                      <FaTrashAlt className="w-5 h-5 mr-2" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        title={modalContent.title}
        content={modalContent.content}
        onClose={() => setIsModalOpen(false)}
        onConfirm={modalContent.onConfirm}
      />

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
