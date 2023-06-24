import { Typography } from "@mui/material";

export const LoginPage: React.FC = () => {
  return (
    <div className="d-flex flex-column align-items-center pt-3 gap-3">
      <Typography variant="h5">
        Para se conectar, clique no botão "Connect Wallet" e selecione a sua
        carteira.
      </Typography>
    </div>
  );
};
