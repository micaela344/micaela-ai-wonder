import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Instagram } from "lucide-react";
import micAiLogo from "@/assets/logo_sin_fondo.png";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Planes", href: "#planes" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "#contacto" },
];

const sectionIds = ["servicios", "planes", "sobre-mi", "contacto"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img src={micAiLogo} alt="MIC AI" className="h-16 sm:h-20 md:h-28" />
        </a>

        <div className="hidden md:flex items-center gap-8">
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

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/34663474019?text=¡Hola!%20Me%20interesa%20saber%20más%20sobre%20sus%20servicios%2C%20¿me%20pueden%20ayudar%3F"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp +34 663 474 019"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.554-5.338 11.89-11.893 11.89a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
            </svg>
          </a>
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
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-base transition-colors ${
                      isActive(link) ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-base transition-colors text-left bg-transparent border-none cursor-pointer ${
                      isActive(link) ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </button>
                )
              )}
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
