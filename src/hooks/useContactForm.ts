import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

export const useContactForm = () => {
  const submitContact = useCallback(async (data: ContactFormData) => {
    const email = data.email?.trim().toLowerCase();
    if (!email) return false;
    try {
      const { error } = await supabase.rpc("upsert_contact", {
        p_email: email,
        p_nombre: data.name?.trim() || null,
        p_compania: data.company?.trim() || null,
        p_phone: data.phone?.trim() || null,
        p_plan_selected: null,
        p_message: data.message?.trim() || null,
        p_source: "contact_form",
        p_payment_status: "contact_only",
      });
      if (error) {
        console.warn("[useContactForm] silent fallback", error);
        return false;
      }
      return true;
    } catch (err) {
      console.warn("[useContactForm] silent fallback", err);
      return false;
    }
  }, []);

  return { submitContact };
};
