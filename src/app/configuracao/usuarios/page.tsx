'use client'

import Navbar from "@/app/components/MenuNavbar";
import Footer from "@/app/components/Rodape";
import CadastroUsuario from "./cadastro";

export default function Usuarios() {
  return (
    <>
      <Navbar/>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Título */}
        <h2 className="text-2xl font-bold mb-4">Cadastro de Usuários</h2>

        {/* Formulário de Cadastro */}
        <CadastroUsuario />
      </div>
      <Footer />
    </>
  );
}
