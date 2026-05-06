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
    <section className="bg-background text-foreground py-20 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-12 md:mb-16">
          Preguntas frecuentes
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-border"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl font-medium py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-muted-foreground leading-relaxed pb-6">
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
