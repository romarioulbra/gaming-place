'use client';

import { useState } from "react";
import Botao from "@/app/components/Botao";
import InputForm from "@/app/components/InputsForm";
import { CgGames } from "react-icons/cg";
import Alert from "@/app/components/Alert";
import CabecalhoVoltar from "@/app/components/CabecalhoVoltar";

export default function CadastroCatJogos() {
  const [formData, setFormData] = useState({ categoria_jogo_area_atuacao: `` });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
      setAlertMessage('Categoria de Jogos cadastrada com sucesso!');
      setAlertVisible(true);
      setFormData({ categoria_jogo_area_atuacao: '' });
    } else {
      setAlertMessage('Erro ao cadastrar Categoria de Jogos.');
      setAlertVisible(true);
    }
  };

  return (
    <>
      <h1 className="text-center mt-24 mb-3 text-2xl font-bold">Cadastro de Categoria de Jogos</h1>
      <CabecalhoVoltar  
        Icone={CgGames}
      />

      {/* Renderizar o alerta apenas se estiver visível */}
      {alertVisible && 
        <Alert 
          message={alertMessage}
          tipoAlert='sucesso' 
          texto='Categoria de Jogos cadastrada com Sucesso!'
          cor='verde'
        />
      }

      <div className="flex-auto ml-4 mr-4 mt-4 mb-4">
        <div className="p-8 border border-gray-300 shadow-lg bg-white rounded-lg mr-2 ml-2"> 
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg mt-2 ">
            <div className="p-6">
              <InputForm
                tipoInput="text"
                label="Área da Atuação"
                placeholder="Nome da Categoria"
                valorInput={formData.categoria_jogo_area_atuacao}
                metodoSubmit={(e) =>
                  setFormData({ ...formData, categoria_jogo_area_atuacao: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center">
              <Botao
                texto="Cadastrar"
                tipo="submit"
                cor="azul"
              />
            </div>  
          </form>
        </div>
      </div>
    </>
  );
}
