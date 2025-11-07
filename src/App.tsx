import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GestionPage from '../src/app/features/Gestion/GestionPage';
import Dashboard from './app/features/Gestion/services/pages/Dashboard';
import GestionarAsistencia from './app/features/Aula/pages/GestionarAulas';
import GestionarAulas from './app/features/Aula/pages/GestionarAulas';
import GestionarCarreras from './app/features/Carrera/pages/GestionarCarreras';
import GestionarDocentes from './app/features/Docente/pages/GestionarDocentes';
import GestionarGrupos from './app/features/Grupo/pages/GestionarGrupos';
import GestionarHorarios from './app/features/Gestion/services/pages/GestionarHorarios';
import GestionarMaterias from './app/features/Materia/pages/GestionarMaterias';
import GestionarReportes from './app/features/Gestion/services/pages/GestionarReportes';
import Login from './app/features/Gestion/services/auth/Login';
import TipoAula from './app/features/Aula/pages/TipoAula';
import GestionTest from './app/components/test/GestionTest';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gestion-academica" element={<GestionPage />} />
        <Route path="/asistencias" element={<GestionarAsistencia />} />
        <Route path="/aulas" element={<GestionarAulas />} />
        <Route path="/carreras" element={<GestionarCarreras />} />
        <Route path="/docentes" element={<GestionarDocentes />} />
        <Route path="/grupos" element={<GestionarGrupos />} />
        <Route path="/horarios" element={<GestionarHorarios />} />
        <Route path="/materias" element={<GestionarMaterias />} />
        <Route path="/reportes" element={<GestionarReportes />} />
        <Route path="/tipos-aulas" element={<TipoAula/>} />
        <Route path="/test/gestiones" element={<GestionTest />} />
      </Routes>
    </Router>
  );
}


export default App;