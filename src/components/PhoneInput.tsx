import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { COUNTRIES, Country, detectDefaultCountry, sanitizePhoneDigits } from "@/lib/formValidation";

interface PhoneInputProps {
  country: Country;
  onCountryChange: (c: Country) => void;
  value: string;
  onChange: (v: string) => void;
  error?: string | null;
  placeholder?: string;
  className?: string;
}

export const PhoneInput = ({
  country,
  onCountryChange,
  value,
  onChange,
  error,
  placeholder = "612 345 678",
  className = "",
}: PhoneInputProps) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={wrapRef}
        className={`relative flex items-stretch rounded-lg border bg-[#111] transition-colors ${
          error ? "border-red-500" : "border-[#222] focus-within:border-[#444]"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-foreground border-r border-[#222] hover:bg-[#1a1a1a] rounded-l-lg transition-colors"
          aria-label="Seleccionar país"
        >
          <span className="text-base leading-none">{country.flag}</span>
          <span className="text-xs text-muted-foreground">{country.dial}</span>
          <ChevronDown size={12} className="text-muted-foreground" />
        </button>
        <input
          type="tel"
          inputMode="tel"
          value={value}
          onChange={(e) => onChange(sanitizePhoneDigits(e.target.value))}
          placeholder={placeholder}
          maxLength={20}
          className="flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none rounded-r-lg"
        />
        {open && (
          <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-[260px] max-h-64 overflow-y-auto rounded-lg border border-[#222] bg-[#0a0a0a] shadow-xl">
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  onCountryChange(c);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-[#1a1a1a] transition-colors ${
                  c.code === country.code ? "bg-[#1a1a1a]" : ""
                }`}
              >
                <span className="text-base">{c.flag}</span>
                <span className="flex-1 text-foreground">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.dial}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export const useDefaultCountry = () => {
  const [country, setCountry] = useState<Country>(() => detectDefaultCountry());
  return [country, setCountry] as const;
};
