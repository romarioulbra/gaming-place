import { FaUser, FaGamepad, FaLayerGroup,FaMeteor,FaTachometerAlt } from "react-icons/fa";
import Link from "next/link";


export default function NavBarDashAdmin({changePage}) {
  return (
     <>
        <nav className="mt-10 space-y-4 px-4">
          <Link
            href="#configuracao"
            onClick={() => changePage("configuracao")}
            className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
          >
            <FaTachometerAlt className="mr-2" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="#usuarios"
            onClick={() => changePage("usuarios")}
            className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
          >
            <FaUser className="mr-2" />
            <span>Usuários</span>
          </Link>

          <Link
            href="#jogos"
            onClick={() => changePage("jogos")}
            className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
          >
            <FaGamepad className="mr-2" />
            <span>Jogos</span>
          </Link>

          <Link
            href="#jogos_categoria"
            onClick={() => changePage("jogos_categoria")}
            className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
          >
            <FaLayerGroup className="mr-2" />
            <span>Categorias</span>
          </Link>

          <Link
            href="#emblemas"
            onClick={() => changePage("emblemas")}
            className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
          >
            <FaMeteor className="mr-2" />
            <span>Emblemas</span>
          </Link>
        </nav>
     </>
  );
}


// import { useState } from "react";
// import { FaUser, FaGamepad, FaLayerGroup, FaMeteor, FaTachometerAlt, FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function NavBarDashAdmin({ changePage }) {
//   const [submenuOpen, setSubmenuOpen] = useState(false); // Estado para controlar o submenu
//   const router = useRouter();
  
  
//   return (
//     <>
//       <nav className="mt-10 space-y-4 px-4">
//         <Link
//           href="#configuracao"
//           onClick={() => changePage("configuracao")}
//           className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
//         >
//           <FaTachometerAlt className="mr-2" />
//           <span>Dashboard</span>
//         </Link>

//         {/* Item principal - Usuários */}
//         <div className="relative">
//           <button
//             onClick={() => setSubmenuOpen(!submenuOpen)}
//             className="relative flex items-center w-full px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
//           >
//             <FaUser className="mr-2" />
//             <span>Usuários</span>
//             {submenuOpen ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />}
//           </button>

//           {/* Submenu */}
//           {submenuOpen && (
//             <div className="mt-2 space-y-2 ml-6">
//               <Link
//                 href="#usuarios"
//                 onClick={() => changePage("usuarios")}
//                 className="relative flex items-center px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition"
//               >
//                 📋 Listar Usuários
//               </Link>

//               <Link
//                 href="#usuarios/cadastrar"
//                 onClick={() => changePage("usuarios/cadastrar")}
//                 className="relative flex items-center px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition"
//               >
//                 <FaPlus className="mr-2" />
//                 <span>Cadastrar</span>
//               </Link>
//             </div>
//           )}
//         </div>

//         <Link
//           href="#jogos"
//           onClick={() => changePage("jogos")}
//           className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
//         >
//           <FaGamepad className="mr-2" />
//           <span>Jogos</span>
//         </Link>

//         <Link
//           href="#jogos_categoria"
//           onClick={() => changePage("jogos_categoria")}
//           className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
//         >
//           <FaLayerGroup className="mr-2" />
//           <span>Categorias</span>
//         </Link>

//         <Link
//           href="#emblemas"
//           onClick={() => changePage("emblemas")}
//           className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
//         >
//           <FaMeteor className="mr-2" />
//           <span>Emblemas</span>
//         </Link>
//       </nav>
//     </>
//   );
// }
