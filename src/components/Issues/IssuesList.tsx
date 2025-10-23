import { Issue, IssueState } from '@/types/index';
import { IssueCard } from './IssueCard';
import { statesIcons, statesPluralTraslations } from '@/utils/constants';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { updateIssueSatate } from '@/api/IssuesApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useUI } from '@/contexts/ui/useUI';
import { delay } from '@/utils/helpers';

interface IssueListProps {
  issues: Issue[];
}

type GroupedIssues = {
  [key: string]: Issue[];
};

const initialStatesGroups: GroupedIssues = {
  open: [],
  in_progress: [],
  closed: [],
};

export const IssuesList = ({ issues }: IssueListProps) => {
  const { setShowLoaderSkeleton } = useUI();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateIssueSatate,

    onError: async (error) => {
      await delay(500);
      setShowLoaderSkeleton(false);
      toast.error(error.message);
    },
    
    onSuccess: async (message) => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      await delay(500);
      setShowLoaderSkeleton(false);
      toast.success(message);
    },
  });


  // Agrupar issues por estado
  const groupedIssues = issues.reduce((acc, issue) => {
    const currentGroup = acc[issue.state] ? [...acc[issue.state]] : [];
    currentGroup.push(issue);
    return { ...acc, [issue.state]: currentGroup };
  }, initialStatesGroups);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return; // No se soltó en un destino válido
    if (destination.droppableId === source.droppableId) return; // Mismo estado → nada que hacer

    const issueId = draggableId;
    const newState = destination.droppableId as IssueState;

    setShowLoaderSkeleton(true);
    mutate({ issueId, payload: { state: newState }});
  };


  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
          {Object.entries(groupedIssues).map(([state, issues]) => (
            <Droppable droppableId={state} key={state}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-w-[300px] 2xl:min-w-0 2xl:w-1/5 border-slate-300 border-r-4 border-dashed last:border-r-0 pr-5 rounded transition-colors ${
                    snapshot.isDraggingOver ? 'bg-slate-100' : ''
                  }`}
                >
                  <h3 className='capitalize text-xl font-medium p-3 border-b-4 border-dashed border-slate-300 text-slate-400'>
                    <div className='flex justify-center items-center'>
                      <span>{statesPluralTraslations[state]}</span>
                      <span className='text-3xl ml-3'>{statesIcons[state]}</span>
                    </div>
                  </h3>

                  <ul className='mt-5 space-y-5'>
                    {issues.length === 0 ? (
                      <li className='text-gray-500 text-center pt-3'>
                        No hay tickets
                      </li>
                    ) : (
                      issues.map((issue, index) => (
                        <Draggable key={issue._id} draggableId={issue._id} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <IssueCard issue={issue} />
                            </li>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </ul>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};
