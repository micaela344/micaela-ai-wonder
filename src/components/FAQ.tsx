import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "faq-entrega",
    question: "¿La entrega realmente es en 3-7 días?",
    answer: (
      <>
        El plazo de 3 a 7 días es una estimación orientativa para proyectos estándar. El tiempo de entrega final depende de varios factores:
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Tipo de trabajo solicitado (imágenes, videos o campañas completas)</li>
          <li>Cantidad de creatividades incluidas en el proyecto</li>
          <li>Complejidad y duración de las animaciones</li>
          <li>Número de revisiones solicitadas</li>
          <li>Tiempo de respuesta del cliente para aprobar materiales</li>
        </ul>
        <p className="mt-3">
          Para proyectos simples (1–3 imágenes), el plazo suele ser de 24–48 horas. En proyectos más complejos o campañas completas con video, el tiempo de entrega puede extenderse según el alcance y los requerimientos específicos del proyecto. Siempre comunicamos el plazo estimado exacto antes de comenzar.
        </p>
      </>
    ),
  },
  {
    id: "faq-0",
    question:
      "Tengo una marca y mis fotos de producto se ven muy caseras. ¿Cómo puedo tener imágenes profesionales sin contratar un fotógrafo?",
    answer:
      "Con inteligencia artificial generativa y dirección de arte, transformamos cualquier foto de tu producto — incluso tomada con el móvil — en una imagen de campaña profesional. Sin estudio, sin fotógrafo, sin esperas de semanas. En MIC AI Studio recibimos tu imagen de referencia, aplicamos criterio creativo y te entregamos imágenes listas para usar en redes sociales, ecommerce o publicidad. El resultado es indistinguible de una producción tradicional — y el proceso es hasta un 70% más económico.",
  },
  {
    id: "faq-1",
    question:
      "¿Qué diferencia hay entre usar una app de IA como Canva o Midjourney y contratar un estudio creativo con IA?",
    answer:
      "Las apps generan imágenes, pero no tienen criterio. No conocen tu marca, tu tono ni tu cliente. En MIC AI Studio hay una directora creativa detrás de cada proyecto que decide qué funciona y qué no — elige los encuadres, ajusta la estética, cuida la coherencia visual. La diferencia entre usar una app y contratarnos es la misma que entre imprimir una foto y encargar una campaña. El resultado no se parece en nada.",
  },
  {
    id: "faq-2",
    question:
      "¿Las imágenes creadas con IA se ven artificiales o parecen fotos reales?",
    answer:
      "Depende completamente de quién las produce. Una app sola puede generar resultados inconsistentes — proporciones extrañas, texturas incorrectas, fondos que no convencen. Con dirección de arte humana aplicada al proceso, el resultado es fotorrealista e indistinguible de una producción tradicional. De hecho, muchas de las imágenes que ves en campañas de grandes marcas ya están generadas con IA. En MIC AI Studio ninguna imagen sale sin pasar por criterio creativo — esa es nuestra garantía de calidad.",
  },
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState<string>("");
  const [highlighted, setHighlighted] = useState<string>("");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const match = faqs.find((f) => f.id === hash);
      if (match) {
        setOpenItem(match.id);
        setHighlighted(match.id);
        setTimeout(() => {
          document.getElementById(match.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);
        setTimeout(() => setHighlighted(""), 2400);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <section className="bg-background text-foreground py-16 md:py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl tracking-tight text-foreground mb-10 md:mb-14 text-center">
          Preguntas frecuentes.
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-3"
          value={openItem}
          onValueChange={setOpenItem}
        >
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              id={faq.id}
              value={faq.id}
              className="border-0 rounded-2xl bg-black/40 backdrop-blur-sm transition-all duration-300 hover:[box-shadow:0_0_18px_rgba(255,255,255,0.55),0_0_36px_rgba(255,255,255,0.3),0_0_54px_rgba(255,255,255,0.15)] scroll-mt-24"
              style={{
                border: highlighted === faq.id ? "1px solid rgba(255,255,255,0.9)" : "1px solid rgba(255,255,255,0.4)",
                boxShadow:
                  highlighted === faq.id
                    ? "0 0 24px rgba(255,255,255,0.7), 0 0 48px rgba(255,255,255,0.35), 0 0 72px rgba(255,255,255,0.2)"
                    : "0 0 12px rgba(255,255,255,0.35), 0 0 24px rgba(255,255,255,0.18), 0 0 36px rgba(255,255,255,0.08)",
              }}
            >
              <AccordionTrigger className="text-left text-base md:text-lg font-medium text-white px-5 md:px-6 py-4 hover:no-underline [&>svg]:text-white/70">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-[15px] font-normal leading-relaxed px-5 md:px-6 pt-4 pb-5 mt-1 border-t border-white/10" style={{ color: '#a0a0a0' }}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
