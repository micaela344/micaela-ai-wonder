import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Image, Video, Megaphone, Palette } from "lucide-react";
import aiImageCover from "@/assets/ai-image-cover.webp";
import campaignCover from "@/assets/campanas-cover.webp";
import aiImage2 from "@/assets/ai-image-2.webp";
import aiImage3 from "@/assets/ai-image-3.webp";
import aiImage4 from "@/assets/ai-image-4.webp";

const services = [
  {
    icon: Image,
    title: "Imágenes con IA",
    description: "Fotografías hiperrealistas y arte digital generado con los modelos más avanzados.",
    image: aiImageCover,
    video: null,
    slug: "/servicios/imagenes-ia",
    faqId: "faq-imagenes",
  },
  {
    icon: Video,
    title: "Animaciones/Shorts",
    description: "Contenido audiovisual generativo para redes sociales, ads y presentaciones.",
    image: null,
    video: "/videos/sombra_de_maquillaje.mp4",
    slug: "/servicios/videos-ia",
    faqId: "faq-videos",
  },
  {
    icon: Megaphone,
    title: "Campañas Publicitarias",
    description: "Estrategia creativa potenciada por IA para campañas que convierten.",
    image: null,
    video: "/videos/campanas-portada.mp4",
    slug: "/servicios/campanas",
    faqId: "faq-campanas",
  },
  {
    icon: Palette,
    title: "Branding & Contenido",
    description: "Identidad visual y contenido de marca construido con inteligencia artificial.",
    image: aiImage4,
    video: null,
    slug: "/servicios/branding",
    faqId: "faq-branding",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Link to={service.slug}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="group relative rounded-xl border border-border bg-card overflow-hidden hover:border-muted-foreground/30 transition-all duration-500 hover:-translate-y-1"
      >
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
        <div className="p-6">
          <service.icon className="text-muted-foreground mb-3" size={20} />
          <h3 className="text-foreground font-semibold text-lg mb-2">{service.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
          <span
            className="inline-flex items-center justify-center min-h-[44px] gap-2 text-sm font-semibold text-white bg-black px-5 py-2.5 rounded-full transition-all duration-300 group-hover:gap-3"
            style={{ border: '1.5px solid #FFFFFF', boxShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)' }}
          >
            Ver más <ArrowRight size={16} />
          </span>
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Lo que hacemos</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
