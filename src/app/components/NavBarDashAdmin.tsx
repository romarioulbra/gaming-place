// import { FaUser, FaGamepad, FaLayerGroup,FaMeteor,FaTachometerAlt,FaLightbulb } from "react-icons/fa";
// import Link from "next/link";


// export default function NavBarDashAdmin({changePage}) {
//   return (
//      <>
//         <nav className="mt-10 space-y-4 px-4">
//           <Link
//             href="#configuracao"
//             onClick={() => changePage("configuracao")}
//             className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
//           >
//             <FaTachometerAlt className="mr-2" />
//             <span>Dashboard</span>
//           </Link>

//           <Link
//             href="#usuarios"
//             onClick={() => changePage("usuarios")}
//             className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
//           >
//             <FaUser className="mr-2" />
//             <span>Usuários</span>
//           </Link>

//           <Link
//             href="#jogos"
//             onClick={() => changePage("jogos")}
//             className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
//           >
//             <FaGamepad className="mr-2" />
//             <span>Jogos</span>
//           </Link>

//           <Link
//             href="#jogos_categoria"
//             onClick={() => changePage("jogos_categoria")}
//             className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
//           >
//             <FaLayerGroup className="mr-2" />
//             <span>Categorias</span>
//           </Link>

//           <Link
//             href="#emblemas"
//             onClick={() => changePage("emblemas")}
//             className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
//           >
//             <FaMeteor className="mr-2" />
//             <span>Emblemas</span>
//           </Link>


//           <Link
//             href="#sugestoes"
//             onClick={() => changePage("sugestoes")}
//             className="relative flex items-center px-4 py-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition"
//           >
//             <FaLightbulb className="mr-2" />
//             <span>Sugestão e Melhoria</span>
//           </Link>
//         </nav>
//      </>
//   );
// }




// import { useState } from "react";
// import {
//   FaUser,
//   FaGamepad,
//   FaLayerGroup,
//   FaMeteor,
//   FaTachometerAlt,
//   FaLightbulb,
//   FaChevronDown,
//   FaStar,
//   FaTag,
// } from "react-icons/fa";
// import Link from "next/link";

// export default function NavBarDashAdmin({ changePage }) {
//   const [openMenus, setOpenMenus] = useState({
//     emblemas: false,
//     jogos: false,
//   });

//   const [activePage, setActivePage] = useState("");

//   const toggleMenu = (menuName) => {
//     setOpenMenus((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
//   };

//   const handleChangePage = (page) => {
//     setActivePage(page);
//     changePage(page);
//   };

//   const baseClass = "flex items-center px-4 py-3 rounded-lg transition";
//   const activeClass = "bg-indigo-600 text-white";
//   const inactiveClass = "bg-indigo-700 hover:bg-indigo-600 text-white";

//   return (
//     <nav className="mt-10 space-y-2 px-4 text-sm">
//       {/* Dashboard */}
//       <Link
//         href="#configuracao"
//         onClick={() => handleChangePage("configuracao")}
//         className={`${baseClass} ${activePage === "configuracao" ? activeClass : inactiveClass}`}
//       >
//         <FaTachometerAlt className="mr-2" />
//         Dashboard
//       </Link>

//       {/* Usuários */}
//       <Link
//         href="#usuarios"
//         onClick={() => handleChangePage("usuarios")}
//         className={`${baseClass} ${activePage === "usuarios" ? activeClass : inactiveClass}`}
//       >
//         <FaUser className="mr-2" />
//         Usuários
//       </Link>

//       {/* Jogos com submenu */}
//       <div className={`${inactiveClass} rounded-lg`}>
//         <button
//           onClick={() => toggleMenu("jogos")}
//           className="w-full flex items-center justify-between px-4 py-3"
//         >
//           <div className="flex items-center">
//             <FaGamepad className="mr-2" />
//             Jogos
//           </div>
//           <FaChevronDown
//             className={`transition-transform ${openMenus.jogos ? "rotate-180" : ""}`}
//           />
//         </button>
//         {openMenus.jogos && (
//           <div className="pl-10 pb-2 text-white">
//             <Link
//               href="#jogos"
//               onClick={() => handleChangePage("jogos")}
//               className={`block py-1 hover:text-gray-300 ${activePage === "jogos" ? "text-yellow-400" : ""}`}
//             >
//               <FaStar className="inline mr-2" />
//               Todos os Jogos
//             </Link>
//             <Link
//               href="#jogos_categoria"
//               onClick={() => handleChangePage("jogos_categoria")}
//               className={`block py-1 hover:text-gray-300 ${activePage === "jogos_categoria" ? "text-yellow-400" : ""}`}
//             >
//               <FaTag className="inline mr-2" />
//               Categorias de Jogos
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Emblemas com submenu */}
//       <div className={`${inactiveClass} rounded-lg`}>
//         <button
//           onClick={() => toggleMenu("emblemas")}
//           className="w-full flex items-center justify-between px-4 py-3"
//         >
//           <div className="flex items-center">
//             <FaMeteor className="mr-2" />
//             Emblemas
//           </div>
//           <FaChevronDown
//             className={`transition-transform ${openMenus.emblemas ? "rotate-180" : ""}`}
//           />
//         </button>
//         {openMenus.emblemas && (
//           <div className="pl-10 pb-2 text-white">
//             <Link
//               href="#emblemas"
//               onClick={() => handleChangePage("emblemas")}
//               className={`block py-1 hover:text-gray-300 ${activePage === "emblemas" ? "text-yellow-400" : ""}`}
//             >
//               <FaMeteor className="inline mr-2" />
//               Emblemas
//             </Link>
//             <Link
//               href="#tipo_emblemas"
//               onClick={() => handleChangePage("tipo_emblemas")}
//               className={`block py-1 hover:text-gray-300 ${activePage === "tipo_emblemas" ? "text-yellow-400" : ""}`}
//             >
//               <FaLayerGroup className="inline mr-2" />
//               Categoria de Emblemas
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Sugestões */}
//       <Link
//         href="#sugestoes"
//         onClick={() => handleChangePage("sugestoes")}
//         className={`${baseClass} ${activePage === "sugestoes" ? activeClass : inactiveClass}`}
//       >
//         <FaLightbulb className="mr-2" />
//         Sugestão e Melhoria
//       </Link>
//     </nav>
//   );
// }


