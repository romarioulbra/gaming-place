"use client";

import { FaRegEdit } from "react-icons/fa";
import { useState,useEffect } from "react";
import InputForm from "@/app/components/InputsForm";
import Image from "next/image";

export default function AlterarJogos({ dados }: { dados: any }) {
  const [formData, setFormData] = useState(dados); // Inicializa com os dados recebidos
  const [modalText, setModalText] = useState(""); // Texto do modal
  const [loading, setLoading] = useState(false); // Estado para controlar o loading
  const [file, setFile] = useState<File | null>(null); // Estado para o arquivo
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [jogos, setJogos] = useState([]);

  // Atualiza o estado ao editar os inputs
  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  // Atualização para categorias:
const handleCategoryChange = (e) => {
  const selectedId = e.target.value;
  const selectedCategory = jogos.find((jogo) => jogo.id === selectedId);

  setFormData((prev) => ({
    ...prev,
    categoria_jogo_id: selectedId, // ID da categoria
    categoria_jogo_nome: selectedCategory?.categoria_jogo_area_atuacao || "", // Nome da categoria
  }));
};


const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    setPreviewImage(imageURL);
    setFile(file); // Atualiza o estado do arquivo
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


  const handleSave = async () => {
    setLoading(true);
    setModalText("Salvando alterações, por favor aguarde...");
  
    try {
      const formDados = new FormData();
      formDados.append("jogos_nome", formData.jogos_nome);
      formDados.append("jogos_descricao", formData.jogos_descricao);
      formDados.append("jogos_link", formData.jogos_link);
      formDados.append("jogos_autor", formData.jogos_autor);
      formDados.append("categoria_jogo_id", formData.categoria_jogo_id);
  
      if (file) {
        formDados.append("jogos_url_img", file);
      }
  
      console.log("FormData enviado:");
      for (let [key, value] of formDados.entries()) {
        console.log(`${key}:`, value);
      }
  
      const response = await fetch(`/api/jogos/${formData.jogos_id}`, {
        method: "PUT",
        body: formDados,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro desconhecido no servidor.");
      }
  
      const data = await response.json();
      setModalText("Dados atualizados com sucesso!");
      setTimeout(() => {
        setModalText("");
        location.reload();
      }, 2000);
    } catch (error) {
      console.error("Erro na requisição:", error);
      setModalText("Erro ao atualizar os dados. Verifique a conexão.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col">
      <div className="mt-2 space-y-2">

      <div className="flex justify-center">
        <FaRegEdit className="flex w-10 h-10 mb-3 mt-3 transition-transform duration-300 hover:scale-125"/>
      </div>

            {/* Corpo do modal para mensagens */}
            {modalText && (
              <div className="mt-4 p-4 bg-yellow-100 rounded-lg shadow">
                <p className="text-center text-gray-700">{modalText}</p>
              </div>
            )}


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
              <div>
                <p>Categoria Selecionada: {formData.categoria_jogo_nome || "Nenhuma selecionada"}</p>
              </div>
              <InputForm
                tipoInput="selectDados"
                label="Categoria do Jogo"
                dadosSelect={jogos}
                idSelect="categoria_jogo_id"
                nomeSelect="categoria_jogo_area_atuacao"
                valorInput={formData.categoria_jogo_id}
                metodoSubmit={handleCategoryChange}
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
                idFileInput="jogos_url_img"
                metodoSubmit={(e) =>
                  setFormData({ ...formData, jogos_url_img: e.target.files[0] })
                }
                onChange={(e) => handleInputChange("jogos_url_img", e.target.files[0])}
              />
      
      </div>

      <div className="flex flex-col mt-6 mb-4 space-x-4 ">
        <button
          className={`bg-green-600 text-white p-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
          }`}
          onClick={handleSave}
          disabled={loading} // Desativa o botão durante o loading
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button> 
      </div> 
    </div>
  );
}
