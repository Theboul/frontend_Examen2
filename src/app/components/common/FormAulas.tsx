import { useState } from "react";
import { motion } from "framer-motion";
import { GestionService } from "../../features/Gestion/services/gestionService";
//import { AulaService } from "../,,/../../../../src/service/aulaService"; // ajusta la ruta según tu estructura

export default function FormAulas({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({
    id_tipo_aula: "",
    nombre: "",
    capacidad: "",
    piso: "",
    mantenimiento: false,
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
        alert("✅ Aula creada correctamente");
        onCreated();
        setForm({
          id_tipo_aula: "",
          nombre: "",
          capacidad: "",
          piso: "",
          mantenimiento: false,
          activo: true,
        });
      } else {
        alert("⚠️ " + (res.message || "Error al crear el aula"));
      }
    } catch (err) {
      alert("❌ Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-8 border-t-4 border-[#2A3964] w-full max-w-2xl mx-auto transition-transform hover:scale-[1.01]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-[#2A3964] mb-6 text-center">
        Crear Aula
      </h2>

      {/* Grid adaptable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Tipo de Aula */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Tipo de Aula (ID)
          </label>
          <input
            name="id_tipo_aula"
            type="number"
            placeholder="Ej: 1"
            value={form.id_tipo_aula}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 placeholder-gray-400 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
            required
          />
        </div>

        {/* Nombre */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Nombre
          </label>
          <input
            name="nombre"
            type="text"
            placeholder="Ej: Laboratorio 101"
            value={form.nombre}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 placeholder-gray-400 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
            required
          />
        </div>

        {/* Capacidad */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Capacidad
          </label>
          <input
            name="capacidad"
            type="number"
            placeholder="Ej: 30"
            value={form.capacidad}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 placeholder-gray-400 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
            required
          />
        </div>

        {/* Piso */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Piso
          </label>
          <input
            name="piso"
            type="number"
            placeholder="Ej: 2"
            value={form.piso}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 placeholder-gray-400 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
          />
        </div>

        {/* Mantenimiento */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            name="mantenimiento"
            checked={form.mantenimiento}
            onChange={handleChange}
            className="h-5 w-5 accent-[#2A3964] cursor-pointer"
          />
          <label className="text-sm font-semibold text-gray-700">
            En Mantenimiento
          </label>
        </div>

        {/* Activo */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            name="activo"
            checked={form.activo}
            onChange={handleChange}
            className="h-5 w-5 accent-[#2A3964] cursor-pointer"
          />
          <label className="text-sm font-semibold text-gray-700">
            Activo
          </label>
        </div>
      </div>

      {/* Botón Guardar */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-[#880000] hover:bg-[#a00000] text-white py-2.5 rounded-lg font-semibold tracking-wide transition disabled:opacity-60 shadow-md"
      >
        {loading ? "Guardando..." : "Guardar Aula"}
      </button>
    </motion.form>
  );
}
