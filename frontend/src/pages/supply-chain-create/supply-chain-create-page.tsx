import { Button, TextField, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import contractConfig from "../../contracts/contract-config.json";
import { Address, useContractWrite } from "wagmi";
import { Pagination } from "../../types";

interface SupplyChainCreatePageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const SupplyChainCreatePage: React.FC<SupplyChainCreatePageProps> = ({
  setCurrentPage,
}: SupplyChainCreatePageProps) => {
  const form = useForm();
  const { handleSubmit, register } = form;

  const { write, data, error, isLoading, isError } = useContractWrite({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "createSupplyChain",
  });

  const handleSupplyChainSubmit = (data: any) => {
    write?.({
      args: [data.name, data.description],
    });
    setCurrentPage(Pagination.SupplyChainList);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit((data) => handleSupplyChainSubmit(data))}>
        <div className="d-flex flex-column align-items-center px-3 pt-3 gap-3">
          <Typography variant="h6">
            Complete o cadastro de sua cadeia de suprimentos:
          </Typography>

          <TextField
            id="name"
            {...register("name", { required: true })}
            label="Nome da Cadeia de Suprimentos"
            sx={{ width: "50%" }}
          />
          <TextField
            id="description"
            {...register("description", { required: true })}
            label="Descrição"
            sx={{ width: "50%" }}
          />

          <div className="d-flex flex-column align-items-center w-30">
            <Button variant="outlined" type="submit">
              <Typography variant="subtitle2" fontWeight="600">
                Criar cadeia
              </Typography>
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
