import React, { useState } from 'react';
import Image from 'next/image';

interface InputFileProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputFile({ label, onChange,metodoSubmit }:InputFileProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // Cria uma URL temporária para a imagem
      onChange(e); // Chama a função onChange passada como prop
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={label.toLowerCase()} className="block text-gray-700 font-medium mb-2 text-center">
        {label}
      </label>

      {/* Exibir pré-visualização da imagem se estiver disponível */}
      {previewUrl && (
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32">
            <Image
              src={previewUrl}
              alt="Pré-visualização"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </div>
      )}

      <input
        type="file"
        // onChange={onChange}
        onChange={metodoSubmit}
        className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
        required
      />
    </div>
  );

}
