'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export function ModelFormSugestao({ onClose, dadosUsuario }: { onClose: () => void }) {
 
 const [formData, setFormData] = useState({
  sugestao_melhoria_nome: dadosUsuario?.usuario?.nome || '',
  sugestao_melhoria_descricao: '',
  sugestao_melhoria_status: '',
  usuario_id: dadosUsuario?.usuario?.id?.toString() || '',
  tipo_emblema_id: '',
  tipo_emblema_criterio: ''
});


  const [successMessage, setSuccessMessage] = useState('');
  const [criterios, setCriterios] = useState<{ tipo_emblema_id: string, tipo_emblema_criterio: string }[]>([]);


  //Buscando Dados do BD para Recarregar na página
  useEffect(() => {
    async function fetchCriterios() {
      try {
        const response = await axios.get('/api/categoria_emblemas');
        setCriterios(response.data.cat_emblemas);
      } catch (error) {
        console.error('Erro ao carregar critérios:', error);
      }
    }
    fetchCriterios();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/sugestoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sugestao_melhoria_nome: formData.sugestao_melhoria_nome,
        sugestao_melhoria_descricao: formData.sugestao_melhoria_descricao,
        sugestao_melhoria_status: 'enviado',
        usuario_id: parseInt(formData.usuario_id),
        tipo_emblema_id: parseInt(formData.tipo_emblema_id)
      }),
    });

    if (!res.ok) throw new Error('Erro ao enviar sugestão');

    setSuccessMessage('Sugestão enviada com sucesso!');
    setFormData({
      sugestao_melhoria_nome: dadosUsuario?.usuario?.nome || '',
      sugestao_melhoria_descricao: '',
      sugestao_melhoria_status: '',
      usuario_id: dadosUsuario?.usuario?.id?.toString() || '',
      tipo_emblema_id: '',
      tipo_emblema_criterio: ''
    });

    setTimeout(() => setSuccessMessage(''), 5000);

  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao enviar sugestão. Tente novamente.');
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = criterios.find(crit => crit.tipo_emblema_id === e.target.value);
    setFormData(prev => ({
      ...prev,
      tipo_emblema_id: e.target.value,
      tipo_emblema_criterio: selectedOption?.tipo_emblema_criterio || ''
    }));
  };

  const { nome, id } = dadosUsuario.usuario;

  console.log(criterios);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity duration-300 p-4">
      <div className="relative w-full max-w-4xl bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 scale-95 hover:scale-100 flex flex-col lg:flex-row">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 bg-gradient-to-br from-white to-indigo-50">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-700 mb-2 drop-shadow-md">Sugira Melhorias</h2>
            <p className="text-indigo-500 animate-pulse">Sua opinião é valiosa para nós!</p>
          </div>
          
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="mb-6"
              >
                <div className="relative p-4 pl-12 rounded-lg bg-gradient-to-r from-green-50 to-emerald-100 border border-green-200 shadow-sm">
                  <div className="absolute left-4 top-4 ">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                  <h3 className="font-semibold text-green-800 mb-1 ml-3">Sucesso!</h3>
                  <p className="text-sm text-green-700">{successMessage}</p>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-green-400 origin-left"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="tipo_emblema_id" className="block text-sm font-medium text-gray-700">Critérios *</label>
              <select
                id="tipo_emblema_id"
                name="tipo_emblema_id"
                required
                value={formData.tipo_emblema_id}
                onChange={handleSelectChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              >
                <option value="" disabled>Selecione um critério</option>
                {criterios.map((crit) => (
                  <option key={crit.tipo_emblema_id} value={crit.tipo_emblema_id}>
                    {crit.tipo_emblema_criterio}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">

              {/* <label htmlFor="sugestao_melhoria_nome" className="block text-sm font-medium text-gray-700">Seu Nome </label> */}

              <input
                type="hidden"
                id="sugestao_melhoria_nome"
                name="sugestao_melhoria_nome"
                required
                value={nome}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                placeholder="Como gostaria de ser identificado"
              />
            </div>

            <input
              type="hidden"
              id="usuario_id"
              name="usuario_id"
              value={id}
            />

            <div className="space-y-1">
              <label htmlFor="sugestao_melhoria_descricao" className="block text-sm font-medium text-gray-700">Detalhes da Sugestão *</label>
              <textarea
                id="sugestao_melhoria_descricao"
                name="sugestao_melhoria_descricao"
                rows={4}
                required
                value={formData.sugestao_melhoria_descricao}
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

        {/* Benefits Section */}
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
                  <strong className="text-indigo-700">Receba pontos</strong> por sugestão enviada
                  <p className="text-xs text-gray-500 mt-1">Pontos creditados após análise da sugestão</p>
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