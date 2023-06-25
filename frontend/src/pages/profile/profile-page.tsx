import { Button, TextField, Typography } from "@mui/material";
import { Company, Pagination } from "../../types";
import contractConfig from "../../contracts/contract-config.json";
import { Address, useAccount, useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const ProfilePage: React.FC = () => {
  const { address } = useAccount();
  const form = useForm();
  const { register, setValue } = form;

  const data_edit: Company | any = useContractRead({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "getCompany",
    args: [address],
  }).data;

  useEffect(() => {
    if (data_edit) {
      setValue("name", data_edit.name);
      setValue("documentNumber", data_edit.documentNumber);
    }
  }, [data_edit]);

  return (
    <div className="d-flex px-3 pt-3 gap-3">
      <TextField
        id="name"
        {...register("name")}
        label="Nome da Empresa"
        sx={{ width: "50%" }}
        disabled
      />
      <TextField
        id="documentNumber"
        {...register("documentNumber")}
        label="CNPJ da Empresa"
        sx={{ width: "50%" }}
        disabled
      />
    </div>
  );
};
