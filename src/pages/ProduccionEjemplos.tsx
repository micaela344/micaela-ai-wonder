import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Placeholder examples — reusing existing portfolio assets until new ones are uploaded
import portfolioObjeto from "@/assets/portfolio-objeto.png";
import portfolioEspacio from "@/assets/portfolio-espacio.png";
import portfolioModelo from "@/assets/portfolio-modelo.png";
import portfolioDetalle from "@/assets/portfolio-detalle.png";
import portfolioAngulo from "@/assets/portfolio-angulo.png";
import portfolioEditorial from "@/assets/portfolio-editorial.png";

const examples = [
  { src: portfolioObjeto, caption: "Objeto" },
  { src: portfolioEspacio, caption: "Espacio" },
  { src: portfolioModelo, caption: "Modelo" },
  { src: portfolioDetalle, caption: "Detalle" },
  { src: portfolioAngulo, caption: "Ángulo" },
  { src: portfolioEditorial, caption: "Editorial" },
];

const ProduccionEjemplos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link
            to="/#resultados"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-6xl tracking-tight mb-4 text-center text-foreground"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Más{" "}
            <span
              style={{
                fontWeight: 600,
                color: "#FFFFFF",
                textShadow:
                  "0 0 12px rgba(255,255,255,0.85), 0 0 28px rgba(255,255,255,0.55), 0 0 48px rgba(255,255,255,0.3)",
              }}
            >
              ejemplos
            </span>
          </motion.h1>
          <p
            className="text-center text-sm md:text-base tracking-widest uppercase mb-16"
            style={{ color: "#888888" }}
          >
            Producción visual sin límites
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 max-w-6xl mx-auto">
            {examples.map((item, i) => (
              <motion.div
                key={`${item.caption}-${i}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: "easeOut" }}
                className="overflow-hidden rounded-md ring-1 ring-white/5 hover:ring-white/30 transition-all duration-500 group"
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProduccionEjemplos;
