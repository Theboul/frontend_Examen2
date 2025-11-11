import { useEffect, useState } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import { cargaHorariaDocenteService } from "../services/cargaHorariaDocenteService";

export default function CargaHorariaDocentePage() {
  const [horario, setHorario] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState<{ tipo: "error" | "exito" | null; texto: string }>({
    tipo: null,
    texto: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await cargaHorariaDocenteService.obtenerHorarioPersonal();

        if (res.success) {
          setHorario(res);
          setMensaje({ tipo: "exito", texto: "✅ Carga horaria obtenida correctamente." });
        } else {
          setMensaje({ tipo: "error", texto: res.message || "No se pudo cargar el horario." });
        }
      } catch (error: any) {
        setMensaje({
          tipo: "error",
          texto:
            error.response?.data?.message ||
            "Error al obtener la carga horaria. Intente nuevamente.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-[#f9fafc] to-[#e6f0ff]">
      <Header />

      <main className="grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-[#003366] mb-6">
           Mi Horario Semanal
        </h1>

        {/* Mensaje */}
        {mensaje.tipo && (
          <div
            className={`p-3 mb-4 rounded-lg text-center ${
              mensaje.tipo === "error"
                ? "bg-[#ffe6e6] text-[#b30000]"
                : "bg-[#e6fff0] text-[#007a33]"
            }`}
          >
            {mensaje.texto}
          </div>
        )}

        {/* Loader */}
        {loading && <p className="text-center text-gray-600">Cargando horarios...</p>}

        {/* Grilla semanal */}
        {!loading && horario && horario.success && (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border rounded-lg shadow-md">
              <thead className="bg-[#003366] text-white">
                <tr>
                  <th className="px-4 py-2">Día</th>
                  <th className="px-4 py-2">Bloque</th>
                  <th className="px-4 py-2">Materia</th>
                  <th className="px-4 py-2">Grupo</th>
                  <th className="px-4 py-2">Aula</th>
                  <th className="px-4 py-2">Tipo Clase</th>
                  <th className="px-4 py-2">Horario</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(horario.grilla).map(([dia, bloques]: any) =>
                  Object.entries(bloques).map(([bloque, clases]: any) =>
                    clases.map((clase: any, idx: number) => (
                      <tr key={`${dia}-${bloque}-${idx}`} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">{dia}</td>
                        <td className="px-4 py-2">{bloque}</td>
                        <td className="px-4 py-2">{clase.materia.nombre}</td>
                        <td className="px-4 py-2">{clase.grupo}</td>
                        <td className="px-4 py-2">{clase.aula.nombre}</td>
                        <td className="px-4 py-2">{clase.tipo_clase}</td>
                        <td className="px-4 py-2">
                          {clase.horario.inicio} - {clase.horario.fin}
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Estadísticas */}
        {!loading && horario && horario.estadisticas && (
          <div className="bg-white mt-8 p-4 rounded-lg shadow border max-w-xl mx-auto">
            <h2 className="text-xl font-semibold text-[#003366] mb-2 text-center">
              📊 Resumen Semanal
            </h2>
            <p>
              <strong>Total de Horarios:</strong> {horario.estadisticas.total_horarios}
            </p>
            <p>
              <strong>Horas Semanales:</strong> {horario.estadisticas.total_horas_semanales}
            </p>
            <p>
              <strong>Materias:</strong> {horario.estadisticas.materias_distintas}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
