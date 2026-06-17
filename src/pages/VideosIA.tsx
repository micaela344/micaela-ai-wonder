import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCTAButtons from "@/components/ServiceCTAButtons";
import NextServiceLink from "@/components/NextServiceLink";
import heroVideo from "@/assets/videos-ia/animaciones-shorts.mp4.asset.json";

const videos = [
  "/videos/final-animacion.mov",
  "/videos/0309_1.mov",
  "/videos/beauty-closeup.mp4",
  "/videos/freepik-macro-closeup.mp4",
  "/videos/freepik-cinematic-product.mp4",
  "/videos/sombra_de_maquillaje.mp4",
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
            <video src={heroVideo.url} autoPlay loop muted playsInline className="w-full h-64 md:h-[420px] object-cover" />
          </div>
          <div className="relative mb-12">
            <div
              ref={scrollerRef}
              className="flex flex-row gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {videos.map((src) => (
                <div
                  key={src}
                  className="snap-start shrink-0 w-[70%] sm:w-[45%] md:w-[calc((100%-3rem)/3)] rounded-xl overflow-hidden border border-border aspect-[9/16]"
                >
                  <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => scrollByDir("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-background transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={() => scrollByDir("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-background transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-12">
            Adaptamos cada pieza al formato que tu marca necesita: Feed (4:5), Reels & Stories (9:16) o formatos horizontales (16:9), optimizados para cada plataforma.
          </p>

          <ServiceCTAButtons />

          <NextServiceLink to="/servicios/campanas" label="Ver Campañas Publicitarias" />
        </motion.div>
      </div>
    </section>
    <Footer />
  </div>
  );
};

export default VideosIA;
