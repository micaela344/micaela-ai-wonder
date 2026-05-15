-- Drop the permissive policies; the public site will use a SECURITY DEFINER function instead
DROP POLICY IF EXISTS "Anyone can insert contacts" ON public.contacts;
DROP POLICY IF EXISTS "Anyone can update contacts" ON public.contacts;

-- Safe upsert helper: inserts a contact (matched by email) or updates the existing row.
-- Only non-null arguments overwrite existing values, so partial saves don't wipe earlier data.
CREATE OR REPLACE FUNCTION public.upsert_contact(
  p_email text,
  p_nombre text DEFAULT NULL,
  p_compania text DEFAULT NULL,
  p_phone text DEFAULT NULL,
  p_plan_selected text DEFAULT NULL,
  p_message text DEFAULT NULL,
  p_source text DEFAULT NULL,
  p_payment_status text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email text;
  v_id uuid;
BEGIN
  v_email := lower(btrim(p_email));
  IF v_email IS NULL OR v_email = '' OR position('@' in v_email) = 0 THEN
    RAISE EXCEPTION 'invalid email';
  END IF;

  INSERT INTO public.contacts (
    email, nombre, compania, phone, plan_selected, message, source, payment_status
  ) VALUES (
    v_email,
    NULLIF(btrim(p_nombre), ''),
    NULLIF(btrim(p_compania), ''),
    NULLIF(btrim(p_phone), ''),
    NULLIF(btrim(p_plan_selected), ''),
    NULLIF(btrim(p_message), ''),
    NULLIF(btrim(p_source), ''),
    COALESCE(NULLIF(btrim(p_payment_status), ''), 'pending')
  )
  ON CONFLICT (email) DO UPDATE SET
    nombre         = COALESCE(NULLIF(btrim(EXCLUDED.nombre), ''),         public.contacts.nombre),
    compania       = COALESCE(NULLIF(btrim(EXCLUDED.compania), ''),       public.contacts.compania),
    phone          = COALESCE(NULLIF(btrim(EXCLUDED.phone), ''),          public.contacts.phone),
    plan_selected  = COALESCE(NULLIF(btrim(EXCLUDED.plan_selected), ''),  public.contacts.plan_selected),
    message        = COALESCE(NULLIF(btrim(EXCLUDED.message), ''),        public.contacts.message),
    source         = COALESCE(NULLIF(btrim(EXCLUDED.source), ''),         public.contacts.source),
    payment_status = COALESCE(NULLIF(btrim(EXCLUDED.payment_status), ''), public.contacts.payment_status),
    updated_at     = now()
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION public.upsert_contact(text, text, text, text, text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.upsert_contact(text, text, text, text, text, text, text, text) TO anon, authenticated;
