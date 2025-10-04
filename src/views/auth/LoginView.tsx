import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { UserLoginFormData } from '@/types/index';
import { loginUser } from '@/api/AuthApi';
import { toast, ToastContainer } from 'react-toastify';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/auth/AuthProvider';

export default function LoginView() {
  const navigate = useNavigate();
  const initialValues: UserLoginFormData = {
    email: '',
    password: '',
  };

  const { saveToken } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (resp) => {
      if (resp?.accessToken) {
        reset();
        saveToken(resp.accessToken);
        navigate('/issues');
      }
    },
  });

  const handleLogin = (formData: UserLoginFormData) => {
    const data = {
      formData,
    };
    mutate(data);
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />

      <div className='flex justify-center items-center bg-blue-500 h-[100vh]'>
        <div className='bg-white rounded-md shadow-sm w-[368px] p-10'>
          <p className='text-md font-bold text-center'>
            Inicia sesión {''}
            <span className='text-blue-500'>para crear tickets</span>
          </p>

          <form onSubmit={handleSubmit(handleLogin)}>
            <LoginForm errors={errors} register={register} />

            <input
              type='submit'
              value='Iniciar sesión'
              className='btn-primary w-full p-3 mt-10'
            />
          </form>
        </div>
      </div>
    </>
  );
}
