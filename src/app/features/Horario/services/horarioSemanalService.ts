import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/horarios/semanal`;

export const horarioSemanalService = {
  async obtenerHorarios(filtro?: string, id?: number) {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const params: any = {};
    if (filtro && id) {
      params.filtro = filtro;
      params.id = id;
    }

    const response = await axios.get(API_URL, { headers, params });
    return response.data;
  },
};
