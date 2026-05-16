import { useEffect, useRef, useState } from "react";
import { X, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EMAIL_ERROR, isValidEmail } from "@/lib/formValidation";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

const SESSION_KEY = "newsletter_popup_shown";

const NewsletterPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
    };

    const timer = window.setTimeout(trigger, 5000);

    const onScroll = () => {
      const scrolled = window.innerHeight + window.scrollY;
      const full = document.documentElement.scrollHeight;
      if (full - scrolled < 50) trigger();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = () => setOpen(false);

  const emailValid = isValidEmail(email);
  const showEmailError = touched && !emailValid && email.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!emailValid) {
      emailRef.current?.focus();
      return;
    }
    const value = email.trim().toLowerCase();
    setStatus("loading");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/newsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({ email: value }),
        }
      );

      if (response.ok) {
        setStatus("success");
        return;
      }

      const errorData = await response.json().catch(() => ({}));
      console.error("[NewsletterPopup] Full error:", JSON.stringify(errorData));
      const code = (errorData as any).code;
      const msg = ((errorData as any).message || "").toLowerCase();
      if (code === "23505" || msg.includes("duplicate") || msg.includes("unique")) {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("[NewsletterPopup] Network error:", err);
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={close}
    >
      <div
        className="relative w-full max-w-[480px] animate-scale-in"
        style={{
          background: "#111111",
          border: "1px solid #2a2a2a",
          borderRadius: "16px",
          padding: "40px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Cerrar"
          onClick={close}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {status === "success" ? (
          <p className="text-white text-center text-lg py-6">
            ¡Genial! 🎉 Tu 10% de descuento está en camino.
          </p>
        ) : (
          <>
            <p className="text-xs tracking-[0.2em] text-white/60 mb-3">
              OFERTA EXCLUSIVA
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white leading-tight mb-3">
              Suscríbete y llévate un 10% de descuento
            </h2>
            <p className="text-white/70 mb-6">
              En tu primera campaña o creatividad con IA.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              <div className="relative">
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="Escribe tu email aquí... *"
                  disabled={status === "loading"}
                  maxLength={255}
                  className={`w-full rounded-lg bg-black/40 border px-4 py-3 pr-10 text-white placeholder:text-white/40 focus:outline-none transition-colors ${
                    showEmailError ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-white/40"
                  }`}
                />
                {emailValid && (
                  <Check size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                )}
              </div>
              {showEmailError && (
                <p className="text-red-400 text-xs">{EMAIL_ERROR}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading" || !emailValid}
                className="w-full rounded-lg bg-white text-black font-medium py-3 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Enviando..." : "Quiero mi descuento →"}
              </button>
            </form>

            {status === "duplicate" && (
              <p className="text-yellow-400 text-sm mt-3 text-center">
                Este email ya está registrado. ¡Ya tienes tu descuento!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm mt-3 text-center">
                Hubo un problema. Intenta de nuevo.
              </p>
            )}

            <p className="text-white/40 text-xs text-center mt-4">
              Sin spam. Solo contenido de valor.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopup;
