import Navbar from "./components/navbar";
// import NavbarActive from "./components/NavbarActive";
import { SlGameController } from "react-icons/sl";
// import { GrGamepad } from "react-icons/gr";
import Footer from "./components/Rodape";
export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-purple-700  to-fuchsia-500/75">
        <Navbar/>
        {/* <NavbarActive/> */}
          <header className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-3xl font-bold ml-6 ">Seja Bem-vindo ao Gaming Place!</h1>
              <p className="text-lg text-black">Explore os incríveis jogos desenvolvidos no CeulpUlbra</p>
            </div>
              <div className="ml-4 flex justify-end mt-5">
                <SlGameController className="w-60 h-60 text-white" />
              </div>
          </header>
          <Footer></Footer>
    </div>
    </>
  );
}
