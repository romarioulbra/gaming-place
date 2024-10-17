'use client'
import Link from 'next/link';
// import { FaRocket} from 'react-icons/fa'; // Ícones para os cards

import { FaGear,FaUsersGear,FaGamepad    } from "react-icons/fa6";
import { GiGamepadCross } from "react-icons/gi";


export default function CardsGrid() {
  const cardsData = [
    {
      title: "Configurações Gerais",
      icon: <FaGear />,
      gradientFrom: "from-pink-500",
      gradientTo: "to-red-500",
      link: "/configuracao/geral"
    },
    {
      title: "Usuários",
      icon: <FaUsersGear  />,
      gradientFrom: "from-blue-500",
      gradientTo: "to-purple-500",
      link: "/configuracao/usuarios"
    },
   {
      title: "Jogos",
      icon: <FaGamepad  />,
      gradientFrom: "from-yellow-500",
      gradientTo: "to-orange-500",
      link: "/configuracao/jogos"
    },
    {
      title: "Categorias de Jogos",
      icon: <GiGamepadCross />,
      gradientFrom: "from-green-500",
      gradientTo: "to-teal-500",
      link: "/configuracao/jogosCategoria"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardsData.map((card, index) => (
        <Link key={index} href={card.link}>
          <div
            className={`p-6 rounded-xl bg-gradient-to-r ${card.gradientFrom} ${card.gradientTo} transform transition-transform duration-300 hover:scale-105 hover:shadow-xl text-white text-center cursor-pointer`}
          >
              <div className="text-4xl mb-4 ">{card.icon}</div>
              <h3 className=" text-xl font-bold text-wrap">{card.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
