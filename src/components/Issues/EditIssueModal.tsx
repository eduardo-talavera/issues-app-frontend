import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Issue, IssueFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import IssueForm from './IssueForm';
import { updateIssue } from '@/api/IssuesApi';
import { toast } from 'react-toastify';
import { Modal } from '@/ui/Modal';

type EditIssueModalProps = {
  data: Issue;
  issueId: Issue['_id'];
};

export default function EditIssueModal({ data, issueId }: EditIssueModalProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IssueFormData>({
    defaultValues: {
      title: data.title,
      description: data.description,
      state: data.state,
      priority: data.priority
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateIssue,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      queryClient.invalidateQueries({ queryKey: ['issue', issueId] });
      toast.success(data);
      reset();
      navigate(location.pathname, { replace: true });
    },
  });

  const handleEditIssue = (formData: IssueFormData) => {
    const data = {
      issueId,
      formData,
    };
    mutate(data);
  };

  return (
    <Modal
      showModal={true}
      onClose={() => navigate(location.pathname, { replace: true })}
      title='Edición de Ticket'
    >
      <p className='text-xl font-bold'>
        Actualiza los datos de {''}
        <span className='text-blue-500'>tu ticket</span>
      </p>

      <form
        className='mt-10 space-y-3'
        noValidate
        onSubmit={handleSubmit(handleEditIssue)}
      >
        <IssueForm register={register} errors={errors} />

        <input
          type='submit'
          value='Guardar Ticket'
          className='btn-primary w-full p-3'
        />
      </form>
    </Modal>
  );
}
