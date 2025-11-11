import React from "react";

interface ErrorItem {
  fila: number;
  datos: { nombres: string; apellidos: string; email: string; ci: string };
  error: string;
}

interface Props {
  errores: ErrorItem[];
}

const TablaErrores: React.FC<Props> = ({ errores }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-[#cdd7e6] overflow-x-auto">
    <h2 className="text-xl font-bold text-[#b30000] mb-4">
      ⚠️ Errores Detectados ({errores.length})
    </h2>
    <table className="w-full text-sm border-collapse border border-gray-300">
      <thead className="bg-[#003366] text-white">
        <tr>
          <th className="p-2 border border-gray-300">Fila</th>
          <th className="p-2 border border-gray-300">Nombres</th>
          <th className="p-2 border border-gray-300">Apellidos</th>
          <th className="p-2 border border-gray-300">Email</th>
          <th className="p-2 border border-gray-300">CI</th>
          <th className="p-2 border border-gray-300">Error</th>
        </tr>
      </thead>
      <tbody>
        {errores.map((e, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="p-2 border border-gray-300">{e.fila}</td>
            <td className="p-2 border border-gray-300">{e.datos.nombres}</td>
            <td className="p-2 border border-gray-300">{e.datos.apellidos}</td>
            <td className="p-2 border border-gray-300">{e.datos.email}</td>
            <td className="p-2 border border-gray-300">{e.datos.ci}</td>
            <td className="p-2 border border-gray-300 text-red-700 font-medium">
              {e.error}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TablaErrores;
