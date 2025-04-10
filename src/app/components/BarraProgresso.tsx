"use client";

import { useEffect, useState } from "react";

export default function BarraProgresso() {
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const response = await fetch("/api/perfis");
        const perfil = await response.json();
        if (perfil.perfil_pontos !== undefined) {
          setProgresso(perfil.perfil_pontos);
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    }
    
    fetchPerfil();
  }, []);

  // console.log(progresso);

  return (
    <div>
      <p className="text-sm mb-1">Progresso</p>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
          // style={{ width: `${progresso}%` }}
          style={{ width: `${(progresso / 1000) * 100}%` }}
        ></div>
      </div>
      <p className="text-sm mt-1">Nível de progresso: {progresso}%</p>
    </div>
  );
}
