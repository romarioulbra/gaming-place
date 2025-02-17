// ********** Opção com Modal

// "use client";
// import Image from "next/image";
// import { useState } from "react";

 
// export default function PerfilDropdown({ avatarUrl, nome, email }){

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     imagem: '/img/avatar.jpg', // Imagem padrão
//     cidade: '',
//   });

//   const handleOpenEditModal = () => {
//     setIsEditModalOpen(true);
//   };

//   const handleCloseEditModal = () => {
//     setIsEditModalOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSaveChanges = () => {
//     // Aqui você pode enviar os dados atualizados para o backend ou atualizar o estado
//     console.log('Dados atualizados:', formData);
//     handleCloseEditModal();
//   };

//   return(
//     <>
//       <div className="relative">
//         <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
//           <Image
//             src={avatarUrl} // URL do avatar do usuário
//             alt="Avatar"
//             width={40}
//             height={40}
//             className="rounded-full border border-white"
//           />
//         </button>

//         {isDropdownOpen && (
//           <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg">
//             <div className="p-4 border-b">
//               <Image
//                 src={formData.imagem} // Atualiza a imagem conforme alterada
//                 alt="Avatar"
//                 width={70}
//                 height={70}
//                 className="rounded-full mx-auto"
//               />
//               <p className="text-center font-bold mt-2">Olá, {nome}!</p>
//               <p className="text-center text-sm text-gray-500">{email}</p>
//             </div>
//             <ul className="p-4 space-y-2">
//               <li>
//                 <button
//                   onClick={handleOpenEditModal}
//                   className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md w-full text-left"
//                 >
//                   Gerenciar Perfil
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}

//         {/* Modal de alteração */}
//         {isEditModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg w-96 p-6">
//               <h2 className="text-lg font-bold text-center mb-4 text-black">Alterar Perfil</h2>
//               <div className="flex flex-col space-y-4">
//                 {/* Alterar imagem */}
//                 <div className="text-center">
//                   <Image
//                     src={formData.imagem}
//                     alt="Imagem do perfil"
//                     width={100}
//                     height={100}
//                     className="rounded-full mx-auto"
//                   />
//                   <input
//                     type="text"
//                     name="imagem"
//                     value={formData.imagem}
//                     onChange={handleInputChange}
//                     placeholder="URL da imagem"
//                     className="mt-2 block w-full border border-gray-300 rounded-md px-4 py-2"
//                   />
//                 </div>

//                 {/* Alterar cidade */}
//                 <div>
//                   <label htmlFor="cidade" className="block font-bold text-sm mb-1">
//                     Cidade
//                   </label>
//                   <input
//                     type="text"
//                     name="cidade"
//                     id="cidade"
//                     value={formData.cidade}
//                     onChange={handleInputChange}
//                     placeholder="Digite sua cidade"
//                     className="block w-full border border-gray-300 rounded-md px-4 py-2"
//                   />
//                 </div>

//                 {/* Botões */}
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     onClick={handleCloseEditModal}
//                     className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700"
//                   >
//                     Cancelar
//                   </button>
//                   <button
//                     onClick={handleSaveChanges}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                   >
//                     Salvar
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// // ********** Carregamento na mesma tela
// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import InputForm from "./InputsForm";

// export default function PerfilDropdown({ avatarUrl, nome, email }) {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     imagem: avatarUrl || "/img/avatar.jpg", // Imagem padrão
//     cidade: "",
//   });

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const fileUrl = URL.createObjectURL(file); // Cria uma URL para pré-visualização
//       setFormData((prev) => ({
//         ...prev,
//         imagem: fileUrl, // Atualiza a imagem no estado
//       }));
//     }
//   };

//   const handleSaveChanges = () => {
//     console.log("Dados atualizados:", formData); // Simula o salvamento
//     setIsEditing(false); // Sai do modo de edição
//   };

//   return (
//     <div className="relative">
//       {/* Botão do Avatar */}
//       <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
//         <Image
//           src={avatarUrl}
//           alt="Avatar"
//           width={40}
//           height={40}
//           className="rounded-full border border-white"
//         />
//       </button>

//       {/* Dropdown */}
//       {isDropdownOpen && (
//         <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg z-50">
//           {isEditing ? (
//             <div className="p-4">
//               <button
//                 onClick={() => setIsEditing(false)} // Voltar para o menu inicial
//                 className="text-blue-600 hover:underline mb-4 block"
//               >
//                 &larr; Voltar
//               </button>
//               <h2 className="text-lg font-bold text-center mb-4 text-black">
//                 Alterar Perfil
//               </h2>
//               <div className="flex flex-col space-y-4">
//                 {/* Alterar Imagem */}
//                 <div className="text-center">
//                   <Image
//                     src={formData.imagem}
//                     alt="Imagem do perfil"
//                     width={70}
//                     height={70}
//                     className="rounded-full mx-auto"
//                   />
//                   <InputForm
//                     tipoInput="fileInput"
//                     label=" "
//                     fileImage={handleFileChange}
//                     idFileInput="categoria_jogo_icone"
//                   />
                                
