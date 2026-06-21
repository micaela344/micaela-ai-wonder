import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Instagram } from "lucide-react";
import { EMAIL_ERROR, isValidEmail, isValidPhone, countPhoneDigits } from "@/lib/formValidation";
import { PhoneInput, useDefaultCountry } from "@/components/PhoneInput";
import { useContactForm } from "@/hooks/useContactForm";
import { saveToContacts } from "@/lib/my-supabase";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [country, setCountry] = useDefaultCountry();
  const { submitContact } = useContactForm();
  const [form, setForm] = useState({
    nombre: "",
    compania: "",
    email: "",
    phone: "",
    servicio: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showErrors, setShowErrors] = useState(false);

  const nombreRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.nombre.trim()) e.nombre = "Este campo es obligatorio";
    if (!form.email.trim()) e.email = "Este campo es obligatorio";
    else if (!isValidEmail(form.email)) e.email = EMAIL_ERROR;
    if (!form.message.trim()) e.message = "Este campo es obligatorio";
    if (form.phone.trim() && !isValidPhone(form.phone)) e.phone = "El número de teléfono es demasiado corto";
    return e;
  }, [form]);

  const formValid = Object.keys(errors).length === 0;
  const emailValid = isValidEmail(form.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    if (!formValid) {
      const target = errors.nombre ? nombreRef.current : errors.email ? emailRef.current : errors.message ? messageRef.current : null;
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      target?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const phone = form.phone.trim() ? `${country.dial} ${form.phone.trim()}` : undefined;
      const message = [form.servicio ? `Servicio: ${form.servicio}` : "", form.message].filter(Boolean).join(" — ");
      await submitContact({
        name: form.nombre.trim(),
        email: form.email,
        company: form.compania.trim() || undefined,
        phone,
        message,
      });
      saveToContacts({
        name: form.nombre.trim(),
        email: form.email.trim().toLowerCase(),
        company: form.compania.trim() || undefined,
        message,
        source: "contact_form",
      });
      try {
        await supabase.functions.invoke("send-email", {
          body: { type: "contact", to: form.email.trim().toLowerCase(), name: form.nombre.trim() },
        });
      } catch (mailErr) {
        console.warn("[Contact] email send failed", mailErr);
      }
    } catch (err) {
      console.warn("[Contact] silent fallback", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const shouldShow = (k: string) => (showErrors || touched[k]) && errors[k];
  const baseInput = "w-full px-4 py-3 text-sm bg-card border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all";
  const inputCls = (k: string) => `${baseInput} ${shouldShow(k) ? "border-red-500" : "border-border"}`;

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
          <div className="flex items-center justify-center gap-3 mb-4">
            <a
              href="https://wa.me/34663474019?text=¡Hola!%20Me%20interesa%20saber%20más%20sobre%20sus%20servicios%2C%20¿me%20pueden%20ayudar%3F"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp +34 663 474 019"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.554-5.338 11.89-11.893 11.89a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/micaistudio/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de MIC AI Studio"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>
          <p className="text-muted-foreground">
            Completa el formulario y recibe tu respuesta en menos de 24 horas
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
            noValidate
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <input
                  ref={nombreRef}
                  type="text"
                  placeholder="Nombre completo *"
                  maxLength={120}
                  value={form.nombre}
                  onChange={update("nombre")}
                  onBlur={() => setTouched((p) => ({ ...p, nombre: true }))}
                  className={inputCls("nombre")}
                />
                {shouldShow("nombre") && <p className="mt-1 text-xs text-red-400">{errors.nombre}</p>}
              </div>
              <input
                type="text"
                placeholder="Empresa / Marca"
                maxLength={120}
                value={form.compania}
                onChange={update("compania")}
                className={inputCls("compania")}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="relative">
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Email *"
                  maxLength={200}
                  value={form.email}
                  onChange={update("email")}
                  onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                  className={`${inputCls("email")} ${emailValid ? "pr-10" : ""}`}
                />
                {emailValid && (
                  <Check size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                )}
                {shouldShow("email") && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
              <div>
                <PhoneInput
                  country={country}
                  onCountryChange={setCountry}
                  value={form.phone}
                  onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
                  error={shouldShow("phone") ? errors.phone : null}
                />
              </div>
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
            <div>
              <textarea
                ref={messageRef}
                placeholder="Mensaje o descripción del proyecto *"
                rows={4}
                maxLength={2000}
                value={form.message}
                onChange={update("message")}
                onBlur={() => setTouched((p) => ({ ...p, message: true }))}
                className={`${inputCls("message")} resize-none`}
              />
              {shouldShow("message") && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting || !formValid}
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-base font-semibold rounded-full bg-black text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
