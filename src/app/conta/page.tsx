// // LAYOUT ROXO
// "use client";
// import { SlGameController } from "react-icons/sl";
// import Image from "next/image";
// import InputForm from "../components/InputsForm";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { ModalFormulario } from "../components/ModalFormulario";
// import Botao from "../components/Botao";
// import Alert from "../components/Alert";
// import { signIn } from "next-auth/react";
// import Toast from "../components/Toast";

// export default function Conta() {
//   const [email, setEmail] = useState("");
//   const [senha, setSenha] = useState("");
//   const [erro, setErro] = useState("");
//   const router = useRouter();


//   const [toastVisible, setToastVisible] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");
//   const [toastType, setToastType] = useState<"sucesso" | "erro">("sucesso");



//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     const res = await signIn("credentials", {
//       redirect: false,
//       email,
//       senha,
//     });
  
//     if (!res || res.error) {
//       let errorMessage = res?.error || "Erro ao realizar login.";
  
//       if (errorMessage.toLowerCase().includes("credenciais inválidas") || errorMessage.toLowerCase().includes("usuário não encontrado")) {
//         errorMessage = "Usuário não encontrado no sistema.";
//       }
  
//       setErro(errorMessage);
//       setToastMessage(errorMessage);
//       setToastType("erro");
//       setToastVisible(true);
//       return; // Evita execução do código abaixo em caso de erro
//     }
  
//     setToastMessage("Login realizado com sucesso!");
//     setToastType("sucesso");
//     setToastVisible(true);
  
//     const session = await fetch("/api/auth/session").then((res) => res.json());
  
//     setTimeout(() => {
//       if (session?.usuario?.nivel === "Administrador") {
//         router.push("/dashboard/administrador");
//       } else {
//         router.push("/dashboard/usuario/login");
//       }
//     }, 2000);
//   };
  

//   // Variáveis do Modal
//   const [modalAberto, setModalAberto] = useState(false);
//   const abrirModal = () => setModalAberto(true);
//   const fecharModal = () => setModalAberto(false);

//   // Variáveis do Alert
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState<"sucesso" | "erro">("sucesso");

//   const [formData, setFormData] = useState({
//     usuario_nome: "",
//     usuario_email: "",
//     usuario_senha: "",
//     usuario_nivel: "Normal",
//   });

//   // Cadastro
//   const handleCadastro = async (event: React.FormEvent) => {
//     event.preventDefault();
//     try {
//       const res = await fetch("/api/usuarios", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Erro ao cadastrar o usuário.");
//       }

//       // Exibe mensagem de sucesso
//       setAlertMessage("Usuário cadastrado com sucesso!");
//       setAlertType("sucesso");
//       setAlertVisible(true);
//       setTimeout(() => {
//         setAlertVisible(false);
//       }, 3000); // O alerta desaparecerá após 3 segundos

//       // Limpa o formulário e fecha o modal
//       setFormData({ usuario_nome: "", usuario_email: "", usuario_senha: "", usuario_nivel: "Normal" });
//     } catch (err: any) {
//       // Exibe mensagem de erro
//       setAlertMessage(err.message || "Erro ao cadastrar o usuário.");
//       setAlertType("erro");
//       setAlertVisible(true);
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-purple-900 to-indigo-900 mt-16">
//         
//         {/* Coluna esquerda */}
//         <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
//           <div className="flex flex-col items-center justify-center text-center space-y-6">
//             <div className="flex items-center justify-center text-white">
//               <SlGameController className="w-12 h-12" />
//               <h1 className="text-4xl font-bold ml-4">Gaming Place</h1>
//             </div>
//             <p className="text-sm text-gray-300">
//               Explore os incríveis jogos desenvolvidos na <strong className="font-bold">Ulbra Palmas</strong>
//             </p>
//             <div className="mt-5">
//               <Image
//                 src="/img/foguete_espaco.png"
//                 alt="logo"
//                 width={200}
//                 height={200}
//                 className="transform hover:scale-105 transition-transform duration-300"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Coluna direita */}
//         <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
//           <form
//             name="loginForm"
//             className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
//             onSubmit={handleLogin}
//           >
//             <h2 className="text-2xl font-bold text-center mb-6 text-purple-900">Logar</h2>

//             <div className="mb-4">
//               <InputForm
//                 tipoInput="email"
//                 label="Email"
//                 placeholder="Digite seu email"
//                 valorInput={email}
//                 metodoSubmit={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="mb-6">
//               <InputForm
//                 tipoInput="password"
//                 label="Senha"
//                 placeholder="Digite sua senha"
//                 valorInput={senha}
//                 metodoSubmit={(e) => setSenha(e.target.value)}
//               />
//             </div>

