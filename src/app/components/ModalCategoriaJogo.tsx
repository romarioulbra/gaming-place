"use client";

import React from "react";
import Image from "next/image";

export default function ModalCategoriaJogo({ jogo, jogos, onClose }) {
  if (!jogo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl relative shadow-lg">
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded p-2"
        >
          X
        </button>

        {/* Cabeçalho do Modal */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Jogos da Categoria: <span className="text-indigo-600">{jogo.categoria_jogo_area_atuacao}</span>
          </h2>
        </div>

        {/* Lista de Jogos */}
        <div className="space-y-6">
          {jogos.length > 0 ? (
            jogos.map((item) => (
              <div
                key={item.jogos_id}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 border rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
              >
                {/* Imagem do Jogo - Agora centralizada */}
                <div className="flex justify-center items-center mb-4">
                  {item.jogos_url_img && (
                    <a
                      href={item.jogos_url_img}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={item.jogos_url_img}
                        alt={item.jogos_nome}
                        className="object-cover rounded-lg shadow-md"
                        width={150} // Ajuste o tamanho conforme necessário
                        height={150} // Ajuste o tamanho conforme necessário
                      />
                    </a>
                  )}
                </div>

                {/* Informações do Jogo */}
                <div className="flex flex-col justify-start text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.jogos_nome}{" - "}
                    {item.jogos_autor && (
                      <span className="text-green-500">( Autor(es): {item.jogos_autor} )</span>
                    )}
                  </h3>
                  <p className="text-gray-600 mb-3">{item.jogos_descricao}</p>
                  <div className="flex justify-center">
                    <a
                      href={item.jogos_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      Acessar Jogo
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Nenhum jogo encontrado para esta categoria.</p>
          )}
        </div>
      </div>
    </div>
  );
}
