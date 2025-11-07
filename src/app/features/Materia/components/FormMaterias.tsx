import { useState, useEffect } from "react";
// Asegúrate de que MateriaForm en este servicio ACEPTE | null
import { MateriaService, type MateriaForm, type Materia } from "../services/materiaService";

interface FormProps {
  materia?: Materia | null;
  onSuccess: () => void;
}

// Interfaz interna para el estado del formulario (usa strings para inputs)
interface FormState {
  id_semestre: string;
  id_carrera: string;
  nombre: string;
  sigla: string;
  creditos: string;
  carga_horaria_semestral: string;
  activo: boolean;
}

export default function FormMateria({ materia = null, onSuccess }: FormProps) {

  const initialState: FormState = {
    id_semestre: materia?.id_semestre.toString() ?? "",
    id_carrera: materia?.id_carrera.toString() ?? "",
    nombre: materia?.nombre || "",
    sigla: materia?.sigla || "",
    // Manejamos number | null -> string para el input
    creditos: materia?.creditos?.toString() ?? "",
    carga_horaria_semestral: materia?.carga_horaria_semestral?.toString() ?? "",
    activo: materia?.activo ?? true,
  };

  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);

  const isEditing = !!materia;
  const buttonText = isEditing ? "Actualizar Materia" : "Guardar Materia";

  useEffect(() => {
    setForm(initialState);
  }, [materia]);

  // Se expande el tipo para manejar select, ya que los IDs pueden venir de un select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setForm(prev => ({
      ...prev,
      // Usamos 'checked' solo si el tipo es checkbox (lo cual solo es posible con HTMLInputElement)
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Función Helper: Si el campo está vacío o no es numérico, envía NULL a la API (solución TS2322)
    const parseNullableInt = (value: string): number | null => {
      const parsed = parseInt(value);
      // isNaN(parsed) será true si value es "" o una letra
      return isNaN(parsed) ? null : parsed;
    }

    const dataToSend: MateriaForm = {
      nombre: form.nombre,
      sigla: form.sigla,
      activo: form.activo,

      // IDs requeridos (asumo que 0 será manejado como error por la validación del backend)
      id_semestre: parseInt(form.id_semestre) || 0,
      id_carrera: parseInt(form.id_carrera) || 0,

      // Campos opcionales: Usamos la función helper
      creditos: parseNullableInt(form.creditos),
      carga_horaria_semestral: parseNullableInt(form.carga_horaria_semestral),
    };

    try {
      const id = materia?.id_materia;
      let res;

      if (isEditing && id) {
        res = await MateriaService.actualizar(id, dataToSend);
      } else {
        res = await MateriaService.crear(dataToSend);
      }

      if (res.success) {
        alert(`✅ Materia ${isEditing ? 'actualizada' : 'creada'} correctamente`);
        onSuccess();
        if (!isEditing) setForm(initialState);
      } else {
        alert("⚠️ " + (res.message || `Error al ${isEditing ? 'actualizar' : 'crear'} la materia`));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={isEditing ? "p-0" : "bg-white shadow-xl rounded-2xl p-8 border-t-4 border-[#2A3964] w-full max-w-3xl mx-auto transition-transform hover:scale-[1.01]"}
    >

      {/* -------------------- INICIO DE CAMPOS DE EJEMPLO -------------------- */}

      <h2 className="text-xl font-bold mb-6 text-[#2A3964]">
        {isEditing ? `Editar Materia: ${materia?.nombre}` : 'Crear Nueva Materia'}
      </h2>

      {/* Campo: Nombre (Usa handleChange) */}
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2"
        />
      </div>

      {/* Campo: Créditos (Usa handleChange y form.creditos) */}
      <div className="mb-4">
        <label htmlFor="creditos" className="block text-sm font-medium text-gray-700">Créditos</label>
        <input
          type="number"
          name="creditos"
          id="creditos"
          value={form.creditos}
          onChange={handleChange}
          placeholder="Opcional"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2"
        />
      </div>

      {/* Botón de envío (Usa loading y buttonText) */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A3964] hover:bg-[#1E2B4B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2A3964] disabled:opacity-50"
      >
        {loading ? "Cargando..." : buttonText}
      </button>

      {/* -------------------- FIN DE CAMPOS DE EJEMPLO -------------------- */}
    </form>
  );
}