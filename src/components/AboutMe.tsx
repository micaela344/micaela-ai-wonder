import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import fotoMica from "@/assets/foto_mica.png";

const AboutMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre-mi" className="pt-8 md:pt-12 pb-12 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center"
        >
          {/* Photo */}
          <div className="flex justify-center md:justify-center">
            <div className="w-full max-w-md rounded-2xl overflow-hidden">
              <img src={fotoMica} alt="Micaela - MIC AI Studio" className="w-full h-auto object-contain" />
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl tracking-tight mb-6">
              <span style={{ fontWeight: 300, color: '#666666' }}>Hola, soy </span>
              <span style={{ fontWeight: 800, color: '#ffffff' }}>Micaela.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <span style={{ color: '#FFFFFF', fontWeight: 500, textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)' }}>Directora creativa</span> y fundadora de MIC AI Studio.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Trabajo creando <span style={{ color: '#FFFFFF', fontWeight: 500, textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)' }}>contenido visual y campañas</span> para marcas utilizando <span style={{ color: '#FFFFFF', fontWeight: 500, textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)' }}>IA generativa</span>, combinando dirección de arte con nuevas herramientas para producir de forma más ágil, pero con criterio.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Creé MIC AI Studio al ver cómo muchas marcas invertían tiempo y dinero en contenido poco eficiente, cuando con IA es posible crear más <span style={{ color: '#FFFFFF', fontWeight: 500, textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)' }}>rápido, escalar mejor</span> y elevar la creatividad.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hoy ayudo a marcas a construir sistemas visuales que no solo se ven bien, sino que <span style={{ color: '#FFFFFF', fontWeight: 500, textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)' }}>comunican, posicionan y venden</span>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Trabajo con marcas de producto, e-commerce y proyectos que entienden el valor de la imagen en su crecimiento.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              No se trata solo de generar contenido.<br />
              Se trata de construir un <span style={{ color: '#FFFFFF', fontWeight: 500, textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)' }}>universo visual coherente</span> y escalable para marcas.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
