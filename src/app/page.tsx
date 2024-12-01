import Link from "next/link";
import { SlGameController } from "react-icons/sl";
export default function Home() {
  return (
    <>
      {/* <div className="min-h-screen bg-gradient-to-r from-purple-700 to-purple-300"> */}
      <div className="min-h-screen bg-gradient-to-tr from-purple-100">
        <header className="flex flex-col items-center justify-center h-screen space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black">Seja Bem-vindo ao Gaming Place!</h1>
            <p className="text-lg mt-2 text-gray-600">Explore os incríveis jogos desenvolvidos na <strong className="font-bold">ULBRA Palmas</strong></p>
          </div>
            <div className="ml-4 flex justify-end mt-8">
              <SlGameController className="w-40 h-40 text-fuchsia-500 hover:scale-110 transition-transform duration-300" />
            </div>
            <Link href='/conta'>
              <button 
                className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-4 rounded shadow-lg shadow-violet-600 border-2 border-white transition duration-300 ease-in-out w-60">
                Começar Agora
              </button>
            </Link>
        </header>
      </div>
    </>
  );
}
