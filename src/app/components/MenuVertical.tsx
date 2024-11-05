import Link from 'next/link';
import { FaHome,FaUsersCog,FaGamepad } from "react-icons/fa";
import { CgGames } from "react-icons/cg";

export default function MenuVertical() {
  return (
      <>
        <div className="w-64 bg-purple-800 text-white h-screen p-4 text-bold mt-5 ">
          <ul className="space-y-2">
            <li>
              <Link href="/configuracao" className="flex items-center p-3 rounded hover:bg-purple-900 hover:border-white hover:border-l-2">
                <FaHome className='w-6 h-6  text-gray-400'/>
                  <span className="ml-3">Home</span>
               </Link>
            </li>
            <li>
              <Link href="/configuracao/usuarios" className="flex items-center p-3 rounded hover:bg-purple-900 hover:border-white hover:border-l-2">
                  <FaUsersCog className='w-6 h-6  text-gray-400'/>
                  <span className="ml-3">Usuários</span>
              </Link>
            </li>
            <li>
              <Link href="/configuracao/jogos" className="flex items-center p-3 rounded hover:bg-purple-900 hover:border-white hover:border-l-2">
                  <FaGamepad className='w-6 h-6  text-gray-400'/>
                  <span className="ml-3">Jogos</span>
              </Link>
            </li>
            <li>
              <Link href="/configuracao/jogosCategoria" className="flex items-center p-3 rounded hover:bg-purple-900 hover:border-white hover:border-l-2">
                <CgGames className='w-6 h-6  text-gray-400'/>
                <span className="ml-3">Categoria de Jogos</span>
              </Link>
            </li>
          </ul>
        </div>        
      </>
    );
}
