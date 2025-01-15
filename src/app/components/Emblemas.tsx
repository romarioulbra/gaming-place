'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import EmblemasList from './EmblemasList';
import Image from 'next/image';

export default function Emblemas() {
  const [emblemas, setEmblemas] = useState([]);
  const [selectedEmblema, setSelectedEmblema] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (emblema) => {
    setSelectedEmblema(emblema);
    setIsOpen(true);
  };

  useEffect(() => {
    async function fetchEmblemas() {
      try {
        const response = await axios.get('/api/emblemas');
        setEmblemas(response.data);
      } catch (error) {
        console.error('Erro ao buscar emblemas:', error);
      }
    }
    fetchEmblemas();
  }, []);

  return (
    <div>
      {/* Componente de lista de emblemas */}
      <div className="max-w-5xl mx-auto bg-purple-900 bg-opacity-20 rounded-lg p-4 shadow-lg border border-purple-400">
        <EmblemasList emblemas={emblemas} handleOpenModal={handleOpenModal} />
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
                <Image
                  src={`${selectedEmblema?.emblema_imagem}`}
                  alt={`Emblema ${selectedEmblema?.emblema_nome}`}
                  className="object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <h2 className="text-lg font-bold">Parabéns! Recompensa coletada</h2>
              <p className="mt-2 text-sm">
                Você selecionou o emblema:{" "}
                <span className="font-bold">{selectedEmblema?.emblema_nome}</span>
              </p>
              <p className="mt-2 text-sm">
                Pontos Conquistados:{" "}
                <span className="font-bold">{selectedEmblema?.emblemas_pontos || 0}</span>
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
    </div>
  );
}


