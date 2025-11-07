import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../../../service/authService";
import Header from "../../../../components/common/Header";
import Footer from "../../../../components/common/Footer";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Cambiado de email a username
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Llamar al servicio de autenticación con username
      const response = await authService.login({ 
        email: username, // El backend espera "username" pero el servicio usa "email"
        password 
      });
      
      console.log('✅ Login exitoso:', response);
      console.log('👤 Usuario:', response.user);
      console.log('🔑 Token:', response.token);
      
      // Verificar que el usuario exista en la respuesta
      if (!response.user) {
        throw new Error('No se recibió información del usuario');
      }
      
      // Verificar si es primer ingreso (puede venir en response o response.user)
      const primerIngreso = response.primer_ingreso || response.user.primer_ingreso;
      
      if (primerIngreso) {
        alert('Es tu primer ingreso. Debes cambiar tu contraseña.');
        // TODO: Redirigir a página de cambio de contraseña
        navigate('/dashboard');
      } else {
        // Redirigir al dashboard
        alert(`¡Bienvenido ${response.user.usuario}!`);
        navigate('/dashboard');
      }
      
    } catch (err: any) {
      console.error('❌ Error en login:', err);
      console.log('📋 Detalles completos del error:', JSON.stringify(err, null, 2));
      
      // Manejar diferentes tipos de errores
      if (err.errors) {
        // Errores de validación de Laravel
        const errores = Object.entries(err.errors).map(([campo, mensajes]: [string, any]) => {
          const msgs = Array.isArray(mensajes) ? mensajes : [mensajes];
          return `${campo}: ${msgs.join(', ')}`;
        });
        setError(errores.join('\n'));
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Error al iniciar sesión. Verifica tus credenciales.');
      }
    } finally {
      setLoading(false);
    }
  };

 return (
    <div className="flex flex-col min-h-screen bg-white text-[#a19494]">
      <Header />

    <div className="flex flex-col-reverse sm:flex-row flex-1 items-center justify-center p-4 sm:p-8 gap-4 sm:gap-6">
        {/* Formulario */}
         <div className="sm:w-2/2 w-full bg-white shadow-lg rounded-xl p-8 max-w-md">
          <h1 className="text-2xl font-semibold text-[#880000] mb-6 text-center">
            Iniciar Sesión
          </h1>

          {/* Mensaje de error */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="block mb-1 text-gray-700">
                Usuario o Correo
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full p-2 rounded-lg border border-[#880000] bg-[#880000] text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] disabled:opacity-50"
                placeholder="tu_usuario o email@ejemplo.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full p-2 rounded-lg border border-[#880000] bg-[#880000] text-blue placeholder-blue-00 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964] disabled:opacity-50"
                placeholder="******"
                required
              />
              <div className="text-right mt-1 text-sm">
                <a href="#" className="text-[#880000] hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 text-white w-full bg-[#2A3964] hover:bg-[#1f2a4b] py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-700 text-sm">
            ¿No tienes cuenta aún?{" "}
            <a href="#" className="text-[#880000] hover:underline">
              Crear una cuenta
            </a>
          </p>
        </div>

         {/* Imagen */}
       <div className="sm:w-1/2 w-full flex justify-center">
        <img
         src="/assets/image.jpg"
          alt="Logo"
           className="w-full max-w-sm sm:max-w-md object-contain rounded-lg"
        />
       </div>
    </div>

      <Footer />
    </div>
  );
}