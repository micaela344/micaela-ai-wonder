import micAiLogo from "@/assets/logo_sin_fondo.webp";

const Footer = () => (
  <footer className="border-t border-border">
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        <div>
          <img src={micAiLogo} alt="MIC AI" className="h-28" />
          
        </div>

        <div>
          <h4 className="text-foreground text-sm font-medium mb-4">Servicios</h4>
          <ul className="space-y-2">
            {["Imágenes con IA", "Videos con IA", "Campañas Publicitarias"].map((s) => (
              <li key={s}>
                <a href="#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-foreground text-sm font-medium mb-4">Redes Sociales</h4>
          <ul className="space-y-2">
            <li>
              <a href="https://www.instagram.com/micaistudio/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-foreground text-sm font-medium mb-4">Contacto</h4>
          <a
            href="mailto:micaistudio1@gmail.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            micaistudio1@gmail.com
          </a>
          <a
            href="tel:+34663474019"
            className="block mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            +34 663 474 019
          </a>
        </div>
      </div>

      <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="site-logo-lock text-xs text-text-muted">
          © 2026 MIC AI. Todos los derechos reservados.
        </p>
        <a
          href="/politica-de-cookies"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Política de Cookies
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
