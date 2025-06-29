// import { ModelFormSugestao } from "./ModelFormSugestao";
// import { useState } from "react";

// export default function EnviarSugestão({dadosUsuario}) {
//   const [isOpen, setIsOpen] = useState(false);
  
//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
//       >
//         Enviar Sugestão
//       </button>

//       {isOpen && <ModelFormSugestao dadosUsuario={dadosUsuario}onClose={() => setIsOpen(false)} />}
//     </>
//   );
// }





// import { ModelFormSugestao } from "./ModelFormSugestao";
// import { useState } from "react";

// // Defina o tipo para os dados do usuário
// type DadosUsuario = {
//   id: string;
//   nome: string;
//   email: string;
// };

// // Defina as props do componente EnviarSugestão
// interface EnviarSugestaoProps {
//   dadosUsuario: DadosUsuario;
// }

// export default function EnviarSugestão({ dadosUsuario }: EnviarSugestaoProps) {
//   const [isOpen, setIsOpen] = useState(false);
  
//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
//       >
//         Enviar Sugestão
//       </button>

//       {isOpen && (
//         <ModelFormSugestao 
//           dadosUsuario={dadosUsuario}
//           onClose={() => setIsOpen(false)} 
//         />
//       )}
//     </>
//   );
// }


import { ModelFormSugestao } from "./ModelFormSugestao";
import { useState } from "react";

// Defina o tipo para os dados do usuário que o ModelFormSugestao espera
type UsuarioModel = {
  usuario: {
    id: string | number;
    nome: string;
    email?: string;
  };
};

// Defina as props do componente EnviarSugestão
interface EnviarSugestaoProps {
  dadosUsuario: {
    usuario: {
      id: string | number;
      nome: string;
      email?: string;
    };
  };
}

export default function EnviarSugestão({ dadosUsuario }: EnviarSugestaoProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Verifica se os dados do usuário estão corretamente estruturados
  if (!dadosUsuario?.usuario) {
    console.error("Dados do usuário estão em formato incorreto:", dadosUsuario);
    return (
      <button 
        className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
        disabled
      >
        Erro: Dados do usuário inválidos
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
      >
        Enviar Sugestão
      </button>

      {isOpen && (
        <ModelFormSugestao 
          dadosUsuario={{
            usuario: {
              id: dadosUsuario.usuario.id,
              nome: dadosUsuario.usuario.nome,
              email: dadosUsuario.usuario.email
            }
          }}
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}