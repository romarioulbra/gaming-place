'use client'
import axios from "axios";
import { useEffect, useState } from "react";

// import TabelaCatJogos from "@/app/components/TabelaCatJogos";
import TabelaPadrao from "@/app/components/TabelaPadrao";
import { CgGames } from "react-icons/cg";
import CabecalhoViwer from "../../components/CabecalhoViwer";
import Fly from "@/app/components/Flyout";

export default function CategoriaJogos() {
 // variáveis globais
 const atributosCabTab = ["ID", "Área de Atuação"];
 const atributosDados = ["categoria_jogo_id", "categoria_jogo_area_atuacao"];
 const nomeModulo = 'Categoria de Jogos';

  const [catJogos, setcatJogos] = useState([]);

  useEffect(() => {
    async function fetchCatJogos() {
      try {
        const response = await axios.get('/api/categoria_jogos');
        setcatJogos(response.data);
        console.log(catJogos); 
      } catch (error) {
        console.error('Erro ao buscar Categoria de Jogos:', error);
      }
    }
    fetchCatJogos();
  }, []);

  return (
    <>
      <Fly/>
      <CabecalhoViwer 
        nomeModel={nomeModulo} 
        Icone={CgGames}
        urlCadastro= "/configuracao/jogos_categoria/cadastrar"
      />
      {/* <div className="">
        <TabelaCatJogos data={catJogos}/>
      </div> */}

      <div className="">
        <TabelaPadrao data={catJogos} atributosCabTab={atributosCabTab} atributosDados={atributosDados}/>
      </div>
    </>
  );
}

