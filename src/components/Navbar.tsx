import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Instagram } from "lucide-react";
import micAiLogo from "@/assets/logo_sin_fondo.webp";
import LanguageToggle from "./LanguageToggle";

const navLinksES = [
  { label: "Servicios", href: "#servicios" },
  { label: "Planes", href: "#planes" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "#contacto" },
];

const navLinksEN = [
  { label: "Services", href: "#servicios" },
  { label: "Plans", href: "#planes" },
  { label: "About me", href: "#sobre-mi" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contacto" },
];

const isEnglish = () => {
  if (typeof document === "undefined") return false;
  return /googtrans=\/[a-z]{2}\/en/i.test(document.cookie);
};

const sectionIds = ["servicios", "planes", "sobre-mi", "contacto"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const [english, setEnglish] = useState(false);
  const navLinks = english ? navLinksEN : navLinksES;

  useEffect(() => {
    setEnglish(isEnglish());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section on scroll (only on home page)
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      let current = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Set active for /blog route
  useEffect(() => {
    if (location.pathname.startsWith("/blog")) {
      setActiveSection("blog");
    }
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);

    if (href.startsWith("#")) {
      const id = href.slice(1);
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation then scroll
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isActive = (link: { href: string }) => {
    if (link.href === "/blog") return activeSection === "blog";
    if (link.href.startsWith("#")) return activeSection === link.href.slice(1);
    return false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-24 grid grid-cols-3 items-center">
        <a href="/" className="flex items-center notranslate justify-self-start" translate="no">
          <img src={micAiLogo} alt="MIC AI" className="h-16 sm:h-20 md:h-28" />
        </a>

        <div translate="no" className="notranslate hidden md:flex items-center justify-self-center gap-8 lg:gap-10 whitespace-nowrap">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                to={link.href}
                className={`text-base transition-colors duration-300 ${
                  isActive(link) ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-base transition-colors duration-300 bg-transparent border-none cursor-pointer ${
                  isActive(link) ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-2 lg:gap-3 justify-self-end">
          <a
            href="https://www.instagram.com/micaistudio/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de MIC AI Studio"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram size={20} />
          </a>
          <button
            onClick={() => window.open('https://wa.me/34663474019?text=¡Hola!%20Me%20interesa%20saber%20más%20sobre%20sus%20servicios%2C%20¿me%20pueden%20ayudar%3F', '_blank')}
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-full bg-black text-white transition-all duration-300 cursor-pointer"
            style={{ border: '1.5px solid #FFFFFF', boxShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)' }}
          >
            ¡Contáctanos!
          </button>
          <LanguageToggle />
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground inline-flex items-center justify-center w-11 h-11 -mr-2 col-start-3 justify-self-end"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              <div className="pb-2"><LanguageToggle /></div>
              <div translate="no" className="notranslate contents">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-base transition-colors py-3 min-h-[44px] flex items-center ${
                      isActive(link) ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-base transition-colors text-left bg-transparent border-none cursor-pointer py-3 min-h-[44px] flex items-center ${
                      isActive(link) ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </button>
                )
              )}
              </div>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  window.open('https://wa.me/34663474019?text=¡Hola!%20Me%20interesa%20saber%20más%20sobre%20sus%20servicios%2C%20¿me%20pueden%20ayudar%3F', '_blank');
                }}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-full bg-black text-white w-full transition-all duration-300 cursor-pointer"
                style={{ border: '1.5px solid #FFFFFF', boxShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.15)' }}
              >
                ¡Contáctanos!
              </button>
              <a
                href="https://www.instagram.com/micaistudio/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                aria-label="Instagram de MIC AI Studio"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram size={20} /> Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
