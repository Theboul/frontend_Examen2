"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Users, MapPin, BookOpen } from "lucide-react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

export default function MiHorarioDocenteBonito() {
  const [asistenciaMarcada, setAsistenciaMarcada] = useState<{ [key: number]: boolean }>({});

  const docente = {
    nombre: "Dr. Carlos Mendoza",
    departamento: "Informática",
    correo: "carlos.mendoza@ficct.uagrm.edu.bo",
  };

  const horario = [
    { id: 1, materia: "Programación I", dia: "Lunes", hora: "08:00 - 09:30", aula: "Lab 101", estudiantes: 32, asistencia: 29 },
    { id: 2, materia: "Algoritmos", dia: "Martes", hora: "10:00 - 11:30", aula: "Aula 205", estudiantes: 25, asistencia: 22 },
    { id: 3, materia: "Estructuras de Datos", dia: "Miércoles", hora: "14:00 - 15:30", aula: "Lab 102", estudiantes: 28, asistencia: 25 },
    { id: 4, materia: "Ingeniería de Software", dia: "Jueves", hora: "09:00 - 10:30", aula: "Aula 302", estudiantes: 30, asistencia: 27 },
    { id: 5, materia: "Bases de Datos", dia: "Viernes", hora: "11:00 - 12:30", aula: "Lab 103", estudiantes: 26, asistencia: 24 },
  ];

  const estadisticas = {
    totalClases: 5,
    totalEstudiantes: 141,
    asistenciaPromedio: 87.2,
    proximaClase: "Programación I - Lunes 08:00",
  };

  const marcarAsistencia = (id: number) => {
    setAsistenciaMarcada((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-10">
        {/* Encabezado */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-[#880000] mb-2">Mi Horario Docente</h1>
          <p className="text-gray-700 font-medium">
            {docente.nombre} — <span className="text-gray-600">{docente.departamento}</span>
          </p>
          <p className="text-sm text-gray-500">{docente.correo}</p>
        </motion.div>

        {/* Estadísticas */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { label: "Total de Clases", valor: estadisticas.totalClases, color: "text-[#880000]" },
            { label: "Total de Estudiantes", valor: estadisticas.totalEstudiantes, color: "text-blue-700" },
            { label: "Asistencia Promedio", valor: `${estadisticas.asistenciaPromedio}%`, color: "text-green-600" },
            { label: "Próxima Clase", valor: estadisticas.proximaClase, color: "text-yellow-600" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300"
            >
              <p className="text-gray-500 font-medium">{item.label}</p>
              <p className={`text-2xl font-extrabold mt-2 ${item.color}`}>{item.valor}</p>
            </div>
          ))}
        </motion.div>

        {/* Título sección clases */}
        <h2 className="text-2xl font-bold text-[#880000] mb-6 flex items-center gap-2">
          <BookOpen size={22} /> Mis Clases
        </h2>

        {/* Tarjetas de clases */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {horario.map((clase) => {
            const porcentaje = (clase.asistencia / clase.estudiantes) * 100;
            const marcada = asistenciaMarcada[clase.id];

            return (
              <motion.div
                key={clase.id}
                className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden ${
                  marcada ? "border-[#880000] scale-[1.02]" : "border-gray-200"
                }`}
                whileHover={{ scale: 1.03 }}
              >
                {/* Encabezado */}
                <div className="bg-[#880000] text-white p-5">
                  <h3 className="text-xl font-bold">{clase.materia}</h3>
                  <p className="text-sm opacity-80">{clase.dia}</p>
                </div>

                {/* Contenido */}
                <div className="p-5 space-y-2">
                  <p className="flex items-center text-gray-700 gap-2">
                    <Clock size={18} /> {clase.hora}
                  </p>
                  <p className="flex items-center text-gray-700 gap-2">
                    <MapPin size={18} /> {clase.aula}
                  </p>
                  <p className="flex items-center text-gray-700 gap-2">
                    <Users size={18} /> {clase.estudiantes} estudiantes
                  </p>

                  {/* Indicador de asistencia */}
                  <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{clase.asistencia} presentes</span>
                      <span>{porcentaje.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#880000] to-red-500 transition-all"
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Botón marcar asistencia */}
                  <button
                    onClick={() => marcarAsistencia(clase.id)}
                    className={`w-full mt-4 py-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                      marcada
                        ? "bg-[#880000] text-white"
                        : "bg-white border-2 border-[#880000] text-[#880000] hover:bg-[#880000] hover:text-white"
                    }`}
                  >
                    {marcada ? <CheckCircle size={18} /> : "+"}
                    {marcada ? "Asistencia Marcada" : "Marcar Asistencia"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Resumen semanal */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[#880000] mb-6 flex items-center gap-2">
            📆 Resumen Semanal
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((dia) => {
              const clases = horario.filter((c) => c.dia === dia);
              return (
                <div key={dia} className="bg-white shadow-md border border-gray-200 rounded-xl p-4 text-center">
                  <h3 className="text-lg font-bold text-[#880000] mb-2">{dia}</h3>
                  {clases.length > 0 ? (
                    clases.map((c) => (
                      <p key={c.id} className="text-sm text-gray-700 mb-1">
                        {c.materia} <br />
                        <span className="text-xs text-gray-500">{c.hora}</span>
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic">Sin clases</p>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
