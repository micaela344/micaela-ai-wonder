import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aiImageCoverAsset from "@/assets/ai-image-cover.png.asset.json";
import fotoRefBaseAsset from "@/assets/imagenes-ia/foto-ref-base.png.asset.json";
import resultado1Asset from "@/assets/imagenes-ia/imagen-resultado-1.png.asset.json";
import resultado2Asset from "@/assets/imagenes-ia/imagen-resultado-2.png.asset.json";
import resultado3Asset from "@/assets/imagenes-ia/imagen-resultado-3.png.asset.json";
import resultado4Asset from "@/assets/imagenes-ia/imagen-resultado-4.png.asset.json";
import animacionDemoAsset from "@/assets/imagenes-ia/animacion-demo.mp4.asset.json";
import joyaBase1Asset from "@/assets/imagenes-ia/campana/joya-base-1.png.asset.json";
import joyaBase2Asset from "@/assets/imagenes-ia/campana/joya-base-2.png.asset.json";
import joyaBase3Asset from "@/assets/imagenes-ia/campana/joya-base-3.png.asset.json";
import joyaBase4Asset from "@/assets/imagenes-ia/campana/joya-base-4.png.asset.json";
import campanaFinalAsset from "@/assets/imagenes-ia/campana/campana-final.mp4.asset.json";
import ServiceCTAButtons from "@/components/ServiceCTAButtons";
import NextServiceLink from "@/components/NextServiceLink";

const productosBaseCampana = [
  { src: joyaBase1Asset.url, alt: "Joya base: aretes con cauri y cristales" },
  { src: joyaBase2Asset.url, alt: "Joya base: collar con cauris y cristales" },
  { src: joyaBase3Asset.url, alt: "Joya base: anillo con cauri y cristales" },
  { src: joyaBase4Asset.url, alt: "Joya base: pulsera con cauris y cristales" },
];

const aiImageCover = aiImageCoverAsset.url;

const imagenesProductoResultado = [
  {
    src: resultado1Asset.url,
    alt: "Resultado generado del producto en contexto de playa",
  },
  {
    src: resultado2Asset.url,
    alt: "Resultado generado editorial del producto caminando en la playa",
  },
  {
    src: resultado3Asset.url,
    alt: "Resultado generado en detalle macro del producto",
  },
  {
    src: resultado4Asset.url,
    alt: "Resultado generado del producto sobre roca en exterior",
  },
];

const ImagenesIA = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <Link to="/#servicios" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} /> Volver atrás
        </Link>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="rounded-xl overflow-hidden border border-border mb-10">
            <img src={aiImageCover} alt="Imágenes con IA" className="w-full h-64 md:h-[420px] object-cover" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-12">Imágenes-Animaciones-Campañas</h1>

          <div className="border-t border-border/60 pt-12 mb-24">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/70">Imagen base</p>
                <div className="w-[240px] overflow-hidden rounded-lg border border-border bg-muted/20">
                  <img
                    src={fotoRefBaseAsset.url}
                    alt="Imagen base del producto: sandalias fotografiadas sobre fondo blanco"
                    className="w-full aspect-[4/5] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <span className="text-4xl md:text-6xl font-light text-muted-foreground">=</span>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/70">Variaciones</p>
                <div className="grid grid-cols-2 gap-3 w-[492px]">
                  {imagenesProductoResultado.map((imagen) => (
                    <div key={imagen.src} className="w-[240px] overflow-hidden rounded-lg border border-border bg-muted/20">
                      <img
                        src={imagen.src}
                        alt={imagen.alt}
                        className="w-full aspect-[4/5] object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-primary">Animación</p>
                <div className="w-[400px] overflow-hidden rounded-lg border-2 border-primary/40 bg-muted/20 shadow-lg shadow-primary/10">
                  <video
                    src={animacionDemoAsset.url}
                    className="w-full aspect-[4/5] object-cover block"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/60 pt-12 mb-24">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/70">Productos base</p>
                <div className="grid grid-cols-2 gap-3 w-[492px]">
                  {productosBaseCampana.map((imagen) => (
                    <div key={imagen.src} className="w-[240px] overflow-hidden rounded-lg border border-border bg-muted/20">
                      <img
                        src={imagen.src}
                        alt={imagen.alt}
                        className="w-full aspect-[4/5] object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <span className="text-4xl md:text-6xl font-light text-muted-foreground">=</span>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-primary">Campaña</p>
                <div className="w-[400px] overflow-hidden rounded-lg border-2 border-primary/40 bg-muted/20 shadow-lg shadow-primary/10">
                  <video
                    src={campanaFinalAsset.url}
                    className="w-full aspect-[4/5] object-cover block"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>
            </div>
          </div>


          <ServiceCTAButtons />

          <NextServiceLink to="/servicios/espacios-arquitectura" label="Ver Espacios & Arquitectura" />
        </motion.div>
      </div>
    </section>
    <Footer />
  </div>
);

export default ImagenesIA;
