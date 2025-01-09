import Image from 'next/image'; 

export default function ImagensCirculares({caminho}) {
  return (
    <>
      <div className=""> 
          <Image 
            src={caminho} 
            alt="Imagem 1" 
            width={200} 
            height={200} 
            className="w-24 h-24 rounded-full object-cover border-white border-2 p-2 shadow-lg shadow-fuchsia-500 "/>
      </div>    
    </>
  );
}
