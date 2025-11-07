import { api } from '../../../../lib/axios';

// ============================================================================
// TIPOS
// ============================================================================

export interface Carrera {
  id_carrera: number;
  nombre: string;
  codigo: string;
  duracion_anios: number;
  activo: boolean;
  fecha_creacion: string;
  fecha_modificacion: string | null;
}

export interface CarreraForm {
  nombre: string;
  codigo: string;
  duracion_anios: number;
}

// ============================================================================
// API SERVICE
// ============================================================================

export const CarreraService = {
  
  /**
   * GET /carreras
   * Listar todas las carreras
   */
  listar: async (incluirInactivas = false): Promise<{ success: boolean; data: Carrera[]; message: string }> => {
    try {
      const params = incluirInactivas ? '?incluir_inactivas=true' : '';
      const response = await api.get(`/carreras${params}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Error al obtener carreras'
      };
    }
  },

  /**
   * POST /carreras
   * Crear nueva carrera
   */
  crear: async (data: CarreraForm): Promise<{ success: boolean; data?: Carrera; message: string }> => {
    try {
      const response = await api.post('/carreras', data);
      return response.data;
    } catch (error: any) {
      // Manejar errores de validación (422)
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join('\n');
        return {
          success: false,
          message: errorMessages
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Error al crear carrera'
      };
    }
  },

  /**
   * PUT /carreras/{id}
   * Actualizar carrera
   */
  actualizar: async (id: number, data: CarreraForm): Promise<{ success: boolean; data?: Carrera; message: string }> => {
    try {
      const response = await api.put(`/carreras/${id}`, data);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join('\n');
        return {
          success: false,
          message: errorMessages
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Error al actualizar carrera'
      };
    }
  },

  /**
   * DELETE /carreras/{id}
   * Desactivar carrera
   */
  eliminar: async (id: number): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.delete(`/carreras/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Error al desactivar carrera'
      };
    }
  },

  /**
   * POST /carreras/{id}/reactivar
   * Reactivar carrera
   */
  reactivar: async (id: number): Promise<{ success: boolean; data?: Carrera; message: string }> => {
    try {
      const response = await api.post(`/carreras/${id}/reactivar`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Error al reactivar carrera'
      };
    }
  },

  /**
   * GET /carreras/select
   * Obtener carreras para select (solo activas)
   */
  paraSelect: async (): Promise<{ success: boolean; data: Array<{ value: number; label: string }> }> => {
    try {
      const response = await api.get('/carreras/select');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        data: []
      };
    }
  }
};