import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  nombre: z.string().trim().min(1, "Nombre requerido").max(120),
  email: z.string().trim().toLowerCase().email("Email inválido").max(200),
  compania: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  servicio: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    compania: "",
    email: "",
    phone: "",
    servicio: "",
    message: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revisa los datos");
      return;
    }
    setSubmitting(true);
    try {
      const v = parsed.data;
      const message = [v.servicio ? `Servicio: ${v.servicio}` : "", v.message].filter(Boolean).join(" — ");
      const { error: rpcError } = await supabase.rpc("upsert_contact", {
        p_email: v.email,
        p_nombre: v.nombre,
        p_compania: v.compania || null,
        p_phone: v.phone || null,
        p_plan_selected: null,
        p_message: message || null,
        p_source: "contact_form",
        p_payment_status: "contact_only",
      });
      if (rpcError) console.error("contact upsert failed", rpcError);
    } catch (err) {
      console.error("contact submit error", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
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
            <p className="text-foreground text-xl font-semibold mb-2">¡Mensaje recibido!</p>
            <p className="text-muted-foreground">Te contactamos en menos de 24 horas.</p>
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
                maxLength={120}
                value={form.nombre}
                onChange={update("nombre")}
                className="w-full px-4 py-3 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
              />
              <input
                type="text"
                placeholder="Empresa / Marca"
                maxLength={120}
                value={form.compania}
                onChange={update("compania")}
                className="w-full px-4 py-3 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="email"
                placeholder="Email"
                required
                maxLength={200}
                value={form.email}
                onChange={update("email")}
                className="w-full px-4 py-3 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
              />
              <input
                type="tel"
                placeholder="Teléfono (opcional)"
                maxLength={40}
                value={form.phone}
                onChange={update("phone")}
                className="w-full px-4 py-3 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
              />
            </div>
            <select
              value={form.servicio}
              onChange={update("servicio")}
              className="w-full px-4 py-3 text-sm bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all appearance-none"
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
              maxLength={2000}
              value={form.message}
              onChange={update("message")}
              className="w-full px-4 py-3 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all resize-none"
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-base font-semibold rounded-full bg-black text-white transition-all duration-300 disabled:opacity-60"
                style={{ border: '1.5px solid #FFFFFF', boxShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)' }}
              >
                {submitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default Contact;
