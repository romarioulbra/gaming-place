"use client";

import InputForm from "@/app/components/InputsForm";
import { useState } from "react";

export default function AlterarJogosCategoria({ dados }: { dados: any }) {
  const [formData, setFormData] = useState(dados); // Inicializa o estado com os dados recebidos
  const [loading, setLoading] = useState(false); // Estado para controlar o loading

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value, // Atualiza o campo específico
    }));
  };


  // const handleSave = async () => {
  //   setLoading(true); // Indica que o processo de atualização está em andamento
 
  //   try {
  //     console.log("Dados enviados no body:", JSON.stringify(formData));
  //     const response = await fetch(`/api/categoria_jogos/${formData.categoria_jogo_id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       alert("Dados atualizados com sucesso!");
  //     } else {
  //       const errorData = await response.json();
  //       alert(`Erro ao atualizar: ${errorData.message || "Erro desconhecido"}`);
  //     }
  //   } catch (error) {
  //     console.error("Erro ao atualizar:", error);
  //     alert("Erro ao atualizar os dados. Verifique a conexão.");
  //   } finally {
  //     setLoading(false); // Finaliza o estado de loading
  //   }

  // };

  const handleSave = async () => {
    try {
      console.log("Iniciando atualização...");
  
      const response = await fetch(`/api/categoria_jogos/${formData.categoria_jogo_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      console.log("Resposta do servidor:", response);
  
      if (response.ok) {
        const data = await response.json();
        console.log("Atualização bem-sucedida:", data);
        alert("Dados atualizados com sucesso!");
      } else {
        const errorData = await response.json();
        console.error("Erro do servidor:", errorData);
        alert(`Erro ao atualizar: ${errorData.error || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao atualizar os dados. Verifique a conexão.");
    }
  };
  

  return (
    <div className="flex flex-col">
      <div className="mt-2 space-y-2">
        {/* Campo ID */}
        {/* <InputForm
          tipoInput="text"
          label="ID"
          placeholder="Digite o ID"
          valorInput={formData.categoria_jogo_id}
          metodoSubmit={(e) =>
            handleInputChange("categoria_jogo_id", e.target.value)
          }
        /> */}

        {/* Campo Nome */}
        <InputForm
          tipoInput="text"
          label="Área de Atuação"
          placeholder=""
          valorInput={formData.categoria_jogo_area_atuacao}
          metodoSubmit={(e) =>
            handleInputChange("categoria_jogo_area_atuacao", e.target.value)
          }
        />
      </div>

      <button
        className={`bg-blue-600 text-white p-2 mt-4 rounded ${
          loading ? "opacity-50" : ""
        }`}
        onClick={handleSave}
        disabled={loading} // Desativa o botão durante o loading
      >
        {loading ? "Salvando..." : "Salvar Alterações"}
      </button>  
      
    </div>
  );
}
