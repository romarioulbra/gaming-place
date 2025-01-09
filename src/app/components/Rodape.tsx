import Image from 'next/image'; // Usado para carregar a imagem no Next.js
import { GrGamepad } from "react-icons/gr";

export default function Footer() {
   return (
    <footer className="flex flex-col items-center justify-between p-4 bg-gray-900 relative  bottom-0  w-full text-white border-t-2 border-white">
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
            
        {/* Botões Alinhados à Direita */}
        <div className="flex flex-col items-end md:items-end mr-5">
         <div className="flex space-x-2">           
           <Image src="/img/logoCienciasH.png" alt="logo" width={110} height={110} />
           <Image src="/img/logoEngenhariaH.png" alt="logo" width={110} height={110} />
         </div>
       </div>
      </div>
    </footer>
  
  
  );
}
