import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="pt-8 md:pt-12 pb-12 md:pb-32">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl tracking-tight mb-4">
            <span style={{ fontWeight: 300, color: '#666666' }}>¿Listo para </span>
            <span style={{ fontWeight: 800, color: '#ffffff' }}>crear algo increíble?</span>
          </h2>
          <p className="text-muted-foreground">
            Completa el formulario y recibe tu propuesta en menos de 24 horas
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <p className="text-foreground text-xl font-semibold mb-2">¡Mensaje enviado!</p>
            <p className="text-muted-foreground">Te contactaremos en menos de 24 horas.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Nombre completo"
                required
                className="w-full px-4 py-3 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
              />
              <input
                type="text"
                placeholder="Empresa / Marca"
                className="w-full px-4 py-3 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
            />
            <select
              required
              className="w-full px-4 py-3 text-sm bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all appearance-none"
              defaultValue=""
            >
              <option value="" disabled className="text-muted-foreground">
                Servicio que necesitas
              </option>
              <option value="imagenes">Imágenes IA</option>
              <option value="videos">Videos IA</option>
              <option value="campana">Campaña</option>
              <option value="branding">Branding</option>
              <option value="otro">Otro</option>
            </select>
            <textarea
              placeholder="Mensaje o descripción del proyecto"
              rows={4}
              className="w-full px-4 py-3 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all resize-none"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-base font-semibold rounded-full bg-black text-white transition-all duration-300"
                style={{ border: '1.5px solid #FFFFFF', boxShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)' }}
              >
                Enviar
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default Contact;
