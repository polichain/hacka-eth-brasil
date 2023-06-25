import * as React from 'react';
import { MenuItem, FormControl, Button, TextField, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useForm } from "react-hook-form";
import contractConfig from "../../contracts/contract-config.json";
import { Address, useContractWrite } from "wagmi";
import { Pagination } from "../../types";

interface SupplyChainSuggestionPageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const SupplyChainSuggestionPage: React.FC<SupplyChainSuggestionPageProps> = ({
  setCurrentPage,
}: SupplyChainSuggestionPageProps) => {
  const form = useForm();
  const { handleSubmit, register } = form;
  const [suggestion, setSuggestion] = React.useState('');
  const [suggestionLabel, setSuggestionLabel] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSuggestion(event.target.value as string);
    switch (+event.target.value) {
      case 1:
        setSuggestionLabel('Digite uma sugestão para alterar o nome:');
        break;
      case 2:
        setSuggestionLabel('Digite uma sugestão para alterar a descrição:');
        break;
      case 3:
        setSuggestionLabel('Digite uma sugestão para adicionar um membro:');
        break;
      case 4:
        setSuggestionLabel('Digite uma sugestão para remover um membro:');
        break;
      default:
        setSuggestionLabel('Digite uma sugestão para a cadeia de suprimentos:');
    }
  };

  const { write, data, error, isLoading, isError } = useContractWrite({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "createSupplyChain", // mudar 
  });

  const handleSupplyChainSuggestionSubmit = (data: any) => {
    write?.({
      args: [data.name, data.description], // mudar
    });
    setCurrentPage(Pagination.Login); // mudar
  };  

  return (
    <FormControl fullWidth>
      <div className="d-flex flex-column align-items-center px-3 pt-3 gap-3">

          <Typography variant="h6">
            Selecione um tipo de sugestão
          </Typography>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={suggestion}
            onChange={handleChange}
          >
            <MenuItem value={1}>Alterar Nome</MenuItem>
            <MenuItem value={2}>Alterar Descrição </MenuItem>
            <MenuItem value={3}>Adicionar Membro</MenuItem>
            <MenuItem value={4}>Remover Membro</MenuItem>

          </Select>

          <Typography variant="h6">
            {suggestionLabel}
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
    
  </FormControl>
  );
};