//                 </div>

//                 {/* Alterar Cidade */}
//                 <div>
//                   <label htmlFor="cidade" className="block font-bold text-sm mb-1">
//                     Cidade
//                   </label>
//                   <input
//                     type="text"
//                     name="cidade"
//                     id="cidade"
//                     value={formData.cidade}
//                     onChange={handleInputChange}
//                     placeholder="Digite sua cidade"
//                     className="block w-full border border-gray-300 rounded-md px-4 py-2"
//                   />
//                 </div>

//                 {/* Botão Salvar */}
//                 <button
//                   onClick={handleSaveChanges}
//                   className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   Salvar
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <div className="p-4 border-b">
//                 <Image
//                   src={formData.imagem}
//                   alt="Avatar"
//                   width={70}
//                   height={70}
//                   className="rounded-full mx-auto"
//                 />
//                 <p className="text-center font-bold mt-2">Olá, {nome}!</p>
//                 <p className="text-center text-sm text-gray-500">{email}</p>
//               </div>
//               <ul className="p-4 space-y-2">
//                 <li>
//                   <button
//                     onClick={() => setIsEditing(true)} // Entra no modo de edição
//                     className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md w-full text-left"
//                   >
//                     Gerenciar Perfil
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// ********** Carregamento com DRAWER
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

export default function PerfilDropdown({ avatarUrl, nome, email }) {
  const { data: session } = useSession();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);


  const [formData, setFormData] = useState({
    imagem: avatarUrl || "/img/avatar.jpg",
    cidade: "",
  });

  // Abre e fecha o drawer
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  // Atualiza os inputs do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Atualiza a imagem localmente antes do upload

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData((prev) => ({
        ...prev,
        imagem: URL.createObjectURL(file), // Exibe preview
      }));
    }
  };
  

  // Busca os dados do perfil ao carregar o componente
  useEffect(() => {
    async function fetchPerfil() {
      if (!session?.user?.email) return;

      try {
        const response = await axios.get("/api/perfis");
        setFormData({
          cidade: response.data.perfil_cidade || "",
          imagem: response.data.perfil_imagem || "/img/avatar.jpg",
        });
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    }

    fetchPerfil();
  }, [session?.user?.email]);

  const handleSaveChanges = async () => {
  try {
    // Buscar o perfil primeiro para obter o ID
    const perfilResponse = await axios.get("/api/perfis");
    const perfilId = perfilResponse.data.perfil_id; // Pegamos o ID do perfil

    if (!perfilId) {
      throw new Error("ID do perfil não encontrado");
    }

    // Criar um objeto FormData para enviar os dados corretamente
    const formDataToSend = new FormData();
    formDataToSend.append("perfil_cidade", formData.cidade);

    // Se houver uma nova imagem, adiciona ao FormData
    if (selectedFile) {
      formDataToSend.append("perfil_imagem", selectedFile);
    }

    // Enviar requisição PUT para atualizar o perfil
    const response = await axios.put(`/api/perfis/${perfilId}`, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 200) {
      throw new Error("Erro ao atualizar perfil");
    }

    // console.log("Perfil atualizado:", response.data);

    toggleDrawer();
  } catch (error) {
    console.error(error);
    alert("Erro ao salvar alterações!");
  }
};

  return (
    <div className="relative">
      {/* Botão do Avatar */}
      <button onClick={toggleDrawer} className="flex items-center focus:outline-none">
        <Image
          src={formData.imagem}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full object-cover w-12 h-12 border border-white p-1"
        />
      </button>

      {/* Drawer */}
      <div className={`fixed inset-0 z-50 flex transition-all duration-300 ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* Fundo escuro para fechar ao clicar fora */}
        <div
          className={`flex-1 bg-black bg-opacity-50 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={toggleDrawer}
        />

        {/* Drawer lateral */}
        <div
          className={`bg-white w-80 max-w-sm h-full shadow-lg p-6 ml-auto transform transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Header do Drawer */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-black">Alterar Perfil</h2>
            <button onClick={toggleDrawer} className="p-1 rounded hover:bg-gray-200">
              <FaTimes className="text-gray-600 w-5 h-5" />
            </button>
          </div>

          {/* Conteúdo do Drawer */}
          <div className="flex flex-col space-y-4">
            {/* Alterar Imagem */}
            <div className="text-center">
              <Image
                src={formData.imagem}
                alt="Imagem do perfil"
                width={70}
                height={70}
                // className="rounded-full mx-auto"
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
              />
            </div>

            {/* Alterar Cidade */}
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

            {/* Botão de salvar */}
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
