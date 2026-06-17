
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;

DROP POLICY IF EXISTS "Articles are publicly readable" ON public.articles;
CREATE POLICY "Published articles are publicly readable"
ON public.articles FOR SELECT
TO anon, authenticated
USING (is_published = true);

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;
