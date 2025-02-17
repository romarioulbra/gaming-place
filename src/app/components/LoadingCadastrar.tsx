'use client';

import { useState} from 'react';
import { IoGameController } from "react-icons/io5";
import { useRouter } from 'next/navigation'; 
import Botao from './Botao';

export default function LoadCadastrar({caminho}) {

  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const showLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(caminho);
    }, 1000); // Simulação de 3 segundos
  };

  return (
    <div className="mt-4">          
      <Botao
        texto="Cadastrar"
        cor="verde"
        tipo="submit"
        onClick={showLoading}        
      />
    
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          {/* Animação de borda circular */}
          <div className="absolute h-32 w-32 border-t-4 border-purple-500 border-b-4 border-transparent rounded-full animate-spin"></div>          
          {/* Ícone central com animação de escala */}
          <IoGameController className="w-20 h-20 text-purple-500 animate-pulse transition-transform duration-300 ease-in-out border-t-4 border-b-4 border-white-500" />
        </div>        
      )}
    </div>
  );
}

