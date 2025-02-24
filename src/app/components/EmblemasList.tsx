// import Image from "next/image";

// export default function EmblemasList({ emblemas, handleOpenModal }) {
//   return (
//     <div className="p-6 bg-purple-800 rounded-lg shadow-lg">
//       <h3 className="text-2xl font-bold text-white mb-6 text-center">🏅 Emblemas Conquistados</h3>
//       <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 place-items-center">
//         {emblemas.map((emblema) => (
//           <div
//             key={emblema.emblema_id}
//             className="group relative w-20 h-20 rounded-full cursor-pointer overflow-hidden border-2 border-purple-500 hover:border-yellow-400 transition-all duration-300 hover:scale-110"
//             onClick={() => handleOpenModal(emblema)}
//           >
//             <Image
//               src={emblema.emblema_imagem}
//               alt={`Emblema ${emblema.emblema_nome}`}
//               className="object-cover w-full h-full"
//               width={80}
//               height={80}
//             />
//             {/* Overlay de detalhes */}
//             <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <span className="text-xs font-semibold text-yellow-300">Ver Detalhes</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// BLOQUEADO 
// import Image from "next/image";

// export default function EmblemasList({ emblemas, handleOpenModal }) {
//   return (
//     <div className="p-6 bg-purple-800 rounded-lg shadow-lg">
//       <h3 className="text-2xl font-bold text-white mb-6 text-center">🏅 Emblemas Conquistados</h3>
//       <div className="flex flex-wrap gap-6 p-2 sm:grid-cols-4 md:grid-cols-6 rounded-sm shadow-sm">
//         {emblemas.map((emblema) => (
//          <div
//          key={emblema.emblema_id}
//          className={`group relative w-20 h-20 rounded-full cursor-pointer overflow-hidden border-2 ${
//            emblema.conquistado ? 'border-purple-500 hover:border-yellow-400' : 'border-gray-500 opacity-50'
//          } transition-all duration-300 hover:scale-110`}
//          onClick={() => emblema.conquistado && handleOpenModal(emblema)}
//        >
//          <Image
//            src={emblema.emblema_imagem}
//            alt={`Emblema ${emblema.emblema_nome}`}
//            className="object-cover w-full h-full"
//            width={80}
//            height={80}
//          />
//          {!emblema.conquistado && (
//            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
//              <span className="text-xs font-semibold text-white">🔒</span>
//            </div>
//          )}
//          {emblema.conquistado && (
//            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//              <span className="text-xs font-semibold text-yellow-300">Ver Detalhes</span>
//            </div>
//          )}
//        </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import Image from "next/image";

// export default function EmblemasList({ emblemas, handleOpenModal }) {
//   return (
//     <div className="p-6 bg-purple-800 rounded-lg shadow-lg">
//       <h3 className="text-2xl font-bold text-white mb-6 text-center">🏅 Emblemas Conquistados</h3>
//          <div className="flex flex-wrap gap-6 bg-purple-700 p-2 rounded-sm shadow-sm">
//       {/* <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 place-items-center"> */}
//         {emblemas.map((emblema) => (
//           <div
//             key={emblema.emblema_id}
//             className="group relative w-20 h-20 rounded-full cursor-pointer overflow-hidden border-2 border-purple-500 hover:border-yellow-400 transition-all duration-300 hover:scale-110"
//             onClick={() => handleOpenModal(emblema)}
//           >
//             <Image
//               src={emblema.emblema_imagem}
//               alt={`Emblema ${emblema.emblema_nome}`}
//               className="object-cover w-full h-full"
//               width={80}
//               height={80}
//             />
//             {/* Overlay de detalhes */}
//             <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <span className="text-xs font-semibold text-yellow-300">Ver Detalhes</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import Image from "next/image";

