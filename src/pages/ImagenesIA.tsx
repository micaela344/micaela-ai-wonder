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
import ambiente1 from "@/assets/ambientes/ambiente-1.png.asset.json";
import ambiente2 from "@/assets/ambientes/ambiente-2.png.asset.json";
import ambiente3 from "@/assets/ambientes/ambiente-3.png.asset.json";
import ambiente4 from "@/assets/ambientes/ambiente-4.png.asset.json";
import ambiente5 from "@/assets/ambientes/ambiente-5.png.asset.json";
import ambiente6 from "@/assets/ambientes/ambiente-6.png.asset.json";
import ServiceCTAButtons from "@/components/ServiceCTAButtons";
import NextServiceLink from "@/components/NextServiceLink";

const productoImages = [productoIA1, productoIA2, productoIA3, productoIA4];
const beautyImages = [beautyIA1, beautyIA2, beautyIA3, beautyIA4];
const personasImages = [persona1, persona2, persona3, persona4];
const ambienteResultados = [
  { src: ambiente1.url, alt: "Decoración de ambiente 1" },
  { src: ambiente2.url, alt: "Decoración de ambiente 2" },
  { src: ambiente3.url, alt: "Decoración de ambiente 3" },
  { src: ambiente4.url, alt: "Decoración de ambiente 4" },
  { src: ambiente5.url, alt: "Decoración de ambiente 5" },
  { src: ambiente6.url, alt: "Decoración de ambiente 6" },
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Imágenes de producto con IA</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-12">
            Creamos fotografías hiperrealistas y arte digital utilizando los modelos de inteligencia artificial más avanzados del mercado.
          </p>

          {/* Sección: Imágenes */}
          <div className="border-t border-border/60 pt-12 mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Imágenes</h2>
            <p className="text-muted-foreground text-base md:text-lg font-light max-w-2xl mb-10">
              Fotografía de producto, moda y belleza con calidad de estudio
            </p>
            {/* Espacio para imágenes — se añadirán manualmente */}
            <div className="min-h-[120px]" />
          </div>

          {/* Sección: Animaciones */}
          <div className="border-t border-border/60 pt-12 mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Animaciones</h2>
            <p className="text-muted-foreground text-base md:text-lg font-light max-w-2xl mb-10">
              Vídeos cortos de 5 a 15 segundos listos para redes sociales
            </p>
            {/* Espacio para vídeos — se añadirán manualmente */}
            <div className="min-h-[120px]" />
          </div>

          {/* Sección: Campañas */}
          <div className="border-t border-border/60 pt-12 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Campañas</h2>
            <p className="text-muted-foreground text-base md:text-lg font-light max-w-2xl mb-10">
              Del brief al resultado final — así se ve una campaña completa con IA
            </p>
            {/* Espacio para contenido de campaña — se añadirá manualmente */}
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
