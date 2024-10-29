'use client'

import Navbar from "@/app/components/MenuNavbar";
import Footer from "@/app/components/Rodape";
import CadastroUsuario from "./cadastro";
import TabelaDark from "@/app/components/TabelaDark";
import { useEffect, useState } from "react";



export default function Usuarios() {

  const data = [
    { id: 1, usuario_nome: 'João Silva', usuario_email: 'joao@example.com',usuario_senha: '123456', usuario_nivel:'Admin' },
    { id: 2, usuario_nome: 'Rom', usuario_email: 'joao@example.com',usuario_senha: '123456', usuario_nivel:'Comum' },
  ];

  return (
    <>
      <Navbar/>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Título */}
        <h2 className="text-2xl font-bold mb-4">Cadastro de Usuários</h2>
        {/* Formulário de Cadastro */}
        <CadastroUsuario />
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        {/* Título */}
        <h2 className="text-2xl font-bold mb-4">Listagem de Usuários</h2>
        <TabelaDark data={data}/>
      
      </div>
      <Footer />
    </>
  );
}

