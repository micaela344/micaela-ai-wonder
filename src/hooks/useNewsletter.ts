import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useNewsletter = () => {
  const saveEmail = useCallback(async (email: string) => {
    const value = email?.trim().toLowerCase();
    if (!value) return { ok: false, duplicate: false };
    try {
      const { error } = await supabase
        .from("newsletter")
        .upsert({ email: value }, { onConflict: "email", ignoreDuplicates: true });
      if (error) {
        const code = (error as any).code;
        const msg = (error.message || "").toLowerCase();
        const duplicate = code === "23505" || msg.includes("duplicate") || msg.includes("unique");
        return { ok: duplicate, duplicate };
      }
      return { ok: true, duplicate: false };
    } catch (err) {
      console.warn("[useNewsletter] silent fallback", err);
      return { ok: false, duplicate: false };
    }
  }, []);

  return { saveEmail };
};
