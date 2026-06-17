import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Building2 } from "lucide-react";
import aiImageCoverAsset from "@/assets/ai-image-cover.png.asset.json";
const aiImageCover = aiImageCoverAsset.url;
import ambiente1 from "@/assets/ambientes/ambiente-1.png.asset.json";

const services = [
  {
    icon: Sparkles,
    title: "Producto, Moda & Belleza",
    bullets: [
      "Fotografía de producto sin sesión fotográfica",
      "Moda, belleza y personas hiperrealistas",
      "Animaciones y vídeos cortos para redes sociales",
      "Campañas visuales completas para tu marca",
    ],
    image: aiImageCover,
    video: null,
    slug: "/servicios/imagenes-ia",
    faqId: "faq-imagenes",
  },
  {
    icon: Building2,
    title: "Espacios & Arquitectura",
    bullets: [
      "Renders de interiores y decoración de ambientes",
      "Arquitectura y espacios generados con IA",
      "Animaciones de recorridos y presentaciones",
      "Visualización de proyectos antes de construir",
    ],
    image: ambiente1.url,
    video: null,
    slug: "/servicios/videos-ia",
    faqId: "faq-videos",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleInfoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const id = service.faqId;
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    if (window.location.hash === `#${id}`) {
      window.location.hash = "";
    }
    window.location.hash = `#${id}`;
  };

  return (
    <Link to={service.slug}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="group relative rounded-xl border border-border bg-card overflow-hidden hover:border-muted-foreground/30 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col"
      >
        <button
          type="button"
          onClick={handleInfoClick}
          aria-label="Ver detalles del servicio"
          title="Ver detalles del servicio"
          className="absolute top-3 right-3 z-20 w-5 h-5 rounded-full flex items-center justify-center italic text-[11px] leading-none transition-all duration-200 backdrop-blur-sm"
          style={{
            border: "1px solid rgba(255,255,255,0.5)",
            background: "rgba(0,0,0,0.55)",
            color: "#fff",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#fff";
            e.currentTarget.style.background = "#1a1a1a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
            e.currentTarget.style.background = "rgba(0,0,0,0.55)";
          }}
        >
          i
        </button>
        <div className="aspect-[4/3] overflow-hidden">
          {service.video ? (
            <video
              src={service.video}
              autoPlay loop muted playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <img
              src={service.image!}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <service.icon className="text-muted-foreground mb-3" size={20} />
          <h3 className="text-foreground font-semibold text-lg mb-3">{service.title}</h3>
          <ul className="text-muted-foreground text-sm leading-relaxed mb-5 space-y-1.5 flex-1">
            {service.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-foreground/60 mt-[2px]">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <span
            className="inline-flex items-center justify-center min-h-[44px] gap-2 text-sm font-semibold text-white bg-black px-5 py-2.5 rounded-full transition-all duration-300 group-hover:gap-3"
            style={{ border: '1.5px solid #FFFFFF', boxShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)' }}
          >
            Ver más <ArrowRight size={16} />
          </span>
          <a
            href="https://wa.me/34663474019?text=¡Hola!%20Me%20interesa%20saber%20más%20sobre%20sus%20servicios%2C%20¿me%20pueden%20ayudar%3F"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="block mt-3 text-xs text-foreground no-underline hover:text-muted-foreground transition-colors"
          >
            ¿Te interesa? Escríbeme directamente →
          </a>
        </div>
      </motion.div>
    </Link>
  );
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicios" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-3">Servicios</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Nuestros Servicios</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
