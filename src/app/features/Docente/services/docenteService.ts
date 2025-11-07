import { api } from '../../../../lib/axios';

// ============================================================================
// TIPOS AUXILIARES (Relaciones)
// ============================================================================

export interface TipoContrato {
    id_tipo_contrato: number;
    nombre: string;
    descripcion: string | null;
    hrs_minimas: number;
    hrs_maximas: number;
}

export interface PerfilUsuario {
    id_perfil_usuario: number;
    nombres: string;
    apellidos: string;
    ci: string;
    email: string;
    telefono: string | null;
    fecha_nacimiento: string | null; // Date string (YYYY-MM-DD)
    genero: 'M' | 'F';
    nombre_completo: string; // Accessor de Laravel
}

export interface Usuario {
    id_usuario: number;
    usuario: string;
    email: string;
}

// ============================================================================
// TIPOS PRINCIPALES
// ============================================================================

export interface Docente {
    cod_docente: number;
    usuario: Usuario;
    id_tipo_contrato: number;
    titulo: string;
    especialidad: string | null;
    grado_academico: string | null;
    activo: boolean;
    fecha_ingreso: string | null;
    perfil: PerfilUsuario;
    tipo_contrato: TipoContrato;
}


export interface DocenteForm {
    // === Datos de Usuario/Cuenta ===
    usuario: string;
    email: string;
    password?: string; // Opcional en update, requerido en store

    // === Datos de Perfil ===
    nombres: string;
    apellidos: string;
    ci: string;
    genero: string;
    telefono: string | null;
    fecha_nacimiento: string | null;

    // === Datos de Docente ===
    id_tipo_contrato: string | number;
    titulo: string;
    especialidad: string | null;
    grado_academico: string | null;
    fecha_ingreso: string | null;
    activo?: boolean;
}

// ============================================================================
// API SERVICE
// ============================================================================

export const DocenteService = {

    listar: async (params: { incluir_inactivos?: boolean; buscar?: string } = {}): Promise<{ success: boolean; data: Docente[]; message?: string }> => {
        try {
            const response = await api.get(`/docentes`, { params });
            return response.data;
        } catch (error: any) {
            return { success: false, data: [], message: error.response?.data?.message || 'Error al obtener docentes' };
        }
    },

    crear: async (data: DocenteForm): Promise<{ success: boolean; data?: Docente; message: string }> => {
        try {
            const response = await api.post('/docentes', data);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 422) {
                const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
                return { success: false, message: errorMessages };
            }
            return { success: false, message: error.response?.data?.message || 'Error al crear docente' };
        }
    },

    actualizar: async (cod_docente: number, data: DocenteForm): Promise<{ success: boolean; data?: Docente; message: string }> => {
        try {
            // Aseguramos que la contraseña se omita si está vacía, para no borrar el hash
            const dataToSend = { ...data };
            if (dataToSend.password === '') {
                delete dataToSend.password;
            }

            const response = await api.put(`/docentes/${cod_docente}`, dataToSend);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 422) {
                const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
                return { success: false, message: errorMessages };
            }
            return { success: false, message: error.response?.data?.message || 'Error al actualizar docente' };
        }
    },

    eliminar: async (cod_docente: number): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await api.delete(`/docentes/${cod_docente}`);
            return response.data;
        } catch (error: any) {
            return { success: false, message: error.response?.data?.message || 'Error al desactivar docente' };
        }
    },

    reactivar: async (cod_docente: number): Promise<{ success: boolean; data?: Docente; message: string }> => {
        try {
            const response = await api.post(`/docentes/${cod_docente}/reactivar`);
            return response.data;
        } catch (error: any) {
            return { success: false, message: error.response?.data?.message || 'Error al reactivar docente' };
        }
    },
};