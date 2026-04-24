import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import campaignCover from "@/assets/campanas-cover.png";
import ServiceCTAButtons from "@/components/ServiceCTAButtons";
import campana1 from "@/assets/campana-1.png";
import campana2 from "@/assets/campana-2.png";
import campana3 from "@/assets/campana-3.png";
import campana4 from "@/assets/campana-4.png";
import campana6 from "@/assets/campana-6.png";
import campanaFinalImg from "@/assets/campana-final.png";

const ingredientes = [campana1, campana2, campana3, campana4, campana6, campanaFinalImg];

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

          <h2 className="text-2xl font-semibold text-foreground mb-2">Estrategia creativa de producto</h2>
          <p className="text-muted-foreground mb-8">
            Combinamos múltiples elementos visuales generados con IA para construir una campaña final coherente.
          </p>

          {/* Layout: imágenes 3x2 a la izquierda + video resultado a la derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-12 items-center mb-16">
            {/* Grid de ingredientes 3 arriba / 3 abajo con "+" entre medio */}
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-y-4 items-center justify-items-center">
              {ingredientes.map((src, i) => {
                const col = i % 3;
                const row = Math.floor(i / 3);
                return (
                  <>
                    <motion.div
                      key={`img-${i}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="w-full aspect-[3/4] rounded-xl overflow-hidden border border-border bg-card shadow-md"
                      style={{ gridColumn: col * 2 + 1, gridRow: row + 1 }}
                    >
                      <img src={src} alt={`Elemento ${i + 1}`} className="w-full h-full object-cover" />
                    </motion.div>
                    {col < 2 && (
                      <span
                        key={`plus-${i}`}
                        className="text-foreground/70 text-3xl font-extralight leading-none select-none"
                        style={{ gridColumn: col * 2 + 2, gridRow: row + 1 }}
                      >
                        +
                      </span>
                    )}
                  </>
                );
              })}
            </div>

            {/* Resultado: video al costado derecho, completo */}
            <div className="flex flex-col items-center lg:w-[280px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-border" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Resultado</span>
                <div className="h-px w-8 bg-border" />
              </div>
              <div className="w-full rounded-2xl overflow-hidden border border-border shadow-2xl bg-card">
                <video
                  src="/videos/campana-final.mov"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-contain"
                />
              </div>
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
