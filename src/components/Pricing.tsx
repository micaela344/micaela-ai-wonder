import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight, Info } from "lucide-react";


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

const plans = [
  {
    name: "Starter",
    priceEUR: 450,
    pricePrefix: "Desde ",
    period: "/mes",
    subtitle: "Renueva tu catálogo y presencia digital",
    features: [
      "12 imágenes IA con dirección creativa",
      "Optimizadas para ecommerce y RRSS",
      "3+ formatos web, Meta y Google",
      "Imágenes en 2K (PNG listo para web)",
      "Uso comercial ilimitado",
      "Entrega en 3–7 días",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    priceEUR: 800,
    pricePrefix: "Desde ",
    period: "/mes",
    badge: "Recomendado",
    subtitle: "Crea tu calendario de marketing completo",
    features: [
      "25 imágenes IA con dirección creativa",
      "Fotografía lifestyle y editorial",
      "4 videos cortos para redes",
      "5+ formatos para Meta, Google y TikTok",
      "Alineado con tu brand manual",
      "Imágenes en 2K y 4K",
      "Uso comercial ilimitado",
      "Entrega en 5–14 días",
    ],
    highlighted: true,
  },
  {
    name: "Studio",
    priceEUR: 1500,
    pricePrefix: "Desde ",
    period: "/mes",
    subtitle: "Producción creativa mensual completa",
    features: [
      "50 imágenes IA con dirección creativa",
      "8 videos cortos para redes",
      "Campañas completas para Meta, Google y TikTok",
      "Identidad visual y brand manual incluido",
      "Formatos para digital, impresión y gran formato",
      "Uso comercial ilimitado",
      "Revisiones ilimitadas",
      "Entrega en 7–14 días",
    ],
    highlighted: false,
  },
];

const serviciosPuntuales = [
  { name: "Pack Catálogo (10 piezas)", priceEUR: 250, pricePrefix: "desde ", faqId: "faq-imagenes" },
  { name: "Pack Campaña (6 piezas)", priceEUR: 390, pricePrefix: "desde ", faqId: "faq-campanas" },
  { name: "Video corto para redes", priceEUR: 200, pricePrefix: "desde ", faqId: "faq-videos" },
  { name: "Campaña completa", priceEUR: 800, pricePrefix: "desde ", faqId: "faq-campanas" },
];

const scrollToFaq = (faqId: string) => {
  if (window.location.hash === `#${faqId}`) {
    document.getElementById(faqId)?.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    window.location.hash = faqId;
  }
};

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<CurrencyCode>("EUR");

  const goToCheckout = (plan: string) => navigate("/checkout", { state: { plan, currency } });


  const currencyOptions: { code: CurrencyCode; label: string }[] = [
    { code: "EUR", label: "EUR €" },
    { code: "USD", label: "USD $" },
    { code: "CLP", label: "CLP $" },
  ];

  return (
    <section id="planes" className="pt-8 md:pt-12 pb-12 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-10"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-3">Planes</p>
          <h2 className="text-3xl md:text-4xl tracking-tight">
            <span style={{ fontWeight: 300, color: '#666666' }}>Elige el plan </span>
            <span style={{ fontWeight: 800, color: '#ffffff' }}>perfecto para tu marca</span>
          </h2>
        </motion.div>

        {/* Currency Selector */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div
            role="tablist"
            aria-label="Seleccionar moneda"
            className="inline-flex items-center gap-1 p-1 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {currencyOptions.map((opt) => {
              const active = currency === opt.code;
              return (
                <button
                  key={opt.code}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCurrency(opt.code)}
                  className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all ${
                    active ? "text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={
                    active
                      ? {
                          background: '#ffffff',
                          boxShadow: '0 0 12px rgba(255,255,255,0.25)',
                        }
                      : {}
                  }
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-column layout: Plans + Servicios Puntuales */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Left: Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan, i) => {
              const displayPrice = `${plan.pricePrefix}${formatPrice(plan.priceEUR, currency)}`;
              const cardContent = (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative rounded-2xl p-5 sm:p-7 flex flex-col h-full ${
                  plan.highlighted
                    ? "bg-[#0d0d0d]"
                    : "border border-[#1a1a1a] bg-[#0d0d0d]"
                }`}
                style={plan.highlighted ? {
                  boxShadow: '0 0 24px rgba(245,230,196,0.25), 0 0 50px rgba(245,230,196,0.12)',
                } : {}}
              >
                {plan.badge && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[11px] font-medium tracking-wide uppercase rounded-full"
                    style={{ background: 'linear-gradient(135deg, #FBF1D9, #F5E6C4, #EDD9B0)', color: '#000000', boxShadow: '0 0 12px rgba(245,230,196,0.5)' }}
                  >
                    {plan.badge}
                  </span>
                )}

                <p className="text-muted-foreground text-sm font-light tracking-wide">{plan.name}</p>

                <div className="mt-3 mb-2 flex items-baseline gap-1">
                  <span className="text-xs text-muted-foreground font-light tracking-wide">{plan.pricePrefix}</span>
                  <span className="text-3xl font-bold text-foreground tracking-tight">{formatPrice(plan.priceEUR, currency)}</span>
                  <span className="text-muted-foreground text-sm font-light">{plan.period}</span>
                </div>

                <p className="text-muted-foreground text-xs font-light mb-6">{plan.subtitle}</p>

                <div className="w-full h-px bg-border mb-6" />

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground font-light">
                      <Check size={14} className="text-foreground flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setPaymentItem({ name: `Plan ${plan.name}`, price: `${displayPrice}${plan.period}` })}
                  className={`inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                    plan.highlighted
                      ? ""
                      : "border border-[#333333] text-foreground hover:bg-[#141414]"
                  }`}
                  style={plan.highlighted ? {
                    background: 'linear-gradient(135deg, #FBF1D9, #F5E6C4, #EDD9B0)',
                    color: '#000000',
                    boxShadow: '0 0 18px rgba(245,230,196,0.55), 0 0 36px rgba(245,230,196,0.25)',
                  } : {}}
                >
                  Comenzar
                </button>
              </motion.div>
              );

              if (!plan.highlighted) return cardContent;

              return (
                <div
                  key={`${plan.name}-wrapper`}
                  className="rounded-2xl p-[2px] h-full"
                  style={{
                    background: 'linear-gradient(135deg, #FBF1D9, #F5E6C4, #EDD9B0, #F5E6C4, #FBF1D9)',
                  }}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>

          {/* Right: Servicios Puntuales */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-lg md:text-xl tracking-tight mb-6 flex items-center gap-2">
              <span>
                <span style={{ fontWeight: 300, color: '#666666' }}>Servicios </span>
                <span style={{ fontWeight: 800, color: '#ffffff' }}>puntuales</span>
              </span>
              <button
                type="button"
                onClick={() => scrollToFaq("faq-imagenes")}
                aria-label="Ver detalles de cada servicio en preguntas frecuentes"
                title="Ver detalles de cada servicio"
                className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-[#333333] text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <Info size={13} />
              </button>
            </h3>

            <div className="border border-[#1a1a1a] rounded-2xl divide-y divide-[#1a1a1a] bg-[#0d0d0d]">
              {serviciosPuntuales.map((s, i) => {
                const displayPrice = `${s.pricePrefix}${formatPrice(s.priceEUR, currency)}`;
                return (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                  className="px-5 py-4 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground font-light">{s.name}</span>
                    <button
                      type="button"
                      onClick={() => scrollToFaq(s.faqId)}
                      aria-label={`Ver detalles de ${s.name}`}
                      title="Ver detalles"
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Info size={12} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground font-medium">{displayPrice}</span>
                    <button
                      onClick={() => setPaymentItem({ name: s.name, price: displayPrice })}
                      className="inline-flex items-center justify-center min-h-[36px] px-4 py-1.5 text-xs font-medium rounded-full border border-[#333333] text-foreground hover:bg-[#141414] transition-all"
                    >
                      Contratar
                    </button>
                  </div>
                </motion.div>
                );
              })}
            </div>

            {/* Doubt Banner */}
            <div
              className="mt-6 rounded-2xl p-6 text-center"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p className="text-foreground font-semibold text-base mb-1">¿Aún tienes dudas?</p>
              <p className="text-muted-foreground text-sm font-light mb-4">
                Contáctame y te las resuelvo en menos de 24 horas.
              </p>
              <a
                href="https://wa.me/34663474019?text=¡Hola!%20Me%20interesa%20saber%20más%20sobre%20sus%20servicios%2C%20¿me%20pueden%20ayudar%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-6 py-2.5 text-sm font-medium rounded-full bg-foreground text-background transition-all hover:scale-105"
                style={{
                  boxShadow: '0 0 20px rgba(255,255,255,0.45), 0 0 40px rgba(255,255,255,0.25), 0 0 60px rgba(255,255,255,0.12)',
                }}
              >
                Hablar con Micaela <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <a href="#contacto" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors font-light">
            ¿No sabes qué plan necesitas? Cuéntanos tu proyecto <ArrowRight size={14} />
          </a>
        </motion.p>
      </div>
      <PaymentModal
        isOpen={!!paymentItem}
        onClose={() => setPaymentItem(null)}
        itemName={paymentItem?.name ?? ""}
        itemPrice={paymentItem?.price ?? ""}
      />
    </section>
  );
};

export default Pricing;
