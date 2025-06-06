'use client';
import Ranking from "@/app/components/Ranking";
import Image from "next/image";
import Emblemas from "@/app/components/Emblemas";

export default function Perfil() {

  return (
    <div className="bg-gradient-to-r from-purple-800 to-indigo-900 min-h-screen flex justify-center items-center mt-10">
      <div className="w-full max-w-4xl p-6 bg-purple-900 text-white rounded-xl shadow-lg space-y-6">
        {/* Perfil */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={`/img/homem.png`}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full border-4 border-pink-500"
              width={100}
              height={100}
            />
            <div>
              <h2 className="text-2xl font-bold">Zaya Madson</h2>
              <p className="text-sm text-gray-300">zaya@gmail.com.br</p>
              <p className="text-sm text-gray-300">Palmas, Tocantins</p>
            </div>
          </div>
          <div>
            <p className="text-sm">Troféus: <span className="font-bold">5</span></p>
            <p className="text-sm">Pontos: <span className="font-bold text-yellow-400">2.6k</span></p>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div>
          <p className="text-sm mb-1">Progresso</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full"
              style={{ width: "99%" }}
            ></div>
          </div>
        </div>

        {/* Emblemas */}
         <Emblemas/>

        {/* Ranking */}
        <Ranking/>

        {/* Botões de Ação */}
        <div className="flex space-x-4">
          <button className="flex-1 bg-pink-600 py-2 rounded-lg hover:bg-pink-700">
            Adicionar amigos
          </button>
          <button className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700">
            Enviar sugestão
          </button>
        </div>
      </div>
    </div>
  );
}
