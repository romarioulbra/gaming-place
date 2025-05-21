// import Image from 'next/image'; 
// export default function PerfilUsuario({ name, avatar, progress }) {
//   return (
//      <>
//       <div className="bg-white rounded-lg p-6">
//         <img src={avatar} alt={name} className="rounded-full w-20 h-20" />
//         <h2 className="text-xl font-bold">{name}</h2>
//         <p>Progresso: {progress}%</p>
//     </div>
//      </>
//   );
// }

import Image from 'next/image';

interface PerfilUsuarioProps {
  name: string;
  avatar: string;
  progress: number;
}

export default function PerfilUsuario({ name, avatar, progress }: PerfilUsuarioProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <Image
        src={avatar}
        alt={name}
        width={80}   // 20 * 4 (rem para px) ou ajuste conforme precisar
        height={80}
        className="rounded-full"
      />
      <h2 className="text-xl font-bold">{name}</h2>
      <p>Progresso: {progress}%</p>
    </div>
  );
}
