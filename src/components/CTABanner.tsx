import { motion } from "framer-motion";

const CTABanner = () => {
  const handleHablemos = () => {
    const event = new CustomEvent("open-chat");
    window.dispatchEvent(event);
  };

  return (
    <section className="pt-10 md:pt-12 pb-24 md:pb-32 px-6" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h2
            className="font-sans tracking-tight leading-[1.1]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
              fontWeight: 300,
              color: '#F5F5F0',
            }}
          >
            Tu próxima campaña, lista en{" "}
            <span style={{ fontWeight: 700, color: '#FFFFFF' }}>3-7 días</span>.
          </h2>

          <p
            className="font-sans font-light"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: '#888888',
            }}
          >
            Sin fotógrafo. Sin agencia. Con criterio.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <a
              href="#planes"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-medium rounded-full transition-all"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1.5px solid #FFFFFF',
                boxShadow: '0 0 15px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.15)',
              }}
            >
              Ver planes
            </a>
            <button
              onClick={() => {
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-medium rounded-full border border-[#333333] text-foreground hover:bg-[#141414] transition-all"
            >
              Contactar
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;