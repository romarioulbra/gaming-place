// 'use client'
// import React from 'react';
// import { useState,useEffect } from 'react';
// import ReactPaginate from 'react-paginate'; 
// import { GrCaretPrevious,GrCaretNext  } from "react-icons/gr";
// import { FaPencilAlt,FaTrashAlt,FaTrash  } from "react-icons/fa";
// import { ModalFormulario } from './ModalFormulario';
// import Alert from './Alert';
// import AlterarJogosCategoria from '../configuracao/jogos_categoria/alterar/AlterarJogoCategoria';
// import AlterarUsuarios from '../configuracao/usuarios/alterar/AlterarUsuario';
// import AlterarJogos from '../configuracao/jogos/alterar/AlterarJogo';
// // import AlterarJogos from '../configuracao/jogos/alterar/page';
// // import AlterarEmblemas from '../configuracao/emblemas/alterar/page';
// // import AlterarEmblemasCategoria from '../configuracao/emblemas_categoria/alterar/page';
// import AlterarEmblemas from '../configuracao/emblemas/alterar/AlterarEmblemas';
// import AlterarEmblemasCategoria from '../configuracao/emblemas_categoria/alterar/AlterarEmblemasCategoria';
// import Image from 'next/image';
// import BotaoSenha from './BotaoSenha';
// import BotaoLinkJogo from './BotaoLinkJogo';
// import BotaoStatusSugestao from './BotaoStatusSugestao';


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

//     // const abrirModal = (item) => {
//     //   setSelectedItem(item); // Define o item selecionado
//     //   setShowModal(true);    // Mostra o modal
//     // };
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
//       setAlertMessage("Não há Registros Lançados no Sistema!");
//       setAlertType("informacao");
//       setAlertVisible(true);
//     } else {
//       setAlertVisible(false);
//     }
//   }, [data]);

//   let id = null;
//   let nome = null;
//   // let caminho_api = '';
//   let caminhoApiDel = '';
 
//   switch (modulo) {
//     case "jogoCategoria":
//       id = selectedItem?.categoria_jogo_id || null;
//       nome = selectedItem?.categoria_jogo_area_atuacao || null;
//       // caminho_api = `/api/categoria_jogos?categoria_jogo_id=${id}`
//       caminhoApiDel = `/api/categoria_jogos?categoria_jogo_id=${id}`
//       nomeModulo = "Categoria de Jogos"
//       break;
  
//     case "usuario":
//       id = selectedItem?.usuario_id || null;
//       nome = selectedItem?.usuario_nome || null;
//       // caminho_api = `/api/usuarios?usuario_id=${id}`
//       caminhoApiDel = `/api/usuarios?usuario_id=${id}`
//       nomeModulo = "Usuário"
//       break;
  
//     case "jogo":
//       id = selectedItem?.jogos_id || null;
//       nome = selectedItem?.jogos_nome || null;
//       // caminho_api = `/api/jogos?jogos_id=${id}`; 
//       caminhoApiDel = `/api/jogos/${id}`;
//       nomeModulo = "Jogos"
//       break;

//     case "emblema":
//       id = selectedItem?.emblema_id || null;
//       nome = selectedItem?.emblema_nome || null;
//       // caminho_api = `/api/emblemas?emblema_id=${id}`;
//       caminhoApiDel = `/api/emblemas/${id}`;
//       nomeModulo = "Emblemas"
//       break;

//     case "sugestaoMelhoria":
//       id = selectedItem?.sugestao_melhoria_id || null;
//       nome = selectedItem?.sugestao_melhoria_nome || null;
//       // caminho_api = `/api/sugestoes?sugestao_melhoria_id=${id}`;
//       caminhoApiDel = `/api/sugestoes/${id}`;
//       nomeModulo = "Sugestao e Melhoria";
//       break;

//     case "emblemaCategoria":
//       id = selectedItem?.tipo_emblema_id || null;
//       nome = selectedItem?.tipo_emblema_criterio || null;
//       // caminho_api = `/api/categoria_emblemas?tipo_emblema_id=${id}`
//       caminhoApiDel = `/api/categoria_emblemas/${id}`
//       nomeModulo = "Categoria de Emblemas"
//       break;
//   }

//   // ================= PAGINAÇÃO DAS TABELAS ================= //
//   const itemsPerPage = 5;
//   const [currentPage, setCurrentPage] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredData = Array.isArray(data) ? data.filter(item => {
//     switch (modulo) {
//       case "jogoCategoria":
//         return item.categoria_jogo_area_atuacao.toLowerCase().includes(searchTerm.toLowerCase());
    
//       case "usuario":
//         return (
//           item.usuario_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.usuario_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.usuario_nivel.toLowerCase().includes(searchTerm.toLowerCase())
//         );
    
//       case "jogo":
//         return (
//           item.jogos_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.jogos_descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.jogos_link.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.jogos_autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.jogos_url_img.toLowerCase().includes(searchTerm.toLowerCase())
//         );
    
//       case "emblema":
//         return (
//           item.emblema_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.emblema_criterio.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.emblemas_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.emblemas_pontos.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.emblema_imagem.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//       case "sugestaoMelhoria":
//         return (
//           item.sugestao_melhoria_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.sugestao_melhoria_descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.sugestao_melhoria_titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.sugestao_melhoria_status.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//       case "emblemaCategoria":
//         return (
//           item.tipo_emblema_criterio.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.emblema_id.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//       default:
//         return false;
//     }
//   }): [];
  
//   // Calcular os dados para a página atual
//   const offset = currentPage * itemsPerPage;
//   const paginatedData = filteredData.slice(offset, offset + itemsPerPage);
//   const pageCount = Math.ceil(filteredData.length / itemsPerPage);

//   // Muda a página atual
//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   // const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);

//   // const handleStatusChange = (sugestaoId: string, novoStatus: Status) => {
//   //   setSugestoes(prev => prev.map(item => 
//   //     item.sugestao_melhoria_id === sugestaoId 
//   //       ? {...item, sugestao_melhoria_status: novoStatus} 
//   //       : item
//   //   ));
//   // };

