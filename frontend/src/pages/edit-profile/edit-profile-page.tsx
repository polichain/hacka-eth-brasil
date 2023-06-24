import { Button, TextField, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Pagination } from "../../types";

interface EditProfilePageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const EditProfilePage: React.FC<EditProfilePageProps> = ({
  setCurrentPage,
}: EditProfilePageProps) => {
  const form = useForm();
  const { handleSubmit, register } = form;

  const handleEditProfileSubmit = (data: any) => {
    console.log(data);
    setCurrentPage(Pagination.Profile);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit((data) => handleEditProfileSubmit(data))}>
        <div className="d-flex flex-column px-3 pt-3 gap-3">
          <Typography variant="h6">
            Edite o cadastro da sua empresa no formulário abaixo:
          </Typography>

          <div className="d-flex gap-3">
            <TextField
              id="name"
              {...register("name", { required: true })}
              label="Nome da Empresa"
              sx={{ width: "50%" }}
            />
            <TextField
              id="cnpj"
              {...register("cnpj", { required: true })}
              label="CNPJ da Empresa"
              sx={{ width: "50%" }}
            />
          </div>

          <TextField
            id="description"
            {...register("description", { required: true })}
            label="Descrição"
          />

          <div className="d-flex gap-3 w-100">
            <TextField
              id="address"
              {...register("address", { required: true })}
              label="Endereço da Empresa"
              sx={{ width: "50%" }}
            />
            <TextField
              id="category"
              {...register("category", { required: true })}
              label="Categoria da Empresa"
              sx={{ width: "50%" }}
            />
          </div>

          <div className="d-flex flex-column align-items-center w-30">
            <Button variant="contained" type="submit">
              <Typography variant="subtitle2" fontWeight="600">
                Salvar edição
              </Typography>
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
