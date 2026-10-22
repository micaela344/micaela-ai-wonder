-- 1) Esquema de micaistudio.com para el Supabase propio (MIC AI studio).
-- Estado final de las migraciones de Lovable, escrito para poder correrse
-- sobre un proyecto que ya tenga algunas tablas (no borra nada).
-- Pegar completo en Supabase > SQL Editor > Run.

-- ===== articles (blog)
CREATE TABLE IF NOT EXISTS public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'IA Generativa',
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS cover_image text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Articles are publicly readable" ON public.articles;
DROP POLICY IF EXISTS "Published articles are publicly readable" ON public.articles;
CREATE POLICY "Published articles are publicly readable"
  ON public.articles FOR SELECT TO anon, authenticated
  USING (is_published = true);

-- ===== contacts (formularios y checkout)
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
-- Compatibilidad con la tabla contacts que ya existía en este Supabase
-- (usaba "name" y "company"): se agregan las columnas nuevas sin borrar nada.
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS nombre text;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS compania text;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS plan_selected text;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS message text;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS source text;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending';
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='contacts' AND column_name='name') THEN
    UPDATE public.contacts SET nombre = name WHERE nombre IS NULL;
    ALTER TABLE public.contacts ALTER COLUMN name DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='contacts' AND column_name='company') THEN
    UPDATE public.contacts SET compania = company WHERE compania IS NULL;
    ALTER TABLE public.contacts ALTER COLUMN company DROP NOT NULL;
  END IF;
END $$;
CREATE UNIQUE INDEX IF NOT EXISTS contacts_email_key_idx ON public.contacts (email);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS contacts_set_updated_at ON public.contacts;
CREATE TRIGGER contacts_set_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

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
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
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

-- ===== newsletter
CREATE TABLE IF NOT EXISTS public.newsletter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.newsletter ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter;
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter FOR INSERT TO anon, authenticated WITH CHECK (true);

SELECT 'esquema listo' AS estado;
