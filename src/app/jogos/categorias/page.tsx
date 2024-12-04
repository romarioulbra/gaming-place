'use client'
import { useEffect,useState } from 'react';
import axios from "axios";
import CardCircular from '../../components/CardCircular';
import Link from 'next/link';
import ModalCategoriaJogo from '@/app/components/ModalCategoriaJogo';

export default function JogosCategorias() {
      //Buscando Dados do BD para Recarregar na página
    const [catJogos, setcatJogos] = useState([]);
    const [selectedJogo, setSelectedJogo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [jogos, setJogos] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);



    useEffect(() => {
      async function fetchCatJogos() {
        try {
          const response = await axios.get('/api/categoria_jogos');
          setcatJogos(response.data);
          
        } catch (error) {
          console.error('Erro ao buscar Categoria de Jogos:', error);
        }
      }
      fetchCatJogos();
    }, []);



 // Função para abrir o modal e buscar os jogos de uma categoria
 const openModal = async (categoria) => {
  setSelectedJogo(categoria); // Define a categoria selecionada
  setLoading(true); // Inicia o estado de carregamento

  try {
    // Busca os jogos relacionados à categoria
    const response = await axios.get(`/api/categoria_jogos/${categoria.categoria_jogo_id}`);
    setJogos(response.data); // Define os jogos no estado
  } catch (error) {
    console.error("Erro ao buscar jogos da categoria:", error);
  } finally {
    setLoading(false); // Finaliza o estado de carregamento
  }
};

    // Função para fechar o modal
    const closeModal = () => {
      setSelectedJogo(null);
    };


  return (
    <>
      <div className="h-screen bg-gradient-to-tr from-purple-100 to-white flex flex-col items-center justify-center px-6">        {/* Texto do Cabeçalho */}
        <div className="text-center max-w-3xl mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Explore novos jogos</h2>
          <p className="text-gray-600 text-md leading-relaxed">
            A plataforma oferece uma visibilidade sem precedentes aos desenvolvedores de jogos educacionais. Professores, pesquisadores e estudantes talentosos têm a oportunidade de compartilhar suas criações com o público, promovendo não apenas seus jogos, mas também a excelência na educação por meio da tecnologia. 
          </p>
        </div>

        {/* Grid de Cartões com Imagens SVG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-12">
          
          {catJogos.map((jogo) => (
            <div
                key={jogo.categoria_jogo_id}
                className="cursor-pointer"
                onClick={() => openModal(jogo)}
              >
              <CardCircular
                key={jogo.categoria_jogo_id} // Garanta que cada elemento tenha uma chave única
                image={`${jogo.categoria_jogo_icone}`} // Caminho dinâmico da imagem
                text={jogo.categoria_jogo_area_atuacao} // Texto dinâmico
                href={jogo.link || "#"} // Define o link, se existir, ou usa um valor padrão
              />
          </div>
          ))}
        </div>

         {/* Modal para exibir jogos da categoria */}
      {selectedJogo && (
        <ModalCategoriaJogo 
          jogo={selectedJogo} 
          jogos={jogos}
          onClose={closeModal}
        >
          {loading ? (
            <p>Carregando jogos...</p>
          ) : (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Jogos da categoria {selectedJogo.categoria_jogo_area_atuacao}
              </h3>
              {jogos.length > 0 ? (
                <ul>
                  {jogos.map((jogo) => (
                    <li key={jogo.jogos_id} className="mb-4">
                      <h4 className="text-lg font-semibold">{jogo.jogos_nome}</h4>
                      <p>{jogo.jogos_descricao}</p>
                      <a
                        href={jogo.jogos_link}
                        className="text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver jogo
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum jogo encontrado nesta categoria.</p>
              )}
            </div>
          )}
        </ModalCategoriaJogo>
      )}


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


