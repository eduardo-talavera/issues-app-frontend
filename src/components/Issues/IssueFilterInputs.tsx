/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, ChangeEvent, memo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { IssueFilters } from '@/types/index';

interface Props {
  filters: Omit<IssueFilters, 'page' | 'limit'>;
  onChange: React.Dispatch<React.SetStateAction<IssueFilters>>;
}

export const IssueFilterInputs = memo(({ filters, onChange }: Props) => {
  const [localFilters, setLocalFilters] = useState({
    search: filters.search,
    state: filters.state,
    priority: filters.priority,
  });

  const debouncedSearch = useDebounce(localFilters.search, 1500);

  useEffect(() => {
    if (filters.search !== localFilters.search) {
      onChange((prev) => ({ ...prev, search: debouncedSearch, page: 1 }));
    }
  }, [debouncedSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    onChange((prev) => ({
      ...prev,
      ...localFilters,
      page: 1,
    }));
  };

  return (
    <div className='flex flex-wrap gap-4 items-end p-4 border rounded-lg mb-4'>
      <div>
        <label className='block text-sm font-medium'>Buscar</label>
        <input
          type='text'
          name='search'
          value={localFilters.search}
          onChange={handleChange}
          className='custom-input'
          placeholder='Título o descripción'
        />
      </div>

      <div>
        <label className='block text-sm font-medium'>Estado</label>
        <select
          name='state'
          value={localFilters.state}
          onChange={handleChange}
          className='custom-input'
        >
          <option value=''>Todos</option>
          <option value='open'>Abierto</option>
          <option value='in_progress'>En progreso</option>
          <option value='closed'>Cerrado</option>
        </select>
      </div>

      <div>
        <label className='block text-sm font-medium'>Prioridad</label>
        <select
          name='priority'
          value={localFilters.priority}
          onChange={handleChange}
          className='custom-input'
        >
          <option value=''>Todas</option>
          <option value='low'>Baja</option>
          <option value='medium'>Media</option>
          <option value='hight'>Alta</option>
        </select>
      </div>

      <button
        type='button'
        onClick={applyFilters}
        className='btn-primary-sm'
      >
        Filtrar
      </button>
    </div>
  );
});
