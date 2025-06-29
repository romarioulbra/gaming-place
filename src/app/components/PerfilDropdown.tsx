// // ********** Carregamento com DRAWER
// "use client";
// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import { FaTimes } from "react-icons/fa";
// import axios from "axios";

// export default function PerfilDropdown({ avatarUrl, nome, email }) {
//   const { data: session } = useSession();

//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const [selectedFile, setSelectedFile] = useState(null);


//   const [formData, setFormData] = useState({
//     imagem: avatarUrl || "/img/avatar.jpg",
//     cidade: "",
//   });

//   // Abre e fecha o drawer
//   const toggleDrawer = () => {
//     setIsDrawerOpen((prev) => !prev);
//   };

//   // Atualiza os inputs do formulário
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Atualiza a imagem localmente antes do upload

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setFormData((prev) => ({
//         ...prev,
//         imagem: URL.createObjectURL(file), // Exibe preview
//       }));
//     }
//   };
  

//   // Busca os dados do perfil ao carregar o componente
//   useEffect(() => {
//     async function fetchPerfil() {
//       if (!session?.user?.email) return;

//       try {
//         const response = await axios.get("/api/perfis");
//         setFormData({
//           cidade: response.data.perfil_cidade || "",
//           imagem: response.data.perfil_imagem || "/img/avatar.jpg",
//         });
//       } catch (error) {
//         console.error("Erro ao buscar perfil:", error);
//       }
//     }

//     fetchPerfil();
//   }, [session?.user?.email]);

//   const handleSaveChanges = async () => {
//   try {
//     // Buscar o perfil primeiro para obter o ID
//     const perfilResponse = await axios.get("/api/perfis");
//     const perfilId = perfilResponse.data.perfil_id; // Pegamos o ID do perfil

//     if (!perfilId) {
//       throw new Error("ID do perfil não encontrado");
//     }

//     // Criar um objeto FormData para enviar os dados corretamente
//     const formDataToSend = new FormData();
//     formDataToSend.append("perfil_cidade", formData.cidade);

//     // Se houver uma nova imagem, adiciona ao FormData
//     if (selectedFile) {
//       formDataToSend.append("perfil_imagem", selectedFile);
//     }

//     // Enviar requisição PUT para atualizar o perfil
//     const response = await axios.put(`/api/perfis/${perfilId}`, formDataToSend, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     if (response.status !== 200) {
//       throw new Error("Erro ao atualizar perfil");
//     }

//     // console.log("Perfil atualizado:", response.data);

//     toggleDrawer();
//   } catch (error) {
//     console.error(error);
//     alert("Erro ao salvar alterações!");
//   }
// };

//   return (
//     <div className="relative">
//       {/* Botão do Avatar */}
//       <button onClick={toggleDrawer} className="flex items-center focus:outline-none">
//         <Image
//           src={formData.imagem}
//           alt="Avatar"
//           width={40}
//           height={40}
//           className="rounded-full object-cover w-12 h-12 border border-white p-1"
//         />
//       </button>

//       {/* Drawer */}
//       <div className={`fixed inset-0 z-50 flex transition-all duration-300 ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
//         {/* Fundo escuro para fechar ao clicar fora */}
//         <div
//           className={`flex-1 bg-black bg-opacity-50 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0"}`}
//           onClick={toggleDrawer}
//         />

//         {/* Drawer lateral */}
//         <div
//           className={`bg-white w-80 max-w-sm h-full shadow-lg p-6 ml-auto transform transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
//         >
//           {/* Header do Drawer */}
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold text-black">Alterar Perfil</h2>
//             <button onClick={toggleDrawer} className="p-1 rounded hover:bg-gray-200">
//               <FaTimes className="text-gray-600 w-5 h-5" />
//             </button>
//           </div>

//           {/* Conteúdo do Drawer */}
//           <div className="flex flex-col space-y-4">
//             {/* Alterar Imagem */}
//             <div className="text-center">
//               <Image
//                 src={formData.imagem}
//                 alt="Imagem do perfil"
//                 width={70}
//                 height={70}
//                 // className="rounded-full mx-auto"
//                 className="rounded-full object-cover w-20 h-20 mx-auto"
//               />
//               <p className="text-center font-bold mt-2 text-green-700">Olá, {nome}!</p>
//               <p className="text-center text-sm text-gray-500">{email}</p>

//               <label
//                 htmlFor="fileInput"
//                 className="mt-2 inline-block bg-rose-500 text-white text-sm px-4 py-1.5 rounded cursor-pointer hover:bg-rose-700"
//               >
//                 Alterar Imagem
//               </label>
//               <input
//                 id="fileInput"
//                 type="file"
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//             </div>

//             {/* Alterar Cidade */}
//             <div>
//               <label htmlFor="cidade" className="block font-bold text-sm mb-1 text-black">
//                 Cidade
//               </label>
//               <input
//                 type="text"
//                 name="cidade"
//                 id="cidade"
//                 value={formData.cidade}
//                 onChange={handleInputChange}
//                 placeholder="Digite sua cidade"
//                 className="block w-full border border-gray-300 rounded-md px-4 py-2 text-stone-500"
//               />
//             </div>

//             {/* Botão de salvar */}
//             <button
//               onClick={handleSaveChanges}
//               className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Salvar
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

interface PerfilDropdownProps {
  avatarUrl: string;
  nome: string;
  email: string;
  onImageChange?: (novaImagem: string) => Promise<void>;
}

export default function PerfilDropdown({ 
  avatarUrl, 
  nome, 
  email,
  onImageChange 
}: PerfilDropdownProps) {
  const { data: session } = useSession();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    imagem: avatarUrl || "/img/avatar.jpg",
    cidade: "",
  });

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageUrl = event.target.result as string;
          setFormData(prev => ({ ...prev, imagem: imageUrl }));
          
          // Chamar onImageChange se existir
          if (onImageChange) {
            onImageChange(imageUrl);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    async function fetchPerfil() {
      if (!session?.user?.email) return;

      try {
        const response = await axios.get("/api/perfis");
        setFormData({
          cidade: response.data.perfil_cidade || "",
          imagem: response.data.perfil_imagem || avatarUrl || "/img/avatar.jpg",
        });
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    }

    fetchPerfil();
  }, [session?.user?.email, avatarUrl]);

  const handleSaveChanges = async () => {
    try {
      const perfilResponse = await axios.get("/api/perfis");
      const perfilId = perfilResponse.data.perfil_id;

      if (!perfilId) {
        throw new Error("ID do perfil não encontrado");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("perfil_cidade", formData.cidade);

      if (selectedFile) {
        formDataToSend.append("perfil_imagem", selectedFile);
      }

      const response = await axios.put(`/api/perfis/${perfilId}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error("Erro ao atualizar perfil");
      }

      toggleDrawer();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar alterações!");
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleDrawer} className="flex items-center focus:outline-none">
        <Image
          src={formData.imagem}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full object-cover w-12 h-12 border border-white p-1"
        />
      </button>

      <div className={`fixed inset-0 z-50 flex transition-all duration-300 ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div
          className={`flex-1 bg-black bg-opacity-50 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={toggleDrawer}
        />

        <div
          className={`bg-white w-80 max-w-sm h-full shadow-lg p-6 ml-auto transform transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-black">Alterar Perfil</h2>
            <button onClick={toggleDrawer} className="p-1 rounded hover:bg-gray-200">
              <FaTimes className="text-gray-600 w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="text-center">
              <Image
                src={formData.imagem}
                alt="Imagem do perfil"
                width={70}
                height={70}
                className="rounded-full object-cover w-20 h-20 mx-auto"
              />
              <p className="text-center font-bold mt-2 text-green-700">Olá, {nome}!</p>
              <p className="text-center text-sm text-gray-500">{email}</p>

              <label
                htmlFor="fileInput"
                className="mt-2 inline-block bg-rose-500 text-white text-sm px-4 py-1.5 rounded cursor-pointer hover:bg-rose-700"
              >
                Alterar Imagem
              </label>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            <div>
              <label htmlFor="cidade" className="block font-bold text-sm mb-1 text-black">
                Cidade
              </label>
              <input
                type="text"
                name="cidade"
                id="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                placeholder="Digite sua cidade"
                className="block w-full border border-gray-300 rounded-md px-4 py-2 text-stone-500"
              />
            </div>

            <button
              onClick={handleSaveChanges}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}