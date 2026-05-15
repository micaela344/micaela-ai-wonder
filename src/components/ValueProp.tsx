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
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl sm:text-2xl md:text-[22px] leading-[1.3] tracking-tight">
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
              shooting profesional.
            </span>
          </h2>
          <p className="mt-5 text-base md:text-lg font-sans font-light" style={{ color: '#888888' }}>
            Envíanos cualquier imagen de referencia. Nosotros la convertimos en una fotografía profesional.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProp;
