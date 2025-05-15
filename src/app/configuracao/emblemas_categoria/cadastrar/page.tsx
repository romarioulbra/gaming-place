// "use client";
// import { useState, useEffect } from "react";
// import Botao from "@/app/components/Botao";
// import InputForm from "@/app/components/InputsForm";
// import { FaMeteor } from "react-icons/fa";
// import Alert from "@/app/components/Alert";
// import CabecalhoVoltar from "@/app/components/CabecalhoVoltar";
// // import Image from "next/image";

// export default function CadastrarCatEmblemas() {
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState<"sucesso" | "erro">("sucesso");
//   const [emblemas,setEmblemas] = useState([]);
//   // const [file, setFile] = useState<File | null>(null);
//   // const [previewImage, setPreviewImage] = useState<string | null>(null);

//   const [formData, setFormData] = useState({
//     emblema_nome: "",
//     tipo_emblema_criterio: "",
//     tipo_emblema_pontos: "",
//     emblemas_status: "",
//   });

//   // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const selectedFile = e.target.files?.[0];
//   //   if (selectedFile) {
//   //     setFile(selectedFile);
//   //     setPreviewImage(URL.createObjectURL(selectedFile));
//   //   }
//   // };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Primeiro: Cadastrar o Emblema (com imagem)
//     const emblemaFormData = new FormData();
//     emblemaFormData.append("emblema_nome", formData.emblema_nome);
//     emblemaFormData.append("emblemas_status", formData.emblemas_status);
//     // if (file) emblemaFormData.append("emblema_imagem", file);

//     try {
//       const resEmblema = await fetch("/api/emblemas", {
//         method: "POST",
//         body: emblemaFormData,
//       });

//       if (!resEmblema.ok) {
//         const errorData = await resEmblema.json();
//         throw new Error(errorData.error || "Erro ao cadastrar emblema.");
//       }

//       const { emblema_id } = await resEmblema.json();

//       // Segundo: Cadastrar o Tipo de Emblema, relacionando com o Emblema criado
//       const tipoRes = await fetch("/api/tipo-emblemas", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           tipo_emblema_criterio: formData.tipo_emblema_criterio,
//           tipo_emblema_pontos: formData.tipo_emblema_pontos,
//           emblema_id: emblema_id,
//         }),
//       });

//       if (!tipoRes.ok) {
//         throw new Error("Erro ao cadastrar tipo de emblema.");
//       }

//       setAlertMessage("Emblema e tipo cadastrados com sucesso!");
//       setAlertType("sucesso");
//       setAlertVisible(true);

//       // Reset
//       setFormData({
//         emblema_nome: "",
//         tipo_emblema_criterio: "",
//         tipo_emblema_pontos: "",
//         emblemas_status: "",
//       });
//       // setFile(null);
//       // setPreviewImage(null);
//       // const fileInput = document.getElementById("emblema_imagem") as HTMLInputElement;
//       // if (fileInput) fileInput.value = "";
//     } catch (error: any) {
//       setAlertMessage(error.message || "Erro inesperado.");
//       setAlertType("erro");
//       setAlertVisible(true);
//     }
//   };

//     // Função para buscar categorias dos Jogos
//   useEffect(() => {
//     const fetchEmblemas = async () => {
//       try {
//         const response = await fetch("/api/emblemas");
//         const data = await response.json();
//         setEmblemas(data);
//       } catch (error) {
//         console.error("Erro ao buscar Emblemas:", error);
//       }
//     };
//     fetchEmblemas();
//   }, []);



//   return (
//     <>
//       <h1 className="text-center mt-32 mb-3 text-2xl font-bold">Cadastro de Categoria de Emblemas</h1>
//       <CabecalhoVoltar Icone={FaMeteor} />

//       {alertVisible && (
//         <Alert
//           message={alertMessage}
//           tipoAlert={alertType}
//           texto={alertMessage}
//           cor={alertType === "sucesso" ? "verde" : "vermelho"}
//         />
//       )}

//       <div className="flex-auto ml-4 mr-4 mt-4 mb-4">
//         <div className="p-8 border border-gray-300 shadow-lg bg-white rounded-lg mr-2 ml-2">
//           <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg mt-2">
//             <div className="p-6">
           
//               <div className="flex flex-wrap gap-4 mt-4">
//                 <div className="flex-1">
//                   <InputForm
//                     tipoInput="select"
//                     label="Emblema"
//                     options={["Ativo", "Inativo"]}
//                     valorInput={formData.emblemas_status}
//                     metodoSubmit={(e) => setFormData({ ...formData, emblemas_status: e.target.value })}
//                   />
//                 </div>

               

//                 <div className="flex-1">
//                   <InputForm
//                     tipoInput="text"
//                     label="Pontos"
//                     placeholder="Ex: 100"
//                     valorInput={formData.tipo_emblema_pontos}
//                     metodoSubmit={(e) => setFormData({ ...formData, tipo_emblema_pontos: e.target.value })}
//                   />
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <InputForm
//                   tipoInput="textarea"
//                   label="Critério do Tipo de Emblema"
//                   placeholder="Ex: Ganhar 10 partidas consecutivas"
//                   valorInput={formData.tipo_emblema_criterio}
//                   metodoSubmit={(e) => setFormData({ ...formData, tipo_emblema_criterio: e.target.value })}
//                 />
//               </div>

