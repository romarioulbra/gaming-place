import Image from 'next/image'; 
export default function CardJogo({ title, image, buttonText }) {
  return (
     <>
      <div className="bg-purple-800 rounded-lg p-6">
          <Image src={image} alt={title} width={300} height={200} />
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">{buttonText}</button>
      </div>
     </>
  );
}
