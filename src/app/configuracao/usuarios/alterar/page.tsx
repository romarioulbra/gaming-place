import InputForm from "@/app/components/InputsForm";
import { useState } from "react";


export default function AlterarUsuarios({dados}) {
 
  const [formData, setFormData] = useState('');

  return (
    <> 
      <div className="flex flex-col">
          <div className="mt-2 space-y-2">
            <InputForm
              tipoInput="text"
              label="ID"
              placeholder="Nome do Usuário"
              valorInput={dados?.usuario_id}
              metodoSubmit={(e) => setFormData({ ...dados, usuario_id: e.target.value })}
            />
              <InputForm
                tipoInput="text"
                label="Nome"
                placeholder="Nome do Usuário"
                valorInput={dados?.usuario_nome}
                metodoSubmit={(e) => setFormData({ ...dados, usuario_nome: e.target.value })}
              />
            <InputForm
              tipoInput="text"
              label="Email"
              placeholder="Nome do Usuário"
              valorInput={dados?.usuario_email}
              metodoSubmit={(e) => setFormData({ ...dados, usuario_email: e.target.value })}
            />
            <InputForm
              tipoInput="text"
              label="Senha"
              placeholder="Nome do Usuário"
              valorInput={dados?.usuario_senha}
              metodoSubmit={(e) => setFormData({ ...dados, usuario_senha: e.target.value })}
            />
            <InputForm
              tipoInput="text"
              label="Nível"
              placeholder="Nome do Usuário"
              valorInput={dados?.usuario_nivel}
              metodoSubmit={(e) => setFormData({ ...dados, usuario_nivel: e.target.value })}
            />
          </div>        
        </div>
    </>
  );
}

