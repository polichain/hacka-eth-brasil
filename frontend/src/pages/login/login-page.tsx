import { Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const LoginPage: React.FC = () => {
  return (
    <div className="d-flex flex-column align-items-center pt-3 gap-3">
      <Typography variant="h6">
        Clique no botão abaixo para se conectar
      </Typography>
      <ConnectButton />
    </div>
  );
};
