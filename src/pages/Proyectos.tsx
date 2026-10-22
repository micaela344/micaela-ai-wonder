import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clapperboard, Eye, LayoutGrid, RefreshCw, Volume2, VolumeX } from "lucide-react";
import micAiLogo from "@/assets/logo_sin_fondo.webp";

// Landing para arquitectura e inmobiliario. No está enlazada en el menú:
// se comparte directo (correos, LinkedIn, anuncios) y lleva a WhatsApp.

const MEDIA = "/media/proyectos";
const WHATSAPP_NUMBER = "56976175733";

const waLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const WA_GENERAL = waLink("Hola MIC AI Studio, vi su página de proyectos. Tengo un proyecto y quiero cotizar un video.");
const WA_MEDIDA = waLink("Hola MIC AI Studio, busco algo más específico para mi proyecto y quiero un presupuesto a medida. Les cuento:");

const trackWhatsApp = (location: string) => {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", "whatsapp_click", { page: "proyectos", location });
};

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease },
};

const glowButton = {
  border: "1.5px solid #FFFFFF",
  boxShadow: "0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)",
};

const audiences = [
  {
    name: "Inmobiliarias",
    text: "Vende en verde. Tu comprador ve el departamento terminado y habitado antes de la entrega.",
  },
  {
    name: "Arquitectos",
    text: "Presenta el anteproyecto en movimiento. El cliente entiende el espacio sin leer un plano.",
  },
  {
    name: "Constructoras",
    text: "Muestra la obra transformándose en el proyecto terminado. Ideal para avance de obra y redes.",
  },
  {
    name: "Decoradores e interioristas",
    text: "El mismo espacio en varios estilos. Tu cliente elige antes de comprar un solo mueble.",
  },
];

type Work = {
  src: string;
  label: string;
  title: string;
  format: "wide" | "tall";
};

const works: Work[] = [
  { src: "obra", label: "Obra completa", title: "De la demolición a la casa habitada", format: "wide" },
  { src: "terraza", label: "Remodelación terraza 360°", title: "De vacía a lista para vivir", format: "wide" },
  { src: "edificio", label: "Edificio", title: "Del terreno al edificio terminado", format: "tall" },
  { src: "estilos", label: "Interiorismo", title: "Un living, seis estilos", format: "tall" },
  { src: "living", label: "Piloto", title: "Living: del vacío al hogar", format: "tall" },
  { src: "departamento", label: "Departamento piloto", title: "Del acceso al dormitorio, en un solo recorrido", format: "tall" },
  { src: "piscina", label: "Exterior", title: "De la excavación a la piscina", format: "tall" },
];

const services = [
  {
    name: "Obra gruesa",
    prefix: "Desde",
    price: "$250.000",
    time: "1–2 días hábiles",
    subtitle: "Tus renders en movimiento.",
    features: [
      "1 video de 20–30 segundos",
      "Renders o planos animados con recorridos de cámara",
      "Sin personas ni interiores ambientados",
      "Formato vertical u horizontal",
      "1 ronda de ajustes",
    ],
    highlighted: false,
  },
  {
    name: "Piloto",
    prefix: "Desde",
    price: "$450.000",
    time: "2–3 días hábiles",
    subtitle: "El interior decorado y habitado por tu comprador objetivo.",
    features: [
      "1 video de la casa o departamento",
      "Interiores amoblados y decorados",
      "Escenas con el comprador que buscas",
      "Formatos para portales y redes",
      "1 ronda de ajustes",
    ],
    note: "Con una persona hablando a cámara: $600.000 + IVA",
    highlighted: true,
    badge: "El más elegido",
  },
  {
    name: "Llave en mano",
    prefix: "Pack",
    price: "$1.200.000",
    time: "5–7 días hábiles",
    subtitle: "Pack de 3 videos para lanzar tu proyecto.",
    features: [
      "1 video del conjunto o exterior",
      "2 videos de casas o tipologías",
      "Voz en off",
      "Cortes verticales para redes",
      "2 rondas de ajustes",
    ],
    highlighted: false,
  },
];

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong
    className="font-semibold"
    style={{ color: "#0A0A0A", background: "linear-gradient(transparent 58%, #EDD9B0 58%)" }}
  >
    {children}
  </strong>
);

