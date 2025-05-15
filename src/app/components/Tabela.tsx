// 'use client'

// import React from 'react';
// import { useState,useEffect } from 'react';
// import ReactPaginate from 'react-paginate'; 
// import { GrCaretPrevious,GrCaretNext  } from "react-icons/gr";
// import { FaPencilAlt,FaTrashAlt,FaTrash  } from "react-icons/fa";
// import { ModalFormulario } from './ModalFormulario';
// import Alert from './Alert';
// import AlterarJogosCategoria from '../configuracao/jogos_categoria/alterar/page';
// import AlterarUsuarios from '../configuracao/usuarios/alterar/page';
// import AlterarJogos from '../configuracao/jogos/alterar/page';
// import AlterarEmblemas from '../configuracao/emblemas/alterar/page';
// import Image from 'next/image';
// import BotaoSenha from './BotaoSenha';
// import BotaoLinkJogo from './BotaoLinkJogo';
// import BotaoStatusSugestao from './BotaoStatusSugestao';
// import AlterarEmblemasCategoria from '../configuracao/emblemas_categoria/alterar/page';

// export default function Tabela({ data,atributosCabTab,atributosDados,modulo}) {
//     //  Variáveis Globais
//     let nomeModulo= '';
//     const [isLoading, setIsLoading] = useState(false);
//     const [modalText, setModalText] = useState("Tem certeza que deseja excluir o Registro abaixo?");
//     const [modalAberto,setModalAberto] = useState(false);
//     const [modalType, setModalType] = useState<'editar' | 'excluir' | null>(null);
//     const [selectedItem,setSelectedItem] = useState(null);
//     // const [senha, setSenha] = useState('');

//     const [modalColor, setModalColor] = useState("text-gray-700"); 
    
//     // ============== Métodos de Modais Inicio===================//

//     const [alertVisible, setAlertVisible] = useState(false);
//     const [alertMessage, setAlertMessage] = useState('');
//     const [alertType, setAlertType] = useState<"sucesso" | "erro">("sucesso"); 
 
//   // ********  ******** Modal Abrir Editar ********  ********   
//     function handleEditModal(item){
//       setSelectedItem(item);    
//       setModalType('editar');
//       setModalAberto(!modalAberto)
//     }

//     const abrirModal = (item) => {
//       setSelectedItem(item); // Define o item selecionado
//       setShowModal(true);    // Mostra o modal
//     };
//   // ********  ******** ============== ******** ********

//   // ********  ******** Modal Abrir Excluir ********  ******** 
//   function handleDeletarModal(item){
//     setSelectedItem(item);
//     setModalType('excluir');
//     setModalAberto(!modalAberto)
//   }
//   // ********  ******** ============== ******** ********

//   // ********  ******** Modal Fechar ********  ******** 
//   function fecharModal() {
//     setModalAberto(false);
//     setModalType(null);
//     setSelectedItem(null);
//   }

//   // ********  ******** Modal Senha ********  ******** 

//   function handleEditSenha(item){
//     setSelectedItem(item);    
//     setModalType('editarSenha');
//     setModalAberto(!modalAberto)
//   }



//   useEffect(() => {
//     if (data.length === 0) {
//       // Configura os valores do alerta para quando não houver registros
//       setAlertMessage("Não há Registros Lançados no Sistema!");
//       setAlertType("informacao");
//       setAlertVisible(true);
//     } else {
//       // Oculta o alerta se houver registros
//       setAlertVisible(false);
//     }
//   }, [data]);

// // console.log(data)
//   // ********  ******** Variáves da Listagem da Exclusão ********  ******** 

//   let id = null;
//   let nome = null;
//   let caminho_api = '';
//   let caminhoApiDel = '';
 
//   switch (modulo) {
    
//     case "jogoCategoria":
//       id = selectedItem?.categoria_jogo_id || null;
//       nome = selectedItem?.categoria_jogo_area_atuacao || null;
//       caminho_api = `/api/categoria_jogos?categoria_jogo_id=${id}`
//       caminhoApiDel = `/api/categoria_jogos?categoria_jogo_id=${id}`
//       nomeModulo = "Categoria de Jogos"
//       break;
  
//     case "usuario":
//       id = selectedItem?.usuario_id || null;
//       nome = selectedItem?.usuario_nome || null;
//       caminho_api = `/api/usuarios?usuario_id=${id}`
//       caminhoApiDel = `/api/usuarios?usuario_id=${id}`
//       nomeModulo = "Usuário"
//       break;
  
 
//     case "jogo":
//       id = selectedItem?.jogos_id || null;
//       nome = selectedItem?.jogos_nome || null;
//       // Este caminho Funciona para GET e POST
//       caminho_api = `/api/jogos?jogos_id=${id}` 
//       caminhoApiDel = `/api/jogos/${id}`
//       nomeModulo = "Jogos"
//       break;

