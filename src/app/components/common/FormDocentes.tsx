import { useState } from "react";
import { GestionService } from "../../features/Gestion/services/gestionService";
//import { DocenteService } from "../../features/Docente/services/docenteService";

export default function FormDocente({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({
    id_usuario: "",
    id_tipo_contrato: "",
    titulo: "",
    especialidad: "",
    grado_academico: "",
    activo: true,
    fecha_ingreso: "",
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
        alert("✅ Docente registrado correctamente");
        onCreated();
        setForm({
          id_usuario: "",
          id_tipo_contrato: "",
          titulo: "",
          especialidad: "",
          grado_academico: "",
          activo: true,
          fecha_ingreso: "",
        });
      } else {
        alert("⚠️ " + (res.message || "Error al registrar el docente"));
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
        Registrar Docente
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* ID Usuario */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            ID Usuario
          </label>
          <input
            name="id_usuario"
            type="number"
            placeholder="Ej: 101"
            value={form.id_usuario}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 placeholder-gray-400 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
          />
        </div>

        {/* Tipo Contrato */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            ID Tipo de Contrato
          </label>
          <input
            name="id_tipo_contrato"
            type="number"
            placeholder="Ej: 2"
            value={form.id_tipo_contrato}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 placeholder-gray-400 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
          />
        </div>

        {/* Título */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Título
          </label>
          <input
            name="titulo"
            type="text"
            placeholder="Ej: Licenciado en Educación"
            value={form.titulo}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 placeholder-gray-400 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
          />
        </div>

        {/* Especialidad */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Especialidad
          </label>
          <input
            name="especialidad"
            type="text"
            placeholder="Ej: Matemáticas"
            value={form.especialidad}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 placeholder-gray-400 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
          />
        </div>

        {/* Grado Académico */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Grado Académico
          </label>
          <input
            name="grado_academico"
            type="text"
            placeholder="Ej: Doctorado"
            value={form.grado_academico}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 placeholder-gray-400 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
          />
        </div>

        {/* Fecha Ingreso */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Fecha de Ingreso
          </label>
          <input
            name="fecha_ingreso"
            type="date"
            value={form.fecha_ingreso}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 
              text-gray-700 p-2.5
              focus:outline-none focus:ring-2 focus:ring-[#2A3964] 
              focus:border-[#2A3964] transition"
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
            Docente activo
          </label>
        </div>
      </div>

      {/* Botón Guardar */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-[#880000] hover:bg-[#a00000] text-white py-2.5 rounded-lg font-semibold tracking-wide transition disabled:opacity-60 shadow-md"
      >
        {loading ? "Guardando..." : "Guardar Docente"}
      </button>
    </form>
  );
}
