import Link from 'next/link';
import { FaHome,FaUsersCog,FaGamepad } from "react-icons/fa";
import { CgGames } from "react-icons/cg";

export default function MenuVertical() {

  const listaData = [
    {
      title: "Home",
      icone: <FaHome className='w-6 h-6  text-gray-400'/>,
      link: "/configuracao"
    },
    {
      title: "Usuários",
      icone: <FaUsersCog className='w-6 h-6  text-gray-400'/>,
      link: "/configuracao/usuarios"
    },
   {
      title: "Jogos",
      icone:<FaGamepad className='w-6 h-6  text-gray-400'/>,
      link: "/configuracao/jogos"
    },
    {
      title: "Categorias de Jogos",
      icone:<CgGames className='w-6 h-6  text-gray-400'/>,
      link: "/configuracao/jogos_categoria"
    }
  ];

    return (
      <>
        <div className="w-64 bg-purple-800 text-white h-screen p-4 text-bold mt-5 ">
          <ul className="space-y-2">
            <li>
              {listaData.map((lista, index) => (
                <Link key={index} href={lista.link} className="flex items-center p-3 rounded hover:bg-purple-900 hover:border-white hover:border-l-2">
                    {lista.icone}
                    <span className="ml-3">{lista.title}</span> 
                </Link>
              ))}
            </li>
          </ul>
        </div>        
      </>
    );
}
