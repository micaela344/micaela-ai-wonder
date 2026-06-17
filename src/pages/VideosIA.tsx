import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCTAButtons from "@/components/ServiceCTAButtons";
import heroVideo from "@/assets/videos-ia/animaciones-shorts.mp4.asset.json";

const VideosIA = () => {
  return (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <Link to="/#servicios" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} /> Volver atrás
        </Link>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="rounded-xl overflow-hidden border border-border mb-10">
            <video src={heroVideo.url} autoPlay loop muted playsInline className="w-full h-64 md:h-[420px] object-cover" />
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
};

export default VideosIA;
