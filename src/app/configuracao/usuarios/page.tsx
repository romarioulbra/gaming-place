'use client'
import axios from "axios";
import { useEffect, useState } from "react";

import Navbar from "@/app/components/MenuNavbar";
import Footer from "@/app/components/Rodape";
import CadastroUsuario from "./cadastro";
import CarregarTela from "@/app/components/Loading";
import Tabela from "@/app/components/Tabela";
// import TabelaDark from "@/app/components/TabelaDark";
// import TabelaDinamica from "@/app/components/TabelaDinamica";


export default function Usuarios() {

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
      <Navbar/>
      <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold mb-4">Cadastro de Usuários</h2>
          <CadastroUsuario />
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Listagem de Usuários</h2>
        {/* <TabelaDark data={usuarios}/><br /> */}
        {/* <TabelaDinamica initialUsers={usuarios} /> */}
        <Tabela data={usuarios}/>
        <CarregarTela/>
      </div>
      <Footer/>
    </>
  );
}

