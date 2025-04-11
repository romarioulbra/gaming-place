// 'use client';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaCheckCircle, FaClock, FaTimes, FaInfoCircle, FaChevronDown } from 'react-icons/fa';
// import axios from 'axios';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// type Status = 'enviada' | 'validada' | 'rejeitada';

// export default function BotaoStatusSugestao({
//   sugestaoId,
//   statusAtual,
//   descricao,
//   onStatusChange,
//   onUpdateTable,
// }: {
//   sugestaoId: string;
//   statusAtual: Status;
//   descricao: string;
//   onStatusChange?: (novoStatus: Status) => void;
//   onUpdateTable?: () => Promise<void>;
// }) {
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState<Status | ''>('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [pulse, setPulse] = useState(false);
//   const desabilitado = statusAtual === 'validada' || statusAtual === 'rejeitada';
//   const router = useRouter();

//   const statusOptions = [
//     { 
//       value: 'validada', 
//       label: 'Validada', 
//       icon: <FaCheckCircle className="mr-2 text-green-500" />,
//       bgColor: 'bg-green-50',
//       textColor: 'text-green-700'
//     },
//     { 
//       value: 'rejeitada', 
//       label: 'Rejeitada', 
//       icon: <FaTimes className="mr-2 text-red-500" />,
//       bgColor: 'bg-red-50',
//       textColor: 'text-red-700'
//     },
//   ];

//   const statusData = {
//     enviada: {
//       color: 'bg-blue-100 text-blue-800',
//       icon: <FaClock className="w-5 h-5" />,
//       label: 'Enviada',
//       buttonClass: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
//     },
//     validada: {
//       color: 'bg-green-100 text-green-800',
//       icon: <FaCheckCircle className="w-5 h-5" />,
//       label: 'Validada',
//       buttonClass: 'bg-green-600 opacity-80 cursor-not-allowed'
//     },
//     rejeitada: {
//       color: 'bg-red-100 text-red-800',
//       icon: <FaTimes className="w-5 h-5" />,
//       label: 'Rejeitada',
//       buttonClass: 'bg-red-600 opacity-80 cursor-not-allowed'
//     },
//   };

//   const currentStatus = statusData[statusAtual];

//   const alterarStatus = async () => {
//     if (!selectedStatus || selectedStatus === statusAtual) {
//       setShowModal(false);
//       return;
//     }
  
//     setLoading(true);
//     try {
//       const response = await axios.put(`/api/sugestoes/${sugestaoId}`, {
//         status: selectedStatus,
//       });
  
//       if (response.status === 200) {
//         setSuccessMessage('Status atualizado com sucesso!');
//         setPulse(true);
  
//         onStatusChange?.(selectedStatus);
//         await onUpdateTable?.();
  
//         setTimeout(() => {
//           setSuccessMessage('');
//           setPulse(false);
//           setShowModal(false);
  
//           setTimeout(() => {
//             router.refresh();
//           }, 500);
//         }, 1500);
//       } else {
//         setSuccessMessage('Falha ao atualizar o status.');
//         setTimeout(() => setSuccessMessage(''), 3000);
//       }
//     } catch (error) {
//       console.error('Erro ao alterar status da sugestão:', error);
//       setSuccessMessage('Erro ao atualizar status.');
//       setTimeout(() => setSuccessMessage(''), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Botão de Status */}
//       <motion.button
//         whileHover={!desabilitado ? { scale: 1.05 } : {}}
//         whileTap={!desabilitado ? { scale: 0.95 } : {}}
//         animate={pulse ? { scale: [1, 1.15, 1], transition: { duration: 0.6 } } : {}}
//         onClick={() => !desabilitado && setShowModal(true)}
//         disabled={desabilitado}
//         className={`
//           w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all
//           focus:outline-none focus:ring-2 focus:ring-offset-2 text-white
//           ${currentStatus.buttonClass}
//           ${loading ? 'opacity-80 cursor-not-allowed' : ''}
//         `}
//         title={`Status atual: ${currentStatus.label}`}
//       >
//         {loading ? (
//           <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//         ) : (
//           currentStatus.icon
//         )}
//       </motion.button>

//       {/* Modal Aprimorado */}
//       <AnimatePresence>
//         {showModal && (
//           <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
//             <motion.div
//               initial={{ opacity: 0, y: 20, scale: 0.98 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 20, scale: 0.98 }}
//               transition={{ 
//                 type: "spring",
//                 damping: 25,
//                 stiffness: 300
//               }}
//               className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
//             >
//               {/* Cabeçalho do Modal */}
//               <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 text-white">
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center space-x-3">
//                     <FaInfoCircle className="text-blue-200 text-xl" />
//                     <h2 className="text-xl font-semibold">Alterar Status da Sugestão</h2>
//                   </div>
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="text-blue-100 hover:text-white transition-colors p-1 rounded-full"
//                   >
//                     <FaTimes className="text-lg" />
//                   </button>
//                 </div>
//               </div>

//               {/* Corpo do Modal */}
//               <div className="p-6">
//                 <p className="text-gray-600 mb-6 leading-relaxed">{descricao}</p>

//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Novo Status</label>
//                   <div className="relative">
//                     <select
//                       value={selectedStatus}
//                       onChange={(e) => setSelectedStatus(e.target.value as Status)}
//                       className="appearance-none w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                     >
//                       <option value="">Selecione o novo status</option>
//                       {statusOptions.map((option) => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                       <FaChevronDown className="text-gray-400" />
//                     </div>
//                   </div>
//                 </div>

//                 {successMessage && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r"
//                   >
//                     <div className="flex items-center">
//                       <FaCheckCircle className="text-green-500 mr-3" />
//                       <span className="text-green-700 font-medium">{successMessage}</span>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>

//               {/* Rodapé do Modal */}
//               <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setShowModal(false)}
//                   className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
//                 >
//                   Cancelar
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={alterarStatus}
//                   disabled={loading || !selectedStatus}
//                   className={`px-5 py-2 rounded-lg font-medium text-white transition-colors ${
//                     loading 
//                       ? 'bg-gray-400 cursor-not-allowed' 
//                       : !selectedStatus 
//                         ? 'bg-blue-400 cursor-not-allowed' 
//                         : 'bg-blue-600 hover:bg-blue-700'
//                   }`}
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center">
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Salvando...
//                     </span>
//                   ) : 'Confirmar'}
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }



