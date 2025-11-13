import { useState } from "react";
import { useNavigate } from "react-router-dom";
// 1. Ya no importamos axios, importamos nuestro servicio
import { changePasswordService } from "../services/changePasswordService"; // Ajusta esta ruta
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

export default function CambiarPasswordPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password_actual: "",
    password_nueva: "",
    password_nueva_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: "error" | "exito" | null; texto: string }>({
    tipo: null,
    texto: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: null, texto: "" });

    try {
      // 2. CORRECCIÓN: Usar 'auth_token', que es lo que usa tu interceptor api.js
      // (Asumo que tu página de Login guarda 'auth_token' y 'user')
      const token = localStorage.getItem("auth_token");
      const userData = JSON.parse(localStorage.getItem("user") || "{}");

      if (!token || !userData?.id_usuario) {
        throw new Error("Sesión no válida. Vuelva a iniciar sesión.");
      }

      // 3. Lógica de API simplificada: ¡solo llamamos al servicio!
      const response = await changePasswordService.changePassword({
        id_usuario: userData.id_usuario,
        password_actual: formData.password_actual,
        password_nueva: formData.password_nueva,
        password_nueva_confirmation: formData.password_nueva_confirmation,
      });

      if (response.success) {
        setMensaje({ tipo: "exito", texto: "Contraseña actualizada correctamente 🎉" });
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        // Esto no debería ocurrir si el servicio maneja bien los errores, pero es un buen fallback
        throw new Error(response.message || "Error al actualizar la contraseña.");
      }
    } catch (error: any) {
      setMensaje({
        tipo: "error",
        // El 'error.message' vendrá del 'throw new Error(...)' de nuestro servicio
        texto: error.message || "No se pudo cambiar la contraseña.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... (Tu JSX es perfecto, no necesita cambios) ...
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f9fafc] to-[#e6f0ff]">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-[#003366] text-center mb-2">
            Cambiar Contraseña
          </h1>
          <p className="text-gray-600 text-center mb-6 text-sm">
            Por seguridad, debe actualizar su contraseña antes de continuar.
          </p>

      {/* Mensajes */}
      {mensaje.tipo && (
        <div
          className={`p-3 mb-4 rounded-lg text-sm text-center font-medium ${
            mensaje.tipo === "error"
              ? "bg-[#ffe6e6] text-[#b30000]"
              : "bg-[#e6fff0] text-[#007a33]"
          }`}
        >
          {mensaje.texto}
        </div>
      )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#003366] mb-1">
              Contraseña Actual
            </label>
            <input
              type="password"
              name="password_actual"
              value={formData.password_actual}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#003366] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#003366] mb-1">
              Nueva Contraseña
            </label>
            <input
              type="password"
              name="password_nueva"
              value={formData.password_nueva}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#003366] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#003366] mb-1">
              Confirmar Nueva Contraseña
            </label>
            W       <input
              type="password"
              name="password_nueva_confirmation"
              value={formData.password_nueva_confirmation}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#003366] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#880000] text-white font-semibold py-2 rounded-lg hover:bg-[#b30000] transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Actualizar Contraseña"}
          </button>
        </form>
    </div>
    </main >

    <Footer />
   </div >
  );
}