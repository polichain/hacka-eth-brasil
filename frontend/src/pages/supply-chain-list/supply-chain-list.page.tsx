import { Button, Stack, Typography } from "@mui/material";
import { Company, Pagination } from "../../types";
import { Address, useContractRead } from "wagmi";
import contractConfig from "../../contracts/contract-config.json";

interface SupplyChainListPageProps {
  setCurrentPage: (page: Pagination) => void;
  setSupplyChainId: (id: number) => void;
}

export const SupplyChainListPage: React.FC<SupplyChainListPageProps> = ({
  setCurrentPage,
  setSupplyChainId,
}: SupplyChainListPageProps) => {
  const supplyChainId_list: number[] =
    (useContractRead({
      address: contractConfig.address as Address,
      abi: contractConfig.abi,
      functionName: "getSupplyChainsParticipant",
      watch: true,
    }).data as number[]) ?? [];

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex justify-content-center gap-3 p-3">
        <Button
          variant="outlined"
          onClick={() => {
            setCurrentPage(Pagination.SupplyChainCreate);
          }}
        >
          <Typography variant="subtitle2" fontWeight="600">
            Criar cadeia de suprimentos
          </Typography>
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            setCurrentPage(Pagination.SupplyChainInvitesList);
          }}
        >
          <Typography variant="subtitle2" fontWeight="600">
            Ver convites para cadeias de suprimentos
          </Typography>
        </Button>
      </div>

      <Typography variant="h5" className="py-3">
        Lista de cadeias de suprimentos
      </Typography>
      {supplyChainId_list.length ? (
        <Stack spacing={1}>
          {supplyChainId_list.map((supplyChainId) => {
            return (
              <div
                className="d-flex justify-content-between align-items-center gap-5 p-2 bg-info rounded"
                key={supplyChainId}
                role="button"
                onClick={() => {
                  setSupplyChainId(supplyChainId);
                  setCurrentPage(Pagination.SupplyChainViewer);
                }}
              >
                <div className="d-flex flex-column">
                  <Typography variant="h6" color="ButtonText" fontWeight="600">
                    SupplyChain ID: {String(supplyChainId)}
                  </Typography>
                </div>
              </div>
            );
          })}
        </Stack>
      ) : (
        <Typography variant="subtitle1">
          No momento, você ainda não participa de nenhuma cadeia de suprimentos!
        </Typography>
      )}
    </div>
  );
};
