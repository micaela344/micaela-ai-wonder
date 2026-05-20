import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";
import fotoMica from "@/assets/about-me.png";

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
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-md rounded-2xl overflow-hidden">
              <img src={fotoMica} alt="Micaela - MIC AI Studio" className="w-full h-auto object-contain" />
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/micaistudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 1.75 20.4 20.4" fill="currentColor" className="text-foreground">
                  <path d="M10.2 5.55c-2.56 0-4.65 2.09-4.65 4.65s2.09 4.65 4.65 4.65 4.65-2.09 4.65-4.65-2.09-4.65-4.65-4.65zm0 7.65c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                  <circle cx="14.85" cy="5.55" r="1.1"/>
                  <path d="M16.5 1.75H3.9C2.58 1.75 1.5 2.83 1.5 4.15v12.6c0 1.32 1.08 2.4 2.4 2.4h12.6c1.32 0 2.4-1.08 2.4-2.4V4.15c0-1.32-1.08-2.4-2.4-2.4zM18.6 16.75c0 1.16-.94 2.1-2.1 2.1H3.9c-1.16 0-2.1-.94-2.1-2.1V4.15c0-1.16.94-2.1 2.1-2.1h12.6c1.16 0 2.1.94 2.1 2.1v12.6z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/34663474019"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 2.159 12.893-2.947 12.893-9.494 0-2.53-.986-4.912-2.808-6.732"/>
                </svg>
              </a>
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
