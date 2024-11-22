
import Image from 'next/image';
import Link from 'next/link';

export default function CardCircular({ image, text,href}) {
  return (
    <Link href={href} passHref>
      {/* <div className="flex flex-col items-center justify-center bg-white rounded-full w-32 h-32 shadow-xl shadow-purple-300"> */}
      <div className="flex flex-col items-center justify-center bg-white rounded-full w-32 h-32 shadow-xl shadow-fuchsia-300">
      {/* <div className="flex flex-col items-center justify-center bg-white rounded-full w-32 h-32 shadow-xl shadow-indigo-300"> */}
        <div className="relative w-8 h-8 mb-2">
            <Image 
              src={image} 
              alt={text} 
              layout="fill" // Garante que a imagem preencha o container definido
              objectFit="contain" // Ajusta a imagem para caber no espaço
            />
        </div>
        <p className="text-sm font-medium text-gray-800">{text}</p>
      </div>
    </Link>  
  );
}
