import { Button, Typography } from "@mui/material";

export const SupplyChainInvitePage: React.FC = () => {
  const MOCK_SUPPLYCHAIN_NAME = "Cadeia MockChain";

  return (
    <div className="d-flex flex-column align-items-center p-3">
      <Typography variant="h5">
        Você foi convidado para a seguinte cadeia de suprimentos:
      </Typography>
      <Typography variant="h4" className="p-2">
        {MOCK_SUPPLYCHAIN_NAME}
      </Typography>

      <Button
        variant="outlined"
        onClick={() => {
          // setCurrentPage(Pagination.SupplyChainInvite);
        }}
      >
        <Typography variant="subtitle2" fontWeight="600">
          Aceitar convite
        </Typography>
      </Button>
    </div>
  );
};