//     case "emblema":
//       id = selectedItem?.emblema_id || null;
//       nome = selectedItem?.emblema_nome || null;
//       caminho_api = `/api/emblemas?emblema_id=${id}`
//       caminhoApiDel = `/api/emblemas/${id}`
//       nomeModulo = "Emblemas"
//       break;

//     case "sugestaoMelhoria":
//       id = selectedItem?.sugestao_melhoria_id || null;
//       nome = selectedItem?.sugestao_melhoria_nome || null;
//       caminho_api = `/api/sugestoes?sugestao_melhoria_id=${id}`
//       caminhoApiDel = `/api/sugestoes/${id}`
//       nomeModulo = "Sugestao e Melhoria"
//       break;

//     case "emblemaCategoria":
//       id = selectedItem?.tipo_emblema_id || null;
//       nome = selectedItem?.tipo_emblema_criterio || null;
//       caminho_api = `/api/categoria_emblemas?tipo_emblema_id=${id}`
//       caminhoApiDel = `/api/categoria_emblemas/${id}`
//       nomeModulo = "Categoria de Emblemas"
//       break;
//   }


//   // ==============  xxxxxxxxxxxxxxxx Métodos de Modais Final xxxxxxxxxxxxxxxx ===================//

    
//     // ================= PAGINAÇÃO DAS TABELAS ================= //
//     const itemsPerPage = 5;
//     const [currentPage, setCurrentPage] = useState(0);
//     const [searchTerm, setSearchTerm] = useState('');

//   // Aqui ESTA O CERTO --------
//     const filteredData = Array.isArray(data) ? data.filter(item => {
//       switch (modulo) {
//         case "jogoCategoria":
//           // Filtra itens com base em `categoria_jogo_area_atuacao`
//           return item.categoria_jogo_area_atuacao.toLowerCase().includes(searchTerm.toLowerCase());
    
//         case "usuario":
//           // Filtra itens com base no nome, email, senha ou nível do usuário
//           return (
//             item.usuario_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.usuario_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.usuario_nivel.toLowerCase().includes(searchTerm.toLowerCase())
//           );
    
//         case "jogo":
//           // Filtra itens com base no nome do jogo
//           return (
//             item.jogos_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.jogos_descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.jogos_link.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.jogos_autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.jogos_url_img.toLowerCase().includes(searchTerm.toLowerCase())
//           );
    
//         case "emblema":
//           // Filtra itens com base no nome do jogo
//           return (
//             item.emblema_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.emblema_criterio.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.emblemas_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.emblemas_pontos.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.emblema_imagem.toLowerCase().includes(searchTerm.toLowerCase())
//           );

//         case "sugestaoMelhoria":
//           // Filtra itens com base no nome do jogo
//           return (
//             item.sugestao_melhoria_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.sugestao_melhoria_descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.sugestao_melhoria_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.sugestao_melhoria_titulo.toLowerCase().includes(searchTerm.toLowerCase())
//           );

//         case "emblemaCategoria":
//           // Filtra itens com base no nome do jogo
//           return (
//             item.tipo_emblema_criterio.toLowerCase().includes(searchTerm.toLowerCase())
//           );

//         default:
//           return false;
//       }
//     }): [];
   
//     // Calcular os dados para a página atual
//     const offset = currentPage * itemsPerPage;
//     const paginatedData = filteredData.slice(offset, offset + itemsPerPage);
//     const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  
//     // Muda a página atual
//     const handlePageClick = ({ selected }) => {
//       setCurrentPage(selected);
//     };
  

//     const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);

//     const handleStatusChange = (sugestaoId: string, novoStatus: Status) => {
//       setSugestoes(prev => prev.map(item => 
//         item.sugestao_melhoria_id === sugestaoId 
//           ? {...item, sugestao_melhoria_status: novoStatus} 
//           : item
//       ));
//     };

//     const handleUpdateTable = async () => {
//       // Sua lógica para atualizar os dados da tabela
//       const response = await fetch('/api/sugestoes');
//       const data = await response.json();
//       setSugestoes(data);
//     };

    
//     // =================  xxxxxxxxxxxxxxxx PAGINAÇÃO DAS TABELAS  xxxxxxxxxxxxxxxx ================= //

//     return (
//       <div className="flex-auto ml-4 mr-4 mt-4 mb-4"> 
//       <div className="overflow-x-auto mx-auto mt-8 mb-8 p-8 border border-gray-300 shadow-lg rounded-lg justify-between items-center">
  
