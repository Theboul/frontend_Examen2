import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    // --- Adicion del plugin y configuración ---
    VitePWA({
      registerType: 'autoUpdate',
      
      // Con esto, Vite genera el archivo manifest.json
      manifest: {
        name: 'GestionFicct', // El nombre completo de la app
        short_name: 'FICCT',  // El nombre en el icono del homescreen
        description: 'Gestor de Horarios y Asistencia de la FICCT',
        theme_color: '#ffffff', // Color de la barra de estado
        background_color: '#ffffff',
        display: 'standalone', // Hace que se vea como una app nativa
        start_url: '/', // La página que se abre al iniciar
        icons: [
          {
            src: 'assets/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