//   const handleUpdateTable = async () => {
//     const response = await fetch('/api/sugestoes');
//     const data = await response.json();
//     setSugestoes(data);
//   };

//   return (
//     <div className="flex-auto ml-4 mr-4 mt-4 mb-4"> 
//       <div className="overflow-x-auto mx-auto mt-8 mb-8 p-8 border border-gray-300 shadow-lg rounded-lg justify-between items-center">
//         {data.length === 0 ? (
//           <div className="grid grid-cols-1">
//             <div className="col-span-1">
//               {alertVisible && (
//                 <Alert
//                   message={alertMessage}
//                   tipoAlert={alertType}
//                   texto={alertMessage}
//                   cor="amarelo"
//                 />
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col items-end p-4">
//             <input
//               type="text"
//               placeholder="Pesquisar..."
//               className="mb-4 px-4 py-2 border border-gray-600 rounded"
//               onChange={e => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(0);
//               }}
//             /> 
                     
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
//                         ${modulo === "jogo" && atributoArray === "jogos_id" ? "hidden lg:table-cell" : ""} 
//                         ${modulo === "emblema" && atributoArray === "emblema_id" ? "hidden lg:table-cell" : ""} 
//                         ${modulo === "emblema" && atributoArray === "emblemas_status" ? "hidden lg:table-cell" : ""} 
//                       `}
//                       >
//                         {modulo === "emblemaCategoria" && atributoArray === "tipo_emblema_criterio" ? (
//                           <div className="group transition-all duration-300">
//                             <span className="text-sm group-hover:text-md group-hover:font-semibold">
//                               {item[atributoArray]}
//                             </span>
//                           </div>
//                         ) : atributoArray === "jogos_url_img" || atributoArray === "emblema_imagem" ? (
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

//                       {modulo === "sugestaoMelhoria" && (
//                         <BotaoStatusSugestao
//                           key={item.sugestao_melhoria_id}
//                           sugestaoId={item.sugestao_melhoria_id}
//                           statusAtual={item.sugestao_melhoria_status}
//                           descricao={item.sugestao_melhoria_descricao}
//                           titulo={item.sugestao_melhoria_titulo}
//                           onStatusChange={(novoStatus) => 
//                             handleStatusChange(item.sugestao_melhoria_id, novoStatus)
//                           }
//                           onUpdateTable={handleUpdateTable}
//                         />
//                       )}

//                       {modulo !== "sugestaoMelhoria" && (
//                         <button 
//                           onClick={() => handleEditModal(item)}
//                           className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors border border-white shadow-md shadow-yellow-500/50">
//                           <FaPencilAlt className="w-4 h-4" />
//                         </button>
//                       )}
                     
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

//             {/* Modal Editar */}
//             <ModalFormulario 
//               modalAberto={modalAberto} 
//               fecharModal={handleEditModal} 
//               titulo={modalType === 'editar' || modalType === 'editarSenha' ? 'Modo de Alteração' : 'Modo de Exclusão'} 
//               subtitulo={modalType === 'editar' || modalType === 'editarSenha' ? `Edição de dados de ${nomeModulo}` : `Exclusão de Item`}
//               modalType="editar"
//             >
//               {modalType === 'editar' ? (
//                 (() => {
//                   if (modulo === "jogoCategoria") {
//                     return (
//                       <AlterarJogosCategoria
//                         dados={selectedItem}
//                       />
//                     );
//                   } else if (modulo === "usuario") {
//                     return (
//                       <AlterarUsuarios
//                         dados={selectedItem}
//                         tipoModal="ModalCompleto"
//                       />
//                     );
//                   } else if (modulo === "jogo") {
//                     return (
//                       <AlterarJogos
//                         dados={selectedItem}
//                       />
//                     );
//                   } else if (modulo === "emblema") {
//                     return (
//                       <AlterarEmblemas
//                         dados={selectedItem}
//                       />
//                     );
//                   } else if (modulo === "emblemaCategoria") {
//                     return (
//                       <AlterarEmblemasCategoria
//                         dados={selectedItem}
//                       />
//                     );
//                   } else {
//                     return <p className="text-center text-red-500">Módulo inválido!</p>;
//                   }
//                 })()
//               ) : modalType === 'editarSenha' ? 
//               (
//                 (() => {
//                   if (modulo === "usuario") {
//                     return (
//                       <AlterarUsuarios
//                         dados={selectedItem}
//                         tipoModal="ModalSenha"
//                       />
//                     );
//                   }
//                 })()
//               ) : (
//                 <>
//                   <div className="flex justify-center">
//                     <FaTrash className="flex w-10 h-10 mb-3 mt-3 transition-transform duration-300 hover:scale-125"/>
//                   </div>

//                   <div className="flex flex-col text-center space-y-2">
//                     <p className="text-black font-semibold">Este processo é irreversível!</p>
//                     {modalText && (
//                       <p className={`mt-3 font-semibold ${modalColor}`}>{modalText}</p>
//                     )}
//                     <p className="p-3 text-2xl font-extrabold">{id || "ID não disponível"} - {nome || "Nome não disponível"}</p>
//                   </div>

//                   <div className="flex flex-col mt-6 py-4 rounded-b-lg space-x-4">
//                     <button
//                       type="button"
//                       onClick={async () => {
//                         if (!id) {
//                           console.error("Erro: Selected Item está vazio!");
//                           return;
//                         }
                    
//                         setModalText("Excluindo registro, Por favor aguarde...");
//                         setModalColor("text-red-700");
//                         setIsLoading(true);
                        
//                         try {
//                           const endpoint = caminhoApiDel;
                          
//                           const response = await fetch(endpoint, {
//                             method: "DELETE",
//                             // headers: {
//                             //   'Content-Type': 'application/json'
//                             // }
//                           });
                         
