import { Stack, Typography } from "@mui/material";
import { Pagination } from "../../types";
import { Address, useContractRead } from "wagmi";
import contractConfig from "../../contracts/contract-config.json";

interface SupplyChainInvitesListPageProps {
  setCurrentPage: (page: Pagination) => void;
  setSupplyChainInviteID: (id: number) => void;
}

export const SupplyChainInvitesListPage: React.FC<
  SupplyChainInvitesListPageProps
> = ({
  setCurrentPage,
  setSupplyChainInviteID,
}: SupplyChainInvitesListPageProps) => {
  const invites_list: number[] =
    (useContractRead({
      address: contractConfig.address as Address,
      abi: contractConfig.abi,
      functionName: "getInvites",
    }).data as number[]) ?? [];

  return (
    <div className="d-flex flex-column align-items-center">
      <Typography variant="h5" className="py-3">
        Convites para cadeias de suprimentos
      </Typography>
      {invites_list.length ? (
        <Stack spacing={1}>
          {invites_list.map((invite) => {
            return (
              <div
                className="d-flex flex-column justify-content-between align-items-center px-3 py-2 bg-info rounded"
                key={invite}
                role="button"
                onClick={() => {
                  setCurrentPage(Pagination.SupplyChainInvite);
                  setSupplyChainInviteID(invite);
                }}
              >
                <Typography variant="h6" color="ButtonText" fontWeight="600">
                  Você foi convidado para a SupplyChain: {invite}
                </Typography>
              </div>
            );
          })}
        </Stack>
      ) : (
        <Typography variant="subtitle1">
          No momento, você ainda não foi convidado para participar de nenhuma
          cadeia de suprimentos!
        </Typography>
      )}
    </div>
  );
};
