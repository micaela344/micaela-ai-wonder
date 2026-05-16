import { useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PricingFormData {
  name?: string;
  email: string;
  company?: string;
  phone?: string;
  plan_selected?: string;
}

export const usePricingForm = () => {
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveProgress = useCallback((data: PricingFormData) => {
    const email = data.email?.trim().toLowerCase();
    if (!email) return;

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      try {
        const { error } = await supabase.rpc("upsert_contact", {
          p_email: email,
          p_nombre: data.name?.trim() || null,
          p_compania: data.company?.trim() || null,
          p_phone: data.phone?.trim() || null,
          p_plan_selected: data.plan_selected?.trim() || null,
          p_message: null,
          p_source: "plan_form",
          p_payment_status: "pending",
        });
        if (error) console.warn("[usePricingForm] silent fallback", error);
      } catch (err) {
        console.warn("[usePricingForm] silent fallback", err);
      }
    }, 800);
  }, []);

  return { saveProgress };
};
