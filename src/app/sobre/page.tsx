import CardJogo from '../components/CardJogo';
import ImagensCirculares from '../components/Imagens';

export default function Sobre() {
  const circularImages = [
    '/img/zoombi.png',
    '/img/homem.png',
    '/img/img3.png',
    '/img/menina.png',
    // '/img/menin.png',
  ];
  const recompensa = [
    '/img/trofeu.png',
    '/img/lancamento__foguete.png',
    // '/img/foguete.png',
    '/img/dist.png',
    // '/img/taça.png',
    '/img/montanha.png',
  ];

  return (
    <div className="bg-gray-200 text-gray-900">
      {/* Header */}
      <header className="text-center py-10 bg-indigo-800 shadow-lg mt-12">
        <h1 className="text-4xl font-extrabold text-white">Sobre</h1>
        <p className="mt-2 text-lg font-light text-indigo-300">
          Explore a nossa plataforma e descubra seus benefícios.
        </p>
      </header>

      <main className="container mx-auto px-6 lg:px-20 py-12 text-center">
        {/* Seção 1: Sobre a Plataforma */}
        <section className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <CardJogo
            title="Minecraft"
            image="/img/sobre.png"
            buttonText="Jogar"
            alt="Imagem representando o jogo Minecraft"
          />
          <article className="max-w-lg">
            <div className="max-w-lg text-center lg:text-justify">
              <h2 className="text-3xl font-bold text-green-700 mb-4">Gaming Place</h2>
              <p className="text-gray-700 leading-relaxed">
                A Gaming Place é uma plataforma gamificada que concentra todos os jogos desenvolvidos na ULBRA Palmas. 
                Organizamos jogos em categorias como saúde, social, educação e acessibilidade, facilitando o acesso e a divulgação 
                dos desenvolvedores. Um ambiente único, pensado para unir diversão e aprendizado.
              </p>
            </div>  
          </article>
        </section>

        {/* Seção 2: Ganhe Recompensas */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="max-w-lg text-center lg:text-justify">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Ganhe Recompensas</h2>
            <p className="text-gray-700 leading-relaxed">
              Na Gaming Place, sua jornada é recompensada! Ganhe emblemas, troféus e níveis de usuário conforme 
              avança nos desafios. Um sistema feito para motivar e engajar jogadores enquanto aprendem e se divertem.
            </p>
            <div className="flex justify-center lg:justify-start gap-4 mt-6">
              {recompensa.map((imgPath, index) => (
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
      </main>

      {/* Footer */}
      <div className="mb-20 lg:mb-36">
      <footer className="bg-indigo-800 py-10 text-center border-t-2 border-white">
        <h2 className="text-2xl font-bold text-white">Acompanhe seu Progresso</h2>
        <p className="text-indigo-300 mt-4">
          Monitore seu progresso com emblemas, troféus e muito mais.
        </p>
        <div className="flex justify-center gap-6 mt-6 mb-4">
          {circularImages.map((img, index) => (
            <ImagensCirculares key={index} caminho={img} />
          ))}
        </div>
      </footer>
      </div>
    </div>
  );
}

