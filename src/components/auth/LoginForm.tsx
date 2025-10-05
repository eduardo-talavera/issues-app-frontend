import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { UserLoginFormData } from '@/types/index';
import { ErrorMessage } from '@/ui/ErrorMessage';

type IssueFormProps = {
  errors: FieldErrors<UserLoginFormData>;
  register: UseFormRegister<UserLoginFormData>;
};

export default function LoginForm({ errors, register }: IssueFormProps) {
  return (
    <>
      <div className='flex flex-col gap-1 mt-5'>
        <label className='font-normal text-md' htmlFor='email'>
          Correo
        </label>

        <input
          id='email'
          type='text'
          placeholder='Correo'
          className='w-full p-3  border-gray-300 border rounded-md'
          {...register('email', {
            required: 'Campo obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'El correo no es valido',
            }
          })}
        />

        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div className='flex flex-col gap-1 mt-5'>
        <label className='font-normal text-md' htmlFor='password'>
          Contraseña
        </label>
        <input
          id='password'
          type='password'
          placeholder='Contraseña'
          className='w-full p-3  border-gray-300 border rounded-md'
          {...register('password', {
            required: 'Campo obligatorio',
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
