import { useEffect, useState } from "react";
import { useBitacora } from "../Hooks/useBiatacora";
import BitacoraFiltros from "../components/BitacoraFiltros";
import Paginacion from "../components/Paginacion";
import LogsList from "../components/LogsList";
import EstadisticasPanel from "../components/EstadisticasPanel";
import { type BitacoraFilters } from "../services/bitacoraService";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

export default function BitacoraPage() {
  const {
    logs,
    loading,
    error,
    pagination,
    loadLogs,
    clearError,
    estadisticas,
    estadisticasLoading,
    loadEstadisticas,
  } = useBitacora();

  const [currentFilters, setCurrentFilters] = useState<BitacoraFilters>({});
  const [showEstadisticas, setShowEstadisticas] = useState(false);

  const handleFilter = (filters: BitacoraFilters) => {
    setCurrentFilters(filters);
    loadLogs(1, pagination.pageSize, filters);
  };

  const handlePageChange = (page: number) => {
    loadLogs(page, pagination.pageSize, currentFilters);
  };

  const handleRefresh = () => {
    loadLogs(1, pagination.pageSize, currentFilters);
    loadEstadisticas();
  };

  return (
    <div className="space-y-6 px-3 sm:px-6 md:px-8 py-6 bg-gradient-to-b from-[#f9fafc] to-[#e6f0ff] min-h-screen">
      <Header />
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-[#003366]">
            Bitácora del Sistema
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Registro de actividades y eventos del sistema FICCT
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-3">
          <button
            onClick={() => setShowEstadisticas((v) => !v)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm ${
              showEstadisticas
                ? "bg-[#880000] hover:bg-[#b30000]"
                : "bg-[#003366] hover:bg-[#0056b3]"
            } text-white`}
          >
            {showEstadisticas ? "Ocultar Estadísticas" : "Ver Estadísticas"}
          </button>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-4 py-2 bg-[#880000] text-white rounded-lg hover:bg-[#b30000] disabled:opacity-50 transition-all duration-200 shadow-sm font-medium text-sm w-full sm:w-auto"
          >
            🔄 Actualizar
          </button>
        </div>
      </header>

      {/* Panel de Estadísticas */}
      {showEstadisticas && (
        <div className="w-full overflow-x-auto bg-white rounded-xl shadow-md border border-[#dce3f0] p-4">
          <EstadisticasPanel
            estadisticas={estadisticas}
            loading={estadisticasLoading}
          />
        </div>
      )}

      {/* Filtros */}
      <section className="w-full">
        <BitacoraFiltros onFilter={handleFilter} loading={loading} />
      </section>

      {/* Errores */}
      {error && (
        <div className="p-4 bg-[#ffe6e6] border border-[#ffcccc] rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-[#b30000] mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-[#880000] text-sm sm:text-base font-medium">
                {error}
              </p>
            </div>
            <button
              onClick={clearError}
              className="text-[#b30000] hover:text-[#660000] text-lg font-bold self-end sm:self-auto"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Tabla de registros */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b-2 border-[#003366] bg-[#f8faff]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#003366]">
                Registros de Actividad
              </h2>
              {!loading && pagination.totalItems > 0 && (
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {pagination.totalItems} registros encontrados
                  {Object.keys(currentFilters).length > 0 && " (filtrados)"}
                </p>
              )}
            </div>

            {!loading && pagination.totalItems > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#e6f0ff] text-[#003366] border border-[#b3c6ff]">
                Página {pagination.currentPage} de {pagination.totalPages}
              </span>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <LogsList logs={logs} loading={loading} />
        </div>

        {pagination.totalPages > 1 && (
          <div className="border-t border-gray-200 px-2 sm:px-4 py-3 bg-[#f9fafc]">
            <Paginacion
              pagination={pagination}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
