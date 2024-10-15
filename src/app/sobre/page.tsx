import Image from "next/image";
import Navbar from '../components/MenuNavbar';
import Footer from "../components/Rodape";

export default function Sobre() {
  return (
    <>
      <Navbar/>
        <div className="min-h-screen bg-gradient-to-tr from-purple-500 to-purple-300 p-8">
        <h1 className="text-3xl font-bold ml-6  mb-6">Sobre</h1>
          {/* Seção 1 */}
          <div className="flex items-center space-x-12 mb-20 mt-4">
            <Image src="/img/logoCienciasH.png" alt="logo" width={500} height={500} />
            <div>
                <h2 className="text-2xl font-bold mb-2 text-purple-500">Gaming Place</h2>
                <p className="text-purple-700">
                  Este é o texto ao lado da imagem 1. Aqui você pode adicionar informações ou uma descrição detalhada relacionada à imagem.
                </p>
            </div>
        </div>

        {/* Seção 2 */}
        <div className="flex items-center space-x-4 mt-10">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white">Título 2</h2>
            <p className="text-white">
              Este é o texto ao lado da imagem 2. Mais informações ou uma descrição detalhada sobre esta imagem.
            </p>
          </div>
            <Image src="/img/logoCienciasH.png" alt="logo" width={500} height={500} />
        </div>
      </div>
      <Footer/>
    </>
  );
}
