import { useState } from "react";
import { GestionService } from "../../features/Gestion/services/gestionService";
//import { MateriaService } from "../../features/Materia/services/materiaService";

export default function FormMateria({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({
    id_semestre: "",
    id_carrera: "",
    nombre: "",
    sigla: "",
    creditos: "",
    carga_horaria_semestral: "",
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
        alert("✅ Materia creada correctamente");
        onCreated();
        setForm({
          id_semestre: "",
          id_carrera: "",
          nombre: "",
          sigla: "",
          creditos: "",
          carga_horaria_semestral: "",
          activo: true,
        });
      } else {
        alert("⚠️ " + (res.message || "Error al crear la materia"));
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
        Crear Materia
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* ID Semestre */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            ID Semestre
          </label>
          <input
            name="id_semestre"
            type="number"
            placeholder="Ej: 1"
            value={form.id_semestre}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50
            text-gray-700 placeholder-gray-400 p-2.5
            focus:outline-none focus:ring-2 focus:ring-[#2A3964]
            focus:border-[#2A3964] transition"
          />
        </div>

        {/* ID Carrera */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            ID Carrera
          </label>
          <input
            name="id_carrera"
            type="number"
            placeholder="Ej: 5"
            value={form.id_carrera}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50
            text-gray-700 placeholder-gray-400 p-2.5
            focus:outline-none focus:ring-2 focus:ring-[#2A3964]
            focus:border-[#2A3964] transition"
          />
        </div>

        {/* Nombre */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Nombre de la Materia
          </label>
          <input
            name="nombre"
            type="text"
            placeholder="Ej: Programación II"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50
            text-gray-700 placeholder-gray-400 p-2.5
            focus:outline-none focus:ring-2 focus:ring-[#2A3964]
            focus:border-[#2A3964] transition"
          />
        </div>

        {/* Sigla */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Sigla
          </label>
          <input
            name="sigla"
            type="text"
            placeholder="Ej: INF-123"
            value={form.sigla}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50
            text-gray-700 placeholder-gray-400 p-2.5
            focus:outline-none focus:ring-2 focus:ring-[#2A3964]
            focus:border-[#2A3964] transition"
          />
        </div>

        {/* Créditos */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Créditos
          </label>
          <input
            name="creditos"
            type="number"
            placeholder="Ej: 4"
            value={form.creditos}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50
            text-gray-700 placeholder-gray-400 p-2.5
            focus:outline-none focus:ring-2 focus:ring-[#2A3964]
            focus:border-[#2A3964] transition"
          />
        </div>

        {/* Carga Horaria */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Carga Horaria Semestral (Horas)
          </label>
          <input
            name="carga_horaria_semestral"
            type="number"
            placeholder="Ej: 96"
            value={form.carga_horaria_semestral}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50
            text-gray-700 placeholder-gray-400 p-2.5
            focus:outline-none focus:ring-2 focus:ring-[#2A3964]
            focus:border-[#2A3964] transition"
          />
        </div>

        {/* Activo */}
        <div className="flex items-center sm:col-span-2 mt-2">
          <input
            id="activo"
            name="activo"
            type="checkbox"
            checked={form.activo}
            onChange={handleChange}
            className="w-5 h-5 text-[#2A3964] border-gray-300 rounded focus:ring-[#2A3964]"
          />
          <label htmlFor="activo" className="ml-2 text-sm text-gray-700">
            Materia activa
          </label>
        </div>
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-[#880000] hover:bg-[#a00000] text-white py-2.5 rounded-lg font-semibold tracking-wide transition disabled:opacity-60 shadow-md"
      >
        {loading ? "Guardando..." : "Guardar Materia"}
      </button>
    </form>
  );
}
