import { Button, TextField, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Company, Pagination } from "../../types";
import contractConfig from "../../contracts/contract-config.json";
import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useEffect } from "react";

interface EditProfilePageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const EditProfilePage: React.FC<EditProfilePageProps> = ({
  setCurrentPage,
}: EditProfilePageProps) => {
  const { address } = useAccount();
  const form = useForm();

  const { handleSubmit, register, setValue } = form;

  const data_edit: Company | any = useContractRead({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "getCompany",
    args: [address],
  }).data;

  useEffect(() => {
    if (data_edit) {
      setValue("name", data_edit.name);
      setValue("description", data_edit.description);
      setValue("documentNumber", data_edit.documentNumber);
      setValue("location", data_edit.location);
      setValue("category", data_edit.category);
    }
  }, []);

  //Prepare contract write
  const { write, data } = useContractWrite({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "addCompany",
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  if(isSuccess){
    setCurrentPage(Pagination.Profile)
  }

  const handleEditProfileSubmit = (data: Company | any) => {
    write?.({
      args: [
        data.name,
        data.description,
        data.documentNumber,
        data.location,
        data.category,
      ],
    });

    console.log("handleEditProfileSubmit:");
    console.log(data);
  };
  // End add company

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
            <Button
              variant="contained"
              type="submit"
              disabled={!write || isLoading}
            >
              <Typography variant="subtitle2" fontWeight="600">
                {isLoading ? "Salvando..." : "Salvar edição"}
              </Typography>
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
