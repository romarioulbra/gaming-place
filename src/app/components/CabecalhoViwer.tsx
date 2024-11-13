import LoadBotao from "./Loading";

export default function CabecalhoViwer({nomeModel,Icone,urlCadastro}) {
  const titulo = `Gerenciamento de ${nomeModel}`;
  return (
      <>
        <h1 className="text-center mt-24 mb-2 text-2xl font-bold">Painel De Controle</h1>
        <div className="flex-auto ml-4 mr-4 mt-4 mb-4">
          <div className="p-8 border border-gray-300 shadow-lg flex justify-between items-center bg-white rounded-lg">        
            {/* Botões alinhados à esquerda */}
            <div className="flex space-x-2">
              <h2 className="font-bold flex">
                <Icone className="mr-2 border-black w-5 h-5 rounded-ful"/> 
                {titulo}
              </h2>
            </div>
            {/* Botões alinhados à direita */}
            <div className="flex space-x-2">
              <LoadBotao caminho = {urlCadastro}/>
            </div>
          </div>
        </div>
      </>
    );
}
