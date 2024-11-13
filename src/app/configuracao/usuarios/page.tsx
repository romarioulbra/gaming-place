'use client'
import axios from "axios";
import { useEffect, useState } from "react";

import Tabela from "@/app/components/Tabela";
import { FaUser} from "react-icons/fa";
import CabecalhoViwer from "../../components/CabecalhoViwer";
import Fly from "@/app/components/Flyout";

export default function Usuarios() {
    
  // variáveis globais
  const nomeModulo = 'Perfis de Usuários';

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/api/usuarios');
        setUsuarios(response.data);
        console.log(usuarios); 
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <>
      <Fly/>
      <CabecalhoViwer 
        nomeModel={nomeModulo} 
        Icone={FaUser}
        urlCadastro= "/configuracao/usuarios/cadastrar"
      />
      <div className="">
        <Tabela data={usuarios}/>
      </div>
    </>
  );
}

