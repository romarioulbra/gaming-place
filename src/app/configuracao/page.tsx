'use client'
import Sidebar from '../components/MenuLateral';
import CardsGrid from '../components/CardsPainel';
import Image from "next/image";
import Navbar from '../components/MenuNavbar';
import Footer from "../components/Rodape";

export default function ConfigPanel() {

  // const config ="Configurações Gerais";
  // const usuarios = "usuarios";
  // const catJogos = "Categoria de Jogos";
  // const jogos = "Jogos";


  return (
    <>
      <Navbar/>
      <div className="flex h-screen mt-9">
      {/* Menu Lateral */}
      <Sidebar />

      {/* Painel Principal */}
      <main className="flex-1 bg-gray-100 p-6 ml-64 sm:ml-0">
        <h1 className='text-center  font-bold text-2xl mt-5 mb-5 text-purple-700'>Painel de Configuração</h1>
        <CardsGrid 
        />
      </main>
    </div>
   
    {/* <div className="min-h-screen bg-gradient-to-tr from-purple-500 to-purple-300 flex h-screen mt-9">    
    </div>   */}

    <Footer/>
    </>
  );
}
