'use client'
import axios from "axios";
import { useEffect, useState } from "react";

import TabelaCatJogos from "@/app/components/TabelaCatJogos";
import { FaUser} from "react-icons/fa";
import CabecalhoViwer from "../../components/CabecalhoViwer";
import Fly from "@/app/components/Flyout";

export default function CategoriaJogos() {
    
  // variáveis globais
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
        Icone={FaUser}
        urlCadastro= "/configuracao/jogos_categoria/cadastrar"
      />
      <div className="">
        <TabelaCatJogos data={catJogos}/>
      </div>
    </>
  );
}

