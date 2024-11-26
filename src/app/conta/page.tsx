"use client";
import { SlGameController } from "react-icons/sl";
import Image from "next/image";
import InputForm from "../components/InputsForm";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Conta() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao realizar login.");
      }

      // Armazene o token (se utilizado)
      localStorage.setItem("token", data.token);

      // Redirecione o usuário para outra página (ex.: dashboard)
      router.push("/dashboard");
    } catch (err: any) {
      setErro(err.message);
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
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-4 mb-4"
            onSubmit={handleLogin}
          >
            <h2 className="text-2xl font-bold text-center mb-6">Logar</h2>

            {/* Campo de E-mail */}
            <div className="mb-4">
              <InputForm
                tipoInput="email"
                label="Email"
                placeholder="Digite seu email"
                valorInput={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Campo de Senha */}
            <div className="mb-6">
              <InputForm
                tipoInput="password"
                label="Senha"
                placeholder="Digite sua senha"
                valorInput={senha}
                onChange={(e) => setSenha(e.target.value)}
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
              <Link
                href="/"
                className="text-pink-500 hover:underline font-bold"
              >
                Não possui cadastro?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
