import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import fotoMica from "@/assets/foto_mica.png";

const AboutMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre-mi" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center"
        >
          {/* Photo */}
          <div className="flex justify-center md:justify-center">
            <div className="w-72 h-96 md:w-80 md:h-[28rem] rounded-2xl overflow-hidden">
              <img src={fotoMica} alt="Micaela - MIC AI Studio" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl tracking-tight mb-6">
              <span style={{ fontWeight: 300, color: '#666666' }}>Hola, soy </span>
              <span style={{ fontWeight: 800, color: '#ffffff' }}>Micaela.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Soy directora de arte y fundadora de MIC AI Studio. Llevo 2 años trabajando en el mundo creativo, con experiencia en agencias y produciendo contenido para distintas marcas.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Creé MIC AI Studio porque vi de cerca cómo las marcas perdían oportunidades por no tener contenido visual a la altura — y supe que podía resolverlo de otra manera.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Combino inteligencia artificial generativa con dirección de arte humana para producir contenido visual y audiovisual con propósito estratégico. No solo rápido — sino coherente, intencional y orientado a resultados reales.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
