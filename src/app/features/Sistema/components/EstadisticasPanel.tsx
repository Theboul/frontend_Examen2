interface EstadisticasPanelProps {
  estadisticas: any;
  loading: boolean;
}

export default function EstadisticasPanel({ estadisticas, loading }: EstadisticasPanelProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 animate-pulse shadow-sm">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-5"></div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!estadisticas) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-4 sm:p-6 transition-all duration-300">
      {/* Título */}
      <h3 className="text-lg sm:text-xl font-bold text-[#003366] mb-5 flex items-center gap-2">
        📊 Estadísticas del Sistema
        <span className="text-sm text-gray-500 font-medium">
          ({estadisticas.periodo})
        </span>
      </h3>

      {/* Tarjetas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total de eventos */}
        <div className="p-4 rounded-lg border border-blue-100 bg-gradient-to-br from-[#e6f0ff] to-[#f9fbff] shadow-sm hover:shadow-md transition-all duration-200">
          <p className="text-[#003366] text-sm font-semibold uppercase tracking-wide">
            Total Eventos
          </p>
          <p className="text-3xl font-bold text-[#003366] mt-2">
            {estadisticas.total_eventos}
          </p>
        </div>

        {/* Usuarios registrados */}
        <div className="p-4 rounded-lg border border-green-100 bg-gradient-to-br from-[#e6f9f0] to-[#f7fff9] shadow-sm hover:shadow-md transition-all duration-200">
          <p className="text-green-700 text-sm font-semibold uppercase tracking-wide">
            Usuarios Registrados
          </p>
          <p className="text-3xl font-bold text-green-800 mt-2">
            {estadisticas.distribucion_usuarios.registrados}
          </p>
        </div>

        {/* Usuarios anónimos */}
        <div className="p-4 rounded-lg border border-yellow-100 bg-gradient-to-br from-[#fffbe6] to-[#fffef9] shadow-sm hover:shadow-md transition-all duration-200">
          <p className="text-yellow-700 text-sm font-semibold uppercase tracking-wide">
            Usuarios Anónimos
          </p>
          <p className="text-3xl font-bold text-yellow-800 mt-2">
            {estadisticas.distribucion_usuarios.anonimos}
          </p>
        </div>

        {/* Porcentaje de anónimos */}
        <div className="p-4 rounded-lg border border-red-100 bg-gradient-to-br from-[#ffe6e6] to-[#fff5f5] shadow-sm hover:shadow-md transition-all duration-200">
          <p className="text-[#880000] text-sm font-semibold uppercase tracking-wide">
            % de Anónimos
          </p>
          <p className="text-3xl font-bold text-[#b30000] mt-2">
            {estadisticas.distribucion_usuarios.porcentaje_anonimos}%
          </p>
        </div>
      </div>

      {/* Top acciones y usuarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Acciones más comunes */}
        <div className="bg-[#f8faff] border border-[#dce3f0] rounded-lg p-4 shadow-sm">
          <h4 className="font-semibold text-[#003366] mb-3">
            🔹 Acciones Más Comunes
          </h4>
          <ul className="space-y-2">
            {estadisticas.estadisticas_por_accion.slice(0, 5).map((stat: any) => (
              <li
                key={stat.accion}
                className="flex justify-between items-center p-2 rounded hover:bg-[#f0f4ff] transition-colors"
              >
                <span className="text-sm text-gray-700">{stat.accion}</span>
                <span className="bg-[#003366] text-white px-3 py-1 rounded text-xs font-medium">
                  {stat.total}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Usuarios más activos */}
        <div className="bg-[#fff9f9] border border-[#f3dede] rounded-lg p-4 shadow-sm">
          <h4 className="font-semibold text-[#880000] mb-3">
            🔸 Usuarios Más Activos
          </h4>
          <ul className="space-y-2">
            {estadisticas.usuarios_mas_activos.slice(0, 5).map((user: any) => (
              <li
                key={user.id_usuario__nombre_usuario}
                className="flex justify-between items-center p-2 rounded hover:bg-[#fff1f1] transition-colors"
              >
                <span className="text-sm text-gray-700">
                  {user.id_usuario__nombre_usuario}
                </span>
                <span className="bg-[#880000] text-white px-3 py-1 rounded text-xs font-medium">
                  {user.total}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
