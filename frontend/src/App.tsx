import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useTheme,
} from "@mui/material";
import { Pagination } from "./types";
import { useState } from "react";
import { LoginPage } from "./pages/login";

export function App() {
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState<Pagination>(Pagination.Login);

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
        </Toolbar>
      </AppBar>

      {currentPage === Pagination.Login && <LoginPage />}
    </div>
  );
}
