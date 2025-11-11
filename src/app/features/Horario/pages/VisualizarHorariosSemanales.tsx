import { useState } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import { horarioSemanalService } from "../services/horarioSemanalService";

export default function VisualizarHorariosSemanales() {
  const [filtro, setFiltro] = useState("");
  const [idFiltro, setIdFiltro] = useState("");
  const [horarios, setHorarios] = useState<any>(null);
  const [mensaje, setMensaje] = useState<{ tipo: "error" | "exito" | null; texto: string }>({
    tipo: null,
    texto: "",
  });
  const [loading, setLoading] = useState(false);

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: null, texto: "" });

    try {
      const res = await horarioSemanalService.obtenerHorarios(filtro, Number(idFiltro));
      if (res.success) {
        setHorarios(res);
        setMensaje({ tipo: "exito", texto: "✅ Horarios cargados correctamente." });
      } else {
        setMensaje({ tipo: "error", texto: res.message || "Error al cargar horarios." });
      }
    } catch (err: any) {
      setMensaje({
        tipo: "error",
        texto: err.response?.data?.message || "Error al conectar con el servidor.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-[#f9fafc] to-[#e6f0ff]">
      <Header />

      <main className="grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-[#003366] mb-6">
           Visualizar Horarios Semanales
        </h1>

        {/* Mensaje */}
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

        {/* FILTROS */}
        <form
          onSubmit={handleBuscar}
          className="bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto border space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#003366] mb-1">Filtro</label>
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Seleccione...</option>
                <option value="carrera">Por Carrera</option>
                <option value="docente">Por Docente</option>
                <option value="grupo">Por Grupo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#003366] mb-1">
                ID de {filtro || "Filtro"}
              </label>
              <input
                type="number"
                value={idFiltro}
                onChange={(e) => setIdFiltro(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Ej: 3"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#880000] text-white font-semibold py-2 rounded-lg hover:bg-[#b30000] transition-colors"
              >
                {loading ? "Cargando..." : "Buscar"}
              </button>
            </div>
          </div>
        </form>

        {/* GRILLA DE HORARIOS */}
        {horarios && horarios.success && (
          <div className="mt-10 bg-white shadow-lg rounded-xl p-6 border overflow-x-auto">
            <h2 className="text-2xl font-semibold text-[#003366] mb-4">
              {horarios.filtro_aplicado
                ? `📚 Horarios de ${horarios.filtro_aplicado.tipo.toUpperCase()}: ${horarios.filtro_aplicado.nombre}`
                : "📚 Horarios Generales"}
            </h2>

            <table className="min-w-full border text-sm text-gray-700">
              <thead className="bg-[#003366] text-white">
                <tr>
                  <th className="px-4 py-2">Día</th>
                  <th className="px-4 py-2">Bloque</th>
                  <th className="px-4 py-2">Materia</th>
                  <th className="px-4 py-2">Grupo</th>
                  <th className="px-4 py-2">Docente</th>
                  <th className="px-4 py-2">Aula</th>
                  <th className="px-4 py-2">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(horarios.grilla).map(([dia, bloques]: [string, any]) =>
                  Object.entries(bloques).map(([bloque, clases]: [string, any]) =>
                    clases.map((c: any, i: number) => (
                      <tr key={`${dia}-${bloque}-${i}`} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">{dia}</td>
                        <td className="px-4 py-2">{bloque}</td>
                        <td className="px-4 py-2">{c.materia.nombre}</td>
                        <td className="px-4 py-2">{c.grupo}</td>
                        <td className="px-4 py-2">{c.docente}</td>
                        <td className="px-4 py-2">{c.aula.nombre}</td>
                        <td className="px-4 py-2">{c.tipo_clase}</td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