const benefits: { icon: typeof Eye; big: string; title: string; text: React.ReactNode }[] = [
  {
    icon: Eye,
    big: "Desde el plano",
    title: "Vendes antes",
    text: (
      <>
        Tu comprador <Hl>ve su futuro hogar terminado</Hl> antes de la primera piedra. Empiezas a{" "}
        <Hl>reservar sin esperar el piloto</Hl>.
      </>
    ),
  },
  {
    icon: Clapperboard,
    big: "0 rodajes",
    title: "Sin filmación ni obra terminada",
    text: (
      <>
        Sin equipo de grabación ni piloto construido. Tienes <Hl>material de venta desde el primer día</Hl>.
      </>
    ),
  },
  {
    icon: RefreshCw,
    big: "En días",
    title: "Cambios sin volver a filmar",
    text: (
      <>
        ¿Cambió una terminación, el mobiliario o la luz? <Hl>Lo ajustamos sobre el mismo video</Hl>, sin
        partir de cero.
      </>
    ),
  },
  {
    icon: LayoutGrid,
    big: "9:16 · 16:9",
    title: "Listo para cada canal",
    text: (
      <>
        Un solo encargo, formatos para <Hl>sala de ventas, portales, Instagram y TikTok</Hl>.
      </>
    ),
  },
];

const steps = [
  { title: "Nos mandas tu material", text: "Renders, planos, fotos de obra o un video con el celular." },
  { title: "Apruebas las escenas", text: "Definimos luz, materiales y encuadre. Nada se anima sin tu OK." },
  { title: "Recibes el video", text: "En los formatos que necesites, con rondas de ajustes incluidas." },
];

const faqs = [
  {
    q: "¿Qué necesito enviarles?",
    a: "Lo que tengas: renders, planos, fotos de la obra o un video recorriendo el lugar. Con eso te proponemos las escenas.",
  },
  {
    q: "¿Se nota que es IA?",
    a: "Dirigimos cada escena y revisamos materiales, luz y proporciones contra tu proyecto. No agregamos nada que no sea parte de la arquitectura real.",
  },
  {
    q: "¿Puedo usar los videos en portales y sala de ventas?",
    a: "Sí. Entregamos en los formatos que necesites y con uso comercial.",
  },
  {
    q: "¿Cómo facturan?",
    a: "Facturamos en Chile. Los precios están en pesos chilenos y no incluyen IVA.",
  },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground text-xs md:text-sm uppercase tracking-widest mb-3">{children}</p>
);

const SplitTitle = ({ light, bold, className = "" }: { light: string; bold: string; className?: string }) => (
  <h2 className={`text-3xl md:text-5xl tracking-tight leading-[1.1] [&>span]:leading-[1.1] ${className}`}>
    <span style={{ fontWeight: 300, color: "#666666" }}>{light} </span>
    <span style={{ fontWeight: 800, color: "#ffffff" }}>{bold}</span>
  </h2>
);

