import { useState, useCallback, useEffect } from 'react';
import { 
  bitacoraService, 
  type Bitacora, 
  type BitacoraFilters, 
  type PaginationInfo 
} from '../services/bitacoraService';

/**
 * Hook para manejar la carga y paginación de la Bitácora del sistema.
 * Adaptado para el backend Laravel actual (sin endpoints extra).
 */
export const useBitacora = () => {
  const [logs, setLogs] = useState<Bitacora[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    totalItems: 0,
    hasNext: false,
    hasPrevious: false,
  });

  // Cargar registros de bitácora con filtros y paginación
  const loadLogs = useCallback(
    async (page: number = 1, pageSize: number = 10, filters: BitacoraFilters = {}) => {
      setLoading(true);
      setError(null);

      try {
        
        const response = await bitacoraService.getBitacoraLogs(page, pageSize, filters);
        // Guardar registros y datos de paginación
        setLogs(response.data);
        setPagination(response.pagination);
      } catch (err: any) {
        console.error('Error al cargar bitácora:', err);
        setError(
          err?.response?.data?.message ||
          err?.message ||
          'Error al cargar los registros de la bitácora'
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Efecto para cargar los logs iniciales cuando el hook se usa por primera vez.
   */
  useEffect(() => {
    console.log("useBitacora: Montado. Cargando logs iniciales...");
    loadLogs(1, 10, {}); // Carga la página 1 con 10 items sin filtros
  }, [loadLogs]); // 'loadLogs' está envuelto en useCallback, por lo que esto es seguro
  // ==========================================================

  /**
   * Simulación de estadísticas básicas
   * Esto evita errores en el frontend.
   */
  const [estadisticas, setEstadisticas] = useState<any>({
    periodo: 'N/A',
    total_eventos: 0,
    estadisticas_por_accion: [],
    usuarios_mas_activos: [],
    distribucion_usuarios: {
      registrados: 0,
      anonimos: 0,
      porcentaje_anonimos: 0,
    },
  });
  const [estadisticasLoading, setEstadisticasLoading] = useState(false);

  const loadEstadisticas = useCallback(async () => {
    setEstadisticasLoading(true);
    try {
      // Como no hay endpoint real, usamos los datos ya cargados:
      const total = logs.length;
      const porAccion: Record<string, number> = {};

      logs.forEach((log) => {
        porAccion[log.accion] = (porAccion[log.accion] || 0) + 1;
      });

      const estadisticasFake = {
        periodo: 'Datos actuales',
        total_eventos: total,
        estadisticas_por_accion: Object.entries(porAccion).map(([accion, total]) => ({
          accion,
          total,
        })),
        usuarios_mas_activos: [], // opcional
        distribucion_usuarios: {
          registrados: logs.filter((l) => l.usuario && l.usuario !== 'Anónimo').length,
          anonimos: logs.filter((l) => l.usuario === 'Anónimo').length,
          porcentaje_anonimos:
            total > 0
              ? Math.round(
                  (logs.filter((l) => l.usuario === 'Anónimo').length / total) * 100
                )
              : 0,
        },
      };

      setEstadisticas(estadisticasFake);
    } catch (err) {
      console.error('Error generando estadísticas locales:', err);
    } finally {
      setEstadisticasLoading(false);
    }
  }, [logs]);

  return {
    // Logs y control
    logs,
    loading,
    error,
    pagination,
    loadLogs,

    // Estadísticas simuladas
    estadisticas,
    estadisticasLoading,
    loadEstadisticas,

    // Utilidades
    clearError: () => setError(null),
  };
};