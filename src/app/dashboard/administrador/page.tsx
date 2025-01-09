'use client'

import { FaUser, FaGamepad, FaLayerGroup,FaMeteor,FaTachometerAlt } from "react-icons/fa";
import Link from "next/link";
import Usuarios from "../../configuracao/usuarios/page";
import Jogos from "../../configuracao/jogos/page";
import CategoriaJogos from "../../configuracao/jogos_categoria/page";
import Emblemas from "../../configuracao/emblemas/page";
import { useState } from "react";
import ConfigPanel from "../../configuracao/page";


export default function AdminDashboard() {

  const [currentPage, setCurrentPage] = useState("dashboard"); // Estado para controlar a página exibida

  // Função para mudar a página
  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-indigo-800 text-white">
          <nav className="mt-10 space-y-4 px-4">
            <Link
              href="#configuracao"
              onClick={() => changePage("configuracao")}
              className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
            >
              <FaTachometerAlt className="mr-2" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="#usuarios"
              onClick={() => changePage("usuarios")}
              className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
            >
              <FaUser className="mr-2" />
              <span>Usuários</span>
            </Link>

            <Link
              href="#jogos"
              onClick={() => changePage("jogos")}
              className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
            >
              <FaGamepad className="mr-2" />
              <span>Jogos</span>
            </Link>

            <Link
              href="#jogos_categoria"
              onClick={() => changePage("jogos_categoria")}
              className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
            >
              <FaLayerGroup className="mr-2" />
              <span>Categorias</span>
            </Link>

            <Link
              href="#emblemas"
              onClick={() => changePage("emblemas")}
              className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
            >
              <FaMeteor className="mr-2" />
              <span>Emblemas</span>
            </Link>
          </nav>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 bg-white shadow-2xl">
          <div className="container mx-auto px-6 py-8">

            {/* Renderizando o conteúdo dinâmico de acordo com o estado */}
            <div className="mt-12">
              {currentPage === "dashboard" && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Visão Geral</h3>
                  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <p className="text-gray-700">
                      Aqui você pode gerenciar todas as informações do sistema, incluindo usuários,
                      jogos e categorias. Use o menu lateral para navegar entre as seções.
                    </p>
                  </div>
                </div>
              )}

              {currentPage === "configuracao" && <ConfigPanel />}
              {currentPage === "usuarios" && <Usuarios />}
              {currentPage === "jogos" && <Jogos />}
              {currentPage === "jogos_categoria" && <CategoriaJogos />}
              {currentPage === "emblemas" && <Emblemas />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
