// "use client";
// import { useState, useEffect } from "react";
// import Botao from "@/app/components/Botao";
// import { GiFallingBlob } from "react-icons/gi";
// import Alert from "@/app/components/Alert";
// import CabecalhoVoltar from "@/app/components/CabecalhoVoltar";

// interface Emblema {
//   emblema_id: number;
//   emblema_nome: string;
// }

// interface FormData {
//   emblema_id: number | null;
//   tipo_emblema_criterio: string;
//   tipo_emblema_pontos: number;
// }

// export default function CadastrarCatEmblemas() {
//   const [formData, setFormData] = useState<FormData>({
//     emblema_id: null,
//     tipo_emblema_criterio: "",
//     tipo_emblema_pontos: 0,
//   });
//   const [emblemas, setEmblemas] = useState<Emblema[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [alert, setAlert] = useState<{ message: string; type: "sucesso" | "erro" } | null>(null);

//   useEffect(() => {
//     const fetchEmblemas = async () => {
//       try {
//         setIsLoading(true);
//         const res = await fetch("/api/emblemas");
//         if (!res.ok) throw new Error("Erro ao carregar emblemas");
//         const data = await res.json();
//         setEmblemas(Array.isArray(data) ? data : data.emblemas || []);
//       } catch (err) {
//         setAlert({ message: "Erro ao buscar emblemas.", type: "erro" });
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchEmblemas();
//   }, []);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     setFormData(prev => ({
//       ...prev,
//       [name]: name === "emblema_id" ? (value ? Number(value) : null) :
//              name === "tipo_emblema_pontos" ? Number(value) :
//              value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const { emblema_id, tipo_emblema_criterio, tipo_emblema_pontos } = formData;

//     if (!emblema_id || !tipo_emblema_criterio || tipo_emblema_criterio.trim() === "") {
//       return setAlert({ message: "Preencha todos os campos obrigatórios.", type: "erro" });
//     }

//     console.log('Dentro do HandleSubmit:', formData);

//     try {
//       setIsLoading(true);
//       const res = await fetch("/api/categoria_emblemas", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           emblema_id,
//           tipo_emblema_criterio,
//           tipo_emblema_pontos
//         }),
//       });

//        const text = await res.text(); // Obtenha a resposta como texto
//       console.log("Resposta Bruta:", text); // Log da resposta bruta
//        const data = JSON.parse(text); // Tente parsear o texto como JSON

//       if (!res.ok) throw new Error(data.error || "Erro ao cadastrar tipo de emblema");

//       setAlert({
//         message: "Tipo de emblema cadastrado com sucesso!",
//         type: "sucesso"
//       });

//       // Reset do formulário
//       setFormData({
//         emblema_id: null,
//         tipo_emblema_criterio: "",
//         tipo_emblema_pontos: 0
//       });

//     } catch (err: any) {
//       setAlert({
//         message: err.message || "Erro inesperado ao cadastrar.",
//         type: "erro"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // console.log('Estado do FormData:', formData);
//   return (
//     <>
//       <h1 className="text-center mt-32 mb-3 text-2xl font-bold">
//         Cadastro de Tipo de Emblema
//       </h1>
//       <CabecalhoVoltar Icone={GiFallingBlob} />

//       {alert && (
//         <Alert
//           message={alert.message}
//           tipoAlert={alert.type}
//           texto={alert.message}
//           cor={alert.type === "sucesso" ? "verde" : "vermelho"}
//           onClose={() => setAlert(null)}
//         />
//       )}

