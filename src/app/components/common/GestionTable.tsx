import { useEffect, useState } from "react";
import { GestionService } from "../../features/Gestion/services/gestionService";


export default function GestionTable({ refresh }: { refresh: boolean }) {
  const [gestiones, setGestiones] = useState<any[]>([]);

  const cargarGestiones = async () => {
    const res = await GestionService.listar();
    if (res.success) setGestiones(res.data);
  };

  useEffect(() => {
    cargarGestiones();
  }, [refresh]);

  const activar = async (id: number) => {
    const res = await GestionService.activar(id);
    alert(res.message);
    cargarGestiones();
  };

  const eliminar = async (id: number) => {
    if (confirm("¿Deseas eliminar esta gestión?")) {
      const res = await GestionService.eliminar(id);
      alert(res.message);
      cargarGestiones();
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mt-6 w-full">
      <h2 className="text-blue-800 font-semibold mb-3 text-center sm:text-left">
        Gestiones Registradas
      </h2>

      {/* 🧩 Vista tipo tabla para pantallas medianas y grandes */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-center border">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="py-2 px-3">Año</th>
              <th>Semestre</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {gestiones.length > 0 ? (
              gestiones.map((g) => (
                <tr
                  key={g.id_gestion}
                  className="border-b hover:bg-sky-50 text-gray-700"
                >
                  <td className="py-2">{g.anio}</td>
                  <td>{g.semestre}</td>
                  <td>{g.fecha_inicio}</td>
                  <td>{g.fecha_fin}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        g.activo ? "bg-green-600" : "bg-gray-400"
                      }`}
                    >
                      {g.activo ? "Activa" : "Inactiva"}
                    </span>
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => activar(g.id_gestion)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                    >
                      Activar
                    </button>
                    <button
                      onClick={() => eliminar(g.id_gestion)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-3 text-gray-500">
                  No hay gestiones registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📱 Vista tipo tarjetas para pantallas pequeñas */}
      <div className="block md:hidden space-y-3">
        {gestiones.length > 0 ? (
          gestiones.map((g) => (
            <div
              key={g.id_gestion}
              className="border rounded-lg p-3 shadow-sm bg-gray-50"
            >
              <div className="flex justify-between">
                <span className="font-semibold text-blue-700">
                  {g.anio} / Semestre {g.semestre}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-white text-xs ${
                    g.activo ? "bg-green-600" : "bg-gray-400"
                  }`}
                >
                  {g.activo ? "Activa" : "Inactiva"}
                </span>
              </div>
              <p className="text-sm mt-1 text-gray-700">
                <b>Inicio:</b> {g.fecha_inicio} <br />
                <b>Fin:</b> {g.fecha_fin}
              </p>
              <div className="flex gap-2 mt-3 justify-end">
                <button
                  onClick={() => activar(g.id_gestion)}
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-700"
                >
                  Activar
                </button>
                <button
                  onClick={() => eliminar(g.id_gestion)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No hay gestiones registradas
          </p>
        )}
      </div>
    </div>
  );
}
