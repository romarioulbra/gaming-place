import Image from "next/image";
import Navbar from '../components/MenuNavbar';
import Footer from "../components/Rodape";

import CardJogo from '../components/CardJogo';
import PerfilUsuario from "../components/PerfilUsuario";

import ImagensCirculares from '../components/Imagens';

export default function Sobre() {
  return (
    <>
      <Navbar/>
        <div className="min-h-screen bg-gradient-to-tr from-purple-500 to-purple-300 p-8 mt-16">
            <h1 className="text-3xl font-bold ml-16  mb-6">Sobre</h1>
              <div className="flex items-center space-x-12 mb-20 mt-4">
                <CardJogo 
                    title="Minecraft" 
                    image="/img/sobre.png" 
                    buttonText="Jogar"
                />
                <div>
                    <h2 className="text-2xl font-bold mb-2 text-fuchsia-600">Gaming Place</h2>
                    <p className="text-white text-md">
                    A Gaming Place é uma plataforma gamificada que atua sendo um ambiente
                    unificado para os jogos desenvolvidos no ULBRA Palmas, os quais são 
                    segmentados por áreas como saúde,Social,Educação e Acessibilidade.
                    Esse espaço é importante pois concentra todos os jogos em um só lugar,
                      facilitando o acesso e a divulgação por parte dos desenvolvedores.
                    </p>
                </div>
            </div>
          
            <div className="flex items-center space-x-4 mt-10 mr-16">
              <div className="ml-16">
                <h2 className="text-2xl font-bold mb-2 text-white">Acompanhe seu progresso e ganhe recompensas</h2>
                <div>
                    <p className="text-white text-md">
                    No Gaming Place, você pode acompanhar seu progresso de forma fácil e divertida. 
                    Através dos emblemas conquistados, troféus e nível do usuário, você pode ver como 
                    está se saindo dentro da plataforma.
                    </p>
                    <div className="flex justify-left ml-4 gap-4 mt-5">
                      <ImagensCirculares caminho='/img/zoombi.png'/>
                      <ImagensCirculares caminho='/img/homem.png'/>
                      <ImagensCirculares caminho='/img/img3.png'/>
                      <ImagensCirculares caminho='/img/menina.png'/>
                    </div>
                </div>
              </div>
              <CardJogo title="" image="/img/recompensa.png"  buttonText="Jogar" />
            </div>           
          </div>
      <>
      {/* <div className=" min-h-screen container mx-auto px-4 bg-gradient-to-tr from-purple-500 to-purple-300 p-8 mt-7">
      
      <h1 className="text-4xl font-bold text-center mt-10 mb-6">Gaming Place</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <CardJogo title="Minecraft" image="/img/sobre.png" buttonText="Jogar" />
        
        <div className="ml-5">
          <h2 className="text-2xl font-bold">Gaming Place</h2>
          <p className="text-xs">
            O Gaminig Place é lalallalalalalalal O Gaminig Place é 
            lalallalalalalalalO Gaminig Place é lalallalalalalalalO 
            Gaminig Place é lalallalalalalalalO Gaminig Place é 
            lalallalalalalalalO Gaminig Place é lalallalalalalalalO 
            Gaminig Place é lalallalalalalalal</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mt-10">Acompanhe seu progresso</h2>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <PerfilUsuario name="Zaya" avatar="/zaya.jpg" progress="75" />
        <PerfilUsuario name="Robert" avatar="/robert.jpg" progress="90" />
      </div>
    </div> */}

{/* 
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-900">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-2 gap-8">
      <div className="card bg-white rounded-lg shadow-lg transform rotate-3 hover:scale-105 transition-transform duration-300 p-8">
        <h2 className="text-2xl font-bold">Card 1</h2>
        <p>Conteúdo do card 1.</p>
      </div>
      <div className="card bg-white rounded-lg shadow-lg transform -rotate-3 hover:scale-105 transition-transform duration-300 p-8">
        <h2 className="text-2xl font-bold">Card 2</h2>
        <p>Conteúdo do card 2.</p>
      </div>
    </div>
  </div>
</div> */}

      </>
      <Footer/>
    </>
  );
}
