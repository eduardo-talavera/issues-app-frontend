import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IssueFormData } from '@/types/index';
import { ErrorMessage } from '../../ui/ErrorMessage';

type IssueFormProps = {
  errors: FieldErrors<IssueFormData>;
  register: UseFormRegister<IssueFormData>;
};

export default function IssueForm({ errors, register }: IssueFormProps) {
  return (
    <>
      <div className='flex flex-col gap-5'>
        <label className='font-normal text-2xl' htmlFor='name'>
          Titulo del ticket
        </label>

        <input
          id='name'
          type='text'
          placeholder='Titulo del ticket'
          className='w-full p-3  border-gray-300 border'
          {...register('title', {
            required: 'El titulo del ticket es obligatorio',
            minLength: {
              value: 3,
              message: 'El titulo debe tener al menos 3 caracteres',
            },
            maxLength: {
              value: 100,
              message: 'El titulo debe tener como maximo 100 caracteres',
            },
          })}
        />

        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </div>

      <div className='flex flex-col gap-5'>
        <label className='font-normal text-2xl' htmlFor='description'>
          Descripción del ticket
        </label>
        <textarea
          id='description'
          placeholder='Descripción del ticket'
          className='w-full p-3  border-gray-300 border'
          {...register('description', {
            required: 'La descripción del ticket es obligatoria',
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div>
        <label className='font-normal text-2xl'>Estado</label>
        <select
          id='state'
          className='w-full p-3  border-gray-300 border'
          {...register('state', {
            required: 'Selecciona una opción'
          })}
        >
          <option value='open'>Abierto</option>
          <option value='in_progress'>En progreso</option>
          <option value='closed'>Cerrado</option>
        </select>
      </div>

      <div>
        <label className='font-normal text-2xl'>Prioridad</label>
        <select
          id='priority'
          className='w-full p-3  border-gray-300 border'
          {...register('priority', {
            required: 'Selecciona una opción'
          })}
        >
          <option value='low'>Baja</option>
          <option value='medium'>Media</option>
          <option value='hight'>Alta</option>
        </select>
      </div>
    </>
  );
}
