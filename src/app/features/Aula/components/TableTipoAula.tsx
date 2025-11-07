import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { TipoAulaService, type TipoAula } from "../services/tipoAulaService";

interface TableProps {
    refresh: boolean;
    onEdit: (tipoAula: TipoAula) => void;
}

export default function TableTipoAula({ refresh, onEdit }: TableProps) {
    const [tiposAula, setTiposAula] = useState<TipoAula[]>([]);
    const [loading, setLoading] = useState(false);
    const tableRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);

    const cargarTiposAula = async () => {
        setLoading(true);
        try {
            // Listamos todos (activos e inactivos) para la gestión
            const res = await TipoAulaService.listar(true);
            if (res.success) setTiposAula(res.data);
        } catch (error) {
            console.error("Error al cargar tipos de aula:", error);
            alert("Error al cargar el catálogo de Tipos de Aula.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarTiposAula();
    }, [refresh]);

    // Función para cambiar el estado Activo/Inactivo (usando PUT)
    const toggleActivo = async (tipo: TipoAula) => {
        const nuevoEstado = !tipo.activo;
        const accion = nuevoEstado ? 'reactivar' : 'desactivar';

        if (confirm(`¿Deseas ${accion} el tipo de aula "${tipo.nombre}"?`)) {
            try {
                await TipoAulaService.actualizar(tipo.id_tipo_aula, {
                    nombre: tipo.nombre, // Reenviamos nombre y descripción
                    descripcion: tipo.descripcion,
                    activo: nuevoEstado
                });
                alert(`✅ Tipo de Aula ${accion} exitosamente.`);
                cargarTiposAula();
            } catch (error: any) {
                alert("❌ " + (error.message || `Error al ${accion} el tipo de aula.`));
            }
        }
    };

    // Lógica de scroll
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
        <motion.div className="bg-white shadow-md rounded-xl p-4 mt-6 w-full">
            <h2 className="font-semibold mb-4 text-center sm:text-left text-lg sm:text-xl" style={{ color: "#2A3964" }}>Tipos de Aula Registrados</h2>

            {loading && <div className="text-center py-4 text-gray-500">Cargando catálogo...</div>}

            <div ref={tableRef} className={`w-full overflow-x-auto rounded-lg border relative transition-shadow duration-300 ${scrolled ? "shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.15)]" : ""}`}>
                <table className="min-w-full text-sm text-center border-collapse">
                    <thead className="sticky top-0 z-10" style={{ backgroundColor: "#2A3964", color: "#ffffff" }}>
                        <tr>
                            <th className="py-2 px-3 whitespace-nowrap">ID</th>
                            <th className="whitespace-nowrap text-left px-3">Nombre</th>
                            <th className="whitespace-nowrap">Descripción</th>
                            <th className="whitespace-nowrap">Estado</th>
                            <th className="whitespace-nowrap">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tiposAula.length > 0 ? (
                            tiposAula.map((tipo) => (
                                <motion.tr key={tipo.id_tipo_aula} className="border-b hover:bg-gray-100 text-gray-700 transition-all">
                                    <td className="py-2 px-2 font-medium">{tipo.id_tipo_aula}</td>
                                    <td className="text-left px-3">{tipo.nombre}</td>
                                    <td>{tipo.descripcion || '—'}</td>
                                    <td>
                                        <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${tipo.activo ? "bg-green-600" : "bg-red-500"}`}>
                                            {tipo.activo ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>
                                    <td className="flex flex-col sm:flex-row justify-center items-center gap-2 py-2">
                                        <button onClick={() => onEdit(tipo)}
                                            className="bg-orange-500 text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto min-w-[70px]">
                                            Editar
                                        </button>

                                        <button onClick={() => toggleActivo(tipo)}
                                            className={`text-white text-xs sm:text-sm px-3 py-1 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto min-w-[70px] ${tipo.activo ? "bg-[#880000]" : "bg-[#2A3964]"}`}>
                                            {tipo.activo ? 'Desactivar' : 'Activar'}
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr><td colSpan={5} className="py-3 text-gray-500">No hay tipos de aula registrados</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}