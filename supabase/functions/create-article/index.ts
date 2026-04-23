import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-api-key",
};

async function generateCoverImage(title: string, description: string): Promise<string | null> {
  const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!lovableApiKey) {
    console.error("LOVABLE_API_KEY not set, skipping image generation");
    return null;
  }

  try {
    const prompt = `Generate a professional, cinematic blog cover image for an article titled "${title}". The article is about: ${description}. Style: dark moody atmosphere, modern digital art, creative studio aesthetic, no text or words in the image, 16:9 aspect ratio.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-image-preview",
        prompt: prompt,
        n: 1,
        response_format: "b64_json",
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI image generation failed:", response.status, errText);
      return null;
    }

    const data = await response.json();
    const b64 = data.data?.[0]?.b64_json;

    if (!b64) {
      console.error("No image returned from AI, response:", JSON.stringify(data).slice(0, 500));
      return null;
    }

    return `data:image/png;base64,${b64}`;
  } catch (err) {
    console.error("Error generating cover image:", err);
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
      .upload(filePath, binaryData, {
        contentType: "image/png",
        upsert: true,
      });

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

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const apiKey = req.headers.get("x-api-key");
  const expectedKey = Deno.env.get("BLOG_API_KEY");

  if (!expectedKey || apiKey !== expectedKey) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { title, slug, content, description, category, published_at } = body;

    if (!title || !slug || !content || !description) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: title, slug, content, description" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Generate cover image with AI
    console.log("Generating cover image for:", title);
    const base64Image = await generateCoverImage(title, description);

    let coverImageUrl: string | null = null;
    if (base64Image) {
      console.log("Uploading cover image to storage...");
      coverImageUrl = await uploadToStorage(supabase, base64Image, slug);
    }

    const { data, error } = await supabase.from("articles").insert({
      title,
      slug,
      content,
      description,
      category: category || "IA Generativa",
      published_at: published_at || new Date().toISOString(),
      cover_image: coverImageUrl,
    }).select().single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, article: data }), {
      status: 201,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
