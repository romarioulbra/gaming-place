'use client';

import { useState } from "react";
import Botao from "@/app/components/Botao";
import InputForm from "@/app/components/InputsForm";
import { FaUserPlus} from "react-icons/fa";
import Alert from "@/app/components/Alert";
import CabecalhoCadastro from "@/app/components/CabecalhoCadastro";

export default function CadastroUsuario() {
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

    if (res.ok) {
      alert('Usuário cadastrado com sucesso!');
      setFormData(
        { usuario_nome: '', 
          usuario_email: '', 
          usuario_senha: '', 
          usuario_nivel: '' }
        );
    } else {
      alert('Erro ao cadastrar Usuário.');
    }
  };

  return (
    <>
      <h1 className="text-center mt-24 mb-3 text-2xl font-bold">Cadastro de Usuários</h1>
      <CabecalhoCadastro  
        Icone = {FaUserPlus}
      />
      <Alert/>

      <div className="flex-auto ml-4 mr-4 mt-4 mb-4">
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
                  options={['Administrador', 'Comum']}
                  valorInput={formData.usuario_nivel}
                  metodoSubmit={(e) => setFormData({ ...formData, usuario_nivel: e.target.value })}
                
              />
            </div>
            <div className="flex justify-center">
              <Botao
                texto='Cadastrar'
                tipo='submit'
                cor = 'azul'
              />
            </div>  
          </form>
        </div>
      </div>
    </>
  );
}
