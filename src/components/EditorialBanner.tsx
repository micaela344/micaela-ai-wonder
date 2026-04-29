import { motion } from "framer-motion";

const EditorialBanner = () => {
  return (
    <section className="bg-[#0A0A0A] pt-8 md:pt-12 pb-12 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 md:space-y-4"
        >
          <div className="space-y-4 md:space-y-6">
            <h2 
              className="font-sans font-light leading-[1.1] tracking-tight block"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                color: '#F5F5F0'
              }}
            >
              Crea tus fotos de{" "}
              <span style={{ 
                color: '#FFFFFF',
                textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)'
              }}>campaña</span>.
            </h2>
            
            <h2 
              className="font-sans font-light leading-[1.1] tracking-tight block"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                color: '#F5F5F0'
              }}
            >
              Crea tus fotos de{" "}
              <span style={{ 
                color: '#FFFFFF',
                textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)'
              }}>catálogo</span>.
            </h2>
            
            <h2 
              className="font-sans font-light leading-[1.1] tracking-tight block"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                color: '#F5F5F0'
              }}
            >
              Anima tus{" "}
              <span style={{ 
                color: '#FFFFFF',
                textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)'
              }}>anuncios</span>.
            </h2>
          </div>
          
          <motion.p 
            className="font-sans font-light pt-6 md:pt-8"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
              color: '#888888'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Y mucho más.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default EditorialBanner;
