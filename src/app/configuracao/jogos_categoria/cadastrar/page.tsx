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
  const [file, setFile] = useState<File | null>(null); // Estado para o arquivo
  const [alertType, setAlertType] = useState<"sucesso" | "erro">("sucesso"); 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); // Salva o arquivo no estado
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("categoria_jogo_area_atuacao", formData.categoria_jogo_area_atuacao);
  
    if (file) {
      formDataToSend.append("categoria_jogo_icone", file);
    }
  
    try {
      const res = await fetch("/api/categoria_jogos", {
        method: "POST",
        body: formDataToSend,
      });
  
      // Lida com erros HTTP
      if (!res.ok) {
        let errorMessage = "Erro ao cadastrar Categoria de Jogos.";
        try {
          const errorData = await res.json(); // Tenta obter a mensagem de erro da API
          errorMessage = errorData.error || errorMessage;
        } catch {
          // Mantém a mensagem padrão se o corpo não for JSON
        }
  
        setAlertMessage(errorMessage);
        setAlertType("erro");
        setAlertVisible(true);
        return;
      }
  
      // Sucesso
      setAlertMessage("Categoria de Jogos cadastrada com sucesso!");
      setAlertType("sucesso");
      setAlertVisible(true);
  
      // Limpa o formulário
      setFormData({ categoria_jogo_area_atuacao: "" });
      setFile(null);
  
      // Reseta o valor do input file no DOM
      const fileInput = document.getElementById("categoria_jogo_icone") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ""; // Reseta o valor do input file
      }
    } catch (error) {
      // Trata erros inesperados
      console.error("Erro inesperado:", error);
      setAlertMessage("Erro no servidor. Por favor, tente novamente mais tarde.");
      setAlertType("erro");
      setAlertVisible(true);
    }
  };
  
  
  return (
    <>
      <h1 className="text-center mt-32 mb-3 text-2xl font-bold">Cadastro de Categoria de Jogos</h1>
      <CabecalhoVoltar  
        Icone={CgGames}
      />

      {/* Renderizar o alerta apenas se estiver visível */}
      {alertVisible && (
        <Alert
          message={alertMessage}
          tipoAlert={alertType} // Define o tipo de alerta dinamicamente
          texto={alertMessage} // Mostra a mensagem apropriada
          cor={alertType === "sucesso" ? "verde" : "vermelho"} // Escolhe a cor com base no tipo
        />
      )}

      {/* <div className="flex-auto ml-4 mr-4 mt-4 mb-4"> */}
      <div className="flex-auto ml-4 mr-4 mt-4 mb-64">
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

              <InputForm
                tipoInput="fileInputSVG"
                label="Ícone da Categoria - (SVG)"
                placeholder="Nome da Categoria"
                fileSVG = {handleFileChange}
                idFileInput="categoria_jogo_icone"
              />
              <p 
                className="font-mono mt-1 text-left font-bold"
                style={{ fontSize: '13px' }}
              >
                  Obs:Somente arquivos no Formato SVG</p>
            </div>

            <div className="flex justify-center">
              <Botao
                texto="Cadastrar"
                tipo="submit"
                cor="verde"
              />
            </div>  
          </form>
        </div>
      </div>
    </>
  );
}
