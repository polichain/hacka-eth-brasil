import { Button, Typography } from "@mui/material";
import { Pagination } from "../../types";

interface RoleSelectorPageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const RoleSelectorPage: React.FC<RoleSelectorPageProps> = ({
  setCurrentPage,
}: RoleSelectorPageProps) => {
  return (
    <div className="d-flex justify-content-center gap-3 p-3">
      <Button
        variant="outlined"
        onClick={() => setCurrentPage(Pagination.UserFilter)}
      >
        <Typography variant="subtitle2" fontWeight="600">
          Sou um usuário
        </Typography>
      </Button>

      <Button
        variant="outlined"
        onClick={() => setCurrentPage(Pagination.SignUp)}
      >
        <Typography variant="subtitle2" fontWeight="600">
          Sou uma empresa
        </Typography>
      </Button>
    </div>
  );
};