//       <div className="flex-auto ml-4 mr-4 mt-4 mb-10">
//         <div className="p-8 border border-gray-300 shadow-lg bg-white rounded-lg">
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-wrap gap-4">
//               <div className="flex-1">
//                 <label htmlFor="emblema_id" className="block mb-2 font-medium text-gray-700">
//                   Selecione o Emblema
//                 </label>
//                 <select
//                   id="emblema_id"
//                   name="emblema_id"
//                   value={formData.emblema_id || ""}
//                   onChange={handleInputChange}
//                   disabled={isLoading || emblemas.length === 0}
//                   className="w-full border border-gray-300 rounded-md px-3 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                   required
//                 >
//                   <option value="">Selecione um emblema</option>
//                   {emblemas.map((emb) => (
//                     <option key={emb.emblema_id} value={emb.emblema_id}>
//                       {emb.emblema_nome}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex-1">
//                 <label htmlFor="tipo_emblema_pontos" className="block mb-2 font-medium text-gray-700">
//                   Pontos
//                 </label>
//                 <input
//                   type="number"
//                   id="tipo_emblema_pontos"
//                   name="tipo_emblema_pontos"
//                   placeholder="Ex: 100"
//                   value={formData.tipo_emblema_pontos}
//                   onChange={handleInputChange}
//                   min="0"
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder-slate-500 text-black"
//                 />
//               </div>
//             </div>

//             <div className="mt-4">
//               <label htmlFor="tipo_emblema_criterio" className="block mb-2 font-medium text-gray-700">
//                 Critério
//               </label>
//               <textarea
//                 id="tipo_emblema_criterio"
//                 name="tipo_emblema_criterio"
//                 placeholder="Ex: Vencer 10 partidas seguidas"
//                 value={formData.tipo_emblema_criterio}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 required
//                 rows={10}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder-slate-500 text-black"
//               />
//             </div>

//             <div className="flex justify-center mt-6 mb-10">
//               <Botao
//                 texto={isLoading ? "Cadastrando..." : "Cadastrar"}
//                 tipo="submit"
//                 cor="verde"
//                 disabled={isLoading}
//                 className="min-w-[200px] py-3"
//               />
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Alert from "@/app/components/Alert";

interface Emblema {
  emblema_id: number;
  emblema_nome: string;
}

interface FormData {
  emblema_id: number | null;
  tipo_emblema_criterio: string;
  tipo_emblema_pontos: number;
}

export default function CadastrarEmblemasCategorias() {
  const [formData, setFormData] = useState<FormData>({
    emblema_id: null,
    tipo_emblema_criterio: "",
    tipo_emblema_pontos: 0,
  });
  const [emblemas, setEmblemas] = useState<Emblema[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: "sucesso" | "erro" } | null>(null);

  useEffect(() => {
    const fetchEmblemas = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/emblemas");
        if (!res.ok) throw new Error("Erro ao carregar emblemas");
        const data = await res.json();
        const emblemasList = Array.isArray(data) ? data : data.emblemas || [];
        setEmblemas(emblemasList);
      } catch {
        setAlert({ message: "Erro ao buscar emblemas.", type: "erro" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmblemas();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "emblema_id" || name === "tipo_emblema_pontos"
          ? value
            ? Number(value)
            : null
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { emblema_id, tipo_emblema_criterio, tipo_emblema_pontos } = formData;

    if (!emblema_id || tipo_emblema_criterio.trim() === "") {
      return setAlert({ message: "Preencha todos os campos obrigatórios.", type: "erro" });
    }

    try {
      setIsLoading(true);
      setAlert({ message: "Cadastrando tipo de emblema, por favor aguarde...", type: "sucesso" });

      const response = await fetch(`/api/categoria_emblemas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emblema_id,
          tipo_emblema_criterio,
          tipo_emblema_pontos,
        }),
      });

      const text = await response.text();
      const data: unknown = text ? JSON.parse(text) : {};

      if (!response.ok) {
        const errorData = data as { error?: string };
        throw new Error(errorData.error || "Erro ao cadastrar tipo de emblema");
      }

      setAlert({
        message: "Tipo de emblema cadastrado com sucesso!",
        type: "sucesso",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAlert({
          message: err.message || "Erro inesperado ao cadastrar.",
          type: "erro",
        });
      } else {
        setAlert({
          message: "Erro inesperado ao cadastrar.",
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
        <FaPlusCircle className="w-10 h-10 text-green-600 transition-transform duration-300 hover:scale-125" />
      </div>

      {alert && (
        <Alert
          message={alert.message}
          tipoAlert={alert.type}
          texto={alert.message}
          cor={alert.type === "sucesso" ? "verde" : "vermelho"}
          onClose={() => setAlert(null)}
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
                  <option value="">Selecione um emblema</option>
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
                {isLoading ? "Cadastrando..." : "Cadastrar Emblema"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
