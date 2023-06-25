import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import { SearchType } from "./search-type.enum";
import { Address, useContractRead } from "wagmi";
import contractConfig from "../../contracts/contract-config.json";
import { Company, Role } from "../../types";
import { SupplyChainViewerPage } from "../supply-chain-viewer";

export const UserFilterPage: React.FC = () => {
  const [searchType, setSearchType] = useState<SearchType>(SearchType.company);
  const [data, setData] = useState<any>();
  const [showResult, setShowResult] = useState(false);

  const buttonVariant = (buttonFunction: SearchType) => {
    return buttonFunction === searchType ? "contained" : "outlined";
  };

  const form = useForm();
  const { handleSubmit, register } = form;

  const null_company: Company = {
    name: "",
    documentNumber: "",
  };

  const companyCall =
    (useContractRead({
      address: contractConfig.address as Address,
      abi: contractConfig.abi,
      functionName: "getCompany",
      args: [data?.companyAddress],
    }).data as Company) ?? null_company;

  const supplyChain =
    (useContractRead({
      address: contractConfig.address as Address,
      abi: contractConfig.abi,
      functionName: "getSupplyChain",
      args: [data?.supplyChainID],
    }).data as number) ?? 0;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit((data) => {
          setData(data);
          setShowResult(true);
        })}
      >
        <div className="d-flex flex-column align-items-center px-3 pt-3 gap-3">
          <div className="d-flex gap-3">
            <Button
              variant={buttonVariant(SearchType.company)}
              onClick={() => {
                setSearchType(SearchType.company);
                setShowResult(false);
              }}
            >
              <Typography variant="subtitle2" fontWeight="600">
                Pesquisar empresa
              </Typography>
            </Button>

            <Button
              variant={buttonVariant(SearchType.supplyChain)}
              onClick={() => {
                setSearchType(SearchType.supplyChain);
                setShowResult(false);
              }}
            >
              <Typography variant="subtitle2" fontWeight="600">
                Pesquisar cadeia de suprimentos
              </Typography>
            </Button>
          </div>

          {searchType === SearchType.company && (
            <TextField
              id="companyAddress"
              {...register("companyAddress", { required: true })}
              label="Carteira da empresa"
              sx={{ width: "50%" }}
            />
          )}

          {searchType !== SearchType.company && (
            <TextField
              id="supplyChainID"
              {...register("supplyChainID", { required: true })}
              label="ID da cadeia de suprimentos"
              sx={{ width: "50%" }}
            />
          )}

          <Button variant="contained" type="submit" startIcon={<SearchIcon />}>
            <Typography variant="subtitle2" fontWeight="600">
              Pesquisar
            </Typography>
          </Button>
          <div>
            {searchType === SearchType.supplyChain && showResult && (
              <div className="w-100">
                <SupplyChainViewerPage
                  supplyChainId={supplyChain}
                  role={Role.user}
                />
              </div>
            )}

            {searchType === SearchType.company && showResult && (
              <>
                <div className="d-flex px-3 pt-3 gap-3">
                  <TextField
                    id="companyName"
                    value={companyCall.name}
                    label="Nome da Empresa"
                    sx={{ width: "50%" }}
                    disabled
                  />
                  <TextField
                    id="companyDocumentNumber"
                    value={companyCall.documentNumber}
                    label="CNPJ da Empresa"
                    sx={{ width: "50%" }}
                    disabled
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
