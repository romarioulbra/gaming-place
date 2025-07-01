interface BotaoProps {
  texto: string;
  tipo?: 'button' | 'submit'; // Tipo do botão, opcional, padrão será 'submit'
  onClick?: () => void; 
  cor?: 'verde' | 'azul' | 'amarelo' | 'vermelho'; // Parâmetro de cor      // Função opcional que será chamada quando clicado, se for 'button'
  disabled?: boolean;
}

export default function Botao({ texto, cor, tipo = 'submit', onClick }: BotaoProps) {
  
      const coresClasses = {
        verde: 'bg-green-500 hover:bg-green-600',
        azul: 'bg-blue-500 hover:bg-blue-600',
        amarelo: 'bg-yellow-500 hover:bg-yellow-600 text-black', // Amarelo fica melhor com texto preto
        vermelho: 'bg-red-500 hover:bg-red-600',
      };

  return (
    <button
      type={tipo}
      className={`${coresClasses[cor??'azul']} px-4 py-2 w-full text-white p-2 rounded-lg font-bold hover:bg-blue-700 transition duration-300 border-white border shadow-md  shadow-slate-400`}
      onClick={onClick} // O onClick será executado se passado
    >
      {texto}
    </button>
  );
}
