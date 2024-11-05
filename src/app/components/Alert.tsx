
interface AlertProps {
  
  cor?: 'verde' | 'azul' | 'amarelo' | 'vermelho'; 
  tipoAlert?: 'sucesso' | 'erro'| 'aviso'| 'informacao';
  texto: string
}


// export default function Alert({ texto, cor, tipo }: AlertProps) {
export default function Alert() {
  const coresAlert = {
    verde: 'bg-green-100 hover:bg-green-600 text-green-700',
    azul: 'bg-blue-100 hover:bg-blue-600 text-blue-700',
    amarelo: 'bg-yellow-100 hover:bg-yellow-600 text-yellow-700', // Amarelo fica melhor com texto preto
    vermelho: 'bg-red-100 hover:bg-red-600 text-red-700',
  };
  return (
    <>
      <div className="flex ml-4 mr-4 mt-4 mb-4 items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Successo!</strong>
        <span className="block sm:inline ml-2">Operação realizada com sucesso.</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.348 14.849a1 1 0 01-1.415 0L10 11.415l-2.933 2.933a1 1 0 01-1.415-1.415l2.933-2.933L5.65 7.515a1 1 0 011.415-1.415L10 9.585l2.933-2.933a1 1 0 011.415 1.415l-2.933 2.933 2.933 2.933a1 1 0 010 1.415z"/></svg>
        </span>
      </div>

    </>
  );
}
