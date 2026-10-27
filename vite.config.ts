import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// /proyectos necesita su propia vista previa al compartir el link (WhatsApp, LinkedIn y correo no ejecutan JS),
// así que generamos dist/proyectos/index.html con sus propios meta tags.
const PROYECTOS_META = {
  url: "https://micaistudio.com/proyectos",
  title: "MIC AI Studio | Videos realistas con IA para proyectos inmobiliarios",
  // Título de la tarjeta al compartir el link (WhatsApp, LinkedIn); la pestaña usa `title`.
  shareTitle: "MIC AI Studio | Videos realistas con IA para arquitectura, inmobiliarias e interiorismo",
  description:
    "Mostramos tu proyecto terminado antes de construirlo: recorridos, fachadas y reels para venta en verde.",
  image: "https://micaistudio.com/media/proyectos/og.jpg",
};

const proyectosHtml = (): Plugin => ({
  name: "proyectos-html",
  apply: "build",
  closeBundle() {
    const dist = path.resolve(__dirname, "dist");
    const m = PROYECTOS_META;
    const html = fs
      .readFileSync(path.join(dist, "index.html"), "utf8")
      .replace(/<title>[^<]*<\/title>/, `<title>${m.title}</title>`)
      .replace(/(<meta name="description" content=")[^"]*/, `$1${m.description}`)
      .replace(/(<meta property="og:url" content=")[^"]*/, `$1${m.url}`)
      .replace(/(<meta property="og:title" content=")[^"]*/, `$1${m.shareTitle}`)
      .replace(/(<meta property="og:description" content=")[^"]*/, `$1${m.description}`)
      .replace(/(<meta property="og:image" content=")[^"]*/, `$1${m.image}`)
      .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${m.shareTitle}`)
      .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${m.description}`)
      .replace(/(<meta name="twitter:image" content=")[^"]*/, `$1${m.image}`)
      .replace(/(<link rel="canonical" href=")[^"]*/, `$1${m.url}`);
    fs.mkdirSync(path.join(dist, "proyectos"), { recursive: true });
    fs.writeFileSync(path.join(dist, "proyectos", "index.html"), html);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), proyectosHtml()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