'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaClock, FaTimes, FaInfoCircle, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Status = 'enviada' | 'validada' | 'rejeitada';

// Status padrão para fallback
const DEFAULT_STATUS: Status = 'enviada';

export default function BotaoStatusSugestao({
  sugestaoId,
  statusAtual: initialStatus,
  descricao,
  onStatusChange,
  onUpdateTable,
}: {
  sugestaoId: string;
  statusAtual: Status;
  descricao: string;
  onStatusChange?: (novoStatus: Status) => void;
  onUpdateTable?: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | ''>('');
  const [successMessage, setSuccessMessage] = useState('');
  const [pulse, setPulse] = useState(false);
  const [localStatus, setLocalStatus] = useState<Status>(initialStatus || DEFAULT_STATUS);
  const desabilitado = localStatus === 'validada' || localStatus === 'rejeitada';
  const router = useRouter();

  const statusOptions = [
    { 
      value: 'validada', 
      label: 'Validada', 
      icon: <FaCheckCircle className="mr-2 text-green-500" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    { 
      value: 'rejeitada', 
      label: 'Rejeitada', 
      icon: <FaTimes className="mr-2 text-red-500" />,
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
  ];

  const statusData = {
    enviada: {
      color: 'bg-blue-100 text-blue-800',
      icon: <FaClock className="w-5 h-5" />,
      label: 'Enviada',
      buttonClass: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
    },
    validada: {
      color: 'bg-green-100 text-green-800',
      icon: <FaCheckCircle className="w-5 h-5" />,
      label: 'Validada',
      buttonClass: 'bg-green-600 opacity-80 cursor-not-allowed'
    },
    rejeitada: {
      color: 'bg-red-100 text-red-800',
      icon: <FaTimes className="w-5 h-5" />,
      label: 'Rejeitada',
      buttonClass: 'bg-red-600 opacity-80 cursor-not-allowed'
    },
  };

  // Função segura para obter o status atual
  const getCurrentStatus = () => {
    return statusData[localStatus] || statusData[DEFAULT_STATUS];
  };

  const currentStatus = getCurrentStatus();

  const alterarStatus = async () => {
    if (!selectedStatus || selectedStatus === localStatus) {
      setShowModal(false);
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.put(`/api/sugestoes/${sugestaoId}`, {
        status: selectedStatus,
      });
  
      if (response.status === 200) {
        setSuccessMessage('Status atualizado com sucesso!');
        setPulse(true);
        
        // Atualiza apenas o estado local deste componente
        setLocalStatus(selectedStatus);
        
        // Notifica o componente pai se necessário
        onStatusChange?.(selectedStatus);

        // Atualiza a tabela se existir o callback
        if (onUpdateTable) {
          await onUpdateTable();
        }

        setTimeout(() => {
          setSuccessMessage('');
          setPulse(false);
          setShowModal(false);
          
          // Atualização garantida
          window.location.reload();
        }, 1500);
      } else {
        setSuccessMessage('Falha ao atualizar o status.');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Erro ao alterar status da sugestão:', error);
      setSuccessMessage('Erro ao atualizar status.');
      setTimeout(() => setSuccessMessage(''), 3000);
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
        className={`
          w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all
          focus:outline-none focus:ring-2 focus:ring-offset-2 text-white
          ${currentStatus.buttonClass}
          ${loading ? 'opacity-80 cursor-not-allowed' : ''}
        `}
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
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300
              }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
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

              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">{descricao}</p>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Novo Status</label>
                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value as Status)}
                      className="appearance-none w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="">Selecione o novo status</option>
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
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
                    className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r"
                  >
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-3" />
                      <span className="text-green-700 font-medium">{successMessage}</span>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={alterarStatus}
                  disabled={loading || !selectedStatus}
                  className={`px-5 py-2 rounded-lg font-medium text-white transition-colors ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : !selectedStatus 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                  }`}
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