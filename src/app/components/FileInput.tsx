// InputFile.tsx
import React from 'react';

interface InputFileProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFile: React.FC<InputFileProps> = ({ label, onChange }) => {
  return (
    <div className="mb-4">
        <label htmlFor={label.toLowerCase()} className="block text-gray-700 font-medium mb-2">
            {label}
          </label>
      <input
        type="file"
        onChange={onChange}
        className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
        required
      />
    </div>
  );
};

export default InputFile;
