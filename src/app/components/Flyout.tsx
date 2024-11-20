// 'use client'
// import { useState } from 'react';
// import { FaCogs,FaCog} from "react-icons/fa"; // Ajuste os imports dos ícones
// import MenuVertical from '../components/MenuVertical';

// export default function Fly() {
  
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   return (
//     <>
//       <div className="absolute w-full top-0 z-10">
//         <div className="flex justify-between p-4 ">          
//           {/* Botão para abrir o Drawer */}
//           <div className='mt-16'>
//             <button onClick={toggleDrawer} className="p-2 border rounded hover:bg-gray-100 border-black shadow-sm shadow-slate-500">
//               <FaCogs />
//             </button>
//           </div>
//           {/* Conteúdo do Drawer */}
//           {isDrawerOpen && (
//             <div className="fixed inset-0 flex mt-16">
//               <div className="bg-white w-64 p-6 shadow-lg">
//                 <div className="flex flex-col items-center mb-4">
//                   <FaCog className="text-gray-600 cursor-pointer w-24 h-24 rounded-full" />
//                   <h2 className="text-lg font-semibold mt-2 mb-2">Configurações</h2>
//                   <MenuVertical/>
//                 </div>           
//               </div>
//               <div className="flex-1" onClick={toggleDrawer} />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

'use client';
import { useState } from 'react';
import { FaCogs, FaCog, FaTimes } from "react-icons/fa"; // Adicionado ícone para o botão de fechar
import MenuVertical from '../components/MenuVertical';

export default function Fly() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="absolute w-full top-0 z-10">
        <div className="flex justify-between p-4">
          {/* Botão para abrir o Drawer */}
          <div className='mt-16'>
            <button onClick={toggleDrawer} className="p-2 border rounded hover:bg-gray-100 border-black shadow-sm shadow-slate-500">
              <FaCogs />
            </button>
          </div>

          {/* Conteúdo do Drawer */}
          {isDrawerOpen && (
            <div className="fixed inset-0 flex mt-16 z-20">
              <div className="bg-white w-64 p-6 shadow-lg">
                {/* Botão de fechar no topo do Drawer */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-md text-center font-semibold ">Configurações</h2>
                  <button onClick={toggleDrawer} className="p-1 rounded hover:bg-gray-200">
                    <FaTimes className="text-gray-600 w-5 h-5" />
                  </button>
                </div>

                {/* Conteúdo do Drawer */}
                <div className="flex flex-col items-center">
                  <FaCog className="text-gray-600 cursor-pointer w-24 h-24 rounded-full mb-4" />
                  <MenuVertical />
                </div>
              </div>

              {/* Área fora do Drawer que fecha ao clicar */}
              <div className="flex-1 bg-black bg-opacity-50" onClick={toggleDrawer} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
