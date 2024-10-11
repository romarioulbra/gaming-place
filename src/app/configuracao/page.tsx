import Image from "next/image";
import NavbarActive from "../components/NavbarActive";
import Footer from "../components/Rodape";

export default function Configuracao() {
  return (
    <>
      <NavbarActive/>
        <div className="min-h-screen bg-gradient-to-tr from-purple-500 to-purple-300 p-8">
          <h1 className="text-3xl font-bold ml-6  mb-6 text-center text-purple-700">Painel de Configuração</h1>
        </div>  
      <Footer/>
    </>
  );
}
