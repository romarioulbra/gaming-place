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

export default function Conta() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  // AUTENTICAÇÃO QUE ESTÁ FUNCIONANDO PERFEITAMENTE
// const handleLogin = async (e: React.FormEvent) => {
//   e.preventDefault();

//   const res = await signIn("credentials", {
//     redirect: false, // Evita redirecionamento automático
//     email, // Email fornecido pelo usuário
//     senha, // Senha fornecida pelo usuário
//   });

//   if (!res || res.error) {
//     setErro(res?.error || "Erro ao realizar login.");
//   } else {
//     // Redirecionar após login bem-sucedido
//     router.push("/dashboard");
//   }
// };

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await signIn("credentials", {
    redirect: false, // Evita redirecionamento automático
    email, // Email fornecido pelo usuário
    senha, // Senha fornecida pelo usuário
  });

  if (!res || res.error) {
    setErro(res?.error || "Erro ao realizar login.");
  } else {
    // Obtenha o nível do usuário a partir da sessão
    const session = await fetch("/api/auth/session").then((res) => res.json());

    if (session?.usuario?.nivel === "Administrador") {
      router.push("/dashboard/administrador");
    } else if (session?.usuario?.nivel === "Normal" || session?.usuario?.nivel === "Logado") {
      router.push("/dashboard/usuario_login");
    } else {
      setErro("Acesso negado.");
    }
  }
};


  // Variáveis do Modal
  const [modalAberto, setModalAberto] = useState(false);
  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  // Variáveis do Alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<"sucesso" | "erro">("sucesso"); 

  const [formData, setFormData] = useState(
    { usuario_nome: ``, 
      usuario_email: ``, 
      usuario_senha: ``,
      usuario_nivel: "Normal"
     }
  );
  
  //Cadastro
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
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Coluna esquerda */}
        <div className="bg-gray-200 flex items-center justify-center w-full lg:w-1/2 p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <div className="flex items-center justify-center text-black mt-20">
              <SlGameController className="w-12 h-12" />
              <h1 className="text-4xl font-bold ml-4">Gaming Place</h1>
            </div>
            <p className="text-sm text-gray-700">
              Explore os incríveis jogos desenvolvidos na <strong className="font-bold">Ulbra Palmas</strong>
            </p>
            <div className="mt-5">
              <Image
                src="/img/foguete_espaco.png"
                alt="logo"
                width={200}
                height={200}
                className=""
              />
            </div>
          </div>
        </div>
        {/* Coluna direita */}
        <div className="bg-purple-950 flex items-center justify-center w-full lg:w-1/2 p-8">
          <form
            name="loginForm"
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-4 "
            onSubmit={handleLogin}
          >
            <h2 className="text-2xl font-bold text-center mb-6">Logar</h2>

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
            {/* Botão de Cadastro */}
            <button
              type="submit"
              className="w-full bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition duration-300"
            >
              Entrar
            </button>
            <div className="mt-4 text-center text-sm">
              <button
                onClick={abrirModal} // Substitua pela sua função
                className="px-6 py-3 w-full border border-indigo-500 text-indigo-500 rounded-lg hover:bg-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition"
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
          tipoAlert={alertType} // Define o tipo de alerta dinamicamente
          texto={alertMessage} // Mostra a mensagem apropriada
          cor={alertType === "sucesso" ? "verde" : "vermelho"} // Escolhe a cor com base no tipo
        />
      )}
      {/* Modal */}
      <ModalFormulario
        modalAberto={modalAberto}
        fecharModal={fecharModal}
        titulo="Cadastro de Usuário"
        subtitulo="Insira suas informações para criar sua conta."
        modalType="editar"
      >
        <div className="p-8 border border-gray-300 shadow-lg bg-white rounded-lg mr-2 ml-2"> 
          {alertVisible && (
            <Alert
              message={alertMessage}
              tipoAlert={alertType} 
              texto={alertMessage} 
              cor={alertType === "sucesso" ? "verde" : "vermelho"} 
            />
          )}
          
          <form 
            name="loginFormModal"
            onSubmit={handleCadastro}  
            className="bg-white p-8 rounded-lg mt-2 "
          >
            <div className="p-6">
              
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
            <div className="flex justify-center">
              <Botao
                texto='Cadastrar'
                tipo='submit'
                cor = 'verde'
              />
            </div>  
          </form>
        </div>
      </ModalFormulario> 
    </>
  );
}