//         {/* {data.length === 0 ? ( */}
//         {data.length === 0 ? (
//           <div className="grid grid-cols-1">
//               <div className="col-span-1">
//                 {/* Renderizar o alerta apenas se estiver visível */}
//                 {alertVisible && (
//                   <Alert
//                     message={alertMessage}
//                     tipoAlert={alertType} // Define o tipo de alerta dinamicamente
//                     texto={alertMessage} // Mostra a mensagem apropriada
//                     cor= "amarelo"  // Escolhe a cor com base no tipo
//                   />
//                 )}
//               </div>
//             </div>
//             ) : (
//           <div  className="flex flex-col items-end p-4">
//             <input
//                 type="text"
//                 placeholder="Pesquisar..."
//                 className="mb-4 px-4 py-2 border border-gray-600 rounded "
//                 onChange={e => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(0); // Reseta para a primeira página em cada nova pesquisa
//                 }}
//               /> 
                     
//             <table className="table-auto min-w-full bg-white text-black rounded-lg border-collapse border border-black">
//               <thead>
//                 <tr className="bg-neutral-900 text-gray-300 text-center uppercase font-bold">
//                   {atributosCabTab.filter(attr => attr.toLowerCase() !== "senha").map((atributo, index) => (
//                     <th
//                       key={index}
//                       className={`py-3 px-6 border border-white text-center 
//                         ${modulo === "usuario" && atributo.toLowerCase() === "id" ? "hidden lg:table-cell" : ""} 
//                         ${modulo === "usuario" && atributo.toLowerCase() === "email" ? "hidden lg:table-cell" : ""}

//                         ${modulo === "jogo" && atributo.toLowerCase() === "id" ? "hidden lg:table-cell" : ""} 

//                         ${modulo === "emblema" && atributo.toLowerCase() === "id" ? "hidden lg:table-cell" : ""} 
//                         ${modulo === "emblema" && atributo.toLowerCase() === "status" ? "hidden lg:table-cell" : ""}
//                       `}
//                     >
//                       {atributo}
//                     </th>
//                   ))}
//                   <th className="py-3 px-6 border border-white text-center">Ação</th>
//                 </tr>
//               </thead>

//               <tbody className="border border-black">
//                 {paginatedData.map((item, index) => (
//                   <tr key={index} className="border-b border-black hover:bg-gray-200 hover:border hover:border-fuchsia-300 transition-colors">
//                     {atributosDados.filter(attr => attr !== "usuario_senha").map((atributoArray, idx) => (
//                       <td key={idx} className={`py-3 px-6 border border-black text-center 
//                         ${modulo === "usuario" && atributoArray === "usuario_id" ? "hidden lg:table-cell" : ""} 
//                         ${modulo === "usuario" && atributoArray === "usuario_email" ? "hidden lg:table-cell" : ""}

//                          ${modulo === "jogo" && atributoArray === "jogos_id" ? "hidden lg:table-cell" : ""} 

//                          ${modulo === "emblema" && atributoArray === "emblema_id" ? "hidden lg:table-cell" : ""} 
//                          ${modulo === "emblema" && atributoArray === "emblemas_status" ? "hidden lg:table-cell" : ""} 
//                         `}
//                       >
//                         {atributoArray === "jogos_url_img" || atributoArray === "emblema_imagem" ? (
//                           <Image
//                             src={item[atributoArray]} 
//                             alt="Imagem"
//                             className="w-16 h-16 object-cover rounded"
//                             width={50}
//                             height={50}
//                           />
//                         ) : atributoArray === "jogos_descricao" ? (
//                           item[atributoArray].length > 15 ? item[atributoArray].substring(0, 15) + "..." : item[atributoArray]
//                         ) : atributoArray === "jogos_link" ? (
//                           <a
//                             href={item[atributoArray]}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-sm text-blue-500 underline hover:text-blue-700"
//                           >
//                             {item[atributoArray]}
//                           </a>
//                         ) : (
//                           item[atributoArray]
//                         )}
//                       </td>
//                     ))}

//                     <td className="py-3 px-6 flex justify-center space-x-2">
                      
//                       {modulo === "usuario" && (
//                         <BotaoSenha mostrarModal={() => handleEditSenha(item)} />
//                       )}

                    
//                       {modulo === "jogo" && (
//                         <BotaoLinkJogo linkJogo={item.jogos_link} />
//                       )}



//                       {/* {modulo === "sugestaoMelhoria" && (
//                         <BotaoStatusSugestao
//                           sugestaoId={item.sugestao_melhoria_id}
//                           statusAtual={item.sugestao_melhoria_status}
//                           descricao={item.sugestao_melhoria_descricao}
//                         />
                       
