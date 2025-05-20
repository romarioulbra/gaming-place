'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from "next-auth/react";

export default function EmailForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  
  const { data: session, status } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse('Indicação realizada com sucesso!');
        setFormData({ name: '', email: '' });
      } else {
        setResponse(data.error || 'Erro ao enviar e-mail');
      }
    } catch (error) {
      setResponse('Erro ao conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  const [currentImage, setCurrentImage] = useState('/img/astronauta-1.jpg');
  const images = ['/img/astronauta-1.jpg', '/img/astronauta-2.jpg', '/img/astronauta-3.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

    const { nome, email, nivel, id } = session.usuario;

  return (
    <div className=" p-14 bg-white shadow-2xl rounded-xl border border-gray-200 flex flex-col items-center">
      <div className="flex justify-center items-center mb-6">
        <div className="relative w-40 h-40">
          <Image 
            src={currentImage} 
            alt="Astronauta"
            layout="fill"
            objectFit="cover"
            className="rounded-full shadow-xl shadow-indigo-400 transition-all duration-1000 ease-in-out opacity-100 hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-indigo-300"
          />
        </div>
      </div>

      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Indicar Amigo</h2>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Seu Nome"
            // value={formData.name}
            value={nome}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-lg text-black"
            required
          />
        </div>
        
        <div>
          <input
            type="text"
            name="usuario"
            placeholder="Seu Nome"
            // value={formData.name}
            value={id}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-lg text-black"
            required
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="E-mail do seu Amigo"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-lg text-black"
            required
          />
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 text-lg"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>

      {response && (
        <p className="mt-6 text-center text-lg text-gray-600">{response}</p>
      )}
    </div>
  );
}
