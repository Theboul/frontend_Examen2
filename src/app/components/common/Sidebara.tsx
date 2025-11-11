import { X } from "lucide-react";
import { sidebarMenu } from "../../config/sidebarMenuConfig";
import authService from "../../../service/authService";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  if (!isOpen) return null;

  // Obtener usuario desde el localStorage (authService)
  const user = authService.getCurrentUser();
  const rol = user?.rol || "Docente"; // por si no hay sesión, que no rompa

  const menuItems = sidebarMenu[rol as keyof typeof sidebarMenu] || sidebarMenu.Docente;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Fondo oscuro */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="relative bg-[#880000] w-64 sm:w-72 h-full p-6 shadow-2xl flex flex-col transform transition-transform duration-500 ease-out animate-slideIn rounded-r-2xl">
        {/* Botón de cerrar */}
        <button
          className="self-end text-white hover:text-gray-300"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Menú */}
        <nav className="flex flex-col gap-4 mt-6">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 text-white hover:text-yellow-300 transition-colors"
            >
              <item.icon />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Animación */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slideIn { animation: slideIn 0.3s ease forwards; }
      `}</style>
    </div>
  );
}
