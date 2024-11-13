'use client';

import { useState } from "react";
import Botao from "@/app/components/Botao";
import InputForm from "@/app/components/InputsForm";
import { FaUserPlus} from "react-icons/fa";
import Alert from "@/app/components/Alert";
import CabecalhoCadastro from "@/app/components/CabecalhoCadastro";

export default function CadastroCatJogos() {
  const [formData, setFormData] = useState(
    { categoria_jogo_area_atuacao: `` }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/categoria_jogos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Categoria de Jogos cadastrada com sucesso!');
      setFormData(
        { categoria_jogo_area_atuacao: ''}
        );
    } else {
      alert('Erro ao cadastrar Categoria de Jogos.');
    }
  };

  return (
    <>
      <h1 className="text-center mt-24 mb-3 text-2xl font-bold">Cadastro de Categoria de Jogos</h1>
      <CabecalhoCadastro  
        Icone = {FaUserPlus}
      />
      <Alert/>

      <div className="flex-auto ml-4 mr-4 mt-4 mb-4">
        <div className="p-8 border border-gray-300 shadow-lg bg-white rounded-lg mr-2 ml-2"> 
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg mt-2 ">
            <div className="p-6">
                <InputForm
                  tipoInput="text"
                  label="Área da Atuação"
                  placeholder="Nome da Categoria"
                  valorInput={formData.categoria_jogo_area_atuacao}
                  metodoSubmit={(e) => setFormData({ ...formData, categoria_jogo_area_atuacao: e.target.value })}
                />
              
            </div>
            <div className="flex justify-center">
              <Botao
                texto='Cadastrar'
                tipo='submit'
                cor = 'azul'
              />
            </div>  
          </form>
        </div>
      </div>
    </>
  );
}
