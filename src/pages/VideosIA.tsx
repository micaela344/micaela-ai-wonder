import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCTAButtons from "@/components/ServiceCTAButtons";

const videos = [
  "/videos/final-animacion.mov",
  "/videos/0309_1.mov",
  "/videos/beauty-closeup.mp4",
  "/videos/freepik-macro-closeup.mp4",
  "/videos/freepik-cinematic-product.mp4",
];

const VideosIA = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByDir = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <Link to="/#servicios" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} /> Volver atrás
        </Link>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="rounded-xl overflow-hidden border border-border mb-10">
            <video src="/videos/sombra_de_maquillaje.mp4" autoPlay loop muted playsInline className="w-full h-64 md:h-[420px] object-cover" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Animaciones/Shorts</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-8">
            Producimos contenido audiovisual generativo para redes sociales, anuncios y presentaciones. Videos cortos, animaciones y motion graphics creados con IA, 10x más rápido que la producción tradicional.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {["Videos cortos para redes sociales", "Animaciones y motion graphics", "Producción 10x más rápida", "Contenido para ads y presentaciones"].map((item) => (
              <div key={item} className="p-5 rounded-lg border border-border bg-card">
                <p className="text-foreground text-sm">{item}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center mb-12">
            <div className="rounded-xl overflow-hidden border border-border aspect-[9/16]">
              <video src="/videos/final-animacion.mov" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden border border-border aspect-[9/16]">
              <video src="/videos/0309_1.mov" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden border border-border aspect-[9/16]">
              <video src="/videos/beauty-closeup.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-12">
            Adaptamos cada pieza al formato que tu marca necesita: Feed (4:5), Reels & Stories (9:16) o formatos horizontales (16:9), optimizados para cada plataforma.
          </p>

          <ServiceCTAButtons />
        </motion.div>
      </div>
    </section>
    <Footer />
  </div>
);

export default VideosIA;
