import React from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface FooterProps {
  logoSrc?: string;
}

const Footer: React.FC<FooterProps> = ({ logoSrc = "/assets/1.png" }) => {
  return (
    <footer className="w-full bg-[#880000] text-white flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 px-6 sm:px-10 py-6 sm:py-4 border-t border-red-300 shadow-md transition-all duration-300">
      
      {/* Logo */}
      <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
        <img
          src={logoSrc}
          alt="Logo Afrodita"
          className="h-12 object-contain hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Texto © */}
      <div className="text-center text-sm sm:text-base w-full sm:w-auto order-last sm:order-none">
        © {new Date().getFullYear()} <span className="font-semibold">FICCT - UAGRM</span>. Todos los derechos reservados.
      </div>

      {/* Redes sociales */}
      <div className="flex justify-center sm:justify-end items-center gap-3 w-full sm:w-auto">
        <a
          href="#"
          className="p-2 rounded-full bg-white text-[#1877F2] hover:bg-[#F4AFCC]/30 transition-transform transform hover:scale-110"
          aria-label="Facebook"
        >
          <FaFacebook size={20} />
        </a>
        <a
          href="#"
          className="p-2 rounded-full bg-white text-[#E1306C] hover:bg-[#F4AFCC]/30 transition-transform transform hover:scale-110"
          aria-label="Instagram"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="#"
          className="p-2 rounded-full bg-white text-black hover:bg-[#F4AFCC]/30 transition-transform transform hover:scale-110"
          aria-label="TikTok"
        >
          <FaTiktok size={20} />
        </a>
        <a
          href="mailto:contacto@afrodita.com"
          className="p-2 rounded-full bg-white text-[#880000] hover:bg-[#F4AFCC]/30 transition-transform transform hover:scale-110"
          aria-label="Email"
        >
          <MdEmail size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
