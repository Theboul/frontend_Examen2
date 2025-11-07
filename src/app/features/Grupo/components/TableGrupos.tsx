import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { GrupoService, type Grupo } from "../../Grupo/services/grupoService";
import Modal from "../../../components/common/Modal";
import FormGrupo from "../components/FormGrupos";


export default function TableGrupos({ refresh }: { refresh: boolean }) {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const [grupoAEditar, setGrupoAEditar] = useState<Grupo | null>(null); // Usado

  const cargarGrupos = async () => {
    const res = await GrupoService.listar({ incluir_inactivos: true });
    if (res.success) setGrupos(res.data);
    else console.error("Error al cargar grupos:", res.message);
  };

  useEffect(() => {
    cargarGrupos();
  }, [refresh]);

  // Función usada
  const finalizarAccion = () => {
    setGrupoAEditar(null);
    cargarGrupos();
  };

  // Función usada
  const iniciarEdicion = (grupo: Grupo) => {
    setGrupoAEditar(grupo);
  };

  // Función usada (id y nombre se usan en confirm/service call)
  const reactivar = async (id: number, nombre: string) => {
    if (confirm(`¿Deseas reactivar el grupo "${nombre}"?`)) {
      const res = await GrupoService.reactivar(id);
      alert(res.message);
      finalizarAccion();
    }
  };

  // Función usada
  const desactivar = async (id: number, nombre: string) => {
    if (confirm(`¿Deseas DESACTIVAR el grupo "${nombre}"?`)) {
      const res = await GrupoService.eliminar(id);
      alert(res.message);
      finalizarAccion();
    }
  };

  // Función usada (setScrolled se usa aquí)
  const handleScroll = () => {
    if (!tableRef.current) return;
    setScrolled(tableRef.current.scrollLeft > 0);
  };

  useEffect(() => {
    const el = tableRef.current;
    el?.addEventListener("scroll", handleScroll);
    // handleScroll se usa aquí en el cleanup
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-4 mt-6 w-full"
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>

      <h2 className="font-semibold mb-4 text-center sm:text-left text-lg sm:text-xl" style={{ color: "#2A3964" }}>Grupos Registrados</h2>

      <div ref={tableRef} className={`w-full overflow-x-auto rounded-lg border relative transition-shadow duration-300 ${scrolled ? "shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.15)]" : ""}`}>
        <table className="min-w-full text-sm text-center border-collapse">
          <thead className="sticky top-0 z-10" style={{ backgroundColor: "#2A3964", color: "#ffffff" }}>
            <tr>
              <th className="py-2 px-3 whitespace-nowrap">ID Grupo</th>
              <th className="whitespace-nowrap">Materia (Sigla)</th>
              <th className="whitespace-nowrap">Nombre</th>
              <th className="whitespace-nowrap">Descripción</th>
              <th className="whitespace-nowrap">Capacidad</th>
              <th className="whitespace-nowrap">Cupos</th>
              <th className="whitespace-nowrap">Estado</th>
              <th className="whitespace-nowrap">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {grupos.length > 0 ? (
              grupos.map((grupo) => (
                <motion.tr key={grupo.id_grupo} className="border-b hover:bg-gray-100 text-gray-700 transition-all" whileHover={{ scale: 1.01 }}>
                  <td className="py-2 px-2 font-medium">{grupo.id_grupo}</td>
                  <td className="font-medium">{grupo.materia.sigla}</td>
                  <td>{grupo.nombre}</td>
                  <td>{grupo.descripcion || 'N/A'}</td>
                  <td>{grupo.capacidad_maxima}</td>
                  <td>{grupo.cupos}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${grupo.activo ? "bg-green-600" : "bg-red-500"}`}>
                      {grupo.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="flex flex-col sm:flex-row justify-center items-center gap-2 py-2">
                    <button onClick={() => iniciarEdicion(grupo)}
                      className="bg-orange-500 text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto min-w-[70px]">
                      Editar
                    </button>
                    {grupo.activo ? (
                      <button onClick={() => desactivar(grupo.id_grupo, grupo.nombre)}
                        className="bg-[#880000] text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto min-w-[70px]">
                        Desactivar
                      </button>
                    ) : (
                      <button onClick={() => reactivar(grupo.id_grupo, grupo.nombre)}
                        className="bg-[#2A3964] text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto min-w-[70px]">
                        Reactivar
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))
            ) : (<tr><td colSpan={9} className="py-3 text-gray-500">No hay grupos registrados</td></tr>)}
          </tbody>
        </table>
      </div>
      {/* MODAL DE EDICIÓN */}
      {grupoAEditar && (
        <Modal
          open={!!grupoAEditar}
          onClose={() => setGrupoAEditar(null)}
          title={`Editar Grupo: ${grupoAEditar.nombre}`}
        >
          <FormGrupo grupo={grupoAEditar} onSuccess={finalizarAccion} />
        </Modal>
      )}
    </motion.div>
  );
}