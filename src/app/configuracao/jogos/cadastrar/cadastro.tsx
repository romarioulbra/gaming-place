import Botao from "@/app/components/Botao";
import InputForm from "@/app/components/InputsForm";

export default function CadastroJogos() {
  
  return (
    <div className="container">
       
      {/* Seu formulário ou conteúdo de cadastro aqui */}
      <form className="bg-white p-8 rounded-lg mt-10">
        {/* Inputs do formulário */}
        <div className="p-6">

          <InputForm
              tipoInput="text"
              label="Nome da Categoria"
              placeholder="Área da Atuação"
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
  );
}
