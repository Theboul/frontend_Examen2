import React, { useState } from "react";
import { cargaMasivaService } from "../services/cargaMasivaService";
import ResumenCarga from "../components/ResumenCarga";
import TablaErrores from "../components/TablaErrores";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

const CargaMasivaUsuarios: React.FC = () => {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [resultado, setResultado] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleArchivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArchivo(e.target.files?.[0] || null);
    setResultado(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivo) {
      setError("Por favor, seleccione un archivo CSV o Excel válido.");
      return;
    }

    setSubiendo(true);
    setError(null);

    try {
      const resp = await cargaMasivaService.cargarArchivo(archivo);
      setResultado(resp.data);
    } catch (err: any) {
      console.error("Error al subir archivo:", err);
      setError(
        err?.response?.data?.message ||
          "Ocurrió un error al procesar la carga masiva."
      );
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-[#f9fafc] to-[#e6f0ff]"> 

      <Header />

    <main className="grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#003366] text-center mb-8">
          Carga Masiva de Usuarios
        </h1>

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6 border border-[#d0d9e8]"
        >
          <label className="block text-[#003366] font-semibold mb-3">
            Seleccione un archivo CSV o Excel
          </label>

          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleArchivoChange}
            className="block w-full mb-4 border border-gray-300 rounded-lg p-2 text-sm"
          />

          {error && (
            <div className="text-red-600 bg-red-50 border border-red-300 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={subiendo}
            className={`w-full py-3 font-semibold rounded-lg text-white transition-all duration-200 ${
              subiendo
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#003366] hover:bg-[#0056b3]"
            }`}
          >
            {subiendo ? "Procesando..." : "Subir y Procesar"}
          </button>
        </form>

        {/* RESULTADOS */}
        {resultado && (
          <div className="mt-10 space-y-6">
            <ResumenCarga resultado={resultado} />
            {resultado.errores?.length > 0 && (
              <TablaErrores errores={resultado.errores} />
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CargaMasivaUsuarios;
