import { Stack, Typography } from "@mui/material";
import { Company, Pagination } from "../../types";

const MOCK_COMPANIES: Company[] = [
  {
    name: "Mocks S.A.",
    cnpj: "1234567",
    category: "Mocks em geral",
    description: "A empresa se trata de um mock...",
    address: "R. Valson Lopes, 70 (132B) - São Paulo/SP",
  },
  {
    name: "M&M's dados",
    cnpj: "7654321",
    category: "Doces de mock",
    description: "Bla bla bla...",
    address: "R. Azevedo Castro, 169 (13) - São Paulo/SP",
  },
];

interface CompaniesListPageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const CompaniesListPage: React.FC<CompaniesListPageProps> = ({
  setCurrentPage,
}: CompaniesListPageProps) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <Typography variant="h6" className="py-3">
        Lista de empresas cadastradas
      </Typography>
      <Stack spacing={1}>
        {MOCK_COMPANIES.map((company) => {
          return (
            <div
              className="d-flex justify-content-between align-items-center gap-5 p-2 bg-info rounded"
              key={company.cnpj}
              role="button"
              onClick={() => setCurrentPage(Pagination.Profile)}
            >
              <div className="d-flex flex-column">
                <Typography variant="h6" color="ButtonText" fontWeight="600">
                  {company.name}
                </Typography>
                <Typography variant="subtitle2" color="ButtonText">
                  {company.category}
                </Typography>
              </div>
              <Typography
                variant="subtitle1"
                color="ButtonText"
                fontWeight="500"
              >
                {company.address}
              </Typography>
            </div>
          );
        })}
      </Stack>
    </div>
  );
};
