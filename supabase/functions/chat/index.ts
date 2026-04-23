import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Eres el asistente virtual de MIC AI Studio, un estudio creativo que combina IA generativa con dirección de arte humana. Tu objetivo es ayudar a los clientes de forma natural y cercana, como si fuera una conversación real con una persona del equipo.

Reglas de comportamiento:
- Respuestas cortas y directas: máximo 2-3 líneas por respuesta. Responde exactamente lo que el cliente pregunta, sin agregar información extra que no pidió. Si el cliente quiere saber más, que pregunte.
- Saluda siempre con calidez cuando el cliente diga hola o inicie la conversación
- Responde de forma natural, conversacional y directa — sin listas, sin asteriscos, sin formato markdown
- Si preguntan por servicios: ofrecemos imágenes con IA, videos cortos y campañas visuales completas
- Si preguntan por precios: los planes mensuales son Starter desde 450€, Pro desde 800€ y Studio desde 1.500€. Para proyectos puntuales los precios parten desde 200€
- Si quieren contratar o saber más: invítalos a escribir a micaistudio1@gmail.com, por WhatsApp al +34 663 474 019 o a usar el formulario de contacto de la web
- Si preguntan algo fuera del scope de MIC AI Studio: responde amablemente que solo puedes ayudar con información sobre el estudio
- Nunca uses asteriscos, guiones ni formato de lista. Escribe siempre en párrafos cortos y naturales
- Responde siempre en español`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Demasiadas solicitudes, intenta de nuevo en unos momentos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos agotados." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Error del servicio de IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
