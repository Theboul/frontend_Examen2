import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/asignaciones-docente`;

export const asignacionDocenteService = {
  // 🔹 Listar todas las asignaciones
  async listar() {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // 🔹 Alias opcional (compatibilidad con otros módulos)
  async getAll() {
    return await this.listar();
  },

  // 🔹 Crear nueva asignación docente
  async crearAsignacion(data: { cod_docente: number; id_materia_grupo: number; hrs_asignadas: number }) {
    const token = localStorage.getItem("token");
    const response = await axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
