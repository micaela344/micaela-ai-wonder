import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import serviciosImagenesCoverAsset from "@/assets/ai-image-cover.png.asset.json";
const serviciosImagenesCover = serviciosImagenesCoverAsset.url;
import serviciosCampanasCover from "@/assets/campanas-cover.webp";

const services = [
  {
    id: "imagenes",
    label: "Imágenes",
    image: serviciosImagenesCover,
    video: null,
    align: "left" as const,
    benefits: [
      "Imágenes y vídeos profesionales sin estudio fotográfico",
      "Producto, moda, belleza y personas hiperrealistas con IA",
      "Desde una foto de móvil hasta una campaña completa",
    ],
    href: "/servicios/imagenes-ia",
    faqId: "faq-imagenes",
  },
  {
    id: "animaciones",
    label: "Animaciones",
    image: null,
    video: "/videos/sombra_de_maquillaje-2.mp4",
    align: "right" as const,
    benefits: [
      "Videos cortos para redes sociales",
      "Animaciones y motion graphics con IA",
      "Producción 10x más rápida que lo tradicional",
    ],
    href: "/servicios/videos-ia",
    faqId: "faq-videos",
  },
  {
    id: "campanas",
    label: "Campañas",
    image: null,
    video: "/videos/campanas-portada-v3.mp4",
    align: "left" as const,
    benefits: [
      "Estrategia creativa basada en datos",
      "A/B testing visual automatizado",
      "Assets para todas las plataformas",
    ],
    href: "/servicios/campanas",
    faqId: "faq-campanas",
  },
];

const StickyTabs = () => {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="servicios" className="pt-6 md:pt-12 pb-12 md:pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16"
        >
          <h2 className="text-5xl md:text-6xl tracking-tight">
            <span style={{ fontWeight: 300, color: '#666666' }}>Nuestros </span>
            <span style={{ fontWeight: 800, color: '#ffffff' }}>Servicios</span>
          </h2>
        </motion.div>

        <h3 className="text-2xl md:text-3xl tracking-tight mb-8 md:mb-10">
          <span style={{ fontWeight: 800, color: '#ffffff' }}>PRODUCTO, MODA & BELLEZA</span>
        </h3>

        <div className="space-y-12 md:space-y-20">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`w-full md:w-[90%] ${service.align === "left" ? "mr-auto" : "ml-auto"}`}
            >
              <div className="relative rounded-xl overflow-hidden border border-border mb-6">
                <button
                  type="button"
                  aria-label="Ver detalles del servicio"
                  title="Ver detalles del servicio"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const id = service.faqId;
                    if (window.location.hash === `#${id}`) window.location.hash = "";
                    window.location.hash = `#${id}`;
                  }}
                  className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full flex items-center justify-center italic text-sm leading-none border border-foreground/60 bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-foreground hover:bg-secondary"
                >
                  i
                </button>
                {service.video ? (
                  <video
                    src={service.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-64 md:h-96 object-cover"
                  />
                ) : (
                  <img
                    src={service.image!}
                    alt={service.label}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-64 md:h-96 object-cover"
                  />
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-semibold text-foreground">{service.label}</h3>
              </div>

              <ul className="space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-muted-foreground text-sm">
                    <Check size={16} className="text-foreground mt-0.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#contacto"
                  className="inline-flex items-center px-5 py-2 text-sm font-medium rounded-full border border-border text-foreground hover:bg-secondary transition-colors"
                >
                  Solicitar este servicio
                </a>
                <a
                  href={service.href}
                  className="inline-flex items-center px-5 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Ver más
                </a>
              </div>

              <a
                href="https://wa.me/34663474019?text=¡Hola!%20Me%20interesa%20saber%20más%20sobre%20sus%20servicios%2C%20¿me%20pueden%20ayudar%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-xs text-foreground no-underline hover:text-muted-foreground transition-colors"
              >
                ¿Te interesa? Escríbeme directamente →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StickyTabs;
