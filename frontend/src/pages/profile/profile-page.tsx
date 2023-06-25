import { Button, TextField, Typography } from "@mui/material";
import { Company, Pagination } from "../../types";
import contractConfig from "../../contracts/contract-config.json";
import { Address, useAccount, useContractRead } from "wagmi";
import { useEffect, useState } from "react";

export const ProfilePage: React.FC = () => {
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
        documentNumber: data_edit.documentNumber,
      });
    }
  }, [data_edit]);

  return (
    <div className="d-flex px-3 pt-3 gap-3">
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
  );
};
