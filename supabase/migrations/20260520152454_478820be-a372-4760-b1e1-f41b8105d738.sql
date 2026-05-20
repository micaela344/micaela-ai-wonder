-- contacts
CREATE TABLE IF NOT EXISTS public.contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text,
  email text NOT NULL UNIQUE,
  compania text,
  phone text,
  plan_selected text,
  message text,
  source text,
  payment_status text DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- newsletter
CREATE TABLE IF NOT EXISTS public.newsletter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.newsletter ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='newsletter' AND policyname='Anyone can subscribe to newsletter') THEN
    CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
END $$;

-- articles
CREATE TABLE IF NOT EXISTS public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  cover_image text,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='articles' AND policyname='Articles are publicly readable') THEN
    CREATE POLICY "Articles are publicly readable" ON public.articles FOR SELECT TO anon, authenticated USING (true);
  END IF;
END $$;

-- updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS contacts_set_updated_at ON public.contacts;
CREATE TRIGGER contacts_set_updated_at BEFORE UPDATE ON public.contacts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- upsert_contact function
CREATE OR REPLACE FUNCTION public.upsert_contact(
  p_email text,
  p_nombre text DEFAULT NULL,
  p_compania text DEFAULT NULL,
  p_phone text DEFAULT NULL,
  p_plan_selected text DEFAULT NULL,
  p_message text DEFAULT NULL,
  p_source text DEFAULT NULL,
  p_payment_status text DEFAULT NULL
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_email text; v_id uuid;
BEGIN
  v_email := lower(btrim(p_email));
  IF v_email IS NULL OR v_email = '' OR position('@' in v_email) = 0 THEN
    RAISE EXCEPTION 'invalid email';
  END IF;

  INSERT INTO public.contacts (email, nombre, compania, phone, plan_selected, message, source, payment_status)
  VALUES (
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
END; $$;