//                       )} */}


//                     {modulo === "sugestaoMelhoria" && (
//                       <BotaoStatusSugestao
//                         key={item.sugestao_melhoria_id}
//                         sugestaoId={item.sugestao_melhoria_id}
//                         statusAtual={item.sugestao_melhoria_status}
//                         descricao={item.sugestao_melhoria_descricao}
//                         onStatusChange={(novoStatus) => 
//                           handleStatusChange(item.sugestao_melhoria_id, novoStatus)
//                         }
//                         onUpdateTable={handleUpdateTable}
//                       />
//                     )}

//                     {modulo !== "sugestaoMelhoria" && (
//                       <button 
//                         onClick={() => handleEditModal(item)}
//                         className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors border border-white shadow-md shadow-yellow-500/50">
//                         <FaPencilAlt className="w-4 h-4" />
//                       </button>
//                     )}
                     
//                       <button 
//                         className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition-colors border border-white shadow-md shadow-red-500/50"
//                         onClick={() => handleDeletarModal(item)}
//                       >  
//                         <FaTrashAlt className="w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>


//               {/* Modal Editar */}
//               <ModalFormulario 
//                 modalAberto={modalAberto} 
//                 fecharModal={handleEditModal} 
//                 titulo={modalType === 'editar' || modalType === 'editarSenha' ? 'Modo de Alteração' : 'Modo de Exclusão'} 
//                 subtitulo={modalType === 'editar' || modalType === 'editarSenha' ? `Edição de dados de ${nomeModulo}` : `Exclusão de Item`}
//                 modalType="editar"
//               >
//                 {modalType === 'editar' ? (
//                   (() => {
//                     if (modulo === "jogoCategoria") {
//                       return (
//                         <AlterarJogosCategoria
//                           dados={selectedItem}
//                         />
//                       );
//                     } else if (modulo === "usuario") {
//                       return (
//                         <AlterarUsuarios
//                           dados={selectedItem}
//                           tipoModal = "ModalCompleto"
//                         />
//                       );
//                     } else if (modulo === "jogo") {
//                       return (
//                         <AlterarJogos
//                           dados={selectedItem}
//                         />
//                       );
//                     }else if (modulo === "emblema") {
//                       return (
//                         <AlterarEmblemas
//                           dados={selectedItem}
//                         />
//                       );
//                     }else if (modulo === "emblemaCategoria") {
//                       return (
//                         <AlterarEmblemasCategoria
//                           dados={selectedItem}
//                         />
//                       );
//                     } else {
//                       return <p className="text-center text-red-500">Módulo inválido!</p>;
//                     }
//                   })()
//                 ) : modalType === 'editarSenha' ? 
//                 (
//                   (() => {
//                     if (modulo === "usuario") {
//                       return (
//                         <AlterarUsuarios
//                           dados={selectedItem}
//                           tipoModal="ModalSenha"
//                         />
//                       );
//                     }
//                   })()
                
//                 ):                  
//                 (
//                   <>
//                     {/* Conteúdo do Modal para Exclusão */}
//                     <div className="flex justify-center">
//                       <FaTrash className="flex w-10 h-10 mb-3 mt-3 transition-transform duration-300 hover:scale-125"/>
//                     </div>

//                     <div className="flex flex-col text-center space-y-2">
//                       <p className="text-black font-semibold">Este processo é irreversível!</p>
//                       {/* Exibe a mensagem com a cor dinâmica */}
//                       {modalText && (
//                         <p className={`mt-3 font-semibold ${modalColor}`}>{modalText}</p>
//                       )}
//                       {/* <p className="text-black font-semibold">{modalText}</p> */}
//                       <p className="p-3 text-2xl font-extrabold">{id || "ID não disponível"} - {nome || "Nome não disponível"}</p>
//                     </div>

//                     {/* Botões de Confirmar Exclusão e Cancelar */}
//                     <div className="flex flex-col mt-6 py-4 rounded-b-lg space-x-4">
//                       <button
//                         type="button"
//                         onClick={async () => {
//                           if (!id) {
//                             console.error("Erro: Selected Item está vazio!");
//                             return;
//                           }
                      
//                           setModalText("Excluindo registro, Por favor aguarde...");

//                           setModalColor("text-red-700"); //Cor quando é processado

//                           setIsLoading(true);
                          
//                           try {
//                             const endpoint = caminhoApiDel;
                            
//                             const response = await fetch(endpoint, {
//                               method: "DELETE",
//                             });
//                             console.log('Resultado do caminho: '+endpoint);
                           
//                             if (!response.ok) {
//                               throw new Error(`Erro ao excluir o registro: ${response.status}`);
//                             }
                      
