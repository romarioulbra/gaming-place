// import CardJogo from '../components/CardJogo';
// import ImagensCirculares from '../components/Imagens';

// export default function Sobre() {
//   const circularImages = [
//     '/img/zoombi.png',
//     '/img/homem.png',
//     '/img/img3.png',
//     '/img/menina.png',
//   ];
//   const recompensa = [
//     '/img/trofeu.png',
//     '/img/lancamento__foguete.png',
//     '/img/dist.png',
//     '/img/montanha.png',
//   ];

//   return (
//     <div className="bg-gray-200 text-gray-900">
//       {/* Header */}
//       <header className="text-center py-10 bg-indigo-800 shadow-lg mt-12">
//         <h1 className="text-4xl font-extrabold text-white">Sobre</h1>
//         <p className="mt-2 text-lg font-light text-indigo-300">
//           Explore a nossa plataforma e descubra seus benefícios!
//         </p>
//       </header>

//       <main className="container mx-auto px-6 lg:px-20 py-12 text-center ">
//         {/* Seção 1: Sobre a Plataforma */}
//         <section className="flex flex-col lg:flex-row items-center gap-12 mb-20">
//           <CardJogo
//             title="Minecraft"
//             image="/img/sobre.png"
//             buttonText="Jogar"
//           />
//           <article className="max-w-lg">
//             <div className="max-w-lg text-center lg:text-justify">
//               <h2 className="text-3xl font-bold text-green-700 mb-4">Gaming Place</h2>
//               <p className="text-gray-700 leading-relaxed">
//                 O Gaming Place é uma plataforma gamificada que concentra todos os jogos desenvolvidos na ULBRA Palmas. 
//                 Organizamos jogos em categorias como saúde, social, educação e acessibilidade, facilitando o acesso e a divulgação 
//                 dos desenvolvedores. Um ambiente único, pensado para unir diversão e aprendizado.
//               </p>
//             </div>  
//           </article>
//         </section>

//         {/* Seção 2: Ganhe Recompensas */}
//         <section className="flex flex-col-reverse lg:flex-row items-center gap-12">
//           <div className="max-w-lg text-center lg:text-justify">
//             <h2 className="text-3xl font-bold text-green-700 mb-4">Ganhe Recompensas</h2>
//             <p className="text-gray-700 leading-relaxed">
//               Na Gaming Place, sua jornada é recompensada! Ganhe emblemas, troféus e níveis de usuário conforme 
//               avança nos desafios. Um sistema feito para motivar e engajar jogadores enquanto aprendem e se divertem.
//             </p>
//             <div className="flex justify-center lg:justify-start gap-4 mt-6">
//               {recompensa.map((imgPath, index) => (
//                 <ImagensCirculares key={index} caminho={imgPath} />
//               ))}
//             </div>
//           </div>
//           <CardJogo
//             title=""
//             image="/img/recompensa.png"
//             buttonText="Jogar"
//           />
//         </section>
//       </main>

//       {/* Footer */}
//       <div className="">
//       <footer className="bg-indigo-800 py-10 text-center border-t-2 border-white">
//         <h2 className="text-2xl font-bold text-white">Acompanhe seu Progresso</h2>
//         <p className="text-indigo-300 mt-4">
//           Monitore seu progresso com emblemas, troféus e muito mais.
//         </p>
//         <div className="flex justify-center gap-6 mt-6 mb-4">
//           {circularImages.map((img, index) => (
//             <ImagensCirculares key={index} caminho={img} />
//           ))}
//         </div>
//       </footer>
//       </div>
//     </div>
//   );
// }




// 'use client'

// import { useState, useEffect } from 'react';
// import CardJogo from '../components/CardJogo';
// import ImagensCirculares from '../components/Imagens';

// export default function Sobre() {
//   const [isMobile, setIsMobile] = useState(false);
  
//   const circularImages = [
//     '/img/zoombi.png',
//     '/img/homem.png',
//     '/img/img3.png',
//     '/img/menina.png',
//   ];
  
