import { Button, Typography } from "@mui/material";
import { Pagination, Role } from "../../types";

interface RoleSelectorPageProps {
  setCurrentPage: (page: Pagination) => void;
  setSelectedRole: (role: Role) => void;
}

export const RoleSelectorPage: React.FC<RoleSelectorPageProps> = ({
  setCurrentPage,
  setSelectedRole,
}: RoleSelectorPageProps) => {
  return (
    <div className="d-flex justify-content-center gap-3 p-3">
      <Button
        variant="outlined"
        onClick={() => {
          setCurrentPage(Pagination.UserFilter);
          setSelectedRole(Role.user);
        }}
      >
        <Typography variant="subtitle2" fontWeight="600">
          Sou um usuário
        </Typography>
      </Button>

      <Button
        variant="outlined"
        onClick={() => {
          setCurrentPage(Pagination.SignUp);
          setSelectedRole(Role.company);
        }}
      >
        <Typography variant="subtitle2" fontWeight="600">
          Sou uma empresa
        </Typography>
      </Button>
    </div>
  );
};
