'use client';

import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function TabelaDinamica({ initialUsers }) {

  const [usuarios, setUsers] = useState(initialUsers || []);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10; // Número de usuários por página

  // Atualizar os dados quando `initialUsers` mudar
  useEffect(() => {
    if (initialUsers && initialUsers.length) {
      setUsers(initialUsers);
    }
  }, [initialUsers]);

  // Renderizar apenas quando `usuarios` não estiver vazio
  if (usuarios.length === 0) {
    return <div>Carregando usuários...</div>;
  }

  const pageCount = Math.ceil(usuarios.length / usersPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const startIndex = pageNumber * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = usuarios.slice(startIndex, endIndex);

  return (
    <>
      <div className="container mx-auto mt-8">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Usuario</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Senha</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Nível</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((users) => (
              <tr key={users.usuario_id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{users.usuario_id}</td>
                <td className="border border-gray-300 px-4 py-2">{users.usuario_nome}</td>
                <td className="border border-gray-300 px-4 py-2">{users.usuario_email}</td>
                <td className="border border-gray-300 px-4 py-2">{users.usuario_senha}</td>
                <td className="border border-gray-300 px-4 py-2">{users.usuario_nivel}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Componente de Paginação */}
        <ReactPaginate
          previousLabel={"← Anterior"}
          nextLabel={"Próximo →"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"flex justify-center items-center mt-4"}
          pageClassName={"mx-1"}
          pageLinkClassName={"px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200"}
          previousClassName={"mx-1"}
          previousLinkClassName={"px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200"}
          nextClassName={"mx-1"}
          nextLinkClassName={"px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200"}
          activeClassName={"bg-gray-300 font-bold"}
        />
      </div>
    </>
  );
}
