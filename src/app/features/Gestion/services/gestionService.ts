import { api } from '../../../../lib/axios';

// ========== TIPOS DE DATOS - GESTIONES ==========

export interface Gestion {
  id_gestion: number;
  anio: number;
  semestre: 1 | 2;
  fecha_inicio: string; // formato: "YYYY-MM-DD"
  fecha_fin: string;    // formato: "YYYY-MM-DD"
  activo: boolean;
}

export interface GestionFormData {
  anio: number;
  semestre: 1 | 2;
  fecha_inicio: string;
  fecha_fin: string;
}

// Interfaz para la respuesta del backend Laravel
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  error?: string;
}

// ========== SERVICIO DE GESTIONES ==========

export const gestionService = {

  /**
   * Obtener todas las gestiones (activas e inactivas)
   * GET /api/gestiones
   */
  getAll: async (): Promise<Gestion[]> => {
    try {
      const response = await api.get<ApiResponse<Gestion[]>>('/gestiones');

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.message || 'Error al obtener gestiones');
    } catch (error: any) {
      console.error('Error en getAll gestiones:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Obtener la gestión activa actual
   * GET /api/gestiones/activa
   */
  getActiva: async (): Promise<Gestion | null> => {
    try {
      const response = await api.get<ApiResponse<Gestion>>('/gestiones/activa');

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      return null;
    } catch (error: any) {
      console.error('Error en getActiva:', error);
      // Si no hay gestión activa, retornar null en vez de error
      if (error.response?.status === 404) {
        return null;
      }
      throw error.response?.data || error;
    }
  },

  /**
   * Crear una nueva gestión
   * POST /api/gestiones
   */
  create: async (data: GestionFormData): Promise<Gestion> => {
    try {
      console.log('📤 Datos enviados al backend:', data);
      const response = await api.post<ApiResponse<Gestion>>('/gestiones', data);

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.message || 'Error al crear gestión');
    } catch (error: any) {
      console.error('❌ Error en create gestión:', error);
      console.error('📋 Detalles del error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      // Si el backend devuelve un mensaje específico, usarlo
      if (error.response?.data?.message) {
        const backendError = new Error(error.response.data.message);
        throw backendError;
      }

      throw error.response?.data || error;
    }
  },

  /**
   * Actualizar una gestión existente
   * PUT /api/gestiones/{id}
   */
  update: async (id: number, data: GestionFormData): Promise<Gestion> => {
    try {
      const response = await api.put<ApiResponse<Gestion>>(`/gestiones/${id}`, data);

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.message || 'Error al actualizar gestión');
    } catch (error: any) {
      console.error('Error en update gestión:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Activar una gestión (desactiva las demás automáticamente)
   * POST /api/gestiones/{id}/activar
   */
  activar: async (id: number): Promise<Gestion> => {
    try {
      const response = await api.post<ApiResponse<Gestion>>(`/gestiones/${id}/activar`);

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.message || 'Error al activar gestión');
    } catch (error: any) {
      console.error('Error en activar gestión:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Desactivar una gestión (solo si NO está activa)
   * DELETE /api/gestiones/{id}
   */
  delete: async (id: number): Promise<void> => {
    try {
      const response = await api.delete<ApiResponse<null>>(`/gestiones/${id}`);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Error al desactivar gestión');
      }
    } catch (error: any) {
      console.error('Error en delete gestión:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Reactivar una gestión previamente desactivada
   * POST /api/gestiones/{id}/reactivar
   */
  reactivar: async (id: number): Promise<Gestion> => {
    try {
      const response = await api.post<ApiResponse<Gestion>>(`/gestiones/${id}/reactivar`);

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.message || 'Error al reactivar gestión');
    } catch (error: any) {
      console.error('Error en reactivar gestión:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Formatear una gestión para mostrar (Ej: "2025-1")
   */
  formatGestion: (gestion: Gestion): string => {
    return `${gestion.anio}-${gestion.semestre}`;
  }
};

export default gestionService;