//             {/* Exibir erro, se houver */}
//             {erro && (
//               <div className="text-red-600 text-sm text-center mb-4">
//                 {erro}
//               </div>
//             )}

//             {/* Botão de Entrar */}
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300"
//             >
//               Entrar
//             </button>

//             {/* Botão de Cadastro */}
//             <div className="mt-4 text-center text-sm">
//               <button
//                 onClick={abrirModal}
//                 className="w-full px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 transition"
//               >
//                 Não possui cadastro?
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Configurações do Modal */}
//       {alertVisible && (
//         <Alert
//           message={alertMessage}
//           tipoAlert={alertType}
//           texto={alertMessage}
//           cor={alertType === "sucesso" ? "verde" : "vermelho"}
//         />
//       )}

//       {/* Modal de Cadastro */}
//       <ModalFormulario
//         modalAberto={modalAberto}
//         fecharModal={fecharModal}
//         titulo="Cadastro de Usuário"
//         subtitulo="Insira suas informações para criar sua conta."
//         modalType="editar"
//       >
//         <div className="p-8 border border-gray-300 shadow-lg bg-white rounded-lg">
//           {alertVisible && (
//             <Alert
//               message={alertMessage}
//               tipoAlert={alertType}
//               texto={alertMessage}
//               cor={alertType === "sucesso" ? "verde" : "vermelho"}
//             />
//           )}

//           <form name="loginFormModal" onSubmit={handleCadastro} className="bg-white p-8 rounded-lg">
//             <div className="space-y-4">
//               <InputForm
//                 tipoInput="text"
//                 label="Usuário"
//                 placeholder="Nome do Usuário"
//                 valorInput={formData.usuario_nome}
//                 metodoSubmit={(e) => setFormData({ ...formData, usuario_nome: e.target.value })}
//               />
//               <InputForm
//                 tipoInput="email"
//                 label="Email"
//                 placeholder="exemplo@exemplo.com.br"
//                 valorInput={formData.usuario_email}
//                 metodoSubmit={(e) => setFormData({ ...formData, usuario_email: e.target.value })}
//               />
//               <InputForm
//                 tipoInput="password"
//                 label="Senha"
//                 placeholder="Exemplo_123"
//                 valorInput={formData.usuario_senha}
//                 metodoSubmit={(e) => setFormData({ ...formData, usuario_senha: e.target.value })}
//               />
//             </div>
//             <div className="flex justify-center mt-6">
//               <Botao
//                 texto="Cadastrar"
//                 tipo="submit"
//                 cor="verde"
//               />
//             </div>
//           </form>
//         </div>
//       </ModalFormulario>

//       {toastVisible && (
//         <Toast message={toastMessage} type={toastType} onClose={() => setToastVisible(false)} />
//       )}

//     </>
//   );
// }


// LAYOUT ROXO
"use client";
import { SlGameController } from "react-icons/sl";
import Image from "next/image";
import InputForm from "../components/InputsForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ModalFormulario } from "../components/ModalFormulario";
import Botao from "../components/Botao";
import Alert from "../components/Alert";
import { signIn } from "next-auth/react";
import Toast from "../components/Toast";
import Snowfall from "../components/Snowfall";

