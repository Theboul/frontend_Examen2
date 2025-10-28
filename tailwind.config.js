/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default {
  theme: {
    extend: {
      colors: {
        customBlue: '#2A3964',
        customRed: '#880000',
      },
    },
  },
};
module.exports = {
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}