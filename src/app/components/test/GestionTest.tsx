import { useEffect, useState } from 'react';
import { gestionService } from '../../../service';
import type { Gestion } from '../../../service';

/**
 * Componente de prueba para verificar la conexión con la API de Gestiones
 */
export default function GestionTest() {
  const [gestiones, setGestiones] = useState<Gestion[]>([]);
  const [gestionActiva, setGestionActiva] = useState<Gestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar gestiones al montar el componente
  useEffect(() => {
    cargarGestiones();
  }, []);

  // Función para cargar todas las gestiones
  const cargarGestiones = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await gestionService.getAll();
      setGestiones(data);
      console.log('✅ Gestiones cargadas:', data);
    } catch (err: any) {
      console.error('❌ Error al cargar gestiones:', err);
      setError(err.message || 'Error al cargar gestiones');
    } finally {
      setLoading(false);
    }
  };

  // Función para cargar la gestión activa
  const cargarGestionActiva = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await gestionService.getActiva();
      setGestionActiva(data);
      console.log('✅ Gestión activa:', data);
    } catch (err: any) {
      console.error('❌ Error al cargar gestión activa:', err);
      setError(err.message || 'Error al cargar gestión activa');
    } finally {
      setLoading(false);
    }
  };

  // Función para crear una gestión de prueba
  const crearGestionPrueba = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const nuevaGestion = await gestionService.create({
        anio: 2025,
        semestre: 2, // Cambiado a semestre 2 para evitar duplicados
        fecha_inicio: '2025-07-15',
        fecha_fin: '2025-12-20'
      });
      console.log('✅ Gestión creada:', nuevaGestion);
      alert('Gestión creada exitosamente: ' + nuevaGestion.anio + '-' + nuevaGestion.semestre);
      cargarGestiones(); // Recargar lista
    } catch (err: any) {
      console.error('❌ Error al crear gestión:', err);
      // Mostrar el mensaje del backend si existe
      const errorMsg = err.message || 'Error al crear gestión';
      setError(errorMsg);
      alert('Error: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Función para activar una gestión
  const activarGestion = async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await gestionService.activar(id);
      console.log('✅ Gestión activada:', id);
      alert('Gestión activada exitosamente');
      cargarGestiones(); // Recargar lista
      cargarGestionActiva(); // Actualizar gestión activa
    } catch (err: any) {
      console.error('❌ Error al activar gestión:', err);
      setError(err.message || 'Error al activar gestión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#2A3964]">
        🧪 Prueba de Conexión - API Gestiones
      </h1>

      {/* Botones de acción */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={cargarGestiones}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          🔄 Recargar Gestiones
        </button>
        
        <button
          onClick={cargarGestionActiva}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          ⭐ Ver Gestión Activa
        </button>
        
        <button
          onClick={crearGestionPrueba}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          ➕ Crear Gestión Prueba
        </button>
      </div>

      {/* Estado de carga */}
      {loading && (
        <div className="p-4 bg-blue-100 text-blue-800 rounded mb-4">
          ⏳ Cargando...
        </div>
      )}

      {/* Errores */}
      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded mb-4">
          ❌ Error: {error}
        </div>
      )}

      {/* Gestión Activa */}
      {gestionActiva && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
          <h2 className="text-xl font-bold text-green-800 mb-2">
            ⭐ Gestión Activa
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><strong>ID:</strong> {gestionActiva.id_gestion}</div>
            <div><strong>Año:</strong> {gestionActiva.anio}</div>
            <div><strong>Semestre:</strong> {gestionActiva.semestre}</div>
            <div><strong>Período:</strong> {gestionService.formatGestion(gestionActiva)}</div>
            <div><strong>Inicio:</strong> {gestionActiva.fecha_inicio}</div>
            <div><strong>Fin:</strong> {gestionActiva.fecha_fin}</div>
          </div>
        </div>
      )}

      {/* Lista de gestiones */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-bold p-4 bg-gray-50 border-b">
          📋 Lista de Gestiones ({gestiones.length})
        </h2>
        
        {gestiones.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay gestiones registradas
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Período</th>
                <th className="px-4 py-2 text-left">Año</th>
                <th className="px-4 py-2 text-left">Semestre</th>
                <th className="px-4 py-2 text-left">Inicio</th>
                <th className="px-4 py-2 text-left">Fin</th>
                <th className="px-4 py-2 text-center">Estado</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {gestiones.map((gestion) => (
                <tr key={gestion.id_gestion} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{gestion.id_gestion}</td>
                  <td className="px-4 py-2 font-semibold">
                    {gestionService.formatGestion(gestion)}
                  </td>
                  <td className="px-4 py-2">{gestion.anio}</td>
                  <td className="px-4 py-2">{gestion.semestre}</td>
                  <td className="px-4 py-2">{gestion.fecha_inicio}</td>
                  <td className="px-4 py-2">{gestion.fecha_fin}</td>
                  <td className="px-4 py-2 text-center">
                    {gestion.activo ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                        ✅ Activa
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        Inactiva
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {!gestion.activo && (
                      <button
                        onClick={() => activarGestion(gestion.id_gestion)}
                        disabled={loading}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:opacity-50"
                      >
                        Activar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Información de conexión */}
      <div className="mt-6 p-4 bg-gray-50 rounded text-sm">
        <h3 className="font-bold mb-2">🔗 Información de Conexión</h3>
        <div className="space-y-1 text-gray-700">
          <div><strong>API Base URL:</strong> {import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}</div>
          <div><strong>Endpoint:</strong> /gestiones</div>
          <div><strong>withCredentials:</strong> true</div>
        </div>
      </div>
    </div>
  );
}
