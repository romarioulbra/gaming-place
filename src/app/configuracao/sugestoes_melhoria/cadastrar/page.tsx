"use client";
import { useState, useEffect } from "react";
import Botao from "@/app/components/Botao";
import InputForm from "@/app/components/InputsForm";
import { FaMeteor } from "react-icons/fa";
import Alert from "@/app/components/Alert";
import CabecalhoVoltar from "@/app/components/CabecalhoVoltar";
import axios from "axios";

export default function CadastrarSugestoesMelhorias() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"sucesso" | "erro">("sucesso");
  const [criterios, setCriterios] = useState<
    { tipo_emblema_id: string; tipo_emblema_criterio: string }[]
  >([]);
  const [usuarios, setUsuarios] = useState<
    { usuario_id: number; usuario_nome: string }[]
  >([]);

  const [formData, setFormData] = useState({
    sugestao_melhoria_nome: "",
    sugestao_melhoria_descricao: "",
    sugestao_melhoria_status: "",
    usuario_id: "",
    tipo_emblema_id: "",
  });

  // Buscar critérios de emblemas
  useEffect(() => {
    async function fetchCriterios() {
      try {
        const response = await axios.get("/api/categoria_emblemas");
        setCriterios(response.data.cat_emblemas);
      } catch (error) {
        console.error("Erro ao carregar critérios:", error);
      }
    }
    fetchCriterios();
  }, []);

  // Buscar usuários
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await axios.get("/api/usuarios");
        setUsuarios(response.data.users);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    }
    fetchUsuarios();
  }, []);

  const handleUsuarioChange = (usuarioId: string) => {
    const usuarioSelecionado = usuarios.find(u => u.usuario_id.toString() === usuarioId);
    
    if (usuarioSelecionado) {
      setFormData({
        ...formData,
        usuario_id: usuarioId,
        sugestao_melhoria_nome: usuarioSelecionado.usuario_nome
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...formData,
      usuario_id: parseInt(formData.usuario_id),
      tipo_emblema_id: parseInt(formData.tipo_emblema_id),
    };

    try {
      const res = await fetch("/api/sugestoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setAlertMessage(errorData.error || "Erro ao cadastrar Sugestão.");
        setAlertType("erro");
        setAlertVisible(true);
        return;
      }

      setAlertMessage("Sugestão cadastrada com sucesso!");
      setAlertType("sucesso");
      setAlertVisible(true);

      setFormData({
        sugestao_melhoria_nome: "",
        sugestao_melhoria_descricao: "",
        sugestao_melhoria_status: "",
        usuario_id: "",
        tipo_emblema_id: "",
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
      <h1 className="text-center mt-32 mb-3 text-2xl font-bold">Cadastro de Sugestões e Melhorias</h1>

      <CabecalhoVoltar Icone={FaMeteor} />

      {alertVisible && (
        <div className="mb-6">
          <Alert
            message={alertMessage}
            tipoAlert={alertType}
            texto={alertMessage}
            cor={alertType === "sucesso" ? "verde" : "vermelho"}
          />
        </div>
      )}

      <div className="flex-auto ml-4 mr-4 mt-4 mb-4">
        <div className="p-8 border border-gray-300 shadow-lg bg-white rounded-lg mr-2 ml-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg mt-2">
            <div className="p-6">
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex-1">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Solicitante *
                    </label>
                    <select
                      id="usuario_id"
                      name="usuario_id"
                      required
                      value={formData.usuario_id}
                      onChange={(e) => handleUsuarioChange(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 placeholder-slate-500 text-black"
                    >
                      <option value="" disabled>
                        Selecione o solicitante
                      </option>
                      {usuarios.map((usuario) => (
                        <option key={usuario.usuario_id} value={usuario.usuario_id}>
                          {usuario.usuario_nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  <InputForm
                    tipoInput="hidden"
                    label=" "
                    valorInput={formData.sugestao_melhoria_nome}
                    name="sugestao_melhoria_nome"
                  />

                  <InputForm
                    tipoInput="hidden"
                     label=" "
                    valorInput={formData.usuario_id}
                    name="usuario_id"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  id="sugestao_melhoria_status"
                  name="sugestao_melhoria_status"
                  required
                  value={formData.sugestao_melhoria_status}
                  onChange={(e) =>
                    setFormData({ ...formData, sugestao_melhoria_status: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 placeholder-slate-500 text-black"
                >
                  <option value="" disabled>
                    Selecione o status
                  </option>
                  <option value="enviado">Enviado</option>
                  <option value="validado">Validado</option>
                  <option value="rejeitado">Rejeitado</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Critério (Categoria do Emblema) *
                </label>
                <select
                  id="tipo_emblema_id"
                  name="tipo_emblema_id"
                  required
                  value={formData.tipo_emblema_id}
                  onChange={(e) =>
                    setFormData({ ...formData, tipo_emblema_id: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 placeholder-slate-500 text-black"
                >
                  <option value="" disabled>
                    Selecione um critério
                  </option>
                  {criterios.map((crit) => (
                    <option key={crit.tipo_emblema_id} value={crit.tipo_emblema_id}>
                      {crit.tipo_emblema_criterio}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição da Sugestão *
                </label>
                <textarea
                  placeholder="Descreva detalhadamente sua sugestão ou melhoria..."
                  value={formData.sugestao_melhoria_descricao}
                  name="sugestao_melhoria_descricao"
                  onChange={(e) =>
                    setFormData({ ...formData, sugestao_melhoria_descricao: e.target.value })
                  }
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 text-black"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Botao 
                texto="Cadastrar Sugestão" 
                tipo="submit" 
                cor="verde" 
                className="px-8 py-3 text-lg font-medium"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}