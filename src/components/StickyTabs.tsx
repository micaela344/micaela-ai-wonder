import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import serviciosImagenesCover from "@/assets/servicios-imagenes-cover.png";
import serviciosCampanasCover from "@/assets/campanas-cover.png";

const services = [
  {
    id: "imagenes",
    label: "Imágenes",
    image: serviciosImagenesCover,
    video: null,
    align: "left" as const,
    benefits: [
      "Fotografía de producto sin sesión fotográfica",
      "Retratos y modelos generados desde cero",
      "Iteraciones ilimitadas en minutos",
    ],
    href: "/servicios/imagenes-ia",
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
  },
];

const StickyTabs = () => {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="servicios" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl tracking-tight">
            <span style={{ fontWeight: 300, color: '#666666' }}>Nuestros </span>
            <span style={{ fontWeight: 800, color: '#ffffff' }}>Servicios</span>
          </h2>
        </motion.div>

        <div className="space-y-20">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`w-full md:w-[90%] ${service.align === "left" ? "mr-auto" : "ml-auto"}`}
            >
              <div className="rounded-xl overflow-hidden border border-border mb-6">
                {service.video ? (
                  <video src={service.video} autoPlay loop muted playsInline className="w-full h-64 md:h-96 object-cover" />
                ) : (
                  <img src={service.image!} alt={service.label} className="w-full h-64 md:h-96 object-cover" />
                )}
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-4">{service.label}</h3>

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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StickyTabs;
