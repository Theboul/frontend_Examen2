# 🎓 Sistema de Gestión Académica FICCT

Sistema web para la gestión académica de la Facultad de Ingeniería en Ciencias de la Computación y Telecomunicaciones (FICCT) de la UAGRM.

## 🚀 Tecnologías

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS v4** - Estilos
- **Framer Motion** - Animaciones
- **React Router DOM** - Navegación
- **Axios** - Peticiones HTTP
- **Material-UI Icons** - Iconografía
- **React Icons** - Iconos adicionales

## 📋 Prerequisitos

- Node.js 18+ 
- npm o yarn

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Theboul/frontend_Examen2.git

# Entrar al directorio
cd frontend_Examen2

# Instalar dependencias
npm install
```

## 🏃‍♂️ Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:5173/`

## 🏗️ Build para Producción

```bash
# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
frontend_Exam2/
├── public/              # Archivos estáticos
│   └── assets/          # Imágenes y recursos
├── src/
│   ├── app/
│   │   ├── components/  # Componentes reutilizables
│   │   │   ├── common/  # Header, Footer, Sidebar, etc.
│   │   │   └── ui/      # Button, Input, etc.
│   │   └── features/    # Módulos principales
│   │       └── Gestion/ # Sistema de gestión
│   ├── assets/          # Assets importables
│   ├── lib/             # Configuraciones (axios, etc.)
│   └── service/         # Servicios API
├── vercel.json          # Configuración de Vercel
└── DEPLOYMENT.md        # Guía de despliegue
```

## 🌐 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Vercel detectará automáticamente la configuración
5. ¡Despliega!

### Opción 2: Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Desplegar
vercel

# Desplegar a producción
vercel --prod
```

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas.

## 🔐 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
VITE_API_URL=http://localhost:3000
VITE_API_KEY=your-api-key
```

**Nota:** Las variables deben empezar con `VITE_` para ser accesibles en el frontend.

## 📝 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Compila para producción
- `npm run preview` - Previsualiza build de producción
- `npm run lint` - Ejecuta ESLint

## 🎨 Características

- ✅ Dashboard interactivo
- ✅ Gestión de Aulas, Carreras, Docentes, Grupos, Materias
- ✅ Sistema de Horarios
- ✅ Gestión de Asistencias
- ✅ Reportes
- ✅ Diseño responsive (Mobile-first)
- ✅ Animaciones fluidas
- ✅ Tema personalizado FICCT

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte de un trabajo académico para la FICCT - UAGRM

## 👥 Autores

- **Theboul** - [GitHub](https://github.com/Theboul)

## 🔗 Enlaces

- [Repositorio](https://github.com/Theboul/frontend_Examen2)
- [Documentación de Despliegue](./DEPLOYMENT.md)
- [FICCT UAGRM](https://www.uagrm.edu.bo/)

---

**Hecho con ❤️ para FICCT - UAGRM**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
