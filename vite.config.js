import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base relativo + rutas con hash (#/refugio): funciona en GitHub Pages
// sin importar el nombre del repo y sin configurar redirecciones 404.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
