"use client";
import { useState, useEffect } from "react";
import Botao from "@/app/components/Botao";
import InputForm from "@/app/components/InputsForm";
import { CgGames } from "react-icons/cg";
import Alert from "@/app/components/Alert";
import CabecalhoVoltar from "@/app/components/CabecalhoVoltar";
import Image from "next/image";

export default function CadastrarJogos() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"sucesso" | "erro">("sucesso");
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [jogos, setJogos] = useState([]);
  const [formData, setFormData] = useState({
    jogos_nome: "",
    jogos_descricao: "",
    jogos_link: "",
    jogos_url_img: "",
    categoria_jogo_id: "",
    jogos_autor: "",
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
    const fetchJogos = async () => {
      try {
        const response = await fetch("/api/categoria_jogos");
        const data = await response.json();
        setJogos(data);
      } catch (error) {
        console.error("Erro ao buscar Jogos:", error);
      }
    };
    fetchJogos();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("jogos_nome", formData.jogos_nome);
    formDataToSend.append("jogos_descricao", formData.jogos_descricao);
    formDataToSend.append("jogos_link", formData.jogos_link);
    formDataToSend.append("jogos_autor", formData.jogos_autor);
    formDataToSend.append("categoria_jogo_id", formData.categoria_jogo_id);

    if (file) {
      formDataToSend.append("jogos_url_img", file);
    }

    try {
      const res = await fetch("/api/jogos", {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) {
        const errorData = await res.json();
        setAlertMessage(errorData.error || "Erro ao cadastrar Jogos.");
        setAlertType("erro");
        setAlertVisible(true);
        return;
      }

      setAlertMessage("Jogo cadastrado com sucesso!");
      setAlertType("sucesso");
      setAlertVisible(true);

      // Limpa o formulário e a pré-visualização
      setFormData({
        jogos_nome: "",
        jogos_descricao: "",
        jogos_link: "",
        jogos_url_img: "",
        categoria_jogo_id: "",
        jogos_autor: "",
      });
      setFile(null);
      setPreviewImage(null);

      const fileInput = document.getElementById("categoria_jogo_icone") as HTMLInputElement;
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
      <CabecalhoVoltar Icone={CgGames} />

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
              <InputForm
                tipoInput="text"
                label="Jogo"
                placeholder="Nome do Jogo"
                valorInput={formData.jogos_nome}
                metodoSubmit={(e) => setFormData({ ...formData, jogos_nome: e.target.value })}
              />

              <InputForm
                tipoInput="text"
                label="Link do Jogo"
                placeholder="www.exemplo.com.br"
                valorInput={formData.jogos_link}
                metodoSubmit={(e) => setFormData({ ...formData, jogos_link: e.target.value })}
              />
              

              <InputForm
                tipoInput="selectDados"
                label="Categoria do Jogo"
                dadosSelect={jogos}
                idSelect="categoria_jogo_id"
                nomeSelect="categoria_jogo_area_atuacao"
                valorInput={formData.categoria_jogo_id}
                metodoSubmit={(e) => setFormData({ ...formData, categoria_jogo_id: e.target.value })}
              />

              <InputForm
                tipoInput="text"
                label="Desenvolvedor(es) do Jogo"
                placeholder="Fulano e Beltrano"
                valorInput={formData.jogos_autor}
                metodoSubmit={(e) => setFormData({ ...formData, jogos_autor: e.target.value })}
              />
              <InputForm
                tipoInput="textarea"
                label="Descrição"
                placeholder="Digite aqui a descrição do Jogo"
                valorInput={formData.jogos_descricao}
                metodoSubmit={(e) => setFormData({ ...formData, jogos_descricao: e.target.value })}
              />

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

              <InputForm
                tipoInput="fileInput"
                label="Imagem do Jogo - (PNG)"
                fileImage={handleFileChange}
                idFileInput="categoria_jogo_icone"
              />
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
