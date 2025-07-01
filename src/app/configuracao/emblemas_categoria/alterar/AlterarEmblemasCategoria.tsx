"use client";
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import Alert from "@/app/components/Alert";

interface Emblema {
  emblema_id: number;
  emblema_nome: string;
}

export interface TipoEmblema {
  tipo_emblema_id: number;
  tipo_emblema_criterio: string;
  tipo_emblema_pontos: number;
  emblema_id: number;
  emblema?: {
    emblema_nome: string;
  };
}

interface FormData {
  tipo_emblema_id: number | null;
  emblema_id: number | null;
  tipo_emblema_criterio: string;
  tipo_emblema_pontos: number;
}

export default function AlterarEmblemasCategorias({ dados }: { dados: TipoEmblema }) {
  const [formData, setFormData] = useState<FormData>({
    tipo_emblema_id: dados.tipo_emblema_id || null,
    emblema_id: dados.emblema_id || null,
    tipo_emblema_criterio: dados.tipo_emblema_criterio || "",
    tipo_emblema_pontos: dados.tipo_emblema_pontos || 0,
  });
  const [emblemas, setEmblemas] = useState<Emblema[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: "sucesso" | "erro" } | null>(null);
  const [selectedEmblema, setSelectedEmblema] = useState<string>(dados.emblema?.emblema_nome || "");

  // Busca a lista de emblemas disponíveis
  useEffect(() => {
    const fetchEmblemas = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/emblemas");
        if (!res.ok) throw new Error("Erro ao carregar emblemas");
        const data = await res.json();
        const emblemasList = Array.isArray(data) ? data : data.emblemas || [];
        setEmblemas(emblemasList);

        if (dados.emblema_id && dados.emblema?.emblema_nome) {
          setSelectedEmblema(dados.emblema.emblema_nome);
        }
      } catch {
        setAlert({ message: "Erro ao buscar emblemas.", type: "erro" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmblemas();
  }, [dados.emblema_id, dados.emblema?.emblema_nome]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const newFormData = {
      ...formData,
      [name]:
        name === "emblema_id" || name === "tipo_emblema_pontos"
          ? value
            ? Number(value)
            : null
          : value,
    };

    setFormData(newFormData);

    if (name === "emblema_id") {
      const emblemaSelecionado = emblemas.find((e) => e.emblema_id === Number(value));
      setSelectedEmblema(emblemaSelecionado ? emblemaSelecionado.emblema_nome : "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { emblema_id, tipo_emblema_criterio, tipo_emblema_pontos } = formData;

    if (!emblema_id || !tipo_emblema_criterio || tipo_emblema_criterio.trim() === "") {
      return setAlert({ message: "Preencha todos os campos obrigatórios.", type: "erro" });
    }

    try {
      setIsLoading(true);
      setAlert({ message: "Salvando alterações, por favor aguarde...", type: "sucesso" });

      const response = await fetch(`/api/categoria_emblemas/${formData.tipo_emblema_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emblema_id,
          tipo_emblema_criterio,
          tipo_emblema_pontos,
        }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) throw new Error(data.error || "Erro ao atualizar tipo de emblema");

      setAlert({
        message: "Tipo de emblema atualizado com sucesso!",
        type: "sucesso",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAlert({
          message: err.message || "Erro inesperado ao atualizar.",
          type: "erro",
        });
      } else {
        setAlert({
          message: "Erro inesperado ao atualizar.",
          type: "erro",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center mb-4">
        <FaRegEdit className="w-10 h-10 transition-transform duration-300 hover:scale-125" />
      </div>

      {alert && (
        <Alert
          // message={alert.message}
          tipoAlert={alert.type}
          texto={alert.message}
          cor={alert.type === "sucesso" ? "verde" : "vermelho"}
          // onClose={() => setAlert(null)}
        />
      )}

      <div className="flex-auto ml-4 mr-4 mt-4 mb-32">
        <div className="p-8 border border-gray-300 shadow-lg bg-white rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <label htmlFor="emblema_id" className="block mb-2 font-medium text-gray-700">
                  Selecione o Emblema
                </label>
                <select
                  id="emblema_id"
                  name="emblema_id"
                  value={formData.emblema_id || ""}
                  onChange={handleInputChange}
                  disabled={isLoading || emblemas.length === 0}
                  className="w-full border border-gray-300 rounded-md px-3 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">
                    Atualmente selecionado: <span className="font-medium">{selectedEmblema}</span>
                  </option>
                  {emblemas.map((emb) => (
                    <option key={emb.emblema_id} value={emb.emblema_id}>
                      {emb.emblema_nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label htmlFor="tipo_emblema_pontos" className="block mb-2 font-medium text-gray-700">
                  Pontos
                </label>
                <input
                  type="number"
                  id="tipo_emblema_pontos"
                  name="tipo_emblema_pontos"
                  placeholder="Ex: 100"
                  value={formData.tipo_emblema_pontos}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder-slate-500 text-black"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="tipo_emblema_criterio" className="block mb-2 font-medium text-gray-700">
                Critério
              </label>
              <textarea
                id="tipo_emblema_criterio"
                name="tipo_emblema_criterio"
                placeholder="Ex: Vencer 10 partidas seguidas"
                value={formData.tipo_emblema_criterio}
                onChange={handleInputChange}
                disabled={isLoading}
                required
                rows={10}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder-slate-500 text-black"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className={`bg-green-600 text-white p-3 rounded-md min-w-[200px] ${
                  isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
