import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormProvider, useForm } from "react-hook-form";
import { suggestionRecord } from "./supply-chain-viewer.utils";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

export const SupplyChainViewerPage: React.FC = () => {
  const form = useForm();
  const { register, handleSubmit } = form;

  const MOCK_SUPPLY_CHAIN = {
    name: "Cadeia Mock chain",
    description: "Cadeia de suprimentos de mocks para um aplicativo web",
  };

  const MOCK_MEMBERS = [
    { name: "Otávioooooooo", documentNumber: "0000000000000000" },
    { name: "Mocks S.A", documentNumber: "12345678" },
  ];

  const MOCK_SUGGESTIONS = [
    { id: 1, type: "CHANGE_NAME", isClosed: false, vote: null },
    { id: 2, type: "CHANGE_DESCRIPTION", isClosed: true, vote: true },
    { id: 3, type: "ADD_MEMBER", isClosed: false, vote: false },
    { id: 4, type: "REMOVE_MEMBER", isClosed: true, vote: null },
  ];

  const MOCK_ASSETS = [
    {
      id: 1,
      description: "Asset mockado por Limasturbo",
      from: "abcdefg",
      createdAt: 120,
    },
    {
      id: 2,
      description: "Asset mockado por Limamei",
      from: "a1b2c3d4e5",
      createdAt: 120,
    },
    {
      id: 3,
      description: "Asset mockado por Limamou",
      from: "z9y8x7w6",
      createdAt: 120,
    },
    {
      id: 4,
      description: "Asset mockado por Lima C. tei",
      from: "ekrjhcgxi",
      createdAt: 120,
    },
  ];

  const handleSubmitToSendAsset = (id: number) => {
    console.log(id);
    // INTEGRAÇÃO PARA ENVIAR ASSET
  };

  const handleVoteSuggestion = (id: number, vote: boolean) => {
    // INTEGRAR A PARTIR DO ID
  };

  const handleVoteAsset = (id: number, vote: boolean) => {
    // INTEGRAR A PARTIR DO ID
  };

  return (
    <div className="d-flex flex-column gap-3 p-3">
      <div className="d-flex justify-content-between">
        <Typography variant="h4">{MOCK_SUPPLY_CHAIN.name}</Typography>
        <Button variant="outlined" color="error">
          <Typography variant="subtitle2" fontWeight="600">
            Sair da cadeia de suprimentos
          </Typography>
        </Button>
      </div>
      <Typography variant="subtitle1">
        {MOCK_SUPPLY_CHAIN.description}
      </Typography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="members-content"
          id="members-header"
        >
          <Typography variant="h6">Membros da cadeia</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {MOCK_MEMBERS.length && (
            <Stack spacing={2}>
              {MOCK_MEMBERS.map((member, index) => {
                return (
                  <FormProvider {...form}>
                    <form
                      onSubmit={handleSubmit((data) =>
                        handleSubmitToSendAsset(data[`assetID${index}`])
                      )}
                    >
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column">
                          <Typography variant="h6">{member.name}</Typography>
                          <Typography variant="subtitle2">
                            {member.documentNumber}
                          </Typography>
                        </div>
                        <div className="d-flex gap-3">
                          <TextField
                            id={`assetID${index}`}
                            label="ID do Asset"
                            {...register(`assetID${index}`)}
                          />

                          <Button variant="outlined" type="submit">
                            <Typography variant="subtitle2" fontWeight="500">
                              Enviar Asset
                            </Typography>
                          </Button>
                        </div>
                      </div>
                    </form>
                  </FormProvider>
                );
              })}
            </Stack>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="suggestions-content"
          id="suggestions-header"
        >
          <Typography variant="h6">Sugestões</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {MOCK_SUGGESTIONS.length && (
            <Stack spacing={2}>
              {MOCK_SUGGESTIONS.map((suggestion) => {
                return (
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      {suggestion.isClosed ? (
                        <LockOutlinedIcon />
                      ) : (
                        <LockOpenOutlinedIcon />
                      )}

                      <Typography variant="h6">
                        {suggestionRecord[suggestion.type]}
                      </Typography>
                    </div>
                    <div className="d-flex gap-3">
                      <Button
                        color="error"
                        variant={
                          suggestion.vote === false ? "contained" : "outlined"
                        }
                        disabled={
                          suggestion.vote !== null || suggestion.isClosed
                        }
                        onClick={() =>
                          handleVoteSuggestion(suggestion.id, false)
                        }
                      >
                        <Typography variant="subtitle2" fontWeight="500">
                          Rejeitar
                        </Typography>
                      </Button>

                      <Button
                        color="success"
                        variant={
                          suggestion.vote === true ? "contained" : "outlined"
                        }
                        disabled={
                          suggestion.vote !== null || suggestion.isClosed
                        }
                        onClick={() =>
                          handleVoteSuggestion(suggestion.id, false)
                        }
                      >
                        <Typography variant="subtitle2" fontWeight="500">
                          Aprovar
                        </Typography>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </Stack>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="assets-content"
          id="assets-header"
        >
          <Typography variant="h6">Assets a receber</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {MOCK_ASSETS.length && (
            <Stack spacing={2}>
              {MOCK_ASSETS.map((asset) => {
                return (
                  <div className="d-flex justify-content-between">
                    <Typography variant="h6">
                      Asset Id: {asset.id} | {asset.description} | Remetente:{" "}
                      {asset.from}
                    </Typography>
                    <div className="d-flex gap-3">
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => handleVoteAsset(asset.id, false)}
                      >
                        <Typography variant="subtitle2" fontWeight="500">
                          Recusar
                        </Typography>
                      </Button>
                      <Button
                        color="success"
                        variant="outlined"
                        onClick={() => handleVoteAsset(asset.id, true)}
                      >
                        <Typography variant="subtitle2" fontWeight="500">
                          Aceitar
                        </Typography>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </Stack>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="myAssets-content"
          id="myAssets-header"
        >
          <div className="d-flex justify-content-between w-100">
            <Typography variant="h6">Meus assets</Typography>

            <div className="px-3">
              <Button
                color="success"
                variant="outlined"
                onClick={(event) => {
                  event.stopPropagation();
                  // handleVoteSuggestion(suggestion.id, false);
                }}
              >
                <Typography variant="subtitle2" fontWeight="500">
                  Criar asset
                </Typography>
              </Button>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {MOCK_ASSETS.length && (
            <Stack spacing={2}>
              {MOCK_ASSETS.map((asset) => {
                const timeStampDate = new Date(asset.createdAt).toString();

                return (
                  <Typography variant="h6">
                    Asset Id: {asset.id} | {asset.description} | Remetente:{" "}
                    {asset.from} | {timeStampDate}
                  </Typography>
                );
              })}
            </Stack>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
