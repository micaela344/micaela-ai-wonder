import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const clients = [
  "COMPARTIR ESPACIOS", "NOVA STUDIO", "ARTISAN CO", "MERIDIAN", "VANGUARD",
  "LUMIÈRE", "APEX BRANDS", "ZENITH", "FORMA", "ECLAT", "PRISM", "ONYX GROUP"
];

const ClientLogos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 overflow-hidden">
      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="site-logo-lock text-center text-muted-foreground text-sm uppercase tracking-widest mb-12 px-6"
      >
        Marcas que confían en MIC AI Studio
      </motion.p>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="flex items-center gap-16 animate-marquee-left whitespace-nowrap">
            {[...clients, ...clients].map((name, i) => (
              <span
                key={i}
                className="font-semibold text-xl md:text-2xl tracking-[0.15em] select-none flex-shrink-0"
                style={{
                  color: '#FFFFFF',
                  textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
