'use client'

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import LoadingOverlay from "../components/LoadingOverlay";

export default function CabecalhoVoltar({ Icone }) {
  
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleVoltarClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.back(); 
    }, 1000); 
  };

  return (
    <>
      {isLoading ? (
        <LoadingOverlay isLoading={isLoading} />
      ) : (
        <div className="flex-auto ml-4 mr-4 mt-4 mb-4">
          <div className="p-8 border border-gray-300 shadow-lg flex justify-between items-center bg-white rounded-lg">
            {/* Botões alinhados à esquerda */}
            <div className="flex space-x-2">
              <h2 className="font-bold flex">
                <Icone className="mr-4 border-black w-8 h-8 rounded-full" />
                Preencha Todas as informações Abaixo
              </h2>
            </div>

            {/* Botões alinhados à direita */}
            <div className="flex space-x-2">
              <button
                onClick={handleVoltarClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