//                           if (!response.ok) {
//                             throw new Error(`Erro ao excluir o registro: ${response.status}`);
//                           }
                    
//                           // const data = await response.json();
//                           await response.json();
                    
//                           setModalText("Registro Excluído com Sucesso!");
//                           setModalColor("text-green-700");
                          
//                           setTimeout(() => {
//                             fecharModal();
//                             location.reload();
//                           }, 3000);

//                         } catch (error) {
//                           console.error("Erro ao excluir o item:", error.message);
//                           setModalText("Erro ao excluir o registro. Tente novamente.");
//                         } finally {
//                           setIsLoading(false);
//                         }
//                       }}
//                       className={`px-6 py-2 bg-rose-400 text-white font-semibold rounded-lg shadow-md ${
//                         isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
//                       } transition`}
//                       disabled={isLoading}
//                     >
//                       {isLoading ? "Excluindo..." : "Excluir"}
//                     </button>
//                   </div>
//                 </>
//               )}
//             </ModalFormulario>

//             {/* Componente de Paginação */}
//             <ReactPaginate
//               previousLabel={<GrCaretPrevious size={16} />}
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
//         )}
//       </div>
//     </div>
//   );
// }


// 'use client'
// import React from 'react';
// import { useState,useEffect } from 'react';
// import ReactPaginate from 'react-paginate'; 
// import { GrCaretPrevious,GrCaretNext  } from "react-icons/gr";
// import { FaPencilAlt,FaTrashAlt,FaTrash  } from "react-icons/fa";
// import { ModalFormulario } from './ModalFormulario';
// import Alert from './Alert';
// import AlterarJogosCategoria from '../configuracao/jogos_categoria/alterar/AlterarJogoCategoria';
// import AlterarUsuarios from '../configuracao/usuarios/alterar/AlterarUsuario';
// import AlterarJogos from '../configuracao/jogos/alterar/AlterarJogo';
// import AlterarEmblemas from '../configuracao/emblemas/alterar/AlterarEmblemas';
// import AlterarEmblemasCategoria from '../configuracao/emblemas_categoria/alterar/AlterarEmblemasCategoria';
// import Image from 'next/image';
// import BotaoSenha from './BotaoSenha';
// import BotaoLinkJogo from './BotaoLinkJogo';
// import BotaoStatusSugestao from './BotaoStatusSugestao';
// import { JogoData } from '../../../types/jogos';

// interface CategoriaDados {
//   categoria_jogo_id: string;
//   categoria_jogo_area_atuacao: string;
//   categoria_jogo_icone: string;
// }

// interface JogoCategoriaItem extends CategoriaDados {}

// interface UsuarioItem {
//   usuario_id: string;
//   usuario_nome: string;
//   usuario_email?: string;
//   usuario_senha?: string;
// }

// interface JogoItem {
//   jogos_id: string;
//   jogos_nome: string;
//   jogos_descricao?: string;
//   jogos_link?: string;
//   jogos_autor?: string;
//   jogos_url_img?: string;
// }

// interface EmblemaItem {
//   emblema_id: string;
//   emblema_nome: string;
//   emblema_imagem?: string;
//   emblema_criterio?: string;
//   emblemas_status?: string;
//   emblemas_pontos?: string;
// }


// interface SugestaoItem {
//   sugestao_melhoria_id: string;
//   sugestao_melhoria_nome: string;
//   sugestao_melhoria_descricao: string;
//   sugestao_melhoria_titulo: string;
//   sugestao_melhoria_status: string;
// }

// interface EmblemaCategoriaItem {
//   tipo_emblema_id: string;
//   tipo_emblema_criterio: string;
//   emblema_id?: string;
// }

// interface TabelaProps {
//   data: any[];
//   atributosCabTab: string[];
//   atributosDados: string[];
//   modulo: string;
// }
// type SelectedItem = JogoCategoriaItem | UsuarioItem | JogoItem | EmblemaItem | SugestaoItem | EmblemaCategoriaItem | null;

// export default function Tabela({ data,atributosCabTab,atributosDados,modulo}: TabelaProps) {
//     //  Variáveis Globais
//     let nomeModulo= '';
//     const [isLoading, setIsLoading] = useState(false);
//     const [modalText, setModalText] = useState("Tem certeza que deseja excluir o Registro abaixo?");
//     const [modalAberto,setModalAberto] = useState(false);
//     const [modalType, setModalType] = useState<'editar' | 'excluir' | 'editarSenha' | null>(null);
//     const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
//     // const [senha, setSenha] = useState('');

//     const [modalColor, setModalColor] = useState("text-gray-700"); 
    
//     // ============== Métodos de Modais Inicio===================//

//     const [alertVisible, setAlertVisible] = useState(false);
//     const [alertMessage, setAlertMessage] = useState('');
//     const [alertType, setAlertType] = useState<"sucesso" | "erro" | "informacao">("sucesso");
//     const [sugestoes, setSugestoes] = useState<SugestaoItem[]>([]);
 
//   // ********  ******** Modal Abrir Editar ********  ********   
//     function handleEditModal(item: SelectedItem){
//       setSelectedItem(item);    
//       setModalType('editar');
//       setModalAberto(!modalAberto)
//     }

//     // Para fechar o modal (sem parâmetros)
//     function handleCloseModal() {
//       setModalAberto(false);
//     }
//   // ********  ******** ============== ******** ********


// function isJogoCategoriaItem(item: SelectedItem): item is JogoCategoriaItem {
//   return (item as JogoCategoriaItem)?.categoria_jogo_id !== undefined;
// }

// function isUsuarioItem(item: SelectedItem): item is UsuarioItem {
//   return (item as UsuarioItem)?.usuario_id !== undefined;
// }

// function isJogoItem(item: SelectedItem): item is JogoItem {
//   return (item as JogoItem)?.jogos_id !== undefined;
// }

// function isEmblemaItem(item: SelectedItem): item is EmblemaItem {
//   return (item as EmblemaItem)?.emblema_id !== undefined;
// }

