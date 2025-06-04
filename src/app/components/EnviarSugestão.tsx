import { ModelFormSugestao } from "./ModelFormSugestao";
import { useState } from "react";

export default function EnviarSugestão({dadosUsuario}) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        // className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
        className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
      >
        Enviar Sugestão
      </button>

      {isOpen && <ModelFormSugestao dadosUsuario={dadosUsuario}onClose={() => setIsOpen(false)} />}
    </>
  );
}