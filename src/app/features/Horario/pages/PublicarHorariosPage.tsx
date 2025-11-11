import { useState } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import { publicarHorariosService } from "../services/publicarHorariosService";

export default function PublicarHorariosPage() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [mensaje, setMensaje] = useState<{ tipo: "error" | "exito" | "info" | null; texto: string }>({
    tipo: null,
    texto: "",
  });

  const handlePublicar = async () => {
    setLoading(true);
    setMensaje({ tipo: null, texto: "" });
    setResultado(null);

    try {
      const res = await publicarHorariosService.publicar();

      if (res.success) {
        setMensaje({ tipo: "exito", texto: res.message || "Horarios publicados exitosamente." });
        setResultado(res);
      } else if (res.status === 409) {
        setMensaje({ tipo: "error", texto: res.message });
        setResultado(res);
      } else if (res.status === 404 || res.status === 422) {
        setMensaje({ tipo: "info", texto: res.message });
      } else {
        setMensaje({ tipo: "error", texto: res.message });
      }
    } catch (err: any) {
      setMensaje({
        tipo: "error",
        texto: "Error al intentar publicar horarios. Intente nuevamente.",
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
           Publicar Horarios Oficiales
        </h1>

        {/* Mensaje de estado */}
        {mensaje.tipo && (
          <div
            className={`p-4 mb-6 text-center rounded-lg font-semibold ${
              mensaje.tipo === "exito"
                ? "bg-[#e6fff0] text-[#007a33]"
                : mensaje.tipo === "info"
                ? "bg-[#fffbe6] text-[#8a6d3b]"
                : "bg-[#ffe6e6] text-[#b30000]"
            }`}
          >
            {mensaje.texto}
          </div>
        )}

        {/* Botón principal */}
        <div className="flex justify-center">
          <button
            onClick={handlePublicar}
            disabled={loading}
            className="bg-[#880000] hover:bg-[#b30000] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50"
          >
            {loading ? " Publicando..." : " Publicar Horarios"}
          </button>
        </div>

        {/* Resultados */}
        {resultado && (
          <div className="mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#003366] mb-4">
               Resumen de Publicación
            </h2>

            <p><strong>Gestión:</strong> {resultado.gestion}</p>
            <p><strong>Total Horarios Publicados:</strong> {resultado.estadisticas?.horarios_publicados || 0}</p>
            <p><strong>Docentes Afectados:</strong> {resultado.estadisticas?.docentes_afectados || 0}</p>
            <p><strong>Asignaciones Completas:</strong> {resultado.estadisticas?.asignaciones_completas || 0}</p>

            {resultado.asignaciones_pendientes?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-[#b30000] mb-2">
                  ⚠️ Asignaciones Pendientes
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 max-h-40 overflow-y-auto">
                  {resultado.asignaciones_pendientes.map((a: string, i: number) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}

            {resultado.errores?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-[#b30000] mb-2">
                  Errores de Integridad
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 max-h-40 overflow-y-auto">
                  {resultado.errores.map((err: string, i: number) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
