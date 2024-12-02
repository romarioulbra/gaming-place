'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { getSession } from "next-auth/react";
import { SlLogout,SlUser  } from "react-icons/sl";
import { useSession,signOut } from "next-auth/react";
import Navbar from "../components/MenuNavbar";
export default function Dashboard() {


const { data: session, status } = useSession();
console.log(session);

// Verifique o status da sessão
// if (!session) {
//   return <p>Carregando...</p>; // Exibe carregamento ou redireciona
// }


if (!session) {
  return <p>Você precisa estar logado para acessar o Dashboard.</p>;
}

 // Acessa os dados do usuário na sessão
 const { nome, nivel } = session.usuario;

  return (
    <>
      <Navbar nivelUsuario={nivel}/>
      <div className="min-h-screen bg-gradient-to-b from-gray-300 to-indigo-200 -mt-5">
      {/* Navbar */}
      <nav className="bg-indigo-500 text-black py-4 mt-20 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-bold">Dashboard</div>
          <div className="flex space-x-4 text-slate-200">
            <Link href="/usuarios/perfil" className="hover:text-secondary flex items-center space-x-2 hover:bg-indigo-400 hover:p-1">
              <SlUser className=""/>
              <span>Perfil</span>
            </Link>
            <button 
              onClick={() => signOut({ callbackUrl: "/conta" })} // Redireciona para a página de login após o logout
              className="hover:text-secondary flex items-center space-x-2"
            >
              <SlLogout />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
      {/* Boas-vindas */}
      <main className="flex flex-col items-center justify-center text-center mt-10">
      {/* Imagem inserida precisa ser quadrada */}
      <Image
        className="rounded-full mx-auto object-cover"
        width={200}
        height={200}
        src="/img/avatar.jpg"
        alt="Foto do usuário"
      />
        <h1 className="text-4xl font-extrabold text-text mt-6">Bem-vindo, <span className="text-pink-600">{nome}</span>!</h1>
        <p className="mt-4 text-lg text-text">Nível: {nivel}</p>
        <p className="mt-4 text-lg text-text">Estamos felizes em ter você por aqui!</p>
        
        
         <div className="mt-8 w-full max-w-md mx-auto">
          <div className="bg-pink-300 h-2 rounded-full">
            <div className="bg-pink-600 h-2 rounded-full w-[70%]"></div>
          </div>
          <p className="mt-2 text-sm text-text text-black font-bold">Seu nível: 2 | XP: 350/500</p>
        </div>


      </main>


      <section className="mt-12 px-4 max-w-md mx-auto text-left">
    <h2 className="text-2xl font-semibold text-green-600">
      Desafios Atuais
    </h2>
    <ul className="mt-6 space-y-4">
      <li className="flex justify-between items-center bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
        <div>
          <h3 className="text-gray-800 font-semibold">Desafio 1</h3>
          <p className="text-sm text-gray-500">Complete 5 tarefas hoje</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Ver
        </button>
      </li>
      <li className="flex justify-between items-center bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
        <div>
          <h3 className="text-gray-800 font-semibold">Desafio 2</h3>
          <p className="text-sm text-gray-500">Ganhe 100 pontos de XP</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Ver
        </button>
      </li>
    </ul>
  </section>
    </div>
    </>


// tema dark
  //   <div className="min-h-screen bg-black -mt-5">
  //     <head>
  //       <title>Meu Dashboard</title>
  //       <meta name="description" content="Dashboard de usuário com gamificação" />
  //     </head>

  //     {/* Navbar */}
  //     <nav className="bg-gradient-to-r from-primary to-secondary text-white py-4 mt-20 shadow-md">
  //       <div className="container mx-auto flex justify-between items-center px-4">
  //         <div className="text-2xl font-bold">Meu Dashboard</div>
  //         <div className="flex space-x-4">
  //           <Link href="/usuarios/perfil" className="hover:text-secondary flex items-center space-x-2">
  //             <span className="material-icons">person</span>
  //             <span>Perfil</span>
  //           </Link>
  //           <a href="/logout" className="hover:text-secondary flex items-center space-x-2">
  //             <span className="material-icons">logout</span>
  //             <span>Logout</span>
  //           </a>
  //         </div>
  //       </div>
  //     </nav>

  //     {/* Boas-vindas */}
  //     <main className="flex flex-col items-center justify-center text-center mt-10">
  //     <Image
  //       className="rounded-full mx-auto object-cover"
  //       width={100}
  //       height={100}
  //       src="/img/avatar.jpg"
  //       alt="Foto do usuário"
  //     />

  //       <h1 className="text-4xl font-extrabold text-text mt-6">Bem-vindo, <span className="text-pink-600">[Nome do Usuário]</span>!</h1>
  //       <p className="mt-4 text-lg text-text">Estamos felizes em ter você por aqui!</p>
        
        
  //        <div className="mt-8 w-full max-w-md mx-auto">
  //         <div className="bg-pink-300 h-2 rounded-full">
  //           <div className="bg-pink-600 h-2 rounded-full w-[70%]"></div>
  //         </div>
  //         <p className="mt-2 text-sm text-text text-black font-bold">Seu nível: 2 | XP: 350/500</p>
  //       </div>


  //     </main>



  //     <section className="mt-12 px-4 max-w-md mx-auto text-left">
  //   <h2 className="text-2xl font-semibold text-green-600">
  //     Desafios Atuais
  //   </h2>
  //   <ul className="mt-6 space-y-4">
  //     <li className="flex justify-between items-center bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
  //       <div>
  //         <h3 className="text-gray-800 font-semibold">Desafio 1</h3>
  //         <p className="text-sm text-gray-500">Complete 5 tarefas hoje</p>
  //       </div>
  //       <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
  //         Ver
  //       </button>
  //     </li>
  //     <li className="flex justify-between items-center bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
  //       <div>
  //         <h3 className="text-gray-800 font-semibold">Desafio 2</h3>
  //         <p className="text-sm text-gray-500">Ganhe 100 pontos de XP</p>
  //       </div>
  //       <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
  //         Ver
  //       </button>
  //     </li>
  //   </ul>
  // </section>

  //   </div>
 
    



    // Mais clean
    // <div className="min-h-screen bg-gray-100 mt-16">
    //   <head>
    //     <title>Meu Dashboard</title>
    //     <meta name="description" content="Dashboard de usuário com gamificação" />
    //   </head>

    //   {/* Navbar */}
    //   <nav className="bg-purple-600 text-white py-4 shadow-md">
    //     <div className="container mx-auto flex justify-between items-center px-4">
    //       <div className="text-2xl font-bold">Meu Dashboard</div>
    //       <div className="flex space-x-4">
    //         <a
    //           href="/perfil"
    //           className="hover:bg-purple-700 px-3 py-2 rounded-md flex items-center space-x-2"
    //         >
    //           <span className="material-icons">person</span>
    //           <span>Perfil</span>
    //         </a>
    //         <a
    //           href="/logout"
    //           className="hover:bg-purple-700 px-3 py-2 rounded-md flex items-center space-x-2"
    //         >
    //           <span className="material-icons">logout</span>
    //           <span>Logout</span>
    //         </a>
    //       </div>
    //     </div>
    //   </nav>

    //   {/* Boas-vindas */}
    //   <main className="flex flex-col items-center justify-center text-center mt-10">
    //     <Image
    //       className="rounded-full mx-auto object-cover"
    //       width={100}
    //       height={100}
    //       src="/img/avatar.jpg"
    //       alt="Foto do usuário"
    //     />
    //     <h1 className="text-4xl font-extrabold text-purple-600 mt-6">
    //       Bem-vindo, [Nome do Usuário]!
    //     </h1>
    //     <p className="mt-4 text-lg text-gray-700">
    //       Estamos felizes em ter você por aqui.
    //     </p>
    //     <div className="mt-8 w-full max-w-md mx-auto">
    //       <div className="bg-purple-300 h-2 rounded-full">
    //         <div className="bg-purple-600 h-2 rounded-full w-[70%]"></div>
    //       </div>
    //       <p className="mt-2 text-sm text-gray-700">Seu nível: 2 | XP: 350/500</p>
    //     </div>
    //   </main>

    //   {/* Desafios */}
    //   <section className="mt-10 px-4 max-w-md mx-auto text-left">
    //     <h2 className="text-2xl font-semibold text-purple-600">Desafios Atuais</h2>
    //     <ul className="mt-4 space-y-4">
    //       <li className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
    //         <span className="text-gray-900">Desafio 1</span>
    //         <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
    //           Ver
    //         </button>
    //       </li>
    //       <li className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
    //         <span className="text-gray-900">Desafio 2</span>
    //         <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
    //           Ver
    //         </button>
    //       </li>
    //     </ul>
    //   </section>
    // </div>

    
  );
}
