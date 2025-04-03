import Link from "next/link";
import { SlGameController } from "react-icons/sl";
import Snowfall from "./components/Snowfall";

export default function Home() {
  return (
    <>
     <div className="relative min-h-screen bg-gradient-to-tr from-rose-200 via-pink-200 to-purple-200 overflow-hidden">
      {/* </div><div className="min-h-screen bg-gradient-to-tr from-purple-100"> */}
      <Snowfall />{/*  🌨 Efeito de neve */}
        <header className="flex flex-col items-center justify-center h-screen space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black">Seja Bem-vindo ao Gaming Place!</h1>
            <p className="text-lg mt-2 text-gray-600">Explore os incríveis jogos desenvolvidos na <strong className="font-extrabold text-gray-900">ULBRA Palmas</strong></p>
          </div>
           {/* 🎮 Ícone do controle com rotação alternada */}
          <div className="mt-12">
            <SlGameController className="w-28 h-28 md:w-40 md:h-40 text-pink-500 transition-transform duration-300 drop-shadow-xl animate-[rotateIcon_2s_linear_infinite]" />
          </div>
          <Link href="/conta">
            <button className="mt-8 px-7 py-3 text-lg md:text-xl font-bold bg-pink-500 text-white rounded-xl shadow-lg border-2 border-white transition-all duration-300 hover:bg-pink-600 hover:scale-110 hover:shadow-2xl">
              Começar Agora
            </button>
          </Link>
        </header>

        {/* 🎬 Animação personalizada no Tailwind */}
      <style>
        {`
          @keyframes rotateIcon {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); } /* Inclina para a esquerda */
            50% { transform: rotate(0deg); }
            75% { transform: rotate(80deg); } /* Inclina para a direita */
            100% { transform: rotate(0deg); }
          }
        `}
      </style>
      </div>
    </>
  );
}
