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
];

const FAQ = () => {
  return (
    <section className="bg-background text-foreground py-16 md:py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-foreground mb-6 md:mb-8 text-center">
          Preguntas frecuentes
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
              <AccordionTrigger className="text-left text-sm md:text-base font-normal text-white px-5 md:px-6 py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-white/70 leading-relaxed px-5 md:px-6 pb-5">
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