// function isSugestaoItem(item: SelectedItem): item is SugestaoItem {
//   return (item as SugestaoItem)?.sugestao_melhoria_id !== undefined;
// }

// function isEmblemaCategoriaItem(item: SelectedItem): item is EmblemaCategoriaItem {
//   return (item as EmblemaCategoriaItem)?.tipo_emblema_id !== undefined;
// }

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
//       setAlertMessage("Não há Registros Lançados no Sistema!");
//       setAlertType("informacao");
//       setAlertVisible(true);
//     } else {
//       setAlertVisible(false);
//     }
//   }, [data]);

//   let id: string | null = null;
//   let nome: string | null = null;
//   let caminhoApiDel = '';

//   switch (modulo) {
//     case "jogoCategoria":
//       if (isJogoCategoriaItem(selectedItem)) {
//         id = selectedItem.categoria_jogo_id;
//         nome = selectedItem.categoria_jogo_area_atuacao;
//       } else {
//         id = null;
//         nome = null;
//       }
//       caminhoApiDel = `/api/categoria_jogos?categoria_jogo_id=${id}`;
//       nomeModulo = "Categoria de Jogos";
//       break;

//     case "usuario":
//       if (isUsuarioItem(selectedItem)) {
//         id = selectedItem.usuario_id;
//         nome = selectedItem.usuario_nome;
//       } else {
//         id = null;
//         nome = null;
//       }
//       caminhoApiDel = `/api/usuarios?usuario_id=${id}`;
//       nomeModulo = "Usuário";
//       break;

//     case "jogo":
//       if (selectedItem && "jogos_id" in selectedItem && "jogos_nome" in selectedItem) {
//         id = selectedItem.jogos_id;
//         nome = selectedItem.jogos_nome;
//       } else {
//         id = null;
//         nome = null;
//       }
//       caminhoApiDel = `/api/jogos/${id}`;
//       nomeModulo = "Jogos";
//       break;

//     case "emblema":
//       if (selectedItem && "emblema_id" in selectedItem && "emblema_nome" in selectedItem) {
//         id = selectedItem.emblema_id;
//         nome = selectedItem.emblema_nome;
//       } else {
//         id = null;
//         nome = null;
//       }
//       caminhoApiDel = `/api/emblemas/${id}`;
//       nomeModulo = "Emblemas";
//       break;

//     case "sugestaoMelhoria":
//       if (selectedItem && "sugestao_melhoria_id" in selectedItem && "sugestao_melhoria_nome" in selectedItem) {
//         id = selectedItem.sugestao_melhoria_id;
//         nome = selectedItem.sugestao_melhoria_nome;
//       } else {
//         id = null;
//         nome = null;
//       }
//       caminhoApiDel = `/api/sugestoes/${id}`;
//       nomeModulo = "Sugestao e Melhoria";
//       break;

//     case "emblemaCategoria":
//       if (selectedItem && "tipo_emblema_id" in selectedItem && "tipo_emblema_criterio" in selectedItem) {
//         id = selectedItem.tipo_emblema_id;
//         nome = selectedItem.tipo_emblema_criterio;
//       } else {
//         id = null;
//         nome = null;
//       }
//       caminhoApiDel = `/api/categoria_emblemas/${id}`;
//       nomeModulo = "Categoria de Emblemas";
//       break;
//   }


//   // ================= PAGINAÇÃO DAS TABELAS ================= //
//   const itemsPerPage = 5;
//   const [currentPage, setCurrentPage] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredData = Array.isArray(data) ? data.filter(item => {
//     switch (modulo) {
//       case "jogoCategoria":
//         return item.categoria_jogo_area_atuacao.toLowerCase().includes(searchTerm.toLowerCase());
    
//       case "usuario":
//         return (
//           item.usuario_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.usuario_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.usuario_nivel.toLowerCase().includes(searchTerm.toLowerCase())
//         );
    
//       case "jogo":
//         return (
//           item.jogos_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.jogos_descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.jogos_link.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.jogos_autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.jogos_url_img.toLowerCase().includes(searchTerm.toLowerCase())
//         );
    
//       case "emblema":
//         return (
//           item.emblema_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.emblema_criterio.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.emblemas_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.emblemas_pontos.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.emblema_imagem.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//       case "sugestaoMelhoria":
//         return (
//           item.sugestao_melhoria_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.sugestao_melhoria_descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.sugestao_melhoria_titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.sugestao_melhoria_status.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//       case "emblemaCategoria":
//         return (
//           item.tipo_emblema_criterio.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.emblema_id.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//       default:
//         return false;
//     }
//   }): [];
  
//   // Calcular os dados para a página atual
//   const offset = currentPage * itemsPerPage;
//   const paginatedData = filteredData.slice(offset, offset + itemsPerPage);
//   const pageCount = Math.ceil(filteredData.length / itemsPerPage);

//   // Muda a página atual
//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   // const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);

// const handleStatusChange = (sugestaoId: string, novoStatus: string) => {
//   setSugestoes(prev => prev.map(item => 
//     item.sugestao_melhoria_id === sugestaoId 
//       ? {...item, sugestao_melhoria_status: novoStatus} 
//       : item
//   ));
// };

//   const handleUpdateTable = async () => {
//     const response = await fetch('/api/sugestoes');
//     const data = await response.json();
//     setSugestoes(data);
//   };

