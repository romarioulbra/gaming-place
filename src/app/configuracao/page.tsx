// 'use client'
// import CardsGrid from '../components/CardsPainel';

// export default function ConfigPanel() {
//   return (
//     <>
//       <div className="flex h-screen mt-9">
//           {/* Menu Lateral */}
//           {/* Painel Principal */}
//           <div className="flex-1 bg-gray-100 p-6  sm:ml-0">
//             <h1 className='text-center  font-bold text-2xl mt-10 mb-5 text-black'>Painel de Configuração</h1>
//             <CardsGrid 
//             />
//           </div>
//       </div>
//     </>
//   );
// }

import { FaUser, FaGamepad, FaLayerGroup,FaClone,FaMeteor,FaSpaceShuttle,FaTachometerAlt } from "react-icons/fa";
import Link from "next/link";


export default function ConfigPanel() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500">
      {/* Main Content */}
      <div className="flex flex-1">
      
        {/* Dashboard Content */}
        <main className="flex-1 bg-white shadow-2xl">
          <div className="container mx-auto px-6 py-8">
            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Bem-vindo ao Painel Administrativo
            </h2>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card - Usuários */}
              <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-md flex items-center">
                <FaUser className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Usuários</h3>
                  <p className="text-sm">Gerencie todos os usuários do sistema.</p>
                </div>
              </div>

              {/* Card - Jogos */}
              <div className="bg-pink-600 text-white p-6 rounded-lg shadow-md flex items-center">
                <FaGamepad className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Jogos</h3>
                  <p className="text-sm">Adicione, edite ou exclua jogos.</p>
                </div>
              </div>

              {/* Card - Categorias */}
              <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md flex items-center">
                <FaLayerGroup className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Categorias</h3>
                  <p className="text-sm">Organize os jogos em categorias.</p>
                </div>
              </div>

              {/* Card - Emblemas */}
              <div className="bg-yellow-600 text-white p-6 rounded-lg shadow-md flex items-center">
                <FaMeteor className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Emblemas</h3>
                  <p className="text-sm">Configure emblemas de Perfil dos Usuários.</p>
                </div>
              </div>
            </div>

            {/* Detalhes */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visão Geral</h3>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-gray-700">
                  Aqui você pode gerenciar todas as informações do sistema, incluindo usuários,
                  jogos e categorias. Use o menu lateral para navegar entre as seções.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
