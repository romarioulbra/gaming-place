'use client'
import Botao from "@/app/components/Botao";
import { useRouter } from 'next/navigation';

export default function CabecalhoCadastro({Icone}) {
  
  const router = useRouter();

  const BtnVoltar = () => {
    router.back();
  };

  return (
  <>
    <div className="flex-auto ml-4 mr-4 mt-4 mb-4">
      <div className="p-8 border border-gray-300 shadow-lg flex justify-between items-center bg-white rounded-lg">

        {/* Botões alinhados à esquerda */}
        <div className="flex space-x-2">
          <h2 className="font-bold flex">
            {/* {Icone}  */}
            <Icone className="mr-2 border-black w-7 h-7 rounded-ful"/>
            Preencha Todas informações Abaixo 
          </h2>
        </div>

        {/* Botões alinhados à direita */}
        <div className="flex space-x-2">
          <Botao
            texto="Voltar"
            cor="amarelo"
            tipo="submit"
            onClick={BtnVoltar}
          />
        </div>
      </div>
    </div>
  </>

  )
}


