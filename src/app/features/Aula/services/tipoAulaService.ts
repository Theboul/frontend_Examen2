import { api } from '../../../../lib/axios';

// ============================================================================
// TIPOS
// ============================================================================

export interface TipoAula {
    id_tipo_aula: number;
    nombre: string;
    descripcion: string | null;
    activo: boolean;
    fecha_creacion: string;
}

export interface TipoAulaForm {
    nombre: string;
    descripcion: string | null;
    activo?: boolean;
}

export interface TipoAulaSelect {
    value: number;
    label: string;
}

// ============================================================================
// API SERVICE 
// ============================================================================

export const TipoAulaService = {
    
    /**
     * GET /tipo-aulas (Listar todos para gestión)
     */
    listar: async (incluirInactivos = true): Promise<{ success: boolean; data: TipoAula[]; message?: string }> => {
        try {
            const params = incluirInactivos ? {} : { activo: true };
            const response = await api.get('/tipo-aulas', { params }); 
            return response.data;
        } catch (error: any) {
            return { success: false, data: [], message: error.response?.data?.message || 'Error al obtener tipos de aula' };
        }
    },
    
    /**
     * GET /tipo-aulas/select (Para dropdowns)
     */
    paraSelect: async (): Promise<{ success: boolean; data: TipoAulaSelect[]; message?: string }> => {
        try {
            const response = await api.get('/tipo-aulas/select'); 
            return response.data;
        } catch (error: any) {
            return { success: false, data: [], message: error.response?.data?.message || 'Error al obtener tipos de aula para selección' };
        }
    },
    
    /**
     * POST /tipo-aulas (Crear)
     */
    crear: async (data: TipoAulaForm): Promise<{ success: boolean; data?: TipoAula; message: string }> => {
        try {
            const response = await api.post('/tipo-aulas', data); 
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 422) {
                const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
                return { success: false, message: errorMessages };
            }
            return { success: false, message: error.response?.data?.message || 'Error al crear tipo de aula' };
        }
    },
    
    /**
     * PUT /tipo-aulas/{id} (Actualizar)
     */
    actualizar: async (id: number, data: TipoAulaForm): Promise<{ success: boolean; data?: TipoAula; message: string }> => {
        try {
            const response = await api.put(`/tipo-aulas/${id}`, data); 
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 422) {
                const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
                return { success: false, message: errorMessages };
            }
            return { success: false, message: error.response?.data?.message || 'Error al actualizar tipo de aula' };
        }
    },
};