//                             const data = await response.json();
                           
//                             console.log("Resposta da API:", data);
                      
//                             setModalText("Registro Excluído com Sucesso!");
//                             setModalColor("text-green-700");
                            
//                             // Aguarde 2 segundos antes de fechar o modal
//                             setTimeout(() => {
//                               fecharModal();
//                               location.reload();
//                             }, 3000);

//                           } catch (error) {
//                             console.error("Erro ao excluir o item:", error.message);
//                             setModalText("Erro ao excluir o registro. Tente novamente.");
//                           } finally {
//                             setIsLoading(false);
//                           }
//                         }}
//                         className={`px-6 py-2 bg-rose-400 text-white font-semibold rounded-lg shadow-md ${
//                           isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
//                         } transition`}
//                         disabled={isLoading}
//                       >
//                         {isLoading ? "Excluindo..." : "Excluir"}

//                       </button>
//                     </div>
//                   </>
//                 )}
//               </ModalFormulario>

//             {/* Componente de Paginação */}
//             <ReactPaginate
//               previousLabel={<GrCaretPrevious size={16} />} // aqui era 20
//               nextLabel={<GrCaretNext size={16}/>}
//               breakLabel={"..."}
//               pageCount={pageCount}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={3}
//               onPageChange={handlePageClick}
//               containerClassName={"flex mt-4 space-x-2"}
//               pageClassName={"px-4 py-2 bg-indigo-600 rounded text-white text-sm cursor-pointer hover:bg-indigo-700"}
//               activeClassName={"bg-indigo-800"}
//               previousClassName={"px-4 py-2 bg-indigo-600 rounded text-white cursor-pointer hover:bg-indigo-700"}
//               nextClassName={"px-4 py-2 bg-indigo-600 rounded text-white cursor-pointer hover:bg-indigo-700"}
//               breakClassName={"px-4 py-2 text-gray-400"}
//               disabledClassName={"bg-gray-600 cursor-not-allowed"}
//             />
//           </div>
//          )}
//       </div>
//     </div>
//   );
// }



