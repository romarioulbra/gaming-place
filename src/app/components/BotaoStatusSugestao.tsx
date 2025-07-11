'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaClock, FaTimes, FaInfoCircle, FaChevronDown, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import axios from 'axios';
import { useState,ReactNode } from 'react';
import { FcAbout  } from "react-icons/fc";

type Status = 'enviada' | 'validada' | 'rejeitada';

const DEFAULT_STATUS: Status = 'enviada';

export default function BotaoStatusSugestao({
  sugestaoId,
  statusAtual: initialStatus,
  descricao,
  titulo,
  onStatusChange,
  onUpdateTable,
}: {
  sugestaoId: string;
  statusAtual: Status;
  descricao: string;
  titulo: string;
  onStatusChange?: (novoStatus: Status) => void;
  onUpdateTable?: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | ''>('');
  // const [successMessage, setSuccessMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState<ReactNode>('');
  const [pulse, setPulse] = useState(false);
  const [localStatus, setLocalStatus] = useState<Status>(initialStatus || DEFAULT_STATUS);

  const desabilitado = localStatus === 'validada' || localStatus === 'rejeitada';

  const statusOptions = [
    { value: 'validada', label: 'Validada', icon: <FaCheckCircle className="mr-2 text-green-500" /> },
    { value: 'rejeitada', label: 'Rejeitada', icon: <FaTimes className="mr-2 text-red-500" /> },
  ];

  const statusData = {
    enviada: {
      icon: <FaClock className="w-5 h-5" />, 
      label: 'Enviada', 
      buttonClass: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    },
    validada: {
      icon: <FaCheckCircle className="w-5 h-5" />, 
      label: 'Validada', 
      buttonClass: 'bg-green-600 opacity-80 cursor-not-allowed',
    },
    rejeitada: {
      icon: <FaTimes className="w-5 h-5" />, 
      label: 'Rejeitada', 
      buttonClass: 'bg-red-600 opacity-80 cursor-not-allowed',
    },
  };

  const currentStatus = statusData[localStatus] || statusData[DEFAULT_STATUS];


const alterarStatus = async () => {
  if (!selectedStatus || selectedStatus === localStatus) {
    setShowModal(false);
    return;
  }

  setLoading(true);

  try {
    const response = await axios.put(`/api/validar-sugestao/${sugestaoId}`, {
      status: selectedStatus,
    });

    if (response.status === 200) {
      setSuccessMessage(
        <div className="flex items-center gap-2 text-green-700">
          <FaCheckCircle className="text-green-500 text-xl" />
          <span className="font-medium">Status atualizado com sucesso!</span>
        </div>
      );

      setLocalStatus(selectedStatus);

      // Notifica mudança de status
      onStatusChange?.(selectedStatus);

      // Atualiza tabela se necessário
      if (onUpdateTable) await onUpdateTable();

      // Fecha modal após feedback
      setTimeout(() => {
        setShowModal(false);
        setSuccessMessage('');
      }, 2000);
    } else {
      throw new Error('Resposta inesperada do servidor');
    }
  } catch (error) {
    console.error('Erro ao alterar status:', error);
    setSuccessMessage(
      <div className="flex items-center gap-2 text-red-700">
        <FaTimes className="text-red-500 text-xl" />
        <span className="font-medium">
          {axios.isAxiosError(error)
            ? error.response?.data?.message || 'Erro ao atualizar status'
            : 'Erro desconhecido'}
        </span>
      </div>
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <motion.button
        whileHover={!desabilitado ? { scale: 1.05 } : {}}
        whileTap={!desabilitado ? { scale: 0.95 } : {}}
        animate={pulse ? { scale: [1, 1.15, 1], transition: { duration: 0.6 } } : {}}
        onClick={() => !desabilitado && setShowModal(true)}
        disabled={desabilitado}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 text-white ${currentStatus.buttonClass} ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
        title={`Status atual: ${currentStatus.label}`}
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          currentStatus.icon
        )}
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <FaInfoCircle className="text-blue-200 text-xl" />
                    <h2 className="text-xl font-semibold">Alterar Status da Sugestão</h2>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-blue-100 hover:text-white transition-colors p-1 rounded-full"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="text-center space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <FcAbout   className="text-blue-500 text-xl flex-shrink-0" />
                    <h3 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                      {titulo}
                    </h3>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white text-sm text-gray-500 italic font-medium">
                        Detalhes da sugestão
                      </span>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-base text-gray-600 leading-relaxed px-4 py-3 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <FaQuoteLeft className="inline-block text-blue-200 mr-2 -mt-2" />
                    {descricao}
                    <FaQuoteRight className="inline-block text-blue-200 ml-2 -mt-2" />
                  </motion.p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Novo Status</label>
                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value as Status)}
                      className="appearance-none w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    >
                      <option value="">Selecione o novo status</option>
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaChevronDown className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow"
                  >
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-green-700 font-medium">{successMessage}</span>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={alterarStatus}
                  disabled={loading || !selectedStatus}
                  className={`px-5 py-2 rounded-lg font-medium text-white transition-colors ${loading || !selectedStatus ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Salvando...
                    </span>
                  ) : 'Confirmar'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
