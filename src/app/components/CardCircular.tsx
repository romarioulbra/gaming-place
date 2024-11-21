// export default function CardCircular({ icon, text }) {
//   return (
//     <div className="flex flex-col items-center justify-center bg-purple-100 rounded-full w-36 h-36 shadow-lg">
//       <div className="text-purple-600 text-3xl">{icon}</div>
//       <p className="text-sm font-medium text-purple-600 mt-2">{text}</p>
//     </div>
//   );
// }
import Image from 'next/image';
import Link from 'next/link';

export default function CardCircular({ image, text,href}) {
  return (
    <Link href={href} passHref>
      <div className="flex flex-col items-center justify-center bg-white rounded-full w-32 h-32 shadow-sm shadow-purple-400">
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
