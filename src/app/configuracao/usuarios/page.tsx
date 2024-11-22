'use client'
import axios from "axios";
import { useEffect, useState } from "react";
// import Tabela from "@/app/components/Tabela__";
import Tabela from "../../components/Tabela";
import { FaUser} from "react-icons/fa";
import CabecalhoViwer from "../../components/CabecalhoViwer";


export default function Usuarios() {  
// variáveis globais
 const atributosCabTab = ["ID", "Nome","Email","Senha","Nível"];
 const atributosDados = ["usuario_id", "usuario_nome", "usuario_email", "usuario_senha", "usuario_nivel"];
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
        <CabecalhoViwer 
          nomeModel={nomeModulo} 
          Icone={FaUser}
          urlCadastro= "/configuracao/usuarios/cadastrar"
        />
        {/* <div className="">
          <Tabela data={usuarios}/>
        </div> */}

        <div className="">
          <Tabela 
            data={usuarios} 
            atributosCabTab={atributosCabTab} 
            atributosDados={atributosDados}            
            modulo='usuario'
          />
        </div>

      </>
  );
}

