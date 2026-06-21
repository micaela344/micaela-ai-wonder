import { motion } from "framer-motion";

const ValueProp = () => {
  return (
    <section className="bg-background py-12 md:py-28 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[clamp(2rem,5.5vw,4rem)] leading-[1.15] tracking-tight">
            <span className="block font-bold" style={{ color: '#FFFFFF' }}>
              De tu foto de móvil a
            </span>
            <span
              className="block font-light"
              style={{
                color: '#FFFFFF',
                textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)',
              }}
            >
              campaña profesional.
            </span>
          </h2>
          <p className="mt-5 text-sm md:text-base font-sans font-light" style={{ color: '#888888' }}>
            Envíanos cualquier imagen de referencia. Nosotros la convertimos en una fotografía profesional.
          </p>
          <a
            href="https://wa.me/34663474019?text=¡Hola!%20Me%20interesa%20saber%20más%20sobre%20sus%20servicios%2C%20¿me%20pueden%20ayudar%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 rounded-full bg-background text-foreground border-[1.5px] border-white px-8 py-3 text-base font-medium shadow-[0_0_15px_rgba(255,255,255,0.3),0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5),0_0_40px_rgba(255,255,255,0.25)] transition-all duration-300"
          >
            Contáctanos
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProp;
