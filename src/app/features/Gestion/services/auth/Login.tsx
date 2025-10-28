import React, { useState } from "react";
import logo from "../../../../../../public/assets/image.jpg"; 
import Header from "../../../../components/common/Header";
import Footer from "../../../../components/common/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
    // Lógica de login real aquí
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-lg border border-[#880000] bg-[#880000] text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964]"
                placeholder="algo@gmail.com"
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
                className="w-full p-2 rounded-lg border border-[#880000] bg-[#880000] text-blue placeholder-blue-00 focus:outline-none focus:ring-2 focus:ring-[#2A3964] focus:border-[#2A3964]"
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
              className="mt-4 text-[#00012e] w-full bg-[#2A3964] hover:bg-[#1f2a4b] text-red py-2 rounded-lg transition"
            >
              Iniciar
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
         src={logo}
          alt="Logo"
           className="w-full max-w-sm sm:max-w-md object-contain rounded-lg"
        />
       </div>
    </div>

      <Footer />
    </div>
  );
}