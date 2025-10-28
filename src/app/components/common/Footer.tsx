import React from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface FooterProps {
  logoSrc?: string;
}

const Footer: React.FC<FooterProps> = ({ logoSrc = "../../../../public/assets/1.png" }) => {

  return (
    <footer className="w-full bg-[#880000]/100 backdrop-blur-md border-t border-red-200 flex flex-col sm:flex-row items-center justify-between px-8 sm:px-8 py-22 shadow-sm gap-4 sm:gap-0">

      {/* Logo */}
      <div className="flex items-center justify-center mb-4 sm:mb-0">
        <img
          src={logoSrc}
          alt="Logo Afrodita"
          className="h-10 object-contain hover:scale-105 transition-transform"
        />
      </div>
       {/* Texto adicional opcional */}
      <div className="text-white text-white-100 mt-4 sm:mt-0 text-center sm:text-right">
        © {new Date().getFullYear()} FICCT - UAGRM. Todos los derechos reservados.
      </div>
      {/* Redes sociales */}
      <div className="flex items-center gap-3">
        <a
          href="#"
          className="p-2 rounded-full bg-white border border-[#5152a3] text-[#1a9920] hover:bg-[#F4AFCC]/20 transition"
          aria-label="Facebook"
        >
          <FaFacebook size={20} />
        </a>
        <a
          href="#"
          className="p-2 rounded-full bg-white border border-[#F4AFCC] text-[#C25B8C] hover:bg-[#F4AFCC]/20 transition"
          aria-label="Instagram"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="#"
          className="p-2 rounded-full bg-white border border-[#F4AFCC] text-[#C25B8C] hover:bg-[#F4AFCC]/20 transition"
          aria-label="TikTok"
        >
          <FaTiktok size={20} />
        </a>
        <a
          href="mailto:contacto@afrodita.com"
          className="p-2 rounded-full bg-white border border-[#F4AFCC] text-[#C25B8C] hover:bg-[#F4AFCC]/20 transition"
          aria-label="Email"
        >
          <MdEmail size={20} />
        </a>
      </div>

     
    </footer>
  );
};

export default Footer;
