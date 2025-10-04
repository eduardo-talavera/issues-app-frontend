import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getIssueById } from '@/api/IssuesApi';
import EditIssueModal from './EditIssueModal';
import ShowIssueModal from './ShowIssueModal';

const GetIssueData = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const issueId = queryParams.get('editIssue') || queryParams.get('showIssue')!;

  const { data, isError } = useQuery({
    queryKey: ['issue', issueId],
    queryFn: () => getIssueById({ issueId }),
    enabled: !!issueId,
  });

  if (isError) return <Navigate to={'/404'} />;

  if (data && location.search.includes('editIssue')) 
      return <EditIssueModal data={data} issueId={issueId} />;

  if (data && location.search.includes('showIssue')) 
    return <ShowIssueModal data={data} />;
};

export default GetIssueData;
