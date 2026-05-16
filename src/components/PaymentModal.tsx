import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, CheckCircle, ArrowRight, ArrowLeft, Camera, Megaphone, Palette, Video, Layers, Check } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";
import { isValidEmail, EMAIL_ERROR, isValidPhone, Country } from "@/lib/formValidation";
import { PhoneInput, useDefaultCountry } from "@/components/PhoneInput";

const saveContact = async (payload: {
  email: string;
  nombre?: string;
  compania?: string;
  phone?: string;
  plan_selected?: string;
  message?: string;
  source?: string;
  payment_status?: string;
}) => {
  const email = payload.email.trim().toLowerCase();
  if (!isValidEmail(email)) return;
  try {
    const { error } = await supabase.rpc("upsert_contact", {
      p_email: email,
      p_nombre: payload.nombre?.trim() || null,
      p_compania: payload.compania?.trim() || null,
      p_phone: payload.phone?.trim() || null,
      p_plan_selected: payload.plan_selected?.trim() || null,
      p_message: payload.message?.trim() || null,
      p_source: payload.source || "plan_form",
      p_payment_status: payload.payment_status || null,
    });
    if (error) console.error("contact save error", error);
  } catch (e) {
    console.error("contact save threw", e);
  }
};

const stripePromise = loadStripe("pk_test_51TEDFIC1QQPOr4ssWrWvdlkMcoPTCFeumI4Dwnw6ZNCZZN5XCutH5ib9o69wZApQfqlqwuhrLObFNsTFRijLyHQU00eWDjXqfZ");

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemPrice: string;
}

const serviceTypes = [
  { id: "foto", label: "Fotografía de producto", icon: Camera },
  { id: "campana", label: "Campaña publicitaria", icon: Megaphone },
  { id: "identidad", label: "Identidad visual", icon: Palette },
  { id: "video", label: "Video para redes", icon: Video },
  { id: "pack", label: "Pack completo", icon: Layers },
];

const planOptions = ["Starter", "Pro", "Studio"];
const sectorOptions = ["Moda", "Cosmética", "Alimentación", "Tecnología", "Otro"];
const teamSizes = ["1-5", "6-20", "21-50", "+50"];
const deadlineOptions = ["Menos de 1 semana", "2 semanas", "1 mes", "Sin prisa"];

const stepLabels = ["Servicio", "Tu marca", "Objetivos", "Contacto", "Pago"];

const inputClass = "w-full px-4 py-2.5 rounded-lg border border-[#222] bg-[#111] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#444] transition-colors";
const labelClass = "text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block";

