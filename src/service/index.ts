// ========== EXPORTACIÓN DE TODOS LOS SERVICIOS ==========

export { authService } from './authService';
export type { User, LoginData, AuthResponse, CambiarPasswordData } from './authService';

export { gestionService } from '../app/features/Gestion/services/gestionService';
export type { Gestion, GestionFormData } from '../app/features/Gestion/services/gestionService';

/**export { aulaService } from './aulaService';
export type { Aula, AulaFormData, AulaSelect } from './aulaService';

export { carreraService } from './carreraService';
export type { Carrera, CarreraFormData, CarreraSelect } from './carreraService';

export { materiaService } from './materiaService';
export type { Materia, MateriaFormData, MateriaSelect } from './materiaService';

export { docenteService } from './docenteService';
export type { Docente, DocenteFormData, DocenteSelect } from './docenteService';

export { grupoService } from './grupoService';
export type { Grupo, GrupoFormData, GrupoSelect } from './grupoService';


**/