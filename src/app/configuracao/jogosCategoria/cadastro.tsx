import Botao from "@/app/components/Botao";
import InputForm from "@/app/components/InputsForm";
import InputFile from "../../components/FileInput";
import { useState } from 'react';

export default function CadastroCatJogos() {
  
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
            label="Nome da Categoria"
            placeholder="Aréa da Atuação"
        />
       
        {/* <InputForm
            tipoInput="select"
            label="Categoria do Jogo"
            options={['Saúde', 'Comum']}
        /> */}
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
  );
}
