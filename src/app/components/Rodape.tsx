
import Image from 'next/image'; // Usado para carregar a imagem no Next.js
import { GrGamepad } from "react-icons/gr";
export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between p-4 bg-gray-800 text-white border-t-2 border-white">
      {/* Logo Alinhada à Esquerda */}
      <div className="flex items-center justify-between w-full max-w-6xl">
        <div className="flex items-center">
          <Image src="/img/ulbraPalmas-light.svg" alt="Logo" width={110} height={110} /> 
        </div>
        {/* Texto Centralizado */}    
        <div className="flex text-white text-xl font-bold space-x-2 ">
            <GrGamepad className='w-8 h-8'/>
            <h2>  Gaming Place</h2><br />
        </div>
            {/* <strong className="text-sm">Direitos Reservados &copy; {new Date().getFullYear()}</strong> */}
        {/* Botões Alinhados à Direita */}
        <div className="flex flex-col items-end">
          <div className="flex space-x-2">
            <Image src="/img/logoCienciasH.png" alt="logo" width={90} height={90} /> 
            <Image src="/img/logoSistemasH.png" alt="logo" width={90} height={90} /> 
          </div>
          <div className="flex space-x-2 mt-2">
            <Image src="/img/logoEngenhariaH.png" alt="logo" width={90} height={90} /> 
            <Image src="/img/logoEngenhariaH.png" alt="logo" width={90} height={90} /> 
          </div>
        </div>
      </div>
    </footer>
  );
}
