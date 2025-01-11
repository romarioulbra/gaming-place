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
