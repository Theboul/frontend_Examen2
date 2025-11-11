import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/docente/horarios-personales`;

export const cargaHorariaDocenteService = {
  async obtenerHorarioPersonal() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token de autenticación.");

    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  },
};
