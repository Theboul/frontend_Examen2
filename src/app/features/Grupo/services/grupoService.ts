import { api } from '../../../../lib/axios';
import { type Materia } from '../../Materia/services/materiaService';

// ============================================================================
// TIPOS
// ============================================================================

export interface Grupo {
    id_grupo: number;
    id_materia: number;
    nombre: string;
    descripcion: string | null;
    capacidad_maxima: number;
    cupos: number;
    activo: boolean;
    creado_por: number | null; // Asumimos que puede ser null si no hay auth
    fecha_creacion: string;
    fecha_modificacion: string | null;
    materia: Materia; // Relación cargada por el Controller
}

// Interfaz para Crear/Editar (usan strings para inputs)
export interface GrupoForm {
    id_materia: string | number;
    nombre: string;
    descripcion: string | null;
    capacidad_maxima: string | number;
    cupos: string | number;
    creado_por?: string | number | null; // Opcional, Laravel lo gestiona con auth()->check()
    activo?: boolean; // Solo para edición
}

// ============================================================================
// API SERVICE
// ============================================================================

export const GrupoService = {

    /**
    * GET /grupos
    */
    listar: async (params: { incluir_inactivos?: boolean; id_materia?: number } = {}): Promise<{ success: boolean; data: Grupo[]; message?: string }> => {
        try {
            // Renombramos incluir_inactivos a incluir_inactivos para que coincida con tu Controller
            const response = await api.get(`/grupos`, { params: { incluir_inactivos: params.incluir_inactivos, id_materia: params.id_materia } });
            return response.data;
        } catch (error: any) {
            return { success: false, data: [], message: error.response?.data?.message || 'Error al obtener grupos' };
        }
    },

    /**
    * POST /grupos
    */
    crear: async (data: GrupoForm): Promise<{ success: boolean; data?: Grupo; message: string }> => {
        try {
            const dataToSend = {
                ...data,
                id_materia: Number(data.id_materia) || 0,
                capacidad_maxima: Number(data.capacidad_maxima) || 0,
                cupos: Number(data.cupos) || 0,
                descripcion: data.descripcion || null, // Convertir a null si es cadena vacía
                creado_por: data.creado_por ? Number(data.creado_por) : undefined, // Enviar solo si está definido
            };

            const response = await api.post('/grupos', dataToSend);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 422) {
                const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
                return { success: false, message: errorMessages };
            }
            return { success: false, message: error.response?.data?.message || 'Error al crear grupo' };
        }
    },

    /**
    * PUT /grupos/{id}
    */
    actualizar: async (id: number, data: GrupoForm): Promise<{ success: boolean; data?: Grupo; message: string }> => {
        try {
            const dataToSend = {
                ...data,
                id_materia: Number(data.id_materia) || 0,
                capacidad_maxima: Number(data.capacidad_maxima) || 0,
                cupos: Number(data.cupos) || 0,
                descripcion: data.descripcion || null,
                creado_por: data.creado_por ? Number(data.creado_por) : undefined,
            };

            const response = await api.put(`/grupos/${id}`, dataToSend);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 422) {
                const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
                return { success: false, message: errorMessages };
            }
            return { success: false, message: error.response?.data?.message || 'Error al actualizar grupo' };
        }
    },

    /**
    * DELETE /grupos/{id} (Desactivar)
    */
    eliminar: async (id: number): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await api.delete(`/grupos/${id}`);
            return response.data;
        } catch (error: any) {
            return { success: false, message: error.response?.data?.message || 'Error al desactivar grupo' };
        }
    },

    reactivar: async (id: number): Promise<{ success: boolean; data?: Grupo; message: string }> => {
        try {
            const response = await api.post(`/grupos/${id}/reactivar`);
            return response.data;
        } catch (error: any) {
            return { success: false, message: error.response?.data?.message || 'Error al reactivar grupo' };
        }
    },

    /**
    * GET /grupos/select
    */
    paraSelect: async (idMateria?: number): Promise<{ success: boolean; data: Grupo[] }> => {
        try {
            const params = idMateria ? { id_materia: idMateria } : {};
            const response = await api.get('/grupos/select', { params });
            return response.data;
        } catch (error: any) {
            return { success: false, data: [] };
        }
    }
};