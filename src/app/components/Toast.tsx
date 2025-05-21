import {useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function Toast({ message, type, onClose }) {

  useEffect(() => {
    if (!message) return;
    
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);
  

   return (
      <>
        <div
        className={`fixed bottom-5 right-5 flex items-center px-4 py-3 rounded-lg shadow-lg text-white text-sm transition-opacity duration-300
          ${type === "sucesso" ? "bg-green-500" : "bg-red-500"}`}
      >
        {type === "sucesso" ? (
          <AiOutlineCheckCircle className="w-5 h-5 mr-2" />
        ) : (
          <AiOutlineCloseCircle className="w-5 h-5 mr-2" />
        )}
        <span>{message}</span>
        <button onClick={onClose} className="ml-3 text-lg font-bold">&times;</button>
      </div>
      </>
  
    );
}
