export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const EMAIL_ERROR = "Introduce un email válido (ejemplo: nombre@empresa.com)";

export const isValidEmail = (raw: string): boolean => {
  const v = (raw || "").trim();
  if (v.length < 6) return false;
  if (/\s/.test(v)) return false;
  if (v.includes("..")) return false;
  return EMAIL_REGEX.test(v);
};

export interface Country {
  code: string; // ISO
  name: string;
  dial: string; // e.g. "+34"
  flag: string;
}

export const COUNTRIES: Country[] = [
  { code: "ES", name: "España", dial: "+34", flag: "🇪🇸" },
  { code: "CL", name: "Chile", dial: "+56", flag: "🇨🇱" },
  { code: "MX", name: "México", dial: "+52", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", dial: "+54", flag: "🇦🇷" },
  { code: "CO", name: "Colombia", dial: "+57", flag: "🇨🇴" },
  { code: "PE", name: "Perú", dial: "+51", flag: "🇵🇪" },
  { code: "UY", name: "Uruguay", dial: "+598", flag: "🇺🇾" },
  { code: "VE", name: "Venezuela", dial: "+58", flag: "🇻🇪" },
  { code: "US", name: "Estados Unidos", dial: "+1", flag: "🇺🇸" },
  { code: "GB", name: "Reino Unido", dial: "+44", flag: "🇬🇧" },
  { code: "FR", name: "Francia", dial: "+33", flag: "🇫🇷" },
  { code: "DE", name: "Alemania", dial: "+49", flag: "🇩🇪" },
  { code: "IT", name: "Italia", dial: "+39", flag: "🇮🇹" },
  { code: "BR", name: "Brasil", dial: "+55", flag: "🇧🇷" },
  { code: "PT", name: "Portugal", dial: "+351", flag: "🇵🇹" },
];

export const detectDefaultCountry = (): Country => {
  if (typeof navigator === "undefined") return COUNTRIES[0];
  const lang = navigator.language || "";
  const region = lang.split("-")[1]?.toUpperCase();
  if (region) {
    const match = COUNTRIES.find((c) => c.code === region);
    if (match) return match;
  }
  return COUNTRIES[0];
};

export const sanitizePhoneDigits = (raw: string): string =>
  (raw || "").replace(/[^\d\s-]/g, "");

export const countPhoneDigits = (raw: string): number =>
  (raw || "").replace(/\D/g, "").length;

export const isValidPhone = (raw: string): boolean => {
  const digits = countPhoneDigits(raw);
  return digits >= 7 && digits <= 15;
};
