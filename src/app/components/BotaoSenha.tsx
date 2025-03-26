import { FaKey } from 'react-icons/fa';

export default function BotaoSenha({ mostrarModal }) {
  return (
    <button
      onClick={mostrarModal}  // Passando o tipo 'senha'
      className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center  hover:bg-blue-700 transition-colors border border-white shadow-md shadow-blue-500/50"
    >
      <FaKey className="w-4 h-4" />
    </button>
  );
}
