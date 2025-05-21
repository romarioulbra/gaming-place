import React from "react";
import InputForm from "./InputsForm";
import Botao from "./Botao";
import Alert from "./Alert";
import { ModalFormulario } from "./ModalFormulario";

interface Props {
  modalAberto: boolean;
  fecharModal: () => void;
  formData: {
    usuario_nome: string;
    usuario_email: string;
    usuario_senha: string;
    usuario_nivel: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      usuario_nome: string;
      usuario_email: string;
      usuario_senha: string;
      usuario_nivel: string;
    }>
  >;
  handleCadastro: (event: React.FormEvent) => void;
  alertVisible: boolean;
  alertMessage: string;
  alertType: "sucesso" | "erro";
}

export const CadastroContaModal: React.FC<Props> = ({
  modalAberto,
  fecharModal,
  formData,
  setFormData,
  handleCadastro,
  alertVisible,
  alertMessage,
  alertType,
}) => {
  return (
    <ModalFormulario
      modalAberto={modalAberto}
      fecharModal={fecharModal}
      titulo="Cadastro de Usuário"
      subtitulo="Insira suas informações para criar sua conta."
      modalType="editar"
    >
      <div className="p-8 border border-gray-300 shadow-lg bg-white rounded-lg">
        {alertVisible && (
          <Alert
            message={alertMessage}
            tipoAlert={alertType}
            texto={alertMessage}
            cor={alertType === "sucesso" ? "verde" : "vermelho"}
          />
        )}

        <form
          name="loginFormModal"
          onSubmit={handleCadastro}
          className="bg-white p-8 rounded-lg"
        >
          <div className="space-y-4">
            <InputForm
              tipoInput="text"
              label="Usuário"
              placeholder="Nome do Usuário"
              valorInput={formData.usuario_nome}
              metodoSubmit={(e) =>
                setFormData({ ...formData, usuario_nome: e.target.value })
              }
            />
            <InputForm
              tipoInput="email"
              label="Email"
              placeholder="exemplo@exemplo.com.br"
              valorInput={formData.usuario_email}
              metodoSubmit={(e) =>
                setFormData({ ...formData, usuario_email: e.target.value })
              }
            />
            <InputForm
              tipoInput="password"
              label="Senha"
              placeholder="Exemplo_123"
              valorInput={formData.usuario_senha}
              metodoSubmit={(e) =>
                setFormData({ ...formData, usuario_senha: e.target.value })
              }
            />
          </div>
          <div className="flex justify-center mt-6">
            <Botao texto="Cadastrar" tipo="submit" cor="verde" />
          </div>
        </form>
      </div>
    </ModalFormulario>
  );
};
