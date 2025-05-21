// Codigo enviando para email, tudo ok
// 'use client';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { useSession } from "next-auth/react";

// export default function EmailForm() {
//   const [formData, setFormData] = useState({ name: '', email: '' });
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState('');
  
//   const { data: session, status } = useSession();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setResponse('');

//     try {
//       const res = await fetch('/api/email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setResponse('Indicação realizada com sucesso!');
//         setFormData({ name: '', email: '' });
//       } else {
//         setResponse(data.error || 'Erro ao enviar e-mail');
//       }
//     } catch (error) {
//       setResponse('Erro ao conectar ao servidor');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const [currentImage, setCurrentImage] = useState('/img/astronauta-1.jpg');
//   const images = ['/img/astronauta-1.jpg', '/img/astronauta-2.jpg', '/img/astronauta-3.jpg'];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prevImage) => {
//         const currentIndex = images.indexOf(prevImage);
//         const nextIndex = (currentIndex + 1) % images.length;
//         return images[nextIndex];
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//     const { nome, email, nivel, id } = session.usuario;

//   return (
//     <div className=" p-14 bg-white shadow-2xl rounded-xl border border-gray-200 flex flex-col items-center">
//       <div className="flex justify-center items-center mb-6">
//         <div className="relative w-40 h-40">
//           <Image 
//             src={currentImage} 
//             alt="Astronauta"
//             layout="fill"
//             objectFit="cover"
//             className="rounded-full shadow-xl shadow-indigo-400 transition-all duration-1000 ease-in-out opacity-100 hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-indigo-300"
//           />
//         </div>
//       </div>

//       <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Indicar Amigo</h2>

//       <form onSubmit={handleSubmit} className="w-full space-y-4">
//         <div>
//           <input
//             type="text"
//             name="name"
//             placeholder="Seu Nome"
//             // value={formData.name}
//             value={nome}
//             onChange={handleChange}
//             className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-lg text-black"
//             required
//           />
//         </div>
        
//         <div>
//           <input
//             type="text"
//             name="usuario"
//             placeholder="Seu Nome"
//             // value={formData.name}
//             value={id}
//             onChange={handleChange}
//             className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-lg text-black"
//             required
//           />
//         </div>
        
//         <div>
//           <input
//             type="email"
//             name="email"
//             placeholder="E-mail do seu Amigo"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-lg text-black"
//             required
//           />
//         </div>
        
//         <div>
//           <button
//             type="submit"
//             className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 text-lg"
//             disabled={loading}
//           >
//             {loading ? 'Enviando...' : 'Enviar'}
//           </button>
//         </div>
//       </form>

//       {response && (
//         <p className="mt-6 text-center text-lg text-gray-600">{response}</p>
//       )}
//     </div>
//   );
// }


'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from "next-auth/react";

export default function EmailForm() {
  const [formData, setFormData] = useState({ email_indicado: '' });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const { data: session, status } = useSession();
  
  const [currentImage, setCurrentImage] = useState('/img/astronauta-1.jpg');
  
  useEffect(() => {
    const images = ['/img/astronauta-1.jpg', '/img/astronauta-2.jpg', '/img/astronauta-3.jpg'];
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  
  if (status === 'loading') {
    return <div className="p-14 text-center">Carregando...</div>;
  }

  if (!session?.user) {
    return (
      <div className="p-14 text-center">
        <p>Por favor, faça login para acessar esta funcionalidade.</p>
      </div>
    );
  }

 const {email,id } = session.usuario;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email_indicado) {
      setResponse('Por favor, informe o e-mail do amigo');
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      const payload = {
        usuario_indicador_id: id,
        indicacao_amigo_email_indicador: email,
        indicacao_amigo_email_indicado: formData.email_indicado,
        status_convite: 'ENVIADO'
      };

      const res = await fetch('/api/indicacao_amigos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao enviar indicação');
      }

      setResponse('Indicação registrada e e-mail enviado com sucesso!');
      setFormData({ email_indicado: '' });
    } catch (error) {
      console.error('Erro no processo:', error);
      setResponse(error instanceof Error ? error.message : 'Erro ao conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="p-14 bg-white shadow-2xl rounded-xl border border-gray-200 flex flex-col items-center">
      <div className="flex justify-center items-center mb-6">
        <div className="relative w-40 h-40">
          <Image 
            src={currentImage} 
            alt="Astronauta"
            fill
            className="rounded-full shadow-xl shadow-indigo-400 transition-all duration-1000 ease-in-out opacity-100 hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-indigo-300"
            priority
          />
        </div>
      </div>

      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Indicar Amigo</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="hidden"
          name="usuario_id"
          value={id}
        />
        
        <div>
          <input
            type="hidden"
            value={email || ''}
            readOnly
            className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mail do Amigo *
          </label>
          <input
            type="email"
            name="email_indicado"
            placeholder="Digite o e-mail do seu amigo"
            value={formData.email_indicado}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-700"
            required
          />
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-white rounded-lg transition duration-200 text-lg font-medium
              ${loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'}
            `}
          >
            {loading ? 'Enviando...' : 'Enviar Indicação'}
          </button>
        </div>
      </form>

      {response && (
        <div className={`mt-4 p-4 rounded-lg text-center w-full max-w-md ${
          response.includes('sucesso') 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          {response}
        </div>
      )}
    </div>
  );
}