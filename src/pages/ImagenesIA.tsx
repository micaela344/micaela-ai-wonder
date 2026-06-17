import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aiImageCoverAsset from "@/assets/ai-image-cover.png.asset.json";
const aiImageCover = aiImageCoverAsset.url;
import productoIA1 from "@/assets/producto-ia-1.webp";
import productoIA2 from "@/assets/producto-ia-2.webp";
import productoIA3 from "@/assets/producto-ia-3.webp";
import productoIA4 from "@/assets/producto-ia-4.webp";
import beautyIA1 from "@/assets/beauty-ia-1.webp";
import beautyIA2 from "@/assets/beauty-ia-2.webp";
import beautyIA3 from "@/assets/beauty-ia-3.webp";
import beautyIA4 from "@/assets/beauty-ia-4.webp";
import persona1 from "@/assets/persona-1.webp";
import persona2 from "@/assets/persona-2.webp";
import persona3 from "@/assets/persona-3.webp";
import persona4 from "@/assets/persona-4.webp";
import campana1 from "@/assets/campana-1.webp";
import campana2 from "@/assets/campana-2.webp";
import campana3 from "@/assets/campana-3.webp";
import campana4 from "@/assets/campana-4.webp";
import campana6 from "@/assets/campana-6.webp";
import campanaFinalImg from "@/assets/campana-final.webp";
import ServiceCTAButtons from "@/components/ServiceCTAButtons";
import NextServiceLink from "@/components/NextServiceLink";

const productoImages = [productoIA1, productoIA2, productoIA3, productoIA4];
const beautyImages = [beautyIA1, beautyIA2, beautyIA3, beautyIA4];
const personasImages = [persona1, persona2, persona3, persona4];
const ingredientes = [campana1, campana2, campana3, campana4, campana6, campanaFinalImg];
const animationVideos = [
  "/videos/beauty-closeup.mp4",
  "/videos/sombra_de_maquillaje.mp4",
  "/videos/freepik-macro-closeup.mp4",
  "/videos/freepik-cinematic-product.mp4",
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
            <img src={aiImageCover} alt="Producto, Moda & Belleza" className="w-full h-64 md:h-[420px] object-cover" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Producto, Moda & Belleza</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-16">
            Contenido visual hiperrealista creado con IA para marcas de producto, moda y belleza: desde imágenes y vídeos cortos para redes sociales hasta campañas visuales completas.
          </p>

          {/* SECTION 1 — Imágenes */}
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Imágenes</h2>
          <p className="text-muted-foreground mb-8">Fotografía de producto, moda y belleza generada con IA</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {productoImages.map((img, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-border aspect-square">
                <img src={img} alt={`Producto IA ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {beautyImages.map((img, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-border aspect-square">
                <img src={img} alt={`Beauty IA ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {personasImages.map((img, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-border aspect-square">
                <img src={img} alt={`Persona hiperrealista ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* SECTION 2 — Animaciones */}
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Animaciones</h2>
          <p className="text-muted-foreground mb-8">Vídeos cortos de 5-15 segundos para redes sociales</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {animationVideos.map((src) => (
              <div key={src} className="rounded-xl overflow-hidden border border-border aspect-[9/16]">
                <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* SECTION 3 — Campañas */}
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Campañas</h2>
          <p className="text-muted-foreground mb-8">Del concepto al resultado final</p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-10 lg:gap-8 items-center mb-20">
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-y-4 items-center justify-items-center">
              {ingredientes.map((src, i) => {
                const col = i % 3;
                const row = Math.floor(i / 3);
                return (
                  <div key={`wrap-${i}`} className="contents">
                    <motion.div
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
                        className="text-foreground/70 text-3xl font-extralight leading-none select-none"
                        style={{ gridColumn: col * 2 + 2, gridRow: row + 1 }}
                      >
                        +
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <span className="hidden lg:block text-foreground/70 text-4xl font-extralight leading-none select-none">=</span>

            <div className="flex flex-col items-center lg:w-[280px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-border" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Resultado</span>
                <div className="h-px w-8 bg-border" />
              </div>
              <div className="w-full rounded-2xl overflow-hidden border border-border shadow-2xl bg-card">
                <video src="/videos/campana-final.mov" autoPlay loop muted playsInline className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-12">
            Adaptamos cada pieza al formato que tu marca necesita: Feed (4:5), Reels & Stories (9:16) o formatos horizontales (16:9), optimizados para cada plataforma.
          </p>

          <ServiceCTAButtons />

          <NextServiceLink to="/servicios/videos-ia" label="Espacios & Arquitectura" />
        </motion.div>
      </div>
    </section>
    <Footer />
  </div>
);

export default ImagenesIA;
