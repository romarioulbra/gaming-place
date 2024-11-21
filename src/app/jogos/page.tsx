// 'use client'
// import Navbar from '../components/MenuNavbar';
// import { FaUsers, FaHeart, FaBook, FaLeaf } from "react-icons/fa"; // Exemplos de ícones
// import CardCircular from '../components/CardCircular';
// import { useEffect,useState } from 'react';
// import axios from "axios";



// export default function Jogos() {
//     //Buscando Dados do BD para Recarregar na página
//     const [catJogos, setcatJogos] = useState([]);
//     useEffect(() => {
//       async function fetchCatJogos() {
//         try {
//           const response = await axios.get('/api/categoria_jogos');
//           setcatJogos(response.data);
//           // console.log(catJogos); 
//         } catch (error) {
//           console.error('Erro ao buscar Categoria de Jogos:', error);
//         }
//       }
//       fetchCatJogos();
//     }, []);

//      console.log(catJogos);

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-tr from-purple-100 to-white flex flex-col items-center justify-center px-6">
//         {/* Texto do Cabeçalho */}
//         <div className="text-center max-w-3xl mb-12">
//           <h2 className="text-4xl font-bold text-black mb-4">Explore Novos Jogos</h2>
//           <p className="text-gray-600 text-md leading-relaxed">
//             A plataforma oferece uma visibilidade sem precedentes aos desenvolvedores de jogos educacionais. Professores, pesquisadores e estudantes talentosos têm a oportunidade de compartilhar suas criações com o público, promovendo não apenas seus jogos, mas também a excelência na educação por meio da tecnologia. 
//           </p>
//         </div>

//         {/* Cartões Circulares */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
//           <CardCircular icon={<FaHeart />} text="Saúde" />
//           <CardCircular icon={<FaBook />} text="Educação" />
//           <CardCircular icon={<FaLeaf />} text="Meio Ambiente" />
//           <CardCircular icon={<FaUsers />} text="Comunidade" />
//         </div>

//         {/* Botão de Ação */}
//         <button className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition duration-300">
//           Conheça os jogos
//         </button>
//       </div>
//     </>
//   );
// }

'use client'
import { useEffect,useState } from 'react';
import axios from "axios";
import CardCircular from '../components/CardCircular';

export default function Jogos() {
      //Buscando Dados do BD para Recarregar na página
    const [catJogos, setcatJogos] = useState([]);
    useEffect(() => {
      async function fetchCatJogos() {
        try {
          const response = await axios.get('/api/categoria_jogos');
          setcatJogos(response.data);
          // console.log(catJogos); 
        } catch (error) {
          console.error('Erro ao buscar Categoria de Jogos:', error);
        }
      }
      fetchCatJogos();
    }, []);

     console.log(catJogos);

     const link = 'www.google.com'

  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-purple-100 to-white flex flex-col items-center justify-center px-6">
        {/* Texto do Cabeçalho */}
        <div className="text-center max-w-3xl mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Explore novos jogos</h2>
          <p className="text-gray-600 text-md leading-relaxed">
            A plataforma oferece uma visibilidade sem precedentes aos desenvolvedores de jogos educacionais. Professores, pesquisadores e estudantes talentosos têm a oportunidade de compartilhar suas criações com o público, promovendo não apenas seus jogos, mas também a excelência na educação por meio da tecnologia. 
          </p>
        </div>

        {/* Grid de Cartões com Imagens SVG */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          <CardCircular image="/upload/categoria_jogos/saude.svg" text="Saúde" href={link}/>
          <CardCircular image="/upload/categoria_jogos/educacao.svg" text="Educação" href={link} />
          <CardCircular image="/upload/categoria_jogos/meio-ambiente.svg" text="Meio Ambiente" href={link} />
          <CardCircular image="/upload/categoria_jogos/comunidade.svg" text="Comunidade"  href={link}/>
        </div>

        {/* Botão de Ação */}
        <button className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition duration-300">
          Conheça os jogos
        </button>
      </div>
    </>
  );
}


