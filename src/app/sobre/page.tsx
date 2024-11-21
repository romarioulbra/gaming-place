// import CardJogo from '../components/CardJogo';
// import ImagensCirculares from '../components/Imagens';

// export default function Sobre() {
//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-tr from-purple-500 to-purple-300 p-8 mt-16">
//           <h1 className="text-3xl font-bold ml-16  mb-6">Sobre</h1>
//           <div className="flex items-center space-x-12 mb-20 mt-4">
//               <CardJogo 
//                   title="Minecraft" 
//                   image="/img/sobre.png" 
//                   buttonText="Jogar"
//               />
//               <div>
//                   <h2 className="text-2xl font-bold mb-2 text-fuchsia-600">Gaming Place</h2>
//                   <p className="text-white text-md text-justify">
//                   A Gaming Place é uma plataforma gamificada que atua sendo um ambiente
//                   unificado para os jogos desenvolvidos no ULBRA Palmas, os quais são 
//                   segmentados por áreas como saúde,Social,Educação e Acessibilidade.
//                   Esse espaço é importante pois concentra todos os jogos em um só lugar,
//                     facilitando o acesso e a divulgação por parte dos desenvolvedores.
//                   </p>
//               </div>
//           </div>
          
//           <div className="flex items-center space-x-4 mt-10 mr-16">
//             <div className="ml-16">
//               <h2 className="text-2xl font-bold mb-2 text-white">Acompanhe seu progresso e ganhe recompensas</h2>
//               <div>
//                   <p className="text-white text-md">
//                   No Gaming Place, você pode acompanhar seu progresso de forma fácil e divertida. 
//                   Através dos emblemas conquistados, troféus e nível do usuário, você pode ver como 
//                   está se saindo dentro da plataforma.
//                   </p>
//                   <div className="flex justify-left ml-4 gap-4 mt-5">
//                     <ImagensCirculares caminho='/img/zoombi.png'/>
//                     <ImagensCirculares caminho='/img/homem.png'/>
//                     <ImagensCirculares caminho='/img/img3.png'/>
//                     <ImagensCirculares caminho='/img/menina.png'/>
//                   </div>
//               </div>
//             </div>
//             <CardJogo title="" image="/img/recompensa.png"  buttonText="Jogar" />
//           </div>           
//         </div>
//     </>
//   );
// }

import CardJogo from '../components/CardJogo';
import ImagensCirculares from '../components/Imagens';

export default function Sobre() {
  const circularImages = [
    '/img/zoombi.png',
    '/img/homem.png',
    '/img/img3.png',
    '/img/menina.png',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-500 to-purple-300 p-8 mt-16">
      <header className="ml-16 mb-6">
        <h1 className="text-3xl font-bold">Sobre</h1>
      </header>

      <section className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 mb-20 mt-4">
        <CardJogo 
          title="Minecraft" 
          image="/img/sobre.png" 
          buttonText="Jogar" 
          alt="Imagem representando o jogo Minecraft"
        />
        <article>
          <h2 className="text-2xl font-bold mb-2 text-black">Gaming Place</h2>
          <p className="text-white text-md text-justify">
            A Gaming Place é uma plataforma gamificada que atua sendo um ambiente
            unificado para os jogos desenvolvidos no ULBRA Palmas, os quais são 
            segmentados por áreas como saúde, social, educação e acessibilidade.
            Esse espaço é importante pois concentra todos os jogos em um só lugar,
            facilitando o acesso e a divulgação por parte dos desenvolvedores.
          </p>
        </article>
      </section>

      <section className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-4 mt-10 mr-16">
        <div className="ml-16">
          <h2 className="text-2xl font-bold mb-2 text-black">
            Acompanhe seu progresso e ganhe recompensas
          </h2>
          <p className="text-white text-md text-justify">
            No Gaming Place, você pode acompanhar seu progresso de forma fácil e divertida. 
            Através dos emblemas conquistados, troféus e nível do usuário, você pode ver como 
            está se saindo dentro da plataforma.
          </p>
          <div className="flex justify-left ml-4 gap-4 mt-5">
            {circularImages.map((imgPath, index) => (
              <ImagensCirculares key={index} caminho={imgPath} />
            ))}
          </div>
        </div>
        <CardJogo 
          title="" 
          image="/img/recompensa.png"  
          buttonText="Jogar" 
          alt="Imagem representando recompensas no Gaming Place"
        />
      </section>           
    </div>
  );
}
