import * as React from "react";
import {
  MenuItem,
  FormControl,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useForm } from "react-hook-form";
import contractConfig from "../../contracts/contract-config.json";
import { Address, useContractWrite } from "wagmi";
import { Pagination } from "../../types";

interface SupplyChainSuggestionPageProps {
  setCurrentPage: (page: Pagination) => void;
  supplyChainId: number;
}

export const SupplyChainSuggestionPage: React.FC<SupplyChainSuggestionPageProps> = ({
  setCurrentPage, supplyChainId
}: SupplyChainSuggestionPageProps) => {
  const form = useForm();
  const { handleSubmit, register } = form;
  const [suggestion, setSuggestion] = React.useState<number>(1);
  const [parameterType, setParameterType] = React.useState<string>('string');
  const [suggestionLabel, setSuggestionLabel] = React.useState('Digite uma sugestão para alterar o nome:');

  const handleChange = (event: SelectChangeEvent) => {
    setSuggestion(+event.target.value);
    switch (+event.target.value) {
      case 0:
        setSuggestionLabel('Digite uma sugestão para alterar o nome:');
        setParameterType('string');
        break;
      case 1:
        setSuggestionLabel('Digite uma sugestão para alterar a descrição:');
        setParameterType('string');
        break;
      case 2:
        setSuggestionLabel('Digite uma sugestão para adicionar um membro:');
        setParameterType('address');
        break;
      case 3:
        setSuggestionLabel('Digite uma sugestão para remover um membro:');
        setParameterType('address');
        break;
      default:
        setSuggestionLabel("Digite uma sugestão para a cadeia de suprimentos:");
    }
  };

  const { write, data, error, isLoading, isError } = useContractWrite({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "makeSuggestion",
  });

  const handleSupplyChainSuggestionSubmit = (data: any) => {
    const argsEncoded = encodeParameter(parameterType, data.suggestion);
    write?.({
      args: [supplyChainId, suggestion, argsEncoded],
    });
    setCurrentPage(Pagination.SupplyChainViewer);
  };

  return (
    <FormControl fullWidth>
      <form
        onSubmit={handleSubmit((data) =>
          handleSupplyChainSuggestionSubmit(data)
        )}
      >
        <div className="d-flex flex-column align-items-center px-3 pt-3 gap-3">
          <Typography variant="h6">Selecione um tipo de sugestão</Typography>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={suggestion.toString()}
            onChange={handleChange}
          >
            <MenuItem value={0}>Alterar Nome</MenuItem>
            <MenuItem value={1}>Alterar Descrição </MenuItem>
            <MenuItem value={2}>Adicionar Membro</MenuItem>
            <MenuItem value={3}>Remover Membro</MenuItem>

          </Select>

          <Typography variant="h6">{suggestionLabel}</Typography>

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
    </FormControl>
  );
};
function encodeParameter(parameterType: string, suggestion: any) {
  throw new Error('Function not implemented.');
}

