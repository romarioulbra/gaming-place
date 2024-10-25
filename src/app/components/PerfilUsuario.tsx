import Image from 'next/image'; 
export default function PerfilUsuario({ name, avatar, progress }) {
  return (
     <>
      <div className="bg-white rounded-lg p-6">
        <img src={avatar} alt={name} className="rounded-full w-20 h-20" />
        <h2 className="text-xl font-bold">{name}</h2>
        <p>Progresso: {progress}%</p>
    </div>
     </>
  );
}
