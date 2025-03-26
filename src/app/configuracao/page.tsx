'use client';

import { FaUser, FaGamepad, FaLayerGroup, FaMeteor } from "react-icons/fa";
import { useState,useEffect } from "react";
import Usuarios from "./usuarios/page";
import Jogos from "./jogos/page";
import CategoriaJogos from "./jogos_categoria/page";
import Emblemas from "./emblemas/page";
import LoadingOverlay from "../components/LoadingOverlay"; // Importe o componente aqui
import axios from "axios";
import { getTotalUsuarios } from "../utils/userUtils";

export default function ConfigPanel() {
  const [currentPage, setCurrentPage] = useState("dashboard"); // Estado para controlar a página exibida
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o loading
  // const numeroUsuarios = 12;
  const [numeroUsuarios, setNumeroUsuarios] = useState(0);



    // Função para buscar o total de usuários
  // useEffect(() => {
  //   async function fetchTotalUsuarios() {
  //     try {
  //       const response = await axios.get('/api/usuarios');
  //       setNumeroUsuarios(response.data.totalUsuarios);
  //     } catch (error) {
  //       console.error('Erro ao buscar usuários:', error);
  //     }
  //   }
  //   fetchTotalUsuarios();
  // }, []);
  useEffect(() => {
    async function fetchTotalUsuarios() {
      try {
        const response = await axios.get('/api/usuarios');
        setNumeroUsuarios(response.data.totalUsuarios);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    }

    fetchTotalUsuarios();
  }, []);
  
  console.log(numeroUsuarios)


  // Função para mudar a página com atraso
  const changePageWithDelay = (page) => {
    setIsLoading(true); // Ativa o loading
    setTimeout(() => {
      setCurrentPage(page); // Altera a página após o atraso
      setIsLoading(false); // Desativa o loading
    }, 1500); // Atraso de 1 segundo (ajustável)
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Overlay de Carregamento */}
      <LoadingOverlay isLoading={isLoading} />

      {/* Dashboard */}
      {currentPage === "dashboard" && !isLoading && (
        <div className="flex-1 bg-slate-50">
          <div className="container mx-auto px-6 py-8">
            {/* Título */}
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Bem-vindo ao Painel Administrativo
            </h2>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-md flex items-center cursor-pointer hover:bg-indigo-500 transition relative"
                onClick={() => changePageWithDelay("usuarios")}
              >
                <FaUser className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Usuários</h3>
                  <p className="text-sm">Gerencie todos os usuários do sistema.</p>
                </div>
                
                {/* Círculo com a quantidade de usuários */}
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {numeroUsuarios} 
                </div>
            </div>

              {/* Card - Jogos */}
              <div
                className="bg-pink-600 text-white p-6 rounded-lg shadow-md flex items-center cursor-pointer hover:bg-pink-500 transition relative"
                onClick={() => changePageWithDelay("jogos")}
              >
                <FaGamepad className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Jogos</h3>
                  <p className="text-sm">Adicione, edite ou exclua jogos.</p>
                </div>
                
                {/* Círculo com a quantidade de jogos */}
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {numeroUsuarios} {/* Substitua 'numeroJogos' pela variável que contém a quantidade */}
                </div>
              </div>


              {/* Card - Categorias */}
              <div
                className="bg-purple-600 text-white p-6 rounded-lg shadow-md flex items-center cursor-pointer hover:bg-purple-500 transition relative"
                onClick={() => changePageWithDelay("jogos_categoria")}
              >
                <FaLayerGroup className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Categorias</h3>
                  <p className="text-sm">Organize os jogos em categorias.</p>
                </div>
                
                {/* Círculo com a quantidade de categorias */}
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {numeroUsuarios} {/* Substitua 'numeroCategorias' pela variável que contém a quantidade */}
                </div>
              </div>

              {/* Card - Emblemas */}
              <div
                className="bg-yellow-600 text-white p-6 rounded-lg shadow-md flex items-center cursor-pointer hover:bg-yellow-500 transition relative"
                onClick={() => changePageWithDelay("emblemas")}
              >
                <FaMeteor className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Emblemas</h3>
                  <p className="text-sm">Configure emblemas de Perfil dos Usuários.</p>
                </div>
                
                {/* Círculo com a quantidade de emblemas */}
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {numeroUsuarios} {/* Substitua 'numeroEmblemas' pela variável que contém a quantidade */}
                </div>
              </div>

            </div>

            {/* Visão Geral */}
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
        </div>
      )}

      {/* Página de Detalhes */}
      {currentPage !== "dashboard" && !isLoading && (
        <div className="flex-1 bg-gray-50">
          {/* Header com Botão de Voltar */}
          <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
            <h2 className="text-3xl font-bold text-gray-800">
              {currentPage === "usuarios" && "Usuários"}
              {currentPage === "jogos" && "Jogos"}
              {currentPage === "jogos_categoria" && "Categorias"}
              {currentPage === "emblemas" && "Emblemas"}
            </h2>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              onClick={() => changePageWithDelay("dashboard")}
            >
              Voltar
            </button>
          </div>

          {/* Conteúdo da Página */}
          <div className="p-6">
            {currentPage === "usuarios" && <Usuarios />}
            {currentPage === "jogos" && <Jogos />}
            {currentPage === "jogos_categoria" && <CategoriaJogos />}
            {currentPage === "emblemas" && <Emblemas />}
          </div>
        </div>
      )}
    </div>
  );
}
