// src/app/pages/GestionTipoAulaPage.tsx (O la ruta que uses para las páginas)

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import FormTipoAula from "../components/FormTipoAula";
import TableTipoAula from "../components/TableTipoAula";

export default function GestionTipoAulaPage() {
    const [refresh, setRefresh] = useState(false);
    const [tipoAulaToEdit, setTipoAulaToEdit] = useState(null); // Para futura edición
    const handleSuccess = () => {
        setRefresh(prev => !prev);
        setTipoAulaToEdit(null); // Limpiar edición
    };
    const handleEdit = (tipoAula: any) => { setTipoAulaToEdit(tipoAula); };

    return (
        <div className="min-h-screen w-full bg-white flex flex-col">
            <Header />
            <motion.main
                className="flex-grow mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-6"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2A3964] mb-6 border-b-4 border-[#880000] pb-2 text-center sm:text-left">
                    Catálogo de Tipos de Aula
                </h1>

                {/* Formulario (Para Crear/Editar) */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <FormTipoAula onSuccess={handleSuccess} tipoAulaToEdit={tipoAulaToEdit} onCancel={() => setTipoAulaToEdit(null)} />
                </motion.div>

                {/* Tabla */}
                <motion.div className="mt-8" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                    <TableTipoAula refresh={refresh} onEdit={handleEdit} />
                </motion.div>
            </motion.main>
            <Footer />
        </div>
    );
}