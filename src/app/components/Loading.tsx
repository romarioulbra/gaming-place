'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '../components/LoadingOverlay'; // Importe seu componente LoadingOverlay

export default function LoadBotao({ caminho }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const showLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(caminho);  // Navegar para o caminho após a simulação de carregamento
    }, 1000); // Simulação de 1 segundo de carregamento
  };

  return (
    <div className="mt-4">
      <button
        onClick={showLoading}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300 border-white border shadow-md shadow-green-500/50"
      >
        Cadastrar
      </button>

      {loading && <LoadingOverlay isLoading={loading} />}
    </div>
  );
}
