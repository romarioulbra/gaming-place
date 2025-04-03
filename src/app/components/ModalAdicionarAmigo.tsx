'use client';
import Image from 'next/image';
import EmailForm from './EmailForm';

export default function ModalAdicionarAmigo({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="relative w-[95%] max-w-4xl bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row h-[80vh]">
        {/* Imagem de fundo */}
        <div className="absolute inset-0">
          <Image 
            src="/img/astronauta-1.jpg" // Imagem temática de jogos
            alt="Background Gaming Place"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-30"
          />
        </div>

        {/* Seção do formulário */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative z-10 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
          {/* <h2 className="text-2xl md:text-3xl font-bold mb-6">Indique Amigos e Ganhe Pontos</h2> */}
          <EmailForm />
        </div>

        {/* Seção de informações sobre o programa de indicações */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative z-10 bg-gradient-to-l from-black/70 via-black/50 to-transparent">
          <div className="bg-blue-900/30 p-6 rounded-lg border border-indigo-500">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-400 text-gray-900 font-bold p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-yellow-400">PROGRAMA DE INDICAÇÕES</h3>
            </div>

            <ul className="space-y-4 text-gray-200">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Indique amigos e ganhe <strong className="text-white">100 pontos</strong> por cadastro ativo</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Seus amigos ganham <strong className="text-white">50 pontos</strong> de boas-vindas</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Troque seus pontos por <strong className="text-white">recompensas exclusivas</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Suba de nível e desbloqueie <strong className="text-white">benefícios especiais</strong></span>
              </li>
            </ul>

            <div className="mt-6 bg-gray-800/50 p-4 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Como funciona?</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                <li>Preencha o formulário com os dados do amigo</li>
                <li>Nós enviaremos um convite personalizado</li>
                <li>Quando ele se cadastrar e ativar a conta, você ganha pontos!</li>
              </ol>
            </div>

            <div className="mt-6 flex items-center">
              <div className="bg-purple-600 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-300">
                <span className="font-bold text-white">Dica:</span> Quanto mais amigos você indicar, mais rápido alcançará os melhores prêmios!
              </p>
            </div>
          </div>
        </div>

        {/* Botão de fechar */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-full z-20"
          aria-label="Fechar modal"
        >
          ✕
        </button>
      </div>
    </div>
  );
}