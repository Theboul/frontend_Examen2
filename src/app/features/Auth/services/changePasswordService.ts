
import { api } from '../../../../lib/axios';

/**
 * Cambiar contraseña en primer ingreso o manualmente.
 * Usa la instancia global 'api', que ya incluye el interceptor de token.
 */
export const changePasswordService = {
  /**
   * Envía la solicitud al backend Laravel para cambiar contraseña.
   * * @param id_usuario ID del usuario autenticado
   * @param password_actual Contraseña actual del usuario
   * @param password_nueva Nueva contraseña
   * @param password_nueva_confirmation Confirmación de la nueva contraseña
   */
  async changePassword({
    id_usuario,
    password_actual,
    password_nueva,
    password_nueva_confirmation,
  }: {
    id_usuario: number;
    password_actual: string;
    password_nueva: string;
    password_nueva_confirmation: string;
  }) {
    try {

      // El interceptor se encargará del token y la baseURL.
      const response = await api.post(
        '/auth/cambiar-password', // Solo la ruta relativa
        {
          id_usuario,
          password_actual,
          password_nueva,
          password_nueva_confirmation,
        }
      );

      return response.data; // Devuelve el { success: true, ... } del backend
      
    } catch (error: any) {
      console.error("Error en changePasswordService:", error);
      
      // El interceptor global de api.js ya maneja el 401 (logout),
      // pero aquí reenviamos el mensaje de error específico (ej. "Contraseña actual incorrecta")
      throw new Error(
        error.response?.data?.message || "No se pudo cambiar la contraseña."
      );
    }
  },
};