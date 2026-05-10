import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCTAButtons from "@/components/ServiceCTAButtons";
import featureBranding from "@/assets/feature-branding.webp";

const Branding = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <Link to="/#servicios" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} /> Volver atrás
        </Link>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="rounded-xl overflow-hidden border border-border mb-10">
            <img src={featureBranding} alt="Branding & Contenido" className="w-full h-64 md:h-[420px] object-cover" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Branding & Contenido</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-8">
            Identidad visual completa generada con inteligencia artificial. Creamos guías de marca, sistemas de diseño y contenido de marca consistente y escalable para tu negocio.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {["Identidad visual completa", "Guías de marca y sistemas de diseño", "Contenido de marca escalable", "Consistencia en todos los canales"].map((item) => (
              <div key={item} className="p-5 rounded-lg border border-border bg-card">
                <p className="text-foreground text-sm">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-12">
            Adaptamos cada pieza al formato que tu marca necesita: Feed (4:5), Reels & Stories (9:16) o formatos horizontales (16:9), optimizados para cada plataforma.
          </p>

          <ServiceCTAButtons />
        </motion.div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Branding;