import { useState } from "react";
import { CgGames } from "react-icons/cg";
import { GiFallingBlob} from "react-icons/gi";
import { 
  FaUser, 
  FaGamepad,
  FaMeteor, 
  FaTachometerAlt, 
  FaLightbulb, 
  FaChevronDown
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function NavBarDashAdmin({ changePage }) {
  const [openMenus, setOpenMenus] = useState({
    emblemas: false,
    jogos: false,
  });

  const [activePage, setActivePage] = useState("");

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  const handleChangePage = (page) => {
    setActivePage(page);
    changePage(page);
  };

  const baseClass = "flex items-center px-4 py-3 rounded-lg transition-all duration-200";
  const activeClass = "bg-indigo-600 text-white shadow-md";
  const inactiveClass = "bg-indigo-700 hover:bg-indigo-600 text-white hover:shadow-md";

  // Animação para os submenus
  const subMenuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <nav className="mt-10 space-y-2 px-4 text-sm">
      {/* Dashboard */}
      <Link
        href="#configuracao"
        onClick={() => handleChangePage("configuracao")}
        className={`${baseClass} ${activePage === "configuracao" ? activeClass : inactiveClass}`}
      >
        <FaTachometerAlt className="mr-2" />
        Dashboard
      </Link>

      {/* Usuários */}
      <Link
        href="#usuarios"
        onClick={() => handleChangePage("usuarios")}
        className={`${baseClass} ${activePage === "usuarios" ? activeClass : inactiveClass}`}
      >
        <FaUser className="mr-2" />
        Usuários
      </Link>

      {/* Jogos com submenu */}
      <div className={`${inactiveClass} rounded-lg transition-all duration-200 ${openMenus.jogos ? 'bg-indigo-600' : ''}`}>
        <button
          onClick={() => toggleMenu("jogos")}
          className="w-full flex items-center justify-between px-4 py-3"
        >
          <div className="flex items-center">
            <FaGamepad className="mr-2" />
            Jogos
          </div>
          <motion.div
            animate={{ rotate: openMenus.jogos ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronDown />
          </motion.div>
        </button>
        
        <AnimatePresence>
          {openMenus.jogos && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={subMenuVariants}
              className="overflow-hidden"
            >
              <div className="pl-10 pb-2 pt-1 space-y-2 text-white">
                <Link
                  href="#jogos"
                  onClick={() => handleChangePage("jogos")}
                  className={`flex items-center py-2 px-3 rounded-md transition-all hover:bg-indigo-500 ${activePage === "jogos" ? "bg-indigo-500 text-yellow-300" : ""}`}
                >
                  {/* <FaList className="mr-2" /> */}
                  <FaGamepad className="mr-2" />
                  {/* <GiGamepad className="mr-2" /> */}
                  Jogos
                </Link>
                <Link
                  href="#jogos_categoria"
                  onClick={() => handleChangePage("jogos_categoria")}
                  className={`flex items-center py-2 px-3 rounded-md transition-all hover:bg-indigo-500 ${activePage === "jogos_categoria" ? "bg-indigo-500 text-yellow-300" : ""}`}
                >
                  {/* <GiGamepadCross className="mr-2" /> */}
                  <CgGames className="mr-2" />
                  Categorias de Jogos
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Emblemas com submenu */}
      <div className={`${inactiveClass} rounded-lg transition-all duration-200 ${openMenus.emblemas ? 'bg-indigo-600' : ''}`}>
        <button
          onClick={() => toggleMenu("emblemas")}
          className="w-full flex items-center justify-between px-4 py-3"
        >
          <div className="flex items-center">
            <FaMeteor className="mr-2" />
            Emblemas
          </div>
          <motion.div
            animate={{ rotate: openMenus.emblemas ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronDown />
          </motion.div>
        </button>
        
        <AnimatePresence>
          {openMenus.emblemas && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={subMenuVariants}
              className="overflow-hidden"
            >
              <div className="pl-10 pb-2 pt-1 space-y-2 text-white">
                <Link
                  href="#emblemas"
                  onClick={() => handleChangePage("emblemas")}
                  className={`flex items-center py-2 px-3 rounded-md transition-all hover:bg-indigo-500 ${activePage === "emblemas" ? "bg-indigo-500 text-yellow-300" : ""}`}
                >
                  <FaMeteor className="mr-2" />
                  Emblemas
                </Link>
                <Link
                  href="#emblemas_categorias"
                  onClick={() => handleChangePage("emblemas_categoria")}
                  className={`flex items-center py-2 px-3 rounded-md transition-all hover:bg-indigo-500 ${activePage === "emblemas_categorias" ? "bg-indigo-500 text-yellow-300" : ""}`}
                >
                  <GiFallingBlob className="mr-2" />
                  Categoria de Emblemas
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sugestões */}
      <Link
        href="#sugestoes"
        onClick={() => handleChangePage("sugestoes")}
        className={`${baseClass} ${activePage === "sugestoes" ? activeClass : inactiveClass}`}
      >
        <FaLightbulb className="mr-2" />
        Sugestão e Melhoria
      </Link>
    </nav>
  );
}