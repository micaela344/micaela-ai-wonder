// Publishes one drafted article per day at 09:00 Europe/Madrid.
// Triggered by pg_cron at 07:00 and 08:00 UTC (covers CET/CEST).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function madridHour(): number {
  const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", hour: "2-digit", hour12: false });
  return parseInt(fmt.format(new Date()), 10);
}

function madridDateKey(): string {
  const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid", year: "numeric", month: "2-digit", day: "numeric" });
  return fmt.format(new Date());
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Only run at 09:xx Madrid time (cron fires at 07/08 UTC; one of those equals 09 Madrid year-round).
    const hour = madridHour();
    if (hour !== 9) {
      console.log(`[publish-next-article] skipping — current Madrid hour is ${hour}`);
      return new Response(JSON.stringify({ skipped: true, reason: "outside_window", hour }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Guard: only one publish per Madrid-day.
    const todayKey = madridDateKey(); // YYYY-MM-DD
    const { data: alreadyToday } = await supabase
      .from("articles")
      .select("id, published_at")
      .eq("is_published", true)
      .gte("published_at", `${todayKey}T00:00:00Z`)
      .lte("published_at", `${todayKey}T23:59:59Z`)
      .limit(1);

    if (alreadyToday && alreadyToday.length > 0) {
      console.log("[publish-next-article] already published an article today, skipping");
      return new Response(JSON.stringify({ skipped: true, reason: "already_today" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Pick the most recently drafted unpublished article.
    const { data: drafts, error: draftErr } = await supabase
      .from("articles")
      .select("id, slug, title, created_at")
      .eq("is_published", false)
      .order("created_at", { ascending: false })
      .limit(1);

    if (draftErr) {
      console.error("[publish-next-article] query error", draftErr);
      return new Response(JSON.stringify({ error: "query_failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!drafts || drafts.length === 0) {
      console.log("[publish-next-article] ⚠️ No more pre-written articles to publish. Automation idle.");
      return new Response(JSON.stringify({ done: true, message: "no_drafts_remaining" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const next = drafts[0];
    const { error: updErr } = await supabase
      .from("articles")
      .update({ is_published: true, published_at: new Date().toISOString() })
      .eq("id", next.id);

    if (updErr) {
      console.error("[publish-next-article] update error", updErr);
      return new Response(JSON.stringify({ error: "update_failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[publish-next-article] ✅ Published: ${next.slug} (${next.title})`);
    return new Response(JSON.stringify({ ok: true, published: next.slug }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[publish-next-article] fatal", err);
    return new Response(JSON.stringify({ error: "internal" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
