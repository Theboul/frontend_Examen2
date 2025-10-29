import React from "react";

interface BannerProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  imageSrc: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  imageSrc
}) => {
  return (
    <div
      className="w-full h-56 sm:h-72 md:h-96 lg:h-[28rem] bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
   

      {/* Contenido del banner */}
      <div className="relative text-center text-white px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-snug sm:leading-tight md:leading-tight lg:leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6">
            {subtitle}
          </p>
        )}

      </div>
    </div>
  );
};

export default Banner;
