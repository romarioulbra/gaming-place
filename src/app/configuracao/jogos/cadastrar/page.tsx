'use client';

import { useState,useEffect } from "react";
import Botao from "@/app/components/Botao";
import InputForm from "@/app/components/InputsForm";
import { FaGamepad} from "react-icons/fa";
import Alert from "@/app/components/Alert";
import CabecalhoVoltar from "@/app/components/CabecalhoVoltar";
import InputFile from "../../../components/FileInput";

import Image from 'next/image';
import UploadImage from "@/app/components/UploadImage";

export default function Jogos() {
  const [formData, setFormData] = useState(
      { jogos_nome: ``, 
        jogos_descricao: ``, 
        jogos_link: ``,
        jogos_url_img: ``,
        // categoria_jogo_id: ``
       }
  );


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // URL para pré-visualização


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
        
        setPreviewImage(null); // Limpa a pré-visualização

      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar o jogo.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert(error.message || 'Ocorreu um erro ao cadastrar o jogo.');
    }
  };


    // Manipulação de arquivos
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      
      if (file) {
      
      // Gerar URL para pré-visualização
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

        const formDataObj = new FormData();
        formDataObj.append("file", file);
        setIsUploading(true);
  
        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formDataObj,
          });
          
          const data = await response.json();

          if (!response.ok || !data.success) {
            throw new Error(data.message || "Erro ao fazer upload");
          }
  
          // const data = await response.json();
          console.log("URL do arquivo carregado:", data.url);
  
          // Atualiza o caminho da imagem no formData
          setFormData((prevData) => ({
            ...prevData,
            jogos_url_img: data.url,
          }));
          
          console.log("Imagem carregada com sucesso!");
  
        } catch (error: any) {
          console.error("Erro ao carregar imagem:", error);
          alert(error.message || "Ocorreu um erro ao carregar a imagem. Tente novamente.");
        }finally {
          setIsUploading(false);
        }
      }
    };




    const [file, setFile] = useState<File | undefined>();
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        // const responseData = await res.json();
        setUploadedFileName(file.name); // Armazena o nome do arquivo
        console.log(`A imagem ${file.name} foi gravada com sucesso!`);
      } else {
        const error = await res.json();
        console.error("Erro ao gravar o arquivo:", error);
        console.log(`Erro ao gravar a imagem: ${error.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      console.log("Ocorreu um erro durante o upload. Tente novamente.");
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
                  valorInput={formData.categoria_jogo_id}
                  metodoSubmit={(e) => setFormData({ ...formData, categoria_jogo_id: e.target.value })}
                />

                <InputForm
                  tipoInput="textarea"
                  label="Descrição"
                  placeholder="Digite aqui a descrição do Jogo"
                  valorInput={formData.jogos_descricao}
                  metodoSubmit={(e) => setFormData({ ...formData, jogos_descricao: e.target.value })}
                />

              {previewImage && (
                <div className="mb-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <Image
                        src={previewImage}
                        alt="Pré-visualização"
                        // layout="fill"
                        objectFit="cover"
                        className="max-w-full h-auto rounded-md"
                        width={150}
                        height={150}
                      />
                    </div>
                  </div>
                </div>
              )}


              {/* <InputForm
                  tipoInput="fileInput"
                  label="Selecione uma Imagem para o Jogo"
                  placeholder="Clique aqui para escolher uma imagem"
                  onChange={handleFileChange} 
                  metodoSubmit={(e) => setFormData({ ...formData, jogos_url_img: e.target.value })}
              />   */}



              {/* <InputFile 
                label="Selecione um arquivo:" 
                onChange={handleFileChange} 
                metodoSubmit={(e) => setFormData({ ...formData, jogos_url_img: e.target.value })}
              /> */}

              <UploadImage
                label="Selecione uma Imagem"
                metodoSubmit={(e) => setFormData({ ...formData, jogos_url_img: e.target.value })}
              />

            </div>

            
            <div className="flex justify-center">
              <Botao
                texto='Cadastrar'
                tipo='submit'
                cor = 'azul'
                // onClick={handleUpload}
              />
            </div>  
          </form>
        </div>
      </div>
    </>
  );
}
