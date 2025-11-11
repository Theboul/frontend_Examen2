import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/horarios-clase`;

export const horarioAutomaticoService = {
  /**
   * Genera horarios automáticamente para una gestión académica (CU7)
   * @param id_gestion ID de la gestión activa
   * @param id_carrera (Opcional) ID de la carrera
   */
  async generar(id_gestion: number, id_carrera?: number) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token no encontrado. Inicie sesión nuevamente.");

    const response = await axios.post(
      `${API_URL}/generar-automatico`,
      { id_gestion, id_carrera },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },
};