const ProgressBar = ({ step, total }: { step: number; total: number }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-2">
      {stepLabels.map((label, i) => (
        <div key={label} className="flex flex-col items-center flex-1">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
              i <= step
                ? "bg-foreground text-background"
                : "border border-[#333] text-muted-foreground"
            }`}
          >
            {i + 1}
          </div>
          <span className={`text-[10px] mt-1 ${i <= step ? "text-foreground" : "text-muted-foreground/50"}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
    <div className="h-0.5 bg-[#1a1a1a] rounded-full mt-2">
      <div
        className="h-full bg-foreground rounded-full transition-all duration-500"
        style={{ width: `${((step + 1) / total) * 100}%` }}
      />
    </div>
  </div>
);

const SelectionChip = ({
  label,
  selected,
  onClick,
  icon: Icon,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ComponentType<any>;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all border ${
      selected
        ? "border-foreground bg-foreground/10 text-foreground"
        : "border-[#222] bg-[#111] text-muted-foreground hover:border-[#444]"
    }`}
  >
    {Icon && <Icon size={16} />}
    {label}
  </button>
);

// Step 1
const Step1 = ({
  data,
  onChange,
}: {
  data: { service: string; plan: string };
  onChange: (d: Partial<typeof data>) => void;
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-foreground text-lg font-semibold mb-1">¿Qué necesitas?</h3>
      <p className="text-muted-foreground text-sm mb-4">Selecciona el tipo de servicio que buscas</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {serviceTypes.map((s) => (
          <SelectionChip
            key={s.id}
            label={s.label}
            icon={s.icon}
            selected={data.service === s.id}
            onClick={() => onChange({ service: s.id })}
          />
        ))}
      </div>
    </div>
    <div>
      <label className={labelClass}>Plan elegido</label>
      <div className="flex gap-2">
        {planOptions.map((p) => (
          <SelectionChip key={p} label={p} selected={data.plan === p} onClick={() => onChange({ plan: p })} />
        ))}
      </div>
    </div>
  </div>
);

// Step 2
const Step2 = ({
  data,
  onChange,
}: {
  data: { company: string; hasWeb: boolean; webUrl: string; sector: string; teamSize: string };
  onChange: (d: Partial<typeof data>) => void;
}) => (
  <div className="space-y-5">
    <h3 className="text-foreground text-lg font-semibold mb-1">Cuéntanos sobre tu marca</h3>
    <div>
      <label className={labelClass}>¿Cuál es el nombre de tu empresa?</label>
      <input className={inputClass} value={data.company} onChange={(e) => onChange({ company: e.target.value })} placeholder="Tu empresa" />
    </div>
    <div>
      <label className={labelClass}>¿Tienes página web?</label>
      <div className="flex gap-2 mb-2">
        <SelectionChip label="Sí" selected={data.hasWeb} onClick={() => onChange({ hasWeb: true })} />
        <SelectionChip label="No" selected={!data.hasWeb} onClick={() => onChange({ hasWeb: false, webUrl: "" })} />
      </div>
      {data.hasWeb && (
        <input className={inputClass} value={data.webUrl} onChange={(e) => onChange({ webUrl: e.target.value })} placeholder="https://tuempresa.com" />
      )}
    </div>
    <div>
      <label className={labelClass}>¿En qué sector opera tu empresa?</label>
      <div className="flex flex-wrap gap-2">
        {sectorOptions.map((s) => {
          const isOtro = s === "Otro";
          const predefined = sectorOptions.filter((o) => o !== "Otro");
          const otroSelected = !!data.sector && !predefined.includes(data.sector);
          const selected = isOtro ? otroSelected : data.sector === s;
          return (
            <SelectionChip
              key={s}
              label={s}
              selected={selected}
              onClick={() => onChange({ sector: isOtro ? "Otro" : s })}
            />
          );
        })}
      </div>
      {(() => {
        const predefined = sectorOptions.filter((o) => o !== "Otro");
        const showInput = !!data.sector && !predefined.includes(data.sector);
        if (!showInput) return null;
        return (
          <input
            className={`${inputClass} mt-3`}
            value={data.sector === "Otro" ? "" : data.sector}
            onChange={(e) => onChange({ sector: e.target.value || "Otro" })}
            placeholder="Especifica tu sector"
            autoFocus
          />
        );
      })()}
    </div>
    <div>
      <label className={labelClass}>¿Cuántas personas forman tu equipo?</label>
      <div className="flex flex-wrap gap-2">
        {teamSizes.map((t) => (
          <SelectionChip key={t} label={t} selected={data.teamSize === t} onClick={() => onChange({ teamSize: t })} />
        ))}
      </div>
    </div>
  </div>
);

// Step 3
const Step3 = ({
  data,
  onChange,
}: {
  data: { expectations: string; references: string; deadline: string };
  onChange: (d: Partial<typeof data>) => void;
}) => (
  <div className="space-y-5">
    <h3 className="text-foreground text-lg font-semibold mb-1">¿Qué buscas conseguir?</h3>
    <div>
      <label className={labelClass}>¿Cuáles son tus expectativas con este proyecto?</label>
      <textarea
        className={`${inputClass} min-h-[80px] resize-none`}
        value={data.expectations}
        onChange={(e) => onChange({ expectations: e.target.value })}
        placeholder="Ej: Quiero renovar el catálogo de mi tienda online antes del verano..."
      />
    </div>
    <div>
      <label className={labelClass}>¿Tienes algún referente visual que te inspire?</label>
      <textarea
        className={`${inputClass} min-h-[60px] resize-none`}
        value={data.references}
        onChange={(e) => onChange({ references: e.target.value })}
        placeholder="Ej: Me gusta el estilo de @marca o esta URL..."
      />
    </div>
    <div>
      <label className={labelClass}>¿Cuándo necesitas tener el proyecto listo?</label>
      <div className="flex flex-wrap gap-2">
        {deadlineOptions.map((d) => (
          <SelectionChip key={d} label={d} selected={data.deadline === d} onClick={() => onChange({ deadline: d })} />
        ))}
      </div>
    </div>
  </div>
);

// Step 4
const Step4 = ({
  data,
  onChange,
  country,
  onCountryChange,
  showErrors,
}: {
  data: { name: string; email: string; phone: string };
  onChange: (d: Partial<typeof data>) => void;
  country: Country;
  onCountryChange: (c: Country) => void;
  showErrors: boolean;
}) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const emailValid = isValidEmail(data.email);
  const nameErr = !data.name.trim() ? "Este campo es obligatorio" : "";
  const emailErr = !data.email.trim()
    ? "Este campo es obligatorio"
    : !emailValid
    ? EMAIL_ERROR
    : "";
  const phoneErr = data.phone.trim() && !isValidPhone(data.phone) ? "El número de teléfono es demasiado corto" : "";

  const showName = (showErrors || touched.name) && nameErr;
  const showEmail = (showErrors || touched.email) && emailErr;
  const showPhone = (showErrors || touched.phone) && phoneErr;

  return (
    <div className="space-y-5">
      <h3 className="text-foreground text-lg font-semibold mb-1">Tus datos de contacto</h3>
      <div>
        <label className={labelClass}>Nombre completo *</label>
        <input
          className={`${inputClass} ${showName ? "border-red-500" : ""}`}
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          onBlur={() => setTouched((p) => ({ ...p, name: true }))}
          placeholder="Tu nombre"
        />
        {showName && <p className="mt-1 text-xs text-red-400">{nameErr}</p>}
      </div>
      <div>
        <label className={labelClass}>Email *</label>
        <div className="relative">
          <input
            className={`${inputClass} ${showEmail ? "border-red-500" : ""} ${emailValid ? "pr-10" : ""}`}
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            onBlur={() => setTouched((p) => ({ ...p, email: true }))}
            placeholder="tu@email.com"
          />
          {emailValid && (
            <Check size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
          )}
        </div>
        {showEmail && <p className="mt-1 text-xs text-red-400">{emailErr}</p>}
      </div>
      <div>
        <label className={labelClass}>Teléfono (opcional)</label>
        <div onBlur={() => setTouched((p) => ({ ...p, phone: true }))}>
          <PhoneInput
            country={country}
            onCountryChange={onCountryChange}
            value={data.phone}
            onChange={(v) => onChange({ phone: v })}
            error={showPhone ? phoneErr : null}
          />
        </div>
      </div>
    </div>
  );
};

// Stripe Payment Step
const cardElementOptions = {
  style: {
    base: {
      fontSize: "14px",
      color: "#F5F5F0",
      fontFamily: "Inter, sans-serif",
      "::placeholder": { color: "#555" },
    },
    invalid: { color: "#ef4444" },
  },
};

const PaymentStep = ({
  itemName,
  itemPrice,
  email,
  onSuccess,
  onPayLater,
  payLaterLoading,
}: {
  itemName: string;
  itemPrice: string;
  email: string;
  onSuccess: () => void;
  onPayLater: () => void;
  payLaterLoading: boolean;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError("");

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { email },
    });

    if (stripeError) {
      setError(stripeError.message ?? "Error al procesar el pago");
      setProcessing(false);
    } else {
      console.log("PaymentMethod created (test):", paymentMethod.id);
      setProcessing(false);
      onSuccess();
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-[#222] bg-[#111] p-5">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Resumen del pedido</p>
        <p className="text-foreground font-semibold">{itemName}</p>
        <p className="text-foreground text-lg font-bold">{itemPrice}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Tarjeta de crédito</label>
          <div className="px-4 py-3 rounded-lg border border-[#222] bg-[#111]">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full py-3 text-sm font-medium rounded-full bg-foreground text-background hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {processing ? "Procesando..." : "Confirmar y pagar"}
        </button>

        <div className="text-center pt-1">
          <button
            type="button"
            onClick={onPayLater}
            disabled={payLaterLoading}
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors disabled:opacity-50"
          >
            {payLaterLoading ? "Guardando..." : "¿Prefieres pagar más tarde? Guarda tu solicitud →"}
          </button>
        </div>
      </form>

      <p className="text-center text-[11px] text-muted-foreground/50">
        Modo test — no se procesará ningún cobro real
      </p>
    </div>
  );
};

const PaymentModal = ({ isOpen, onClose, itemName, itemPrice }: PaymentModalProps) => {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [payLater, setPayLater] = useState(false);
  const [payLaterLoading, setPayLaterLoading] = useState(false);

  const [step1, setStep1] = useState({ service: "", plan: "" });
  const [step2, setStep2] = useState({ company: "", hasWeb: false, webUrl: "", sector: "", teamSize: "" });
  const [step3, setStep3] = useState({ expectations: "", references: "", deadline: "" });
  const [step4, setStep4] = useState({ name: "", email: "", phone: "" });
  const [country, setCountry] = useDefaultCountry();
  const [showStep4Errors, setShowStep4Errors] = useState(false);

  const formattedPhone = step4.phone.trim() ? `${country.dial} ${step4.phone.trim()}` : "";

  // Debounced auto-save (800ms) on every relevant field change while modal is open
  const debounceRef = useRef<number | null>(null);
  useEffect(() => {
    if (!isOpen) return;
    if (!isValidEmail(step4.email)) return;
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      saveContact({
        email: step4.email,
        nombre: step4.name,
        compania: step2.company,
        phone: formattedPhone,
        plan_selected: step1.plan || itemName,
        source: "plan_form",
      });
    }, 800);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [isOpen, step4.email, step4.name, step4.phone, step2.company, step1.plan, itemName]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(0);
      setSuccess(false);
      setPayLater(false);
    }, 300);
  };

  const step4Valid =
    !!step4.name.trim() &&
    isValidEmail(step4.email) &&
    (!step4.phone.trim() || isValidPhone(step4.phone));

  const canNext = () => {
    if (step === 0) return step1.service && step1.plan;
    if (step === 1) return step2.company && step2.sector && step2.teamSize;
    if (step === 2) return step3.deadline;
    if (step === 3) return step4Valid;
    return true;
  };

  const handleNext = () => {
    if (step === 3 && !step4Valid) {
      setShowStep4Errors(true);
      return;
    }
    setStep(step + 1);
  };

  const totalSteps = 5;

  const handlePaymentSuccess = async () => {
    await saveContact({
      email: step4.email,
      nombre: step4.name,
      compania: step2.company,
      phone: formattedPhone,
      plan_selected: step1.plan || itemName,
      source: "plan_form",
      payment_status: "initiated",
    });
    setSuccess(true);
  };

  const handlePayLater = async () => {
    if (!isValidEmail(step4.email)) return;
    setPayLaterLoading(true);
    await saveContact({
      email: step4.email,
      nombre: step4.name,
      compania: step2.company,
      phone: formattedPhone,
      plan_selected: step1.plan || itemName,
      source: "plan_form",
      payment_status: "pay_later",
    });
    setPayLaterLoading(false);
    setPayLater(true);
    const planLabel = step1.plan || itemName;
    const msg = encodeURIComponent(`Hola, quiero reservar el plan ${planLabel} y pagar más tarde.`);
    window.open(`https://wa.me/34663474019?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#1a1a1a] bg-[#0A0A0A] p-8"
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X size={18} />
            </button>

            {payLater ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-foreground text-xl font-semibold mb-2">¡Listo!</h3>
                <p className="text-muted-foreground text-sm">
                  Guardamos tu solicitud. Te contactaremos para coordinar el pago cuando estés listo.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 px-6 py-2.5 text-sm font-medium rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
                >
                  Cerrar
                </button>
              </motion.div>
            ) : success ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-foreground text-xl font-semibold mb-2">¡Todo listo! 🎉</h3>
                <p className="text-muted-foreground text-sm mb-1">Te hemos enviado un email de confirmación.</p>
                <p className="text-muted-foreground text-sm">
                  Nos pondremos en contacto contigo en menos de 24h por llamada o email para comenzar tu proyecto.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 px-6 py-2.5 text-sm font-medium rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
                >
                  Cerrar
                </button>
              </motion.div>
            ) : (
              <>
                <ProgressBar step={step} total={totalSteps} />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step === 0 && <Step1 data={step1} onChange={(d) => setStep1((p) => ({ ...p, ...d }))} />}
                    {step === 1 && <Step2 data={step2} onChange={(d) => setStep2((p) => ({ ...p, ...d }))} />}
                    {step === 2 && <Step3 data={step3} onChange={(d) => setStep3((p) => ({ ...p, ...d }))} />}
                    {step === 3 && (
                      <Step4
                        data={step4}
                        onChange={(d) => setStep4((p) => ({ ...p, ...d }))}
                        country={country}
                        onCountryChange={setCountry}
                        showErrors={showStep4Errors}
                      />
                    )}
                    {step === 4 && (
                      <Elements stripe={stripePromise}>
                        <PaymentStep
                          itemName={itemName}
                          itemPrice={itemPrice}
                          email={step4.email}
                          onSuccess={handlePaymentSuccess}
                          onPayLater={handlePayLater}
                          payLaterLoading={payLaterLoading}
                        />
                      </Elements>
                    )}
                  </motion.div>
                </AnimatePresence>

                {step < 4 && (
                  <div className="flex items-center justify-between mt-8">
                    {step > 0 ? (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ArrowLeft size={14} /> Atrás
                      </button>
                    ) : (
                      <div />
                    )}
                    <button
                      onClick={() => setStep(step + 1)}
                      disabled={!canNext()}
                      className="flex items-center gap-1 px-6 py-2.5 text-sm font-medium rounded-full bg-foreground text-background hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {step === 3 ? "Ir al pago" : "Siguiente"} <ArrowRight size={14} />
                    </button>
                  </div>
                )}

                {step === 4 && (
                  <button
                    onClick={() => setStep(3)}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4"
                  >
                    <ArrowLeft size={14} /> Atrás
                  </button>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;