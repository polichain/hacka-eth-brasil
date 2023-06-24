import { Button, TextField, Typography } from "@mui/material";
import { Company, Pagination } from "../../types";
import contractConfig from "../../contracts/contract-config.json";
import { Address, useAccount, useContractRead } from "wagmi";
import { useEffect, useState } from "react";

const MOCK_PROFILE: Company = {
  name: "Teste mock",
  documentNumber: "123456789",
  category: "Teste mock",
  description: "Teste mock",
  location: "Teste mock",
};

interface ProfilePageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  setCurrentPage,
}: ProfilePageProps) => {
  const { address } = useAccount();
  const [formData, setFormData] = useState<Company>();

  const data_edit: Company | any = useContractRead({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "getCompany",
    args: [address],
  }).data;

  useEffect(() => {
    if (data_edit) {
      setFormData({
        name: data_edit.name,
        description: data_edit.description,
        documentNumber: data_edit.documentNumber,
        location: data_edit.location,
        category: data_edit.category,
      });
    }
  }, []);

  return (
    <div className="d-flex flex-column px-3 pt-3 gap-3">
      <div className="d-flex gap-3">
        <TextField
          id="name"
          label="Nome da Empresa"
          sx={{ width: "50%" }}
          value={formData?.name}
          disabled
        />
        <TextField
          id="cnpj"
          label="CNPJ da Empresa"
          sx={{ width: "50%" }}
          value={formData?.documentNumber}
          disabled
        />
      </div>

      <TextField
        id="description"
        label="Descrição"
        value={formData?.description}
        disabled
      />

      <div className="d-flex gap-3 w-100">
        <TextField
          id="address"
          label="Endereço da Empresa"
          sx={{ width: "50%" }}
          value={formData?.location}
          disabled
        />
        <TextField
          id="category"
          label="Categoria da Empresa"
          sx={{ width: "50%" }}
          value={formData?.category}
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
