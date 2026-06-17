import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCTAButtons from "@/components/ServiceCTAButtons";
import NextServiceLink from "@/components/NextServiceLink";
import ambiente1 from "@/assets/ambientes/ambiente-1.png.asset.json";
import ambiente2 from "@/assets/ambientes/ambiente-2.png.asset.json";
import ambiente3 from "@/assets/ambientes/ambiente-3.png.asset.json";
import ambiente4 from "@/assets/ambientes/ambiente-4.png.asset.json";
import ambiente5 from "@/assets/ambientes/ambiente-5.png.asset.json";
import ambiente6 from "@/assets/ambientes/ambiente-6.png.asset.json";

const ambienteImages = [
  { src: ambiente1.url, alt: "Ambiente 1" },
  { src: ambiente2.url, alt: "Ambiente 2" },
  { src: ambiente3.url, alt: "Ambiente 3" },
  { src: ambiente4.url, alt: "Ambiente 4" },
  { src: ambiente5.url, alt: "Ambiente 5" },
  { src: ambiente6.url, alt: "Ambiente 6" },
];

const ambienteVideos = [
  "/videos/final-animacion.mov",
  "/videos/0309_1.mov",
];

const VideosIA = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <Link to="/#servicios" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} /> Volver atrás
        </Link>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="rounded-xl overflow-hidden border border-border mb-10">
            <img src={ambiente1.url} alt="Espacios & Arquitectura" className="w-full h-64 md:h-[420px] object-cover" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Espacios & Arquitectura</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-16">
            Visualización de interiores, decoración y proyectos arquitectónicos generados con IA. Renders, recorridos y presentaciones para ver tu espacio antes de construirlo.
          </p>

          {/* SECTION 1 — Imágenes */}
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Imágenes</h2>
          <p className="text-muted-foreground mb-8">Espacios, interiores y arquitectura generados con IA</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {ambienteImages.map((img, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-border">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover aspect-[3/4]" loading="lazy" />
              </div>
            ))}
          </div>

          {/* SECTION 2 — Animaciones */}
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Animaciones</h2>
          <p className="text-muted-foreground mb-8">Recorridos y presentaciones animadas con IA</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {ambienteVideos.map((src) => (
              <div key={src} className="rounded-xl overflow-hidden border border-border aspect-video">
                <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-12">
            Adaptamos cada pieza al formato que tu marca o proyecto necesite, optimizado para web, redes sociales y presentaciones a clientes.
          </p>

          <ServiceCTAButtons />

          <NextServiceLink to="/servicios/imagenes-ia" label="Producto, Moda & Belleza" />
        </motion.div>
      </div>
    </section>
    <Footer />
  </div>
);

export default VideosIA;
