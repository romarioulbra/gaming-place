// import Image from "next/image";
import { SlGameController } from "react-icons/sl";
import { GrGamepad } from "react-icons/gr";
import Navbar from '../components/MenuNavbar';
import Footer from "../components/Rodape";

export default function Conta() {
  return (
    <>
      <Navbar/>
        <div className="grid grid-cols-2 min-h-screen">
          <div className="bg-gradient-to-r from-blue-100 to-purple-500 flex items-center justify-center border-r-2 border-white">
              <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="flex text-black text-xl font-bold space-x-2 ">
                  <GrGamepad className='w-8 h-8 text-center'/>
                  <h1 className="text-5xl font-bold ml-6 "> Gaming Place</h1>
                </div>

                <div className="text-center mt-3">
                  <p className="text-sm text-black">Explore os incríveis jogos desenvolvidos no CeulpUlbra</p>
                </div>

                <div className="ml-4 flex justify-end mt-5">
                  <SlGameController className="w-60 h-60 text-pink-500" />
                </div>
              </div>
              {/* <Image src="/img/logoCienciasH.png" alt="logo" width={90} height={90} /> */}
            </div>

            <div className="bg-purple-500 flex items-center justify-center bg-purple-700 ">
              <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Criar uma Conta</h2>
                
                {/* Campo de E-mail */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-500"
                    placeholder="Digite seu email"
                  />
                </div>

                {/* Campo de Senha */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Senha
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-500"
                    placeholder="Digite sua senha"
                  />
                </div>

                {/* Botão de Login */}
                <button
                  type="submit"
                  className="w-full bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition duration-300"
                >
                 Cadastrar
                </button>
                <div className="mt-3 text-center text-sm">
                  <a href="">Já possui cadastro? </a>
                </div>
              </form>
              <div>
            </div>
          </div>
        </div>
        <Footer/>
    </>
  );
}
