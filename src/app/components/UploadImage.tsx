"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";

export default function UploadImage({label,metodoSubmit}) {
  const [file, setFile] = useState<File | undefined>();
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        // const responseData = await res.json();
        setUploadedFileName(file.name); // Armazena o nome do arquivo
        console.log(`A imagem ${file.name} foi gravada com sucesso!`);
      } else {
        const error = await res.json();
        console.error("Erro ao gravar o arquivo:", error);
        console.log(`Erro ao gravar a imagem: ${error.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      console.log("Ocorreu um erro durante o upload. Tente novamente.");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files[0]);
    setUploadedFileName(null); // Reseta a mensagem de sucesso ao selecionar um novo arquivo
    // metodoSubmit;
  };

  return (
    <>
    <p className="text-xl text-center my-4">{label}</p>
    <div className="flex flex-col items-center">
      <input
        type="file"
        // className="ml-28 bg-zinc-900 text-zinc-100 p-2 rounded block mb-2"
        className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-zinc-900 file:text-white hover:file:bg-blue-600"
        onChange={handleFileChange}
        // onChange={metodoSubmit}
      />

      {file && (
        <Image
          src={URL.createObjectURL(file)}
          alt="Uploaded file preview"
          className="w-64 h-64 object-contain mx-auto"
          width={256}
          height={256}
        />
      )}

      {uploadedFileName && (
        <div className="ml-12 mr-12 mt-4 bg-orange-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p className="font-bold">Sucesso!</p>
          <p>A imagem <strong>{uploadedFileName}</strong> foi gravada com sucesso!</p>
        </div>
      )}

      <button
        className="bg-green-900 text-zinc-100 p-2 mb-4 mt-4 rounded block w-56 disabled:opacity-50"
        onClick={handleUpload}
        disabled={!file}
      >
        Upload
      </button>
    </div>
    </>
  );
}
