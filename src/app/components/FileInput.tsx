import React from 'react';

interface InputFileProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputFile({ label, onChange }: InputFileProps) {
  return (
    <div className="mb-4 mt-14">
      <label htmlFor={label.toLowerCase()} className="block text-gray-700 font-medium mb-2 text-center">
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
}
