import InputForm from "@/app/components/InputsForm";

export default function AlterarUsuarios({dados}) {

  return (
    <> 
      <div className="flex flex-col">
          <div className="mt-2 space-y-2">
            <InputForm
              tipoInput="text"
              label="ID"
              placeholder="Nome do Usuário"
              valorInput={dados?.id}
              metodoSubmit={(e) => setFormData({ ...dados, id: e.target.value })}
            />
              <InputForm
                tipoInput="text"
                label="Nome"
                placeholder="Nome do Usuário"
                valorInput={dados?.name}
                metodoSubmit={(e) => setFormData({ ...dados, name: e.target.value })}
              />
            <InputForm
              tipoInput="text"
              label="Email"
              placeholder="Nome do Usuário"
              valorInput={dados?.email}
              metodoSubmit={(e) => setFormData({ ...dados, email: e.target.value })}
            />
          </div>        
        </div>
    </>
  );
}

