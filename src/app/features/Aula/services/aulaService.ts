import { api } from '../../../../lib/axios';

// ============================================================================
// TIPOS
// ============================================================================

export interface TipoAula {
 id_tipo_aula: number;
 nombre: string;
}

export interface Aula {
 id_aula: number;
 id_tipo_aula: number;
 tipo_aula: TipoAula; // Se carga con el 'with' en el Controller
 nombre: string;
 capacidad: number;
 piso: number;
 mantenimiento: boolean;
 activo: boolean;
 fecha_creacion: string;
 fecha_modificacion: string | null;
}

export interface AulaForm {
 id_tipo_aula: string | number;
 nombre: string;
 capacidad: string | number;
 piso: string | number;
 mantenimiento: boolean;
 activo: boolean;
}

// Interfaz para la respuesta de Select (Combobox)
export interface AulaSelect {
 value: number;
 label: string;
}

// ============================================================================
// API SERVICE
// ============================================================================

export const AulaService = {
 
 /**
 * GET /aulas
 * Listar todas las aulas
 */
 listar: async (params: { incluir_inactivas?: boolean; disponibles?: boolean; en_mantenimiento?: boolean } = {}): Promise<{ success: boolean; data: Aula[]; message: string }> => {
  try {
   const response = await api.get(`/aulas`, { params });
   return response.data;
  } catch (error: any) {
   return {
    success: false,
    data: [],
    message: error.response?.data?.message || 'Error al obtener aulas'
   };
  }
 },

 /**
 * POST /aulas
 * Crear nueva aula
 */
 crear: async (data: AulaForm): Promise<{ success: boolean; data?: Aula; message: string }> => {
  try {
   // La API de Laravel espera números para id_tipo_aula, capacidad y piso
   const dataToSend = {
    ...data,
    id_tipo_aula: Number(data.id_tipo_aula) || 0,
    capacidad: Number(data.capacidad) || 0,
    piso: Number(data.piso) || 0,
   };
   
   const response = await api.post('/aulas', dataToSend);
   return response.data;
  } catch (error: any) {
   if (error.response?.status === 422) {
    const errors = error.response.data.errors;
    const errorMessages = Object.values(errors).flat().join('\n');
    return { success: false, message: errorMessages };
   }
   return { success: false, message: error.response?.data?.message || 'Error al crear aula' };
  }
 },

 /**
 * PUT /aulas/{id}
 * Actualizar aula
 */
 actualizar: async (id: number, data: AulaForm): Promise<{ success: boolean; data?: Aula; message: string }> => {
  try {
   const dataToSend = {
    ...data,
    id_tipo_aula: Number(data.id_tipo_aula) || 0,
    capacidad: Number(data.capacidad) || 0,
    piso: Number(data.piso) || 0,
   };

   const response = await api.put(`/aulas/${id}`, dataToSend);
   return response.data;
  } catch (error: any) {
   if (error.response?.status === 422) {
    const errors = error.response.data.errors;
    const errorMessages = Object.values(errors).flat().join('\n');
    return { success: false, message: errorMessages };
   }
   return { success: false, message: error.response?.data?.message || 'Error al actualizar aula' };
  }
 },

 /**
 * DELETE /aulas/{id}
 * Desactivar aula (Eliminación lógica)
 */
 desactivar: async (id: number): Promise<{ success: boolean; message: string }> => {
  try {
   const response = await api.delete(`/aulas/${id}`);
   return response.data;
  } catch (error: any) {
   return {
    success: false,
    message: error.response?.data?.message || 'Error al desactivar aula'
   };
  }
 },

 /**
 * POST /aulas/{id}/reactivar
 * Reactivar aula
 */
 reactivar: async (id: number): Promise<{ success: boolean; data?: Aula; message: string }> => {
  try {
   const response = await api.post(`/aulas/${id}/reactivar`);
   return response.data;
  } catch (error: any) {
   return {
    success: false,
    message: error.response?.data?.message || 'Error al reactivar aula'
   };
  }
 },

 /**
 * POST /aulas/{id}/toggle-mantenimiento
 * Cambiar estado de mantenimiento
 */
 toggleMantenimiento: async (id: number): Promise<{ success: boolean; data?: Aula; message: string }> => {
  try {
   const response = await api.post(`/aulas/${id}/toggle-mantenimiento`);
   return response.data;
  } catch (error: any) {
   return {
    success: false,
    message: error.response?.data?.message || 'Error al cambiar estado de mantenimiento'
   };
  }
 },

 /**
 * GET /aulas/select
 * Obtener aulas para select (solo activas y disponibles)
 */
 paraSelect: async (idTipoAula?: number): Promise<{ success: boolean; data: AulaSelect[]; message?: string }> => {
  try {
   const params = idTipoAula ? { id_tipo_aula: idTipoAula } : {};
   const response = await api.get('/aulas/select', { params });
   return response.data;
  } catch (error: any) {
   return {
    success: false,
    data: [],
    message: error.response?.data?.message || 'Error al obtener aulas para select'
   };
  }
 }
};