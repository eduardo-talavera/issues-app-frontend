import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AddIssueModal from '@/components/Issues/AddIssueModal';
import { IssuesList } from '@/components/Issues/IssuesList';
import GetIssueData from '@/components/Issues/GetIssueData';
import { getIssues } from '@/api/IssuesApi';
import { useState } from 'react';
import { IssueFilterInputs } from '@/components/Issues/IssueFilterInputs';
import { Issue, IssueFilters } from '@/types/index';
import { IssuesPaginator } from '@/components/Issues/IssuesPaginator';

export const IssuesView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<IssueFilters>({
    search: '',
    state: '',
    priority: '',
    page: 1,
    limit: 5,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['issues', filters],
    queryFn: () => getIssues(filters),
    retry: 2,
    //staleTime: 1000 * 30, // 30 segundos
    //placeholderData: 'keepPreviousData',
  });

  console.log('data: ', data)

  if (error?.message === 'Usuario no encontrado')
    return <Navigate to='/login' />;

  if (isError) return <Navigate to='/404' />;
  if (isLoading) return <p>Cargando...</p>;

  const issues: Issue[] = data.data;
  const pagination = data.pagination;

  return (
    <div className='px-5 mx-5'>
      <nav className='my-5 flex gap-3'>
        <button
          type='button'
          className='btn-primary'
          onClick={() => navigate(location.pathname + '?newIssue=true')}
        >
          Crear Ticket
        </button>
      </nav>
      <IssueFilterInputs 
        filters={{
            search: filters.search,
            state: filters.state,
            priority: filters.priority,
        }} 
        onChange={setFilters} 
      />
      <IssuesPaginator
        page={filters.page!}
        pagination={pagination}
        onChange={(page) => setFilters({ ...filters, page })}
      />
      <IssuesList issues={issues} />
      <AddIssueModal />
      <GetIssueData />
    </div>
  );
};