//               {/* {previewImage && (
//                 <div className="mb-4">
//                   <div className="flex justify-center mb-4">
//                     <div className="relative w-32 h-32">
//                       <Image
//                         src={previewImage}
//                         alt="Pré-visualização"
//                         layout="fixed"
//                         objectFit="cover"
//                         className="max-w-full h-auto rounded-md"
//                         width={150}
//                         height={150}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )} */}

//               {/* <div className="mt-4">
//                 <InputForm
//                   tipoInput="fileInput"
//                   label="Imagem do Emblema - (PNG)"
//                   fileImage={handleFileChange}
//                   idFileInput="emblema_imagem"
//                 />
//               </div> */}

//               <div className="flex justify-center mt-6">
//                 <Botao texto="Cadastrar" tipo="submit" cor="verde" />
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }


// "use client";
// import { useState, useEffect } from "react";
// import Botao from "@/app/components/Botao";
// import InputForm from "@/app/components/InputsForm";
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
//       const res = await fetch("/api/tipo_emblemas", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           emblema_id,
//           tipo_emblema_criterio,
//           tipo_emblema_pontos
//         }),
//       });

//       const data = await res.json();

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

//   console.log('Estado do FormData:', formData);
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

//       <div className="flex-auto ml-4 mr-4 mt-4 mb-32">
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
//                 <InputForm
//                   tipoInput="number"
//                   name="tipo_emblema_pontos"
//                   label="Pontos"
//                   placeholder="Ex: 100"
//                   value={formData.tipo_emblema_pontos}
//                   onChange={handleInputChange}
//                   min="0"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="mt-4">
//               <InputForm
//                 tipoInput="textarea"
//                 name="tipo_emblema_criterio"
//                 label="Critério"
//                 placeholder="Ex: Vencer 10 partidas seguidas"
//                 value={formData.tipo_emblema_criterio}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 required
//                 rows={3}
//               />
//             </div>

//             <div className="flex justify-center mt-6">
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
import { useState, useEffect } from "react";
import Botao from "@/app/components/Botao";
import { GiFallingBlob } from "react-icons/gi";
import Alert from "@/app/components/Alert";
import CabecalhoVoltar from "@/app/components/CabecalhoVoltar";

interface Emblema {
  emblema_id: number;
  emblema_nome: string;
}

interface FormData {
  emblema_id: number | null;
  tipo_emblema_criterio: string;
  tipo_emblema_pontos: number;
}

export default function CadastrarCatEmblemas() {
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
        setEmblemas(Array.isArray(data) ? data : data.emblemas || []);
      } catch (err) {
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

    setFormData(prev => ({
      ...prev,
      [name]: name === "emblema_id" ? (value ? Number(value) : null) :
             name === "tipo_emblema_pontos" ? Number(value) :
             value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { emblema_id, tipo_emblema_criterio, tipo_emblema_pontos } = formData;

    if (!emblema_id || !tipo_emblema_criterio || tipo_emblema_criterio.trim() === "") {
      return setAlert({ message: "Preencha todos os campos obrigatórios.", type: "erro" });
    }

    console.log('Dentro do HandleSubmit:', formData);

    try {
      setIsLoading(true);
      const res = await fetch("/api/categoria_emblemas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emblema_id,
          tipo_emblema_criterio,
          tipo_emblema_pontos
        }),
      });

       const text = await res.text(); // Obtenha a resposta como texto
      console.log("Resposta Bruta:", text); // Log da resposta bruta
       const data = JSON.parse(text); // Tente parsear o texto como JSON

      if (!res.ok) throw new Error(data.error || "Erro ao cadastrar tipo de emblema");

      setAlert({
        message: "Tipo de emblema cadastrado com sucesso!",
        type: "sucesso"
      });

      // Reset do formulário
      setFormData({
        emblema_id: null,
        tipo_emblema_criterio: "",
        tipo_emblema_pontos: 0
      });

    } catch (err: any) {
      setAlert({
        message: err.message || "Erro inesperado ao cadastrar.",
        type: "erro"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // console.log('Estado do FormData:', formData);
  return (
    <>
      <h1 className="text-center mt-32 mb-3 text-2xl font-bold">
        Cadastro de Tipo de Emblema
      </h1>
      <CabecalhoVoltar Icone={GiFallingBlob} />

      {alert && (
        <Alert
          message={alert.message}
          tipoAlert={alert.type}
          texto={alert.message}
          cor={alert.type === "sucesso" ? "verde" : "vermelho"}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="flex-auto ml-4 mr-4 mt-4 mb-10">
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

            <div className="flex justify-center mt-6 mb-10">
              <Botao
                texto={isLoading ? "Cadastrando..." : "Cadastrar"}
                tipo="submit"
                cor="verde"
                disabled={isLoading}
                className="min-w-[200px] py-3"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}