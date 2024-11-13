'use client'
import { useState } from 'react';
interface FormularioProps {
  tipoInput: 'text' | 'select' | 'textarea' | 'date' | 'email' | 'number' | 'radio' | 'password'; // Novos tipos adicionados
  label: string;
  placeholder?: string;
  options?: string[]; // Para o select e radio
}

export default function InputForm({
  tipoInput,
  metodoSubmit,
  valorInput,
  options = [],
  label,
  placeholder = '',
}: FormularioProps) {
 
  const [formData, setFormData] = useState('');

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   setFormData(e.target.value);
  // };

  return (
    // <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
      <div className="space-y-6">
        <div>
          <label htmlFor={label.toLowerCase()} className="block text-gray-700 font-medium mb-2">
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
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder={placeholder}
              required
            />
          )}

          {tipoInput === 'select' && (
            <select
              id={label.toLowerCase()}
              name={label.toLowerCase()}
              value={valorInput}
              onChange={metodoSubmit}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
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

          {tipoInput === 'date' && (
            <input
              type="date"
              id={label.toLowerCase()}
              name={label.toLowerCase()}   
              value={valorInput}
              onChange={metodoSubmit}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
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
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
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
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
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

          {tipoInput === 'password' && (
            <input
              type="password"
              id={label.toLowerCase()}
              name={label.toLowerCase()}
              value={valorInput}
              onChange={metodoSubmit}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder={placeholder}
              required
            />
          )}
        </div>
      </div>
  );
}
