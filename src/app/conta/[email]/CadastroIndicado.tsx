"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaGift, FaUser, FaLock, FaEnvelope } from "react-icons/fa";

export default function CadastroIndicado({ email }: { email: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [form, setForm] = useState({
    usuario_nome: "",
    usuario_email: decodeURIComponent(email),
    usuario_senha: "",
    token: token || "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMensagem("Cadastro realizado com sucesso! Você ganhou 50 pontos 🎉");

        // Redireciona para /conta com query param para mostrar confete
        router.push("/conta?showConfetti=true");
      } else {
        setStatus("error");
        setMensagem(data.error || "Erro ao cadastrar. Verifique os dados.");
      }
    } catch (err) {
      setStatus("error");
      setMensagem("Erro inesperado. Tente novamente mais tarde.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md p-8 bg-gradient-to-br from-purple-700 to-purple-600 rounded-3xl shadow-2xl border border-purple-400/20 backdrop-blur-sm"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mb-4 shadow-lg"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 3,
            }}
          >
            <FaGift className="text-white text-3xl" />
          </motion.div>
          <h2 className="text-3xl font-bold text-center text-white">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              Cadastro VIP
            </motion.span>
          </h2>
          <motion.p className="text-purple-200 mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            Por indicação especial
          </motion.p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <label className="text-sm font-medium text-purple-100 flex items-center gap-2">
              <FaUser className="text-purple-300" />
              Nome completo
            </label>
            <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
              <input
                name="usuario_nome"
                placeholder="Digite seu nome"
                value={form.usuario_nome}
                onChange={handleChange}
                required
                className="w-full p-4 bg-purple-800/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 mt-2 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all"
              />
            </motion.div>
          </motion.div>

          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            <label className="text-sm font-medium text-purple-100 flex items-center gap-2">
              <FaEnvelope className="text-purple-300" />
              Email
            </label>
            <input
              name="usuario_email"
              type="email"
              value={form.usuario_email}
              readOnly
              className="w-full p-4 bg-purple-800/70 border border-purple-400/30 rounded-xl text-purple-200 mt-2 cursor-not-allowed"
            />
          </motion.div>

          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
            <label className="text-sm font-medium text-purple-100 flex items-center gap-2">
              <FaLock className="text-purple-300" />
              Senha
            </label>
            <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
              <input
                name="usuario_senha"
                type="password"
                placeholder="Crie uma senha segura"
                value={form.usuario_senha}
                onChange={handleChange}
                required
                className="w-full p-4 bg-purple-800/50 border border-purple-400/30 rounded-xl text-white placeholder-purple-300 mt-2 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all"
              />
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <motion.button
              type="submit"
              disabled={status === "loading"}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg shadow-lg transition-all ${
                status === "loading"
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 hover:shadow-xl"
              }`}
              whileHover={status !== "loading" ? { scale: 1.02 } : {}}
              whileTap={status !== "loading" ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center justify-center gap-2">
                {status === "loading" ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Processando...
                  </>
                ) : (
                  <>
                    <FaGift />
                    Cadastrar e Ganhar 50 Pontos
                  </>
                )}
              </div>
            </motion.button>
          </motion.div>
        </form>

        <AnimatePresence>
          {mensagem && (
            <motion.div
              className={`mt-6 flex items-start gap-3 p-4 rounded-xl shadow-lg ${
                status === "success" ? "bg-emerald-500/90" : "bg-rose-500/90"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {status === "success" ? (
                <FaCheckCircle className="w-5 h-5 mt-0.5 text-white" />
              ) : (
                <FaExclamationCircle className="w-5 h-5 mt-0.5 text-white" />
              )}
              <p className="text-white text-sm flex-1">{mensagem}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
