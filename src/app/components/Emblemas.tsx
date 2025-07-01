"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import EmblemasList from "./EmblemasList";
import Image from "next/image";
import Confetti from "react-confetti";
import { useSession } from "next-auth/react";

// Tipos completos
type Emblema = {
  emblema_id: number;
  emblema_nome: string;
  emblema_criterio: string;
  emblema_imagem: string;
  emblemas_pontos: number;
  emblemas_status: string;
};

type EmblemaUsuario = {
  emblema_id: number;
  desbloqueado: boolean;
  pontos: number;
  pontos_acumulativos: number;
  status: 'BLOQUEADO' | 'DESBLOQUEADO';
  coletado: boolean;
};

type EmblemasProps = {
  onEmblemCollected?: () => void;
};

type EmblemaCompleto = Emblema & EmblemaUsuario;

export default function Emblemas({ onEmblemCollected }: EmblemasProps) {
  const { data: session } = useSession();
  const [emblemas, setEmblemas] = useState<Emblema[]>([]);
  const [emblemasUsuario, setEmblemasUsuario] = useState<EmblemaUsuario[]>([]);
  const [selectedEmblema, setSelectedEmblema] = useState<EmblemaCompleto | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isCollecting, setIsCollecting] = useState(false);
  const [refreshProgress, setRefreshProgress] = useState(false);

  // Busca todos os emblemas disponíveis
  useEffect(() => {
    async function fetchEmblemas() {
      try {
        const response = await axios.get<{ emblemas: Emblema[] }>("/api/emblemas");
        setEmblemas(response.data.emblemas);
      } catch (error) {
        console.error("Erro ao buscar emblemas:", error);
      }
    }
    fetchEmblemas();
  }, []);

  // Busca os emblemas do usuário
  useEffect(() => {
    const fetchEmblemasUsuario = async () => {
      if (!session?.usuario?.id) return;

      try {
        const res = await axios.get<{ emblemas: EmblemaUsuario[] }>(
          `/api/emblemas-desbloqueados?usuarioId=${session.usuario.id}`
        );
        setEmblemasUsuario(res.data.emblemas);
      } catch (error) {
        console.error("Erro ao buscar emblemas do usuário:", error);
      }
    };

    fetchEmblemasUsuario();
  }, [session, refreshProgress]);

  // Atualiza o tamanho da janela para o confetti
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Limpa o confetti após 4 segundos
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleOpenModal = (emblema: EmblemaCompleto) => {
    setSelectedEmblema(emblema);
    setIsOpen(true);
  };

  const handleCollectEmblem = async () => {
    if (!selectedEmblema?.desbloqueado || isCollecting || !selectedEmblema.emblema_id) return;
    
    setIsCollecting(true);
    
    try {
      const response =  await axios.post("/api/coletar-emblemas", {
        usuarioId: session?.usuario?.id,
        emblemaId: selectedEmblema.emblema_id
        });
      

      if (!response.data.success) {
      throw new Error(response.data.error || "Falha na coleta");
    }

      // Atualiza o estado local para refletir a coleta
      setEmblemasUsuario(prev => 
        prev.map(e => 
          e.emblema_id === selectedEmblema.emblema_id 
            ? { 
              ...e, 
              status: "BLOQUEADO", // Bloqueia
              pontos: 0, // Zera pontos
              pontos_acumulativos: response.data.data.novosAcumulativos,
              coletado: true
            } 
            : e
        )
      );
      setRefreshProgress(prev => !prev);
      setShowConfetti(true);
      onEmblemCollected?.();


    } catch (error) {
      console.error("Erro ao coletar emblema:", error);
      alert("Erro ao coletar emblema. Por favor, tente novamente.");
    } finally {
      setIsCollecting(false);
      setIsOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // Combina os emblemas com os dados do usuário
  const emblemasCompletos: EmblemaCompleto[] = emblemas.map((emblema) => {
    const emblemaUsuario = emblemasUsuario.find(
      (eu) => eu.emblema_id === emblema.emblema_id
    );

    return {
      ...emblema,
      desbloqueado: emblemaUsuario?.desbloqueado || false,
      pontos: emblemaUsuario?.pontos || 0,
      status: emblemaUsuario?.status || 'BLOQUEADO',
      coletado: emblemaUsuario?.coletado || false
    };
  });

  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti 
            width={windowSize.width} 
            height={windowSize.height} 
            recycle={false} 
            numberOfPieces={400} 
            gravity={0.2} 
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-purple-800 bg-opacity-30 rounded-lg p-6 shadow-lg border border-purple-500">
        <h2 className="text-center text-white text-xl font-bold mb-4">Emblemas</h2>
        <EmblemasList 
          emblemas={emblemasCompletos} 
          handleOpenModal={handleOpenModal} 
        />
      </div>

      {isOpen && selectedEmblema && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gradient-to-b from-purple-900 to-purple-700 text-white rounded-xl w-96 p-6 shadow-2xl relative animate-fadeIn">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-300 hover:text-white transition"
              aria-label="Fechar"
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-white flex items-center justify-center mb-4 shadow-md">
                <Image
                  src={selectedEmblema.emblema_imagem || "/img/emblema_padrao.png"}
                  alt={`Emblema ${selectedEmblema.emblema_nome}`}
                  width={112}
                  height={112}
                  className="object-cover"
                />
              </div>
              <h2 className="text-lg font-bold">
                {selectedEmblema.desbloqueado 
                  ? selectedEmblema.coletado 
                    ? "Emblema Coletado!" 
                    : "Emblema Conquistado!"
                  : "Emblema Bloqueado"}
              </h2>
              <p className="mt-2 text-sm text-gray-300 text-center">
                {selectedEmblema.desbloqueado 
                  ? selectedEmblema.coletado
                    ? `Você já coletou: ${selectedEmblema.emblema_nome}`
                    : `Você desbloqueou: ${selectedEmblema.emblema_nome}`
                  : `Continue progredindo para desbloquear: ${selectedEmblema.emblema_nome}`}
              </p>
              <p className="mt-2 text-sm text-yellow-400">
                Pontos necessários: <span className="font-bold">{selectedEmblema.emblemas_pontos || 0}</span>
              </p>
              <p className="mt-2 text-sm text-yellow-400">
                Seus pontos atuais para coleta: <span className="font-bold">{selectedEmblema.pontos || 0}</span>
              </p>

              {/* Pontos acumulados (já coletados) */}
              <p className="text-sm text-green-400 flex justify-between">
                <span>Pontos acumulados:</span>
                <span className="font-bold">{selectedEmblema.pontos_acumulativos || 0}</span>
              </p>


             {/* <p className="mt-2 text-sm text-yellow-400">
              Pontos a transferir: <span className="font-bold">{selectedEmblema.pontos || 0}</span>
            </p> */}

            {selectedEmblema.desbloqueado && !selectedEmblema.coletado && (
              <p className="mt-2 text-sm text-green-400 animate-pulse">
                +{selectedEmblema.pontos} pontos serão adicionados ao seu perfil!
              </p>
            )}

            {/* <p className="text-xs text-gray-400 mt-2">
              Debug: Status={selectedEmblema.status}, 
              Pontos={selectedEmblema.pontos}, 
              Acumulados={selectedEmblema.pontos_acumulativos}
            </p> */}
              <button
                onClick={selectedEmblema.desbloqueado ? handleCollectEmblem : handleCloseModal}
                disabled={(selectedEmblema.desbloqueado && selectedEmblema.coletado) || isCollecting}
                className={`mt-5 px-6 py-2 rounded-lg font-bold transition duration-200 ${
                  selectedEmblema.desbloqueado 
                    ? selectedEmblema.coletado
                      ? "bg-green-500 cursor-default"
                      : "bg-pink-500 hover:bg-pink-600" + (isCollecting ? " opacity-50" : "")
                    : "bg-gray-500 hover:bg-gray-600"
                }`}
              >
                {isCollecting 
                  ? "Processando..." 
                  : selectedEmblema.coletado 
                    ? "Coletado"
                    : selectedEmblema.desbloqueado 
                      ? "Coletar" 
                      : "Entendido"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}