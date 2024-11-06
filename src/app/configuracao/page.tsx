'use client'
import CardsGrid from '../components/CardsPainel';

export default function ConfigPanel() {
  return (
    <>
      <div className="flex h-screen mt-9">
          {/* Menu Lateral */}
          {/* Painel Principal */}
          <div className="flex-1 bg-gray-100 p-6  sm:ml-0">
            <h1 className='text-center  font-bold text-2xl mt-5 mb-5 text-purple-700'>Painel de Configuração</h1>
            <CardsGrid 
            />
          </div>
      </div>
    </>
  );
}
