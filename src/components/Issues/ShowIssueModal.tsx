import { Issue } from '@/types/index';
import { Avatar, AvatarVariants } from '@/ui/Avatar';
import { Chip } from '@/ui/Chip';
import { Modal } from '@/ui/Modal';
import {
  priorityTranslations,
  priorityVariants,
  statesIcons,
  statesSingularTraslations,
  variants,
} from '@/utils/constants';
import { getRandomString, parseDate } from '@/utils/helpers';
import { useNavigate } from 'react-router-dom';

type ShowIssueModalProps = {
  data: Issue;
};

export default function ShowIssueModal({ data }: ShowIssueModalProps) {
  const {
    title,
    description,
    priority,
    state,
    author,
    userAssigned,
    createdAt,
  } = data;
  const navigate = useNavigate();
  const [nameAuthor, lastnameAuthor] = (author && author.name.split(' ')) || [
    '',
    '',
  ];
  const [nameUserAssigned, lastnameUserAssigned] = (userAssigned &&
    userAssigned.name.split(' ')) || ['', ''];

  const randomVariantAuthor = getRandomString(variants);
  const randomVariantUserAssigned = getRandomString(variants);

  return (
    <Modal
      showModal={true}
      onClose={() => navigate(location.pathname, { replace: true })}
      title={title}
    >
      <p className='text-xl text-slate-500 font-light'>{description}</p>

      <div className='mt-10 flex items-center'>
        <p className='text-xl font-medium'>Autor del ticket:</p>
        <div className='flex items-center pl-2'>
          <Avatar variant={randomVariantAuthor as AvatarVariants} size='sm'>
            {nameAuthor?.at(0)}
            {lastnameAuthor?.at(0)}
          </Avatar>
          <span className='font-light pl-2 text-blue-500 text-xl'>
            {author.name}
          </span>
        </div>
      </div>

      {userAssigned ? (
        <>
          <div className='mt-5 flex items-center'>
            <p className='text-xl font-medium'>Usuario asignado:</p>
            <div className='flex items-center pl-2'>
              <Avatar
                variant={randomVariantUserAssigned as AvatarVariants}
                size='sm'
              >
                {nameUserAssigned.at(0)}
                {lastnameUserAssigned.at(0)}
              </Avatar>
              <span className='font-light pl-2 text-blue-500 text-xl'>
                {userAssigned.name}
              </span>
            </div>
          </div>
        </>
      ) : (
        <p className='text-xl font-medium mt-5'>Usuario asignado: 
          <span className='text-xl font-light pl-2 text-blue-500'>Sin asignación</span>
        </p>
      )}

      <p className='text-xl font-medium mt-5'>
        Fecha y hora de creacion:
        <span className='font-light text-slate-500 pl-2'>
          {parseDate(createdAt)}
        </span>
      </p>

      <div className='flex items-center mt-5'>
        <p className='text-xl font-medium'>Estado: </p>
        <span className='text-slate-500 font-light text-xl p-2'>
          {statesSingularTraslations[state]}
        </span>
        <span className='text-3xl ml-3'>{statesIcons[state]}</span>
      </div>

      <Chip variant={priorityVariants[priority]} size='md' className='mt-5'>
        Prioridad {priorityTranslations[priority]}
      </Chip>
    </Modal>
  );
}
