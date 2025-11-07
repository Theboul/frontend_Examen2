import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { AulaService, type Aula } from "../services/aulaService";
import Modal from "../../../components/common/Modal";
import FormAulas from "./FormAulas";

export default function TableAulas({ refresh }: { refresh: boolean }) {
  // Mantenemos setAulas aquí. Si persiste la advertencia, es un problema de linter, no de lógica.
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const [aulaAEditar, setAulaAEditar] = useState<Aula | null>(null);

  const cargarAulas = async () => {
    const res = await AulaService.listar({ incluir_inactivas: true });
    if (res.success) setAulas(res.data);
    else console.error("Error al cargar aulas:", res.message);
  };

  useEffect(() => {
    cargarAulas();
  }, [refresh]);

  const finalizarAccion = () => {
    setAulaAEditar(null);
    cargarAulas();
  }

  const iniciarEdicion = (aula: Aula) => {
    setAulaAEditar(aula);
  };

  const reactivar = async (id: number, nombre: string) => {
    if (confirm(`¿Deseas reactivar el aula "${nombre}"?`)) {
      const res = await AulaService.reactivar(id);
      alert(res.message);
      finalizarAccion();
    }
  };

  const desactivar = async (id: number, nombre: string) => {
    if (confirm(`¿Deseas DESACTIVAR (eliminar) el aula "${nombre}"?`)) {
      const res = await AulaService.desactivar(id);
      alert(res.message);
      finalizarAccion();
    }
  };

  const toggleMantenimiento = async (id: number, nombre: string, estadoActual: boolean) => {
    const accion = estadoActual ? 'sacar de mantenimiento' : 'poner en mantenimiento';
    if (confirm(`¿Deseas ${accion} el aula "${nombre}"?`)) {
      const res = await AulaService.toggleMantenimiento(id); // Uso de id
      alert(res.message);
      finalizarAccion();
    }
  };

  const handleScroll = () => {
    if (!tableRef.current) return;
    setScrolled(tableRef.current.scrollLeft > 0);
  };

  useEffect(() => {
    const el = tableRef.current;
    el?.addEventListener("scroll", handleScroll);
    // Aquí handleScroll se pasa como referencia.
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [tableRef.current]);

  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-4 mt-6 w-full"
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>

      <h2 className="font-semibold mb-4 text-center sm:text-left text-lg sm:text-xl" style={{ color: "#2A3964" }}>Aulas Registradas</h2>

      <div
        ref={tableRef}
        className={`w-full overflow-x-auto rounded-lg border relative transition-shadow duration-300 ${scrolled ? "shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.15)]" : ""}`}>
        <table className="min-w-full text-sm text-center border-collapse">
          <thead className="sticky top-0 z-10" style={{ backgroundColor: "#2A3964", color: "#ffffff" }}>
            <tr>
              <th className="py-2 px-3 whitespace-nowrap">ID</th>
              <th className="whitespace-nowrap text-left px-3">Nombre</th>
              <th className="whitespace-nowrap">Capacidad</th>
              <th className="whitespace-nowrap">Piso</th>
              <th className="whitespace-nowrap">Mantenimiento</th>
              <th className="whitespace-nowrap">Estado</th>
              <th className="whitespace-nowrap">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {aulas.length > 0 ? (
              aulas.map((aula) => (
                <motion.tr key={aula.id_aula} className="border-b hover:bg-gray-100 text-gray-700 transition-all">
                  <td className="py-2 px-2 font-medium">{aula.id_aula}</td>
                  <td className="text-left px-3">{aula.nombre}</td>
                  <td>{aula.capacidad}</td>
                  <td>{aula.piso}</td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-medium ${aula.mantenimiento ? "bg-yellow-600" : "bg-blue-600"
                        }`}
                    >
                      {aula.mantenimiento ? "Mant." : "Disp."}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-medium ${aula.activo ? "bg-green-600" : "bg-red-500"
                        }`}
                    >
                      {aula.activo ? "Activa" : "Inactiva"}
                    </span>
                  </td>

                  <td className="flex flex-col sm:flex-row justify-center items-center gap-2 py-2">
                    <button onClick={() => iniciarEdicion(aula)}
                      className="bg-orange-500 text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 w-full sm:w-auto min-w-[70px]">
                      Editar
                    </button>

                    <button onClick={() => toggleMantenimiento(aula.id_aula, aula.nombre, aula.mantenimiento)}
                      className={`text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 w-full sm:w-auto min-w-[70px] ${aula.mantenimiento ? "bg-yellow-700" : "bg-yellow-500"
                        }`}>
                      {aula.mantenimiento ? 'Quitar Mant.' : 'A Mantenimiento'}
                    </button>

                    {aula.activo ? (
                      <button onClick={() => desactivar(aula.id_aula, aula.nombre)}
                        className="bg-[#880000] text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 w-full sm:w-auto min-w-[70px]">
                        Desactivar
                      </button>
                    ) : (
                      <button onClick={() => reactivar(aula.id_aula, aula.nombre)}
                        className="bg-[#2A3964] text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 w-full sm:w-auto min-w-[70px]">
                        Reactivar
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))
            ) : (<tr><td colSpan={7} className="py-3 text-gray-500">No hay aulas registradas</td></tr>)}
          </tbody>
        </table>
      </div>

      {/* MODAL DE EDICIÓN */}
      {/* Debes tener este Modal importado y accesible */}
      {aulaAEditar && (
        <Modal
          open={!!aulaAEditar}
          onClose={() => setAulaAEditar(null)}
          title={`Editar Aula: ${aulaAEditar.nombre}`}
        >
          <FormAulas aula={aulaAEditar} onSuccess={finalizarAccion} />
        </Modal>
      )}
    </motion.div>
  );
}