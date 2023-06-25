import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormProvider, useForm } from "react-hook-form";
import { suggestionRecord } from "./supply-chain-viewer.utils";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { Pagination } from "../../types/pagination.type";
import { Role } from "../../types";

interface SupplyChainViewerPageProps {
  supplyChainId: number;
  setCurrentPage?: (page: Pagination) => void;
  role: Role;
}

export const SupplyChainViewerPage: React.FC<SupplyChainViewerPageProps> = ({
  supplyChainId,
  setCurrentPage,
  role,
}) => {
  const form = useForm();
  const { register, handleSubmit } = form;

  // INTEGRAR: id da supply dentro da variável 'supplyChainId'

  const MOCK_SUPPLYCHAIN = {
    name: "Cadeia Vinhos Merlot",
    description: "Cadeia de produção de um lote de vinho",
    members: [
      {
        name: "Sítio Nossa Sra. do Louvre",
        documentNumber: "57.981.613/0001-74",
      },
      { name: "JadLog Logística S.A.", documentNumber: "04.884.082/0001-35" },
      { name: "Vínicola Ascenção", documentNumber: "23.872.957/0001-23" },
    ],
    suggestions: [
      { id: 1, type: "CHANGE_DESCRIPTION", isClosed: true, vote: true },
      { id: 2, type: "ADD_MEMBER", isClosed: true, vote: true },
      { id: 3, type: "ADD_MEMBER", isClosed: true, vote: true },
      { id: 4, type: "CHANGE_NAME", isClosed: false, vote: null },
    ],
    assetsToReceive: [
      {
        id: 4,
        description: "Lote 4 - Vinho Merlot",
        from: "JadLog Logística S.A.",
      },
      {
        id: 5,
        description: "Lote 5 - Vinho Merlot",
        from: "JadLog Logística S.A.",
      },
    ],
    myAssets: [
      {
        id: 1,
        description: "Lote 1 - Vinho Merlot",
        from: "JadLog Logística S.A.",
        createdAt: 1656098400000,
      },
      {
        id: 2,
        description: "Lote 2 - Vinho Merlot",
        from: "JadLog Logística S.A.",
        createdAt: 1659398400000,
      },
      {
        id: 3,
        description: "Lote 3 - Vinho Merlot",
        from: "JadLog Logística S.A.",
        createdAt: 1661498400000,
      },
    ],
  };
  const handleSubmitToSendAsset = (id: number) => {
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
        <Typography variant="h4">{MOCK_SUPPLYCHAIN.name}</Typography>
        {role === Role.company && (
          <Button variant="outlined" color="error">
            <Typography variant="subtitle2" fontWeight="600">
              Sair da cadeia de suprimentos
            </Typography>
          </Button>
        )}
      </div>
      <Typography variant="subtitle1">
        {MOCK_SUPPLYCHAIN.description}
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
          {MOCK_SUPPLYCHAIN.members.length && (
            <Stack spacing={2}>
              {MOCK_SUPPLYCHAIN.members.map((member, index) => {
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
                        {role === Role.company && (
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
                        )}
                      </div>
                    </form>
                  </FormProvider>
                );
              })}
            </Stack>
          )}
        </AccordionDetails>
      </Accordion>

      {role === Role.company && (
        <>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="suggestions-content"
              id="suggestions-header"
            >
              <div className="d-flex justify-content-between w-100">
                <Typography variant="h6">Sugestões</Typography>

                <div className="px-3">
                  <Button
                    color="success"
                    variant="outlined"
                    onClick={(event) => {
                      event.stopPropagation();
                      setCurrentPage?.(Pagination.SupplyChainSuggestion);
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="500">
                      Criar sugestão
                    </Typography>
                  </Button>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {MOCK_SUPPLYCHAIN.suggestions.length && (
                <Stack spacing={2}>
                  {MOCK_SUPPLYCHAIN.suggestions.map((suggestion) => {
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
                              suggestion.vote === false
                                ? "contained"
                                : "outlined"
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
                              suggestion.vote === true
                                ? "contained"
                                : "outlined"
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
              {MOCK_SUPPLYCHAIN.assetsToReceive.length && (
                <Stack spacing={2}>
                  {MOCK_SUPPLYCHAIN.assetsToReceive.map((asset) => {
                    return (
                      <div className="d-flex justify-content-between">
                        <Typography variant="h6">
                          Asset Id: {asset.id} | {asset.description} |
                          Remetente: {asset.from}
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
                      setCurrentPage?.(Pagination.AssetCreate);
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
              {MOCK_SUPPLYCHAIN.myAssets.length && (
                <Stack spacing={2}>
                  {MOCK_SUPPLYCHAIN.myAssets.map((asset) => {
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
        </>
      )}
    </div>
  );
};
