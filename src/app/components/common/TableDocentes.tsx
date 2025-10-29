import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { GestionService } from "../../features/Gestion/services/gestionService";

export default function GestionTable({ refresh }: { refresh: boolean }) {
  const [gestiones, setGestiones] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const cargarGestiones = async () => {
    const res = await GestionService.listar();
    if (res.success) setGestiones(res.data);
  };

  useEffect(() => {
    cargarGestiones();
  }, [refresh]);

  // 🔍 Detecta si hay scroll horizontal para mostrar sombra
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
    const res = await GestionService.activar(id);
    alert(res.message);
    cargarGestiones();
  };

  const eliminar = async (id: number) => {
    if (confirm("¿Deseas eliminar esta gestión?")) {
      const res = await GestionService.eliminar(id);
      alert(res.message);
      cargarGestiones();
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
        Docentes Registrados
      </h2>

      {/* 🌐 Tabla única, adaptable y con header sticky */}
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
              <th className="py-2 px-3 whitespace-nowrap">Codigo Docente</th>
              <th className="whitespace-nowrap">ID Usuario</th>
              <th className="whitespace-nowrap">Tipo de Contrato</th>
              <th className="whitespace-nowrap">Titulo</th>
              <th className="whitespace-nowrap">Especialidad</th>
              <th className="whitespace-nowrap">Grado Academico</th>
              <th className="whitespace-nowrap">Activo</th>
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
                  <td className="py-2 px-2">{g.anio}</td>
                  <td>{g.semestre}</td>
                  <td>{g.fecha_inicio}</td>
                  <td>{g.fecha_fin}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        g.activo ? "bg-green-600" : "bg-gray-400"
                      }`}
                    >
                      {g.activo ? "Activa" : "Inactiva"}
                    </span>
                  </td>
                  <td className="flex flex-col sm:flex-row justify-center items-center gap-2 py-2">
                    <button
                      onClick={() => activar(g.id_gestion)}
                      className="bg-[#2A3964] text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto"
                    >
                      Activar
                    </button>
                    <button
                      onClick={() => eliminar(g.id_gestion)}
                      className="bg-[#880000] text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto"
                    >
                      Eliminar
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-3 text-gray-500">
                  No hay docentes registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
