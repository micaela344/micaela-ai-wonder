import { motion } from "framer-motion";
import { Info } from "lucide-react";

const CTABanner = () => {
  const handleHablemos = () => {
    const event = new CustomEvent("open-chat");
    window.dispatchEvent(event);
  };

  return (
    <section className="pt-8 md:pt-12 pb-12 md:pb-32 px-6" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-[#222222] p-8 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center"
        >
          {/* Izquierda: titular */}
          <h2
            className="font-sans tracking-tight leading-[1.1] text-center md:text-left"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
              fontWeight: 300,
              color: '#F5F5F0',
            }}
          >
            <span className="inline-flex flex-col items-center md:items-start gap-1">
              <span>Tu próxima campaña</span>
              <span className="inline-flex items-center gap-2">
                <span>lista en <span style={{ fontWeight: 700, color: '#FFFFFF' }}>3-7 días</span>.</span>
                <a
                  href="#faq-entrega"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = "faq-entrega";
                    setTimeout(() => {
                      document.getElementById("faq-entrega")?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }, 50);
                  }}
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-white/30 text-white/60 hover:text-white hover:border-white/60 transition-all shrink-0"
                  aria-label="Más información sobre tiempos de entrega"
                  title="Más información sobre tiempos de entrega"
                >
                  <Info size={14} />
                </a>
              </span>
            </span>
          </h2>

          {/* Derecha: subtítulo + botones */}
          <div className="space-y-6 text-center md:text-right">
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

            <div className="flex items-center justify-center md:justify-end gap-4 pt-2">
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
          </div>
        </motion.div>
      </div>
    </section>

  );
};

export default CTABanner;