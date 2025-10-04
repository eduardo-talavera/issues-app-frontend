import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AddIssueModal from "@/components/Issues/AddIssueModal";
import { IssuesList } from "@/components/Issues/IssuesList";
import GetIssueData from "@/components/Issues/GetIssueData";
import { getIssues } from "@/api/IssuesApi";
import { useState } from "react";
import { IssueFilterInputs } from "@/components/Issues/IssueFilterInputs";
import { Issue, IssueFilters } from "@/types/index";

export const IssuesView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<IssueFilters>({
    search: "",
    state: "",
    priority: "",
    page: 1,
    limit: 5,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["issues", filters],
    queryFn: () => getIssues(filters),
    retry: 2,
    staleTime: 1000 * 30, // 30 segundos
    placeholderData: "keepPreviousData",
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <Navigate to="/404" />;

  const issues: Issue[] = data.data;
  const pagination = data.pagination;

  if (issues)
    return (
      <div className="px-5 mx-5">
        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate(location.pathname + "?newIssue=true")}
          >
            Crear Ticket
          </button>
        </nav>
        <IssueFilterInputs filters={filters} onChange={setFilters} />

        {/* Paginación */}
        <div className="flex justify-between items-center w-[350px]">
          <button
            disabled={filters.page === 1}
            onClick={() => {
              setFilters((prev) => ({ ...prev, page: (prev.page ?? 1) - 1 }));
            }}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>

          <span>
            Página {pagination.page} de {pagination.totalPages}
          </span>

          <button
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => {
              setFilters((prev) => ({ ...prev, page: (prev.page ?? 1) + 1 }));
            }}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
        {/* end pagination */}

        <IssuesList issues={issues} />

        <AddIssueModal />
        <GetIssueData />
      </div>
    );
};