'use client'
import React from 'react';
import { useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate'; 
import { GrCaretPrevious,GrCaretNext  } from "react-icons/gr";
import { FaPencilAlt,FaTrashAlt,FaTrash  } from "react-icons/fa";
import { ModalFormulario } from './ModalFormulario';
import Alert from './Alert';
import AlterarJogosCategoria from '../configuracao/jogos_categoria/alterar/page';
import AlterarUsuarios from '../configuracao/usuarios/alterar/page';
import AlterarJogos from '../configuracao/jogos/alterar/page';
import AlterarEmblemas from '../configuracao/emblemas/alterar/page';
import Image from 'next/image';
import BotaoSenha from './BotaoSenha';
import BotaoLinkJogo from './BotaoLinkJogo';
import BotaoStatusSugestao from './BotaoStatusSugestao';
import AlterarEmblemasCategoria from '../configuracao/emblemas_categoria/alterar/page';

export default function Tabela({ data,atributosCabTab,atributosDados,modulo}) {
    //  Variáveis Globais
    let nomeModulo= '';
    const [isLoading, setIsLoading] = useState(false);
    const [modalText, setModalText] = useState("Tem certeza que deseja excluir o Registro abaixo?");
    const [modalAberto,setModalAberto] = useState(false);
    const [modalType, setModalType] = useState<'editar' | 'excluir' | null>(null);
    const [selectedItem,setSelectedItem] = useState(null);
    // const [senha, setSenha] = useState('');

    const [modalColor, setModalColor] = useState("text-gray-700"); 
    
    // ============== Métodos de Modais Inicio===================//

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<"sucesso" | "erro">("sucesso"); 
 
  // ********  ******** Modal Abrir Editar ********  ********   
    function handleEditModal(item){
      setSelectedItem(item);    
      setModalType('editar');
      setModalAberto(!modalAberto)
    }

    const abrirModal = (item) => {
      setSelectedItem(item); // Define o item selecionado
      setShowModal(true);    // Mostra o modal
    };
  // ********  ******** ============== ******** ********

  // ********  ******** Modal Abrir Excluir ********  ******** 
  function handleDeletarModal(item){
    setSelectedItem(item);
    setModalType('excluir');
    setModalAberto(!modalAberto)
  }
  // ********  ******** ============== ******** ********

  // ********  ******** Modal Fechar ********  ******** 
  function fecharModal() {
    setModalAberto(false);
    setModalType(null);
    setSelectedItem(null);
  }

  // ********  ******** Modal Senha ********  ******** 

  function handleEditSenha(item){
    setSelectedItem(item);    
    setModalType('editarSenha');
    setModalAberto(!modalAberto)
  }

  useEffect(() => {
    if (data.length === 0) {
      setAlertMessage("Não há Registros Lançados no Sistema!");
      setAlertType("informacao");
      setAlertVisible(true);
    } else {
      setAlertVisible(false);
    }
  }, [data]);

  let id = null;
  let nome = null;
  let caminho_api = '';
  let caminhoApiDel = '';
 
  switch (modulo) {
    case "jogoCategoria":
      id = selectedItem?.categoria_jogo_id || null;
      nome = selectedItem?.categoria_jogo_area_atuacao || null;
      caminho_api = `/api/categoria_jogos?categoria_jogo_id=${id}`
      caminhoApiDel = `/api/categoria_jogos?categoria_jogo_id=${id}`
      nomeModulo = "Categoria de Jogos"
      break;
  
    case "usuario":
      id = selectedItem?.usuario_id || null;
      nome = selectedItem?.usuario_nome || null;
      caminho_api = `/api/usuarios?usuario_id=${id}`
      caminhoApiDel = `/api/usuarios?usuario_id=${id}`
      nomeModulo = "Usuário"
      break;
  
    case "jogo":
      id = selectedItem?.jogos_id || null;
      nome = selectedItem?.jogos_nome || null;
      caminho_api = `/api/jogos?jogos_id=${id}` 
      caminhoApiDel = `/api/jogos/${id}`
      nomeModulo = "Jogos"
      break;

    case "emblema":
      id = selectedItem?.emblema_id || null;
      nome = selectedItem?.emblema_nome || null;
      caminho_api = `/api/emblemas?emblema_id=${id}`
      caminhoApiDel = `/api/emblemas/${id}`
      nomeModulo = "Emblemas"
      break;

    case "sugestaoMelhoria":
      id = selectedItem?.sugestao_melhoria_id || null;
      nome = selectedItem?.sugestao_melhoria_nome || null;
      caminho_api = `/api/sugestoes?sugestao_melhoria_id=${id}`
      caminhoApiDel = `/api/sugestoes/${id}`
      nomeModulo = "Sugestao e Melhoria"
      break;

    case "emblemaCategoria":
      id = selectedItem?.tipo_emblema_id || null;
      nome = selectedItem?.tipo_emblema_criterio || null;
      caminho_api = `/api/categoria_emblemas?tipo_emblema_id=${id}`
      caminhoApiDel = `/api/categoria_emblemas/${id}`
      nomeModulo = "Categoria de Emblemas"
      break;
  }

  // ================= PAGINAÇÃO DAS TABELAS ================= //
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = Array.isArray(data) ? data.filter(item => {
    switch (modulo) {
      case "jogoCategoria":
        return item.categoria_jogo_area_atuacao.toLowerCase().includes(searchTerm.toLowerCase());
    
      case "usuario":
        return (
          item.usuario_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.usuario_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.usuario_nivel.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
      case "jogo":
        return (
          item.jogos_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.jogos_descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.jogos_link.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.jogos_autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.jogos_url_img.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
      case "emblema":
        return (
          item.emblema_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.emblema_criterio.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.emblemas_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.emblemas_pontos.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.emblema_imagem.toLowerCase().includes(searchTerm.toLowerCase())
        );

      case "sugestaoMelhoria":
        return (
          item.sugestao_melhoria_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sugestao_melhoria_descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sugestao_melhoria_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sugestao_melhoria_titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );

      case "emblemaCategoria":
        return (
          item.tipo_emblema_criterio.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.emblema_id.toLowerCase().includes(searchTerm.toLowerCase())
        );

      default:
        return false;
    }
  }): [];
  
  // Calcular os dados para a página atual
  const offset = currentPage * itemsPerPage;
  const paginatedData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  // Muda a página atual
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);

  const handleStatusChange = (sugestaoId: string, novoStatus: Status) => {
    setSugestoes(prev => prev.map(item => 
      item.sugestao_melhoria_id === sugestaoId 
        ? {...item, sugestao_melhoria_status: novoStatus} 
        : item
    ));
  };

  const handleUpdateTable = async () => {
    const response = await fetch('/api/sugestoes');
    const data = await response.json();
    setSugestoes(data);
  };

  return (
    <div className="flex-auto ml-4 mr-4 mt-4 mb-4"> 
      <div className="overflow-x-auto mx-auto mt-8 mb-8 p-8 border border-gray-300 shadow-lg rounded-lg justify-between items-center">
        {data.length === 0 ? (
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              {alertVisible && (
                <Alert
                  message={alertMessage}
                  tipoAlert={alertType}
                  texto={alertMessage}
                  cor="amarelo"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-end p-4">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="mb-4 px-4 py-2 border border-gray-600 rounded"
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(0);
              }}
            /> 
                     
            <table className="table-auto min-w-full bg-white text-black rounded-lg border-collapse border border-black">
              <thead>
                <tr className="bg-neutral-900 text-gray-300 text-center uppercase font-bold">
                  {atributosCabTab.filter(attr => attr.toLowerCase() !== "senha").map((atributo, index) => (
                    <th
                      key={index}
                      className={`py-3 px-6 border border-white text-center 
                        ${modulo === "usuario" && atributo.toLowerCase() === "id" ? "hidden lg:table-cell" : ""} 
                        ${modulo === "usuario" && atributo.toLowerCase() === "email" ? "hidden lg:table-cell" : ""}
                        ${modulo === "jogo" && atributo.toLowerCase() === "id" ? "hidden lg:table-cell" : ""} 
                        ${modulo === "emblema" && atributo.toLowerCase() === "id" ? "hidden lg:table-cell" : ""} 
                        ${modulo === "emblema" && atributo.toLowerCase() === "status" ? "hidden lg:table-cell" : ""}
                      `}
                    >
                      {atributo}
                    </th>
                  ))}
                  <th className="py-3 px-6 border border-white text-center">Ação</th>
                </tr>
              </thead>

              <tbody className="border border-black">
                {paginatedData.map((item, index) => (
                  <tr key={index} className="border-b border-black hover:bg-gray-200 hover:border hover:border-fuchsia-300 transition-colors">
                    {atributosDados.filter(attr => attr !== "usuario_senha").map((atributoArray, idx) => (
                      <td key={idx} className={`py-3 px-6 border border-black text-center 
                        ${modulo === "usuario" && atributoArray === "usuario_id" ? "hidden lg:table-cell" : ""} 
                        ${modulo === "usuario" && atributoArray === "usuario_email" ? "hidden lg:table-cell" : ""}
                        ${modulo === "jogo" && atributoArray === "jogos_id" ? "hidden lg:table-cell" : ""} 
                        ${modulo === "emblema" && atributoArray === "emblema_id" ? "hidden lg:table-cell" : ""} 
                        ${modulo === "emblema" && atributoArray === "emblemas_status" ? "hidden lg:table-cell" : ""} 
                      `}
                      >
                        {modulo === "emblemaCategoria" && atributoArray === "tipo_emblema_criterio" ? (
                          <div className="group transition-all duration-300">
                            <span className="text-sm group-hover:text-md group-hover:font-semibold">
                              {item[atributoArray]}
                            </span>
                          </div>
                        ) : atributoArray === "jogos_url_img" || atributoArray === "emblema_imagem" ? (
                          <Image
                            src={item[atributoArray]} 
                            alt="Imagem"
                            className="w-16 h-16 object-cover rounded"
                            width={50}
                            height={50}
                          />
                        ) : atributoArray === "jogos_descricao" ? (
                          item[atributoArray].length > 15 ? item[atributoArray].substring(0, 15) + "..." : item[atributoArray]
                        ) : atributoArray === "jogos_link" ? (
                          <a
                            href={item[atributoArray]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 underline hover:text-blue-700"
                          >
                            {item[atributoArray]}
                          </a>
                        ) : (
                          item[atributoArray]
                        )}
                      </td>
                    ))}

                    <td className="py-3 px-6 flex justify-center space-x-2">
                      {modulo === "usuario" && (
                        <BotaoSenha mostrarModal={() => handleEditSenha(item)} />
                      )}
                    
                      {modulo === "jogo" && (
                        <BotaoLinkJogo linkJogo={item.jogos_link} />
                      )}

                      {modulo === "sugestaoMelhoria" && (
                        <BotaoStatusSugestao
                          key={item.sugestao_melhoria_id}
                          sugestaoId={item.sugestao_melhoria_id}
                          statusAtual={item.sugestao_melhoria_status}
                          descricao={item.sugestao_melhoria_descricao}
                          onStatusChange={(novoStatus) => 
                            handleStatusChange(item.sugestao_melhoria_id, novoStatus)
                          }
                          onUpdateTable={handleUpdateTable}
                        />
                      )}

                      {modulo !== "sugestaoMelhoria" && (
                        <button 
                          onClick={() => handleEditModal(item)}
                          className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors border border-white shadow-md shadow-yellow-500/50">
                          <FaPencilAlt className="w-4 h-4" />
                        </button>
                      )}
                     
                      <button 
                        className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition-colors border border-white shadow-md shadow-red-500/50"
                        onClick={() => handleDeletarModal(item)}
                      >  
                        <FaTrashAlt className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal Editar */}
            <ModalFormulario 
              modalAberto={modalAberto} 
              fecharModal={handleEditModal} 
              titulo={modalType === 'editar' || modalType === 'editarSenha' ? 'Modo de Alteração' : 'Modo de Exclusão'} 
              subtitulo={modalType === 'editar' || modalType === 'editarSenha' ? `Edição de dados de ${nomeModulo}` : `Exclusão de Item`}
              modalType="editar"
            >
              {modalType === 'editar' ? (
                (() => {
                  if (modulo === "jogoCategoria") {
                    return (
                      <AlterarJogosCategoria
                        dados={selectedItem}
                      />
                    );
                  } else if (modulo === "usuario") {
                    return (
                      <AlterarUsuarios
                        dados={selectedItem}
                        tipoModal="ModalCompleto"
                      />
                    );
                  } else if (modulo === "jogo") {
                    return (
                      <AlterarJogos
                        dados={selectedItem}
                      />
                    );
                  } else if (modulo === "emblema") {
                    return (
                      <AlterarEmblemas
                        dados={selectedItem}
                      />
                    );
                  } else if (modulo === "emblemaCategoria") {
                    return (
                      <AlterarEmblemasCategoria
                        dados={selectedItem}
                      />
                    );
                  } else {
                    return <p className="text-center text-red-500">Módulo inválido!</p>;
                  }
                })()
              ) : modalType === 'editarSenha' ? 
              (
                (() => {
                  if (modulo === "usuario") {
                    return (
                      <AlterarUsuarios
                        dados={selectedItem}
                        tipoModal="ModalSenha"
                      />
                    );
                  }
                })()
              ) : (
                <>
                  <div className="flex justify-center">
                    <FaTrash className="flex w-10 h-10 mb-3 mt-3 transition-transform duration-300 hover:scale-125"/>
                  </div>

                  <div className="flex flex-col text-center space-y-2">
                    <p className="text-black font-semibold">Este processo é irreversível!</p>
                    {modalText && (
                      <p className={`mt-3 font-semibold ${modalColor}`}>{modalText}</p>
                    )}
                    <p className="p-3 text-2xl font-extrabold">{id || "ID não disponível"} - {nome || "Nome não disponível"}</p>
                  </div>

                  <div className="flex flex-col mt-6 py-4 rounded-b-lg space-x-4">
                    <button
                      type="button"
                      onClick={async () => {
                        if (!id) {
                          console.error("Erro: Selected Item está vazio!");
                          return;
                        }
                    
                        setModalText("Excluindo registro, Por favor aguarde...");
                        setModalColor("text-red-700");
                        setIsLoading(true);
                        
                        try {
                          const endpoint = caminhoApiDel;
                          
                          const response = await fetch(endpoint, {
                            method: "DELETE",
                            // headers: {
                            //   'Content-Type': 'application/json'
                            // }
                          });
                         
                          if (!response.ok) {
                            throw new Error(`Erro ao excluir o registro: ${response.status}`);
                          }
                    
                          const data = await response.json();
                    
                          setModalText("Registro Excluído com Sucesso!");
                          setModalColor("text-green-700");
                          
                          setTimeout(() => {
                            fecharModal();
                            location.reload();
                          }, 3000);

                        } catch (error) {
                          console.error("Erro ao excluir o item:", error.message);
                          setModalText("Erro ao excluir o registro. Tente novamente.");
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                      className={`px-6 py-2 bg-rose-400 text-white font-semibold rounded-lg shadow-md ${
                        isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
                      } transition`}
                      disabled={isLoading}
                    >
                      {isLoading ? "Excluindo..." : "Excluir"}
                    </button>
                  </div>
                </>
              )}
            </ModalFormulario>

            {/* Componente de Paginação */}
            <ReactPaginate
              previousLabel={<GrCaretPrevious size={16} />}
              nextLabel={<GrCaretNext size={16}/>}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"flex mt-4 space-x-2"}
              pageClassName={"px-4 py-2 bg-indigo-600 rounded text-white text-sm cursor-pointer hover:bg-indigo-700"}
              activeClassName={"bg-indigo-800"}
              previousClassName={"px-4 py-2 bg-indigo-600 rounded text-white cursor-pointer hover:bg-indigo-700"}
              nextClassName={"px-4 py-2 bg-indigo-600 rounded text-white cursor-pointer hover:bg-indigo-700"}
              breakClassName={"px-4 py-2 text-gray-400"}
              disabledClassName={"bg-gray-600 cursor-not-allowed"}
            />
          </div>
        )}
      </div>
    </div>
  );
}