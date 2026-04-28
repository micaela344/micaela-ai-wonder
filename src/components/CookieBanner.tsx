import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "cookie-consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const setConsent = (value: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, value);
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[9998] px-4 pb-4 md:px-6 md:pb-6"
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de cookies"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="flex-1">
                <h2 className="text-foreground text-base font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                  Usamos cookies
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-heading)" }}>
                  Utilizamos cookies propias y de terceros para mejorar tu experiencia,
                  analizar el tráfico y personalizar el contenido. Puedes aceptarlas,
                  rechazarlas o conocer más en nuestra{" "}
                  <Link
                    to="/politica-de-cookies"
                    className="underline text-foreground hover:opacity-80"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Política de Cookies
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
                <button
                  onClick={() => setConsent("rejected")}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all duration-300 cursor-pointer bg-transparent"
                >
                  Rechazar
                </button>
                <button
                  onClick={() => setConsent("accepted")}
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-full bg-black text-white transition-all duration-300 cursor-pointer"
                  style={{
                    border: "1.5px solid #FFFFFF",
                    boxShadow:
                      "0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)",
                  }}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
