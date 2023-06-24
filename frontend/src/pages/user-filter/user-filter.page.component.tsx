import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import { SearchType } from "./search-type.enum";

export const UserFilterPage: React.FC = () => {
  const [searchType, setSearchType] = useState<SearchType>(SearchType.company);

  const buttonVariant = (buttonFunction: SearchType) => {
    return buttonFunction === searchType ? "contained" : "outlined";
  };

  const form = useForm();
  const { handleSubmit, register } = form;

  const handleSearchSubmit = (data: any) => {
    if (searchType === SearchType.company) {
      // Integração para pesquisar empresa
    } else if (searchType === SearchType.supplyChain) {
      // Integração para pesquisar cadeia de suprimentos
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

            <Button
              variant={buttonVariant(SearchType.product)}
              onClick={() => setSearchType(SearchType.product)}
            >
              <Typography variant="subtitle2" fontWeight="600">
                Pesquisar produto
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

          {searchType === SearchType.product && (
            <TextField
              id="productID"
              {...register("productID", { required: true })}
              label="ID do produto"
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
        </div>
      </form>
    </FormProvider>
  );
};
