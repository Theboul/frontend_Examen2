import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { DocenteService, type Docente } from "../../Docente/services/docenteService";
// Asumo estas rutas son correctas
import Modal from "../../../components/common/Modal";
import FormDocente from "./FormDocentes";

export default function TableDocentes({ refresh }: { refresh: boolean }) {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const [docenteAEditar, setDocenteAEditar] = useState<Docente | null>(null);

  const cargarDocentes = async () => {
    const res = await DocenteService.listar({ incluir_inactivos: true });
    if (res.success) setDocentes(res.data);
    else console.error("Error al cargar docentes:", res.message);
  };

  useEffect(() => {
    cargarDocentes();
  }, [refresh]);

  const finalizarAccion = () => {
    setDocenteAEditar(null);
    cargarDocentes();
  };

  const iniciarEdicion = (docente: Docente) => {
    setDocenteAEditar(docente);
  };

  const reactivar = async (cod_docente: number, nombre: string) => {
    if (confirm(`¿Deseas reactivar al docente ${nombre}?`)) {
      const res = await DocenteService.reactivar(cod_docente);
      alert(res.message);
      finalizarAccion();
    }
  };

  const desactivar = async (cod_docente: number, nombre: string) => {
    if (confirm(`¿Deseas DESACTIVAR al docente ${nombre}?`)) {
      const res = await DocenteService.eliminar(cod_docente);
      alert(res.message);
      finalizarAccion();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!tableRef.current) return;
      setScrolled(tableRef.current.scrollLeft > 0);
    };
    const el = tableRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-4 mt-6 w-full"
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>

      <h2 className="font-semibold mb-4 text-center sm:text-left text-lg sm:text-xl" style={{ color: "#2A3964" }}>Docentes Registrados</h2>

      <div ref={tableRef} className={`w-full overflow-x-auto rounded-lg border relative transition-shadow duration-300 ${scrolled ? "shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.15)]" : ""}`}>
        <table className="min-w-full text-sm text-center border-collapse">
          <thead className="sticky top-0 z-10" style={{ backgroundColor: "#2A3964", color: "#ffffff" }}>
            <tr>
              <th className="py-2 px-3 whitespace-nowrap">Código</th>
              <th className="whitespace-nowrap text-left px-3">Nombre Completo</th>
              <th className="whitespace-nowrap">Email</th>
              <th className="whitespace-nowrap">CI</th>
              <th className="whitespace-nowrap">Contrato</th>
              <th className="whitespace-nowrap">Grado</th>
              <th className="whitespace-nowrap">Estado</th>
              <th className="whitespace-nowrap">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {docentes.length > 0 ? (
              docentes.map((docente) => (
                <motion.tr key={docente.cod_docente} className="border-b hover:bg-gray-100 text-gray-700 transition-all" whileHover={{ scale: 1.01 }}>
                  <td className="py-2 px-2 font-medium">{docente.cod_docente}</td>
                  <td className="text-left px-3">{docente.perfil.nombre_completo}</td>
                  <td>{docente.perfil.email}</td>
                  <td>{docente.perfil.ci}</td>
                  <td>{docente.tipo_contrato.nombre}</td>
                  <td>{docente.grado_academico || 'N/A'}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${docente.activo ? "bg-green-600" : "bg-red-500"}`}>
                      {docente.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="flex flex-col sm:flex-row justify-center items-center gap-2 py-2">
                    <button onClick={() => iniciarEdicion(docente)}
                      className="bg-orange-500 text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto min-w-[70px]">
                      Editar
                    </button>
                    {docente.activo ? (
                      <button onClick={() => desactivar(docente.cod_docente, docente.perfil.nombre_completo)}
                        className="bg-[#880000] text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto min-w-[70px]">
                        Desactivar
                      </button>
                    ) : (
                      <button onClick={() => reactivar(docente.cod_docente, docente.perfil.nombre_completo)}
                        className="bg-[#2A3964] text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto min-w-[70px]">
                        Reactivar
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-3 text-gray-500">
                  No hay docentes registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {docenteAEditar && (
        <Modal open={!!docenteAEditar} onClose={() => setDocenteAEditar(null)} title={`Editar Docente: ${docenteAEditar.perfil.nombre_completo}`}>
          <FormDocente docente={docenteAEditar} onSuccess={finalizarAccion} />
        </Modal>
      )}
    </motion.div>
  );
}