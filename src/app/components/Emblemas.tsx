'use client'

import Image from "next/image";
import { useState } from "react";

export default function Emblemas(){

  const [selectedEmblema, setSelectedEmblema] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const emblemas = ["1", "2", "3", "4", "5"];

  const handleOpenModal = (emblema) => {
    setSelectedEmblema(emblema);
    setIsOpen(true);
  };


  return(
    <>
      {/* Emblemas */}
      <div>
        <h3 className="text-lg font-bold">Emblemas</h3>
        <div className="flex space-x-4 mt-2  bg-purple-600 p-2 rounded">
          {emblemas.map((item) => (
            <Image
              key={item}
              src={`/img/menin.png`} // Substitua pela URL do emblema real
              alt={`Emblema ${item}`}
              className="w-12 h-12 rounded-full cursor-pointer"
              width={100}
              height={100}
              onClick={() => handleOpenModal(item)} // Ao clicar, abre o modal
            />
          ))}
        </div>
      </div>


      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-purple-900 text-white rounded-lg w-96 p-6 shadow-lg relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-300"
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white flex items-center justify-center mb-4">
                {/* Mostra o emblema selecionado */}
                <Image
                  src={`/img/menin.png`} // Substitua pela URL do emblema real
                  alt={`Emblema ${selectedEmblema}`}
                  className="object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <h2 className="text-lg font-bold">Parabéns! Recompensa coletada</h2>
              <p className="mt-2 text-sm">
                Você selecionou o emblema:{" "}
                <span className="font-bold">{selectedEmblema}</span>
              </p>
              <p className="mt-2 text-sm">
                Pontos Conquistados: 
                <span className="font-bold"> 40</span>
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-2 bg-pink-500 rounded text-white font-bold hover:bg-pink-600"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}