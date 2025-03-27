"use client";
import axios from "axios";
import InputForm from "@/app/components/InputsForm";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

import { PiLockKeyFill } from "react-icons/pi";


export default function AlterarUsuarios({ dados,tipoModal }) {
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
      // Requisição com Axios
      const response = await axios.put(`/api/usuarios/${formData.usuario_id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Verifica se a resposta é bem-sucedida
      if (response.status === 200) {
        console.log("Atualização bem-sucedida:", response.data);
  
        setModalText("Dados atualizados com sucesso!"); // Exibe mensagem de sucesso
  
        setTimeout(() => {
          setModalText(""); // Limpa o texto do modal
          location.reload(); // Recarrega a página/tabela
        }, 2000);
      }
    } catch (error) {
      // Trata erros
      console.error("Erro na requisição:", error);
      setModalText(
        `Erro ao atualizar os dados: ${
          error.response?.data?.error || "Erro desconhecido"
        }`
      );
    } finally {
      setLoading(false); // Finaliza o estado de loading
    }
  };
  

  return (
    <>
      <div className="flex flex-col">
        <div className="mt-2 space-y-2">
          {
              tipoModal === 'ModalCompleto' ? (
            <div className="flex justify-center">
              <FaRegEdit className="flex w-10 h-10 mb-3 mt-3 transition-transform duration-300 hover:scale-125" />
            </div>
            ):(
            <div className="flex justify-center">
              <PiLockKeyFill className="flex w-10 h-10 mb-3 mt-3 transition-transform duration-300 hover:scale-125 text-yellow-500 " />
            </div>
            )
          }
          {/* Corpo do modal para mensagens */}
          {modalText && (
            <div className="mt-4 p-4 bg-yellow-100 rounded-lg shadow">
              <p className="text-center text-gray-700">{modalText}</p>
            </div>
          )}


          {
            tipoModal === 'ModalCompleto' ? (
              <>
                <InputForm
                  tipoInput="text"
                  label="Nome"
                  placeholder="Nome do Usuário"
                  valorInput={formData.usuario_nome}
                  metodoSubmit={(e) => handleInputChange("usuario_nome", e.target.value)}
                />
                <InputForm
                  tipoInput="text"
                  label="Email"
                  placeholder="Email do Usuário"
                  valorInput={formData.usuario_email}
                  metodoSubmit={(e) => handleInputChange("usuario_email", e.target.value)}
                />
                <InputForm
                  tipoInput="text"
                  label="Senha"
                  placeholder="Senha do Usuário"
                  valorInput={formData.usuario_senha}
                  metodoSubmit={(e) => handleInputChange("usuario_senha", e.target.value)}
                />
                <InputForm
                  tipoInput="select"
                  label="Nível"
                  options={["Administrador", "Normal"]}
                  valorInput={formData.usuario_nivel}
                  metodoSubmit={(e) => handleInputChange("usuario_nivel", e.target.value)}
                />
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2 ">
                  <h2 className="mb-10 font-bold text-yellow-500 text-center">
                    Desculpe, Não é possível exibir a senha devido à questões de segurança da criptografia!
                    Por favor altere a Senha!
                  </h2>
                </div>

             
                <InputForm
                  tipoInput="text"
                  label="Senha"
                  placeholder="Senha do Usuário"
                  valorInput={formData.usuario_senha}
                  metodoSubmit={(e) => handleInputChange("usuario_senha", e.target.value)}
                />
              </>
            )
          }

        </div>

        <div className="flex flex-col mt-6 mb-4 space-x-4">
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
    </>
  );
}
