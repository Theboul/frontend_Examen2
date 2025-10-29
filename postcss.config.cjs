module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      // Desactiva las advertencias de clases canónicas
      lint: {
        suggestCanonicalClasses: false,
      }
    },
    autoprefixer: {},
  },
}
