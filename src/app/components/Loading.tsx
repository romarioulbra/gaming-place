'use client';

import { useState} from 'react';
import { IoGameController } from "react-icons/io5";
import { useRouter } from 'next/navigation'; 

export default function LoadBotao({caminho}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const showLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // window.location.href = "/dashboard";
      router.push(caminho);
    }, 1000); // Simulação de 3 segundos
  };

  return (
    <div className="mt-4">      
      <button
        onClick={showLoading} 
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300 border-white border shadow-md  shadow-green-500/50"
        >
        Cadastrar
      </button>
    
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          {/* Animação de borda circular */}
          <div className="absolute h-32 w-32 border-t-4 border-purple-500 border-b-4 border-transparent rounded-full animate-spin"></div>
          
          {/* Ícone central com animação de escala */}
          <IoGameController className="w-20 h-20 text-purple-500 animate-pulse transition-transform duration-300 ease-in-out border-t-4 border-b-4 border-white-500" />

          {/* Texto abaixo do ícone */}
            {/* <p className="text-white text-lg font-semibold mt-2 z-10">Gaming Place</p> */}

        </div>
        
      )}
    </div>
  );
}

