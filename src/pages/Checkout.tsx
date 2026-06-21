import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Camera, Megaphone, Palette, Video, Layers, Check, CheckCircle, Plus, X, ShoppingBag } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";
import { isValidEmail, EMAIL_ERROR, isValidPhone, Country } from "@/lib/formValidation";
import { PhoneInput, useDefaultCountry } from "@/components/PhoneInput";

const stripePromise = loadStripe("pk_test_51TEDFIC1QQPOr4ssWrWvdlkMcoPTCFeumI4Dwnw6ZNCZZN5XCutH5ib9o69wZApQfqlqwuhrLObFNsTFRijLyHQU00eWDjXqfZ");

type CurrencyCode = "EUR" | "USD" | "CLP";

const currencies: Record<CurrencyCode, { rate: number; locale: string; round: number }> = {
  EUR: { rate: 1, locale: "de-DE", round: 1 },
  USD: { rate: 1.08, locale: "en-US", round: 1 },
  CLP: { rate: 1050, locale: "de-DE", round: 1000 },
};

const formatPrice = (eurAmount: number, currency: CurrencyCode) => {
  const { rate, locale, round } = currencies[currency];
  const converted = Math.round((eurAmount * rate) / round) * round;
  const formatted = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(converted);
  if (currency === "EUR") return `${formatted}€`;
  return `$${formatted}`;
};

type PlanInfo = { name: string; priceEUR: number; period: string; description: string; features: string[] };

const PLANS: Record<string, PlanInfo> = {
  Essential: {
    name: "Essential",
    priceEUR: 450,
    period: "/mes",
    description: "Para marcas que necesitan renovar su contenido visual.",
    features: [
      "12 imágenes generadas con IA",
      "Dirección creativa incluida",
      "Adaptaciones para web y redes sociales",
      "Formatos optimizados para marketing digital",
      "Uso comercial",
      "Entrega rápida",
    ],
  },
  Growth: {
    name: "Growth",
    priceEUR: 800,
    period: "/mes",
    description: "Para marcas que necesitan contenido visual y audiovisual de forma constante.",
    features: [
      "25 imágenes generadas con IA",
      "4 videos cortos",
      "Dirección creativa incluida",
      "Adaptaciones multiformato",
      "Resolución hasta 4K",
      "Uso comercial",
    ],
  },
  Studio: {
    name: "Studio",
    priceEUR: 1500,
    period: "/mes",
    description: "Producción creativa integral para marcas y proyectos.",
    features: [
      "50 imágenes generadas con IA",
      "8 videos cortos",
      "Desarrollo de campañas creativas",
      "Dirección de arte",
      "Adaptaciones para múltiples formatos",
      "Atención prioritaria",
    ],
  },
};

const ADDONS: { id: string; name: string; priceEUR: number }[] = [
  { id: "catalogo", name: "Pack Catálogo (10 piezas)", priceEUR: 250 },
  { id: "campana6", name: "Pack Campaña (6 piezas)", priceEUR: 390 },
  { id: "video", name: "Video corto para redes", priceEUR: 200 },
  { id: "campana", name: "Campaña completa", priceEUR: 800 },
];

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

const SelectionChip = ({ label, selected, onClick, icon: Icon }: { label: string; selected: boolean; onClick: () => void; icon?: React.ComponentType<any> }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all border ${
      selected ? "border-foreground bg-foreground/10 text-foreground" : "border-[#222] bg-[#111] text-muted-foreground hover:border-[#444]"
    }`}
  >
    {Icon && <Icon size={16} />}
    {label}
  </button>
);

const ProgressBar = ({ step }: { step: number }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-2">
      {stepLabels.map((label, i) => (
        <div key={label} className="flex flex-col items-center flex-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${i <= step ? "bg-foreground text-background" : "border border-[#333] text-muted-foreground"}`}>
            {i + 1}
          </div>
          <span className={`text-[10px] mt-1 hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground/50"}`}>{label}</span>
        </div>
      ))}
    </div>
    <div className="h-0.5 bg-[#1a1a1a] rounded-full mt-2">
      <div className="h-full bg-foreground rounded-full transition-all duration-500" style={{ width: `${((step + 1) / 5) * 100}%` }} />
    </div>
  </div>
);

