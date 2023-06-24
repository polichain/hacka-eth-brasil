import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useTheme,
} from "@mui/material";
import { Pagination } from "./types";
import { useEffect, useState } from "react";
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";
import { ProfilePage } from "./pages/profile";
import { EditProfilePage } from "./pages/edit-profile";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CompaniesListPage } from "./pages/companies-list";

export function App() {
  const { isConnected } = useAccount();
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState<Pagination>(
    Pagination.CompaniesList
  );

  useEffect(() => {
    if (!isConnected) {
      setCurrentPage(Pagination.Login);
    } else {
      if (currentPage === Pagination.Login) {
        setCurrentPage(Pagination.Profile);
      }
      // if (true) {
      //   setCurrentPage(Pagination.Profile);
      // } else {
      //   setCurrentPage(Pagination.SignUp);
      // }
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
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Título do Projeto
          </Typography>
          <ConnectButton />
        </Toolbar>
      </AppBar>

      {currentPage === Pagination.Login && <LoginPage />}
      {currentPage === Pagination.SignUp && <SignupPage />}
      {currentPage === Pagination.Profile && (
        <ProfilePage setCurrentPage={setCurrentPage} />
      )}
      {currentPage === Pagination.EditProfile && (
        <EditProfilePage setCurrentPage={setCurrentPage} />
      )}
      {currentPage === Pagination.CompaniesList && (
        <CompaniesListPage setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
}
