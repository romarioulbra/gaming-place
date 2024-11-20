import { ReactNode } from "react";
import { FaTimesCircle } from "react-icons/fa";

interface ModalProps {
  modalAberto?: boolean;
  fecharModal?: () => void;
  children: ReactNode;
  titulo: string;
  subtitulo: string;
  modalType: 'editar' | 'excluir'; // Prop para diferenciar os tipos de modal
}

export function ModalFormulario({ modalAberto, fecharModal, children, titulo, subtitulo, modalType}: ModalProps) {
  if (!modalAberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      {/* Fundo escuro */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Contêiner do modal */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-y-auto bg-white p-6 md:rounded-lg shadow-lg">
        {/* Cabeçalho do Modal */}
        <div className="border-b border-blue-400 pb-4">
          <h2 className="text-3xl font-semibold text-zinc-600 text-center">{titulo}</h2>
          <h4 className="text-md font-extralight text-zinc-500 text-center">{subtitulo}</h4>
          <button
            type="button"
            className="absolute right-4 top-4 text-red-500 transition-all hover:text-red-600"
            onClick={fecharModal}
          >
            <FaTimesCircle className="h-8 w-8" />
          </button>
        </div>

        {modalType === 'editar' ? (
          <>
            {/* Conteúdo do Modal para Edição com os dados do formulário */}
            <div className="mt-6 space-y-4">
              {children}
            </div>
          </>
        ) : (
          <>
            
          </>
        )}
      </div>
    </div>
  );
}
