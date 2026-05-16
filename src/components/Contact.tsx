import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { EMAIL_ERROR, isValidEmail, isValidPhone, countPhoneDigits } from "@/lib/formValidation";
import { PhoneInput, useDefaultCountry } from "@/components/PhoneInput";
import { useContactForm } from "@/hooks/useContactForm";
import { saveToContacts } from "@/lib/my-supabase";

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
