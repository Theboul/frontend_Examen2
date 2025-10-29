import React, { useState } from "react";
import { MdPersonOutline, MdMenu } from "react-icons/md";
import Sidebar from "../common/Sidebara";

interface HeaderProps {
  logoSrc?: string;
}

const Header: React.FC<HeaderProps> = ({
  logoSrc = "/assets/1.png",
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Header principal */}
      <header className="w-full bg-[#880000] backdrop-blur-md border-b border-pink-200 flex items-center justify-between px-4 sm:px-8 py-5 shadow-sm">
        {/* Menú hamburguesa */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-700 hover:text-[#C25B8C] transition-colors p-2 rounded-md hover:bg-[#FBE2EB]"
          aria-label="Abrir menú"
        >
          <MdMenu size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center">
          <img
            src={logoSrc}
            alt="Logo Afrodita"
            className="h-16 object-contain hover:scale-105 transition-transform"
          />
        </div>

        {/* Botón de iniciar sesión */}
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="flex items-center gap-1 bg-white border border-[#750c09] text-[#ffffff] px-3 py-1 rounded-full text-sm font-medium hover:bg-[#F4AFCC]/20 transition"
          >
            <MdPersonOutline size={18} />
            Iniciar sesión
          </a>
        </div>
      </header>

      {/* 🔹 Franja azul delgadita debajo del header */}
      <div className="w-full h-[20px] bg-[#2A3964]" />

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Fondo oscuro (overlay) */}
          <div
            className="absolute inset-0 bg-transparent"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar ocupando toda la pantalla */}
          <div
            className={`relative z-50 bg-pink w-full h-full shadow-none p-6 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{
              border: "none",
              boxShadow: "none",
            }}
          ></div>
          <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          
        </div>
         
      )}
    </>
  );
};

export default Header;
