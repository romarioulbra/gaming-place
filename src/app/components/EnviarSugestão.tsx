import { ModelFormSugestao } from "./ModelFormSugestao";
import { useState } from "react";

export default function EnviarSugestão({dadosUsuario}) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
      >
        Enviar Sugestão
      </button>

      {isOpen && <ModelFormSugestao dadosUsuario={dadosUsuario}onClose={() => setIsOpen(false)} />}
    </>
  );
}