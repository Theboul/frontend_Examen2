import { api } from '../lib/axios';

// ========== TIPOS DE DATOS ==========

export interface User {
  id_usuario: number;
  usuario: string;
  email: string;
  id_rol: number;
  rol: 'Administrador' | 'Coordinador' | 'Autoridad';
  perfil: any | null;
  docente: any | null;
  primer_ingreso?: boolean; // Opcional porque puede venir en data.primer_ingreso
}

export interface LoginData {
  email: string; // Puede ser email o username
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
  primer_ingreso?: boolean; // El backend puede devolver esto aquí también
}

export interface CambiarPasswordData {
  password_actual: string;
  password_nuevo: string;
  password_nuevo_confirmation: string;
}

// ========== SERVICIO DE AUTENTICACIÓN ==========

export const authService = {
  
  /**
   * Login de usuario
   */
  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      // Enviar como "username" porque el backend Laravel espera ese campo
      const loginPayload = {
        username: data.email, // El backend espera "username"
        password: data.password
      };
      
      // Laravel devuelve: { success, message, data: { token, user } }
      const response = await api.post<any>('/auth/login', loginPayload);
      
      console.log('🔍 Respuesta completa del backend:', response.data);
      
      // Extraer datos de la estructura de Laravel
      const laravelData = response.data.data || response.data;
      const token = laravelData.token;
      const user = laravelData.user;
      const primerIngreso = laravelData.primer_ingreso;
      
      // Validar que tenemos los datos necesarios
      if (!token || !user) {
        throw new Error('Respuesta inválida del servidor');
      }
      
      // Guardar token y usuario en localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Retornar en el formato esperado
      return {
        token,
        user,
        message: response.data.message,
        primer_ingreso: primerIngreso
      };
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  /**
   * Logout de usuario
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Limpiar localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  },

  /**
   * Cambiar password en primer ingreso
   */
  cambiarPassword: async (data: CambiarPasswordData): Promise<any> => {
    try {
      const response = await api.post('/auth/cambiar-password', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  /**
   * Obtener usuario actual del localStorage
   */
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Obtener token actual
   */
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated: (): boolean => {
    return !!authService.getToken();
  },

  /**
   * Verificar si el usuario tiene un rol específico
   */
  hasRole: (role: string): boolean => {
    const user = authService.getCurrentUser();
    return user?.rol === role;
  },

  /**
   * Verificar si es administrador
   */
  isAdmin: (): boolean => {
    return authService.hasRole('Administrador');
  },

  /**
   * Verificar si es coordinador
   */
  isCoordinador: (): boolean => {
    return authService.hasRole('Coordinador');
  },

  /**
   * Verificar si es autoridad
   */
  isAutoridad: (): boolean => {
    return authService.hasRole('Autoridad');
  },

  /**
   * Verificar si es primer ingreso
   */
  isPrimerIngreso: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.primer_ingreso === true;
  }
};

export default authService;