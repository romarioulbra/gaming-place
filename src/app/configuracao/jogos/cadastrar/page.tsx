'use client';

import { useState,useEffect } from "react";
import Botao from "@/app/components/Botao";
import InputForm from "@/app/components/InputsForm";
import { FaGamepad} from "react-icons/fa";
import Alert from "@/app/components/Alert";
import CabecalhoVoltar from "@/app/components/CabecalhoVoltar";
import InputFile from "../../../components/FileInput";

export default function Jogos() {
  const [formData, setFormData] = useState(
      { jogos_nome: ``, 
        jogos_descricao: ``, 
        jogos_link: ``,
        jogos_img: ``
       }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/jogos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Jogo cadastrado com sucesso!');
      setFormData(
        { jogos_nome: ``, 
          jogos_descricao: ``, 
          jogos_link: ``,
          jogos_img: ``
         }
        );
    } else {
      alert('Erro ao cadastrar Jogos.');
    }
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };
  

  // Manipulações no SELECT
  const [categoriasJogos, setCategoriasJogos] = useState([]);

  useEffect(() => {
    // Função para buscar as categorias da API
    const fetchCategorias = async () => {
      try {
        const response = await fetch('/api/categoria_jogos');
        const data = await response.json();
        setCategoriasJogos(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategorias();
    // console.log(categoriasJogos);
  }, []);


  return (
    <>
      <h1 className="text-center mt-24 mb-3 text-2xl font-bold">Cadastro de Jogos</h1>
      <CabecalhoVoltar  
        Icone = {FaGamepad}
      />
      <Alert/>

      <div className="flex-auto ml-4 mr-4 mt-4 mb-4">
        <div className="p-8 border border-gray-300 shadow-lg bg-white rounded-lg mr-2 ml-2"> 
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg mt-2 ">
            {/* jogos_id, jogos_nome, jogos_descricao, jogos_link, jogos_img */}
            <div className="p-6">
                <InputForm
                  tipoInput="text"
                  label="Jogo"
                  placeholder="Nome do Jogo"
                />

                <InputForm
                  tipoInput="text"
                  label="Link do Jogo"
                  placeholder="www.exemplo.com.br"
                />
           
                <InputForm
                  tipoInput="selectDados"
                  label="Categoria do Jogo"
                  dadosSelect={categoriasJogos}
                  idSelect="categoria_jogo_id" 
                  nomeSelect="categoria_jogo_area_atuacao" 
                />
            </div>

            <InputFile label="Selecione um arquivo:" onChange={handleFileChange} />

            <div className="flex justify-center">
              <Botao
                texto='Cadastrar'
                tipo='submit'
                cor = 'azul'
              />
            </div>  
          </form>
        </div>
      </div>
    </>
  );
}
