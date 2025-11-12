import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ⚙️ Configuración del build
  build: {
    outDir: "dist", // Carpeta donde se guarda el resultado final
  },

  // 🌍 Base para que las rutas funcionen correctamente en Vercel
  base: "/",

  // 🚀 Servidor local de desarrollo
  server: {
    port: 5173,
    open: true,
  },

  // 🔐 Compatibilidad con process.env (por ejemplo para variables del backend)
  define: {
    "process.env": {},
  },
});