//   const recompensas = [
//     { img: '/img/trofeu.png', alt: 'Troféu', text: 'Conquistas' },
//     { img: '/img/lancamento__foguete.png', alt: 'Foguete', text: 'Desafios' },
//     { img: '/img/dist.png', alt: 'Distintivo', text: 'Emblemas' },
//     { img: '/img/montanha.png', alt: 'Montanha', text: 'Níveis' },
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };
    
//     handleResize();
//     window.addEventListener('resize', handleResize);
    
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="text-center py-12 bg-gradient-to-r from-indigo-800 to-purple-700 shadow-lg">
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 animate-fade-in">
//             Sobre a Gaming Place
//           </h1>
//           <p className="text-lg md:text-xl font-light text-indigo-200 max-w-2xl mx-auto">
//             Explore nossa plataforma e descubra como unimos diversão, aprendizado e recompensas!
//           </p>
//         </div>
//       </header>

//       <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Seção 1: Sobre a Plataforma */}
//         <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-20">
//           <div className={`w-full ${isMobile ? 'order-2' : 'lg:w-1/2'}`}>
//             <CardJogo
//               title="Minecraft"
//               image="/img/sobre.png"
//               buttonText="Experimentar"
//               className="hover:scale-105 transition-transform duration-300"
//             />
//           </div>
//           <article className={`w-full ${isMobile ? 'order-1 mb-8' : 'lg:w-1/2'}`}>
//             <div className="text-center lg:text-left">
//               <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
//                 Gaming Place
//               </h2>
//               <p className="text-gray-700 leading-relaxed mb-4 text-lg">
//                 O Gaming Place é uma plataforma gamificada que concentra todos os jogos desenvolvidos na ULBRA Palmas.
//               </p>
//               <p className="text-gray-700 leading-relaxed text-lg">
//                 Organizamos jogos em categorias como saúde, social, educação e acessibilidade, facilitando o acesso e a divulgação 
//                 dos desenvolvedores. Um ambiente único, pensado para unir diversão e aprendizado de forma inovadora.
//               </p>
//             </div>  
//           </article>
//         </section>

//         {/* Seção 2: Ganhe Recompensas */}
//         <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
//           <article className={`w-full ${isMobile ? 'order-2 mt-8' : 'lg:w-1/2 order-1'}`}>
//             <div className="text-center lg:text-left">
//               <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
//                 Ganhe Recompensas
//               </h2>
//               <p className="text-gray-700 leading-relaxed mb-6 text-lg">
//                 Na Gaming Place, sua jornada é recompensada! Ganhe emblemas, troféus e aumente seu nível conforme 
//                 avança nos desafios. Um sistema feito para motivar e engajar jogadores enquanto aprendem e se divertem.
//               </p>
//               <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
//                 {recompensas.map((item, index) => (
//                   <div key={index} className="flex flex-col items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                     <ImagensCirculares caminho={item.img} alt={item.alt} />
//                     <span className="mt-2 text-sm font-medium text-gray-700">{item.text}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </article>
//           <div className={`w-full ${isMobile ? 'order-1' : 'lg:w-1/2 order-2'}`}>
//             <CardJogo
//               title=""
//               image="/img/recompensa.png"
//               buttonText="Ver Recompensas"
//               className="hover:scale-105 transition-transform duration-300"
//             />
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gradient-to-r from-indigo-800 to-purple-700 py-12 text-center">
//         <div className="container mx-auto px-4">
//           <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
//             Acompanhe seu Progresso
//           </h2>
//           <p className="text-indigo-200 mb-8 max-w-2xl mx-auto text-lg">
//             Monitore seu desenvolvimento com nosso sistema de conquistas e veja como você está evoluindo!
//           </p>
//           <div className="flex flex-wrap justify-center gap-6">
//             {circularImages.map((img, index) => (
//               <div key={index} className="transform hover:scale-110 transition-transform duration-300">
//                 <ImagensCirculares caminho={img} alt={`Avatar ${index + 1}`} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }



import CardJogo from '../components/CardJogo';
import ImagensCirculares from '../components/Imagens';

