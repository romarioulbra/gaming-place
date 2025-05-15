'use client'

import { useState } from "react";
import Usuarios from "../../configuracao/usuarios/page";
import Jogos from "../../configuracao/jogos/page";
import CategoriaJogos from "../../configuracao/jogos_categoria/page";
import Emblemas from "../../configuracao/emblemas/page";
import SugestoesMelhorias from "@/app/configuracao/sugestoes_melhoria/page";
import ConfigPanel from "../../configuracao/page";
import NavBarDashAdmin from "@/app/components/NavBarDashAdmin";
import CategoriaEmblemas from "@/app/configuracao/emblemas_categoria/page";


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
          <NavBarDashAdmin changePage={changePage}/>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 bg-white shadow-2xl">
          <div className="container mx-auto px-6 py-8">

            {/* Renderizando o conteúdo dinâmico de acordo com o estado */}
            <div className="mt-12">
              {currentPage === "dashboard" && (
                <div>
                  <ConfigPanel />
                </div>
              )}

              {currentPage === "configuracao" && <ConfigPanel />}
              {currentPage === "usuarios" && <Usuarios />}
              {currentPage === "jogos" && <Jogos />}
              {currentPage === "jogos_categoria" && <CategoriaJogos />}
              {currentPage === "emblemas" && <Emblemas />}
              {currentPage === "emblemas_categoria" && <CategoriaEmblemas />}
              {currentPage === "sugestoes" && <SugestoesMelhorias />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
