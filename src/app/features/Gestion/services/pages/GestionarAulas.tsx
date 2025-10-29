import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Import necesario
import GestionForm from "../../../../../app/components/common/FormAulas";
import GestionTable from "../../../../../app/components/common/TableAulas";
import Header from "../../../../components/common/Header";
import Footer from "../../../../components/common/Footer";

export default function GestionPage() {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate(); // ✅ Hook para redirigir

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* HEADER */}
      <Header />

      {/* ANIMACIÓN PRINCIPAL */}
      <motion.main
        className="flex-grow mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* TÍTULO */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2A3964] mb-6 border-b-4 border-[#880000] pb-2 text-center sm:text-left">
          Gestión de Aulas
        </h1>
<motion.div
  className="flex justify-center sm:justify-end mb-6"
  initial={{ opacity: 10, y: 10 }}
  animate={{ opacity: 90, y: 10 }}
  transition={{ duration: 0.4, delay: 0.2 }}
>
  <motion.button
    onClick={() => navigate("/tipos-aulas")}
    className=" text-white/900  font-medium px-5 py-2 rounded-lg shadow-blue-950 hover:bg-blue-200 shadow-blue-950transition-all duration-300"
  >
    Tipos de Aulas
  </motion.button>
</motion.div>



        {/* FORMULARIO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GestionForm onCreated={() => setRefresh(!refresh)} />
        </motion.div>

        {/* TABLA */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GestionTable refresh={refresh} />
        </motion.div>
      </motion.main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
