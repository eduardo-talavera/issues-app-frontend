import { Pagination } from '@/types/index';

interface Props {
  page: number;
  pagination: Pagination;
  onChange: (page: number) => void;
  className?: string;
}

export const IssuesPaginator = ({ page, pagination, onChange, className }: Props) => {
  const handlePrev = () => {
    if (page > 1) onChange(page - 1);
  };

  const handleNext = () => {
    if (pagination?.page < pagination?.totalPages) onChange(page + 1);
  };

  return (
    <div className={`flex justify-between items-center px-2 sm:px-0 w-full sm:w-[310px] ${className}`}>
      <button
        disabled={page === 1}
        onClick={handlePrev}
        className='px-3 py-1 border rounded disabled:opacity-50'
      >
        Anterior
      </button>

      <span>
        Página {pagination?.page} de {pagination?.totalPages}
      </span>

      <button
        disabled={pagination?.page >= pagination?.totalPages}
        onClick={handleNext}
        className='px-3 py-1 border rounded disabled:opacity-50'
      >
        Siguiente
      </button>
    </div>
  );
};
