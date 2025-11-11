import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/horarios-clase`;

export const horarioService = {
  /**
   * Listar todos los horarios (opcional: filtrar por gestión)
   */
  getAll: (params?: any) => axios.get(API_URL, { params }),

  /**
   * Crear un horario manualmente (CU6)
   */
  create: (data: any) => axios.post(API_URL, data),

  /**
   * Actualizar un horario existente
   */
  update: (id: number, data: any) => axios.put(`${API_URL}/${id}`, data),

  /**
   * Eliminar (cancelar) un horario
   */
  delete: (id: number) => axios.delete(`${API_URL}/${id}`),

  /**
   * Reactivar un horario previamente desactivado
   */
  reactivar: (id: number) => axios.post(`${API_URL}/${id}/reactivar`),

  /**
   * Generar horarios automáticamente (CU7)
   */
  generarAutomatico: (data: any) =>
    axios.post(`${API_URL}/generar-automatico`, data),

  /**
   * Obtener catálogos de apoyo (días, bloques, tipos de clase)
   */
  getDias: () => axios.get(`${import.meta.env.VITE_API_URL}/dias/select`),
  getBloques: () =>
    axios.get(`${import.meta.env.VITE_API_URL}/bloques-horario/select`),
  getTiposClase: () =>
    axios.get(`${import.meta.env.VITE_API_URL}/tipos-clase/select`),
};
