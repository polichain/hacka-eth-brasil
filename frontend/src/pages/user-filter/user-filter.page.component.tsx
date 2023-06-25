import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import { SearchType } from "./search-type.enum";
import { Address, useContractRead } from "wagmi";
import contractConfig from "../../contracts/contract-config.json";
import { Company } from "../../types";

export const UserFilterPage: React.FC = () => {
  const [searchType, setSearchType] = useState<SearchType>(SearchType.company);
  const [data, setData] = useState<any>()
  const [companyCallState, setCompanyCallState] = useState<Company>()
  const [supplyChainState, setSupplyChainState] = useState<string>()
  const buttonVariant = (buttonFunction: SearchType) => {
    return buttonFunction === searchType ? "contained" : "outlined";
  };

  const form = useForm();
  const { handleSubmit, register } = form;

  const null_company: Company = {
    name: "",
    documentNumber: "",
  }

  const companyCall = useContractRead({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "getCompany",
    args: [data?.companyAddress]
  }).data as Company ?? null_company;

  const supplyChain = useContractRead({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "getSupplyChain",
    args: [data?.supplyChainID]
  }).data as string ?? "";


  useEffect(() => {
    // let ignore = false;

    const fetchData = async (data: any) => {
      const companyCall = useContractRead({
        address: contractConfig.address as Address,
        abi: contractConfig.abi,
        functionName: "getCompany",
        args: [data?.companyAddress]
      }).data as Company ?? null_company;

      const supplyChain = useContractRead({
        address: contractConfig.address as Address,
        abi: contractConfig.abi,
        functionName: "getSupplyChain",
        args: [data?.supplyChainID]
      }).data as string ?? "";

      setCompanyCallState(companyCall)
      setSupplyChainState(supplyChain)
    }

    // async function fetchData() {
    //   const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query);
    //   if (!ignore) setData(result.data);
    // }
    fetchData(data);
  }, []);

  const handleSearchSubmit = (data: any) => {

    setData(data)
    console.log(data)
    if (searchType === SearchType.company) {

    } else if (searchType === SearchType.supplyChain) {
      // TODO - Exibir resultado
    } else {
      // Integração para pesquisar produto
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit((data) => handleSearchSubmit(data))}>
        <div className="d-flex flex-column align-items-center px-3 pt-3 gap-3">
          <div className="d-flex gap-3">
            <Button
              variant={buttonVariant(SearchType.company)}
              onClick={() => setSearchType(SearchType.company)}
            >
              <Typography variant="subtitle2" fontWeight="600">
                Pesquisar empresa
              </Typography>
            </Button>

            <Button
              variant={buttonVariant(SearchType.supplyChain)}
              onClick={() => setSearchType(SearchType.supplyChain)}
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
            {searchType === SearchType.supplyChain && <p>Supply chain: {supplyChain}</p>}
            {searchType === SearchType.company &&
              <>
                <p>Company call name: {companyCall.name}</p>
                <p>Company call document: {companyCall.documentNumber}</p>
              </>
            }
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