// export default function EmblemasList({ emblemas, handleOpenModal }) {
//   return (
//     <div className="p-6 bg-purple-800 rounded-lg shadow-lg">
//       <h3 className="text-2xl font-bold text-white mb-6 text-center">🏅 Emblemas Conquistados</h3>
//       <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 place-items-center">
//         {emblemas.map((emblema, index) => {
//           const desbloqueado = index === 0; // Apenas o primeiro é desbloqueado
//           return (
//             <div
//               key={emblema.emblema_id}
//               className={`group relative w-20 h-20 rounded-full overflow-hidden border-2 transition-all duration-300 ${
//                 desbloqueado
//                   ? "cursor-pointer border-purple-500 hover:border-yellow-400 hover:scale-110"
//                   : "border-gray-500 opacity-50 cursor-not-allowed"
//               }`}
//               onClick={() => desbloqueado && handleOpenModal(emblema)}
//             >
//               <Image
//                 src={emblema.emblema_imagem}
//                 alt={`Emblema ${emblema.emblema_nome}`}
//                 className="object-cover w-full h-full"
//                 width={80}
//                 height={80}
//               />
//               {/* Bloqueado: Mostrar ícone 🔒 */}
//               {!desbloqueado && (
//                 <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
//                   <span className="text-xs font-semibold text-white">🔒</span>
//                 </div>
//               )}
//               {/* Desbloqueado: Mostrar hover "Ver Detalhes" */}
//               {desbloqueado && (
//                 <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <span className="text-xs font-semibold text-yellow-300">Ver Detalhes</span>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


// import Image from "next/image";

// export default function EmblemasList({ emblemas, handleOpenModal }) {
//   return (
//     <div className="p-6 bg-purple-800 rounded-lg shadow-lg">
//       <h3 className="text-2xl font-bold text-white mb-6 text-center">🏅 Emblemas Conquistados</h3>
//       <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 place-items-center">
//         {emblemas.map((emblema) => (
//           <div
//             key={emblema.emblema_id}
//             className={`group relative w-20 h-20 rounded-full overflow-hidden border-2 transition-all duration-300 ${
//               emblema.conquistado
//                 ? "border-purple-500 hover:border-yellow-400 hover:scale-110 cursor-pointer"
//                 : "border-gray-500 opacity-50 cursor-not-allowed"
//             }`}
//             onClick={() => emblema.conquistado && handleOpenModal(emblema)}
//             aria-label={emblema.conquistado ? `Emblema conquistado: ${emblema.emblema_nome}` : "Emblema bloqueado"}
//           >
//             <Image
//               src={emblema.emblema_imagem}
//               alt={`Emblema ${emblema.emblema_nome}`}
//               className="object-cover w-full h-full"
//               width={80}
//               height={80}
//             />
//             {/* Emblema bloqueado */}
//             {!emblema.conquistado && (
//               <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
//                 <span className="text-xs font-semibold text-white">🔒</span>
//               </div>
//             )}
//             {/* Emblema conquistado (hover "Ver Detalhes") */}
//             {emblema.conquistado && (
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <span className="text-xs font-semibold text-yellow-300">Ver Detalhes</span>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import Image from "next/image";

export default function EmblemasList({ emblemas, handleOpenModal }) {
  return (
    <div className="p-6 bg-purple-800 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">🏅 Emblemas Conquistados</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 place-items-center">
        {emblemas.map((emblema, index) => {
          const desbloqueado = index === 0 || emblema.conquistado; // Primeiro emblema ou conquistado é interativo
          return (
            <div
              key={emblema.emblema_id}
              className={`group relative w-20 h-20 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                desbloqueado
                  ? "cursor-pointer border-gray-400 hover:border-gray-400 hover:scale-110"
                  : "border-gray-500 opacity-50 cursor-not-allowed"
              }`}
              onClick={() => desbloqueado && handleOpenModal(emblema)}
              aria-label={desbloqueado ? `Emblema conquistado: ${emblema.emblema_nome}` : "Emblema bloqueado"}
            >
              <Image
                src={emblema.emblema_imagem}
                alt={`Emblema ${emblema.emblema_nome}`}
                className="object-cover w-full h-full"
                width={80}
                height={80}
              />
              {/* Emblema bloqueado: Mostrar 🔒 */}
              {!desbloqueado && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">🔒</span>
                </div>
              )}
              {/* Emblema conquistado/desbloqueado: Mostrar hover "Ver Detalhes" */}
              {desbloqueado && (
                <div className="absolute inset-0 bg-purple-600 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-semibold text-white ml-1">Ver Detalhes</span>
                </div>


              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
