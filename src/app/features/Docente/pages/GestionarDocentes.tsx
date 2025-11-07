import { useState } from "react";
import { motion } from "framer-motion";
import FormDocente from "../components/FormDocentes";
import TableDocentes from "../components/TableDocentes";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

/**
 * Vista principal para la gestión de docentes.
 * Muestra el formulario de registro y la tabla de listado.
 * Usa 'refresh' para comunicar el éxito del formulario a la tabla.
 */
export default function GestionPage() {
  // Estado para forzar la recarga de datos en la tabla
  const [refresh, setRefresh] = useState(false);

  // Función que se llama al CREAR o EDITAR un docente con éxito
  const handleSuccess = () => {
    // Alternamos el estado para forzar el useEffect de TableDocentes
    setRefresh(prev => !prev);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* HEADER */}
      <Header />

      {/* ANIMACIÓN PRINCIPAL DEL CONTENIDO */}
      <motion.main
        className="flex-grow mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* TÍTULO */}
        {/* El título es completamente responsivo por defecto con Tailwind */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2A3964] mb-6 border-b-4 border-[#880000] pb-2 text-center sm:text-left">
          Gestión de Docentes
        </h1>

        {/* FORMULARIO DE REGISTRO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Se pasa la función de éxito para que el formulario recargue la tabla */}
          <FormDocente onSuccess={handleSuccess} />
        </motion.div>

        {/* TABLA DE DOCENTES */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Se pasa el estado 'refresh' para que la tabla escuche los cambios */}
          <TableDocentes refresh={refresh} />
        </motion.div>
      </motion.main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}