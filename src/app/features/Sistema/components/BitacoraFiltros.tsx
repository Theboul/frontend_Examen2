import { useState } from 'react';
import { type BitacoraFilters } from '../services/bitacoraService';
import { bitacoraService } from '../services/bitacoraService';

interface BitacoraFiltrosProps {
  onFilter: (filters: BitacoraFilters) => void;
  loading: boolean;
}

export default function BitacoraFiltros({ onFilter, loading }: BitacoraFiltrosProps) {
  const [filters, setFilters] = useState<BitacoraFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const handleFilterChange = (key: keyof BitacoraFilters, value: string) => {
    const newFilters = { ...filters };
    if (value) newFilters[key] = value;
    else delete newFilters[key];
    setFilters(newFilters);
  };

  const handleApplyFilters = () => onFilter(filters);
  const handleClearFilters = () => {
    setFilters({});
    onFilter({});
  };

  const handleExport = async (formato: 'pdf' | 'excel' | 'word') => {
    setExportLoading(true);
    try {
      // Usamos los filtros actuales que el usuario ha seleccionado
      await bitacoraService.exportReport(formato, filters);
    } catch (error) {
      console.error(`Error al exportar ${formato}:`, error);
      // (Opcional) Mostrar un mensaje de error al usuario
    } finally {
      setExportLoading(false);
    }
  };

  const isLoading = loading || exportLoading;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Filtros</h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-purple-600 hover:text-purple-800 font-medium text-sm sm:text-base self-start sm:self-auto"
        >
          {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
          {/* Buscar por usuario */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <input
              type="text"
              placeholder="Nombre del usuario"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => handleFilterChange('usuario', e.target.value)}
            />
          </div>

          {/* Acción */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Acción
            </label>
            <input
              type="text"
              placeholder="Ej: CREAR, ACTUALIZAR..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => handleFilterChange('accion', e.target.value)}
            />
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => handleFilterChange('fecha', e.target.value)}
            />
          </div>
        </div>
      )}

      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleApplyFilters}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            Aplicar
          </button>
          <button
            onClick={handleClearFilters}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
          >
            Limpiar
          </button>

          <div className="ml-auto flex flex-wrap gap-2">
            <button
              onClick={() => handleExport('pdf')}
              disabled={isLoading}
              className="px-4 py-2 text-sm sm:text-base bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {exportLoading ? '...' : 'Exportar PDF'}
            </button>
            <button
              onClick={() => handleExport('excel')}
              disabled={isLoading}
              className="px-4 py-2 text-sm sm:text-base bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {exportLoading ? '...' : 'Exportar Excel'}
            </button>
            <button
              onClick={() => handleExport('word')}
              disabled={isLoading}
              className="px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {exportLoading ? '...' : 'Exportar Word'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
