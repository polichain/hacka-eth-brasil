import { Button, Typography } from "@mui/material";
import { Address, useContractWrite } from "wagmi";
import contractConfig from "../../contracts/contract-config.json";
import { Pagination } from "../../types/pagination.type";

interface SupplyChainInvitePageProps {
  supplyChainInviteID: number;
}

export const SupplyChainInvitePage: React.FC<SupplyChainInvitePageProps> = ({ supplyChainInviteID }: SupplyChainInvitePageProps) => {
  const { write, data, error, isLoading, isError } = useContractWrite({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "enterSupplyChain",
    args: [supplyChainInviteID]
  });

  function setCurrentPage(SupplyChainInvite: any) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="d-flex flex-column align-items-center p-3">
      <Typography variant="h5">
        Você foi convidado para a seguinte cadeia de suprimentos:
      </Typography>
      <Typography variant="h4" className="p-2">
        Deseja entrar na supply chain: {supplyChainInviteID}
      </Typography>

      <Button
        variant="outlined"
        onClick={() => {
          write();
          setCurrentPage(Pagination.SupplyChainInvite);
        }}
      >
        <Typography variant="subtitle2" fontWeight="600">
          Aceitar convite
        </Typography>
      </Button>
    </div>
  );
};
