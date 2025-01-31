// Modelo 1 - Não apagar

// "use client";
// import { useState } from "react";
// import { FaLock, FaSignInAlt } from "react-icons/fa";

// export default function LoginRequiredPage() {
//   const [isHovered, setIsHovered] = useState(false);

//   const handleHover = () => setIsHovered((prev) => !prev);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700">
//       <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
//         {/* Ícone com animação */}
//         <div
//           className={`p-6 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full mb-6 shadow-lg transform ${
//             isHovered ? "rotate-12 scale-110" : "rotate-0 scale-100"
//           } transition-all duration-300`}
//           onMouseEnter={handleHover}
//           onMouseLeave={handleHover}
//         >
//           <FaLock className="text-4xl" />
//         </div>

//         {/* Mensagem */}
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">
//           Acesso Restrito
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Para acessar este sistema, é necessário estar logado na sua conta.
//           Por favor, faça login para continuar.
//         </p>

//         {/* Botão de Login */}
//         <button
//           onClick={() => alert("Redirecionando para login...")}
//           className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 hover:scale-105 transition-all duration-300"
//         >
//           <FaSignInAlt className="text-xl" />
//           Fazer Login
//         </button>
//       </div>

//       {/* Animações de fundo */}
//       <div className="absolute top-0 left-0 w-64 h-64 bg-purple-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-30 rounded-full blur-2xl animate-spin-slow"></div>
//     </div>
//   );
// }


// Modelo 2 - Não apagar

// "use client";

// import { IoMdWarning } from 'react-icons/io';
// import { FaLock } from 'react-icons/fa';

// export default function AcessoNegado() {

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-500 via-black to-gray-800">
//       <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
//         <div className="text-6xl text-red-500 mb-6 animate-bounce">
//           <IoMdWarning />
//         </div>
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">Acesso Negado</h2>
//         <p className="text-lg text-gray-600 mb-6">Para acessar o sistema, você deve estar logado na sessão.</p>
//         <div className="flex justify-center mb-4">
//           <FaLock className="text-4xl text-gray-800 animate-pulse" />
//         </div>
//         <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105">
//           Voltar para o Login
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { IoMdWarning } from 'react-icons/io';
import { FaLock } from 'react-icons/fa';
import Link from 'next/link';

export default function AcessoNegado() {

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-200 to-red-300">
    <div className="flex items-center justify-center min-h-screen">
    <div className="text-center p-10 bg-white shadow-2xl rounded-3xl max-w-lg w-full transform transition-all hover:scale-105 hover:shadow-3xl duration-300 ease-in-out border border-rose-100">
      <div className="text-7xl text-red-600 mb-6 animate-pulse">
        <IoMdWarning />
      </div>
      <h2 className="text-4xl font-semibold text-gray-800 mb-4 tracking-tight">Acesso Negado</h2>
      <p className="text-lg text-gray-500 mb-6">Para acessar o sistema, você deve estar logado na sessão.</p>
      <div className="flex justify-center mb-4">
        <FaLock className="text-5xl text-gray-700 animate-bounce" />
      </div>
      <Link href="/conta">
      <button className="px-8 py-4 bg-rose-500 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110">
        Efetuar Login
      </button>
      </Link>
    </div>
  </div>
  );
}
