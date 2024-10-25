import Image from "next/image";
import Navbar from '../components/MenuNavbar';
import Footer from "../components/Rodape";

import CardJogo from '../components/CardJogo';
import PerfilUsuario from "../components/PerfilUsuario";

export default function Sobre() {
  return (
    <>
      <Navbar/>
        {/* <div className="min-h-screen bg-gradient-to-tr from-purple-500 to-purple-300 p-8">
        <h1 className="text-3xl font-bold ml-6  mb-6">Sobre</h1>
          <div className="flex items-center space-x-12 mb-20 mt-4">
            <Image src="/img/logoCienciasH.png" alt="logo" width={500} height={500} />
            <div>
                <h2 className="text-2xl font-bold mb-2 text-purple-500">Gaming Place</h2>
                <p className="text-purple-700">
                  Este é o texto ao lado da imagem 1. Aqui você pode adicionar informações ou uma descrição detalhada relacionada à imagem.
                </p>
            </div>
        </div>
        <div className="flex items-center space-x-4 mt-10">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white">Título 2</h2>
            <p className="text-white">
              Este é o texto ao lado da imagem 2. Mais informações ou uma descrição detalhada sobre esta imagem.
            </p>
          </div>
            <Image src="/img/logoCienciasH.png" alt="logo" width={500} height={500} />
        </div>
      </div> */}
      <>
      <div className=" min-h-screen container mx-auto px-4 bg-gradient-to-tr from-purple-500 to-purple-300 p-8">
      <h1 className="text-4xl font-bold text-center mt-10 mb-4">Gaming Place</h1>
      <div className="grid grid-cols-2 gap-4">
        <CardJogo title="Minecraft" image="/img/logoCienciasH.png" buttonText="Jogar" />
        <CardJogo title="Roblox" image="/roblox.jpg" buttonText="Explorar" />
      </div>
      <h2 className="text-3xl font-bold text-center mt-10">Acompanhe seu progresso</h2>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <PerfilUsuario name="Zaya" avatar="/zaya.jpg" progress="75" />
        <PerfilUsuario name="Robert" avatar="/robert.jpg" progress="90" />
      </div>
    </div>


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
</div>

      </>
      <Footer/>
    </>
  );
}
