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
import ServiceCTAButtons from "@/components/ServiceCTAButtons";
import NextServiceLink from "@/components/NextServiceLink";

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
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-12">
            Imágenes, animaciones y campañas completas generadas con IA para tu marca.
          </p>

          <div className="border-t border-border/60 pt-12 mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Imágenes</h2>
            <p className="text-muted-foreground text-base md:text-lg font-light max-w-2xl mb-10">
              Fotografía de producto, moda y belleza con calidad de estudio
            </p>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.4fr)_minmax(0,0.7fr)] items-center">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/70">Imagen base</p>
                <div className="overflow-hidden rounded-lg border border-border bg-muted/20">
                  <img
                    src={fotoRefBaseAsset.url}
                    alt="Imagen base del producto: sandalias fotografiadas sobre fondo blanco"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <span className="text-4xl md:text-6xl font-light text-muted-foreground">=</span>
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/70">Variaciones</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {imagenesProductoResultado.map((imagen) => (
                    <div key={imagen.src} className="overflow-hidden rounded-lg border border-border bg-muted/20">
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
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/70">Animación</p>
                <div className="overflow-hidden rounded-lg border border-border bg-muted/20">
                  <video
                    src={animacionDemoAsset.url}
                    className="w-full h-auto block"
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Animaciones</h2>
            <p className="text-muted-foreground text-base md:text-lg font-light max-w-2xl mb-10">
              Vídeos cortos de 5 a 15 segundos listos para redes sociales
            </p>
            <div className="min-h-[120px]" />
          </div>

          <div className="border-t border-border/60 pt-12 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Campañas</h2>
            <p className="text-muted-foreground text-base md:text-lg font-light max-w-2xl mb-10">
              Del brief al resultado final — así se ve una campaña completa con IA
            </p>
            <div className="min-h-[120px]" />
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
