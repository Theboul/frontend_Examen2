import { type PaginationInfo } from '../services/bitacoraService';

interface PaginacionProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  loading: boolean;
}

export default function Paginacion({ pagination, onPageChange, loading }: PaginacionProps) {
  const { currentPage, totalPages, hasNext, hasPrevious } = pagination;
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 py-3 bg-white border-t border-gray-200">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious || loading}
        className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
      >
        ◀ Anterior
      </button>

      <span className="text-sm text-gray-700">
        Página <b>{currentPage}</b> de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext || loading}
        className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
      >
        Siguiente ▶
      </button>
    </div>
  );
}
