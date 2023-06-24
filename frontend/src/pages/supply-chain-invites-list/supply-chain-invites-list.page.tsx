import { Stack, Typography } from "@mui/material";
import { Pagination } from "../../types";

const MOCK_INVITES = [
  "Produção de alface neon",
  "Cadeia MockChain 777",
  "Cadeia de Teste 3",
];

interface SupplyChainInvitesListPageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const SupplyChainInvitesListPage: React.FC<
  SupplyChainInvitesListPageProps
> = ({ setCurrentPage }: SupplyChainInvitesListPageProps) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <Typography variant="h5" className="py-3">
        Convites para cadeias de suprimentos
      </Typography>
      {MOCK_INVITES.length ? (
        <Stack spacing={1}>
          {MOCK_INVITES.map((invite) => {
            return (
              <div
                className="d-flex flex-column justify-content-between align-items-center px-3 py-2 bg-info rounded"
                key={invite}
                role="button"
                onClick={() => setCurrentPage(Pagination.SupplyChainInvite)}
              >
                <Typography variant="h6" color="ButtonText" fontWeight="600">
                  {invite}
                </Typography>
              </div>
            );
          })}
        </Stack>
      ) : (
        <Typography variant="subtitle1">
          No momento, você ainda não foi convidado para participar de nenhuma
          cadeia de suprimentos!
        </Typography>
      )}
    </div>
  );
};
