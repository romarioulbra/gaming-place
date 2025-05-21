// "use client";

// import { FaRegEdit } from "react-icons/fa";
// import { useState } from "react";
// import InputForm from "@/app/components/InputsForm";
// import Image from "next/image";

// export default function AlterarJogosCategoria({ dados }: { dados: any }) {
//   const [formData, setFormData] = useState(dados); // Inicializa com os dados recebidos
//   const [modalText, setModalText] = useState(""); // Texto do modal
//   const [loading, setLoading] = useState(false); // Estado para controlar o loading
//   const [file, setFile] = useState<File | null>(null); // Estado para o arquivo
  
//   // Atualiza o estado ao editar os inputs
//   const handleInputChange = (field: string, value: string | number) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       setFile(selectedFile); // Salva o arquivo no estado
//     }
//   };


//   const handleSave = async () => {
//     setLoading(true);
//     setModalText("Salvando alterações, por favor aguarde...");
  
//     try {
//       // Criando o FormData corretamente
//       const formDados = new FormData();
//       formDados.append("categoria_jogo_area_atuacao", formData.categoria_jogo_area_atuacao);
//       if (file) {
//         formDados.append("categoria_jogo_icone", file);
//       }
  
//       const response = await fetch(`/api/categoria_jogos/${formData.categoria_jogo_id}`, {
//         method: "PUT",
//         body: formDados, // Envia o FormData (correto agora)
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         setModalText("Dados atualizados com sucesso!");
//         setTimeout(() => {
//           setModalText("");
//           location.reload();
//         }, 2000);
//       } else {
//         const errorData = await response.json();
//         console.error("Erro do servidor:", errorData);
//         setModalText(`Erro ao atualizar: ${errorData.error || "Erro desconhecido"}`);
//       }
//     } catch (error) {
//       console.error("Erro na requisição:", error);
//       setModalText("Erro ao atualizar os dados. Verifique a conexão.");
//     } finally {
//       setLoading(false);
//     }
//   };
  


//   return (
//     <div className="flex flex-col">
//       <div className="mt-2 space-y-2">

//       <div className="flex justify-center">
//         <FaRegEdit className="flex w-10 h-10 mb-3 mt-3 transition-transform duration-300 hover:scale-125"/>
//       </div>

//          {/* Corpo do modal para mensagens */}
//          {modalText && (
//           <div className="mt-4 p-4 bg-yellow-100 rounded-lg shadow">
//             <p className="text-center text-gray-700">{modalText}</p>
//           </div>
//         )}


//         <InputForm
//             tipoInput="text"
//             label="Área da Atuação"
//             valorInput={formData.categoria_jogo_area_atuacao}
//             metodoSubmit={(e) =>
//               setFormData({ ...formData, categoria_jogo_area_atuacao: e.target.value })
//             }
//             onChange={(e) => handleInputChange("categoria_jogo_area_atuacao", e.target.value)}
//         />

//         {/* Verificar como fazer */}
//         <div className="bg-indigo-300 pt-2">
//             <Image
//             // src="/img/arquivo_svg.png"
//               src="/img/svg.png"
//               width={35}
//               height={35}
//               alt="Picture of the author"
//               className="mt-1 mb-2 mx-auto"
//             />
//             <p className="font-mono  pl-3 text-center font-bold">Caminho do Arquivo Atual:</p>
//             <p className="font-mono  pl-3 text-center ">{formData.categoria_jogo_icone}</p><br />
//         </div>


//         <InputForm
//           tipoInput="fileInputSVG"
//           label="Ícone da Categoria - (SVG)"
//           placeholder="Nome da Categoria"
//           fileSVG = {handleFileChange}
//           idFileInput="categoria_jogo_icone"
//           metodoSubmit={(e) =>
//             setFormData({ ...formData, categoria_jogo_icone: e.target.files[0] })
//           }
//           onChange={(e) => handleInputChange("categoria_jogo_icone", e.target.files[0])}
//         />
       
//       </div>

//       <div className="flex flex-col mt-6 mb-4 space-x-4 ">
//         <button
//           className={`bg-green-600 text-white p-2 rounded ${
//             loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
//           }`}
//           onClick={handleSave}
//           disabled={loading} // Desativa o botão durante o loading
//         >
//           {loading ? "Salvando..." : "Salvar Alterações"}
//         </button> 
//       </div> 
//     </div>
//   );
// }


"use client";

import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import InputForm from "@/app/components/InputsForm";
import Image from "next/image";

interface CategoriaDados {
  categoria_jogo_area_atuacao: string;
  categoria_jogo_icone: string | File | null;
  categoria_jogo_id: string | number;
}

export default function AlterarJogosCategoria({ dados }: { dados: CategoriaDados }) {
  const [formData, setFormData] = useState<CategoriaDados>(dados);
  const [modalText, setModalText] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (field: keyof CategoriaDados, value: string | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setModalText("Salvando alterações, por favor aguarde...");

    try {
      const formDados = new FormData();
      formDados.append("categoria_jogo_area_atuacao", formData.categoria_jogo_area_atuacao);
      if (file) {
        formDados.append("categoria_jogo_icone", file);
      }

      const response = await fetch(`/api/categoria_jogos/${formData.categoria_jogo_id}`, {
        method: "PUT",
        body: formDados,
      });

      if (response.ok) {
        await response.json(); // Sem atribuir a variável
        setModalText("Dados atualizados com sucesso!");
        setTimeout(() => {
          setModalText("");
          location.reload();
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
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mt-2 space-y-2">
        <div className="flex justify-center">
          <FaRegEdit className="flex w-10 h-10 mb-3 mt-3 transition-transform duration-300 hover:scale-125" />
        </div>

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

        <div className="bg-indigo-300 pt-2">
          <Image
            src="/img/svg.png"
            width={35}
            height={35}
            alt="Ícone atual"
            className="mt-1 mb-2 mx-auto"
          />
          <p className="font-mono pl-3 text-center font-bold">Caminho do Arquivo Atual:</p>
          <p className="font-mono pl-3 text-center">{typeof formData.categoria_jogo_icone === "string" ? formData.categoria_jogo_icone : ""}</p>
          <br />
        </div>

        <InputForm
          tipoInput="fileInputSVG"
          label="Ícone da Categoria - (SVG)"
          placeholder="Nome da Categoria"
          fileSVG={handleFileChange}
          idFileInput="categoria_jogo_icone"
          metodoSubmit={(e) =>
            setFormData({ ...formData, categoria_jogo_icone: e.target.files?.[0] || null })
          }
          onChange={(e) => handleInputChange("categoria_jogo_icone", e.target.files?.[0] || null)}
        />
      </div>

      <div className="flex flex-col mt-6 mb-4 space-x-4 ">
        <button
          className={`bg-green-600 text-white p-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
          }`}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </div>
  );
}
