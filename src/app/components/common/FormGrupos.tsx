import { useState } from "react";
import { GestionService } from "../../features/Gestion/services/gestionService";
//import { GrupoService } from "../../features/Grupo/services/grupoService";

export default function FormGrupo({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({
    id_materia: "",
    nombre: "",
    descripcion: "",
    activo: true,
    cupos: "",
    creado_por: "",
    capacidad_maxima: "",
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
        alert("✅ Grupo creado correctamente");
        onCreated();
        setForm({
          id_materia: "",
          nombre: "",
          descripcion: "",
          activo: true,
          cupos: "",
          creado_por: "",
          capacidad_maxima: "",
        });
      } else {
        alert("⚠️ " + (res.message || "Error al crear el grupo"));
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
      className="bg-white shadow-xl rounded-2xl p-8 border-t-4 border-[#2A3964] w-full max-w-3xl mx-auto transition-transform hover:scale-[1.01]"
    >
      <h2 className="text-2xl font-bold text-[#2A3964] mb-6 text-center">
        Crear Grupo
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* ID Materia */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            ID Materia
          </label>
          <input
            name="id_materia"
            type="number"
            placeholder="Ej: 12"
            value={form.id_materia}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
            text-gray-700 placeholder-gray-400 p-2.5
            focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
            focus:border-[#2A3964] transition"
          />
        </div>

        {/* Nombre del Grupo */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Nombre del Grupo
          </label>
          <input
            name="nombre"
            type="text"
            placeholder="Ej: Grupo A"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
            text-gray-700 placeholder-gray-400 p-2.5
            focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
            focus:border-[#2A3964] transition"
          />
        </div>

        {/* Descripción */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="descripcion"
            placeholder="Breve descripción del grupo"
            value={form.descripcion}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
            text-gray-700 placeholder-gray-400 p-2.5 resize-none
            focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
            focus:border-[#2A3964] transition"
          />
        </div>

        {/* Cupos */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Cupos
          </label>
          <input
            name="cupos"
            type="number"
            placeholder="Ej: 30"
            value={form.cupos}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
            text-gray-700 placeholder-gray-400 p-2.5
            focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
            focus:border-[#2A3964] transition"
          />
        </div>

        {/* Capacidad Máxima */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Capacidad Máxima
          </label>
          <input
            name="capacidad_maxima"
            type="number"
            placeholder="Ej: 40"
            value={form.capacidad_maxima}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
            text-gray-700 placeholder-gray-400 p-2.5
            focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
            focus:border-[#2A3964] transition"
          />
        </div>

        {/* Creado por */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Creado por (ID usuario)
          </label>
          <input
            name="creado_por"
            type="number"
            placeholder="Ej: 5"
            value={form.creado_por}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
            text-gray-700 placeholder-gray-400 p-2.5
            focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
            focus:border-[#2A3964] transition"
          />
        </div>

        {/* Activo */}
        <div className="flex items-center sm:col-span-2">
          <input
            id="activo"
            name="activo"
            type="checkbox"
            checked={form.activo}
            onChange={handleChange}
            className="w-5 h-5 text-[#2A3964] border-gray-300 rounded focus:ring-[#2A3964]"
          />
          <label htmlFor="activo" className="ml-2 text-sm text-gray-700">
            Grupo activo
          </label>
        </div>
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-[#880000] hover:bg-[#a00000] text-white py-2.5 rounded-lg font-semibold tracking-wide transition disabled:opacity-60 shadow-md"
      >
        {loading ? "Guardando..." : "Guardar Grupo"}
      </button>
    </form>
  );
}