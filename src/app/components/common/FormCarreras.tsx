import { useState } from "react";
import { GestionService } from "../../features/Gestion/services/gestionService";
//import { CarreraService } from "../../features/Carrera/services/carreraService";

export default function FormCarreras({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({
    nombre: "",
    codigo: "",
    duracion_anios: "",
    activo: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await GestionService.crear(form);
      if (res.success) {
        alert("✅ Carrera creada correctamente");
        onCreated();
        setForm({
          nombre: "",
          codigo: "",
          duracion_anios: "",
          activo: true,
        });
      } else {
        alert("⚠️ " + (res.message || "Error al crear la carrera"));
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
        Crear Carrera
      </h2>

      {/* Grid adaptable */}
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
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 placeholder-gray-400 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
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
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 placeholder-gray-400 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
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
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 placeholder-gray-400 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
            required
          />
        </div>

        {/* Activo */}
        <div className="flex items-center mt-2 sm:col-span-2">
          <input
            id="activo"
            name="activo"
            type="checkbox"
            checked={form.activo}
            onChange={handleChange}
            className="w-5 h-5 text-[#2A3964] border-gray-300 rounded focus:ring-[#2A3964]"
          />
          <label htmlFor="activo" className="ml-2 text-sm text-gray-700">
            Carrera activa
          </label>
        </div>
      </div>

      {/* Botón Guardar */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-[#880000] hover:bg-[#a00000] text-white py-2.5 rounded-lg font-semibold tracking-wide transition disabled:opacity-60 shadow-md"
      >
        {loading ? "Guardando..." : "Guardar Carrera"}
      </button>
    </form>
  );
}
