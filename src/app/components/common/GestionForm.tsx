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
      className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-700 w-full"
    >
      <h2 className="text-lg font-bold text-blue-800 mb-4 text-center sm:text-left">
        Crear Gestión Académica
      </h2>

      {/* Grid adaptable: 2 columnas en escritorio, 1 en móvil */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="anio"
          type="number"
          placeholder="Año"
          value={form.anio}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-sky-50 
             text-gray-700 placeholder-gray-400 p-2
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-blue-500 focus:text-blue-700 transition"
        />
        <select
          name="semestre"
          value={form.semestre}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-sky-50 
             text-gray-700 placeholder-gray-400 p-2
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-blue-500 focus:text-blue-700 transition"
        >
          <option value="">Semestre</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <input
          type="date"
          name="fecha_inicio"
          value={form.fecha_inicio}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-sky-50 
             text-gray-700 placeholder-gray-400 p-2
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-blue-500 focus:text-blue-700 transition"
        />
        <input
          type="date"
          name="fecha_fin"
          value={form.fecha_fin}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-sky-50 
             text-gray-700 placeholder-gray-400 p-2
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-blue-500 focus:text-blue-700 transition" 
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition disabled:opacity-60"
      >
        {loading ? "Guardando..." : "Guardar Gestión"}
      </button>
    </form>
  );
}
