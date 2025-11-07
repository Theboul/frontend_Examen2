// src/app/features/TipoAula/components/FormTipoAula.tsx

import { useState, useEffect } from "react";
import { TipoAulaService, type TipoAulaForm, type TipoAula } from "../services/tipoAulaService";

interface FormProps {
    tipoAulaToEdit?: TipoAula | null;
    onSuccess: () => void;
    onCancel: () => void;
}

interface FormState {
    nombre: string;
    descripcion: string;
    activo: boolean;
}

export default function FormTipoAula({ tipoAulaToEdit = null, onSuccess, onCancel }: FormProps) {

    const isEditing = !!tipoAulaToEdit;
    const buttonText = isEditing ? "Actualizar Tipo" : "Guardar Tipo";

    const initialState: FormState = {
        nombre: tipoAulaToEdit?.nombre || "",
        descripcion: tipoAulaToEdit?.descripcion || "",
        activo: tipoAulaToEdit?.activo ?? true,
    };

    const [form, setForm] = useState<FormState>(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setForm(initialState);
    }, [tipoAulaToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const dataToSend: TipoAulaForm = {
            nombre: form.nombre,
            descripcion: form.descripcion.trim() === '' ? null : form.descripcion, // Manejar nullable
            activo: form.activo,
        };

        try {
            let res;
            if (isEditing && tipoAulaToEdit) {
                res = await TipoAulaService.actualizar(tipoAulaToEdit.id_tipo_aula, dataToSend);
            } else {
                res = await TipoAulaService.crear(dataToSend);
            }

            if (res.success) {
                alert(`✅ Tipo Aula ${isEditing ? 'actualizado' : 'creado'} correctamente`);
                onSuccess();
            } else {
                alert("⚠️ " + (res.message || `Error al ${isEditing ? 'actualizar' : 'crear'} el tipo de aula`));
            }
        } catch (err) {
            console.error(err);
            alert("❌ Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 border-t-4 border-[#2A3964] w-full max-w-lg mx-auto">

            <h2 className="text-2xl font-bold text-[#2A3964] mb-6 text-center">
                {isEditing ? "Editar Tipo" : "Crear Tipo de Aula"}
            </h2>

            <div className="grid grid-cols-1 gap-5">
                {/* Nombre */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Nombre del Tipo</label>
                    <input name="nombre" type="text" value={form.nombre} onChange={handleChange} required
                        className="input-style p-2.5" />
                </div>

                {/* Descripción */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                    <textarea name="descripcion" value={form.descripcion} onChange={handleChange as any} rows={3}
                        className="input-style p-2.5 resize-none" />
                </div>

                {/* Activo (Visible en ambos modos) */}
                <div className="flex items-center mt-2">
                    <input id="activo" name="activo" type="checkbox" checked={form.activo} onChange={handleChange}
                        className="w-5 h-5 text-[#2A3964] border-gray-300 rounded focus:ring-[#2A3964]" />
                    <label htmlFor="activo" className="ml-2 text-sm text-gray-700">Activo</label>
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <button type="submit" disabled={loading}
                    className="flex-1 bg-[#880000] hover:bg-[#a00000] text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-60 shadow-md">
                    {loading ? "Guardando..." : buttonText}
                </button>
                {isEditing && (
                    <button type="button" onClick={onCancel}
                        className="px-6 bg-gray-500 hover:bg-gray-600 text-white py-2.5 rounded-lg font-semibold transition shadow-md">
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}