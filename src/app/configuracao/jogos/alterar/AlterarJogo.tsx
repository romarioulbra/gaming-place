"use client";

import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect, ChangeEvent } from "react";
import InputForm from "@/app/components/InputsForm";
import Image from "next/image";

interface JogoData {
  jogos_id: string;
  jogos_nome: string;
  jogos_descricao?: string;
  jogos_link?: string;
  jogos_autor?: string;
  jogos_url_img?: string;
  categoria_jogo_id?: string;
  categoria_jogo_nome?: string;
}

interface CategoriaJogo {
  id: string;
  categoria_jogo_area_atuacao: string;
}

export default function AlterarJogos({ dados }: { dados: JogoData }) {
  const [formData, setFormData] = useState<JogoData>(dados);
  const [modalText, setModalText] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [jogos, setJogos] = useState<CategoriaJogo[]>([]);

  const handleInputChange = (field: keyof JogoData, value: string | File) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value as string,
    }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedCategory = jogos.find((jogo) => jogo.id === selectedId);

    setFormData((prev) => ({
      ...prev,
      categoria_jogo_id: selectedId,
      categoria_jogo_nome: selectedCategory?.categoria_jogo_area_atuacao || "",
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setPreviewImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    const fetchJogos = async () => {
      try {
        const response = await fetch("/api/categoria_jogos");
        const data = await response.json();
        setJogos(data.cat_jogos);
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
      formDados.append("jogos_descricao", formData.jogos_descricao  || "");
      formDados.append("jogos_link", formData.jogos_link  || "");
      formDados.append("jogos_autor", formData.jogos_autor || "");
      formDados.append("categoria_jogo_id", formData.categoria_jogo_id || "");

      if (file) {
        formDados.append("jogos_url_img", file);
      }

      const response = await fetch(`/api/jogos/${formData.jogos_id}`, {
        method: "PUT",
        body: formDados,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro desconhecido no servidor.");
      }

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
          <FaRegEdit className="w-10 h-10 mb-3 mt-3 transition-transform duration-300 hover:scale-125" />
        </div>

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
          metodoSubmit={(e) => handleInputChange("jogos_nome", e.target.value)}
        />

        <InputForm
          tipoInput="text"
          label="Link do Jogo"
          placeholder="www.exemplo.com.br"
          valorInput={formData.jogos_link}
          metodoSubmit={(e) => handleInputChange("jogos_link", e.target.value)}
        />

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex-1">
            <InputForm
              tipoInput="selectDados"
              label="Categoria do Jogo"
              dadosSelect={jogos}
              idSelect="id"
              nomeSelect="categoria_jogo_area_atuacao"
              valorInput={formData.categoria_jogo_id}
              metodoSubmit={handleCategoryChange}
            />
          </div>
          <div className="flex-1">
            <InputForm
              tipoInput="text"
              label="Desenvolvedor(es) do Jogo"
              placeholder="Fulano e Beltrano"
              valorInput={formData.jogos_autor}
              metodoSubmit={(e) => handleInputChange("jogos_autor", e.target.value)}
            />
          </div>
        </div>

        <InputForm
          tipoInput="textarea"
          label="Descrição"
          placeholder="Digite aqui a descrição do Jogo"
          valorInput={formData.jogos_descricao}
          metodoSubmit={(e) => handleInputChange("jogos_descricao", e.target.value)}
        />

        {(previewImage || formData.jogos_url_img) && (
          <div className="mb-4">
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32">
                <Image
                  src={previewImage || formData.jogos_url_img!}
                  alt="Imagem do Jogo"
                  layout="fixed"
                  objectFit="cover"
                  className="rounded-md"
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
        />
      </div>

      <div className="flex flex-col mt-6 mb-4 space-x-4">
        <button
          className={`bg-green-600 text-white p-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
          }`}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </div>
  );
}
