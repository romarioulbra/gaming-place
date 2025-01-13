'use client'
import axios from "axios";
import { useEffect, useState } from "react";

import Tabela from "../../components/Tabela";
import { FaMeteor} from "react-icons/fa";
import CabecalhoViwer from "../../components/CabecalhoViwer";

// import Fly from "@/app/components/Flyout";

export default function Emblemas() {
    
  // variáveis globais
  const nomeModulo = 'Emblemas';

  const atributosCabTab = ["ID", "Nome", "Critério", "Pontos","Status", "Imagem"];
  
  const atributosDados = ["emblema_id", "emblema_nome", "emblema_criterio", "emblemas_pontos", "emblemas_status" ,"emblema_imagem"];

  const [emblemas, setEmblemas] = useState([]);

  useEffect(() => {
    async function fetchEmblemas() {
      try {
        const response = await axios.get('/api/emblemas');
        setEmblemas(response.data);
      } catch (error) {
        console.error('Erro ao buscar Emblemas:', error);
      }
    }
    fetchEmblemas();
  }, []);

 
  return (
    <>
      <CabecalhoViwer 
        nomeModel={nomeModulo} 
        Icone={FaMeteor}
        urlCadastro= "/configuracao/emblemas/cadastrar"
      />
      <div className="">
        <Tabela 
          data={emblemas} 
          atributosCabTab={atributosCabTab} 
          atributosDados={atributosDados}
          modulo='emblema'
        />
      </div>
    </>
  );
}

