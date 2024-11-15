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
        jogos_url_img: ``
       }
  );


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);


    // Manipulações no SELECT Buscar categorias para o select
    const [categoriasJogos, setCategoriasJogos] = useState([]);

    // Função para buscar as categorias da API
    useEffect(() => {
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
    }, []);

   
  // Submissão do formulário
  const FormularioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Certificar que a imagem foi carregada
    // if (!formData.jogos_url_img) {
    //   alert("Por favor, selecione e carregue uma imagem antes de cadastrar.");
    //   return;
    // }

    try {
      const response = await fetch('/api/jogos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Jogo cadastrado com sucesso!');
        setFormData({
          jogos_nome: "",
          jogos_descricao: "",
          jogos_link: "",
          jogos_url_img: "",
          // categoria_jogo_id: "",
        });
      } else {
        throw new Error('Erro ao cadastrar o jogo.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao cadastrar o jogo.');
    }
  };

  
    // Manipulação de arquivos
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const formDataObj = new FormData();
        formDataObj.append("file", file);
        setIsUploading(true);
  
        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formDataObj,
          });
  
          if (!response.ok) {
            throw new Error("Erro ao fazer upload");
          }
  
          const data = await response.json();
          console.log("URL do arquivo carregado:", data.url);
  
          // Atualiza o caminho da imagem no formData
          setFormData((prevData) => ({
            ...prevData,
            jogos_url_img: data.url,
          }));
          
          alert("Imagem carregada com sucesso!");
  
        } catch (error) {
          console.error("Erro ao carregar imagem:", error);
          alert("Ocorreu um erro ao carregar a imagem. Tente novamente.");
        }finally {
          setIsUploading(false);
        }
      }
    };



  return (
    <>
      <h1 className="text-center mt-24 mb-3 text-2xl font-bold">Cadastro de Jogos</h1>
      <CabecalhoVoltar  
        Icone = {FaGamepad}
      />
      <Alert/>

      <div className="flex-auto ml-4 mr-4 mt-4 mb-4">
        <div className="p-8 border border-gray-300 shadow-lg bg-white rounded-lg mr-2 ml-2"> 
          <form onSubmit={FormularioSubmit} className="bg-white p-8 rounded-lg mt-2 ">
            <div className="p-6">
                <InputForm
                  tipoInput="text"
                  label="Jogo"
                  placeholder="Nome do Jogo"
                  valorInput={formData.jogos_nome}
                  metodoSubmit={(e) => setFormData({ ...formData, jogos_nome: e.target.value })}
                />

                <InputForm
                  tipoInput="text"
                  label="Link do Jogo"
                  placeholder="www.exemplo.com.br"
                  valorInput={formData.jogos_link}
                  metodoSubmit={(e) => setFormData({ ...formData, jogos_link: e.target.value })}
                />
           
                <InputForm
                  tipoInput="selectDados"
                  label="Categoria do Jogo"
                  dadosSelect={categoriasJogos}
                  idSelect="categoria_jogo_id" 
                  nomeSelect="categoria_jogo_area_atuacao" 
                  // valorInput={formData.categoria_jogos}
                  // metodoSubmit={(e) => setFormData({ ...formData, categoria_jogos: e.target.value })}
                />

                <InputForm
                  tipoInput="textarea"
                  label="Descrição"
                  placeholder="Digite aqui a descrição do Jogo"
                  valorInput={formData.jogos_descricao}
                  metodoSubmit={(e) => setFormData({ ...formData, jogos_descricao: e.target.value })}
                />
            </div>

            <InputFile 
              label="Selecione um arquivo:" 
              onChange={handleFileChange} 
              metodoSubmit={(e) => setFormData({ ...formData, jogos_url_img: e.target.value })}
            />

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
