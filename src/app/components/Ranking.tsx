"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface Perfil {
  perfil_id: number;
  perfil_imagem: string;
  perfil_cidade: string;
  perfil_pontos: number;
  perfil_nivel: string | number;
  emblema: string | number;
  perfil_usuarios: { usuario_nome: string };
}

export default function Ranking() {
  const [ranking, setRanking] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRanking() {
      try {
        console.log("Buscando ranking...");
        const response = await axios.get("/api/ranking");

        if (response.data && Array.isArray(response.data)) {
          setRanking(response.data);
        } else {
          throw new Error("Dados recebidos não são um array");
        }
      } catch (err: any) {
        setError(err?.message || "Erro ao carregar os dados");
        console.error("Erro ao buscar dados do ranking:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRanking();
  }, []);

  console.log("Ranking carregado:", ranking);

  return (
    <div className="bg-purple-800 p-4 rounded-xl border border-purple-400">
      <h3 className="text-lg font-bold text-white">Ranking</h3>
      <ul
        className={`mt-2 space-y-2 ${
          ranking.length > 5 ? "max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800" : ""
        }`}
      >
        {loading ? (
          <div className="text-white">Carregando...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : ranking.length > 0 ? (
          ranking.map((rank) => (
            <li
              key={rank.perfil_id}
              className="flex justify-between items-center bg-purple-700 p-2 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <Image
                  src={rank.perfil_imagem || "/img/menin.png"}
                  alt={rank.perfil_usuarios?.usuario_nome || "Usuário desconhecido"}
                  className="w-10 h-10 rounded-full object-cover"
                  width={40}
                  height={40}
                />
                <div>
                  <span className="text-white font-semibold">
                    {rank.perfil_usuarios?.usuario_nome
                      ? rank.perfil_usuarios.usuario_nome
                          .toLowerCase()
                          .replace(/^\w/, (c) => c.toUpperCase())
                      : "Usuário desconhecido"
                    }
                  </span>
                  <p className="text-xs text-gray-300">{rank.perfil_cidade}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-yellow-400 font-bold">
                  {rank.perfil_pontos} 🏆
                </span>
                {/* <p className="text-xs text-gray-300">{rank.perfil_nivel}</p> */}
              </div>
            </li>
          ))
        ) : (
          <div className="text-white">Nenhum usuário listado</div>
        )}
      </ul>
    </div>
  );
}