//   return (
//     <div className="flex-auto ml-4 mr-4 mt-4 mb-4"> 
//       <div className="overflow-x-auto mx-auto mt-8 mb-8 p-8 border border-gray-300 shadow-lg rounded-lg justify-between items-center">
//         {data.length === 0 ? (
//           <div className="grid grid-cols-1">
//             <div className="col-span-1">
//               {alertVisible && (
//                 <Alert
//                   tipoAlert={alertType}
//                   texto={alertMessage}
//                   cor="amarelo"
//                 />
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col items-end p-4">
//             <input
//               type="text"
//               placeholder="Pesquisar..."
//               className="mb-4 px-4 py-2 border border-gray-600 rounded"
//               onChange={e => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(0);
//               }}
//             /> 
                     
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
//                         ${modulo === "jogo" && atributoArray === "jogos_id" ? "hidden lg:table-cell" : ""} 
//                         ${modulo === "emblema" && atributoArray === "emblema_id" ? "hidden lg:table-cell" : ""} 
//                         ${modulo === "emblema" && atributoArray === "emblemas_status" ? "hidden lg:table-cell" : ""} 
//                       `}
//                       >
//                         {modulo === "emblemaCategoria" && atributoArray === "tipo_emblema_criterio" ? (
//                           <div className="group transition-all duration-300">
//                             <span className="text-sm group-hover:text-md group-hover:font-semibold">
//                               {item[atributoArray]}
//                             </span>
//                           </div>
//                         ) : atributoArray === "jogos_url_img" || atributoArray === "emblema_imagem" ? (
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

//                       {modulo === "sugestaoMelhoria" && (
//                         <BotaoStatusSugestao
//                           key={item.sugestao_melhoria_id}
//                           sugestaoId={item.sugestao_melhoria_id}
//                           statusAtual={item.sugestao_melhoria_status}
//                           descricao={item.sugestao_melhoria_descricao}
//                           titulo={item.sugestao_melhoria_titulo}
//                           onStatusChange={(novoStatus) => 
//                             handleStatusChange(item.sugestao_melhoria_id, novoStatus)
//                           }
//                           // onStatusChange={handleStatusChange}
//                           onUpdateTable={handleUpdateTable}
//                         />
//                       )}

//                       {modulo !== "sugestaoMelhoria" && (
//                         <button 
//                           onClick={() => handleEditModal(item)}
//                           className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors border border-white shadow-md shadow-yellow-500/50">
//                           <FaPencilAlt className="w-4 h-4" />
//                         </button>
//                       )}
                     
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

//             {/* Modal Editar */}
//             <ModalFormulario 
//               modalAberto={modalAberto} 
//               fecharModal={handleCloseModal} 
//               titulo={modalType === 'editar' || modalType === 'editarSenha' ? 'Modo de Alteração' : 'Modo de Exclusão'} 
//               subtitulo={modalType === 'editar' || modalType === 'editarSenha' ? `Edição de dados de ${nomeModulo}` : `Exclusão de Item`}
//               modalType="editar"
//             >
//               {modalType === 'editar' ? (
//                 (() => {
//                   if (modulo === "jogoCategoria") {
//                     if (!selectedItem || !isJogoCategoriaItem(selectedItem)) {
//                       return <p className="text-center text-red-500">Dados incompletos para edição!</p>;
//                     }
//                     return (
//                       <AlterarJogosCategoria
//                         dados={selectedItem}
//                       />
//                     );
//                   } else if (modulo === "usuario") {
//                     if (!selectedItem || !isUsuarioItem(selectedItem)) {
//                       return <p className="text-center text-red-500">Dados incompletos para edição!</p>;
//                     }
//                     return (
//                       <AlterarUsuarios
//                         dados={selectedItem}
//                         tipoModal="ModalCompleto"
//                       />
//                     );
//                   } else if (modulo === "jogo") {
//                     if (!selectedItem || !isJogoItem(selectedItem)) {
//                       return <p className="text-center text-red-500">Dados incompletos para edição!</p>;
//                     }
//                     return (
//                       <AlterarJogos
//                         dados={selectedItem}
//                       />
//                     );
//                   } else if (modulo === "emblema") {
//                     if (!selectedItem || !isEmblemaItem(selectedItem)) {
//                       return <p className="text-center text-red-500">Dados incompletos para edição!</p>;
//                     }
//                     return (
//                       <AlterarEmblemas
//                         dados={selectedItem}
//                       />
//                     );
//                   } else if (modulo === "emblemaCategoria") {
//                     if (!selectedItem || !isEmblemaCategoriaItem(selectedItem)) {
//                       return <p className="text-center text-red-500">Dados incompletos para edição!</p>;
//                     }
//                     return (
//                       <AlterarEmblemasCategoria
//                         dados={selectedItem}
//                       />
//                     );
//                   } else {
//                     return <p className="text-center text-red-500">Módulo inválido!</p>;
//                   }
//                 })()
//               ) : modalType === 'editarSenha' ? 
//               (
//                 (() => {
//                   if (modulo === "usuario") {
//                     return (
//                       <AlterarUsuarios
//                         dados={selectedItem}
//                         tipoModal="ModalSenha"
//                       />
//                     );
//                   }
//                 })()
//               ) : (
//                 <>
//                   <div className="flex justify-center">
//                     <FaTrash className="flex w-10 h-10 mb-3 mt-3 transition-transform duration-300 hover:scale-125"/>
//                   </div>

//                   <div className="flex flex-col text-center space-y-2">
//                     <p className="text-black font-semibold">Este processo é irreversível!</p>
//                     {modalText && (
//                       <p className={`mt-3 font-semibold ${modalColor}`}>{modalText}</p>
//                     )}
//                     <p className="p-3 text-2xl font-extrabold">{id || "ID não disponível"} - {nome || "Nome não disponível"}</p>
//                   </div>

//                   <div className="flex flex-col mt-6 py-4 rounded-b-lg space-x-4">
//                     <button
//                       type="button"
//                       onClick={async () => {
//                         if (!id) {
//                           console.error("Erro: Selected Item está vazio!");
//                           return;
//                         }
                    
//                         setModalText("Excluindo registro, Por favor aguarde...");
//                         setModalColor("text-red-700");
//                         setIsLoading(true);
                        
//                         try {
//                           const endpoint = caminhoApiDel;
                          
//                           const response = await fetch(endpoint, {
//                             method: "DELETE",
//                             // headers: {
//                             //   'Content-Type': 'application/json'
//                             // }
//                           });
                         
//                           if (!response.ok) {
//                             throw new Error(`Erro ao excluir o registro: ${response.status}`);
//                           }
                    
