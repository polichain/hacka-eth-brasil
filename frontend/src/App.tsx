import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { Company, Pagination, Role } from "./types";
import { useEffect, useState } from "react";
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";
import { ProfilePage } from "./pages/profile";
import { EditProfilePage } from "./pages/edit-profile";
import { Address, useAccount, useContractRead, useContractWrite } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CompaniesListPage } from "./pages/companies-list";
import { UserFilterPage } from "./pages/user-filter";
import { RoleSelectorPage } from "./pages/role-selector";
import { SupplyChainListPage } from "./pages/supply-chain-list";
import { SupplyChainInvitePage } from "./pages/supply-chain-invite";
import { SupplyChainInvitesListPage } from "./pages/supply-chain-invites-list";
import SearchIcon from "@mui/icons-material/Search";
import LinkIcon from "@mui/icons-material/Link";
import ApartmentIcon from "@mui/icons-material/Apartment";
import contractConfig from "./contracts/contract-config.json";
import { SupplyChainViewerPage } from "./pages/supply-chain-viewer";

export function App() {
  const { isConnected, address } = useAccount();
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState<Pagination>(
    Pagination.SupplyChainViewer
  );
  const [selectedRole, setSelectedRole] = useState<Role>();

  // Get contract data
  const getCompanyByAddress: Company | any = useContractRead({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "getCompany",
    args: [address],
  }).data;
  // End get contract data

  useEffect(() => {
    if (!isConnected) {
      setCurrentPage(Pagination.Login);
    } else {
      if (currentPage === Pagination.Login) {
        if (getCompanyByAddress?.name) {
          setCurrentPage(Pagination.Profile);
        } else {
          setCurrentPage(Pagination.RoleSelector);
        }
      }
    }
  }, [isConnected]);

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
        height: "100vh",
      }}
    >
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Toolbar sx={{ backgroundColor: "#212121" }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            ChainLinker
          </Typography>
          <ConnectButton />
        </Toolbar>
      </AppBar>

      <div className="d-flex flex-column justify-content-between">
        {currentPage === Pagination.Login && <LoginPage />}
        {currentPage === Pagination.RoleSelector && (
          <RoleSelectorPage
            setCurrentPage={setCurrentPage}
            setSelectedRole={setSelectedRole}
          />
        )}
        {currentPage === Pagination.SignUp && (
          <SignupPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === Pagination.UserFilter && <UserFilterPage />}
        {currentPage === Pagination.Profile && (
          <ProfilePage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === Pagination.EditProfile && (
          <EditProfilePage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === Pagination.CompaniesList && (
          <CompaniesListPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === Pagination.SupplyChainList && (
          <SupplyChainListPage setCurrentPage={setCurrentPage} />
        )}

        {currentPage === Pagination.SupplyChainViewer && (
          <SupplyChainViewerPage />
        )}
        {currentPage === Pagination.SupplyChainInvite && (
          <SupplyChainInvitePage />
        )}
        {currentPage === Pagination.SupplyChainInvitesList && (
          <SupplyChainInvitesListPage setCurrentPage={setCurrentPage} />
        )}

        {selectedRole && (
          <BottomNavigation
            sx={{
              backgroundColor: "#212121",
              width: "100%",
              position: "absolute",
              bottom: 0,
              paddingTop: "32px",
              paddingBottom: "32px",
            }}
            value={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            showLabels
          >
            {selectedRole === Role.company && (
              <BottomNavigationAction
                label="Perfil"
                value={Pagination.Profile}
                icon={<ApartmentIcon />}
              />
            )}

            {selectedRole === Role.company && (
              <BottomNavigationAction
                label="Cadeias de suprimentos"
                value={Pagination.SupplyChainList}
                icon={<LinkIcon />}
              />
            )}

            {selectedRole === Role.user && (
              <BottomNavigationAction
                label="Procurar"
                value={Pagination.UserFilter}
                icon={<SearchIcon />}
              />
            )}
          </BottomNavigation>
        )}
      </div>
    </div>
  );
}
