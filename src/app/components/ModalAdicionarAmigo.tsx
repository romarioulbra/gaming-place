'use client';
import { useEffect, useState } from 'react';
import EmailForm from './EmailForm';

export default function ModalAdicionarAmigo({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;
  const isSmallMobile = windowSize.width < 400;
  // const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  if (!isOpen) return null;

  // Componente auxiliar para os itens da lista
  const ListItem = ({ border, points, children, showFull = true }: { border: string; points?: string; children: React.ReactNode; showFull?: boolean }) => {
    const borderColors = {
      green: 'border-green-500',
      blue: 'border-blue-500',
      purple: 'border-purple-500',
      yellow: 'border-yellow-500'
    };

    const textColors = {
      green: 'text-green-500',
      blue: 'text-blue-500',
      purple: 'text-purple-500',
      yellow: 'text-yellow-500'
    };

    return (
      <li className={`flex items-start bg-white/80 p-2 sm:p-3 rounded-lg border-l-4 ${borderColors[border]} hover:bg-white hover:shadow-sm sm:hover:shadow-md hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-300`}>
        <span className={`${textColors[border]} font-bold mr-1 sm:mr-2 hover:scale-110 sm:hover:scale-125 transition-transform duration-200 text-xs sm:text-sm`}>✓</span>
        <span className="group-hover:text-gray-900 transition-colors duration-300 text-xs sm:text-sm">
          {children}
          {points && showFull && <strong className={`text-indigo-700 group-hover:text-indigo-900 transition-colors duration-300 ml-1`}> {points} pontos</strong>}
        </span>
      </li>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity duration-300 p-2 sm:p-4 md:p-6">
      <div className={`relative w-full max-w-4xl bg-white text-gray-800 rounded-lg md:rounded-xl shadow-lg md:shadow-2xl overflow-hidden flex flex-col ${isDesktop ? 'lg:flex-row' : ''} h-auto max-h-[95vh] md:max-h-[90vh] lg:h-[80vh] xl:h-[70vh] border border-indigo-100 md:border-2 transform transition-all duration-500 scale-95 hover:scale-100 overflow-y-auto`}>
        
        {/* Seção do formulário */}
        <div className={`w-full ${isDesktop ? 'lg:w-1/2' : ''} p-4 sm:p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-white to-indigo-50 hover:to-indigo-100 transition-all duration-500 ${isMobile ? 'order-2' : ''}`}>
          <div className="text-center mb-4 sm:mb-6 md:mb-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-700 mb-1 sm:mb-2 drop-shadow-md">Indique Amigos</h2>
            <p className="text-indigo-500 font-medium text-xs sm:text-sm md:text-base animate-pulse">
              {isSmallMobile ? 'Ganhe pontos' : 'Ganhe recompensas'}
              {!isSmallMobile && isMobile && ' por indicação'}
              {!isMobile && ' por cada amigo cadastrado'}
            </p>
          </div>
          <EmailForm/>
        </div>

        {/* Seção de informações */}
        <div className={`w-full ${isDesktop ? 'lg:w-1/2' : ''} p-4 sm:p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-500 ${isMobile ? 'order-1' : ''}`}>
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <div className="flex items-center mb-3 sm:mb-4 md:mb-6 group">
              <div className="bg-indigo-600 text-white p-1 sm:p-2 rounded-lg mr-2 sm:mr-3 transform group-hover:rotate-6 transition-transform duration-300 shadow-sm sm:shadow-lg group-hover:shadow-indigo-400/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-indigo-800 group-hover:text-indigo-900 transition-colors duration-300">
                {isSmallMobile ? 'VANTAGENS' : 'VANTAGENS DO PROGRAMA'}
              </h3>
            </div>

            <ul className="space-y-2 sm:space-y-3 md:space-y-4">
              <ListItem border="green" points="100" showFull={!isSmallMobile}>
                Indique amigos e ganhe
              </ListItem>
              
              <ListItem border="blue" points="50" showFull={!isSmallMobile}>
                Amigos ganham {!isSmallMobile && (isMobile ? 'bônus' : 'de boas-vindas')}
              </ListItem>
              
              {!isMobile && (
                <>
                  <ListItem border="purple" points="">
                    Troque pontos por recompensas
                  </ListItem>
                  <ListItem border="yellow" points="">
                    Desbloqueie benefícios exclusivos
                  </ListItem>
                </>
              )}
            </ul>

            <div className="mt-3 sm:mt-4 md:mt-6 bg-white/90 p-2 sm:p-3 md:p-4 rounded-lg border border-indigo-100 shadow-xs sm:shadow-sm md:shadow-md hover:shadow-md hover:border-indigo-200 transition-all duration-300">
              <h4 className="font-bold text-indigo-700 mb-1 sm:mb-2 md:mb-3 flex items-center hover:text-indigo-800 transition-colors duration-300 text-xs sm:text-sm md:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-2 text-indigo-500 hover:rotate-12 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Como funciona?
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-xxs sm:text-xs md:text-sm text-gray-700 pl-1 sm:pl-2">
                <li className="pb-0 sm:pb-1 hover:text-gray-900 transition-colors duration-200">
                  {isSmallMobile ? 'Preencha os dados' : 'Preencha os dados do amigo'}
                </li>
                <li className="pb-0 sm:pb-1 hover:text-gray-900 transition-colors duration-200">
                  {isSmallMobile ? 'Nós enviamos' : 'Nós enviaremos o convite'}
                </li>
                {!isSmallMobile && (
                  <li className="hover:text-gray-900 transition-colors duration-200">
                    Você ganha pontos {isMobile ? '' : 'quando ele ativar a conta'}
                  </li>
                )}
              </ol>
            </div>

            {!isSmallMobile && (
              <div className="mt-2 sm:mt-3 md:mt-4 flex items-start bg-indigo-100/50 p-1 sm:p-2 md:p-3 rounded-lg hover:bg-indigo-200/30 hover:shadow-inner transition-all duration-300">
                <span className="text-indigo-600 mr-1 sm:mr-2 hover:animate-bounce transition-transform duration-500 text-xs">💡</span>
                <p className="text-xxs sm:text-xs md:text-sm text-indigo-700 hover:text-indigo-800 transition-colors duration-300">
                  <strong className="font-semibold">Dica:</strong> {isMobile ? 'Indique mais amigos!' : 'Indique mais amigos para melhores recompensas!'}
                </p>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={() => setIsOpen(false)}
          className={`absolute top-1 right-1 sm:top-2 sm:right-2 md:top-3 md:right-3 lg:top-4 lg:right-4 text-indigo-600 hover:text-indigo-900 bg-white/80 hover:bg-white p-0.5 sm:p-1 md:p-2 rounded-full shadow-xs sm:shadow-sm transition-all duration-300 hover:rotate-90 hover:shadow-md focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
          aria-label="Fechar modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}