'use client';
import { useState } from 'react';

export function ModelFormSugestao({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    suggestion: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    // Lógica de envio para API aqui
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity duration-300 p-4">
      <div className="relative w-full max-w-4xl bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 scale-95 hover:scale-100 flex flex-col lg:flex-row">
        {/* Seção do formulário */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 bg-gradient-to-br from-white to-indigo-50">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-700 mb-2 drop-shadow-md">Sugira Melhorias</h2>
            <p className="text-indigo-500 animate-pulse">Sua opinião é valiosa para nós!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título da Sugestão *</label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                placeholder="Ex: Melhoria no sistema de pontos"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Seu Nome *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                placeholder="Como gostaria de ser identificado"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700">Detalhes da Sugestão *</label>
              <textarea
                id="suggestion"
                name="suggestion"
                rows={4}
                required
                value={formData.suggestion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                placeholder="Descreva sua sugestão com detalhes..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Enviar Sugestão
              </button>
            </div>
          </form>
        </div>

        {/* Seção de benefícios - Estilo premium */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="bg-white/90 rounded-xl border border-indigo-100 shadow-sm p-6">
            <div className="flex items-center mb-6 group">
              <div className="bg-indigo-600 text-white p-2 rounded-lg mr-3 transform group-hover:rotate-6 transition-transform duration-300 shadow-lg group-hover:shadow-indigo-400/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-800 group-hover:text-indigo-900 transition-colors duration-300">
                VANTAGENS DE SUGERIR MELHORIAS
              </h3>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start bg-white p-3 rounded-lg border-l-4 border-green-500 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <span className="text-green-500 font-bold mr-2 hover:scale-125 transition-transform duration-200">✓</span>
                <span>
                  <strong className="text-indigo-700">100 pontos</strong> por sugestão enviada
                  <p className="text-xs text-gray-500 mt-1">Pontos creditados após análise da sugestão</p>
                </span>
              </li>
              
              <li className="flex items-start bg-white p-3 rounded-lg border-l-4 border-blue-500 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <span className="text-blue-500 font-bold mr-2 hover:scale-125 transition-transform duration-200">✓</span>
                <span>
                  <strong className="text-indigo-700">+50 pontos bônus</strong> se sua sugestão for implementada
                  <p className="text-xs text-gray-500 mt-1">Totalizando 150 pontos!</p>
                </span>
              </li>
              
              <li className="flex items-start bg-white p-3 rounded-lg border-l-4 border-purple-500 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <span className="text-purple-500 font-bold mr-2 hover:scale-125 transition-transform duration-200">✓</span>
                <span>
                  <strong className="text-indigo-700">Reconhecimento</strong> no nosso hall de colaboradores
                  <p className="text-xs text-gray-500 mt-1">Seu nome destacado para a comunidade</p>
                </span>
              </li>
            </ul>

            <div className="mt-6 bg-indigo-100/50 p-4 rounded-lg border border-indigo-200">
              <h4 className="font-bold text-indigo-700 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Como funcionam os pontos?
              </h4>
              <p className="text-sm text-gray-700">
                Seus pontos podem ser trocados por recompensas exclusivas e benefícios no sistema. Quanto mais você contribui, mais vantagens acumula!
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 bg-white/80 hover:bg-white p-1 rounded-full shadow-sm transition-all duration-300 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Fechar modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}



// Este está mais ou menos bom
// 'use client';
// import { useState } from 'react';

// export function ModelFormSugestao({ onClose }: { onClose: () => void }) {
//   const [formData, setFormData] = useState({
//     title: '',
//     name: '',
//     suggestion: ''
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Dados enviados:', formData);
//     onClose();
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity duration-300 p-4">
//       <div className="relative w-full max-w-lg bg-white text-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300">
//         {/* Cabeçalho com gradiente */}
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-bold flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               Sugerir Melhorias
//             </h2>
//             <button 
//               onClick={onClose}
//               className="text-white hover:text-gray-200 p-1 rounded-full transition-colors duration-200"
//               aria-label="Fechar modal"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//           <p className="text-sm opacity-90 mt-1">Contribua e ganhe 100 pontos por sugestão!</p>
//         </div>

//         {/* Corpo do modal */}
//         <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
//           {/* Formulário */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título da Sugestão *</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 required
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                 placeholder="Ex: Melhoria no sistema de pontos"
//               />
//             </div>

//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Seu Nome *</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                 placeholder="Como gostaria de ser identificado"
//               />
//             </div>

//             <div>
//               <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 mb-1">Sua Sugestão *</label>
//               <textarea
//                 id="suggestion"
//                 name="suggestion"
//                 rows={3}
//                 required
//                 value={formData.suggestion}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                 placeholder="Descreva sua sugestão com detalhes..."
//               />
//             </div>

//             {/* Seção de benefícios compacta */}
//             <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
//               <h4 className="font-medium text-blue-800 text-sm mb-2 flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Benefícios ao sugerir:
//               </h4>
//               <ul className="text-xs text-blue-900 space-y-1">
//                 <li className="flex items-start">
//                   <span className="text-blue-600 mr-1">•</span>
//                   <span><strong>100 pontos</strong> por sugestão válida</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-blue-600 mr-1">•</span>
//                   <span><strong>+50 pontos</strong> se implementada</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-blue-600 mr-1">•</span>
//                   <span><strong>Reconhecimento</strong> como colaborador</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="flex justify-end space-x-3 pt-2">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//               >
//                 Cancelar
//               </button>
//               <button
//                 type="submit"
//                 className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors duration-200 shadow-sm"
//               >
//                 Enviar Sugestão
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';
// import { useState } from 'react';
// import BenefitItem from './BenefitItem';

// export function ModelFormSugestao({ onClose }: { onClose: () => void }) {
//   const [formData, setFormData] = useState({
//     title: '',
//     name: '',
//     suggestion: ''
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Dados enviados:', formData);
//     onClose();
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity duration-300 p-4">
//       <div className="relative w-full max-w-2xl bg-white text-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 flex flex-col h-auto max-h-[90vh]">
//         {/* Cabeçalho */}
//         <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-5 text-white">
//           <div className="flex justify-between items-center">
//             <div>
//               <h2 className="text-2xl font-bold flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Sugerir Melhorias
//               </h2>
//               <p className="text-sm opacity-90 mt-1">Contribua e ganhe <strong>100 pontos</strong> por sugestão válida!</p>
//             </div>
//             <button 
//               onClick={onClose}
//               className="text-white hover:text-gray-200 p-1 rounded-full transition-colors duration-200"
//               aria-label="Fechar modal"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Corpo do modal - Layout responsivo */}
//         <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
//           {/* Seção do formulário */}
//           <div className="w-full md:w-1/2 p-6 overflow-y-auto">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Título *</label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   required
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   placeholder="Ex: Melhoria no sistema de pontos"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Seu Nome *</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   placeholder="Como gostaria de ser identificado"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 mb-2">Sugestão *</label>
//                 <textarea
//                   id="suggestion"
//                   name="suggestion"
//                   rows={4}
//                   required
//                   value={formData.suggestion}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   placeholder="Descreva sua sugestão com detalhes..."
//                 />
//               </div>

//               <div className="flex justify-end space-x-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   Cancelar
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors duration-200 shadow-md"
//                 >
//                   Enviar Sugestão
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Seção de benefícios - Destaque */}
//           <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-50 to-purple-50 p-6 border-t md:border-t-0 md:border-l border-gray-200 overflow-y-auto">
//             <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
//               <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Vantagens Exclusivas
//               </h3>

//               <ul className="space-y-4">
//                 <BenefitItem 
//                   color="green" 
//                   title="100 Pontos Garantidos" 
//                   description="Por cada sugestão enviada e válida"
//                   icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
                
//                 <BenefitItem 
//                   color="blue" 
//                   title="+50 Pontos Bônus" 
//                   description="Se sua sugestão for implementada"
//                   icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//                 />
                
//                 <BenefitItem 
//                   color="purple" 
//                   title="Reconhecimento" 
//                   description="Seu nome no hall de colaboradores"
//                   icon="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
//                 />
//               </ul>

//               <div className="mt-6 bg-blue-100/50 p-3 rounded-lg border border-blue-200">
//                 <p className="text-sm text-blue-800">
//                   <strong className="font-semibold">Dica:</strong> Suas sugestões nos ajudam a melhorar continuamente o sistema para todos os usuários!
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

