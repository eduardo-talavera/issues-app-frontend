import { Issue } from '@/types/index';
import { Chip } from '@/ui/Chip';
import { Modal } from '@/ui/Modal';
import {
  priorityTranslations,
  priorityVariants,
  statesIcons,
  statesSingularTraslations,
} from '@/utils/constants';
import { useNavigate } from 'react-router-dom';

type ShowIssueModalProps = {
  data: Issue;
};

export default function ShowIssueModal({ data }: ShowIssueModalProps) {
  const { title, description, priority, state } = data;
  const navigate = useNavigate();

  return (
    <Modal
      showModal={true}
      onClose={() => navigate(location.pathname, { replace: true })}
      title={title}
    >
      <p className='text-xl'>{description}</p>

      <div className='flex items-center mt-10'>
        <p className='text-xl font-bold'>Estado: </p>
        <span className='text-slate-500 text-xl ml-2'>
          {statesSingularTraslations[state]}
        </span>
        <span className='text-3xl ml-3'>{statesIcons[state]}</span>
      </div>

      <Chip 
        variant={priorityVariants[priority]} 
        size='md' 
        className='mt-10'>
        Prioridad {priorityTranslations[priority]}
      </Chip>
    </Modal>
  );
}
