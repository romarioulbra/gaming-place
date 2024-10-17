import Botao from "@/app/components/Botao";
import InputForm from "@/app/components/InputsForm";

export default function CadastroUsuario() {
  return (
    <div className="container">
       
      {/* Seu formulário ou conteúdo de cadastro aqui */}
      <form className="bg-white p-8 rounded-lg mt-10">
        {/* Inputs do formulário */}
      <div className="p-6">
        <InputForm
            tipoInput="text"
            label="Usuário"
            placeholder="Nome do Usuário"
        />
        <InputForm
            tipoInput="email"
            label="Email"
            placeholder="exemplo@exemplo.com.br"
        />

        <InputForm
            tipoInput="password"
            label="Senha"
            placeholder="Exemplo_123"
        />
        <InputForm
            tipoInput="select"
            label="Nível"
            options={['Administrador', 'Comum']}
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
