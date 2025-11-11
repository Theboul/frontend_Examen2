import axios from "axios";

/**
 * Cambiar contraseña en primer ingreso o manualmente.
 * Usa el token almacenado en localStorage.
 */
export const changePasswordService = {
  /**
   * Envía la solicitud al backend Laravel para cambiar contraseña.
   * 
   * @param id_usuario ID del usuario autenticado
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
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Sesión no válida. Inicie sesión nuevamente.");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/cambiar-password`,
        {
          id_usuario,
          password_actual,
          password_nueva,
          password_nueva_confirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          timeout: 15000,
        }
      );

      return response.data;
    } catch (error: any) {
      console.error("Error al cambiar contraseña:", error);
      throw new Error(
        error.response?.data?.message || "No se pudo cambiar la contraseña."
      );
    }
  },
};
