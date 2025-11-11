import { api } from '../../../../lib/axios';



export interface Bitacora {
  id_bitacora: number;
  accion: string;
  descripcion: string;
  ip: string;
  fecha: string;
  usuario?: string;
}

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface BitacoraFilters {
  usuario?: string;
  accion?: string;
  fecha?: string;
}

export const bitacoraService = {
  /**
   * Obtener registros de bitácora (adaptado a Laravel Blade)
   */
  getBitacoraLogs: async (
    page: number = 1,
    pageSize: number = 10,
    filters: BitacoraFilters = {}
  ): Promise<{ data: Bitacora[]; pagination: PaginationInfo }> => {
    // Laravel no usa "api/bitacora/logs", sino la ruta de vista /bitacora
    const params = {
      page,
      page_size: pageSize,
      ...filters,
      json: 1 // le decimos que queremos JSON
    };

    const response = await api.get('/bitacora', { params });

    // En caso de que el backend devuelva HTML por error, prevenimos el crash
    if (typeof response.data !== 'object') {
      console.error('Respuesta inesperada del backend', response.data);
      return {
        data: [],
        pagination: {
          currentPage: 1,
          pageSize,
          totalPages: 1,
          totalItems: 0,
          hasNext: false,
          hasPrevious: false
        }
      };
    }

    // Estructura compatible con tu frontend actual
    const data: Bitacora[] = (response.data.bitacoras || []).map((b: any) => ({
      id_bitacora: b.id_bitacora,
      accion: b.accion,
      descripcion: b.descripcion,
      ip: b.ip,
      fecha: b.fecha,
      usuario: b.usuario?.nombre_usuario ?? 'Anónimo'
    }));

    return {
      data,
      pagination: {
        currentPage: response.data.current_page || 1,
        pageSize,
        totalPages: response.data.last_page || 1,
        totalItems: response.data.total || data.length,
        hasNext: !!response.data.next_page_url,
        hasPrevious: !!response.data.prev_page_url
      }
    };
  },

  /**
   * Exportar reporte PDF / Excel / Word
   */
  exportReport: async (formato: 'pdf' | 'excel' | 'word' = 'pdf', filters: BitacoraFilters = {}) => {
    const params = { ...filters, formato };

    const response = await api.get('/bitacora/report', {
      params,
      responseType: 'blob'
    });

    // Descarga automática del archivo
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte_bitacora.${formato === 'excel' ? 'xlsx' : formato === 'word' ? 'docx' : 'pdf'}`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
};
