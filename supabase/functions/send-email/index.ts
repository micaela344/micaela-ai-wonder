// Sends transactional emails (newsletter discount + purchase confirmations) via Resend.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FROM = "MIC AI Studio <noreply@micaistudio.com>";

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function discountEmail() {
  const subject = "¡Tu 10% de descuento en MIC AI Studio te espera!";
  const text = `Hola,

Gracias por suscribirte a MIC AI Studio. 🎉

Tu código de descuento del 10% para tu primera campaña o creatividad con IA es:

BIENVENIDO10

Guárdalo bien — lo necesitarás al momento de contratar cualquiera de nuestros servicios.

Si tienes dudas o quieres empezar, escríbenos directamente:
👉 https://wa.me/34663474019

¿Tienes alguna pregunta? Escríbenos a micaistudio1@gmail.com o por WhatsApp: https://wa.me/34663474019

Nos vemos pronto,
Micaela
MIC AI Studio`;
  const html = `<div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.6;max-width:560px;margin:0 auto;padding:24px">
    <p>Hola,</p>
    <p>Gracias por suscribirte a <strong>MIC AI Studio</strong>. 🎉</p>
    <p>Tu código de descuento del <strong>10%</strong> para tu primera campaña o creatividad con IA es:</p>
    <p style="font-size:22px;font-weight:700;letter-spacing:2px;background:#f4f4f4;padding:14px 18px;border-radius:10px;text-align:center">BIENVENIDO10</p>
    <p>Guárdalo bien — lo necesitarás al momento de contratar cualquiera de nuestros servicios.</p>
    <p>Si tienes dudas o quieres empezar, escríbenos directamente:<br/>
    👉 <a href="https://wa.me/34663474019">https://wa.me/34663474019</a></p>
    <p style="border-top:1px solid #eee;padding-top:14px;color:#555">¿Tienes alguna pregunta? Escríbenos a <a href="mailto:micaistudio1@gmail.com">micaistudio1@gmail.com</a> o por WhatsApp: <a href="https://wa.me/34663474019">https://wa.me/34663474019</a></p>
    <p>Nos vemos pronto,<br/>Micaela<br/><strong>MIC AI Studio</strong></p>
  </div>`;
  return { subject, text, html };
}

function purchaseEmail(params: { name: string; plan: string; status: string; date: string }) {
  const { name, plan, status, date } = params;
  const subject = "¡Recibimos tu pedido en MIC AI Studio!";
  const text = `Hola ${name},

¡Gracias por confiar en MIC AI Studio! 🙌

Hemos recibido tu solicitud correctamente. Aquí tienes el resumen:

📦 Plan contratado: ${plan}
💳 Estado: ${status}
📅 Fecha: ${date}

¿Qué pasa ahora?
En menos de 24 horas nos pondremos en contacto contigo para coordinar los detalles de tu proyecto y comenzar a trabajar.

Si tienes cualquier pregunta mientras tanto, escríbenos por WhatsApp:
👉 https://wa.me/34663474019

¿Tienes alguna pregunta? Escríbenos a micaistudio1@gmail.com o por WhatsApp: https://wa.me/34663474019

¡Nos vemos pronto!
Micaela
MIC AI Studio
micaistudio.com`;
  const html = `<div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.6;max-width:560px;margin:0 auto;padding:24px">
    <p>Hola ${escapeHtml(name)},</p>
    <p>¡Gracias por confiar en <strong>MIC AI Studio</strong>! 🙌</p>
    <p>Hemos recibido tu solicitud correctamente. Aquí tienes el resumen:</p>
    <ul style="list-style:none;padding:0">
      <li>📦 <strong>Plan contratado:</strong> ${escapeHtml(plan)}</li>
      <li>💳 <strong>Estado:</strong> ${escapeHtml(status)}</li>
      <li>📅 <strong>Fecha:</strong> ${escapeHtml(date)}</li>
    </ul>
    <p><strong>¿Qué pasa ahora?</strong><br/>En menos de 24 horas nos pondremos en contacto contigo para coordinar los detalles de tu proyecto y comenzar a trabajar.</p>
    <p>Si tienes cualquier pregunta mientras tanto, escríbenos por WhatsApp:<br/>
    👉 <a href="https://wa.me/34663474019">https://wa.me/34663474019</a></p>
    <p style="border-top:1px solid #eee;padding-top:14px;color:#555">¿Tienes alguna pregunta? Escríbenos a <a href="mailto:micaistudio1@gmail.com">micaistudio1@gmail.com</a> o por WhatsApp: <a href="https://wa.me/34663474019">https://wa.me/34663474019</a></p>
    <p>¡Nos vemos pronto!<br/>Micaela<br/><strong>MIC AI Studio</strong><br/><a href="https://micaistudio.com">micaistudio.com</a></p>
  </div>`;
  return { subject, text, html };
}

function contactEmail(params: { name: string }) {
  const { name } = params;
  const subject = "¡Hemos recibido tu mensaje en MIC AI Studio!";
  const text = `Hola ${name},

¡Gracias por contactarnos! 🙌

Hemos recibido correctamente tu mensaje y toda la información que nos enviaste.

¿Qué pasa ahora?
En menos de 24 horas nos pondremos en contacto contigo para responder tus preguntas y ver cómo podemos ayudarte con tu proyecto.

Si tienes algo urgente, escríbenos directamente:
👉 https://wa.me/34663474019

¿Tienes alguna pregunta? Escríbenos a micaistudio1@gmail.com o por WhatsApp: https://wa.me/34663474019

Nos vemos pronto,
Micaela
MIC AI Studio`;
  const html = `<div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.6;max-width:560px;margin:0 auto;padding:24px">
    <p>Hola ${escapeHtml(name)},</p>
    <p>¡Gracias por contactarnos! 🙌</p>
    <p>Hemos recibido correctamente tu mensaje y toda la información que nos enviaste.</p>
    <p><strong>¿Qué pasa ahora?</strong><br/>En menos de 24 horas nos pondremos en contacto contigo para responder tus preguntas y ver cómo podemos ayudarte con tu proyecto.</p>
    <p>Si tienes algo urgente, escríbenos directamente:<br/>
    👉 <a href="https://wa.me/34663474019">https://wa.me/34663474019</a></p>
    <p style="border-top:1px solid #eee;padding-top:14px;color:#555">¿Tienes alguna pregunta? Escríbenos a <a href="mailto:micaistudio1@gmail.com">micaistudio1@gmail.com</a> o por WhatsApp: <a href="https://wa.me/34663474019">https://wa.me/34663474019</a></p>
    <p>Nos vemos pronto,<br/>Micaela<br/><strong>MIC AI Studio</strong></p>
  </div>`;
  return { subject, text, html };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return new Response(JSON.stringify({ error: "missing_api_key" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { type, to } = body as { type: "discount" | "purchase" | "contact"; to: string };
    if (!to || !type) {
      return new Response(JSON.stringify({ error: "invalid_payload" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let payload;
    if (type === "discount") payload = discountEmail();
    else if (type === "purchase") {
      payload = purchaseEmail({
        name: body.name || "",
        plan: body.plan || "",
        status: body.status || "",
        date: body.date || new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" }),
      });
    } else if (type === "contact") {
      payload = contactEmail({ name: body.name || "" });
    } else {
      return new Response(JSON.stringify({ error: "unknown_type" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [to], subject: payload.subject, text: payload.text, html: payload.html }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Resend error", res.status, data);
      return new Response(JSON.stringify({ error: "send_failed", details: data }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: data?.id ?? null }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-email error", err);
    return new Response(JSON.stringify({ error: "internal" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
