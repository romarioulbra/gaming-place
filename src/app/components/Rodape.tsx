import Image from 'next/image'; // Usado para carregar a imagem no Next.js
import { GrGamepad } from "react-icons/gr";



export default function Footer() {
 
  return (
      <footer className="flex flex-col items-center  p-4 bg-gray-900 text-gray-200 py-4 border-t-2 border-white">
        {/* Logo Alinhada à Esquerda */}
        <div className="flex items-center justify-between w-full max-w-6xl space-x-4">
          
          <div className="flex items-center">
           <Image src="/img/ulbraPalmas-light.svg" 
              alt="Logo" 
              width={90} 
              height={90} 
              className="w-30 h-30 md:w-28 md:h-28"  // Ajuste para telas maiores 
            /> 
          </div>

          {/* Texto Centralizado */}    
          <div className="flex text-white text-xl font-bold space-x-2 ">
              <GrGamepad className="w-6 h-6 md:w-5 md:h-5" />
              <h2 className=" max-w-xs break-words" >Gaming Place</h2>
          </div>
          
        
          {/* Botões Alinhados à Direita */}
           <div className="flex flex-col items-end md:items-end mr-5">
              <div className="flex space-x-2">           
                <Image src="/img/logoCienciasH.png" 
                  alt="logo" 
                  width={110} 
                  height={110} 
                  // layout='responsive'
                /> 
                <Image src="/img/logoEngenhariaH.png" 
                  alt="logo" 
                  width={110} 
                  height={110}
                  // layout='responsive'
                />
              </div>
          </div>

{/*         
          <div className="flex flex-col items-center md:items-end mr-5">
            <div className="flex space-y-2">           
              <Image 
                src="/img/logoCiencias.png" 
                alt="logo" 
                width={60} 
                height={60} 
                className='mr-1 pb-2 pr-2 pl-2 pt-4'
              /> 
              <Image 
                src="/img/logoEngenharia.png" 
                alt="logo" 
                width={60} 
                height={100}
                className='object-contain  pb-2 pr-2 pl-2 pt-2'
              />
            </div>
          </div> */}

          

        </div>
      </footer>
  );
}
