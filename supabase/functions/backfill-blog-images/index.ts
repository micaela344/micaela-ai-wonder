// Backfill blog cover images - v2
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

async function generateCoverImage(title: string, description: string): Promise<string | null> {
  const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!lovableApiKey) {
    console.error("LOVABLE_API_KEY not set");
    return null;
  }

  const prompt = `Professional, cinematic blog cover image for an article titled "${title}". The article is about: ${description}. Style: dark moody atmosphere, modern digital art, creative studio aesthetic, no text or words in the image, 16:9 aspect ratio.`;

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI image generation failed:", response.status, errText);
      return null;
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!imageUrl) {
      console.error("No image returned, response:", JSON.stringify(data).slice(0, 500));
      return null;
    }
    return imageUrl;
  } catch (err) {
    console.error("Error generating image:", err);
    return null;
  }
}

async function uploadToStorage(
  supabase: ReturnType<typeof createClient>,
  base64DataUrl: string,
  slug: string
): Promise<string | null> {
  try {
    const base64Data = base64DataUrl.replace(/^data:image\/\w+;base64,/, "");
    const binaryData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
    const filePath = `${slug}.png`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, binaryData, { contentType: "image/png", upsert: true });

    if (error) {
      console.error("Storage upload error:", error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("Error uploading image:", err);
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, slug, title, description, cover_image")
    .or("cover_image.is.null,cover_image.eq.");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const results: any[] = [];

  for (const article of articles ?? []) {
    console.log(`Processing: ${article.title}`);
    const base64Image = await generateCoverImage(article.title, article.description);
    if (!base64Image) {
      results.push({ slug: article.slug, status: "image_generation_failed" });
      continue;
    }

    const publicUrl = await uploadToStorage(supabase, base64Image, article.slug);
    if (!publicUrl) {
      results.push({ slug: article.slug, status: "upload_failed" });
      continue;
    }

    const { error: updateError } = await supabase
      .from("articles")
      .update({ cover_image: publicUrl })
      .eq("id", article.id);

    if (updateError) {
      results.push({ slug: article.slug, status: "update_failed", error: updateError.message });
      continue;
    }

    results.push({ slug: article.slug, status: "ok", url: publicUrl });
  }

  return new Response(
    JSON.stringify({ processed: results.length, results }, null, 2),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
