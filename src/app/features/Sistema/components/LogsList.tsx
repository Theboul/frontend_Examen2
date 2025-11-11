import { type Bitacora } from '../services/bitacoraService';

interface LogsListProps {
  logs: Bitacora[];
  loading: boolean;
}

export default function LogsList({ logs, loading }: LogsListProps) {
  const formatFecha = (fecha: string) =>
    new Date(fecha).toLocaleString('es-BO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-gray-500">
        <span className="animate-spin h-6 w-6 border-2 border-purple-500 border-t-transparent rounded-full mr-2"></span>
        Cargando registros...
      </div>
    );
  }

  if (!logs.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p>No se encontraron registros de bitácora</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Fecha</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Acción</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Descripción</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Usuario</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">IP</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {logs.map((log) => (
            <tr key={log.id_bitacora} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 text-gray-700">{formatFecha(log.fecha)}</td>
              <td className="px-4 py-2 text-purple-700 font-semibold">{log.accion}</td>
              <td className="px-4 py-2 text-gray-800 truncate max-w-[250px]" title={log.descripcion}>
                {log.descripcion || '-'}
              </td>
              <td className="px-4 py-2 text-gray-700">{log.usuario || 'Anónimo'}</td>
              <td className="px-4 py-2 text-gray-600">{log.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
