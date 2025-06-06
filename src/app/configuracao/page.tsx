'use client';

import { FaUser, FaGamepad, FaLayerGroup, FaMeteor,FaLightbulb } from "react-icons/fa";
import { GiFallingBlob} from "react-icons/gi";
import { useState,useEffect } from "react";
import Usuarios from "./usuarios/page";
import Jogos from "./jogos/page";
import CategoriaJogos from "./jogos_categoria/page";
import Emblemas from "./emblemas/page";
import LoadingOverlay from "../components/LoadingOverlay"; 
import axios from "axios";
import SugestoesMelhorias from "./sugestoes_melhoria/page";
import CategoriaEmblemas from "./emblemas_categoria/page";
import { TypewriterEffect } from "@/app/components/EscreverEfeito";


export default function ConfigPanel() {
  const [currentPage, setCurrentPage] = useState("dashboard"); // Estado para controlar a página exibida
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o loading
  
  // CONTADORES
  const [numeroUsuarios, setNumeroUsuarios] = useState(0);
  const [numeroJogos, setNumeroJogos] = useState(0);
  const [numCatJogos, setNumCatJogos] = useState(0);
  const [numEmblemas, setNumEmblemas] = useState(0);
  const [numCatEmblemas, setNumCatEmblemas] = useState(0);
  const [numSugestoes, setNumSugestoes] = useState(0);

  // Função para buscar o total de usuários
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


  // Função para buscar o total de jogos
  useEffect(() => {
    async function fetchTotalJogos() {
      try {
        const response = await axios.get('/api/jogos');
        setNumeroJogos(response.data.totalJogos);
      } catch (error) {
        console.error('Erro ao buscar jogos:', error);
      }
    }

    fetchTotalJogos();
  }, []);


  // Função para buscar o total de Categorias de Jogos
  useEffect(() => {
    async function fetchTotalCatJogos() {
      try {
        const response = await axios.get('/api/categoria_jogos');
        setNumCatJogos(response.data.totalCatJogos);
      } catch (error) {
        console.error('Erro ao buscar jogos:', error);
      }
    }

    fetchTotalCatJogos();
  }, []);


  // Função para buscar o total de Emblemas
  useEffect(() => {
    async function fetchTotalEmblemas() {
      try {
        const response = await axios.get('/api/emblemas');
        setNumEmblemas(response.data.totalEmblemas);
      } catch (error) {
        console.error('Erro ao buscar emblemas', error);
      }
    }
    fetchTotalEmblemas();
  }, []);


  // Função para buscar o total de Emblemas
  useEffect(() => {
    async function fetchTotalCatEmblemas() {
      try {
        const response = await axios.get('/api/categoria_emblemas');
        setNumCatEmblemas(response.data.totalCatEmblemas);
      } catch (error) {
        console.error('Erro ao buscar categorias de emblemas', error);
      }
    }
    fetchTotalCatEmblemas();
  }, []);

  // Função para buscar o total de Sugestões
  useEffect(() => {
    async function fetchTotalSugestoes() {
      try {
        const response = await axios.get('/api/sugestoes');
        // Correção: usar a propriedade correta que sua API retorna
        setNumSugestoes(response.data.totalSugMelhoria);
        
        // Para ver o valor atualizado, use um useEffect separado
        console.log('Dados recebidos:', response.data);
      } catch (error) {
        console.error('Erro ao buscar Sugestoes:', error);
      }
    }
    fetchTotalSugestoes();
  }, []);

  // Adicione este useEffect para monitorar as mudanças em numSugestoes
  useEffect(() => {
    console.log('Numero de Sugestões atualizado:', numSugestoes);
  }, [numSugestoes]);


  // Função para mudar a página com atraso
  const changePageWithDelay = (page) => {
    setIsLoading(true); // Ativa o loading
    setTimeout(() => {
      setCurrentPage(page); // Altera a página após o atraso
      setIsLoading(false); // Desativa o loading
    }, 1500); // Atraso de 1 segundo (ajustável)
  };


    const fullText = [
    "AAqui você pode gerenciar todas as informações do sistema, ",
    "incluir usuários, ",
    " jogos, ",
    "categorias de jogos, ",
    "categorias de emblemas e sugestões e melhorias.",
    " Use o menu lateral para navegar entre as seções."
  ].join(''); // Junta tudo em uma única string



  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Overlay de Carregamento */}
      <LoadingOverlay isLoading={isLoading} />

      {/* Dashboard */}
      {currentPage === "dashboard" && !isLoading && (
        <div className="flex-1 bg-slate-50">
          <div className="container mx-auto px-6 py-6">
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
                  {numeroJogos} {/* Substitua 'numeroJogos' pela variável que contém a quantidade */}
                </div>
              </div>


              {/* Card - Categorias */}
              <div
                className="bg-purple-600 text-white p-6 rounded-lg shadow-md flex items-center cursor-pointer hover:bg-purple-500 transition relative"
                onClick={() => changePageWithDelay("jogos_categoria")}
              >
                <FaLayerGroup className="w-10 h-10 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Categorias de Jogos</h3>
                  <p className="text-sm">Organize os jogos em categorias.</p>
                </div>
                
                {/* Círculo com a quantidade de categorias */}
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {numCatJogos} {/* Substitua 'numeroCategorias' pela variável que contém a quantidade */}
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
                  {numEmblemas} {/* Substitua 'numeroEmblemas' pela variável que contém a quantidade */}
                </div>
              </div>

              {/* Card - Categorias de Emblemas */}
              <div
                className="bg-cyan-600 text-white p-6 rounded-lg shadow-md flex items-center cursor-pointer hover:bg-cyan-500 transition relative"
                onClick={() => changePageWithDelay("emblemas_categoria")}
              >
                <GiFallingBlob className="w-16 h-16 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Categorias de Emblemas</h3>
                  <p className="text-sm">Classifique os emblemas por tipos ou finalidades.</p>
                </div>

                {/* Círculo com a quantidade de categorias de emblemas */}
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {numCatEmblemas}
                </div>
              </div>


              {/* Card - Sugestões e Melhorias */}
                <div
                  className="bg-green-600 text-white p-6 rounded-lg shadow-md flex items-center cursor-pointer hover:bg-green-500 transition relative"
                  onClick={() => changePageWithDelay("sugestoes")}
                >
                  <FaLightbulb className="w-10 h-10 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold">Sugestões e Melhorias</h3>
                    <p className="text-sm">Visualize e avalie ideias enviadas pelos usuários.</p>
                  </div>

                  {/* Círculo com a quantidade de sugestões */}
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {numSugestoes}
                  </div>
                </div>

            </div>

            {/* Visão Geral */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visão Geral</h3>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <TypewriterEffect 
                  text={fullText}
                  speed={30}
                  delay={500}
                  cursor={true}
                  blinkWhenComplete={true} // Ativa o efeito de piscar
                  blinkSpeed={600} // Velocidade do piscar (opcional)
                  className="font-semibold"
                />
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
              {currentPage === "jogos_categoria" && "Categorias de Jogos"}
              {currentPage === "emblemas" && "Emblemas"}
              {currentPage === "emblemas_categoria" && "Categorias de Emblemas"}
              {currentPage === "sugestoes" && "Sugestoes"}
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
            {/* {currentPage === "usuarios/cadastrar" && <CadastrarUsuario />} */}
            {currentPage === "jogos" && <Jogos />}
            {currentPage === "jogos_categoria" && <CategoriaJogos />}
            {currentPage === "emblemas" && <Emblemas />}
            {currentPage === "emblemas_categoria" && <CategoriaEmblemas/>}
            {currentPage === "sugestoes" && <SugestoesMelhorias />}

          </div>
        </div>
      )}
    </div>
  );
}