// Reproduce el video solo cuando está en pantalla y lo carga recién ahí.
const LazyVideo = ({ name, className }: { name: string; className?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (!("IntersectionObserver" in window)) {
      video.src = `${MEDIA}/${name}.mp4`;
      video.play().catch(() => {});
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = `${MEDIA}/${name}.mp4`;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [name]);

  return (
    <video
      ref={ref}
      poster={`${MEDIA}/${name}.jpg`}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
};

const WhatsAppButton = ({
  href,
  location,
  children,
  variant = "glow",
}: {
  href: string;
  location: string;
  children: React.ReactNode;
  variant?: "glow" | "ghost";
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackWhatsApp(location)}
    className={
      variant === "glow"
        ? "group inline-flex items-center justify-center min-h-[48px] px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-full bg-black text-white tracking-wide transition-all duration-300"
        : "inline-flex items-center justify-center min-h-[48px] px-8 py-3 text-sm sm:text-base font-medium rounded-full border border-white/30 text-white/80 hover:text-white hover:border-white/70 transition-all duration-300"
    }
    style={variant === "glow" ? glowButton : undefined}
  >
    {children}
    {variant === "glow" && (
      <motion.span
        className="ml-2 inline-flex"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowRight size={16} />
      </motion.span>
    )}
  </a>
);

const CaseVideo = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden border border-[#1a1a1a] bg-[#0d0d0d]">
      <video
        ref={ref}
        src={`${MEDIA}/ak-obras.mp4`}
        poster={`${MEDIA}/ak-obras.jpg`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={toggleSound}
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/70 backdrop-blur px-4 py-2 text-xs text-white border border-white/20 hover:border-white/60 transition-colors"
        aria-label={muted ? "Activar sonido" : "Silenciar"}
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        {muted ? "Escuchar a Cristian" : "Silenciar"}
      </button>
    </div>
  );
};

const Proyectos = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Video con IA para arquitectura e inmobiliarias | MIC AI Studio";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    meta?.setAttribute(
      "content",
      "Convertimos renders, planos y fotos de obra en videos para sala de ventas, portales y redes. Para inmobiliarias, arquitectos, constructoras e interioristas en Chile.",
    );
    return () => {
      document.title = prevTitle;
      meta?.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Cabecera mínima: sin menú, solo logo y contacto */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
          <img src={micAiLogo} alt="MIC AI Studio" className="h-16 sm:h-20 md:h-28 w-auto" />
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsApp("header")}
            className="inline-flex items-center rounded-full border border-white/40 px-5 py-2 text-xs sm:text-sm text-white hover:bg-white hover:text-black transition-colors"
          >
            Escríbenos
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[92svh] flex items-end overflow-hidden">
        <video
          src={`${MEDIA}/hero.mp4`}
          poster={`${MEDIA}/hero.jpg`}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.15) 30%, rgba(10,10,10,0.6) 62%, rgba(10,10,10,0.97) 100%)",
          }}
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-14 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-white/80 text-xs md:text-sm uppercase tracking-widest mb-4"
          >
            Arquitectura · Inmobiliario · Interiorismo
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-[clamp(2.2rem,6vw,5rem)] tracking-tight leading-[1] [&>span]:leading-[1.02] max-w-4xl"
          >
            <span
              className="block"
              style={{ fontWeight: 800, color: "#ffffff", textShadow: "0 0 8px rgba(255,255,255,0.25), 0 0 16px rgba(255,255,255,0.12)" }}
            >
              Tu proyecto, en video
            </span>
            <span className="block" style={{ fontWeight: 300, color: "#9a9a9a" }}>
              antes de construirlo.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease }}
            className="mt-5 text-base md:text-lg text-white/75 max-w-xl"
          >
            Convertimos renders, planos y fotos de obra en videos para sala de ventas, portales y redes. En días, no en
            semanas.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38, ease }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <WhatsAppButton href={WA_GENERAL} location="hero">
              Escríbenos por WhatsApp
            </WhatsAppButton>
            <a
              href="#trabajos"
              className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 text-sm sm:text-base font-medium rounded-full border border-white/30 text-white/80 hover:text-white hover:border-white/70 transition-all duration-300"
            >
              Ver proyectos
            </a>
          </motion.div>
        </div>
      </section>

      {/* Para quién */}
      <section className="py-16 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-3xl">
            <SectionLabel>Para quién</SectionLabel>
            <SplitTitle light="Lo que el comprador no logra imaginar," bold="ahora lo ve." />
          </motion.div>
          <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#1a1a1a]">
            {audiences.map((a, i) => (
              <motion.div
                key={a.name}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="pt-6 pb-2 pr-6"
              >
                <h3 className="text-lg md:text-xl text-foreground">{a.name}</h3>
                <p className="mt-2 text-sm md:text-base text-muted-foreground">{a.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trabajos */}
      <section id="trabajos" className="pb-16 md:pb-28 scroll-mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-3xl">
            <SectionLabel>Trabajos</SectionLabel>
            <SplitTitle light="Del plano al espacio habitado," bold="en movimiento." />
          </motion.div>
          <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-10 gap-3 md:gap-4">
            {works.map((w) => (
              <motion.div
                key={w.src}
                {...fadeUp}
                className={`relative overflow-hidden rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] ${
                  w.format === "wide" ? "col-span-2 md:col-span-5 aspect-video" : "col-span-1 md:col-span-2 aspect-[9/16] max-md:last:col-span-2 max-md:last:mx-auto max-md:last:w-[calc(50%-6px)]"
                }`}
              >
                <LazyVideo name={w.src} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 pt-16 bg-gradient-to-b from-transparent via-black/60 to-black/90">
                  <p className="inline-block mb-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-sm border border-white/15 text-[10px] md:text-xs font-semibold uppercase tracking-widest text-white">{w.label}</p>
                  <p className="text-xs md:text-sm text-white">{w.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Caso real */}
      <section className="py-16 md:py-28 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div {...fadeUp} className="order-2 md:order-1">
            <CaseVideo />
          </motion.div>
          <motion.div {...fadeUp} className="order-1 md:order-2">
            <SectionLabel>Caso real · AK Obras</SectionLabel>
            <SplitTitle light="La obra de hoy," bold="la casa de mañana." />
            <p className="mt-6 text-base md:text-lg text-muted-foreground">
              Cristian, arquitecto de AK Obras, grabó con su celular un recorrido por la casa en construcción.
              Mientras habla, la obra se transforma detrás de él en el proyecto terminado, fiel a sus renders.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Material de partida: un video con el celular y los renders",
                "7 escenas, de la fachada a la terraza",
                "Reel vertical de 30 segundos con su propia voz",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm md:text-base text-muted-foreground">
                  <Check size={16} className="mt-1 shrink-0 text-foreground/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-16 md:py-28 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
            <SectionLabel>Servicios</SectionLabel>
            <SplitTitle light="Elige el plan" bold="para tu proyecto." />
            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Tres formatos según la etapa de tu proyecto. Todos incluyen dirección de arte y rondas de ajustes.
            </p>
          </motion.div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.name}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col bg-[#0d0d0d] ${
                  s.highlighted ? "" : "border border-[#1a1a1a]"
                }`}
                style={
                  s.highlighted
                    ? { boxShadow: "0 0 24px rgba(245,230,196,0.25), 0 0 50px rgba(245,230,196,0.12)" }
                    : undefined
                }
              >
                {s.badge && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[11px] font-medium tracking-wide uppercase rounded-full whitespace-nowrap"
                    style={{
                      background: "linear-gradient(135deg, #FBF1D9, #F5E6C4, #EDD9B0)",
                      color: "#000000",
                      boxShadow: "0 0 12px rgba(245,230,196,0.5)",
                    }}
                  >
                    {s.badge}
                  </span>
                )}
                <p className="text-muted-foreground text-sm tracking-wide">{s.name}</p>
                <div className="mt-3 mb-1 flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-xs text-muted-foreground">{s.prefix}</span>
                  <span className="text-3xl font-bold text-foreground tracking-tight">{s.price}</span>
                  <span className="text-xs text-muted-foreground">+ IVA</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{s.time}</p>
                <p className="text-sm text-foreground/85 mb-6">{s.subtitle}</p>
                <div className="w-full h-px bg-border mb-6" />
                <ul className="space-y-3 mb-8 flex-1">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check size={15} className="mt-1 shrink-0 text-foreground/70" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {s.note && (
                  <p className="-mt-3 mb-6 text-xs text-foreground/80 border-t border-border pt-4">{s.note}</p>
                )}
                <a
                  href={waLink(`Hola MIC AI Studio, me interesa el servicio ${s.name} para mi proyecto.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsApp(`servicio-${s.name}`)}
                  className={`w-full inline-flex items-center justify-center min-h-[46px] rounded-full text-sm font-medium transition-all duration-300 ${
                    s.highlighted
                      ? "bg-white text-black hover:bg-white/90"
                      : "border border-white/25 text-white hover:border-white/70"
                  }`}
                >
                  Cotizar {s.name}
                </a>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Precios en pesos chilenos. Facturamos en Chile.
          </p>

          {/* Presupuesto a medida */}
          <motion.div
            {...fadeUp}
            className="mt-10 rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center"
          >
            <div>
              <h3 className="text-xl md:text-2xl text-foreground">¿Buscas algo más específico?</h3>
              <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
                Varios proyectos o tipologías, contenido mensual para redes, avance de obra o una pieza que no está en
                estos formatos. Cuéntanos qué necesitas y armamos un presupuesto a tu medida.
              </p>
            </div>
            <a
              href={WA_MEDIDA}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp("presupuesto-medida")}
              className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full border border-white/40 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors whitespace-nowrap"
            >
              Pedir presupuesto a medida
            </a>
          </motion.div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 md:py-28" style={{ backgroundColor: "#F5F5F0", color: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-3xl">
            <p className="text-xs md:text-sm uppercase tracking-widest mb-3" style={{ color: "#666666" }}>
              Por qué video
            </p>
            <h2 className="text-3xl md:text-5xl tracking-tight leading-[1.1] [&>span]:leading-[1.1]">
              <span style={{ fontWeight: 300, color: "#666666" }}>Lo que cambia cuando </span>
              <span style={{ fontWeight: 800, color: "#0A0A0A" }}>el proyecto se ve antes.</span>
            </h2>
          </motion.div>
          <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="rounded-2xl bg-white p-6 md:p-7 border border-[#e6e3da] shadow-[0_1px_0_rgba(0,0,0,0.03)]"
              >
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: "#0A0A0A" }}>
                  <b.icon className="w-5 h-5" style={{ color: "#F5E6C4" }} strokeWidth={1.75} />
                </div>
                <p className="mt-6 text-3xl md:text-[2rem] tracking-tight leading-[1.05]" style={{ color: "#0A0A0A", fontWeight: 800 }}>
                  {b.big}
                </p>
                <h3 className="mt-2 text-xs md:text-sm uppercase tracking-widest" style={{ color: "#666666", fontWeight: 600 }}>
                  {b.title}
                </h3>
                <p className="mt-4 text-sm md:text-base leading-relaxed" style={{ color: "#444444" }}>
                  {b.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo trabajo */}
      <section className="py-16 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-3xl">
            <SectionLabel>Cómo trabajo</SectionLabel>
            <SplitTitle light="Tres pasos." bold="Tú apruebas antes de animar." />
          </motion.div>
          <ol className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#1a1a1a] pt-8">
            {steps.map((s, i) => (
              <motion.li key={s.title} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.08, ease }}>
                <span className="text-xs tracking-widest text-muted-foreground">0{i + 1}</span>
                <h3 className="mt-2 text-lg md:text-xl text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm md:text-base text-muted-foreground">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Preguntas */}
      <section className="pb-16 md:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp}>
            <SectionLabel>Preguntas</SectionLabel>
          </motion.div>
          <div className="border-t border-[#1a1a1a]">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-[#1a1a1a] py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base md:text-lg text-foreground">
                  {f.q}
                  <span className="text-muted-foreground transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm md:text-base text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="pb-20 md:pb-32 px-4 sm:px-6">
        <motion.div
          {...fadeUp}
          className="max-w-6xl mx-auto rounded-2xl border border-[#222222] p-8 md:p-14 text-center"
        >
          <h2
            className="tracking-tight leading-[1.1]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.75rem, 4vw, 3.25rem)", fontWeight: 300, color: "#F5F5F0" }}
          >
            ¿Tienes un proyecto en venta <span style={{ fontWeight: 700, color: "#FFFFFF" }}>o por lanzar?</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Cuéntanos de tu proyecto por WhatsApp. Te respondemos con una propuesta para tu caso.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton href={WA_GENERAL} location="cierre">
              Escríbenos por WhatsApp
            </WhatsAppButton>
          </div>
        </motion.div>
      </section>

      {/* Pie mínimo */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <img src={micAiLogo} alt="MIC AI Studio" className="h-24 md:h-28 w-auto self-start" />
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-muted-foreground">
            <a href="mailto:micaistudio1@gmail.com" className="hover:text-foreground transition-colors">
              micaistudio1@gmail.com
            </a>
            <a href="tel:+56976175733" className="hover:text-foreground transition-colors">
              +56 9 7617 5733
            </a>
            <a
              href="https://www.instagram.com/micaistudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              @micaistudio
            </a>
          </div>
          <p className="site-logo-lock text-xs text-text-muted">© 2026 MIC AI Studio · Chile</p>
        </div>
      </footer>
    </div>
  );
};

export default Proyectos;
