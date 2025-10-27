import { useState } from "react";
import GestionForm from "../../../app/components/common/GestionForm";
import GestionTable from "../../../app/components/common/GestionTable";

export default function GestionPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen w-full bg-sky-100">
      {/* wrapper con paddings responsivos y un ancho máximo GRANDE para monitores,
          si quieres 100% absoluto, quita max-w-screen-2xl */}
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-blue-800 mb-6 border-b-4 border-red-600 pb-2">
          Gestión de Gestiones Académicas
        </h1>

        {/* El formulario ocupa todo el ancho disponible */}
        <GestionForm onCreated={() => setRefresh(!refresh)} />

        {/* La tabla es responsive horizontalmente */}
        <div className="mt-6">
          <GestionTable refresh={refresh} />
        </div>
      </div>
    </div>
  );
}

