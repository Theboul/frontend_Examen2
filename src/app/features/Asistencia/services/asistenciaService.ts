import { api } from "../../../../lib/axios";
import authService from "../../../../service/authService";

// ================================
// Servicio de Asistencia y Justificación
// ================================
export const asistenciaService = {
  /**
   * Registrar asistencia por botón (CU9)
   */
  registrarAsistenciaBoton: async (id_horario_clase: number, coordenadas: { latitud: number; longitud: number }) => {
    const token = authService.getToken();
    const response = await api.post(
      "/asistencia/registrar",
      { id_horario_clase, coordenadas },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  /**
   * Registrar asistencia por QR (CU9)
   */
  registrarAsistenciaQR: async (id_horario_clase: number, id_aula_escaneada: number, coordenadas: { latitud: number; longitud: number }) => {
    const token = authService.getToken();
    const response = await api.post(
      "/asistencia/registrar-qr",
      { id_horario_clase, id_aula_escaneada, coordenadas },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  /**
   * Justificar una ausencia (CU20)
   */
  justificarAusencia: async (id_asistencia: number, motivo: string, documento?: File) => {
    const token = authService.getToken();
    const formData = new FormData();
    formData.append("motivo", motivo);
    if (documento) formData.append("documento", documento);

    const response = await api.post(`/asistencia/${id_asistencia}/justificar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
