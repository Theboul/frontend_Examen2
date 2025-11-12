import { api } from "../../../../lib/axios";

/**
 * Servicio para CU11 - Generar Reportes de Asistencia
 *
 * Permite obtener y exportar reportes de asistencia
 * filtrados por docente, materia, grupo o fechas.
 */
export const reporteAsistenciaService = {
  /**
   * Obtener reporte dinámico (para mostrar en pantalla)
   */
  getReporte: async (params: {
    id_gestion: number;
    id_docente?: number;
    id_materia?: number;
    id_grupo?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
  }) => {
    try {
      const response = await api.get("/reportes/asistencia", { params });
      return response.data;
    } catch (error: any) {
      console.error("❌ Error al obtener reporte:", error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  /**
   * Exportar a PDF
   */
  exportarPDF: async (params: {
    id_gestion: number;
    id_docente?: number;
    id_materia?: number;
    id_grupo?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
  }) => {
    try {
      const response = await api.get("/reportes/asistencia", {
        params: { ...params, exportar: "pdf" },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_asistencia.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error: any) {
      console.error("❌ Error al exportar PDF:", error);
      throw error.response?.data || error;
    }
  },

  /**
   * Exportar a Excel
   */
  exportarExcel: async (params: {
    id_gestion: number;
    id_docente?: number;
    id_materia?: number;
    id_grupo?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
  }) => {
    try {
      const response = await api.get("/reportes/asistencia", {
        params: { ...params, exportar: "excel" },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_asistencia.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error: any) {
      console.error("❌ Error al exportar Excel:", error);
      throw error.response?.data || error;
    }
  },
};
