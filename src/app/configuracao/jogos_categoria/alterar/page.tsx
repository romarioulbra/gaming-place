"use client";

// import InputForm from "@/app/components/InputsForm";
// import { useState } from "react";

// export default function AlterarJogosCategoria({ dados }: { dados: any }) {
//   const [formData, setFormData] = useState(dados); // Inicializa o estado com os dados recebidos
//   const [loading, setLoading] = useState(false); // Estado para controlar o loading

//   const handleInputChange = (field: string, value: string | number) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value, // Atualiza o campo específico
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       console.log("Iniciando atualização...");
  
//       const response = await fetch(`/api/categoria_jogos/${formData.categoria_jogo_id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
  
//       console.log("Resposta do servidor:", response);
  
//       if (response.ok) {
//         const data = await response.json();
//         console.log("Atualização bem-sucedida:", data);
//         alert("Dados atualizados com sucesso!");
//       } else {
//         const errorData = await response.json();
//         console.error("Erro do servidor:", errorData);
//         alert(`Erro ao atualizar: ${errorData.error || "Erro desconhecido"}`);
//       }
//     } catch (error) {
//       console.error("Erro na requisição:", error);
//       alert("Erro ao atualizar os dados. Verifique a conexão.");
//     }
//   };
  

//   return (
//     <div className="flex flex-col">
//       <div className="mt-2 space-y-2">
//         {/* Campo ID */}
//         {/* <InputForm
//           tipoInput="text"
//           label="ID"
//           placeholder="Digite o ID"
//           valorInput={formData.categoria_jogo_id}
//           metodoSubmit={(e) =>
//             handleInputChange("categoria_jogo_id", e.target.value)
//           }
//         /> */}

//         {/* Campo Nome */}
//         <InputForm
//           tipoInput="text"
//           label="Área de Atuação"
//           placeholder=""
//           valorInput={formData.categoria_jogo_area_atuacao}
//           metodoSubmit={(e) =>
//             handleInputChange("categoria_jogo_area_atuacao", e.target.value)
//           }
//         />
//       </div>

//       <button
//         className={`bg-blue-600 text-white p-2 mt-4 rounded ${
//           loading ? "opacity-50" : ""
//         }`}
//         onClick={handleSave}
//         disabled={loading} // Desativa o botão durante o loading
//       >
//         {loading ? "Salvando..." : "Salvar Alterações"}
//       </button>  
      
//     </div>
//   );
// }




import { HiArrowUpCircle } from "react-icons/hi2";
import { FaSync } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

import { useState } from "react";

export default function AlterarJogosCategoria({ dados }: { dados: any }) {
  const [formData, setFormData] = useState(dados); // Inicializa com os dados recebidos
  const [modalText, setModalText] = useState(""); // Texto do modal
  const [loading, setLoading] = useState(false); // Estado para controlar o loading

  // Atualiza o estado ao editar os inputs
  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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

        {/* Campo Nome */}
        <label htmlFor="categoria_jogo_area_atuacao" className="block text-sm font-medium text-gray-700">
          Área de Atuação
        </label>
     

        <input
          type="text"
          id="categoria_jogo_area_atuacao"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite a área de atuação"
          value={formData.categoria_jogo_area_atuacao}
          onChange={(e) => handleInputChange("categoria_jogo_area_atuacao", e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-6 mb-4 space-x-4 ">
        <button
          className={`bg-blue-600 text-white p-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
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
