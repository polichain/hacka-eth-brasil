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
import SearchIcon from "@mui/icons-material/Search";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import contractConfig from "./contracts/contract-config.json";

export function App() {
  const { isConnected, address } = useAccount();
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState<Pagination>(Pagination.Login);
  const [selectedRole, setSelectedRole] = useState<Role>();

  // Get contract data
  const getCompanyByAddress:Company|any = useContractRead({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "getCompany",
    args: [address],
  }).data;
  // End get contract data

  console.log("getCompanyByAddress: ")
  console.log(getCompanyByAddress)
  useEffect(() => {
    if (!isConnected) {
      setCurrentPage(Pagination.Login);
    } else {
      if (currentPage === Pagination.Login) {
        setCurrentPage(Pagination.RoleSelector);
        // if (true) {
        //   setCurrentPage(Pagination.Profile);
        // } else {
        // setCurrentPage(Pagination.RoleSelector);
        // }
      }
    }
        if(getCompanyByAddress?.name){
          setCurrentPage(Pagination.Profile);  
        } else {
        setCurrentPage(Pagination.SignUp);
        }
      // if (true) {
      //   setCurrentPage(Pagination.Profile);
      // } else {
      //   setCurrentPage(Pagination.SignUp);
      // }
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
            Título do Projeto
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
        {currentPage === Pagination.SignUp && <SignupPage />}
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

        {selectedRole && (
          <BottomNavigation
            sx={{
              width: "100%",
              position: "absolute",
              bottom: 0,
              backgroundColor: "#212121",
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
                label="Lista de empresas"
                value={Pagination.CompaniesList}
                icon={<FormatListBulletedIcon />}
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
