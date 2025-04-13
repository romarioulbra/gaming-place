"use client";
import { useState, useEffect } from "react";
import Botao from "@/app/components/Botao";
import InputForm from "@/app/components/InputsForm";
import { FaMeteor } from "react-icons/fa";
import Alert from "@/app/components/Alert";
import CabecalhoVoltar from "@/app/components/CabecalhoVoltar";

export default function CadastrarSugestoesMelhorias() {

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"sucesso" | "erro">("sucesso");
  const [sugestoes, setSugestoes] = useState([]);
  

  const [formData, setFormData] = useState({
    sugestao_melhoria_nome: "",
    sugestao_melhoria_descricao: "",
    sugestao_melhoria_status: "",
    usuario_id: "",
    sugestao_melhoria_titulo: "",
  });



  // Função para buscar categorias dos Jogos
  useEffect(() => {
    const fetchSugestao = async () => {
      try {
        const response = await fetch("/api/sugestoes");
        const data = await response.json();
        setSugestoes(data);
      } catch (error) {
        console.error("Erro ao buscar Sugestões:", error);
      }
    };
    fetchSugestao();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("sugestao_melhoria_nome", formData.sugestao_melhoria_nome);
    formDataToSend.append("sugestao_melhoria_descricao", formData.sugestao_melhoria_descricao);
    formDataToSend.append("sugestao_melhoria_status", formData.sugestao_melhoria_status);
    formDataToSend.append("usuario_id", formData.usuario_id);
    formDataToSend.append("sugestao_melhoria_titulo", formData.sugestao_melhoria_titulo);


    try {
      const res = await fetch("/api/sugestoes", {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) {
        const errorData = await res.json();
        setAlertMessage(errorData.error || "Erro ao cadastrar Sugestões.");
        setAlertType("erro");
        setAlertVisible(true);
        return;
      }

      setAlertMessage("Sugestão cadastrada com sucesso!");
      setAlertType("sucesso");
      setAlertVisible(true);

      // Limpa o formulário e a pré-visualização
      setFormData({
        sugestao_melhoria_nome: "",
        sugestao_melhoria_descricao: "",
        sugestao_melhoria_status: "",
        usuario_id: "",
        sugestao_melhoria_titulo: "",
      });
      

    } catch (error) {
      console.error("Erro inesperado:", error);
      setAlertMessage("Erro no servidor. Por favor, tente novamente mais tarde.");
      setAlertType("erro");
      setAlertVisible(true);
    }
  };

  return (
    <>
      <h1 className="text-center mt-32 mb-3 text-2xl font-bold">Cadastro de Sugestóes e Melhorias</h1>
      <CabecalhoVoltar Icone={FaMeteor} />

      {alertVisible && (
        <Alert
          message={alertMessage}
          tipoAlert={alertType}
          texto={alertMessage}
          cor={alertType === "sucesso" ? "verde" : "vermelho"}
        />
      )}

      <div className="flex-auto ml-4 mr-4 mt-4 mb-4">
        <div className="p-8 border border-gray-300 shadow-lg bg-white rounded-lg mr-2 ml-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg mt-2">
            <div className="p-6">

            <div className="flex flex-wrap gap-4">              
                <div className="flex-1">
                  <InputForm
                    tipoInput="text"
                    label="Nome do Solicitante"
                    placeholder="Nome do Solicitante da Melhoria"
                    valorInput={formData.sugestao_melhoria_nome}
                    metodoSubmit={(e) => setFormData({ ...formData, sugestao_melhoria_nome: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4  mt-4">             
                <div className="flex-1">             
                  <InputForm
                    tipoInput="select"
                    label="Status"
                    options={['Validado', 'Rejeitado','Enviado']}
                    valorInput={formData.sugestao_melhoria_status}
                    metodoSubmit={(e) => setFormData({ ...formData, sugestao_melhoria_status: e.target.value })}
                  />
                </div>
                <div className="flex-1">
                  <InputForm
                    tipoInput="text"
                    label="Quantidade de Pontos"
                    placeholder="40"
                    valorInput={formData.sugestao_melhoria_titulo}
                    metodoSubmit={(e) => setFormData({ ...formData, sugestao_melhoria_titulo: e.target.value })}
                  />
                </div>
              </div>    

              <div className="mt-4">
                <InputForm
                  tipoInput="textarea"
                  label="Critério"
                  placeholder="Digite aqui o critério e a descrição da sua Sugestão ou Melhoria"
                  valorInput={formData.sugestao_melhoria_descricao}
                  metodoSubmit={(e) => setFormData({ ...formData, sugestao_melhoria_descricao: e.target.value })}
                />
              </div>

          </div>

            <div className="flex justify-center">
              <Botao texto="Cadastrar" tipo="submit" cor="verde" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
