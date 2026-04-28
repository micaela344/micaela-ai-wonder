import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(0_0%_8%)_0%,_hsl(0_0%_4%)_70%)]" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-muted/20 blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-muted/10 blur-[100px]"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-block px-5 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white text-xs sm:text-sm font-normal font-sans tracking-wide">
            Desde 250€. Entrega en 3-7 días.
          </span>
        </motion.div>
        <motion.h1
          className="text-[clamp(1.6rem,5vw,4.8rem)] tracking-tight leading-[1.15] text-center md:whitespace-nowrap [&>span]:leading-[1.15] [&>span]:m-0 [&>span]:p-0"
          
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span style={{ fontWeight: 300, color: '#666666' }}>Creatividad </span>
            <span style={{ fontWeight: 800, color: '#ffffff' }}>con propósito,</span>
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <span style={{ fontWeight: 300, color: '#666666' }}>Estrategia </span>
            <span style={{ fontWeight: 800, color: '#ffffff' }}>con criterio,</span>
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            <span style={{ fontWeight: 300, color: '#666666' }}>Resultados </span>
            <span style={{ fontWeight: 800, color: '#ffffff' }}>que venden.</span>
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2"
        >
          Fotografía de producto, imágenes y campañas generadas con IA para pymes, ecommerce y agencias que quieren destacar
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.9 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#servicios"
            className="inline-flex items-center justify-center min-h-[48px] px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-full bg-black text-white tracking-wide transition-all duration-300"
            style={{ border: '1.5px solid #FFFFFF', boxShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)' }}
          >
            Ver nuestros servicios
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-muted-foreground" size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;
