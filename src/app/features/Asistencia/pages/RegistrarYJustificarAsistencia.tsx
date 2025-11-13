import { useEffect, useState } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import { asistenciaService } from "../services/asistenciaService";
import { api } from "../../../../lib/axios";
import authService from "../../../../service/authService";
import { motion } from "framer-motion";

interface HorarioClase {
  id_horario_clase: number;
  materia: { nombre: string };
  grupo: { nombre: string };
  aula: { nombre: string };
  dia: { nombre: string };
  bloque_horario: { hr_inicio: string; hr_fin: string };
}

interface AsistenciaAusente {
  id_asistencia: number;
  fecha_registro: string;
  materia: string;
  grupo: string;
  estado: string;
}

export default function RegistrarYJustificarAsistencia() {
  const [clasesHoy, setClasesHoy] = useState<HorarioClase[]>([]);
  const [ausencias, setAusencias] = useState<AsistenciaAusente[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [motivo, setMotivo] = useState("");
  const [documento, setDocumento] = useState<File | null>(null);
  const [asistenciaSeleccionada, setAsistenciaSeleccionada] = useState<number | null>(null);

  const token = authService.getToken();

  // =======================
  // 1. Cargar clases del día y ausencias
  // =======================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [horariosRes, ausenciasRes] = await Promise.all([
          api.get("/docente/horarios-personales", { headers }),
          api.get("/bitacora", { headers }), // simulamos la lista de ausencias
        ]);
        setClasesHoy(horariosRes.data.data || []);
        setAusencias(ausenciasRes.data.data || []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, [token]);

  // =======================
  // 2. Registrar Asistencia
  // =======================
  const registrarAsistencia = async (id_horario_clase: number) => {
    try {
      // Intentar obtener ubicación GPS
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const coordenadas = {
        latitud: pos.coords.latitude,
        longitud: pos.coords.longitude,
      };

      const res = await asistenciaService.registrarAsistenciaBoton(id_horario_clase, coordenadas);
      setMensaje(res.message);
    } catch (error: any) {
      setMensaje(error.response?.data?.message || "Error al registrar asistencia");
    }
  };

  // =======================
  // 3. Justificar Ausencia
  // =======================
  const enviarJustificacion = async () => {
    if (!asistenciaSeleccionada) return;
    try {
      const res = await asistenciaService.justificarAusencia(asistenciaSeleccionada, motivo, documento || undefined);
      setMensaje(res.message);
      setMotivo("");
      setDocumento(null);
      setAsistenciaSeleccionada(null);
    } catch (error: any) {
      setMensaje(error.response?.data?.message || "Error al enviar justificación");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <motion.main
        className="flex-grow container mx-auto px-4 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-[#880000] mb-6 text-center">
          Registro y Justificación de Asistencia
        </h1>

        {/* Mensaje de estado */}
        {mensaje && (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md mb-4 text-center">
            {mensaje}
          </div>
        )}

        {/* === SECCIÓN 1: Clases de Hoy === */}
        <section className="bg-white shadow-md p-6 rounded-2xl mb-10">
          <h2 className="text-xl font-semibold text-[#880000] mb-4">Clases Programadas Hoy</h2>

          {clasesHoy.length === 0 ? (
            <p className="text-gray-500 text-center">No tienes clases programadas hoy.</p>
          ) : (
            <div className="grid gap-4">
              {clasesHoy.map((clase) => (
                <div
                  key={clase.id_horario_clase}
                  className="flex justify-between items-center border p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium">
                      {clase.materia.nombre} - {clase.grupo.nombre}
                    </p>
                    <p className="text-sm text-gray-500">
                      Aula: {clase.aula.nombre} | {clase.dia.nombre} {clase.bloque_horario.hr_inicio} - {clase.bloque_horario.hr_fin}
                    </p>
                  </div>
                  <button
                    onClick={() => registrarAsistencia(clase.id_horario_clase)}
                    className="bg-[#880000] hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Marcar Asistencia
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* === SECCIÓN 2: Justificar Ausencia === */}
        <section className="bg-white shadow-md p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-[#880000] mb-4">Justificar Ausencias</h2>

          {ausencias.length === 0 ? (
            <p className="text-gray-500 text-center">No tienes ausencias registradas recientes.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#880000] text-white">
                  <th className="p-2">Fecha</th>
                  <th className="p-2">Materia</th>
                  <th className="p-2">Grupo</th>
                  <th className="p-2">Estado</th>
                  <th className="p-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                {ausencias.map((a) => (
                  <tr key={a.id_asistencia} className="border-b text-center">
                    <td className="p-2">{a.fecha_registro}</td>
                    <td className="p-2">{a.materia}</td>
                    <td className="p-2">{a.grupo}</td>
                    <td className="p-2">{a.estado}</td>
                    <td className="p-2">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
                        onClick={() => setAsistenciaSeleccionada(a.id_asistencia)}
                      >
                        Justificar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Modal Justificación */}
          {asistenciaSeleccionada && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 text-[#880000]">Justificar Ausencia</h3>
                <textarea
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  placeholder="Escribe tu motivo..."
                  className="w-full border rounded-lg p-2 mb-3 focus:outline-[#880000]"
                />
                <input
                  type="file"
                  onChange={(e) => setDocumento(e.target.files?.[0] || null)}
                  className="w-full mb-3"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setAsistenciaSeleccionada(null)}
                    className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={enviarJustificacion}
                    className="px-3 py-1 bg-[#880000] text-white rounded-md hover:bg-red-700"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </motion.main>

      <Footer />
    </div>
  );
}
