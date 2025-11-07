import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { CarreraService, type Carrera } from "../services/CarreraService";
// 💡 Importar componentes necesarios
import FormCarreras from "./FormCarreras";
import Modal from "../../../components/common/Modal";

export default function TableCarreras({ refresh }: { refresh: boolean }) {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  // ESTADO DE EDICIÓN: Guarda la carrera seleccionada para el modal
  const [carreraAEditar, setCarreraAEditar] = useState<Carrera | null>(null);

  const cargarCarreras = async () => {
    const res = await CarreraService.listar(true);
    if (res.success) setCarreras(res.data);
    else alert("Error al cargar carreras: " + res.message);
  };

  useEffect(() => {
    cargarCarreras();
  }, [refresh]);

  // Lógica para scroll horizontal
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

  // Acciones
  const reactivar = async (id: number, nombre: string) => {
    if (confirm(`¿Deseas reactivar la carrera ${nombre}?`)) {
      const res = await CarreraService.reactivar(id);
      alert(res.message);
      cargarCarreras();
    }
  };

  const desactivar = async (id: number, nombre: string) => {
    if (confirm(`¿Deseas DESACTIVAR (eliminar) la carrera ${nombre}?`)) {
      const res = await CarreraService.eliminar(id);
      alert(res.message);
      cargarCarreras();
    }
  };

  // Inicia la edición y abre el modal
  const iniciarEdicion = (carrera: Carrera) => {
    setCarreraAEditar(carrera);
  };

  // Cierra el modal y recarga la tabla
  const finalizarEdicion = () => {
    setCarreraAEditar(null); // Cierra el modal
    cargarCarreras(); // Refresca la tabla
  }


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
        Carreras Registradas
      </h2>

      {/* Tabla con scroll horizontal */}
      <div
        ref={tableRef}
        className={`w-full overflow-x-auto rounded-lg border relative transition-shadow duration-300 ${scrolled ? "shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.15)]" : ""
          }`}
      >
        <table className="min-w-full text-sm text-center border-collapse">
          <thead
            className="sticky top-0 z-10"
            style={{ backgroundColor: "#2A3964", color: "#ffffff" }}
          >
            <tr>
              <th className="py-2 px-3 whitespace-nowrap">ID</th>
              <th className="whitespace-nowrap text-left px-3">Nombre</th>
              <th className="whitespace-nowrap">Código</th>
              <th className="whitespace-nowrap">Duración (Años)</th>
              <th className="whitespace-nowrap">Activo</th>
              <th className="whitespace-nowrap">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {carreras.length > 0 ? (
              carreras.map((carrera) => (
                <motion.tr
                  key={carrera.id_carrera}
                  className="border-b hover:bg-gray-100 text-gray-700 transition-all"
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="py-2 px-2">{carrera.id_carrera}</td>
                  <td className="text-left px-3 font-medium">{carrera.nombre}</td>
                  <td>{carrera.codigo}</td>
                  <td>{carrera.duracion_anios}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-medium ${carrera.activo ? "bg-green-600" : "bg-red-400"
                        }`}
                    >
                      {carrera.activo ? "Activa" : "Inactiva"}
                    </span>
                  </td>
                  <td className="flex flex-col sm:flex-row justify-center items-center gap-2 py-2">

                    {/* Botón de Edición */}
                    <button
                      onClick={() => iniciarEdicion(carrera)}
                      className="bg-orange-500 text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto min-w-[70px]"
                    >
                      Editar
                    </button>

                    {/* Botón de Desactivar/Activar */}
                    {carrera.activo ? (
                      <button
                        onClick={() => desactivar(carrera.id_carrera, carrera.nombre)}
                        className="bg-[#880000] text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto min-w-[70px]"
                      >
                        Desactivar
                      </button>
                    ) : (
                      <button
                        onClick={() => reactivar(carrera.id_carrera, carrera.nombre)}
                        className="bg-[#2A3964] text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto min-w-[70px]"
                      >
                        Reactivar
                      </button>
                    )}

                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-3 text-gray-500">
                  No hay carreras registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL DE EDICIÓN */}
      {carreraAEditar && (
        <Modal
          open={!!carreraAEditar}
          onClose={() => setCarreraAEditar(null)}
          title={`Editar Carrera: ${carreraAEditar.nombre}`}
        >
          {/* Reutilizamos el formulario pasándole la carrera y el callback de éxito */}
          <FormCarreras
            carrera={carreraAEditar}
            onSuccess={finalizarEdicion}
          />
        </Modal>
      )}
    </motion.div>
  );
}