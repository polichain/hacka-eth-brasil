import { Button, TextField, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import contractConfig from "../../contracts/contract-config.json";
import { Address, useContractWrite } from "wagmi";
import { Company, Pagination } from "../../types";

interface AssetCreatePageProps {
  setCurrentPage: (page: Pagination) => void;
  supplyChainId: number;
}

export const AssetCreatePage: React.FC<AssetCreatePageProps> = ({
  setCurrentPage, supplyChainId
}: AssetCreatePageProps) => {
  const form = useForm();
  const { handleSubmit, register } = form;

  const { write } = useContractWrite({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "createAsset",
  });

  const handleSupplyChainSubmit = (data: any) => {
    write?.({
      args: [supplyChainId, data.description],
    });
    setCurrentPage(Pagination.SupplyChainList);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit((data) => handleSupplyChainSubmit(data))}>
        <div className="d-flex flex-column align-items-center px-3 pt-3 gap-3">
          <Typography variant="h6">
            Escreva a descrição deste Asset:
          </Typography>

        <TextField
            id="description"
            {...register("description", { required: true })}
            label="Descrição"
            sx={{ width: "100%" }}
        />

        <div className="d-flex flex-column align-items-center w-30">
        <Button variant="outlined" type="submit">
            <Typography variant="subtitle2" fontWeight="600">
            Criar Asset
            </Typography>
        </Button>
        </div>
        </div>
      </form>
    </FormProvider>
  );
};
