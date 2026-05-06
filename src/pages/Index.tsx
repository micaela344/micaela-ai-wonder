import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ValueProp from "@/components/ValueProp";
import StickyTabs from "@/components/StickyTabs";
import Portfolio from "@/components/Portfolio";
import CTABanner from "@/components/CTABanner";
import EditorialBanner from "@/components/EditorialBanner";
import Pricing from "@/components/Pricing";
import AboutMe from "@/components/AboutMe";
import FAQ from "@/components/FAQ";
import ClientLogos from "@/components/ClientLogos";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location]);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Marquee />
      <ValueProp />
      <ClientLogos />
      <StickyTabs />
      <Portfolio />
      <EditorialBanner />
      <CTABanner />
      <Pricing />
      <AboutMe />
      <FAQ />
      <Contact />
      <Footer />
      
    </div>
  );
};

export default Index;
