import { Button, TextField, Typography } from "@mui/material";
import { Company, Pagination } from "../../types";
import contractConfig from "../../contracts/contract-config.json";
import { Address, useAccount, useContractRead } from "wagmi";
import { useEffect, useState } from "react";

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
    watch: true,
  }).data;

  useEffect(() => {
    if (data_edit) {
      setFormData({
        name: data_edit.name,
        documentNumber: data_edit.documentNumber,
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
          id="documentNumber"
          label="CNPJ da Empresa"
          sx={{ width: "50%" }}
          value={formData?.documentNumber}
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
