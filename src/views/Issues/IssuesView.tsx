import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AddIssueModal from '@/components/Issues/AddIssueModal';
import { IssuesList } from '@/components/Issues/IssuesList';
import GetIssueData from '@/components/Issues/GetIssueData';
import { getIssues } from '@/api/IssuesApi';
import { useEffect, useState } from 'react';
import { IssueFilterInputs } from '@/components/Issues/IssueFilterInputs';
import { Issue, IssueFilters } from '@/types/index';
import { IssuesPaginator } from '@/components/Issues/IssuesPaginator';
import { useAuth } from '@/auth/AuthProvider';
import { IssuesSkeleton } from '@/components/Issues/IssuesSkeleton';

export const IssuesView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [filters, setFilters] = useState<IssueFilters>({
    search: '',
    state: '',
    priority: '',
    page: 1,
    limit: 5,
  });

  const [
    showLoaderSkeleton, 
    setShowLoaderSkeleton] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['issues', filters],
    queryFn: () => getIssues(filters),
    retry: 2,
  });

  useEffect(() => {
    if (isLoading) {
      setShowLoaderSkeleton(true);
    } else {
      const timer = setTimeout(() => setShowLoaderSkeleton(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (error?.message === 'Usuario no encontrado')
    return <Navigate to='/login' />;

  if (isError) return <Navigate to='/404' />;

  if (showLoaderSkeleton) return <IssuesSkeleton />
  
  const issues: Issue[] = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div>
      <div className='flex flex-col md:flex-row md:justify-between items-center md:items-start mb-5'>
        <div>
          <h1 className='text-5xl font-black text-center md:text-left'>Tickets</h1>
          <p className='text-xl font-medium mt-5'>
            Hola! <span className='text-blue-500'>{user.email}</span>{' '}
            <span className='ml-3 text-3xl'>👋</span>
          </p>
        </div>
        <nav className='flex gap-3'>
          <button
            type='button'
            className='btn-primary mt-10 md:mt-0'
            onClick={() => navigate(location.pathname + '?newIssue=true')}
          >
            Crear Ticket
          </button>
        </nav>
      </div>
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
        className='mt-5 mb-10'
      />
      <IssuesList issues={issues} />
      <AddIssueModal />
      <GetIssueData />
    </div>  
  );
};
