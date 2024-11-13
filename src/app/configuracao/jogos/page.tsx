'use client'
import axios from "axios";
import { useEffect, useState } from "react";

// import TabelaCatJogos from "@/app/components/TabelaCatJogos";
import { FaGamepad} from "react-icons/fa";
import CabecalhoViwer from "../../components/CabecalhoViwer";
import Fly from "@/app/components/Flyout";

export default function Jogos() {
    
  // variáveis globais
  const nomeModulo = 'Jogos';

  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    async function fetchJogos() {
      try {
        const response = await axios.get('/api/jogos');
        setJogos(response.data);
        console.log(jogos); 
      } catch (error) {
        console.error('Erro ao buscar Jogos:', error);
      }
    }
    fetchJogos();
  }, []);

  return (
    <>
      <Fly/>
      <CabecalhoViwer 
        nomeModel={nomeModulo} 
        Icone={FaGamepad}
        urlCadastro= "/configuracao/jogos/cadastrar"
      />
      <div className="">
        {/* <TabelaCatJogos data={jogos}/> */}
      </div>
    </>
  );
}

