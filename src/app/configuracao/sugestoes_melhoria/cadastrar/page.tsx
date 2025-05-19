// "use client";
// import { useState, useEffect } from "react";
// import Botao from "@/app/components/Botao";
// import InputForm from "@/app/components/InputsForm";
// import { FaMeteor } from "react-icons/fa";
// import Alert from "@/app/components/Alert";
// import CabecalhoVoltar from "@/app/components/CabecalhoVoltar";
// import axios from "axios";

// export default function CadastrarSugestoesMelhorias() {

//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState<"sucesso" | "erro">("sucesso");
//   const [sugestoes, setSugestoes] = useState([]);
//   const [criterios, setCriterios] = useState<{ tipo_emblema_id: string, tipo_emblema_criterio: string }[]>([]);

//   const [formData, setFormData] = useState({
//     sugestao_melhoria_nome: "",
//     sugestao_melhoria_descricao: "",
//     sugestao_melhoria_status: "",
//     usuario_id: "",
//     tipo_emblema_id: "",
//   });



//   // Função para buscar categorias dos Jogos
//   useEffect(() => {
//     const fetchSugestao = async () => {
//       try {
//         const response = await fetch("/api/sugestoes");
//         const data = await response.json();
//         setSugestoes(data);
//       } catch (error) {
//         console.error("Erro ao buscar Sugestões:", error);
//       }
//     };
//     fetchSugestao();
//   }, []);


  


//   //Buscando Dados do BD para Recarregar na página
//   useEffect(() => {
//     async function fetchCriterios() {
//       try {
//         const response = await axios.get('/api/categoria_emblemas');
//         setCriterios(response.data.cat_emblemas);
//         console.log(criterios); 
//       } catch (error) {
//         console.error('Erro ao carregar critérios:', error);
//       }
//     }
//     fetchCriterios();
//   }, []);
  

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append("sugestao_melhoria_nome", formData.sugestao_melhoria_nome);
//     formDataToSend.append("sugestao_melhoria_descricao", formData.sugestao_melhoria_descricao);
//     formDataToSend.append("sugestao_melhoria_status", formData.sugestao_melhoria_status);
//     formDataToSend.append("usuario_id", formData.usuario_id);
//     formDataToSend.append("tipo_emblema_id", formData.tipo_emblema_id);


//     try {
//       const res = await fetch("/api/sugestoes", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         setAlertMessage(errorData.error || "Erro ao cadastrar Sugestões.");
//         setAlertType("erro");
//         setAlertVisible(true);
//         return;
//       }

//       setAlertMessage("Sugestão cadastrada com sucesso!");
//       setAlertType("sucesso");
//       setAlertVisible(true);

//       // Limpa o formulário e a pré-visualização
//       setFormData({
//         sugestao_melhoria_nome: "",
//         sugestao_melhoria_descricao: "",
//         sugestao_melhoria_status: "",
//         usuario_id: "",
//         tipo_emblema_id: "",
//       });
      

//     } catch (error) {
//       console.error("Erro inesperado:", error);
//       setAlertMessage("Erro no servidor. Por favor, tente novamente mais tarde.");
//       setAlertType("erro");
//       setAlertVisible(true);
//     }
//   };


//    console.log(criterios); 


//   return (
//     <>
//       <h1 className="text-center mt-32 mb-3 text-2xl font-bold">Cadastro de Sugestóes e Melhorias</h1>
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

