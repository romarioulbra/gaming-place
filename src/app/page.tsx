// import Navbar from "./components/navbar";
// import NavbarActive from "./components/NavbarActive";
import { SlGameController } from "react-icons/sl";
// import { GrGamepad } from "react-icons/gr";
import Footer from "./components/Rodape";

import Navbar from './components/MenuNavbar';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-purple-700 to-purple-300">
        <Navbar/>
        {/* <MenuHamburguer/> */}
        {/* <NavbarActive/> */}
          <header className="flex flex-col items-center justify-center h-screen space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">Seja Bem-vindo ao Gaming Place!</h1>
              <p className="text-lg text-gray-200">Explore os incríveis jogos desenvolvidos no CeulpUlbra</p>
            </div>
              <div className="ml-4 flex justify-end mt-8">
                <SlGameController className="w-40 h-40 text-white hover:scale-110 transition-transform duration-300" />
              </div>
          </header>
          <Footer></Footer>
    </div>
    </>
  );
}