//                           // const data = await response.json();
//                           await response.json();
                    
//                           setModalText("Registro Excluído com Sucesso!");
//                           setModalColor("text-green-700");
                          
//                           setTimeout(() => {
//                             fecharModal();
//                             location.reload();
//                           }, 3000);

//                         } catch (error) {
//                           console.error("Erro ao excluir o item:", error.message);
//                           setModalText("Erro ao excluir o registro. Tente novamente.");
//                         } finally {
//                           setIsLoading(false);
//                         }
//                       }}
//                       className={`px-6 py-2 bg-rose-400 text-white font-semibold rounded-lg shadow-md ${
//                         isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
//                       } transition`}
//                       disabled={isLoading}
//                     >
//                       {isLoading ? "Excluindo..." : "Excluir"}
//                     </button>
//                   </div>
//                 </>
//               )}
//             </ModalFormulario>

//             {/* Componente de Paginação */}
//             <ReactPaginate
//               previousLabel={<GrCaretPrevious size={16} />}
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
//         )}
//       </div>
//     </div>
//   );
// }


'use client'
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import { FaPencilAlt, FaTrashAlt, FaTrash } from "react-icons/fa";
import Image from 'next/image';

// Components
import { ModalFormulario } from './ModalFormulario';
import Alert from './Alert';
import BotaoSenha from './BotaoSenha';
import BotaoLinkJogo from './BotaoLinkJogo';
import BotaoStatusSugestao from './BotaoStatusSugestao';

// Form Components
import AlterarJogosCategoria from '../configuracao/jogos_categoria/alterar/AlterarJogoCategoria';
import AlterarUsuarios from '../configuracao/usuarios/alterar/AlterarUsuario';
import AlterarJogos from '../configuracao/jogos/alterar/AlterarJogo';
import AlterarEmblemas from '../configuracao/emblemas/alterar/AlterarEmblemas';
import AlterarEmblemasCategoria from '../configuracao/emblemas_categoria/alterar/AlterarEmblemasCategoria';

// Types
type ModalType = 'editar' | 'excluir' | 'editarSenha' | null;
type AlertType = "sucesso" | "erro" | "informacao";

interface CategoriaDados {
  categoria_jogo_id: string;
  categoria_jogo_area_atuacao: string;
  categoria_jogo_icone: string;
}

interface UsuarioItem {
  usuario_id: string;
  usuario_nome: string;
  usuario_email?: string;
  usuario_senha?: string;
}

interface JogoItem {
  jogos_id: string;
  jogos_nome: string;
  jogos_descricao?: string;
  jogos_link?: string;
  jogos_autor?: string;
  jogos_url_img?: string;
  categoria_jogo_id: string; // ← Adicione isto
}


interface EmblemaItem {
  emblema_id: string;
  emblema_nome: string;
  emblema_imagem?: string;
  emblema_criterio?: string;
  emblemas_status?: string;
  emblemas_pontos?: string;
}

interface SugestaoItem {
  sugestao_melhoria_id: string;
  sugestao_melhoria_nome: string;
  sugestao_melhoria_descricao: string;
  sugestao_melhoria_titulo: string;
  sugestao_melhoria_status: string;
}

interface EmblemaCategoriaItem {
  tipo_emblema_id: string;
  tipo_emblema_criterio: string;
  emblema_id?: string;
}

type SelectedItem = CategoriaDados | UsuarioItem | JogoItem | EmblemaItem | SugestaoItem | EmblemaCategoriaItem | null;

interface TabelaProps {
  data: any[];
  atributosCabTab: string[];
  atributosDados: string[];
  modulo: string;
}


interface TipoEmblemaLocal {
  tipo_emblema_id: number;
  tipo_emblema_criterio: string;
  tipo_emblema_pontos: number;
  emblema_id: number;
  emblema?: {
    emblema_nome: string;
  };
}


// Type guards
const isJogoCategoriaItem = (item: SelectedItem): item is CategoriaDados => 
  (item as CategoriaDados)?.categoria_jogo_id !== undefined;

const isUsuarioItem = (item: SelectedItem): item is UsuarioItem => 
  (item as UsuarioItem)?.usuario_id !== undefined;

const isJogoItem = (item: SelectedItem): item is JogoItem => 
  (item as JogoItem)?.jogos_id !== undefined;

const isEmblemaItem = (item: SelectedItem): item is EmblemaItem => 
  (item as EmblemaItem)?.emblema_id !== undefined;

const isSugestaoItem = (item: SelectedItem): item is SugestaoItem => 
  (item as SugestaoItem)?.sugestao_melhoria_id !== undefined;

const isEmblemaCategoriaItem = (item: SelectedItem): item is EmblemaCategoriaItem => 
  (item as EmblemaCategoriaItem)?.tipo_emblema_id !== undefined;

