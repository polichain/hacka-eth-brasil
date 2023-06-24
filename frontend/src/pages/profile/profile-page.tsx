import { Button, TextField, Typography } from "@mui/material";
import { Company, Pagination } from "../../types";

const MOCK_PROFILE: Company = {
  name: "Teste mock",
  cnpj: "123456789",
  category: "Teste mock",
  description: "Teste mock",
  address: "Teste mock",
};

interface ProfilePageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  setCurrentPage,
}: ProfilePageProps) => {
  return (
    <div className="d-flex flex-column px-3 pt-3 gap-3">
      <div className="d-flex gap-3">
        <TextField
          id="name"
          label="Nome da Empresa"
          sx={{ width: "50%" }}
          value={MOCK_PROFILE.name}
          disabled
        />
        <TextField
          id="cnpj"
          label="CNPJ da Empresa"
          sx={{ width: "50%" }}
          value={MOCK_PROFILE.cnpj}
          disabled
        />
      </div>

      <TextField
        id="description"
        label="Descrição"
        value={MOCK_PROFILE.description}
        disabled
      />

      <div className="d-flex gap-3 w-100">
        <TextField
          id="address"
          label="Endereço da Empresa"
          sx={{ width: "50%" }}
          value={MOCK_PROFILE.address}
          disabled
        />
        <TextField
          id="category"
          label="Categoria da Empresa"
          sx={{ width: "50%" }}
          value={MOCK_PROFILE.category}
          disabled
        />
      </div>

      <div className="d-flex flex-column align-items-center w-30">
        <Button
          variant="outlined"
          onClick={() => setCurrentPage(Pagination.EditProfile)}
        >
          <Typography variant="subtitle2" fontWeight="600">
            Editar perfil
          </Typography>
        </Button>
      </div>
    </div>
  );
};
