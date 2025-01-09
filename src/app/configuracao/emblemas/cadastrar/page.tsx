"use client";
import { useState, useEffect } from "react";
import Botao from "@/app/components/Botao";
import InputForm from "@/app/components/InputsForm";
import { FaMeteor } from "react-icons/fa";
import Alert from "@/app/components/Alert";
import CabecalhoVoltar from "@/app/components/CabecalhoVoltar";
import Image from "next/image";

export default function CadastrarEmblemas() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"sucesso" | "erro">("sucesso");
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [emblemas, setEmblemas] = useState([]);
  const [formData, setFormData] = useState({
    emblema_nome: "",
    emblema_criterio: "",
    emblema_imagem: "",
    emblemas_pontos: "",
    emblemas_status: "",
  });

  // Atualiza a pré-visualização da imagem ao selecionar um arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile)); // Gera a URL para pré-visualização
    }
  };

  // Função para buscar categorias dos Jogos
  useEffect(() => {
    const fetchEmblemas = async () => {
      try {
        const response = await fetch("/api/emblemas");
        const data = await response.json();
        setEmblemas(data);
      } catch (error) {
        console.error("Erro ao buscar Emblemas:", error);
      }
    };
    fetchEmblemas();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("emblema_nome", formData.emblema_nome);
    formDataToSend.append("emblema_criterio", formData.emblema_criterio);
    formDataToSend.append("emblemas_status", formData.emblemas_status);
    formDataToSend.append("emblemas_pontos", formData.emblemas_pontos);

    if (file) {
      formDataToSend.append("emblema_imagem", file);
    }

    try {
      const res = await fetch("/api/emblemas", {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) {
        const errorData = await res.json();
        setAlertMessage(errorData.error || "Erro ao cadastrar Emblemas.");
        setAlertType("erro");
        setAlertVisible(true);
        return;
      }

      setAlertMessage("Emblema cadastrado com sucesso!");
      setAlertType("sucesso");
      setAlertVisible(true);

      // Limpa o formulário e a pré-visualização
      setFormData({
        emblema_nome: "",
        emblema_criterio: "",
        emblema_imagem: "",
        emblemas_pontos: "",
        emblemas_status: "",
      });
      setFile(null);
      setPreviewImage(null);

      const fileInput = document.getElementById("emblema_imagem") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ""; // Reseta o valor do input file
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      setAlertMessage("Erro no servidor. Por favor, tente novamente mais tarde.");
      setAlertType("erro");
      setAlertVisible(true);
    }
  };

  return (
    <>
      <h1 className="text-center mt-32 mb-3 text-2xl font-bold">Cadastro de Jogos</h1>
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
                    label="Emblema"
                    placeholder="Nome do Emblema"
                    valorInput={formData.emblema_nome}
                    metodoSubmit={(e) => setFormData({ ...formData, emblema_nome: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4  mt-4">             
                <div className="flex-1">             
                  <InputForm
                    tipoInput="text"
                    label="Status"
                    placeholder="Adquirido"
                    valorInput={formData.emblemas_status}
                    metodoSubmit={(e) => setFormData({ ...formData, emblemas_status: e.target.value })}
                  />
                </div>
                <div className="flex-1">
                  <InputForm
                    tipoInput="text"
                    label="Quantidade de Pontos"
                    placeholder="40"
                    valorInput={formData.emblemas_pontos}
                    metodoSubmit={(e) => setFormData({ ...formData, emblemas_pontos: e.target.value })}
                  />
                </div>
              </div>    

              <div className="mt-4">
                <InputForm
                  tipoInput="textarea"
                  label="Critério"
                  placeholder="Digite aqui o critério e a descrição do emblema"
                  valorInput={formData.emblema_criterio}
                  metodoSubmit={(e) => setFormData({ ...formData, emblema_criterio: e.target.value })}
                />
              </div>

              {previewImage && (
                <div className="mb-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <Image
                        src={previewImage}
                        alt="Pré-visualização"
                        layout="fixed"
                        objectFit="cover"
                        className="max-w-full h-auto rounded-md"
                        width={150}
                        height={150}
                      />
                    </div>
                  </div>
                </div>
              )}

            <div className="mt-4">
              <InputForm
                tipoInput="fileInput"
                label="Imagem do Emblema - (PNG)"
                fileImage={handleFileChange}
                idFileInput="emblema_imagem"
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
