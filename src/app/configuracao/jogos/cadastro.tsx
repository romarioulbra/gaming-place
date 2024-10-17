import Botao from "@/app/components/Botao";
import InputForm from "@/app/components/InputsForm";
import InputFile from "../../components/FileInput";
import { useState } from 'react';

export default function CadastroJogos() {
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };
  return (
    <div className="container">
       
      {/* Seu formulário ou conteúdo de cadastro aqui */}
      <form className="bg-white p-8 rounded-lg mt-10">
        {/* Inputs do formulário */}
      <div className="p-6">

       <InputForm
            tipoInput="text"
            label="Jogo"
            placeholder="Nome do Jogo"
        />
        <InputForm
            tipoInput="text"
            label="Link do Jogo"
            placeholder="www.exemplo.com.br"
        />

        <InputForm
            tipoInput="password"
            label="Senha"
            placeholder="Exemplo_123"
        />
        <InputForm
            tipoInput="select"
            label="Categoria do Jogo"
            options={['Administrador', 'Comum']}
        />
      </div>

      <InputFile label="Selecione um arquivo:" onChange={handleFileChange} />
      
      <div className="flex justify-center">
        <Botao
          texto='Cadastrar'
          tipo='submit'
          cor = 'azul'
        />
      </div>  
      </form>
    </div>
  );
}