export default function Sobre() {
  const circularImages = [
    { img: '/img/zoombi.png', alt: 'Personagem Zumbi' },
    { img: '/img/homem.png', alt: 'Personagem Homem' },
    { img: '/img/img3.png', alt: 'Personagem 3' },
    { img: '/img/menina.png', alt: 'Personagem Menina' },
  ];

  const recompensas = [
    { img: '/img/trofeu.png', alt: 'Ícone Troféu', text: 'Troféus' },
    { img: '/img/lancamento__foguete.png', alt: 'Ícone Foguete', text: 'Desafios' },
    { img: '/img/dist.png', alt: 'Ícone Distintivo', text: 'Distintivos' },
    { img: '/img/montanha.png', alt: 'Ícone Montanha', text: 'Níveis' },
  ];

  return (
    <div className="bg-gray-200 text-gray-900">
      {/* Header - Mantido similar mas mais responsivo */}
      <header className="text-center py-8 md:py-12 bg-indigo-800 shadow-lg mt-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">Sobre</h1>
          <p className="mt-2 md:mt-3 text-base md:text-lg lg:text-xl font-light text-indigo-300 max-w-2xl mx-auto">
            Explore a nossa plataforma e descubra seus benefícios!
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Seção 1: Sobre a Plataforma - Layout mais compacto */}
        <section className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 mb-16 md:mb-20">
          <div className="w-full lg:w-5/12">
            <CardJogo
              title="Minecraft"
              image="/img/sobre.png"
              buttonText="Jogar"
              // className="w-full h-auto"
            />
          </div>
          <article className="w-full lg:w-7/12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 mb-4 text-center lg:text-left">
              Gaming Place
            </h2>
            <div className="space-y-4 text-gray-700 text-base md:text-lg">
              <p>
                O Gaming Place é uma plataforma gamificada que concentra todos os jogos desenvolvidos na ULBRA Palmas. 
              </p>
              <p>
                Organizamos jogos em categorias como saúde, social, educação e acessibilidade, facilitando o acesso e a divulgação 
                dos desenvolvedores. Um ambiente único, pensado para unir diversão e aprendizado.
              </p>
            </div>
          </article>
        </section>

        {/* Seção 2: Ganhe Recompensas - Mais compacta e organizada */}
        <section className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          <article className="w-full lg:w-7/12 order-2 lg:order-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 mb-4 text-center lg:text-left">
              Ganhe Recompensas
            </h2>
            <p className="text-gray-700 mb-6 text-base md:text-lg">
              Na Gaming Place, sua jornada é recompensada! Ganhe emblemas, troféus e níveis de usuário conforme 
              avança nos desafios. Um sistema feito para motivar e engajar jogadores enquanto aprendem e se divertem.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recompensas.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <ImagensCirculares caminho={item.img} alt={item.alt} className="w-16 h-16" />
                  <span className="mt-2 text-sm text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </article>
          <div className="w-full lg:w-5/12 order-1 lg:order-2 mb-6 lg:mb-0">
            <CardJogo
              title=""
              image="/img/recompensa.png"
              buttonText="Ver Recompensas"
              // className="w-full h-auto"
            />
          </div>
        </section>
      </main>

      {/* Footer - Mais compacto mas mantendo a essência */}
      <footer className="bg-indigo-800 py-8 md:py-10 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Acompanhe seu Progresso</h2>
          <p className="text-indigo-300 mb-6 text-sm md:text-base">
            Monitore seu progresso com emblemas, troféus e muito mais.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {circularImages.map((item, index) => (
              <ImagensCirculares 
                key={index} 
                caminho={item.img} 
                alt={item.alt}
                className="w-12 h-12 md:w-16 md:h-16"
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}


// import CardJogo from '../components/CardJogo';
// import ImagensCirculares from '../components/Imagens';

// export default function Sobre() {
//   const circularImages = [
//     { img: '/img/zoombi.png', alt: 'Personagem Zumbi' },
//     { img: '/img/homem.png', alt: 'Personagem Homem' },
//     { img: '/img/img3.png', alt: 'Personagem 3' },
//     { img: '/img/menina.png', alt: 'Personagem Menina' },
//   ];

//   const recompensas = [
//     { img: '/img/trofeu.png', alt: 'Ícone Troféu', text: 'Troféus' },
//     { img: '/img/lancamento__foguete.png', alt: 'Ícone Foguete', text: 'Desafios' },
//     { img: '/img/dist.png', alt: 'Ícone Distintivo', text: 'Distintivos' },
//     { img: '/img/montanha.png', alt: 'Ícone Montanha', text: 'Níveis' },
//   ];

//   return (
//     <div className="bg-gray-200 text-gray-900">
//       {/* Header */}
//       <header className="text-center py-8 md:py-12 bg-indigo-800 shadow-lg">
//         <div className="container mx-auto px-4">
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">Sobre</h1>
//           <p className="mt-2 md:mt-3 text-base md:text-lg lg:text-xl font-light text-indigo-300 max-w-2xl mx-auto">
//             Explore a nossa plataforma e descubra seus benefícios!
//           </p>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
//         {/* Seção 1: Sobre a Plataforma */}
//         <section className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 mb-16 md:mb-20">
//           <div className="w-full lg:w-5/12">
//             <CardJogo
//               title="Minecraft"
//               image="/img/sobre.png"
//               buttonText="Jogar"
//               className="w-full max-w-md mx-auto lg:max-w-full"
//               cardClassName="h-64 md:h-72" // Altura fixa para os cards
//             />
//           </div>
//           <article className="w-full lg:w-7/12">
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 mb-4 text-center lg:text-left">
//               Gaming Place
//             </h2>
//             <div className="space-y-4 text-gray-700 text-base md:text-lg">
//               <p>
//                 O Gaming Place é uma plataforma gamificada que concentra todos os jogos desenvolvidos na ULBRA Palmas. 
//               </p>
//               <p>
//                 Organizamos jogos em categorias como saúde, social, educação e acessibilidade, facilitando o acesso e a divulgação 
//                 dos desenvolvedores. Um ambiente único, pensado para unir diversão e aprendizado.
//               </p>
//             </div>
//           </article>
//         </section>

//         {/* Seção 2: Ganhe Recompensas */}
//         <section className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
//           <article className="w-full lg:w-7/12 order-2 lg:order-1">
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 mb-4 text-center lg:text-left">
//               Ganhe Recompensas
//             </h2>
//             <p className="text-gray-700 mb-6 text-base md:text-lg">
//               Na Gaming Place, sua jornada é recompensada! Ganhe emblemas, troféus e níveis de usuário conforme 
//               avança nos desafios. Um sistema feito para motivar e engajar jogadores enquanto aprendem e se divertem.
//             </p>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {recompensas.map((item, index) => (
//                 <div key={index} className="flex flex-col items-center">
//                   <ImagensCirculares caminho={item.img} alt={item.alt} className="w-14 h-14 md:w-16 md:h-16" />
//                   <span className="mt-2 text-sm text-gray-700">{item.text}</span>
//                 </div>
//               ))}
//             </div>
//           </article>
//           <div className="w-full lg:w-5/12 order-1 lg:order-2 mb-6 lg:mb-0">
//             <CardJogo
//               title=""
//               image="/img/recompensa.png"
//               buttonText="Ver Recompensas"
//               className="w-full max-w-md mx-auto lg:max-w-full"
//               cardClassName="h-64 md:h-72" // Altura fixa igual ao primeiro card
//             />
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-indigo-800 py-8 md:py-10 text-center">
//         <div className="container mx-auto px-4">
//           <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Acompanhe seu Progresso</h2>
//           <p className="text-indigo-300 mb-6 text-sm md:text-base">
//             Monitore seu progresso com emblemas, troféus e muito mais.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4 md:gap-6">
//             {circularImages.map((item, index) => (
//               <ImagensCirculares 
//                 key={index} 
//                 caminho={item.img} 
//                 alt={item.alt}
//                 className="w-12 h-12 md:w-14 md:h-14"
//               />
//             ))}
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }