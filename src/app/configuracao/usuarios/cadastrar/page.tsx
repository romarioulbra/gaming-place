'use client';

import { useState } from "react";
import Botao from "@/app/components/Botao";
import InputForm from "@/app/components/InputsForm";
import { FaUserPlus} from "react-icons/fa";
import Alert from "@/app/components/Alert";
import CabecalhoVoltar from "@/app/components/CabecalhoVoltar";

export default function CadastroUsuario() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<"sucesso" | "erro">("sucesso"); 

  
  const [formData, setFormData] = useState(
    { usuario_nome: ``, 
      usuario_email: ``, 
      usuario_senha: ``,
      usuario_nivel: ``
     }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    let msg = 'Usuário cadastrado com sucesso!';

    if (res.ok) {
      setFormData(
        { usuario_nome: '', 
          usuario_email: '', 
          usuario_senha: '', 
          usuario_nivel: '' }
        );
        setAlertMessage(msg);
        setAlertType("sucesso");
        setAlertVisible(true);
    } else {
      msg = 'Erro ao cadastrar Usuário.';
      setAlertMessage(msg);
      setAlertType("erro");
      setAlertVisible(true);
      // setAlertMessage(msg);
    }
  };

  return (
    <>
      <h1 className="text-center mt-32 mb-3 text-2xl font-bold">Cadastro de Usuários</h1>
      <CabecalhoVoltar  
        Icone = {FaUserPlus}
      />
      
      {/* Renderizar o alerta apenas se estiver visível */}
      {alertVisible && (
        <Alert
          message={alertMessage}
          tipoAlert={alertType} // Define o tipo de alerta dinamicamente
          texto={alertMessage} // Mostra a mensagem apropriada
          cor={alertType === "sucesso" ? "verde" : "vermelho"} // Escolhe a cor com base no tipo
        />
      )}

      <div className="flex-auto ml-4 mr-4 mt-24 mb-4">
        <div className="p-8 border border-gray-300 shadow-lg bg-white rounded-lg mr-2 ml-2"> 
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg mt-2 ">
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

              <InputForm
                tipoInput="select"
                label="Nível"
                // options={['Administrador', 'Normal','Logado']}
                options={['Administrador', 'Normal']}
                valorInput={formData.usuario_nivel}
                metodoSubmit={(e) => setFormData({ ...formData, usuario_nivel: e.target.value })}
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
      </div>
    </>
  );
}
