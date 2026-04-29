import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import portfolioObjeto from "@/assets/portfolio-objeto.png";
import portfolioEspacio from "@/assets/portfolio-espacio.png";
import portfolioModelo from "@/assets/portfolio-modelo.png";
import portfolioDetalle from "@/assets/portfolio-detalle.png";
import portfolioAngulo from "@/assets/portfolio-angulo.png";
import portfolioEditorial from "@/assets/portfolio-editorial.png";

const ingredients = [
  { src: portfolioObjeto, caption: "Objeto" },
  { src: portfolioEspacio, caption: "Espacio" },
  { src: portfolioModelo, caption: "Modelo" },
];

const results = [
  { src: portfolioDetalle, caption: "Detalle" },
  { src: portfolioAngulo, caption: "Ángulo" },
  { src: portfolioEditorial, caption: "Editorial" },
];

const Portfolio = () => {
  return (
    <section id="resultados" className="pt-6 md:pt-12 pb-12 md:pb-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-6xl tracking-tight mb-4 text-center text-foreground"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 400, letterSpacing: '-0.02em' }}
        >
          Producción visual{" "}
          <span
            style={{
              fontWeight: 600,
              color: '#FFFFFF',
              textShadow: '0 0 12px rgba(255,255,255,0.85), 0 0 28px rgba(255,255,255,0.55), 0 0 48px rgba(255,255,255,0.3)',
            }}
          >
            sin límites
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center text-sm md:text-base tracking-widest uppercase mb-10 md:mb-16"
          style={{ color: "#888888" }}
        >
          De los ingredientes al resultado final
        </motion.p>

        {/* Ingredients row */}
        <div className="grid grid-cols-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-1 md:gap-2 items-center mb-10 max-w-4xl mx-auto">
          {ingredients.map((item, i) => (
            <>
              <motion.div
                key={item.caption}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-lg relative ring-1 ring-white/5 group-hover:ring-white/20 transition-all duration-500">
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p
                  className="mt-3 text-xs md:text-sm tracking-[0.2em] uppercase text-center transition-colors duration-300 group-hover:text-white"
                  style={{ color: "#888888" }}
                >
                  {item.caption}
                </p>
              </motion.div>
              {i < ingredients.length - 1 && (
                <motion.div
                  key={`plus-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                  className="hidden md:flex items-center justify-center"
                >
                  <span
                    className="text-3xl md:text-4xl font-light animate-pulse"
                    style={{ color: "#EEEEEE", fontFamily: "'Playfair Display', serif" }}
                  >
                    +
                  </span>
                </motion.div>
              )}
            </>
          ))}
        </div>

        {/* Arrow divider */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center gap-3 mb-10 origin-top"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-white/60" />
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2"
          >
            <span
              className="text-xs md:text-sm tracking-[0.3em] uppercase"
              style={{ color: "#EEEEEE" }}
            >
              Resultado
            </span>
            <ArrowRight className="w-4 h-4 rotate-90" style={{ color: "#EEEEEE" }} />
          </motion.div>
        </motion.div>

        {/* Results row */}
        <div className="grid grid-cols-3 gap-1 md:gap-2 max-w-5xl mx-auto">
          {results.map((item, i) => (
            <motion.div
              key={item.caption}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.06, zIndex: 10 }}
              className="cursor-pointer overflow-hidden relative rounded-md ring-1 ring-white/5 hover:ring-white/30 transition-all duration-500 group"
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full aspect-[4/5] object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p
                className="absolute bottom-4 left-0 right-0 text-center text-xs md:text-sm tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0"
                style={{ color: "#FFFFFF" }}
              >
                {item.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Ver más button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link
            to="/produccion-visual/ejemplos"
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-sm md:text-base tracking-[0.2em] uppercase text-foreground hover:bg-white hover:text-background transition-all duration-500"
          >
            Ver más
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
