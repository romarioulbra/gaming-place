'use client'
import React from "react";
 
export default function ModalSenha({ senha, onClose }) {
  if (!senha) return null;
  return (
     <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Senha</h2>
        <p className="text-gray-800">{senha}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded"
        >
          Fechar
        </button>
      </div>
    </div>
     </>
  );
}
