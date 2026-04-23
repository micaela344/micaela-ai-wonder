import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import campaignCover from "@/assets/campanas-cover.png";
import campanaCreativa from "@/assets/campana-creativa.png";
import ServiceCTAButtons from "@/components/ServiceCTAButtons";

const Campanas = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <Link to="/#servicios" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} /> Volver atrás
        </Link>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="rounded-xl overflow-hidden border border-border mb-10">
            <img src={campaignCover} alt="Campañas Publicitarias" className="w-full h-64 md:h-[420px] object-cover" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Campañas Publicitarias</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-8">
            Estrategia creativa potenciada por IA para campañas que convierten. Desde la conceptualización hasta la ejecución visual, creamos assets para todas las plataformas con A/B testing visual automatizado.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {["Estrategia creativa basada en datos", "A/B testing visual automatizado", "Assets para todas las plataformas", "Campañas multicanal integradas"].map((item) => (
              <div key={item} className="p-5 rounded-lg border border-border bg-card">
                <p className="text-foreground text-sm">{item}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold text-foreground mb-6">Estrategia creativa de producto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="rounded-xl overflow-hidden border border-border">
              <video src="/videos/anuncio_crema.mov" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden border border-border">
              <video src="/videos/beauty_product.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden border border-border">
              <video src="/videos/campana-freepik.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
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

export default Campanas;
