import { useState, useEffect } from "react";
import { DocenteService, type DocenteForm, type Docente } from "../../Docente/services/docenteService";

interface FormProps {
  docente?: Docente | null;
  onSuccess: () => void;
}

// Interfaz interna para el estado del formulario (usa strings para inputs)
interface FormState {
  usuario: string;
  email: string;
  password?: string;
  nombres: string;
  apellidos: string;
  ci: string;
  telefono: string;
  fecha_nacimiento: string;
  genero: string;
  id_tipo_contrato: string;
  titulo: string;
  especialidad: string;
  grado_academico: string;
  fecha_ingreso: string;
  activo: boolean;
}

// Estilo Tailwind para inputs genéricos
const inputStyle = "w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] transition";

export default function FormDocente({ docente = null, onSuccess }: FormProps) {

  const isEditing = !!docente;

  // Inicialización del estado con datos anidados del docente o valores vacíos
  const initialState: FormState = {
    // Usuario
    usuario: docente?.usuario?.usuario || "",
    email: docente?.usuario?.email || "",
    password: "",

    // Perfil
    nombres: docente?.perfil?.nombres || "",
    apellidos: docente?.perfil?.apellidos || "",
    ci: docente?.perfil?.ci || "",
    telefono: docente?.perfil?.telefono || "",
    fecha_nacimiento: docente?.perfil?.fecha_nacimiento || "",
    genero: docente?.perfil?.genero || "M",

    // Docente
    id_tipo_contrato: docente?.id_tipo_contrato?.toString() || "",
    titulo: docente?.titulo || "",
    especialidad: docente?.especialidad || "",
    grado_academico: docente?.grado_academico || "",
    fecha_ingreso: docente?.fecha_ingreso || "",
    activo: docente?.activo ?? true,
  };

  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);

  const buttonText = isEditing ? "Actualizar Docente" : "Guardar Docente";

  useEffect(() => {
    setForm(initialState);
  }, [docente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const parseNullableString = (value: string): string | null => value.trim() === '' ? null : value;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend: DocenteForm = {
      usuario: form.usuario,
      email: form.email,
      password: (isEditing && !form.password) ? undefined : form.password,

      nombres: form.nombres,
      apellidos: form.apellidos,
      ci: form.ci,
      genero: form.genero,

      // Campos Nullable
      telefono: parseNullableString(form.telefono),
      fecha_nacimiento: parseNullableString(form.fecha_nacimiento),
      especialidad: parseNullableString(form.especialidad),
      grado_academico: parseNullableString(form.grado_academico),
      fecha_ingreso: parseNullableString(form.fecha_ingreso),

      // Campos Docente
      id_tipo_contrato: parseInt(form.id_tipo_contrato) || 0,
      titulo: form.titulo,
      activo: form.activo,
    };

    try {
      let res;
      const id = docente?.cod_docente;

      if (isEditing && id) {
        res = await DocenteService.actualizar(id, dataToSend);
      } else {
        res = await DocenteService.crear(dataToSend);
      }

      if (res.success) {
        alert(`✅ Docente ${isEditing ? 'actualizado' : 'registrado'} correctamente`);
        onSuccess();
        if (!isEditing) setForm(initialState);
      } else {
        alert("⚠️ " + (res.message || `Error al ${isEditing ? 'actualizar' : 'registrar'} el docente`));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={isEditing ? "p-0" : "bg-white shadow-xl rounded-2xl p-8 border-t-4 border-[#2A3964] w-full max-w-3xl mx-auto transition-transform hover:scale-[1.01]"}>

      <h2 className="text-2xl font-bold text-[#2A3964] mb-6 text-center">
        {isEditing ? `Editar Docente: ${docente?.perfil?.nombre_completo || 'N/A'}` : 'Registrar Nuevo Docente'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* === DATOS DE PERFIL === */}
        <div className="flex flex-col sm:col-span-3"><h3 className="text-lg font-semibold text-[#2A3964] border-b pb-1 mb-3">Datos Personales</h3></div>

        <div className="flex flex-col"><label className="text-sm font-semibold text-gray-700 mb-1">Nombres</label>
          <input name="nombres" type="text" value={form.nombres} onChange={handleChange} required className={inputStyle} /></div>
        <div className="flex flex-col"><label className="text-sm font-semibold text-gray-700 mb-1">Apellidos</label>
          <input name="apellidos" type="text" value={form.apellidos} onChange={handleChange} required className={inputStyle} /></div>
        <div className="flex flex-col"><label className="text-sm font-semibold text-gray-700 mb-1">Cédula (CI)</label>
          <input name="ci" type="text" value={form.ci} onChange={handleChange} required className={inputStyle} /></div>

        <div className="flex flex-col"><label className="text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
          <input name="telefono" type="text" value={form.telefono} onChange={handleChange} className={inputStyle} /></div>
        <div className="flex flex-col"><label className="text-sm font-semibold text-gray-700 mb-1">F. Nacimiento</label>
          <input name="fecha_nacimiento" type="date" value={form.fecha_nacimiento} onChange={handleChange} className={inputStyle} /></div>
        <div className="flex flex-col"><label className="text-sm font-semibold text-gray-700 mb-1">Género</label>
          <select name="genero" value={form.genero} onChange={handleChange} required className="input-style p-2.5">
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select></div>

        {/* === DATOS DE CUENTA/SEGURIDAD === */}
        <div className="flex flex-col sm:col-span-3 mt-4"><h3 className="text-lg font-semibold text-[#2A3964] border-b pb-1 mb-3">Cuenta y Acceso</h3></div>

        {/* Usuario y Email son los identificadores clave de la cuenta */}
        <div className="flex flex-col"><label className="text-sm font-semibold text-gray-700 mb-1">Usuario</label>
          <input name="usuario" type="text" value={form.usuario} onChange={handleChange} required={!isEditing} disabled={isEditing} className={`${inputStyle} disabled:bg-gray-200`} /></div>
        <div className="flex flex-col"><label className="text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputStyle} /></div>
        <div className="flex flex-col"><label className="text-sm font-semibold text-gray-700 mb-1">Contraseña {isEditing && "(Dejar vacío para no cambiar)"}</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required={!isEditing} className={inputStyle} /></div>

        {/* === DATOS DE DOCENTE === */}
        <div className="flex flex-col sm:col-span-3 mt-4"><h3 className="text-lg font-semibold text-[#2A3964] border-b pb-1 mb-3">Datos Docentes</h3></div>

        <div className="flex flex-col"><label className="text-sm font-semibold text-gray-700 mb-1">ID Tipo Contrato</label>
          <input name="id_tipo_contrato" type="number" value={form.id_tipo_contrato} onChange={handleChange} required className={inputStyle} /></div>
        <div className="flex flex-col"><label className="text-sm font-semibold text-gray-700 mb-1">Fecha Ingreso</label>
          <input name="fecha_ingreso" type="date" value={form.fecha_ingreso} onChange={handleChange} className={inputStyle} /></div>
        <div className="flex flex-col sm:col-span-3"><label className="text-sm font-semibold text-gray-700 mb-1">Título</label>
          <input name="titulo" type="text" value={form.titulo} onChange={handleChange} required className={inputStyle} /></div>

        <div className="flex flex-col"><label className="text-sm font-semibold text-gray-700 mb-1">Especialidad</label>
          <input name="especialidad" type="text" value={form.especialidad} onChange={handleChange} className={inputStyle} /></div>
        <div className="flex flex-col"><label className="text-sm font-semibold text-gray-700 mb-1">Grado Académico</label>
          <input name="grado_academico" type="text" value={form.grado_academico} onChange={handleChange} className={inputStyle} /></div>

        {/* Activo (Solo visible/editable en Edición) */}
        {isEditing && (
          <div className="flex items-center mt-2 sm:col-span-3">
            <input id="activo" name="activo" type="checkbox" checked={form.activo} onChange={handleChange} className="w-5 h-5 text-[#2A3964] border-gray-300 rounded focus:ring-[#2A3964]" />
            <label htmlFor="activo" className="ml-2 text-sm text-gray-700">Docente activo</label>
          </div>
        )}
      </div>

      <button type="submit" disabled={loading} className="mt-6 w-full bg-[#880000] hover:bg-[#a00000] text-white py-2.5 rounded-lg font-semibold tracking-wide transition disabled:opacity-60 shadow-md">
        {loading ? "Guardando..." : buttonText}
      </button>
    </form>
  );
}