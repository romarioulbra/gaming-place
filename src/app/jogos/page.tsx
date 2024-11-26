'use client'
// import { useEffect,useState } from 'react';
// import axios from "axios";
// import CardCircular from '../components/CardCircular';
import JogosCategorias from './categorias/page'
import Image from "next/image";
export default function Jogos() {
    // //Buscando Dados do BD para Recarregar na página
    // const [catJogos, setcatJogos] = useState([]);
    // useEffect(() => {
    //   async function fetchCatJogos() {
    //     try {
    //       const response = await axios.get('/api/categoria_jogos');
    //       setcatJogos(response.data);
    //       // console.log(catJogos); 
    //     } catch (error) {
    //       console.error('Erro ao buscar Categoria de Jogos:', error);
    //     }
    //   }
    //   fetchCatJogos();
    // }, []);

    //  console.log(catJogos);

    //  const link = 'www.google.com'

  return (
    <>
       <div className='bg-gray-200 pt-5 pb-10'>
      {/* <div className="min-h-screen bg-gradient-to-tr from-purple-100 to-white flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-3xl mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Explore novos jogos</h2>
          <p className="text-gray-600 text-md leading-relaxed">
            A plataforma oferece uma visibilidade sem precedentes aos desenvolvedores de jogos educacionais. Professores, pesquisadores e estudantes talentosos têm a oportunidade de compartilhar suas criações com o público, promovendo não apenas seus jogos, mas também a excelência na educação por meio da tecnologia. 
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {catJogos.map((jogo) => (
            <CardCircular
              key={jogo.categoria_jogo_id} // Garanta que cada elemento tenha uma chave única
              image={`${jogo.categoria_jogo_icone}`} // Caminho dinâmico da imagem
              text={jogo.categoria_jogo_area_atuacao} // Texto dinâmico
              href={jogo.link || "#"} // Define o link, se existir, ou usa um valor padrão
            />
          ))}
        </div>

        <button 
          className="px-8 py-3 bg-fuchsia-600 text-white font-bold rounded hover:bg-fuchsia-700 transition duration-300">
          Conheça os jogos
        </button>
      </div> */}
      <h1 className='mt-20 text-center font-bold text-2xl mb-10'>Jogos Disponíveis</h1>
      {/* <JogosCategorias></JogosCategorias> */}

   

      <div className="flex flex-col md:flex-row items-center bg-gray-500 text-white rounded-lg overflow-hidden shadow-lg max-w-3xl mx-auto">
      {/* Texto */}
      <div className="p-6 flex-1">
        <h2 className="text-3xl font-bold mb-4 text-indigo-800 text-center">VitalQuest</h2>
        <p className="text-gray-200 mb-6 leading-relaxed text-justify">
          VitalQuest é um jogo inovador centrado na saúde, projetado para promover hábitos saudáveis e conscientização.
          Desenvolvido para diversas plataformas, o jogo utiliza tecnologia de realidade virtual e elementos de
          gamificação para envolver os jogadores em desafios relacionados à saúde.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 transition-colors py-2 px-4 rounded font-semibold text-white w-full">
          Conhecer jogo
        </button>
      </div>

      {/* Imagem */}
      <div className="flex items-center justify-center w-full md:w-1/2 h-64 md:h-auto md:mb-10">
        <div className="relative w-3/4 h-3/4">
          <Image
            src="/img/montanha.png" // Substitua pelo caminho da sua imagem
            alt="VitalQuest Image"
            // layout="fill"
            objectFit="contain"
            className="rounded-lg"
            width={250}
            height={250}
          />
        </div>
      </div>
    </div>

    {/* Seção de Cards Menores */}
    <div className='mt-8 pb-8'>
        <h3 className="text-center text-2xl font-semibold text-black mb-6">
          Mais Jogos desse Segmento
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
  {/* Card 1 */}
  <div className="relative w-full h-40 overflow-hidden group rounded-lg shadow-md">
    <Image
      src="/img/carro.jpg" // Substitua pelo caminho da sua imagem
      alt="Card 1"
      layout="fill"
      objectFit="cover"
      className="w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-110 group-hover:rotate-2 group-hover:brightness-75"
    />
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-500 flex items-center justify-center">
      <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        Homem de Ferro
      </p>
    </div>
  </div>

  {/* Card 2 */}
  <div className="relative w-full h-40 overflow-hidden group rounded-lg shadow-md">
    <Image
      src="/img/homem_ferro.jpg" // Substitua pelo caminho da sua imagem
      alt="Card 2"
      layout="fill"
      objectFit="cover"
      className="w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-110 group-hover:rotate-2 group-hover:brightness-75"
    />
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-500 flex items-center justify-center">
      <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        Capitão América
      </p>
    </div>
  </div>

  {/* Card 3 */}
  <div className="relative w-full h-40 overflow-hidden group rounded-lg shadow-md">
    <Image
      src="/img/aranha.jpeg" // Substitua pelo caminho da sua imagem
      alt="Card 3"
      layout="fill"
      objectFit="cover"
      className="w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-110 group-hover:rotate-2 group-hover:brightness-75"
    />
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-500 flex items-center justify-center">
      <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        Homem-Aranha
      </p>
    </div>
  </div>

  {/* Card 4 */}
  <div className="relative w-full h-40 overflow-hidden group rounded-lg shadow-md">
    <Image
      src="/img/fant.jpg" // Substitua pelo caminho da sua imagem
      alt="Card 4"
      layout="fill"
      objectFit="cover"
      className="w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-110 group-hover:rotate-2 group-hover:brightness-75"
    />
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-500 flex items-center justify-center">
      <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        Thor
      </p>
    </div>
  </div>
</div>

        </div>
        </div>

    </>
  );
}


