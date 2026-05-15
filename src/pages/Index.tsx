import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Lazy-load below-the-fold sections to keep the initial JS small on mobile
const Marquee = lazy(() => import("@/components/Marquee"));
const ValueProp = lazy(() => import("@/components/ValueProp"));
const StickyTabs = lazy(() => import("@/components/StickyTabs"));
const ContactMarquee = lazy(() => import("@/components/ContactMarquee"));
const Portfolio = lazy(() => import("@/components/Portfolio"));
const CTABanner = lazy(() => import("@/components/CTABanner"));
const EditorialBanner = lazy(() => import("@/components/EditorialBanner"));
const Pricing = lazy(() => import("@/components/Pricing"));
const AboutMe = lazy(() => import("@/components/AboutMe"));
const FAQ = lazy(() => import("@/components/FAQ"));
const ClientLogos = lazy(() => import("@/components/ClientLogos"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

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
      <Suspense fallback={null}>
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
      </Suspense>
    </div>
  );
};

export default Index;
