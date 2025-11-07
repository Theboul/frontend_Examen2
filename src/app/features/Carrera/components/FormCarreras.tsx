import { useState, useEffect } from "react";
import { CarreraService, type CarreraForm, type Carrera } from "../services/CarreraService";

interface FormProps {
    // Opcional: Si se pasa, es modo edición.
    carrera?: Carrera | null;
    // Callback para cerrar el modal o refrescar la tabla
    onSuccess: () => void;
}

export default function FormCarreras({ carrera = null, onSuccess }: FormProps) {

    const initialState = {
        nombre: carrera?.nombre || "",
        codigo: carrera?.codigo || "",
        // Inicializamos como string para la compatibilidad con input type="number"
        duracion_anios: carrera?.duracion_anios.toString() || "",
    };

    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const isEditing = !!carrera;
    const title = isEditing ? `Editar Carrera: ${carrera?.nombre}` : "Crear Nueva Carrera";
    const buttonText = isEditing ? "Actualizar Carrera" : "Guardar Carrera";

    // Sincronizar el estado del formulario con la carrera si la prop cambia (para modales)
    useEffect(() => {
        setForm(initialState);
    }, [carrera]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Preparamos los datos forzando duracion_anios a ser un número entero
        const dataToSend: CarreraForm = {
            nombre: form.nombre,
            codigo: form.codigo,
            duracion_anios: parseInt(form.duracion_anios) || 0
        };

        try {
            let res;
            if (isEditing) {
                // MODO EDICIÓN: Llama a actualizar
                res = await CarreraService.actualizar(carrera!.id_carrera, dataToSend);
            } else {
                // MODO CREACIÓN: Llama a crear
                res = await CarreraService.crear(dataToSend);
            }

            if (res.success) {
                alert(`✅ Carrera ${isEditing ? 'actualizada' : 'creada'} correctamente`);
                onSuccess(); // Cierra el modal o refresca la tabla
                if (!isEditing) {
                    setForm(initialState); // Limpiamos solo en Creación
                }
            } else {
                alert("⚠️ " + (res.message || `Error al ${isEditing ? 'actualizar' : 'crear'} la carrera`));
            }
        } catch (err) {
            console.error(err);
            alert("❌ Error al conectar con el servidor. ¿El backend está corriendo?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            // La clase se aplica para el formulario de Creación. En Edición, el Modal provee el estilo de caja.
            className={isEditing ? "p-0" : "bg-white shadow-xl rounded-2xl p-8 border-t-4 border-[#2A3964] w-full max-w-2xl mx-auto transition-transform hover:scale-[1.01]"}
        >
            {/* El título solo se muestra en la vista de creación (no dentro del modal de edición) */}
            {!isEditing && (
                <h2 className="text-2xl font-bold text-[#2A3964] mb-6 text-center">
                    {title}
                </h2>
            )}

            {/* Grid de campos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nombre */}
                <div className="flex flex-col sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 mb-1">
                        Nombre de la Carrera
                    </label>
                    <input
                        name="nombre"
                        type="text"
                        placeholder="Ej: Ingeniería Informática"
                        value={form.nombre}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] transition"
                        required
                    />
                </div>

                {/* Código */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">
                        Código
                    </label>
                    <input
                        name="codigo"
                        type="text"
                        placeholder="Ej: INF001"
                        value={form.codigo}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] transition"
                        required
                    />
                </div>

                {/* Duración */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">
                        Duración (años)
                    </label>
                    <input
                        name="duracion_anios"
                        type="number"
                        placeholder="Ej: 5"
                        value={form.duracion_anios}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] transition"
                        required
                        min="1"
                    />
                </div>
            </div>

            {/* Botón Guardar */}
            <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-[#880000] hover:bg-[#a00000] text-white py-2.5 rounded-lg font-semibold tracking-wide transition disabled:opacity-60 shadow-md"
            >
                {loading ? (isEditing ? "Actualizando..." : "Guardando...") : buttonText}
            </button>
        </form>
    );
}