'use client'
import { useState } from 'react';
import { FaAlignJustify,FaCogs,FaCog } from "react-icons/fa"; // Ajuste os imports dos ícones
import Link from 'next/link';
import MenuVertical from '../components/MenuVertical';

export default function Fly() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="absolute w-full top-0 z-10">
        <div className="flex justify-between p-4 ">          
          {/* Botão para abrir o Drawer */}
          <div className='mt-16'>
            <button onClick={toggleDrawer} className="p-2 border rounded hover:bg-gray-100 border-black shadow-sm shadow-slate-500">
              <FaCogs />
            </button>
          </div>
          {/* Conteúdo do Drawer */}
          {isDrawerOpen && (
            <div className="fixed inset-0 flex mt-20">
              <div className="bg-white w-64 p-6 shadow-lg">
                <div className="flex flex-col items-center mb-4">
                  <FaCog className="text-gray-600 cursor-pointer w-24 h-24 rounded-full" />
                  <h2 className="text-lg font-semibold mt-2 mb-2">Configurações</h2>
                  <MenuVertical/>
                </div>           
              </div>
              <div className="flex-1" onClick={toggleDrawer} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
