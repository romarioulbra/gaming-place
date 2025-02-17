interface AlertProps {
  cor?: 'verde' | 'azul' | 'amarelo' | 'vermelho';
  tipoAlert?: 'sucesso' | 'erro' | 'aviso' | 'informacao';
  texto: string;
}

export default function Alert({ texto, cor, tipoAlert}: AlertProps) {
  const coresAlert = {
    verde: 'bg-green-100 border-green-400 text-green-700',
    azul: 'bg-blue-100 border-blue-400 text-blue-700',
    amarelo: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    vermelho: 'bg-red-100 border-red-400 text-red-700',
  };

  // Mapear os títulos baseados no tipo do alerta
  const titulosAlert = {
    sucesso: 'Sucesso!',
    erro: 'Erro!',
    aviso: 'Aviso!',
    informacao: 'Informação!',
  };

  return (
    <div
      className={`flex items-center ml-5 mr-5 pt-5 pb-5 justify-center p-4 rounded border ${coresAlert[cor]} `}
      role="alert"
    >
      <strong className="font-bold mr-2">
        {titulosAlert[tipoAlert]}
      </strong>
      <span className="text-sm">{texto}</span>
    </div>
  );
}

