import { useState } from "react";
import { motion } from "framer-motion";
import FormGrupo from "../../Grupo/components/FormGrupos";
import TableGrupos from "../../Grupo/components/TableGrupos";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

export default function GestionPage() {
  const [refresh, setRefresh] = useState(false);
  const handleSuccess = () => setRefresh(prev => !prev);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <Header />
      <motion.main
        className="flex-grow mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-6"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2A3964] mb-6 border-b-4 border-[#880000] pb-2 text-center sm:text-left">
          Gestión de Grupos
        </h1>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <FormGrupo onSuccess={handleSuccess} />
        </motion.div>

        <motion.div className="mt-8" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <TableGrupos refresh={refresh} />
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
}