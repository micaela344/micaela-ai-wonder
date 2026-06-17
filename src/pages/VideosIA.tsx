import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCTAButtons from "@/components/ServiceCTAButtons";
import heroVideo from "@/assets/videos-ia/animaciones-shorts.mp4.asset.json";
import espacioBase from "@/assets/videos-ia/espacio-base.jpg.asset.json";
import espacioVariaciones from "@/assets/videos-ia/espacio-variaciones.mp4.asset.json";
import espacioBase2 from "@/assets/videos-ia/espacio-base-2.png.asset.json";
import espacioVariaciones2 from "@/assets/videos-ia/espacio-variaciones-2.mp4.asset.json";

const examples = [
  { base: espacioBase, video: espacioVariaciones },
  { base: espacioBase2, video: espacioVariaciones2 },
];

const VideosIA = () => {
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
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] tracking-tight font-light text-foreground mb-12">
            Renders, animaciones y visualizaciones de interiores, exteriores y arquitectura generados con IA.
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-12">
            <div className="flex-1 rounded-xl overflow-hidden border border-border w-full">
              <img src={espacioBase.url} alt="Espacio base sin amueblar" className="w-full h-64 md:h-[320px] object-cover" />
            </div>
            <span className="text-4xl md:text-5xl font-light text-foreground select-none">=</span>
            <div className="flex-1 rounded-xl overflow-hidden border border-border w-full">
              <video src={espacioVariaciones.url} autoPlay loop muted playsInline className="w-full h-64 md:h-[320px] object-cover" />
            </div>
          </div>
          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-light text-foreground mb-2">Imágenes</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Renders de interiores, ambientes y arquitectura con calidad profesional
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-light text-foreground mb-2">Animaciones</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Recorridos virtuales y presentaciones animadas para tus proyectos
              </p>
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
};

export default VideosIA;
