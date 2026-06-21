import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";


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
    name: "Essential",
    priceEUR: 450,
    pricePrefix: "Desde ",
    period: "/mes",
    subtitle: "Para marcas que necesitan renovar su contenido visual.",
    features: [
      "12 imágenes generadas con IA",
      "Dirección creativa incluida",
      "Adaptaciones para web y redes sociales",
      "Formatos optimizados para marketing digital",
      "Uso comercial",
      "Entrega rápida",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    priceEUR: 800,
    pricePrefix: "Desde ",
    period: "/mes",
    badge: "Recomendado",
    subtitle: "Para marcas que necesitan contenido visual y audiovisual de forma constante.",
    features: [
      "25 imágenes generadas con IA",
      "4 videos cortos",
      "Dirección creativa incluida",
      "Adaptaciones multiformato",
      "Resolución hasta 4K",
      "Uso comercial",
    ],
    highlighted: true,
  },
  {
    name: "Studio",
    priceEUR: 1500,
    pricePrefix: "Desde ",
    period: "/mes",
    subtitle: "Producción creativa integral para marcas y proyectos.",
    features: [
      "50 imágenes generadas con IA",
      "8 videos cortos",
      "Desarrollo de campañas creativas",
      "Dirección de arte",
      "Adaptaciones para múltiples formatos",
      "Atención prioritaria",
    ],
    highlighted: false,
  },
];

const serviciosMedida = [
  {
    name: "Catálogo Visual IA",
    priceEUR: 250,
    pricePrefix: "Desde ",
    subtitle: "Imágenes para ecommerce, moda, belleza, gastronomía y joyería.",
    features: [
      "10 imágenes generadas con IA",
      "Dirección visual",
      "Formatos para web y redes sociales",
      "Uso comercial",
    ],
  },
  {
    name: "Video IA para Redes",
    priceEUR: 200,
    pricePrefix: "Desde ",
    subtitle: "Videos cortos para campañas, publicidad y redes sociales.",
    features: [
      "Video vertical u horizontal",
      "Optimizado para Instagram, TikTok y Meta",
      "Exportación en alta calidad",
    ],
  },
  {
    name: "Campaña Visual IA",
    priceEUR: 390,
    pricePrefix: "Desde ",
    subtitle: "Concepto creativo, dirección visual y piezas para campañas.",
    features: [
      "Desarrollo conceptual",
      "Dirección creativa",
      "Imágenes para lanzamiento o campaña",
      "Uso comercial",
    ],
  },
  {
    name: "Arquitectura y Espacios",
    priceEUR: 450,
    pricePrefix: "Desde ",
    subtitle: "Visualización arquitectónica para interiores y exteriores.",
    features: [
      "Renders generados con IA",
      "Visualizaciones interiores y exteriores",
      "Animaciones arquitectónicas",
      "Recorridos virtuales",
    ],
  },
  {
    name: "Campaña Audiovisual Completa",
    priceEUR: 800,
    pricePrefix: "Desde ",
    subtitle: "Producción visual y audiovisual para lanzamientos y campañas integrales.",
    features: [
      "Imágenes generadas con IA",
      "Videos promocionales",
      "Concepto creativo",
      "Dirección de arte",
      "Adaptaciones para múltiples formatos",
    ],
  },
];

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currency, setCurrency] = useState<CurrencyCode>("EUR");
  const navigate = useNavigate();

  const goToContact = () => {
    const el = document.getElementById("contacto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.hash = "contacto";
  };

  const startCheckoutPlan = (planName: string) => {
    navigate("/checkout", { state: { plan: planName, currency } });
  };

  const startCheckoutService = (svc: { name: string; priceEUR: number; subtitle: string; features: string[] }) => {
    navigate("/checkout", {
      state: {
        plan: svc.name,
        currency,
        customPlan: {
          name: svc.name,
          priceEUR: svc.priceEUR,
          period: "Pago único",
          description: svc.subtitle,
          features: svc.features,
        },
      },
    });
  };

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
          className="text-center mb-6 md:mb-8"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-3">Planes</p>
          <h2 className="text-3xl md:text-4xl tracking-tight">
            <span style={{ fontWeight: 300, color: '#666666' }}>Elige el plan </span>
            <span style={{ fontWeight: 800, color: '#ffffff' }}>perfecto para tu marca</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base font-light max-w-2xl mx-auto mt-4">
            Planes flexibles para marcas y proyectos. Si necesitas una campaña de producto, visualización arquitectónica o producción a medida, solicita una propuesta personalizada.
          </p>
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

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => {
            const cardContent = (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative rounded-2xl p-5 sm:p-7 flex flex-col h-full ${
                  plan.highlighted ? "bg-[#0d0d0d]" : "border border-[#1a1a1a] bg-[#0d0d0d]"
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
                  onClick={goToContact}
                  className={`inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                    plan.highlighted ? "" : "border border-[#333333] text-foreground hover:bg-[#141414]"
                  }`}
                  style={plan.highlighted ? {
                    background: 'linear-gradient(135deg, #FBF1D9, #F5E6C4, #EDD9B0)',
                    color: '#000000',
                    boxShadow: '0 0 18px rgba(245,230,196,0.55), 0 0 36px rgba(245,230,196,0.25)',
                  } : {}}
                >
                  Solicitar propuesta
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

        {/* Servicios a medida */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20 md:mt-28 mb-8 md:mb-10"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-3">Puntuales</p>
          <h2 className="text-3xl md:text-4xl tracking-tight">
            <span style={{ fontWeight: 300, color: '#666666' }}>Servicios </span>
            <span style={{ fontWeight: 800, color: '#ffffff' }}>puntuales</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base font-light max-w-2xl mx-auto mt-4">
            Soluciones visuales y audiovisuales adaptadas a las necesidades de cada proyecto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {serviciosMedida.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              className={`relative rounded-2xl p-5 sm:p-7 flex flex-col h-full border border-[#1a1a1a] bg-[#0d0d0d] lg:col-span-2 ${
                i === 3 ? "lg:col-start-2" : i === 4 ? "lg:col-start-4" : ""
              }`}
            >
              <p className="text-muted-foreground text-sm font-light tracking-wide">{s.name}</p>

              <div className="mt-3 mb-2 flex items-baseline gap-1">
                <span className="text-xs text-muted-foreground font-light tracking-wide">{s.pricePrefix}</span>
                <span className="text-3xl font-bold text-foreground tracking-tight">{formatPrice(s.priceEUR, currency)}</span>
              </div>

              <p className="text-muted-foreground text-xs font-light mb-6">{s.subtitle}</p>

              <div className="w-full h-px bg-border mb-6" />

              <ul className="space-y-3 mb-8 flex-1">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground font-light">
                    <Check size={14} className="text-foreground flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={goToContact}
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-sm font-medium rounded-full border border-[#333333] text-foreground hover:bg-[#141414] transition-all"
              >
                Solicitar propuesta
              </button>
            </motion.div>
          ))}
        </div>

        {/* Doubt Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 max-w-xl mx-auto rounded-2xl p-6 text-center"
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
        </motion.div>

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
    </section>
  );
};

export default Pricing;
