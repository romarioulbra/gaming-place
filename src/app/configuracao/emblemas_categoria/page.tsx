'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Tabela from "@/app/components/Tabela";
import { GiFallingBlob} from "react-icons/gi";
import CabecalhoViwer from "../../components/CabecalhoViwer";

export default function CategoriaEmblemas() {
  
 // variáveis globais
 const atributosCabTab = ["ID", "Critério", "Pontos", "Emblemas (tipo)"];
 const atributosDados = ["tipo_emblema_id", "tipo_emblema_criterio", "tipo_emblema_pontos","emblema_id" ];
 const nomeModulo = 'Categoria de Emblemas';
 const [catEmblemas, setcatEmblemas] = useState([]);

  useEffect(() => {
  async function fetchCatEmblemas() {
    try {
      const response = await axios.get('/api/categoria_emblemas');

      const dadosTratados = response.data.cat_emblemas.map((item) => ({
        ...item,
        emblema_id: item.emblema?.emblema_nome || 'Sem nome',
      }));

      setcatEmblemas(dadosTratados);
    } catch (error) {
      console.error('Erro ao buscar Categoria de Emblemas:', error);
    }
  }
  fetchCatEmblemas();
}, []);

  
  return (
      <>
        <CabecalhoViwer 
          nomeModel={nomeModulo} 
          Icone={GiFallingBlob}
          urlCadastro= "/configuracao/emblemas_categoria/cadastrar"
        />
        <div className="">
          <Tabela 
            data={catEmblemas} 
            atributosCabTab={atributosCabTab} 
            atributosDados={atributosDados}
            modulo='emblemaCategoria'
          />
        </div>
      </>
  );
}

