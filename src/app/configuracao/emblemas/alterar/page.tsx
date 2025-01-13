"use client";

import { FaRegEdit } from "react-icons/fa";
import { useState,useEffect } from "react";
import InputForm from "@/app/components/InputsForm";
import Image from "next/image";

export default function AlterarEmblemas({ dados }: { dados: any }) {
  const [formData, setFormData] = useState(dados); // Inicializa com os dados recebidos
  const [modalText, setModalText] = useState(""); // Texto do modal
  const [loading, setLoading] = useState(false); // Estado para controlar o loading
  const [file, setFile] = useState<File | null>(null); // Estado para o arquivo
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [Emblemas, setEmblemas] = useState([]);

  // Atualiza o estado ao editar os inputs
  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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


    // Função para buscar categorias dos Emblemas
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


  const handleSave = async () => {
    setLoading(true);
    setModalText("Salvando alterações, por favor aguarde...");
  
    try {
      const formDados = new FormData();
      formDados.append("emblema_nome", formData.emblema_nome);
      formDados.append("emblema_criterio", formData.emblema_criterio);
      formDados.append("emblemas_pontos", formData.emblemas_pontos);
      formDados.append("emblemas_status", formData.emblemas_status);
  
      if (file) {
        formDados.append("emblema_imagem", file);
      }
  
      console.log("FormData enviado:");
      for (let [key, value] of formDados.entries()) {
        console.log(`${key}:`, value);
      }
  
      const response = await fetch(`/api/emblemas/${formData.emblema_id}`, {
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

            <div className="grid grid-cols-3 gap-4">
              <InputForm
                tipoInput="text"
                label="Emblema"
                placeholder="Nome do Emblema"
                valorInput={formData.emblema_nome}
                metodoSubmit={(e) => setFormData({ ...formData, emblema_nome: e.target.value })}
              />


              <InputForm
                tipoInput="text"
                label="Valor de Pontos"
                placeholder="www.exemplo.com.br"
                valorInput={formData.emblemas_pontos}
                metodoSubmit={(e) => setFormData({ ...formData, emblemas_pontos: e.target.value })}
              />

              <InputForm
                tipoInput="text"
                label="Status"
                placeholder="www.exemplo.com.br"
                valorInput={formData.emblemas_status}
                metodoSubmit={(e) => setFormData({ ...formData, emblemas_status: e.target.value })}
              />
            </div>

              <InputForm
                tipoInput="textarea"
                label="Critérios"
                placeholder="Digite aqui o critério do Emblema"
                valorInput={formData.emblema_criterio}
                metodoSubmit={(e) => setFormData({ ...formData, emblema_criterio: e.target.value })}
              />


              {(previewImage || formData.emblema_imagem) && (
                <div className="mb-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <Image
                        src={previewImage || formData.emblema_imagem} // Exibe o preview ou a URL existente
                        alt="Imagem do Jogo"
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
                idFileInput="emblema_imagem"
                metodoSubmit={(e) =>
                  setFormData({ ...formData, emblema_imagem: e.target.files[0] })
                }
                onChange={(e) => handleInputChange("emblema_imagem", e.target.files[0])}
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
