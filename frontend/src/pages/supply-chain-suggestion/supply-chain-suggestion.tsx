import { Button, TextField, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import contractConfig from "../../contracts/contract-config.json";
import { Address, useContractWrite } from "wagmi";
import { Company, Pagination } from "../../types";
import { LoginPage } from "../login";

interface SupplyChainSuggestionPageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const SupplyChainSuggestionPage: React.FC<SupplyChainSuggestionPageProps> = ({
  setCurrentPage,
}: SupplyChainSuggestionPageProps) => {
  const form = useForm();
  const { handleSubmit, register } = form;

  const { write, data, error, isLoading, isError } = useContractWrite({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "createSupplyChain", // mudar aq
  });

  const handleSupplyChainSuggestionSubmit = (data: any) => {
    write?.({
      args: [data.name, data.description],
    });
    setCurrentPage(Pagination.Login); // mudar
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit((data) => handleSupplyChainSuggestionSubmit(data))}>
        <div className="d-flex flex-column align-items-center px-3 pt-3 gap-3">
          <Typography variant="h6">
            Digite uma sugestão para a cadeia de suprimentos:
          </Typography>

        <TextField
            id="suggestion"
            {...register("suggestion", { required: true })}
            label="Sugestão"
            sx={{ width: "50%" }}
        />

        <div className="d-flex flex-column align-items-center w-30">
        <Button variant="outlined" type="submit">
            <Typography variant="subtitle2" fontWeight="600">
            Publicar sugestão
            </Typography>
        </Button>
        </div>
        </div>
      </form>
    </FormProvider>
  );
};
