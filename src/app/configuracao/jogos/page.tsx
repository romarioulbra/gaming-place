'use client'
import axios from "axios";
import { useEffect, useState } from "react";

import Tabela from "../../components/Tabela";
import { FaGamepad} from "react-icons/fa";
import CabecalhoViwer from "../../components/CabecalhoViwer";
// import Footer from "@/app/components/Rodape";
// import Fly from "@/app/components/Flyout";

export default function Jogos() {
    
  // variáveis globais
  const nomeModulo = 'Jogos';

  // const atributosCabTab = ["ID", "Nome", "Descrição", "Link", "Imagem","Autor(es)"];
  const atributosCabTab = ["ID", "Nome", "Autor(es)"];

  const atributosDados = ["jogos_id", "jogos_nome", "jogos_autor"];
  // console.log(atributosDados)

  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    async function fetchJogos() {
      try {
        const response = await axios.get('/api/jogos');
        setJogos(response.data.jogos);
        console.log(jogos); 
      } catch (error) {
        console.error('Erro ao buscar Jogos:', error);
      }
    }
    fetchJogos();
  }, []);

  return (
    <>
      {/* <Fly/> */}
      <CabecalhoViwer 
        nomeModel={nomeModulo} 
        Icone={FaGamepad}
        urlCadastro= "/configuracao/jogos/cadastrar"
      />
      <div className="">
        <Tabela 
          data={jogos} 
          atributosCabTab={atributosCabTab} 
          atributosDados={atributosDados}
          modulo='jogo'
        />
      </div>
    </>
  );
}

