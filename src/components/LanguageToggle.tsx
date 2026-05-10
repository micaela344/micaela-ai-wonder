import { useEffect, useState } from "react";

const COOKIE_NAME = "googtrans";

const setCookie = (value: string) => {
  // Set on current host and parent domain so Google Translate picks it up
  const host = window.location.hostname;
  document.cookie = `${COOKIE_NAME}=${value};path=/`;
  document.cookie = `${COOKIE_NAME}=${value};path=/;domain=${host}`;
  // Also set on parent domain (e.g. .lovable.app, .micaistudio.com)
  const parts = host.split(".");
  if (parts.length >= 2) {
    const parent = "." + parts.slice(-2).join(".");
    document.cookie = `${COOKIE_NAME}=${value};path=/;domain=${parent}`;
  }
};

const readLang = (): "es" | "en" => {
  const m = document.cookie.match(/googtrans=\/[a-z]{2}\/([a-z]{2})/i);
  return m && m[1] === "en" ? "en" : "es";
};

const LanguageToggle = ({ className = "" }: { className?: string }) => {
  const [lang, setLang] = useState<"es" | "en">("es");

  useEffect(() => {
    setLang(readLang());
  }, []);

  const switchTo = (target: "es" | "en") => {
    if (target === lang) return;
    if (target === "es") {
      // Clear cookie to restore original
      setCookie("");
      document.cookie = `${COOKIE_NAME}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    } else {
      setCookie("/es/en");
    }
    window.location.reload();
  };

  return (
    <div
      translate="no"
      className={`notranslate inline-flex items-center rounded-full border border-border text-xs font-medium overflow-hidden ${className}`}
    >
      <button
        type="button"
        onClick={() => switchTo("es")}
        className={`px-2.5 py-1 transition-colors ${
          lang === "es" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={`px-2.5 py-1 transition-colors ${
          lang === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