export default function Tabela({ data, atributosCabTab, atributosDados, modulo }: TabelaProps) {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [modalText, setModalText] = useState("Tem certeza que deseja excluir o Registro abaixo?");
  const [modalAberto, setModalAberto] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [modalColor, setModalColor] = useState("text-gray-700");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<AlertType>("sucesso");
  const [sugestoes, setSugestoes] = useState<SugestaoItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');


  
  // Constants
  const itemsPerPage = 5;
  const nomeModulo = useMemo(() => {
    switch (modulo) {
      case "jogoCategoria": return "Categoria de Jogos";
      case "usuario": return "Usuário";
      case "jogo": return "Jogos";
      case "emblema": return "Emblemas";
      case "sugestaoMelhoria": return "Sugestão e Melhoria";
      case "emblemaCategoria": return "Categoria de Emblemas";
      default: return "";
    }
  }, [modulo]);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    
    return data.filter(item => {
      if (!item) return false;
      
      const searchTermLower = searchTerm.toLowerCase();
      
      switch (modulo) {
        case "jogoCategoria":
          return item.categoria_jogo_area_atuacao?.toLowerCase().includes(searchTermLower);
        
        case "usuario":
          return (
            item.usuario_nome?.toLowerCase().includes(searchTermLower) ||
            item.usuario_email?.toLowerCase().includes(searchTermLower) ||
            item.usuario_nivel?.toLowerCase().includes(searchTermLower)
          );
        
        case "jogo":
          return (
            item.jogos_nome?.toLowerCase().includes(searchTermLower) ||
            item.jogos_descricao?.toLowerCase().includes(searchTermLower) ||
            item.jogos_link?.toLowerCase().includes(searchTermLower) ||
            item.jogos_autor?.toLowerCase().includes(searchTermLower) ||
            item.jogos_url_img?.toLowerCase().includes(searchTermLower)
          );
        
        case "emblema":
          return (
            item.emblema_nome?.toLowerCase().includes(searchTermLower) ||
            item.emblema_criterio?.toLowerCase().includes(searchTermLower) ||
            item.emblemas_status?.toLowerCase().includes(searchTermLower) ||
            item.emblemas_pontos?.toLowerCase().includes(searchTermLower) ||
            item.emblema_imagem?.toLowerCase().includes(searchTermLower)
          );

        case "sugestaoMelhoria":
          return (
            item.sugestao_melhoria_nome?.toLowerCase().includes(searchTermLower) ||
            item.sugestao_melhoria_descricao?.toLowerCase().includes(searchTermLower) ||
            item.sugestao_melhoria_titulo?.toLowerCase().includes(searchTermLower) ||
            item.sugestao_melhoria_status?.toLowerCase().includes(searchTermLower)
          );

        case "emblemaCategoria":
          return (
            item.tipo_emblema_criterio?.toLowerCase().includes(searchTermLower) ||
            item.emblema_id?.toLowerCase().includes(searchTermLower)
          );

        default:
          return false;
      }
    });
  }, [data, searchTerm, modulo]);

  // Pagination
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return filteredData.slice(offset, offset + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // API path for deletion
  const { id, nome, caminhoApiDel } = useMemo(() => {
    let id: string | null = null;
    let nome: string | null = null;
    let caminhoApiDel = '';

    if (!selectedItem) return { id: null, nome: null, caminhoApiDel: '' };

    switch (modulo) {
      case "jogoCategoria":
        if (isJogoCategoriaItem(selectedItem)) {
          id = selectedItem.categoria_jogo_id;
          nome = selectedItem.categoria_jogo_area_atuacao;
          caminhoApiDel = `/api/categoria_jogos?categoria_jogo_id=${id}`;
        }
        break;

      case "usuario":
        if (isUsuarioItem(selectedItem)) {
          id = selectedItem.usuario_id;
          nome = selectedItem.usuario_nome;
          caminhoApiDel = `/api/usuarios?usuario_id=${id}`;
        }
        break;

      case "jogo":
        if (isJogoItem(selectedItem)) {
          id = selectedItem.jogos_id;
          nome = selectedItem.jogos_nome;
          caminhoApiDel = `/api/jogos/${id}`;
        }
        break;

      case "emblema":
        if (isEmblemaItem(selectedItem)) {
          id = selectedItem.emblema_id;
          nome = selectedItem.emblema_nome;
          caminhoApiDel = `/api/emblemas/${id}`;
        }
        break;

      case "sugestaoMelhoria":
        if (isSugestaoItem(selectedItem)) {
          id = selectedItem.sugestao_melhoria_id;
          nome = selectedItem.sugestao_melhoria_nome;
          caminhoApiDel = `/api/sugestoes/${id}`;
        }
        break;

      case "emblemaCategoria":
        if (isEmblemaCategoriaItem(selectedItem)) {
          id = selectedItem.tipo_emblema_id;
          nome = selectedItem.tipo_emblema_criterio;
          caminhoApiDel = `/api/categoria_emblemas/${id}`;
        }
        break;
    }

    return { id, nome, caminhoApiDel };
  }, [selectedItem, modulo]);

  // Effects
  useEffect(() => {
    setAlertVisible(data.length === 0);
    setAlertMessage(data.length === 0 ? "Não há Registros Lançados no Sistema!" : '');
    setAlertType("informacao");
  }, [data]);

  // Handlers
  const handleEditModal = useCallback((item: SelectedItem) => {
    setSelectedItem(item);
    setModalType('editar');
    setModalAberto(true);
  }, []);

  const handleDeletarModal = useCallback((item: SelectedItem) => {
    setSelectedItem(item);
    setModalType('excluir');
    setModalAberto(true);
  }, []);

  const handleEditSenha = useCallback((item: SelectedItem) => {
    setSelectedItem(item);
    setModalType('editarSenha');
    setModalAberto(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalAberto(false);
  }, []);

  const fecharModal = useCallback(() => {
    setModalAberto(false);
    setModalType(null);
    setSelectedItem(null);
  }, []);

  const handlePageClick = useCallback(({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  }, []);

  const handleStatusChange = useCallback((sugestaoId: string, novoStatus: string) => {
    setSugestoes(prev => prev.map(item => 
      item.sugestao_melhoria_id === sugestaoId 
        ? {...item, sugestao_melhoria_status: novoStatus} 
        : item
    ));
  }, []);

  const handleUpdateTable = useCallback(async () => {
    const response = await fetch('/api/sugestoes');
    const data = await response.json();
    setSugestoes(data);
  }, []);

  const handleDeleteItem = useCallback(async () => {
    if (!id) {
      console.error("Erro: Selected Item está vazio!");
      return;
    }

    setModalText("Excluindo registro, Por favor aguarde...");
    setModalColor("text-red-700");
    setIsLoading(true);
    
    try {
      const response = await fetch(caminhoApiDel, {
        method: "DELETE",
      });
     
      if (!response.ok) {
        throw new Error(`Erro ao excluir o registro: ${response.status}`);
      }

      await response.json();
      setModalText("Registro Excluído com Sucesso!");
      setModalColor("text-green-700");
      
      setTimeout(() => {
        fecharModal();
        window.location.reload();
      }, 3000);

    } catch (error) {
      console.error("Erro ao excluir o item:", error instanceof Error ? error.message : String(error));
      setModalText("Erro ao excluir o registro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [id, caminhoApiDel, fecharModal]);

  // Render functions
  const renderModalContent = () => {
    if (!modalType) return null;

    if (modalType === 'editar') {
      if (!selectedItem) {
        return <p className="text-center text-red-500">Dados incompletos para edição!</p>;
      }

      switch (modulo) {
        case "jogoCategoria":
          return isJogoCategoriaItem(selectedItem) ? (
            <AlterarJogosCategoria dados={selectedItem} />
          ) : null;

        case "usuario":
          return isUsuarioItem(selectedItem) ? (
            <AlterarUsuarios dados={selectedItem} tipoModal="ModalCompleto" />
          ) : null;

        case "jogo":
          return isJogoItem(selectedItem) ? (
            <AlterarJogos dados={selectedItem} />
          ) : null;

        case "emblema":
          return isEmblemaItem(selectedItem) ? (
            <AlterarEmblemas dados={selectedItem} />
          ) : null;

        case "emblemaCategoria":
          return isEmblemaCategoriaItem(selectedItem) ? (
            <AlterarEmblemasCategoria 
              // dados={selectedItem as TipoEmblemaLocal} 
              dados={{
                tipo_emblema_id: Number(selectedItem.tipo_emblema_id),
                tipo_emblema_criterio: selectedItem.tipo_emblema_criterio,
                tipo_emblema_pontos: 0, // ou o valor real se você tiver
                emblema_id: Number(selectedItem.emblema_id ?? 0), // cuidado com undefined
              }}
            />
          ) : null;

        default:
          return <p className="text-center text-red-500">Módulo inválido!</p>;
      }
    }

    if (modalType === 'editarSenha' && modulo === "usuario" && isUsuarioItem(selectedItem)) {
      return <AlterarUsuarios dados={selectedItem} tipoModal="ModalSenha" />;
    }

    if (modalType === 'excluir') {
      return (
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
              onClick={handleDeleteItem}
              className={`px-6 py-2 bg-rose-400 text-white font-semibold rounded-lg shadow-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
              } transition`}
              disabled={isLoading}
            >
              {isLoading ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </>
      );
    }

    return null;
  };

  const renderCellContent = (item: any, atributoArray: string) => {
    if (modulo === "emblemaCategoria" && atributoArray === "tipo_emblema_criterio") {
      return (
        <div className="group transition-all duration-300">
          <span className="text-sm group-hover:text-md group-hover:font-semibold">
            {item[atributoArray]}
          </span>
        </div>
      );
    }

    if (atributoArray === "jogos_url_img" || atributoArray === "emblema_imagem") {
      return (
        <Image
          src={item[atributoArray] || ''}
          alt="Imagem"
          className="w-16 h-16 object-cover rounded"
          width={50}
          height={50}
        />
      );
    }

    if (atributoArray === "jogos_descricao") {
      const descricao = item[atributoArray] || '';
      return descricao.length > 15 ? `${descricao.substring(0, 15)}...` : descricao;
    }

    if (atributoArray === "jogos_link") {
      return (
        <a
          href={item[atributoArray]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 underline hover:text-blue-700"
        >
          {item[atributoArray]}
        </a>
      );
    }

    return item[atributoArray];
  };

  const shouldHideColumn = (atributo: string) => {
    const attrLower = atributo.toLowerCase();
    return (
      (modulo === "usuario" && (attrLower === "id" || attrLower === "email")) ||
      (modulo === "jogo" && attrLower === "id") ||
      (modulo === "emblema" && (attrLower === "id" || attrLower === "status"))
    );
  };

  return (
    <div className="flex-auto ml-4 mr-4 mt-4 mb-4"> 
      <div className="overflow-x-auto mx-auto mt-8 mb-8 p-8 border border-gray-300 shadow-lg rounded-lg justify-between items-center">
        {data.length === 0 ? (
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              {alertVisible && (
                <Alert
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
              value={searchTerm}
            /> 
                     
            <table className="table-auto min-w-full bg-white text-black rounded-lg border-collapse border border-black">
              <thead>
                <tr className="bg-neutral-900 text-gray-300 text-center uppercase font-bold">
                  {atributosCabTab
                    .filter(attr => attr.toLowerCase() !== "senha")
                    .map((atributo, index) => (
                      <th
                        key={index}
                        className={`py-3 px-6 border border-white text-center ${
                          shouldHideColumn(atributo) ? "hidden lg:table-cell" : ""
                        }`}
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
                    {atributosDados
                      .filter(attr => attr !== "usuario_senha")
                      .map((atributoArray, idx) => (
                        <td 
                          key={idx} 
                          className={`py-3 px-6 border border-black text-center ${
                            shouldHideColumn(atributoArray) ? "hidden lg:table-cell" : ""
                          }`}
                        >
                          {renderCellContent(item, atributoArray)}
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
                          titulo={item.sugestao_melhoria_titulo}
                          onStatusChange={(novoStatus) => 
                            handleStatusChange(item.sugestao_melhoria_id, novoStatus)
                          }
                          onUpdateTable={handleUpdateTable}
                        />
                      )}

                      {modulo !== "sugestaoMelhoria" && (
                        <button 
                          onClick={() => handleEditModal(item)}
                          className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors border border-white shadow-md shadow-yellow-500/50"
                        >
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

            <ModalFormulario 
              modalAberto={modalAberto} 
              fecharModal={handleCloseModal} 
              titulo={modalType === 'editar' || modalType === 'editarSenha' ? 'Modo de Alteração' : 'Modo de Exclusão'} 
              subtitulo={modalType === 'editar' || modalType === 'editarSenha' ? `Edição de dados de ${nomeModulo}` : `Exclusão de Item`}
              modalType="editar"
            >
              {renderModalContent()}
            </ModalFormulario>

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