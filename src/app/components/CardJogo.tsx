import Image from 'next/image'; 
export default function CardJogo({ title, image, buttonText }) {
  return (
     <>
      <div className="bg-purple-600 rounded-lg p-6 ml-16 grid justify-items-center shadow-lg shadow-slate-300 rotate-2 hover:scale-105 transition-transform duration-300 -skew-y-6">
          <Image src={image} alt={title} width={300} height={200} />
          <h2 className="text-2xl font-bold text-white text-center mt-2 mb-2">{title}</h2>
          <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded w-60">{buttonText}</button>
      </div>
     </>
  );
}