const cardElementOptions = {
  style: {
    base: { fontSize: "14px", color: "#F5F5F0", fontFamily: "Inter, sans-serif", "::placeholder": { color: "#555" } },
    invalid: { color: "#ef4444" },
  },
};

const PaymentForm = ({ email, totalLabel, onSuccess, onPayLater, payLaterLoading }: { email: string; totalLabel: string; onSuccess: () => void; onPayLater: () => void; payLaterLoading: boolean }) => {
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
    const { error: stripeError } = await stripe.createPaymentMethod({ type: "card", card: cardElement, billing_details: { email } });
    if (stripeError) {
      setError(stripeError.message ?? "Error al procesar el pago");
      setProcessing(false);
    } else {
      setProcessing(false);
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Tarjeta de crédito</label>
        <div className="px-4 py-3 rounded-lg border border-[#222] bg-[#111]">
          <CardElement options={cardElementOptions} />
        </div>
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <button type="submit" disabled={!stripe || processing} className="w-full py-3 text-sm font-medium rounded-full bg-foreground text-background hover:opacity-90 transition-all disabled:opacity-40">
        {processing ? "Procesando..." : `Confirmar y pagar ${totalLabel}`}
      </button>
      <div className="text-center pt-1">
        <button type="button" onClick={onPayLater} disabled={payLaterLoading} className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 disabled:opacity-50">
          {payLaterLoading ? "Guardando..." : "¿Prefieres pagar más tarde? Guarda tu solicitud →"}
        </button>
      </div>
      <p className="text-center text-[11px] text-muted-foreground/50">Modo test — no se procesará ningún cobro real</p>
    </form>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as { plan?: string; currency?: CurrencyCode };
  const initialPlan = state.plan && PLANS[state.plan] ? state.plan : "Pro";
  const initialCurrency: CurrencyCode = state.currency ?? "EUR";

  const [currency] = useState<CurrencyCode>(initialCurrency);
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [payLater, setPayLater] = useState(false);
  const [payLaterLoading, setPayLaterLoading] = useState(false);

  const [step1, setStep1] = useState({ service: "", plan: initialPlan, addons: [] as string[] });
  const [step2, setStep2] = useState({ company: "", hasWeb: false, webUrl: "", sector: "", teamSize: "" });
  const [step3, setStep3] = useState({ expectations: "", references: "", deadline: "" });
  const [step4, setStep4] = useState({ name: "", email: "", phone: "" });
  const [country, setCountry] = useDefaultCountry();
  const [showStep4Errors, setShowStep4Errors] = useState(false);

  const formattedPhone = step4.phone.trim() ? `${country.dial} ${step4.phone.trim()}` : "";

  const selectedPlan = PLANS[step1.plan] ?? PLANS.Pro;
  const selectedAddons = ADDONS.filter((a) => step1.addons.includes(a.id));
  const subtotalEUR = selectedPlan.priceEUR + selectedAddons.reduce((s, a) => s + a.priceEUR, 0);
  const totalLabel = formatPrice(subtotalEUR, currency);

  const toggleAddon = (id: string) =>
    setStep1((p) => ({ ...p, addons: p.addons.includes(id) ? p.addons.filter((x) => x !== id) : [...p.addons, id] }));

  const buildMessage = () => {
    const parts: string[] = [];
    if (step1.service) parts.push(`Servicio: ${serviceTypes.find((s) => s.id === step1.service)?.label ?? step1.service}`);
    if (selectedAddons.length) parts.push(`Add-ons: ${selectedAddons.map((a) => a.name).join(", ")}`);
    if (step2.sector) parts.push(`Sector: ${step2.sector}`);
    if (step2.teamSize) parts.push(`Equipo: ${step2.teamSize}`);
    if (step2.hasWeb && step2.webUrl) parts.push(`Web: ${step2.webUrl}`);
    if (step3.expectations) parts.push(`Expectativas: ${step3.expectations}`);
    if (step3.references) parts.push(`Referencias: ${step3.references}`);
    if (step3.deadline) parts.push(`Plazo: ${step3.deadline}`);
    parts.push(`Total: ${totalLabel}`);
    return parts.join(" | ") || null;
  };

  const saveProgressFull = async (payment_status: string) => {
    const email = step4.email.trim().toLowerCase();
    if (!isValidEmail(email)) return;
    try {
      await supabase.rpc("upsert_contact", {
        p_email: email,
        p_nombre: step4.name?.trim() || null,
        p_compania: step2.company?.trim() || null,
        p_phone: formattedPhone || null,
        p_plan_selected: `${selectedPlan.name}${selectedAddons.length ? " + " + selectedAddons.map((a) => a.name).join(", ") : ""}`,
        p_message: buildMessage(),
        p_source: "checkout_page",
        p_payment_status: payment_status,
      });
    } catch (e) {
      console.warn("[Checkout] silent fallback", e);
    }
  };

  const prevStepRef = useRef(step);
  useEffect(() => {
    if (prevStepRef.current !== step) {
      prevStepRef.current = step;
      if (isValidEmail(step4.email)) {
        const status = step >= 4 ? "payment_pending" : step === 3 ? "contact_captured" : "started";
        saveProgressFull(status);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!isValidEmail(step4.email)) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const status = step >= 4 ? "payment_pending" : "contact_captured";
      saveProgressFull(status);
    }, 700);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step4.email, step4.name, step4.phone, step2.company, step1.plan, step1.addons.join(",")]);

  const step4Valid = !!step4.name.trim() && isValidEmail(step4.email) && (!step4.phone.trim() || isValidPhone(step4.phone));
  const canNext = () => {
    if (step === 0) return !!step1.plan;
    if (step === 1) return step2.company && step2.sector && step2.teamSize;
    if (step === 2) return step3.deadline;
    if (step === 3) return step4Valid;
    return true;
  };

  const handleNext = () => {
    if (step === 3 && !step4Valid) { setShowStep4Errors(true); return; }
    setStep((s) => Math.min(s + 1, 4));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSuccess = async () => { await saveProgressFull("completed"); setSuccess(true); };
  const handlePayLater = async () => {
    if (!isValidEmail(step4.email)) return;
    setPayLaterLoading(true);
    await saveProgressFull("payment_pending");
    setPayLaterLoading(false);
    setPayLater(true);
    const msg = encodeURIComponent(`Hola, quiero reservar el plan ${selectedPlan.name} (${totalLabel}) y pagar más tarde.`);
    window.open(`https://wa.me/34663474019?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const Summary = ({ compact = false }: { compact?: boolean }) => (
    <div className={`rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] ${compact ? "p-4" : "p-6"}`}>
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBag size={16} className="text-foreground" />
        <h3 className="text-foreground text-sm font-semibold uppercase tracking-wider">Resumen del pedido</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#1a1a1a]">
          <div>
            <p className="text-foreground text-sm font-medium">Plan {selectedPlan.name}</p>
            <p className="text-muted-foreground text-xs font-light mt-0.5">{selectedPlan.description}</p>
          </div>
          <p className="text-foreground text-sm font-semibold whitespace-nowrap">{formatPrice(selectedPlan.priceEUR, currency)}</p>
        </div>

        {!compact && (
          <ul className="space-y-1.5 pb-3 border-b border-[#1a1a1a]">
            {selectedPlan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground font-light">
                <Check size={12} className="text-foreground flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        )}

        {selectedAddons.length > 0 && (
          <div className="space-y-2 pb-3 border-b border-[#1a1a1a]">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Servicios adicionales</p>
            {selectedAddons.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <button onClick={() => toggleAddon(a.id)} className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0" aria-label={`Quitar ${a.name}`}>
                    <X size={12} />
                  </button>
                  <span className="text-sm text-foreground font-light truncate">{a.name}</span>
                </div>
                <span className="text-sm text-foreground font-medium whitespace-nowrap">+{formatPrice(a.priceEUR, currency)}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <span className="text-foreground text-sm font-semibold uppercase tracking-wider">Total</span>
          <span className="text-foreground text-2xl font-bold tracking-tight">{totalLabel}</span>
        </div>
        <p className="text-[10px] text-muted-foreground/60">{selectedPlan.period === "/mes" ? "Facturación mensual" : "Pago único"}</p>
      </div>
    </div>
  );

  if (success || payLater) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
          <h1 className="text-foreground text-2xl font-semibold mb-2">{success ? "¡Todo listo! 🎉" : "¡Listo!"}</h1>
          <p className="text-muted-foreground text-sm mb-6">
            {success
              ? "Te hemos enviado un email de confirmación. Nos pondremos en contacto contigo en menos de 24h."
              : "Guardamos tu solicitud. Te contactaremos para coordinar el pago cuando estés listo."}
          </p>
          <button onClick={() => navigate("/")} className="px-6 py-2.5 text-sm font-medium rounded-full bg-foreground text-background hover:opacity-90 transition-opacity">
            Volver al inicio
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky top bar with running total */}
      <div className="sticky top-0 z-30 border-b border-[#1a1a1a] bg-background/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="text-foreground text-sm font-semibold tracking-tight hover:opacity-80">← Volver</Link>
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground hidden sm:block">Total</span>
            <span className="text-foreground text-lg sm:text-xl font-bold tracking-tight">{totalLabel}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight mb-1">Checkout</h1>
          <p className="text-muted-foreground text-sm">Completa los pasos para iniciar tu proyecto</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Main: step form */}
          <div className="rounded-2xl border border-[#1a1a1a] bg-[#0A0A0A] p-6 md:p-8">
            <ProgressBar step={step} />

            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                {step === 0 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-foreground text-lg font-semibold mb-1">¿Qué necesitas?</h3>
                      <p className="text-muted-foreground text-sm mb-4">Selecciona el tipo de servicio que buscas</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {serviceTypes.map((s) => (
                          <SelectionChip key={s.id} label={s.label} icon={s.icon} selected={step1.service === s.id} onClick={() => setStep1((p) => ({ ...p, service: s.id }))} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Plan elegido</label>
                      <div className="flex flex-wrap gap-2">
                        {planOptions.map((p) => (
                          <SelectionChip key={p} label={`${p} · ${formatPrice(PLANS[p].priceEUR, currency)}`} selected={step1.plan === p} onClick={() => setStep1((prev) => ({ ...prev, plan: p }))} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Servicios adicionales (opcional)</label>
                      <p className="text-muted-foreground text-xs mb-3">Agrega servicios extra a tu plan. El total se actualiza en tiempo real.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ADDONS.map((a) => {
                          const active = step1.addons.includes(a.id);
                          return (
                            <button
                              key={a.id}
                              type="button"
                              onClick={() => toggleAddon(a.id)}
                              className={`flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-all ${active ? "border-foreground bg-foreground/10" : "border-[#222] bg-[#111] hover:border-[#444]"}`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${active ? "bg-foreground text-background" : "border border-[#333]"}`}>
                                  {active ? <Check size={12} /> : <Plus size={12} className="text-muted-foreground" />}
                                </div>
                                <span className={`text-sm truncate ${active ? "text-foreground" : "text-muted-foreground"}`}>{a.name}</span>
                              </div>
                              <span className="text-sm text-foreground font-medium whitespace-nowrap ml-2">+{formatPrice(a.priceEUR, currency)}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-5">
                    <h3 className="text-foreground text-lg font-semibold mb-1">Cuéntanos sobre tu marca</h3>
                    <div>
                      <label className={labelClass}>¿Cuál es el nombre de tu empresa?</label>
                      <input className={inputClass} value={step2.company} onChange={(e) => setStep2((p) => ({ ...p, company: e.target.value }))} placeholder="Tu empresa" />
                    </div>
                    <div>
                      <label className={labelClass}>¿Tienes página web?</label>
                      <div className="flex gap-2 mb-2">
                        <SelectionChip label="Sí" selected={step2.hasWeb} onClick={() => setStep2((p) => ({ ...p, hasWeb: true }))} />
                        <SelectionChip label="No" selected={!step2.hasWeb} onClick={() => setStep2((p) => ({ ...p, hasWeb: false, webUrl: "" }))} />
                      </div>
                      {step2.hasWeb && (
                        <input className={inputClass} value={step2.webUrl} onChange={(e) => setStep2((p) => ({ ...p, webUrl: e.target.value }))} placeholder="https://tuempresa.com" />
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>¿En qué sector opera tu empresa?</label>
                      <div className="flex flex-wrap gap-2">
                        {sectorOptions.map((s) => {
                          const isOtro = s === "Otro";
                          const predefined = sectorOptions.filter((o) => o !== "Otro");
                          const otroSelected = !!step2.sector && !predefined.includes(step2.sector);
                          const selected = isOtro ? otroSelected : step2.sector === s;
                          return <SelectionChip key={s} label={s} selected={selected} onClick={() => setStep2((p) => ({ ...p, sector: isOtro ? "Otro" : s }))} />;
                        })}
                      </div>
                      {(() => {
                        const predefined = sectorOptions.filter((o) => o !== "Otro");
                        const showInput = !!step2.sector && !predefined.includes(step2.sector);
                        if (!showInput) return null;
                        return (
                          <input className={`${inputClass} mt-3`} value={step2.sector === "Otro" ? "" : step2.sector} onChange={(e) => setStep2((p) => ({ ...p, sector: e.target.value || "Otro" }))} placeholder="Especifica tu sector" autoFocus />
                        );
                      })()}
                    </div>
                    <div>
                      <label className={labelClass}>¿Cuántas personas forman tu equipo?</label>
                      <div className="flex flex-wrap gap-2">
                        {teamSizes.map((t) => (
                          <SelectionChip key={t} label={t} selected={step2.teamSize === t} onClick={() => setStep2((p) => ({ ...p, teamSize: t }))} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <h3 className="text-foreground text-lg font-semibold mb-1">¿Qué buscas conseguir?</h3>
                    <div>
                      <label className={labelClass}>¿Cuáles son tus expectativas con este proyecto?</label>
                      <textarea className={`${inputClass} min-h-[80px] resize-none`} value={step3.expectations} onChange={(e) => setStep3((p) => ({ ...p, expectations: e.target.value }))} placeholder="Ej: Quiero renovar el catálogo de mi tienda online antes del verano..." />
                    </div>
                    <div>
                      <label className={labelClass}>¿Tienes algún referente visual que te inspire?</label>
                      <textarea className={`${inputClass} min-h-[60px] resize-none`} value={step3.references} onChange={(e) => setStep3((p) => ({ ...p, references: e.target.value }))} placeholder="Ej: Me gusta el estilo de @marca o esta URL..." />
                    </div>
                    <div>
                      <label className={labelClass}>¿Cuándo necesitas tener el proyecto listo?</label>
                      <div className="flex flex-wrap gap-2">
                        {deadlineOptions.map((d) => (
                          <SelectionChip key={d} label={d} selected={step3.deadline === d} onClick={() => setStep3((p) => ({ ...p, deadline: d }))} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <Step4Block data={step4} onChange={(d) => setStep4((p) => ({ ...p, ...d }))} country={country} onCountryChange={setCountry} showErrors={showStep4Errors} />
                )}

                {step === 4 && (
                  <div className="space-y-5">
                    <h3 className="text-foreground text-lg font-semibold mb-1">Pago</h3>
                    <p className="text-muted-foreground text-sm mb-3">Confirma tu pedido por <span className="text-foreground font-semibold">{totalLabel}</span> e introduce los datos de tu tarjeta.</p>
                    <Elements stripe={stripePromise}>
                      <PaymentForm email={step4.email} totalLabel={totalLabel} onSuccess={handlePaymentSuccess} onPayLater={handlePayLater} payLaterLoading={payLaterLoading} />
                    </Elements>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {step < 4 && (
              <div className="flex items-center justify-between mt-8">
                {step > 0 ? (
                  <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft size={14} /> Atrás
                  </button>
                ) : <div />}
                <button onClick={handleNext} disabled={!canNext()} className="flex items-center gap-1 px-6 py-2.5 text-sm font-medium rounded-full bg-foreground text-background hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
                  {step === 3 ? "Ir al pago" : "Siguiente"} <ArrowRight size={14} />
                </button>
              </div>
            )}

            {step === 4 && (
              <button onClick={() => setStep(3)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mt-4">
                <ArrowLeft size={14} /> Atrás
              </button>
            )}
          </div>

          {/* Sidebar summary (desktop) */}
          <aside className="hidden lg:block sticky top-20">
            <Summary />
          </aside>

          {/* Mobile summary (bottom) */}
          <div className="lg:hidden">
            <Summary compact />
          </div>
        </div>
      </div>
    </div>
  );
};

const Step4Block = ({ data, onChange, country, onCountryChange, showErrors }: { data: { name: string; email: string; phone: string }; onChange: (d: Partial<{ name: string; email: string; phone: string }>) => void; country: Country; onCountryChange: (c: Country) => void; showErrors: boolean }) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const emailValid = isValidEmail(data.email);
  const nameErr = !data.name.trim() ? "Este campo es obligatorio" : "";
  const emailErr = !data.email.trim() ? "Este campo es obligatorio" : !emailValid ? EMAIL_ERROR : "";
  const phoneErr = data.phone.trim() && !isValidPhone(data.phone) ? "El número de teléfono es demasiado corto" : "";
  const showName = (showErrors || touched.name) && nameErr;
  const showEmail = (showErrors || touched.email) && emailErr;
  const showPhone = (showErrors || touched.phone) && phoneErr;

  return (
    <div className="space-y-5">
      <h3 className="text-foreground text-lg font-semibold mb-1">Tus datos de contacto</h3>
      <div>
        <label className={labelClass}>Nombre completo *</label>
        <input className={`${inputClass} ${showName ? "border-red-500" : ""}`} value={data.name} onChange={(e) => onChange({ name: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, name: true }))} placeholder="Tu nombre" />
        {showName && <p className="mt-1 text-xs text-red-400">{nameErr}</p>}
      </div>
      <div>
        <label className={labelClass}>Email *</label>
        <div className="relative">
          <input className={`${inputClass} ${showEmail ? "border-red-500" : ""} ${emailValid ? "pr-10" : ""}`} type="email" value={data.email} onChange={(e) => onChange({ email: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, email: true }))} placeholder="tu@email.com" />
          {emailValid && <Check size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />}
        </div>
        {showEmail && <p className="mt-1 text-xs text-red-400">{emailErr}</p>}
      </div>
      <div>
        <label className={labelClass}>Teléfono (opcional)</label>
        <div onBlur={() => setTouched((p) => ({ ...p, phone: true }))}>
          <PhoneInput country={country} onCountryChange={onCountryChange} value={data.phone} onChange={(v) => onChange({ phone: v })} error={showPhone ? phoneErr : null} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
