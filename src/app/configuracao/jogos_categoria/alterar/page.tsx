"use client";

import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import InputForm from "@/app/components/InputsForm";
import Image from "next/image";

export default function AlterarJogosCategoria({ dados }: { dados: any }) {
  const [formData, setFormData] = useState(dados); // Inicializa com os dados recebidos
  const [modalText, setModalText] = useState(""); // Texto do modal
  const [loading, setLoading] = useState(false); // Estado para controlar o loading
  const [file, setFile] = useState<File | null>(null); // Estado para o arquivo
  
  // Atualiza o estado ao editar os inputs
  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); // Salva o arquivo no estado
    }
  };

  // console.log(formData.categoria_jogo_icone);
  
  // Função para salvar os dados com mensagem no modal
  const handleSave = async () => {
    setLoading(true); // Indica que a operação começou
    setModalText("Salvando alterações, por favor aguarde...");

    try {
      const response = await fetch(`/api/categoria_jogos/${formData.categoria_jogo_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Atualização bem-sucedida:", data);

        setModalText("Dados atualizados com sucesso!"); // Exibe mensagem de sucesso

        // Aguarde 2 segundos antes de fechar o modal e recarregar a tabela
        setTimeout(() => {
          setModalText(""); // Limpa o texto do modal
          location.reload(); // Recarrega a página/tabela
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error("Erro do servidor:", errorData);
        setModalText(`Erro ao atualizar: ${errorData.error || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setModalText("Erro ao atualizar os dados. Verifique a conexão.");
    } finally {
      setLoading(false); // Finaliza o estado de loading
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
            label="Área da Atuação"
            valorInput={formData.categoria_jogo_area_atuacao}
            metodoSubmit={(e) =>
              setFormData({ ...formData, categoria_jogo_area_atuacao: e.target.value })
            }
            onChange={(e) => handleInputChange("categoria_jogo_area_atuacao", e.target.value)}
        />

        {/* Verificar como fazer */}
        <div className="bg-rose-100 pt-2">
            <Image
            // src="/img/arquivo_svg.png"
              src="/img/svg.png"
              width={35}
              height={35}
              alt="Picture of the author"
              className="mt-1 mb-2 mx-auto"
            />
            <p className="font-mono bg-rose-100 pl-3 text-center font-bold">Caminho do Arquivo Atual:</p>
            <p className="font-mono bg-rose-100 pl-3 text-center ">{formData.categoria_jogo_icone}</p><br />
        </div>

        {/* <div className="bg-yellow-50 pt-2 flex items-center"> 
          <Image
            src="/img/svg.png"
            width={40}
            height={40}
            alt="Picture of the author"
            className="mt-1 mb-2 mr-3" 
          />
          <div>
            <p className="font-mono bg-yellow-50 pl-3 text-center font-bold">Caminho do Arquivo Atual:</p>
            <p className="font-mono bg-yellow-50 pl-3 text-left">{formData.categoria_jogo_icone}</p>
          </div>
        </div> */}


        <InputForm
          tipoInput="fileInputSVG"
          label="Ícone da Categoria - (SVG)"
          placeholder="Nome da Categoria"
          fileSVG = {handleFileChange}
          idFileInput="categoria_jogo_icone"
          metodoSubmit={(e) =>
            setFormData({ ...formData, categoria_jogo_icone: e.target.files[0] })
          }
          onChange={(e) => handleInputChange("categoria_jogo_icone", e.target.files[0])}
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
