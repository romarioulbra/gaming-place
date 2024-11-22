import LoadVoltar from "./LoadingVoltar";

export default function CabecalhoVoltar({Icone}) {

  return (
    <>
      <div className="flex-auto ml-4 mr-4 mt-4 mb-4">
        <div className="p-8 border border-gray-300 shadow-lg flex justify-between items-center bg-white rounded-lg">

          {/* Botões alinhados à esquerda */}
          <div className="flex space-x-2">
            <h2 className="font-bold flex">
                <Icone className="mr-4 border-black w-8 h-8 rounded-ful"/>
                  Preencha Todas as informações Abaixo 
            </h2>
          </div>

          {/* Botões alinhados à direita */}
          <div className="flex space-x-2">
            <div className="flex space-x-2">
              <LoadVoltar />
            </div>
          </div>
        </div>
      </div>                    
    </>
  );
}
