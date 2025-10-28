import { X } from "lucide-react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentIcon from "@mui/icons-material/Assignment";

interface SidebarClienteProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
  { label: "Gestión Académica", href: "/gestion-academica", icon: <SchoolIcon /> },
  { label: "Docentes", href: "/docentes", icon: <PersonIcon /> },
  { label: "Materias", href: "/materias", icon: <MenuBookIcon /> },
  { label: "Grupos", href: "/grupos", icon: <GroupIcon /> },
  { label: "Aulas", href: "/aulas", icon: <MeetingRoomIcon /> },
  { label: "Carreras", href: "/carreras", icon: <AccountBalanceIcon /> },
  { label: "Horarios", href: "/horarios", icon: <AccessTimeIcon /> },
  { label: "Asistencias", href: "/asistencias", icon: <AssignmentIcon /> },
  { label: "Reportes", href: "/reportes", icon: <AssignmentIcon /> },
]

export default function SidebarCliente({ isOpen, onClose }: SidebarClienteProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Fondo translúcido */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="relative bg-[#880000] w-64 sm:w-72 h-full p-6 shadow-2xl flex flex-col transform transition-transform duration-500 ease-out animate-slideIn rounded-r-2xl">
        {/* Botón de cerrar */}
        <button
          className="self-end text-blue hover:text-blue-900"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Menú */}
        <nav className="flex flex-col gap-4 mt-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 text-lg font-medium transition-colors"
            >
              {/* Ícono siempre blanco */}
              <span className="text-white">{item.icon}</span>
              {/* Label con hover rosado */}
              <span className="text-white hover:text-blue-600">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Animación slide-in con Tailwind */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
