import { useState } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import { horarioAutomaticoService } from "../services/HorarioAutomaticoService";

export default function AsignarHorarioAutomaticoPage() {
  const [idGestion, setIdGestion] = useState("");
  const [idCarrera, setIdCarrera] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [mensaje, setMensaje] = useState<{ tipo: "error" | "exito" | null; texto: string }>({
    tipo: null,
    texto: "",
  });

  // ===================== 🔹 Enviar formulario =====================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: null, texto: "" });
    setResultado(null);

    try {
      const res = await horarioAutomaticoService.generar(
        Number(idGestion),
        idCarrera ? Number(idCarrera) : undefined
      );

      if (res.success) {
        setMensaje({
          tipo: "exito",
          texto: "✅ Generación automática completada con éxito.",
        });
        setResultado(res);
      } else {
        setMensaje({
          tipo: "error",
          texto: res.message || "Error al generar horarios automáticamente.",
        });
      }
    } catch (err: any) {
      setMensaje({
        tipo: "error",
        texto:
          err.response?.data?.message ||
          "Error inesperado durante la generación automática.",
      });
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-[#f9fafc] to-[#e6f0ff]">
      <Header />

      <main className="grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-[#003366] mb-6">
          ⚙️ Generar Horarios Automáticamente
        </h1>

        {/* Mensaje de estado */}
        {mensaje.tipo && (
          <div
            className={`p-3 mb-4 rounded-lg text-center font-medium ${
              mensaje.tipo === "error"
                ? "bg-[#ffe6e6] text-[#b30000]"
                : "bg-[#e6fff0] text-[#007a33]"
            }`}
          >
            {mensaje.texto}
          </div>
        )}

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 max-w-lg mx-auto border space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-[#003366] mb-1">
              ID de Gestión Activa
            </label>
            <input
              type="number"
              placeholder="Ej. 3"
              value={idGestion}
              onChange={(e) => setIdGestion(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#003366] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#003366] mb-1">
              ID de Carrera (opcional)
            </label>
            <input
              type="number"
              placeholder="Ej. 2"
              value={idCarrera}
              onChange={(e) => setIdCarrera(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#003366] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#880000] text-white font-semibold py-2 rounded-lg hover:bg-[#b30000] transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Iniciar Generación Automática"}
          </button>
        </form>

        {/* RESULTADOS */}
        {resultado && (
          <div className="mt-10 bg-white p-6 rounded-xl shadow-md border max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#003366] mb-4 text-center">
              📊 Resumen del Proceso
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-center mb-6">
              <p>
                <strong>Total Asignaciones:</strong> {resultado.resumen?.total_asignaciones || 0}
              </p>
              <p>
                <strong>Exitosas:</strong> {resultado.resumen?.exitosas || 0}
              </p>
              <p>
                <strong>Fallidas:</strong> {resultado.resumen?.fallidas || 0}
              </p>
              <p>
                <strong>Éxito:</strong> {resultado.resumen?.porcentaje_exito || 0}%
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Exitosas */}
              <div>
                <h3 className="text-lg font-semibold text-[#007a33] mb-2">
                  ✅ Asignaciones Exitosas
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 max-h-60 overflow-y-auto">
                  {resultado.detalles?.exitosas?.length > 0 ? (
                    resultado.detalles.exitosas.map((e: any, i: number) => (
                      <li key={i}>
                        {e.materia} - {e.grupo} ({e.hrs_asignadas}h) → {e.completado}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No hay asignaciones exitosas.</li>
                  )}
                </ul>
              </div>

              {/* Fallidas */}
              <div>
                <h3 className="text-lg font-semibold text-[#b30000] mb-2">
                  ⚠️ Asignaciones Fallidas
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 max-h-60 overflow-y-auto">
                  {resultado.detalles?.fallidas?.length > 0 ? (
                    resultado.detalles.fallidas.map((f: any, i: number) => (
                      <li key={i}>
                        {f.materia} - {f.grupo}: {f.razon}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No hay asignaciones fallidas.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
