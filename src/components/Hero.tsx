import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-340px)] flex items-center justify-center overflow-hidden pt-32 md:pt-40 lg:pt-48 pb-12">
      {/* Subtle gradient background — animated blobs only on md+ to keep mobile scroll fluid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(0_0%_8%)_0%,_hsl(0_0%_4%)_70%)]" />
        <motion.div
          className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-muted/20 blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="hidden md:block absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-muted/10 blur-[100px]"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h1
          className="text-[clamp(1.6rem,5vw,4.8rem)] tracking-tight leading-[0.92] text-center md:whitespace-nowrap [&>span]:leading-[0.92] [&>span]:m-0 [&>span]:p-0"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ fontWeight: 800, color: '#ffffff', textShadow: '0 0 8px rgba(255,255,255,0.25), 0 0 16px rgba(255,255,255,0.12)' }}>Creatividad </span>
            <span style={{ fontWeight: 300, color: '#666666' }}>con propósito,</span>
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ fontWeight: 800, color: '#ffffff', textShadow: '0 0 8px rgba(255,255,255,0.25), 0 0 16px rgba(255,255,255,0.12)' }}>Estrategia </span>
            <span style={{ fontWeight: 300, color: '#666666' }}>con criterio,</span>
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.31, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ fontWeight: 800, color: '#ffffff', textShadow: '0 0 8px rgba(255,255,255,0.25), 0 0 16px rgba(255,255,255,0.12)' }}>Resultados </span>
            <span style={{ fontWeight: 300, color: '#666666' }}>que venden.</span>

          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2"
        >
          Creamos contenido visual y audiovisual con IA para transformar ideas en experiencias visuales memorables
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}

          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#servicios"
            className="group inline-flex items-center justify-center min-h-[48px] px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-full bg-black text-white tracking-wide transition-all duration-300"
            style={{ border: '1.5px solid #FFFFFF', boxShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)' }}
          >
            Ver nuestros servicios
            <motion.span
              className="ml-2 inline-flex"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </a>
        </motion.div>
      </div>

      {/* Bottom fade into the marquee strip below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-background z-10" />
    </section>
  );
};

export default Hero;
