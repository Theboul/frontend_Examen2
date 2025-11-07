import { useState, useEffect } from "react";
import { GrupoService, type Grupo, type GrupoForm } from "../../Grupo/services/grupoService";

interface FormProps {
  grupo?: Grupo | null; // Opcional para edición
  onSuccess: () => void;
}

interface FormState {
  id_materia: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
  cupos: string;
  creado_por: string;
  capacidad_maxima: string;
}

export default function FormGrupo({ grupo = null, onSuccess }: FormProps) {

  const isEditing = !!grupo;

  const initialState: FormState = {
    id_materia: grupo?.id_materia?.toString() ?? "",
    nombre: grupo?.nombre || "",
    descripcion: grupo?.descripcion || "",
    activo: grupo?.activo ?? true,
    cupos: grupo?.cupos?.toString() ?? "",
    creado_por: grupo?.creado_por?.toString() ?? "",
    capacidad_maxima: grupo?.capacidad_maxima?.toString() ?? "",
  };

  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(initialState);
  }, [grupo]);

  // Función de ayuda para campos opcionales que pueden ser null
  const parseNullable = (value: string): string | null => (value.trim() === '' ? null : value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Manejo de 'checked'
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Preparación de datos para la API
    const dataToSend: GrupoForm = {
      id_materia: parseInt(form.id_materia) || 0,
      nombre: form.nombre,
      descripcion: parseNullable(form.descripcion),
      capacidad_maxima: parseInt(form.capacidad_maxima) || 0,
      cupos: parseInt(form.cupos) || 0,
      // Creado por: Si está vacío (creación), se deja undefined para que Laravel use auth()->check()
      creado_por: isEditing ? parseNullable(form.creado_por) : undefined,
      activo: form.activo,
    };

    try {
      let res;
      if (isEditing && grupo) {
        res = await GrupoService.actualizar(grupo.id_grupo, dataToSend);
      } else {
        res = await GrupoService.crear(dataToSend);
      }

      if (res.success) {
        alert(`✅ Grupo ${isEditing ? 'actualizado' : 'creado'} correctamente`);
        onSuccess();
        if (!isEditing) setForm(initialState);
      } else {
        alert("⚠️ " + (res.message || `Error al ${isEditing ? 'actualizar' : 'crear'} el grupo`));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={isEditing ? "p-0" : "bg-white shadow-xl rounded-2xl p-8 border-t-4 border-[#2A3964] w-full max-w-3xl mx-auto transition-transform hover:scale-[1.01]"}>

      {!isEditing && (<h2 className="text-2xl font-bold text-[#2A3964] mb-6 text-center">Crear Grupo</h2>)}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* ID Materia */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">ID Materia</label>
          <input name="id_materia" type="number" placeholder="Ej: 12" value={form.id_materia} onChange={handleChange} required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] transition" />
        </div>

        {/* Nombre del Grupo */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Nombre del Grupo</label>
          <input name="nombre" type="text" placeholder="Ej: Grupo A" value={form.nombre} onChange={handleChange} required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] transition" />
        </div>

        {/* Descripción */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-sm font-semibold text-gray-700 mb-1">Descripción</label>
          <textarea name="descripcion" placeholder="Breve descripción del grupo" value={form.descripcion} onChange={handleChange} rows={3}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 p-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] transition" />
        </div>

        {/* Cupos */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Cupos</label>
          <input name="cupos" type="number" placeholder="Ej: 30" value={form.cupos} onChange={handleChange} required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] transition" />
        </div>

        {/* Capacidad Máxima */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Capacidad Máxima</label>
          <input name="capacidad_maxima" type="number" placeholder="Ej: 40" value={form.capacidad_maxima} onChange={handleChange} required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] transition" />
        </div>

        {/* Creado por (Oculto en edición si el campo no se puede tocar) */}
        {!isEditing && ( // Mostrar solo en creación, ya que Laravel usa auth()
          <div className="flex flex-col sm:col-span-2">
            <label className="text-sm font-semibold text-gray-700 mb-1">Creado por (ID Perfil Usuario)</label>
            <input name="creado_por" type="number" placeholder="Ej: 5 (Opcional si usa Sanctum)" value={form.creado_por} onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] transition" />
          </div>
        )}

        {/* Activo (Visible/Editable solo en Edición) */}
        {isEditing && (
          <div className="flex items-center sm:col-span-2">
            <input id="activo" name="activo" type="checkbox" checked={form.activo} onChange={handleChange}
              className="w-5 h-5 text-[#2A3964] border-gray-300 rounded focus:ring-[#2A3964]" />
            <label htmlFor="activo" className="ml-2 text-sm text-gray-700">Grupo activo</label>
          </div>
        )}
      </div>

      <button type="submit" disabled={loading} className="mt-6 w-full bg-[#880000] hover:bg-[#a00000] text-white py-2.5 rounded-lg font-semibold tracking-wide transition disabled:opacity-60 shadow-md">
        {loading ? (isEditing ? "Actualizando..." : "Guardando...") : (isEditing ? "Actualizar Grupo" : "Guardar Grupo")}
      </button>
    </form>
  );
}