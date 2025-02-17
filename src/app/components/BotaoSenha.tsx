import { FaKey } from 'react-icons/fa';

export default function BotaoSenha({ mostrarModal }) {
  return (
    <button
      onClick={mostrarModal}  // Passando o tipo 'senha'
      className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center"
    >
      <FaKey className="w-3 h-3" />
    </button>
  );
}
