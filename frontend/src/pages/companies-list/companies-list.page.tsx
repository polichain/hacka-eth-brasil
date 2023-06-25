import { Stack, Typography } from "@mui/material";
import { Company, Pagination } from "../../types";

const MOCK_COMPANIES: Company[] = [
  {
    name: "Mocks S.A.",
    documentNumber: "1234567",
  },
  {
    name: "M&M's dados",
    documentNumber: "7654321",
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
              key={company.documentNumber}
              role="button"
              onClick={() => setCurrentPage(Pagination.Profile)}
            >
              <div className="d-flex flex-column">
                <Typography variant="h6" color="ButtonText" fontWeight="600">
                  {company.name}
                </Typography>
              </div>
            </div>
          );
        })}
      </Stack>
    </div>
  );
};
