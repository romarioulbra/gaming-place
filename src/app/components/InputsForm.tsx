'use client'
import { useState } from 'react';
interface FormularioProps {
  tipoInput: 'text' | 'select' |'selectDados' | 'textarea' | 'date' | 'email' | 'number' | 'radio' | 'password' | 'fileInput' | 'fileInputSVG'; // Novos tipos adicionados
  label: string;
  placeholder?: string;
  options?: string[]; // Para o select e radio
  dadosSelect?: string[]; 
  idSelect?: string; 
  nomeSelect?: string; 
  idFileInput?: string; 
}

export default function InputForm({
  tipoInput,
  metodoSubmit,
  valorInput,
  options = [],
  dadosSelect = [],
  idSelect = 'id', // Valor padrão
  nomeSelect = 'name', // Valor padrão
  label,
  placeholder = '',
  fileSVG,
  fileImage,
  idFileInput
}: FormularioProps) {
 
  const [formData, setFormData] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);


  const FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // Cria uma URL temporária para a imagem
    }
  };


  return (
    // <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
      <div className="space-y-6">
        <div>
          <label 
            htmlFor={label.toLowerCase()} 
            className="block text-gray-700 font-medium mb-2">
            {label}
          </label>

          {/* Condicional para renderizar o input correto com base no tipoInput */}
          {tipoInput === 'text' && (
            <input
              type="text"
              id={label.toLowerCase()}
              name={label.toLowerCase()}
              value={valorInput}
              onChange={metodoSubmit}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 placeholder-slate-500 text-black"
              placeholder={placeholder}
              required
            />
          )}

          {(tipoInput === 'select') && (
            <select
              id={label.toLowerCase()}
              name={label.toLowerCase()}
              value={valorInput}
              onChange={metodoSubmit}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 placeholder-slate-500 text-black"
              required
            >
              <option value="">Selecione uma opção</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {tipoInput === 'selectDados' && (
              <select
                id={label.toLowerCase()}
                name={label.toLowerCase()}
                value={valorInput}
                onChange={metodoSubmit}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 placeholder-slate-500 text-black"
                required>
                <option value="">Selecione uma Opção</option>
                {dadosSelect.map((option, index) => (
                  <option key={option[idSelect]} value={option[idSelect]}>
                      {option[nomeSelect].toUpperCase()}
                  </option>
                ))}
              </select>
            )}

          {tipoInput === 'textarea' && (
            <textarea
              id={label.toLowerCase()}
              name={label.toLowerCase()}
              value={valorInput}
              onChange={metodoSubmit}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder={placeholder}
              rows={4}
              required
            />
          )}

          {tipoInput === 'password' && (
            <input
              type="password"
              id={label.toLowerCase()}
              name={label.toLowerCase()}
              value={valorInput}
              onChange={metodoSubmit}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 placeholder-slate-500 text-black"
              placeholder={placeholder}
              required
            />
          )}

          {tipoInput === 'date' && (
            <input
              type="date"
              id={label.toLowerCase()}
              name={label.toLowerCase()}   
              value={valorInput}
              onChange={metodoSubmit}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 placeholder-slate-500 text-black"
              required
            />
          )}

          {tipoInput === 'email' && (
            <input
              type="email"
              id={label.toLowerCase()}
              name={label.toLowerCase()}
              value={valorInput}
              onChange={metodoSubmit}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 placeholder-slate-500 text-black"
              placeholder={placeholder}
              required
            />
          )}

          {tipoInput === 'number' && (
            <input
              type="number"
              id={label.toLowerCase()}
              name={label.toLowerCase()}
              value={valorInput}
              onChange={metodoSubmit}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 placeholder-slate-500 text-black"
              placeholder={placeholder}
              required
            />
          )}

          {tipoInput === 'radio' && (
            <div className="space-y-2">
              {options.map((option, index) => (
                <label key={index} className="inline-flex items-center">
                  <input
                    type="radio"
                    name={label.toLowerCase()}
                    value={option}
                    // onChange={handleChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          )}

        {tipoInput === 'fileInput' && (
          <input
            type="file"
            value={valorInput}
            // onChange={metodoSubmit}
            accept='image/*'
            onChange={fileImage}
            className="block w-full border rounded text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-rose-500 file:text-white hover:file:bg-rose-600"
            required
          />
        )}

        {tipoInput === 'fileInputSVG' && (
          <input
            type="file"
            id={idFileInput}
            accept='.svg'
            onChange={fileSVG}
            className="block w-full border rounded text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-rose-500 file:text-white hover:file:bg-rose-600"
            required
          />
        )}
      </div>
    </div>
  );
}
