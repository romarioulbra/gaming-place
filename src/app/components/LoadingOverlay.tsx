// 'use client';

import { IoGameController } from "react-icons/io5";

export default function LoadingOverlay({ isLoading }) {

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-gray-900 bg-opacity-90 z-50 overflow-hidden">
      {/* Partículas em movimento */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      {/* Conteúdo Central */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Spinner circular com gradiente */}
        <div className="h-24 w-24 md:h-32 md:w-32 border-t-4 border-b-4 border-transparent rounded-full animate-spin bg-gradient-to-r from-purple-500 to-pink-500"></div>
        {/* Ícone central animado */}
          <IoGameController className="absolute w-14 h-14 md:w-20 md:h-20 text-white animate-bounce" />
         {/* Texto "Carregando..." */}
         <p className="mt-6 text-lg md:text-xl font-semibold text-white animate-pulse">
          Carregando...
        </p>
      </div>
    </div>
      
  );
}
