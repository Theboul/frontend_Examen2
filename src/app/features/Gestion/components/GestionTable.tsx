import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { gestionService, type Gestion } from "../services/gestionService";

interface GestionTableProps {
  refresh: boolean;
  onEdit?: (gestion: Gestion) => void;
}

export default function GestionTable({ refresh, onEdit }: GestionTableProps) {
  const [gestiones, setGestiones] = useState<Gestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  // Función para extraer solo la fecha (YYYY-MM-DD) sin la hora
  const extraerSoloFecha = (fecha: string): string => {
    // Dividir por 'T' y tomar solo la primera parte
    return fecha.split('T')[0];
  };

  const cargarGestiones = async () => {
    setLoading(true);
    try {
      const data = await gestionService.getAll();
      setGestiones(data);
    } catch (error) {
      console.error("Error al cargar gestiones:", error);
      alert("Error al cargar las gestiones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarGestiones();
  }, [refresh]);

  // Detecta si hay scroll horizontal para mostrar sombra
  useEffect(() => {
    const handleScroll = () => {
      if (!tableRef.current) return;
      const el = tableRef.current;
      setScrolled(el.scrollLeft > 0);
    };
    const el = tableRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const activar = async (id: number) => {
    try {
      await gestionService.activar(id);
      alert("✅ Gestión activada correctamente");
      cargarGestiones();
    } catch (error: any) {
      alert("❌ " + (error.message || "Error al activar la gestión"));
    }
  };

  const eliminar = async (id: number) => {
    if (confirm("¿Deseas eliminar esta gestión?")) {
      try {
        await gestionService.delete(id);
        alert("✅ Gestión eliminada correctamente");
        cargarGestiones();
      } catch (error: any) {
        alert("❌ " + (error.message || "Error al eliminar la gestión"));
      }
    }
  };

  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-4 mt-6 w-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <h2
        className="font-semibold mb-4 text-center sm:text-left text-lg sm:text-xl"
        style={{ color: "#2A3964" }}
      >
        Gestiones Registradas
      </h2>

      {loading && (
        <div className="text-center py-4 text-gray-500">
          Cargando gestiones...
        </div>
      )}

      {/* Tabla única, adaptable y con header sticky */}
      <div
        ref={tableRef}
        className={`w-full overflow-x-auto rounded-lg border relative transition-shadow duration-300 ${
          scrolled ? "shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.15)]" : ""
        }`}
      >
        <table className="min-w-full text-sm text-center border-collapse">
          <thead
            className="sticky top-0 z-10"
            style={{ backgroundColor: "#2A3964", color: "#ffffff" }}
          >
            <tr>
              <th className="py-2 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-sm">Año</th>
              <th className="py-2 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-sm">Semestre</th>
              <th className="py-2 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-sm">Inicio</th>
              <th className="py-2 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-sm">Fin</th>
              <th className="py-2 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-sm">Activo</th>
              <th className="py-2 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-sm">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {gestiones.length > 0 ? (
              gestiones.map((g) => (
                <motion.tr
                  key={g.id_gestion}
                  className="border-b hover:bg-gray-100 text-gray-700 transition-all"
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="py-2 px-2 text-xs sm:text-sm">{g.anio}</td>
                  <td className="py-2 px-2 text-xs sm:text-sm">{g.semestre}</td>
                  <td className="py-2 px-2 text-xs sm:text-sm">{extraerSoloFecha(g.fecha_inicio)}</td>
                  <td className="py-2 px-2 text-xs sm:text-sm">{extraerSoloFecha(g.fecha_fin)}</td>
                  <td className="py-2 px-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-[10px] sm:text-xs ${
                        g.activo ? "bg-green-600" : "bg-gray-400"
                      }`}
                    >
                      {g.activo ? "Activa" : "Inactiva"}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2">
                      <button
                        onClick={() => onEdit?.(g)}
                        className="bg-blue-600 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => activar(g.id_gestion)}
                        className="bg-[#2A3964] text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto"
                      >
                        Activar
                      </button>
                      <button
                        onClick={() => eliminar(g.id_gestion)}
                        className="bg-[#880000] text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-3 text-gray-500 text-xs sm:text-sm">
                  No hay gestiones registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
