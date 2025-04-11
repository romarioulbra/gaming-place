// 'use client';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaCheckCircle, FaClock, FaTimes, FaInfoCircle } from 'react-icons/fa';
// import axios from 'axios';
// import { useState } from 'react';

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
//   const [selectedStatus, setSelectedStatus] = useState<Status>(statusAtual);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [pulse, setPulse] = useState(false);
//   const [updatingTable, setUpdatingTable] = useState(false);
  
//   // Botão desabilitado apenas para status "validada" ou "rejeitada"
//   const desabilitado = statusAtual === 'validada' || statusAtual === 'rejeitada';

//   const statusOptions = [
//     { value: 'validada', label: 'Validada', icon: <FaCheckCircle className="mr-2" /> },
//     { value: 'rejeitada', label: 'Rejeitada', icon: <FaTimes className="mr-2" /> },
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

//   const currentStatus = statusData[statusAtual] || {
//     color: 'bg-gray-100 text-gray-800',
//     icon: <FaClock className="w-5 h-5" />,
//     label: statusAtual,
//     buttonClass: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
//   };


//   const alterarStatus = async () => {
//     if (selectedStatus === statusAtual) {
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
//         onStatusChange?.(selectedStatus);
//         setPulse(true);

//         // Atualiza a tabela se a função foi fornecida
//         if (onUpdateTable) {
//           setUpdatingTable(true);
//           await onUpdateTable();
//           setUpdatingTable(false);
//         }

//         setTimeout(() => {
//           setSuccessMessage('');
//           setShowModal(false);
//           setPulse(false);
//         }, 2000);
//       }
//     } catch (error) {
//       console.error('Erro ao alterar status da sugestão:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log(statusAtual)

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
//           w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-colors
//           focus:outline-none focus:ring-2 focus:ring-offset-2 text-white
//           ${currentStatus.buttonClass}
//           ${loading || updatingTable ? 'opacity-80 cursor-not-allowed' : ''}
//         `}
//         title={`Status atual: ${currentStatus.label}`}
//       >
//         {loading || updatingTable ? (
//           <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//         ) : (
//           currentStatus.icon
//         )}
//       </motion.button>

//       {/* Modal de Alteração de Status */}
//       <AnimatePresence>
//         {showModal && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               transition={{ type: 'spring', damping: 25 }}
//               className="relative bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
//             >
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
//               >
//                 <FaTimes className="w-5 h-5" />
//               </button>

//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//                   <FaInfoCircle className="text-blue-500" />
//                   Alterar Status da Sugestão
//                 </h3>

//                 <div className="space-y-6">
//                   {/* Descrição */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-gray-50 p-4 rounded-lg border border-gray-200"
//                   >
//                     <div className="flex items-center gap-2 text-gray-600 mb-3">
//                       <FaInfoCircle className="w-4 h-4" />
//                       <span className="text-sm font-medium">Descrição</span>
//                     </div>
//                     <div className="bg-white p-3 rounded border border-gray-100">
//                       <p className="text-gray-700 whitespace-pre-line text-sm">
//                         {descricao || <span className="text-gray-400 italic">Nenhuma descrição fornecida</span>}
//                       </p>
//                     </div>
//                   </motion.div>

//                   {/* Status Atual e Novo */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                     className="space-y-4"
//                   >
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm text-gray-600 mb-2">Status Atual</label>
//                         <div className={`px-4 py-2 rounded-lg flex items-center gap-3 ${currentStatus.color}`}>
//                           {currentStatus.icon}
//                           <span className="font-medium">{currentStatus.label}</span>
//                         </div>
//                       </div>
//                       <div>
//                         <label htmlFor="status-select" className="block text-sm text-gray-600 mb-2">
//                           Novo Status
//                         </label>
//                         <div className="relative">
//                           <select
//                             id="status-select"
//                             value={selectedStatus}
//                             onChange={(e) => setSelectedStatus(e.target.value as Status)}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-10"
//                           >
//                             {statusOptions.map((option) => (
//                               <option key={option.value} value={option.value}>
//                                 {option.label}
//                               </option>
//                             ))}
//                           </select>
//                           <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                             <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Mensagem de Sucesso */}
//                   <AnimatePresence>
//                     {successMessage && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         className="p-3 bg-green-100 text-green-800 rounded-lg flex items-center gap-2 border border-green-200"
//                       >
//                         <FaCheckCircle className="text-green-600 flex-shrink-0" />
//                         <span className="text-sm">{successMessage}</span>
//                         {updatingTable && (
//                           <div className="ml-2 w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//                         )}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {/* Ações */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="flex justify-end gap-3 pt-2"
//                   >
//                     <button
//                       onClick={() => setShowModal(false)}
//                       className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                     >
//                       Cancelar
//                     </button>
//                     <button
//                       onClick={alterarStatus}
//                       disabled={loading || updatingTable}
//                       className={`px-4 py-2 rounded-lg text-white ${
//                         loading || updatingTable ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'
//                       } flex items-center justify-center min-w-24 transition-colors`}
//                     >
//                       {loading || updatingTable ? (
//                         <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                       ) : (
//                         'Confirmar'
//                       )}
//                     </button>
//                   </motion.div>
//                 </div>
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
import { FaCheckCircle, FaClock, FaTimes, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';

type Status = 'enviada' | 'validada' | 'rejeitada';

export default function BotaoStatusSugestao({
  sugestaoId,
  statusAtual,
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
  // const [selectedStatus, setSelectedStatus] = useState<Status>(statusAtual);
  const [selectedStatus, setSelectedStatus] = useState<Status | ''>('');

  const [successMessage, setSuccessMessage] = useState('');
  const [pulse, setPulse] = useState(false);

  const desabilitado = statusAtual === 'validada' || statusAtual === 'rejeitada';

  const statusOptions = [
    { value: 'validada', label: 'Validada', icon: <FaCheckCircle className="mr-2" /> },
    { value: 'rejeitada', label: 'Rejeitada', icon: <FaTimes className="mr-2" /> },
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

  const currentStatus = statusData[statusAtual];

  const alterarStatus = async () => {
    if (!selectedStatus || selectedStatus === statusAtual) {
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

        onStatusChange?.(selectedStatus);
        await onUpdateTable?.();

        setTimeout(() => {
          setSuccessMessage('');
          setPulse(false);
          setShowModal(false);
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
      {/* Botão de Status */}
      <motion.button
        whileHover={!desabilitado ? { scale: 1.05 } : {}}
        whileTap={!desabilitado ? { scale: 0.95 } : {}}
        animate={pulse ? { scale: [1, 1.15, 1], transition: { duration: 0.6 } } : {}}
        onClick={() => !desabilitado && setShowModal(true)}
        disabled={desabilitado}
        className={`
          w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-colors
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

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>

              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-blue-500" />
                Alterar Status da Sugestão
              </h2>

              <p className="text-sm text-gray-600 mb-4">{descricao}</p>

              <label className="block text-sm mb-2">Novo Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as Status)}
                className="w-full border rounded-lg px-3 py-2 mb-4"
              >
                <option value="">Selecione o novo status</option>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {successMessage && (
                <div className="bg-green-100 text-green-700 p-2 rounded mb-4 flex items-center gap-2 text-sm">
                  <FaCheckCircle />
                  {successMessage}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded text-sm hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={alterarStatus}
                  disabled={loading}
                  className={`px-4 py-2 rounded text-sm text-white ${
                    loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {loading ? 'Salvando...' : 'Confirmar'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
