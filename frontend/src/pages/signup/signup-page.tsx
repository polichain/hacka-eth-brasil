import {
  Button, TextField,
  Typography
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import contractConfig from "../../contracts/contract-config.json";
import { Address, useContractWrite } from "wagmi";
import { Company } from "../../types";

export const SignupPage: React.FC = () => {
  const form = useForm();
  const { handleSubmit, register } = form;

  //Prepare contract write
  const { write, data, error, isLoading, isError } = useContractWrite({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: 'addCompany',
  })

  const handleSignupSubmit = (data:Company|any) => {
    write?.({args: [data.name,
      data.description,
      data.documentNumber,
      data.location,
      data.category]});
  };
  // End add company

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit((data) => handleSignupSubmit(data))}>
        <div className="d-flex flex-column px-3 pt-3 gap-3">
          <Typography variant="h6">
            Complete o cadastro da sua empresa no formulário abaixo:
          </Typography>

          <div className="d-flex gap-3">
            <TextField
              id="name"
              {...register("name", { required: true })}
              label="Nome da Empresa"
              sx={{ width: "50%" }}
            />
            <TextField
              id="documentNumber"
              {...register("documentNumber", { required: true })}
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
              id="location"
              {...register("location", { required: true })}
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
            <Button variant="outlined" type="submit">
              <Typography variant="subtitle2" fontWeight="600">
                Completar cadastro
              </Typography>
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
