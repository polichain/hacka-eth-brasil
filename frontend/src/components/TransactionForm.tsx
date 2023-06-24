import React, { ChangeEventHandler, useEffect, useState } from "react";
import {
  TextField,
  Stack,
  Typography,
  Box,
  Snackbar,
  AlertProps,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Address,
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import contractConfig from "../contracts/contract-config.json";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransactionForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarText, setSnackbarText] = useState<string>("");
  const [severitySnackbar, setSeveritySnackbar] = useState<AlertColor>("error");

  // Variável form
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [documento, setDocumento] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [categoria, setCategoria] = useState('');
  
  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleDescricaoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescricao(event.target.value);
  };

  const handleDocumentoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumento(event.target.value);
  };

  const handleLocalizacaoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalizacao(event.target.value);
  };

  const handleCategoriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoria(event.target.value);
  };

  // Fim variável form

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  // Get contract data
  const sharesData = useContractRead({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: 'getCompany',
    args: ['0xBcd4042DE499D14e55001CcbB24a551F3b954096'],
    watch: true
  })
  // End get contract data

  // Start add company
  const addCompanyWrite = useContractWrite({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "addCompany",
    onError(error) {
      setSeveritySnackbar("error");
      setOpenSnackbar(true);
      setSnackbarText(error.message || "");
    },
    onSuccess(data) {
      setSeveritySnackbar("success");
      setOpenSnackbar(true);
      setSnackbarText("Deposito efetuado com sucesso!");
    },
  });
  const waitAddCompanyWrite = useWaitForTransaction({ hash: addCompanyWrite.data?.hash });

  const handleAddCompany = () => {
    addCompanyWrite.write({
      args: [nome, descricao, documento, localizacao, categoria],
    });
  };
  // End add company
  
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          id="nome"
          label="Nome"
          type="string"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={nome}
          onChange={handleNomeChange}
        />
        <TextField
          id="descricao"
          label="Descrição"
          type="string"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={descricao}
          onChange={handleDescricaoChange}
        />
        <TextField
          id="documento"
          label="Documento"
          type="string"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={documento}
          onChange={handleDocumentoChange}
        />
        <TextField
          id="localizacao"
          label="Localização"
          type="string"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={localizacao}
          onChange={handleLocalizacaoChange}
        />
        <TextField
          id="categoria"
          label="Categoria"
          type="string"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={categoria}
          onChange={handleCategoriaChange}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
          <LoadingButton loading={addCompanyWrite.isLoading || waitAddCompanyWrite.isLoading} variant="outlined" color="primary" onClick={handleAddCompany}>
            Deposit
          </LoadingButton>
      </Stack>
      <Typography variant="body1">Shares: {sharesData.data?.toString() ?? 0}</Typography>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={severitySnackbar} sx={{ width: '100%' }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TransactionForm;
