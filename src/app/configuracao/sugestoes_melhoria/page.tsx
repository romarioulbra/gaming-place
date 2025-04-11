'use client'
import axios from "axios";
import { useEffect, useState } from "react";

import Tabela from "../../components/Tabela";
import { FaLightbulb} from "react-icons/fa";
import CabecalhoViwer from "../../components/CabecalhoViwer";

// import Fly from "@/app/components/Flyout";

export default function SugestoesMelhorias() {
    
  // variáveis globais
  const nomeModulo = 'Sugestoes e Melhorias';

  // const atributosCabTab = ["ID", "Titulo", "Nome", "Descrição", "Status","Pessoa que enviou"];
  // const atributosDados = ["sugestao_melhoria_id", "sugestao_melhoria_titulo", "sugestao_melhoria_nome", "sugestao_melhoria_descricao", "sugestao_melhoria_status","usuario_id"];
  const atributosCabTab = ["ID", "Titulo", "Nome","Status"];
  const atributosDados = ["sugestao_melhoria_id", "sugestao_melhoria_titulo", "sugestao_melhoria_nome","sugestao_melhoria_status"];
    

  const [sugestoes, setSugestoes] = useState([]);

  useEffect(() => {
    async function fetchSugestoes() {
      try {
        const response = await axios.get('/api/sugestoes');
        setSugestoes(response.data.sug_melhoria);         // lista de sugestões
        // setNumSugestoes(response.data.totalSugestoes);    // total de sugestões
      } catch (error) {
        console.error('Erro ao buscar Sugestões de Melhorias:', error);
      }
    }
  
    fetchSugestoes();
  }, []);

 
  return (
    <>
      <CabecalhoViwer 
        nomeModel={nomeModulo} 
        Icone={FaLightbulb}
        urlCadastro= "/configuracao/sugestoes_melhoria/cadastrar"
      />
      <div className="">
        <Tabela 
          data={sugestoes} 
          atributosCabTab={atributosCabTab} 
          atributosDados={atributosDados}
          modulo='sugestaoMelhoria'
        />
      </div>
    </>
  );
}

