import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import IssueForm from './IssueForm';
import { IssueFormData } from '@/types/index';
import { createIssue } from '@/api/IssuesApi';
import { toast } from 'react-toastify';
import { Modal } from '@/ui/Modal';

export default function AddIssueModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalIssue = queryParams.get('newIssue');
  const showModal = modalIssue ? true : false;

  const initialValues: IssueFormData = {
    title: '',
    description: '',
    state: 'open',
    priority: 'low',
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createIssue,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (resp) => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      toast.success(resp);
      reset();
      navigate(location.pathname, { replace: true });
    },
  });

  const handleCreateTask = (formData: IssueFormData) => {
    const data = {
      formData,
    };
    mutate(data);
  };

  return (
    <>
      <Modal
        showModal={showModal}
        onClose={() => navigate(location.pathname, { replace: true })}
        title='Nuevo Ticket'
      >
        <p className='text-xl font-bold'>
          Llena el formulario y crea {''}
          <span className='text-blue-500'>un ticket</span>
        </p>

        <form
          className='mt-10 space-y-3'
          noValidate
          onSubmit={handleSubmit(handleCreateTask)}
        >
          <IssueForm register={register} errors={errors} />

          <input
            type='submit'
            value='Guardar Ticket'
            className='btn-primary w-full p-3'
          />
        </form>
      </Modal>
    </>
  );
}
