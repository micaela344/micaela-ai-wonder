import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import PaymentModal from "./PaymentModal";

const plans = [
  {
    name: "Starter",
    price: "Desde 450€",
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
    price: "Desde 800€",
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
    price: "Desde 1.500€",
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
  { name: "Pack Catálogo (10 piezas)", price: "desde 250€" },
  { name: "Pack Campaña (6 piezas)", price: "desde 390€" },
  { name: "Video corto para redes", price: "desde 200€" },
  { name: "Campaña completa", price: "desde 800€" },
];

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [paymentItem, setPaymentItem] = useState<{ name: string; price: string } | null>(null);

  return (
    <section id="planes" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-3">Planes</p>
          <h2 className="text-3xl md:text-4xl tracking-tight">
            <span style={{ fontWeight: 300, color: '#666666' }}>Elige el plan </span>
            <span style={{ fontWeight: 800, color: '#ffffff' }}>perfecto para tu marca</span>
          </h2>
        </motion.div>

        {/* Two-column layout: Plans + Servicios Puntuales */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Left: Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative rounded-2xl p-7 flex flex-col ${
                  plan.highlighted
                    ? "bg-[#111111]"
                    : "border border-[#1a1a1a] bg-[#0d0d0d]"
                }`}
                style={plan.highlighted ? {
                  border: '2px solid transparent',
                  borderImage: 'linear-gradient(135deg, #FBF1D9, #F5E6C4, #EDD9B0, #F5E6C4, #FBF1D9) 1',
                  background: 'linear-gradient(180deg, rgba(245,230,196,0.10) 0%, #111111 40%)',
                  boxShadow: '0 0 24px rgba(245,230,196,0.35), 0 0 50px rgba(245,230,196,0.18)',
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

                <div className="mt-3 mb-2">
                  <span className="text-2xl font-bold text-foreground tracking-tight">{plan.price}</span>
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
                  onClick={() => setPaymentItem({ name: `Plan ${plan.name}`, price: `${plan.price}${plan.period}` })}
                  className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
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
            ))}
          </div>

          {/* Right: Servicios Puntuales */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-lg md:text-xl tracking-tight mb-6">
              <span style={{ fontWeight: 300, color: '#666666' }}>Servicios </span>
              <span style={{ fontWeight: 800, color: '#ffffff' }}>puntuales</span>
            </h3>

            <div className="border border-[#1a1a1a] rounded-2xl divide-y divide-[#1a1a1a] bg-[#0d0d0d]">
              {serviciosPuntuales.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                  className="px-5 py-4 space-y-2"
                >
                  <span className="text-sm text-muted-foreground font-light block">{s.name}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground font-medium">{s.price}</span>
                    <button
                      onClick={() => setPaymentItem({ name: s.name, price: s.price })}
                      className="px-4 py-1.5 text-xs font-medium rounded-full border border-[#333333] text-foreground hover:bg-[#141414] transition-all"
                    >
                      Contratar
                    </button>
                  </div>
                </motion.div>
              ))}
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
                Contáctame y te llamo en menos de 48h para resolverlas.
              </p>
              <a
                href="#contacto"
                className="inline-flex items-center gap-1 px-5 py-2 text-sm font-medium rounded-full bg-foreground text-background hover:opacity-90 transition-all"
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