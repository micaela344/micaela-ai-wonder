import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aiImageCover from "@/assets/ai-image-cover.png";
import productoIA1 from "@/assets/producto-ia-1.png";
import productoIA2 from "@/assets/producto-ia-2.png";
import productoIA3 from "@/assets/producto-ia-3.png";
import productoIA4 from "@/assets/producto-ia-4.png";
import beautyIA1 from "@/assets/beauty-ia-1.png";
import beautyIA2 from "@/assets/beauty-ia-2.png";
import beautyIA3 from "@/assets/beauty-ia-3.png";
import beautyIA4 from "@/assets/beauty-ia-4.png";
import persona1 from "@/assets/persona-1.png";
import persona2 from "@/assets/persona-2.png";
import persona3 from "@/assets/persona-3.png";
import persona4 from "@/assets/persona-4.png";
import ambienteVacio from "@/assets/ambiente-vacio.png";
import ambienteEscandinavo from "@/assets/ambiente-escandinavo.png";
import ambienteColorido from "@/assets/ambiente-colorido.png";
import ambienteBoho from "@/assets/ambiente-boho.png";
import ambienteNatural from "@/assets/ambiente-natural.png";
import ambienteMediterraneo from "@/assets/ambiente-mediterraneo.png";
import ambienteIndustrial from "@/assets/ambiente-industrial.png";
import ServiceCTAButtons from "@/components/ServiceCTAButtons";
import NextServiceLink from "@/components/NextServiceLink";

const productoImages = [productoIA1, productoIA2, productoIA3, productoIA4];
const beautyImages = [beautyIA1, beautyIA2, beautyIA3, beautyIA4];
const personasImages = [persona1, persona2, persona3, persona4];
const ambienteResultados = [
  { src: ambienteEscandinavo, alt: "Decoración escandinava minimalista" },
  { src: ambienteBoho, alt: "Decoración boho con texturas naturales" },
  { src: ambienteNatural, alt: "Decoración natural con plantas" },
  { src: ambienteColorido, alt: "Decoración colorida y vibrante" },
  { src: ambienteMediterraneo, alt: "Decoración mediterránea luminosa" },
  { src: ambienteIndustrial, alt: "Decoración industrial loft" },
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

          <h2 className="text-2xl font-semibold text-foreground mb-6">Productos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {productoImages.map((img, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-border aspect-square">
                <img src={img} alt={`Producto IA ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {beautyImages.map((img, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-border aspect-square">
                <img src={img} alt={`Beauty IA ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold text-foreground mb-6">Personas Hiperrealistas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {personasImages.map((img, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-border aspect-square">
                <img src={img} alt={`Persona hiperrealista ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold text-foreground mb-6">Decoración de ambientes</h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-3xl mb-6">
            Partimos de un espacio vacío y generamos múltiples propuestas de decoración con distintos estilos, manteniendo la arquitectura original intacta.
          </p>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-3">Espacio original</p>
            <div className="rounded-lg overflow-hidden border border-border max-w-2xl">
              <img src={ambienteVacio} alt="Espacio vacío original" className="w-full h-auto object-cover" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-3">Resultados</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
            {ambienteResultados.map((img, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-border">
                <img src={img.src} alt={img.alt} className="w-full h-auto object-cover aspect-[4/3]" />
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-12">
            Adaptamos cada pieza al formato que tu marca necesita: Feed (4:5), Reels & Stories (9:16) o formatos horizontales (16:9), optimizados para cada plataforma.
          </p>

          <ServiceCTAButtons />

          <NextServiceLink to="/servicios/videos-ia" label="Ver Animaciones/Shorts" />

        </motion.div>
      </div>
    </section>
    <Footer />
  </div>
);

export default ImagenesIA;