export default function Conta() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();


  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"sucesso" | "erro">("sucesso");



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await signIn("credentials", {
      redirect: false,
      email,
      senha,
    });
  
    if (!res || res.error) {
      let errorMessage = res?.error || "Erro ao realizar login.";
  
      if (errorMessage.toLowerCase().includes("credenciais inválidas") || errorMessage.toLowerCase().includes("usuário não encontrado")) {
        errorMessage = "Usuário não encontrado no sistema.";
      }
  
      setErro(errorMessage);
      setToastMessage(errorMessage);
      setToastType("erro");
      setToastVisible(true);
      return; // Evita execução do código abaixo em caso de erro
    }
  
    setToastMessage("Login realizado com sucesso!");
    setToastType("sucesso");
    setToastVisible(true);
  
    const session = await fetch("/api/auth/session").then((res) => res.json());
  
    setTimeout(() => {
      if (session?.usuario?.nivel === "Administrador") {
        router.push("/dashboard/administrador");
      } else {
        router.push("/dashboard/usuario/login");
      }
    }, 2000);
  };
  

  // Variáveis do Modal
  const [modalAberto, setModalAberto] = useState(false);
  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  // Variáveis do Alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"sucesso" | "erro">("sucesso");

  const [formData, setFormData] = useState({
    usuario_nome: "",
    usuario_email: "",
    usuario_senha: "",
    usuario_nivel: "Normal",
  });

  // Cadastro
  const handleCadastro = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao cadastrar o usuário.");
      }

      // Exibe mensagem de sucesso
      setAlertMessage("Usuário cadastrado com sucesso!");
      setAlertType("sucesso");
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000); // O alerta desaparecerá após 3 segundos

      // Limpa o formulário e fecha o modal
      setFormData({ usuario_nome: "", usuario_email: "", usuario_senha: "", usuario_nivel: "Normal" });
    } catch (err: any) {
      // Exibe mensagem de erro
      setAlertMessage(err.message || "Erro ao cadastrar o usuário.");
      setAlertType("erro");
      setAlertVisible(true);
    }
  };

  return (
    <>
      {/* <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-purple-900 to-indigo-900 mt-16"> */}
      <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-purple-600 via-indigo-300 to-indigo-600 mt-16 text-gray-100">
        <Snowfall />
        
        {/* Coluna esquerda */}
        <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <div className="flex items-center justify-center text-white">
              <SlGameController className="w-12 h-12" />
              <h1 className="text-4xl font-bold ml-4 text-indigo-700 text-outline">Gaming Place</h1>
            </div>
            {/* <p className="text-sm text-gray-300">
              Explore os incríveis jogos desenvolvidos na <strong className="font-bold">Ulbra Palmas</strong>
            </p> */}
            <p className="text-lg md:text-xl text-indigo-900 tracking-wide text-outline-p">
              Explore os incríveis jogos desenvolvidos na <strong className="font-bold">Ulbra Palmas</strong>
            </p>
            <div className="mt-5">
              <Image
                src="/img/foguete_espaco.png"
                alt="logo"
                width={200}
                height={200}
                className="transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Coluna direita */}
        <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
          <form
            name="loginForm"
            className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
            onSubmit={handleLogin}
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-purple-900">Logar</h2>

            <div className="mb-4">
              <InputForm
                tipoInput="email"
                label="Email"
                placeholder="Digite seu email"
                valorInput={email}
                metodoSubmit={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <InputForm
                tipoInput="password"
                label="Senha"
                placeholder="Digite sua senha"
                valorInput={senha}
                metodoSubmit={(e) => setSenha(e.target.value)}
              />
            </div>

            {/* Exibir erro, se houver */}
            {erro && (
              <div className="text-red-600 text-sm text-center mb-4">
                {erro}
              </div>
            )}

            {/* Botão de Entrar */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300"
            >
              Entrar
            </button>

            {/* Botão de Cadastro */}
            <div className="mt-4 text-center text-sm">
              <button
                onClick={abrirModal}
                className="w-full px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 transition"
              >
                Não possui cadastro?
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Configurações do Modal */}
      {alertVisible && (
        <Alert
          message={alertMessage}
          tipoAlert={alertType}
          texto={alertMessage}
          cor={alertType === "sucesso" ? "verde" : "vermelho"}
        />
      )}

      {/* Modal de Cadastro */}
      <ModalFormulario
        modalAberto={modalAberto}
        fecharModal={fecharModal}
        titulo="Cadastro de Usuário"
        subtitulo="Insira suas informações para criar sua conta."
        modalType="editar"
      >
        <div className="p-8 border border-gray-300 shadow-lg bg-white rounded-lg">
          {alertVisible && (
            <Alert
              message={alertMessage}
              tipoAlert={alertType}
              texto={alertMessage}
              cor={alertType === "sucesso" ? "verde" : "vermelho"}
            />
          )}

          <form name="loginFormModal" onSubmit={handleCadastro} className="bg-white p-8 rounded-lg">
            <div className="space-y-4">
              <InputForm
                tipoInput="text"
                label="Usuário"
                placeholder="Nome do Usuário"
                valorInput={formData.usuario_nome}
                metodoSubmit={(e) => setFormData({ ...formData, usuario_nome: e.target.value })}
              />
              <InputForm
                tipoInput="email"
                label="Email"
                placeholder="exemplo@exemplo.com.br"
                valorInput={formData.usuario_email}
                metodoSubmit={(e) => setFormData({ ...formData, usuario_email: e.target.value })}
              />
              <InputForm
                tipoInput="password"
                label="Senha"
                placeholder="Exemplo_123"
                valorInput={formData.usuario_senha}
                metodoSubmit={(e) => setFormData({ ...formData, usuario_senha: e.target.value })}
              />
            </div>
            <div className="flex justify-center mt-6">
              <Botao
                texto="Cadastrar"
                tipo="submit"
                cor="verde"
              />
            </div>
          </form>
        </div>
      </ModalFormulario>

      {toastVisible && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastVisible(false)} />
      )}

    </>
  );
}


