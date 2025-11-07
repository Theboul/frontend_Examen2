import { useState, useEffect } from "react";
import { gestionService, type Gestion } from "../services/gestionService";

interface GestionFormProps {
  onCreated: () => void;
  gestionToEdit?: Gestion | null;
  onCancelEdit?: () => void;
}

export default function GestionForm({ onCreated, gestionToEdit, onCancelEdit }: GestionFormProps) {
  const [form, setForm] = useState({
    anio: "",
    semestre: "",
    fecha_inicio: "",
    fecha_fin: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  // Función para extraer solo la fecha (YYYY-MM-DD) sin la hora
  const extraerSoloFecha = (fecha: string): string => {
    return fecha.split('T')[0];
  };

  // Cargar datos cuando hay una gestión para editar
  useEffect(() => {
    if (gestionToEdit) {
      setForm({
        anio: gestionToEdit.anio.toString(),
        semestre: gestionToEdit.semestre.toString(),
        fecha_inicio: extraerSoloFecha(gestionToEdit.fecha_inicio),
        fecha_fin: extraerSoloFecha(gestionToEdit.fecha_fin),
      });
      setIsEditing(true);
    } else {
      setForm({ anio: "", semestre: "", fecha_inicio: "", fecha_fin: "" });
      setIsEditing(false);
    }
  }, [gestionToEdit]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // Limpiar error al cambiar valores
  };

  const handleCancel = () => {
    setForm({ anio: "", semestre: "", fecha_inicio: "", fecha_fin: "" });
    setError(null);
    setIsEditing(false);
    onCancelEdit?.();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validar campos
      if (!form.anio || !form.semestre || !form.fecha_inicio || !form.fecha_fin) {
        setError("Todos los campos son obligatorios");
        return;
      }

      const gestionData = {
        anio: parseInt(form.anio),
        semestre: parseInt(form.semestre) as 1 | 2,
        fecha_inicio: form.fecha_inicio,
        fecha_fin: form.fecha_fin,
      };

      if (isEditing && gestionToEdit) {
        // Editar gestión existente
        await gestionService.update(gestionToEdit.id_gestion, gestionData);
        alert("✅ Gestión actualizada correctamente");
      } else {
        // Crear nueva gestión
        await gestionService.create(gestionData);
        alert("✅ Gestión creada correctamente");
      }

      onCreated();
      setForm({ anio: "", semestre: "", fecha_inicio: "", fecha_fin: "" });
      setIsEditing(false);
      onCancelEdit?.();
    } catch (err: any) {
      const errorMsg = err.message || "Error al guardar la gestión";
      setError(errorMsg);
      console.error("Error al guardar gestión:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-8 border-t-4 border-[#2A3964] w-full max-w-2xl mx-auto transition-transform hover:scale-[1.01]"
    >
      <h2 className="text-2xl font-bold text-[#2A3964] mb-6 text-center">
        {isEditing ? "Editar Gestión Académica" : "Crear Gestión Académica"}
      </h2>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Grid adaptable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Año
          </label>
          <input
            name="anio"
            type="number"
            placeholder="Ej: 2025"
            value={form.anio}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 placeholder-gray-400 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Semestre
          </label>
          <select
            name="semestre"
            value={form.semestre}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
          >
            <option value="">Selecciona un semestre</option>
            <option value="1">1er Semestre</option>
            <option value="2">2do Semestre</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Fecha de Inicio
          </label>
          <input
            type="date"
            name="fecha_inicio"
            value={form.fecha_inicio}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Fecha de Fin
          </label>
          <input
            type="date"
            name="fecha_fin"
            value={form.fecha_fin}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#880000] hover:bg-[#a00000] text-white py-2.5 rounded-lg font-semibold tracking-wide transition disabled:opacity-60 shadow-md"
        >
          {loading ? "Guardando..." : isEditing ? "Actualizar Gestión" : "Guardar Gestión"}
        </button>
        
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 bg-gray-500 hover:bg-gray-600 text-white py-2.5 rounded-lg font-semibold tracking-wide transition shadow-md"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
