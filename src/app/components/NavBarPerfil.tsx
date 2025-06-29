// "use client";

// import Link from "next/link";
// import { SlLogout, SlUser } from "react-icons/sl";
// import { useSession, signOut } from "next-auth/react";
// import { useState, useEffect } from "react";
// import PerfilDropdown from "./PerfilDropdown";

// export default function NavbarPerfil() {
//   const { data: session, status, update } = useSession();
  
//   // Defina valores padrão para evitar erros caso session seja undefined
//   const nome = session?.usuario?.nome || "Usuário";
//   const nivel = session?.usuario?.nivel || "Padrão";
//   const email = session?.usuario?.email || "email@exemplo.com";
//   const perfil_imagem = session?.usuario?.perfil_imagem || "/img/avatar.jpg";

//   // Estado para armazenar a imagem do perfil
//   const [perfilImagem, setPerfilImagem] = useState(perfil_imagem);

//   // Atualiza o estado da imagem quando a sessão muda
//   useEffect(() => {
//     setPerfilImagem(perfil_imagem);
//   }, [perfil_imagem]);

//   const handleImageChange = async (novaImagem: string) => {
//     setPerfilImagem(novaImagem);
//     await update({ usuario: { ...session.usuario, perfil_imagem: novaImagem } });
//   };

//   // Enquanto a sessão está carregando, exibe um indicador de carregamento
//   if (status === "loading") {
//     return <p>Carregando...</p>;
//   }

//   // Se não houver sessão, exibe uma mensagem de login necessário
//   if (!session) {
//     return <p>Você precisa estar logado para acessar o Dashboard.</p>;
//   }

//   return (
//     <nav className="bg-indigo-500 text-black py-4 mt-16 shadow-md">
//       <div className="container mx-auto flex justify-between items-center px-4">
//         {nivel !== "Administrador" ? (
//           <Link href="/dashboard/usuario/login">
//             <div className="text-2xl font-bold">Dashboard</div>
//           </Link>
//         ) : (
//           <div className="text-2xl font-bold">Dashboard</div>
//         )}
//         <div className="flex space-x-2 text-slate-200">
//           {nivel !== "Administrador" && (
//             <Link
//               href="/dashboard/usuario/perfil"
//               className="hover:text-secondary flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md text-sm"
//             >
//               <SlUser />
//               <span>Perfil</span>
//             </Link>
//           )}
//           <button
//             onClick={() => signOut({ callbackUrl: "/conta" })}
//             className="hover:text-secondary flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md text-sm"
//           >
//             <SlLogout />
//             <span>Logout</span>
//           </button>

//           {/* Dropdown do Perfil */}
//           <PerfilDropdown
//             avatarUrl={perfilImagem} // Passa a imagem dinâmica
//             nome={nome}
//             email={email}
//             onImageChange={handleImageChange} // Passa a função para atualizar a imagem
//           />
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import { SlLogout, SlUser } from "react-icons/sl";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import PerfilDropdown from "./PerfilDropdown";

export default function NavbarPerfil() {
  const { data: session, status, update } = useSession();
  
  // Defina valores padrão para evitar erros caso session seja undefined
  const nome = session?.usuario?.nome || "Usuário";
  const nivel = session?.usuario?.nivel || "Padrão";
  const email = session?.usuario?.email || "email@exemplo.com";
  const perfil_imagem = session?.usuario?.perfil_imagem || "/img/avatar.jpg";

  // Estado para armazenar a imagem do perfil
  const [perfilImagem, setPerfilImagem] = useState(perfil_imagem);

  // Atualiza o estado da imagem quando a sessão muda
  useEffect(() => {
    setPerfilImagem(perfil_imagem);
  }, [perfil_imagem]);

  const handleImageChange = async (novaImagem: string) => {
    setPerfilImagem(novaImagem);
    
    // Verificação segura antes de acessar session.usuario
    if (session?.usuario) {
      await update({ 
        usuario: { 
          ...session.usuario, 
          perfil_imagem: novaImagem 
        } 
      });
    }
  };

  // Enquanto a sessão está carregando, exibe um indicador de carregamento
  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  // Se não houver sessão, exibe uma mensagem de login necessário
  if (!session) {
    return <p>Você precisa estar logado para acessar o Dashboard.</p>;
  }

  return (
    <nav className="bg-indigo-500 text-black py-4 mt-16 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {nivel !== "Administrador" ? (
          <Link href="/dashboard/usuario/login">
            <div className="text-2xl font-bold">Dashboard</div>
          </Link>
        ) : (
          <div className="text-2xl font-bold">Dashboard</div>
        )}
        <div className="flex space-x-2 text-slate-200">
          {nivel !== "Administrador" && (
            <Link
              href="/dashboard/usuario/perfil"
              className="hover:text-secondary flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md text-sm"
            >
              <SlUser />
              <span>Perfil</span>
            </Link>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/conta" })}
            className="hover:text-secondary flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-md text-sm"
          >
            <SlLogout />
            <span>Logout</span>
          </button>

          {/* Dropdown do Perfil */}
          <PerfilDropdown
            avatarUrl={perfilImagem}
            nome={nome}
            email={email}
            onImageChange={handleImageChange}
          />
        </div>
      </div>
    </nav>
  );
}