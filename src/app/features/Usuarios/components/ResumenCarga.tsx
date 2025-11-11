import React from "react";

interface Props {
  resultado: {
    total_procesados: number;
    exitosos: number;
    fallidos: number;
    archivo: string;
  };
}

const ResumenCarga: React.FC<Props> = ({ resultado }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-[#cdd7e6]">
    <h2 className="text-xl font-bold text-[#003366] mb-4">
      📊 Resumen del Proceso
    </h2>
    <p className="text-gray-700 mb-2">
      <strong>Archivo:</strong> {resultado.archivo}
    </p>
    <p className="text-gray-700 mb-2">
      <strong>Total procesados:</strong> {resultado.total_procesados}
    </p>
    <p className="text-green-600 font-semibold mb-2">
      ✅ Exitosos: {resultado.exitosos}
    </p>
    <p className="text-red-600 font-semibold">
      ❌ Fallidos: {resultado.fallidos}
    </p>
  </div>
);

export default ResumenCarga;
