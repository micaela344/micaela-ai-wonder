import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question:
      "Tengo una marca y mis fotos de producto se ven muy caseras. ¿Cómo puedo tener imágenes profesionales sin contratar un fotógrafo?",
    answer:
      "Con inteligencia artificial generativa y dirección de arte, transformamos cualquier foto de tu producto — incluso tomada con el móvil — en una imagen de campaña profesional. Sin estudio, sin fotógrafo, sin esperas de semanas. En MIC AI Studio recibimos tu imagen de referencia, aplicamos criterio creativo y te entregamos imágenes listas para usar en redes sociales, ecommerce o publicidad. El resultado es indistinguible de una producción tradicional — y el proceso es hasta un 70% más económico.",
  },
  {
    question:
      "¿Qué diferencia hay entre usar una app de IA como Canva o Midjourney y contratar un estudio creativo con IA?",
    answer:
      "Las apps generan imágenes, pero no tienen criterio. No conocen tu marca, tu tono ni tu cliente. En MIC AI Studio hay una directora creativa detrás de cada proyecto que decide qué funciona y qué no — elige los encuadres, ajusta la estética, cuida la coherencia visual. La diferencia entre usar una app y contratarnos es la misma que entre imprimir una foto y encargar una campaña. El resultado no se parece en nada.",
  },
  {
    question:
      "¿Las imágenes creadas con IA se ven artificiales o parecen fotos reales?",
    answer:
      "Depende completamente de quién las produce. Una app sola puede generar resultados inconsistentes — proporciones extrañas, texturas incorrectas, fondos que no convencen. Con dirección de arte humana aplicada al proceso, el resultado es fotorrealista e indistinguible de una producción tradicional. De hecho, muchas de las imágenes que ves en campañas de grandes marcas ya están generadas con IA. En MIC AI Studio ninguna imagen sale sin pasar por criterio creativo — esa es nuestra garantía de calidad.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-background text-foreground py-16 md:py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl tracking-tight text-foreground mb-10 md:mb-14 text-center">
          Preguntas frecuentes.
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-0 rounded-2xl bg-black/40 backdrop-blur-sm transition-all duration-300 hover:[box-shadow:0_0_18px_rgba(255,255,255,0.55),0_0_36px_rgba(255,255,255,0.3),0_0_54px_rgba(255,255,255,0.15)]"
              style={{
                border: "1px solid rgba(255,255,255,0.4)",
                boxShadow:
                  "0 0 12px rgba(255,255,255,0.35), 0 0 24px rgba(255,255,255,0.18), 0 0 36px rgba(255,255,255,0.08)",
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
