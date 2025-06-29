"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Player {
  perfil_imagem: string;
  perfil_usuarios?: {
    usuario_nome: string;
  };
  perfil_pontos: number;
}

interface PodiumModalProps {
  show: boolean;
  onClose: () => void;
  topThree: Player[];
}

export default function PodiumModal({ show, onClose, topThree }: PodiumModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Configurações de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const glowEffect = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1.1,
      opacity: [0, 0.4, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  // Fechar modal ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay com animação */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />
          
          {/* Modal principal */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-gradient-to-br from-purple-900/90 to-indigo-900/90 rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden"
          >
            {/* Decoração de fundo */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600/20 rounded-full filter blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-600/20 rounded-full filter blur-3xl" />
            </div>

            {/* Conteúdo */}
            <div className="relative z-10 p-8">
              {/* Cabeçalho */}
              <motion.div 
                className="flex justify-between items-start mb-8"
                variants={itemVariants}
              >
                <div>
                  <motion.h2 
                    className="text-3xl font-bold text-white"
                    whileHover={{ scale: 1.02 }}
                  >
                    Pódio de Campeões
                  </motion.h2>
                  <motion.p 
                    className="text-purple-200 mt-1"
                    whileHover={{ scale: 1.01 }}
                  >
                    Os melhores desempenhos desta temporada
                  </motion.p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="text-purple-300 hover:text-white transition-colors p-1"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </motion.div>

              {/* Pódio com efeitos */}
              <motion.div
                className="flex items-end justify-center gap-6 h-[28rem] mt-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* 2º Lugar */}
                {topThree.length > 1 && (
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center w-1/4 h-full"
                  >
                    <motion.div
                      className="relative h-2/3 w-full bg-gradient-to-b from-gray-300 to-gray-200 rounded-t-2xl flex flex-col items-center justify-end pb-4"
                      whileHover={{ y: -5 }}
                      animate={{
                        y: [0, -8, 0],
                        transition: {
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      <motion.div
                        className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-gray-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-white font-bold text-lg">2</span>
                      </motion.div>
                      <motion.div 
                        className="relative -mb-10"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Image
                          src={topThree[1].perfil_imagem || "/img/menin.png"}
                          alt={topThree[1].perfil_usuarios?.usuario_nome || "Usuário"}
                          width={70}
                          height={70}
                          className="relative rounded-full border-4 border-gray-300 object-cover z-10"
                        />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="bg-gray-300 w-full py-3 rounded-b-lg mt-1 min-h-[80px] flex flex-col justify-center"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="font-bold text-gray-800 text-center px-2 break-words">
                        {topThree[1].perfil_usuarios?.usuario_nome || "Usuário"}
                      </p>
                      <p className="text-sm font-bold text-gray-600 text-center mt-1">
                        {topThree[1].perfil_pontos} pontos
                      </p>
                    </motion.div>
                  </motion.div>
                )}

                {/* 1º Lugar */}
                {topThree.length > 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center w-2/4 h-full z-10"
                  >
                    <motion.div
                      className="relative h-full w-full bg-gradient-to-b from-yellow-300 to-yellow-200 rounded-t-2xl flex flex-col items-center justify-end pb-8"
                      whileHover={{ y: -10 }}
                      animate={{
                        y: [0, -15, 0],
                        boxShadow: [
                          "0 25px 50px -12px rgba(234, 179, 8, 0.3)",
                          "0 25px 50px -12px rgba(234, 179, 8, 0.5)",
                          "0 25px 50px -12px rgba(234, 179, 8, 0.3)"
                        ],
                        transition: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      {/* Efeito de brilho */}
                      <motion.div
                        variants={glowEffect}
                        initial="initial"
                        animate="animate"
                        className="absolute inset-0 bg-yellow-400 rounded-t-2xl mix-blend-overlay"
                      />
                      
                      <motion.div
                        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full w-14 h-14 flex items-center justify-center shadow-lg border-2 border-yellow-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {/* Ícone de troféu substituído aqui */}
                        <Image 
                          src="/icons/trofeu.svg" 
                          alt="Troféu" 
                          width={24} 
                          height={24}
                          className="text-white"
                        />
                      </motion.div>
                      <motion.div 
                        className="relative -mb-16"
                        whileHover={{ scale: 1.15 }}
                      >
                        <Image
                          src={topThree[0].perfil_imagem || "/img/menin.png"}
                          alt={topThree[0].perfil_usuarios?.usuario_nome || "Usuário"}
                          width={100}
                          height={100}
                          className="relative rounded-full border-4 border-yellow-400 object-cover z-10 shadow-xl"
                        />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="bg-yellow-400 w-full py-4 rounded-b-lg mt-1 min-h-[90px] flex flex-col justify-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      <motion.p
                        className="text-xl font-bold text-gray-900 text-center px-2 break-words"
                        animate={{
                          textShadow: [
                            "0 0 0px rgba(0,0,0,0)",
                            "0 0 8px rgba(234, 179, 8, 0.7)",
                            "0 0 0px rgba(0,0,0,0)"
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity
                        }}
                      >
                        {topThree[0].perfil_usuarios?.usuario_nome || "Usuário"}
                      </motion.p>
                      <p className="text-base font-bold text-gray-800 text-center mt-1">
                        {topThree[0].perfil_pontos} pontos
                      </p>
                    </motion.div>
                  </motion.div>
                )}

                {/* 3º Lugar */}
                {topThree.length > 2 && (
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center w-1/4 h-full"
                  >
                    <motion.div
                      className="relative h-2/3 w-full bg-gradient-to-b from-amber-500 to-amber-400 rounded-t-2xl flex flex-col items-center justify-end pb-4"
                      whileHover={{ y: -5 }}
                      animate={{
                        scale: [1, 1.02, 1],
                        transition: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      <motion.div
                        className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-amber-400"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-white font-bold text-lg">3</span>
                      </motion.div>
                      <motion.div 
                        className="relative -mb-10"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Image
                          src={topThree[2].perfil_imagem || "/img/menin.png"}
                          alt={topThree[2].perfil_usuarios?.usuario_nome || "Usuário"}
                          width={70}
                          height={70}
                          className="relative rounded-full border-4 border-amber-400 object-cover z-10"
                        />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="bg-amber-500 w-full py-3 rounded-b-lg mt-1 min-h-[80px] flex flex-col justify-center"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="font-bold text-white text-center px-2 break-words">
                        {topThree[2].perfil_usuarios?.usuario_nome || "Usuário"}
                      </p>
                      <p className="text-sm font-bold text-gray-100 text-center mt-1">
                        {topThree[2].perfil_pontos} pontos
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>

              {/* Rodapé */}
              <motion.div 
                className="mt-8 pt-6 border-t border-purple-700/50"
                variants={itemVariants}
              >
                <p className="text-center text-purple-300 text-sm">
                  Parabéns aos nossos campeões! O ranking é atualizado semanalmente.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}