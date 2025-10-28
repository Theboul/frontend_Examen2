import { useState } from "react";
import { GestionService } from "../../features/Gestion/services/gestionService";

export default function GestionForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({
    anio: "",
    semestre: "",
    fecha_inicio: "",
    fecha_fin: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await GestionService.crear(form);
      if (res.success) {
        alert("✅ Gestión creada correctamente");
        onCreated();
        setForm({ anio: "", semestre: "", fecha_inicio: "", fecha_fin: "" });
      } else {
        alert("⚠️ " + (res.message || "Error al crear la gestión"));
      }
    } catch (err) {
      alert("❌ Error al conectar con el servidor");
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
        Crear Gestión Académica
      </h2>

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

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-[#880000] hover:bg-[#a00000] text-white py-2.5 rounded-lg font-semibold tracking-wide transition disabled:opacity-60 shadow-md"
      >
        {loading ? "Guardando..." : "Guardar Gestión"}
      </button>
    </form>
  );
}
