// 'use client';

// import Image from 'next/image';

// export default function EmblemasList({ emblemas, handleOpenModal }) {
//   return (
//     <div className="p-2">
//       <h3 className="text-lg font-bold">Emblemas</h3>
//       <div className="flex space-x-4 mt-2 bg-purple-600 p-2 rounded shadow">
//         {emblemas.map((emblema) => (
//           <Image
//             key={emblema.emblema_id}
//             src={`${emblema.emblema_imagem}`} // Caminho correto das imagens
//             alt={`Emblema ${emblema.emblema_nome}`}
//             className="w-16 h-16 rounded-full cursor-pointer object-cover border-white border-2 p-1"
//             width={100}
//             height={100}
//             onClick={() => handleOpenModal(emblema)} // Abre o modal ao clicar
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


'use client';

import Image from 'next/image';

export default function EmblemasList({ emblemas, handleOpenModal }) {
  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold text-white mb-4">Emblemas</h3>
      <div className="flex flex-wrap gap-6 bg-purple-700 p-2 rounded-sm shadow-sm">
        {emblemas.map((emblema) => (
          <div
            key={emblema.emblema_id}
            className="group relative w-16 h-16 rounded-full cursor-pointer overflow-hidden border-2 border-transparent hover:border-yellow-400 transition-all duration-300 hover:scale-105"
            onClick={() => handleOpenModal(emblema)}
          >
            <Image
              src={`${emblema.emblema_imagem}`} // Caminho correto das imagens
              alt={`Emblema ${emblema.emblema_nome}`}
              className="object-cover w-full h-full"
              // className="w-16 h-16 rounded-full cursor-pointer object-cover border-white border-2 p-1"
              width={105}
              height={105}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-bold text-center text-yellow-300">Ver Detalhes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



// 'use client';

// import Image from 'next/image';

// export default function EmblemasList({ emblemas, handleOpenModal }) {
//   return (
//     <div className="p-4">
//       <h3 className="text-2xl font-bold text-white mb-4">Emblemas</h3>
//       <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 bg-purple-800 p-3 rounded-md shadow-md">
//         {emblemas.map((emblema) => (
//           <div
//             key={emblema.emblema_id}
//             className="group relative w-16 h-16 rounded-full cursor-pointer overflow-hidden border-2 border-transparent hover:border-yellow-400 transition-all duration-300 hover:scale-105"
//             onClick={() => handleOpenModal(emblema)}
//           >
//             <Image
//               src={`${emblema.emblema_imagem}`} // Caminho correto das imagens
//               alt={`Emblema ${emblema.emblema_nome}`}
//               className="object-cover w-full h-full"
//               width={64}
//               height={64}
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <span className="text-yellow-300 text-xs font-medium text-center">
//                 Ver Detalhes
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
