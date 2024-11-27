'use client'
import { useEffect,useState } from 'react';
import axios from "axios";
import CardCircular from '../../components/CardCircular';
import Link from 'next/link';

export default function JogosCategorias() {
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
      {/* <div className="min-h-screen bg-gradient-to-tr from-purple-100 to-white flex flex-col items-center justify-center px-6"> */}
      <div className="min-h-screen bg-gray-200 text-gray-900 flex flex-col items-center justify-center px-6 -mb-36">
        {/* Texto do Cabeçalho */}
        <div className="text-center max-w-3xl mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Explore novos jogos</h2>
          <p className="text-gray-600 text-md leading-relaxed">
            A plataforma oferece uma visibilidade sem precedentes aos desenvolvedores de jogos educacionais. Professores, pesquisadores e estudantes talentosos têm a oportunidade de compartilhar suas criações com o público, promovendo não apenas seus jogos, mas também a excelência na educação por meio da tecnologia. 
          </p>
        </div>

        {/* Grid de Cartões com Imagens SVG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-12">
          {catJogos.map((jogo) => (
            <CardCircular
              key={jogo.categoria_jogo_id} // Garanta que cada elemento tenha uma chave única
              image={`${jogo.categoria_jogo_icone}`} // Caminho dinâmico da imagem
              text={jogo.categoria_jogo_area_atuacao} // Texto dinâmico
              href={jogo.link || "#"} // Define o link, se existir, ou usa um valor padrão
            />
          ))}
        </div>

        {/* Botão de Ação */}
        <Link href='/jogos'>
          <button 
            // className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition duration-300">
            className="px-8 py-3 bg-fuchsia-600 text-white font-bold rounded hover:bg-fuchsia-700 transition duration-300">
            Conheça os jogos
          </button>
        </Link>
      </div>
    </>
  );
}


