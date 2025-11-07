import { useState, useEffect } from "react";
import { AulaService, type Aula, type AulaForm } from "../services/aulaService";
import { TipoAulaService, type TipoAulaSelect } from "../../Aula/services/tipoAulaService";

interface FormProps {
  aula?: Aula | null;
  onSuccess: () => void;
}

interface FormState {
  id_tipo_aula: string; // Valor seleccionado del <select>
  nombre: string;
  capacidad: string;
  piso: string;
  activo: boolean;
  mantenimiento: boolean;
}

export default function FormAulas({ aula = null, onSuccess }: FormProps) {

  // ESTADO PARA ALMACENAR LOS TIPOS DE AULA
  const [tiposAula, setTiposAula] = useState<TipoAulaSelect[]>([]);

  const initialState: FormState = {
    id_tipo_aula: aula?.id_tipo_aula?.toString() ?? "",
    nombre: aula?.nombre || "",
    capacidad: aula?.capacidad?.toString() ?? "",
    piso: aula?.piso?.toString() ?? "",
    activo: aula?.activo ?? true,
    mantenimiento: aula?.mantenimiento ?? false,
  };

  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);

  const isEditing = !!aula;
  const buttonText = isEditing ? "Actualizar Aula" : "Guardar Aula";

  // EFECTO 1: Cargar Tipos de Aula al montar el componente
  useEffect(() => {
    const fetchTiposAula = async () => {
      const res = await TipoAulaService.paraSelect();
      if (res.success) {
        setTiposAula(res.data);
        // Si es modo Creación, preseleccionar el primer elemento del catálogo si el campo está vacío
        if (!isEditing && res.data.length > 0 && !form.id_tipo_aula) {
          setForm(prev => ({ ...prev, id_tipo_aula: res.data[0].value.toString() }));
        }
      } else {
        console.error("Error al cargar catálogo Tipo Aula:", res.message);
      }
    };
    fetchTiposAula();
  }, [isEditing]);

  // EFECTO 2: Restablecer el formulario cuando el objeto 'aula' cambia (necesario para el modal)
  useEffect(() => {
    setForm(initialState);
  }, [aula]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const parseRequiredInt = (value: string): number => parseInt(value) || 0;

    const dataToSend: AulaForm = {
      id_tipo_aula: parseRequiredInt(form.id_tipo_aula),
      nombre: form.nombre,
      capacidad: parseRequiredInt(form.capacidad),
      piso: parseRequiredInt(form.piso),
      activo: form.activo,
      mantenimiento: form.mantenimiento,
    };

    try {
      let res;

      if (isEditing && aula) {
        res = await AulaService.actualizar(aula.id_aula, dataToSend);
      } else {
        res = await AulaService.crear(dataToSend);
      }

      if (res.success) {
        alert(`✅ Aula ${isEditing ? 'actualizada' : 'creada'} correctamente`);
        onSuccess();
        if (!isEditing) setForm(initialState);
      } else {
        alert("⚠️ " + (res.message || `Error al ${isEditing ? 'actualizar' : 'crear'} el aula`));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={isEditing ? "p-0" : "bg-white shadow-xl rounded-2xl p-8 border-t-4 border-[#2A3964] w-full max-w-3xl mx-auto"}>

      {!isEditing && (
        <h2 className="text-2xl font-bold text-[#2A3964] mb-6 text-center">
          Crear Aula
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* ✅ Campo 1: SELECTOR DE TIPO AULA */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Tipo de Aula</label>
          <select
            name="id_tipo_aula"
            value={form.id_tipo_aula}
            onChange={handleChange as any} // Usamos 'any' para evitar errores de select/input TS
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] transition">

            <option value="">-- Seleccionar Tipo --</option>
            {tiposAula.map(tipo => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
        </div>

        {/* Campo 2: Nombre */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Nombre</label>
          <input name="nombre" type="text" placeholder="Ej: Laboratorio A" value={form.nombre} onChange={handleChange} required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] transition" />
        </div>

        {/* Campo 3: Capacidad */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Capacidad</label>
          <input name="capacidad" type="number" placeholder="Ej: 30" value={form.capacidad} onChange={handleChange} required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] transition" />
        </div>

        {/* Campo 4: Piso */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Piso</label>
          <input name="piso" type="number" placeholder="Ej: 2" value={form.piso} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] transition" />
        </div>

        {/* Campo 5: Mantenimiento */}
        <div className="flex items-center mt-4 sm:col-span-1">
          <input id="mantenimiento" name="mantenimiento" type="checkbox" checked={form.mantenimiento} onChange={handleChange}
            className="w-5 h-5 text-[#2A3964] border-gray-300 rounded focus:ring-[#2A3964]" />
          <label htmlFor="mantenimiento" className="ml-2 text-sm text-gray-700">En Mantenimiento</label>
        </div>

        {/* Campo 6: Activo (Solo visible en Edición) */}
        {isEditing && (
          <div className="flex items-center mt-4 sm:col-span-1">
            <input id="activo" name="activo" type="checkbox" checked={form.activo} onChange={handleChange}
              className="w-5 h-5 text-[#2A3964] border-gray-300 rounded focus:ring-[#2A3964]" />
            <label htmlFor="activo" className="ml-2 text-sm text-gray-700">Aula activa</label>
          </div>
        )}

      </div>

      <button type="submit" disabled={loading}
        className="mt-6 w-full bg-[#880000] hover:bg-[#a00000] text-white py-2.5 rounded-lg font-semibold tracking-wide transition disabled:opacity-60 shadow-md">
        {loading ? (isEditing ? "Actualizando..." : "Guardando...") : buttonText}
      </button>
    </form>
  );
}