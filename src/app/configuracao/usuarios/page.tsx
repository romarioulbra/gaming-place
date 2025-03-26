'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Tabela from "../../components/Tabela";
import { FaUserCog} from "react-icons/fa";
import CabecalhoViwer from "../../components/CabecalhoViwer";


export default function Usuarios() {  
// variáveis globais
//  const atributosCabTab = ["ID", "Nome","Email","Senha","Nível"];
//  const atributosDados = ["usuario_id", "usuario_nome", "usuario_email", "usuario_senha", "usuario_nivel"];
 const atributosCabTab = ["ID", "Nome","Email","Nível"];
 const atributosDados = ["usuario_id", "usuario_nome", "usuario_email","usuario_nivel"];
 const nomeModulo = 'Perfis de Usuários';
 const [usuarios, setUsuarios] = useState([]);


  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/api/usuarios');
        setUsuarios(response.data.users);
        // console.log(usuarios); 
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    }
    fetchUsers();
  }, []);

  return (
      <>
        <CabecalhoViwer 
          nomeModel={nomeModulo} 
          Icone={FaUserCog}
          urlCadastro= "/configuracao/usuarios/cadastrar"
        />
        
        <Tabela 
          data={usuarios} 
          atributosCabTab={atributosCabTab} 
          atributosDados={atributosDados}            
          modulo='usuario'
        />
      </>
  );
}

