import { motion } from "framer-motion";
import Header from "../../../../components/common/Header";
import Footer from "../../../../components/common/Footer";
import Banner from "../../../../components/banner";

export default function GestionPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* HEADER */}
      <Header />

      {/* BANNER SUPERIOR */}
      <Banner
        title="Bienvenido a la Gestión FICCT"
        subtitle=""
        imageSrc="/assets/ban1.jpg"
        ctaText=""
        ctaLink=""
      />

      {/* ANIMACIÓN PRINCIPAL */}
      <motion.main
        className="flex-grow mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* TÍTULO */}
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2A3964] mb-6 border-b-4 border-[#880000] pb-2 text-center sm:text-left"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Dashboard
        </motion.h1>

           {/* SECCIÓN DE INFORMACIÓN DE LA FICCT */}
 <motion.section
   className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8"
   initial={{ opacity: 0, y: 20 }}
   whileInView={{ opacity: 1, y: 0 }}
   viewport={{ once: true, amount: 0.3 }}
   transition={{ duration: 0.6 }}
 >
   {/* 🏛 Historia */}
   <motion.div
     className="bg-gradient-to-br from-[#ffffff] to-[#fef2f2] border border-pink-100 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-transform hover:-translate-y-1 duration-300"
     whileHover={{ scale: 1.02 }}
   >
     <h2 className="text-2xl font-bold text-[#880000] mb-4 flex items-center gap-2">
      🏛 Historia
    </h2>
    <ul className="list-disc pl-5 text-gray-700 space-y-2 leading-relaxed">
      <li><strong>1987:</strong> Creación de la carrera de Ingeniería Informática en la UAGRM.</li>
      <li><strong>2003:</strong> Se crean menciones en Ciencias de la Computación y Análisis de Sistemas.</li>
      <li><strong>2005:</strong> Nacen las carreras de Ingeniería Informática, Ingeniería en Sistemas e Ingeniería en Redes y Telecomunicaciones.</li>
      <li><strong>2012:</strong> Se funda oficialmente la FICCT como la primera facultad de su tipo en Bolivia.</li>
    </ul>
  </motion.div>

  {/* 🎓 Oferta Académica */}
  <motion.div
    className="bg-gradient-to-br from-[#ffffff] to-[#f1f5ff] border border-blue-100 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-transform hover:-translate-y-1 duration-300"
    whileHover={{ scale: 1.02 }}
  >
    <h2 className="text-2xl font-bold text-[#2A3964] mb-4 flex items-center gap-2">
      🎓 Oferta Académica
    </h2>
    <div className="space-y-3">
      <div>
        <h3 className="font-semibold text-[#880000]">Pregrado</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Ingeniería Informática</li>
          <li>Ingeniería en Sistemas</li>
          <li>Ingeniería en Redes y Telecomunicaciones</li>
          <li>Ingeniería en Robótica</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-[#880000] mt-4">Posgrado</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Maestría en Dirección Estratégica en Ingeniería de Software</li>
          <li>Maestría en Seguridad Informática</li>
          <li>Maestría en Big Data y Análisis de Datos</li>
        </ul>
      </div>
    </div>
  </motion.div>

  {/* 📍 Ubicación */}
  <motion.div
    className="bg-gradient-to-br from-[#ffffff] to-[#fff7ed] border border-orange-100 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-transform hover:-translate-y-1 duration-300"
    whileHover={{ scale: 1.02 }}
  >
    <h2 className="text-2xl font-bold text-[#2A3964] mb-4 flex items-center gap-2">
      📍 Ubicación
    </h2>
    <div className="text-gray-700 leading-relaxed">
      <p><strong>Dirección:</strong> Av. Busch, Ciudad Universitaria, Módulo 236 - Santa Cruz de la Sierra, Bolivia.</p>
      <p><strong>Teléfono/Fax:</strong> (591) 3 - 3553636</p>
      <p>
        <strong>Correo:</strong>{" "}
        <a href="mailto:f_icct@uagrm.edu.bo" className="text-[#880000] hover:underline">
          f_icct@uagrm.edu.bo
        </a>
      </p>
      <p><strong>Horario:</strong> Lunes a viernes, de 8:00 a 15:30</p>
    </div>
  </motion.div>

  {/* 🧠 Acerca */}
  <motion.div
    className="bg-gradient-to-br from-[#ffffff] to-[#f3f4f6] border border-gray-200 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-transform hover:-translate-y-1 duration-300"
    whileHover={{ scale: 1.02 }}
  >
    <h2 className="text-2xl font-bold text-[#2A3964] mb-4 flex items-center gap-2">
      🧠 Acerca
    </h2>
    <p className="text-gray-700 leading-relaxed">
      La <strong>FICCT UAGRM</strong> se dedica a la formación de profesionales en Tecnologías de la Información y la Comunicación (TIC), ofreciendo programas académicos innovadores y adaptados a las necesidades del mercado tecnológico.
    </p>
  </motion.div>
</motion.section>
      </motion.main>

      {/* BANNER INFERIOR */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <Banner
          title=""
          subtitle=""
          imageSrc="/assets/modulo.jpg"
          ctaText=""
          ctaLink=""
        />
      </motion.div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
