import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/horarios/publicar`;

export const publicarHorariosService = {
  /**
   * Envía solicitud para publicar horarios (CU17)
   * Cambia de estado APROBADA → PUBLICADA
   */
  async publicar() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(API_URL, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return {
          success: false,
          message: error.response.data?.message || "Error al publicar horarios",
          errores: error.response.data?.errores || [],
          status: error.response.status,
        };
      }
      return {
        success: false,
        message: "No se pudo conectar con el servidor.",
        errores: [],
        status: 500,
      };
    }
  },
};