//             <div className="flex flex-wrap gap-4  mt-4">              
//                 <div className="flex-1">
//                   <InputForm
//                     tipoInput="text"
//                     label="Nome do Solicitante"
//                     placeholder="Nome do Solicitante da Melhoria"
//                     valorInput={formData.sugestao_melhoria_nome}
//                     metodoSubmit={(e) => setFormData({ ...formData, sugestao_melhoria_nome: e.target.value })}
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <InputForm
//                     tipoInput="selectDados"
//                     label="Critério"
//                     placeholder="Nome do Solicitante da Melhoria"
//                     valorInput={criterios.tipo_emblema_criterio}
//                     metodoSubmit={(e) => setFormData({ ...formData, tipo_emblema_id: e.target.value })}
//                   />             
//                   {/* <select
//                     id="tipo_emblema_id"
//                     name="tipo_emblema_id"
//                     required
//                     value={formData.tipo_emblema_id}
//                     onChange={handleSelectChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
//                   >
//                     <option value="" disabled>Selecione um critério</option>
//                     {criterios.map((crit) => (
//                       <option key={crit.tipo_emblema_id} value={crit.tipo_emblema_id}>
//                         {crit.tipo_emblema_criterio}
//                       </option>
//                     ))}
//                   </select> */}
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-4  mt-4">             
//                 <div className="flex-1">             
//                   <InputForm
//                     tipoInput="select"
//                     label="Status"
//                     options={['Validado', 'Rejeitado','Enviado']}
//                     valorInput={formData.sugestao_melhoria_status}
//                     metodoSubmit={(e) => setFormData({ ...formData, sugestao_melhoria_status: e.target.value })}
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <InputForm
//                     tipoInput="text"
//                     label="Quantidade de Pontos"
//                     placeholder="40"
//                     valorInput={formData.sugestao_melhoria_titulo}
//                     metodoSubmit={(e) => setFormData({ ...formData, sugestao_melhoria_titulo: e.target.value })}
//                   />
//                 </div>
//               </div>    

//               <div className="mt-4">
//                 <InputForm
//                   tipoInput="textarea"
//                   label="Critério"
//                   placeholder="Digite aqui o critério e a descrição da sua Sugestão ou Melhoria"
//                   valorInput={formData.sugestao_melhoria_descricao}
//                   metodoSubmit={(e) => setFormData({ ...formData, sugestao_melhoria_descricao: e.target.value })}
//                 />
//               </div>

//           </div>

//             <div className="flex justify-center">
//               <Botao texto="Cadastrar" tipo="submit" cor="verde" />
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
        console.log('Criterios no efect:'+criterios)
      } catch (error) {
        console.error("Erro ao carregar critérios:", error);
      }
    }
    fetchCriterios();
  }, []);

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
                  <div className="flex flex-wrap gap-4  mt-4">
                    <div className="flex-1">
                        <InputForm
                          tipoInput="text"
                          label="Nome do Solicitante"
                          placeholder="Digite seu nome completo"
                          valorInput={formData.sugestao_melhoria_nome}
                          name="sugestao_melhoria_nome"
                          metodoSubmit={(e) =>
                            setFormData({ ...formData, sugestao_melhoria_nome: e.target.value })
                          }
                          className="w-full"
                        />
                      </div>  
                  </div>

                  <div>
                    <InputForm
                      tipoInput="select"
                      label="Status"
                      options={["Enviado", "Validado", "Rejeitado"]}
                      valorInput={formData.sugestao_melhoria_status}
                      name="sugestao_melhoria_status"
                      metodoSubmit={(e) =>
                        setFormData({ ...formData, sugestao_melhoria_status: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="flex-1">
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
                  <div className="flex-1">
                    <InputForm
                      tipoInput="textarea"
                      label="Descrição da Sugestão *"
                      placeholder="Descreva detalhadamente sua sugestão ou melhoria..."
                      valorInput={formData.sugestao_melhoria_descricao}
                      name="sugestao_melhoria_descricao"
                      metodoSubmit={(e) =>
                        setFormData({ ...formData, sugestao_melhoria_descricao: e.target.value })
                      }
                      rows={5}
                      className="w-full"
                    />
                  </div>

                  <InputForm
                    tipoInput="hidden"
                    label=" "
                    valorInput={formData.usuario_id}
                    name="usuario_id"
                    metodoSubmit={(e) =>
                      setFormData({ ...formData, usuario_id: e.target.value })
                    }
                  />
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