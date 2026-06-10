import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Search, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const scrollToPlanes = (e: React.MouseEvent) => {
  e.preventDefault();
  const el = document.getElementById("planes");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.hash = "#planes";
  }
};

const PlanesLink = ({ children = "Ver planes →" }: { children?: ReactNode }) => (
  <a
    href="#planes"
    onClick={scrollToPlanes}
    className="inline-block mt-3 text-white underline underline-offset-4 hover:text-white/80 transition-colors"
  >
    {children}
  </a>
);

const WhatsAppLink = ({ children = "Hablar con nosotros →" }: { children?: ReactNode }) => (
  <a
    href="https://wa.me/34663474019"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-3 text-white underline underline-offset-4 hover:text-white/80 transition-colors"
  >
    {children}
  </a>
);

type Faq = { id: string; question: string; answer: ReactNode };
type Category = { title: string; faqs: Faq[] };

const categories: Category[] = [
  {
    title: "Tiempos y entregas",
    faqs: [
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
    ],
  },
  {
    title: "Nuestros servicios",
    faqs: [
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
      {
        id: "faq-movil",
        question:
          "¿Puedo enviarles una foto que tomé con el móvil y que la conviertan en algo profesional?",
        answer:
          "Sí, es uno de nuestros servicios más solicitados. Puedes enviarnos tu foto de móvil y la transformamos en una imagen de calidad profesional, con iluminación, composición y acabados de estudio. Solo necesitamos la foto y una referencia del estilo que buscas.",
      },
      {
        id: "faq-animaciones",
        question:
          "¿Pueden crearse animaciones y vídeos cortos para redes sociales con IA?",
        answer:
          "Sí. Creamos animaciones y vídeos cortos optimizados para Reels, TikTok y Stories usando herramientas de IA generativa de video. Los entregamos en el formato y ratio adecuado para cada plataforma.",
      },
      {
        id: "faq-campana",
        question: "¿Cómo crear una campaña publicitaria completa con IA generativa?",
        answer:
          "Nos encargamos de todo el proceso: concepto creativo, imágenes, copies, adaptaciones por formato y si lo necesitas, animaciones. Puedes ver ejemplos de campañas completas en nuestra sección de portfolio.",
      },
      {
        id: "faq-uniformidad",
        question:
          "¿Cómo evitar la uniformidad visual cuando se usa IA para crear contenido de marca?",
        answer:
          "Esta es una preocupación muy válida. En MIC AI Studio trabajamos con dirección de arte humana sobre cada pieza — no solo ejecutamos prompts. Definimos paleta, estilo, composición y coherencia de marca para que tu contenido tenga identidad propia y no parezca generado en masa.",
      },
    ],
  },
  {
    title: "Precios y presupuesto",
    faqs: [
      {
        id: "faq-precio-ia",
        question:
          "¿Cuánto cuesta hacer fotos de producto con inteligencia artificial? ¿Es realmente más barato que contratar un estudio?",
        answer: (
          <>
            Sí, en la mayoría de los casos es significativamente más económico que un estudio fotográfico tradicional. Nuestros planes empiezan desde 250€ e incluyen varias creatividades. El precio final depende del número de imágenes, tipo de producto y si incluyes animaciones. Puedes ver nuestros planes en la sección de precios o contactarnos para un presupuesto personalizado.
            <br />
            <PlanesLink />
          </>
        ),
      },
      {
        id: "faq-pyme-chile",
        question:
          "Tengo una pyme en Chile y no tengo presupuesto para fotógrafo ni agencia. ¿Cómo puedo tener fotos y campañas de calidad?",
        answer: (
          <>
            Precisamente para eso existe MIC AI Studio. Ofrecemos soluciones visuales de calidad profesional pensadas para pymes y emprendedores con presupuestos ajustados. Contáctanos y te armamos una propuesta a tu medida.
            <br />
            <WhatsAppLink>Hablar con nosotros →</WhatsAppLink>
          </>
        ),
      },
      {
        id: "faq-precio-espana",
        question: "¿Cuánto cuesta la fotografía de producto con IA en España en 2026?",
        answer: (
          <>
            Nuestros precios en España parten desde 250€ para proyectos de imagen de producto con IA. El precio varía según el número de creatividades, si incluye animación y la complejidad del proyecto. Consulta nuestros planes o escríbenos para un presupuesto personalizado.
            <br />
            <PlanesLink />
          </>
        ),
      },
    ],
  },
  {
    title: "Contenido para redes sociales",
    faqs: [
      {
        id: "faq-redes",
        question:
          "Necesito contenido visual para mis redes sociales cada semana. ¿Puede la IA ayudarme a tener siempre imágenes nuevas sin tanto trabajo?",
        answer: (
          <>
            Sí. Ofrecemos planes de contenido recurrente donde nos encargamos de generar tus creatividades semanales o mensuales con coherencia de marca. Tú solo apruebas y publicas.
            <br />
            <PlanesLink>Ver planes de contenido →</PlanesLink>
          </>
        ),
      },
    ],
  },
  {
    title: "Confianza y legalidad",
    faqs: [
      {
        id: "faq-legal",
        question:
          "¿Las imágenes generadas con IA se pueden usar en publicidad sin problemas legales en España o Europa?",
        answer:
          "Sí, siempre que se generen con herramientas que cumplan la normativa vigente. En MIC AI Studio usamos plataformas que respetan el marco legal europeo (AI Act) y las políticas de uso comercial. Las imágenes que entregamos son de uso comercial libre para tu marca.",
      },
      {
        id: "faq-photoroom",
        question:
          "He probado Photoroom y Midjourney pero las fotos no convencen para mi marca. ¿Qué alternativa profesional existe?",
        answer:
          "La diferencia está en la dirección creativa. Herramientas como Photoroom o Midjourney son potentes, pero sin criterio de marca los resultados se ven genéricos. En MIC AI Studio combinamos IA con dirección de arte profesional para que cada imagen tenga intención, coherencia y calidad de campaña real.",
      },
      {
        id: "faq-chile-estudios",
        question:
          "¿En Chile hay estudios que hagan fotos de producto con inteligencia artificial o tengo que buscar en el extranjero?",
        answer:
          "MIC AI Studio opera tanto en Chile como en España, por lo que puedes contratarnos desde Chile con total comodidad. Trabajamos 100% en remoto y entregamos los archivos digitalmente. No necesitas buscar fuera.",
      },
    ],
  },
  {
    title: "Detalles de cada servicio",
    faqs: [
      {
        id: "faq-imagenes",
        question: "¿Qué incluye exactamente el servicio de imágenes con IA?",
        answer: (
          <>
            El servicio de imágenes con IA incluye:
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Imágenes de producto en alta resolución (mínimo 2048x2048px) — consideramos el producto real a partir de una foto básica que nos envíes como referencia</li>
              <li>Formato entregado: JPG y PNG con fondo transparente si se requiere</li>
              <li>Ratio disponibles: 1:1, 4:5, 9:16, 16:9 según necesidad</li>
              <li>Dirección de arte incluida (paleta, estilo, composición)</li>
              <li>Hasta 2 rondas de revisión por imagen</li>
              <li>Entrega de archivos por WeTransfer o Google Drive</li>
              <li>Modelos humanos generados con IA (no contratamos modelos reales)</li>
            </ul>
            <p className="mt-3">Solo necesitamos una foto básica de tu producto como referencia; el resto lo hacemos nosotros con inteligencia artificial y dirección de arte profesional.</p>
            <p className="mt-2">Tiempo estimado: 24-48h para proyectos de hasta 5 imágenes.</p>
          </>
        ),
      },
      {
        id: "faq-videos",
        question: "¿Qué incluye el servicio de videos con IA? ¿Cuánto duran los videos?",
        answer: (
          <>
            El servicio de videos con IA incluye:
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Duración estándar: 5 a 15 segundos por video (formato Reels/TikTok/Stories)</li>
              <li>Duración extendida: hasta 30 segundos (consultar disponibilidad)</li>
              <li>Formato: MP4 en alta calidad, ratio 9:16 para vertical o 16:9 para horizontal</li>
              <li>Resolución: 1080p mínimo</li>
              <li>Música de fondo: incluida (librería libre de derechos) — se puede solicitar sin música</li>
              <li>Voz en off: NO incluida en el plan estándar — disponible como servicio adicional</li>
              <li>Subtítulos: disponibles como servicio adicional</li>
              <li>Hasta 1 ronda de revisión por video</li>
              <li>No incluye: grabación de video real, actores, locaciones físicas</li>
            </ul>
            <p className="mt-3">Tiempo estimado: 3-5 días por video según complejidad.</p>
          </>
        ),
      },
      {
        id: "faq-campanas",
        question: "¿Qué incluye una campaña publicitaria completa con IA?",
        answer: (
          <>
            El servicio de campañas publicitarias incluye:
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Concepto creativo y estrategia visual de la campaña</li>
              <li>Pack de imágenes adaptadas a distintos formatos (feed, stories, banner)</li>
              <li>Copies sugeridos para cada pieza (opcional)</li>
              <li>Videos cortos de 5-15 segundos para activación en redes (según plan)</li>
              <li>Adaptación a múltiples ratios: 1:1, 4:5, 9:16, 16:9</li>
              <li>Coherencia de marca en todas las piezas</li>
              <li>Hasta 2 rondas de revisión general</li>
              <li>Entrega organizada por carpetas según formato y plataforma</li>
              <li>No incluye: gestión de pauta publicitaria, publicación en redes, community management</li>
            </ul>
            <p className="mt-3">Tiempo estimado: 5-10 días según el volumen de piezas.</p>
          </>
        ),
      },
      {
        id: "faq-branding",
        question: "¿Qué incluye el servicio de branding y contenido con IA?",
        answer: (
          <>
            El servicio de branding y contenido incluye:
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Pack de contenido visual para redes sociales (imágenes + videos cortos)</li>
              <li>Coherencia de marca: paleta de colores, estilo visual, tipografía</li>
              <li>Imágenes para feed de Instagram/LinkedIn adaptadas al estilo de la marca</li>
              <li>Videos de 5-15 segundos para Reels o Stories</li>
              <li>Música de fondo libre de derechos incluida en videos</li>
              <li>Voz en off: disponible como servicio adicional</li>
              <li>Formatos entregados: JPG, PNG, MP4</li>
              <li>Hasta 2 rondas de revisión</li>
              <li>No incluye: diseño de logo, diseño web, gestión de redes sociales</li>
            </ul>
            <p className="mt-3">Tiempo estimado: 5-7 días según el volumen acordado.</p>
          </>
        ),
      },
    ],
  },
  {
    title: "Atención y proceso de trabajo",
    faqs: [
      {
        id: "faq-horario",
        question: "¿Cuál es el horario de atención?",
        answer: (
          <>
            Atendemos consultas de lunes a viernes de 9:00 a 18:00 (hora España / hora Chile con ajuste horario). Respondemos mensajes de WhatsApp y email dentro de las 24 horas hábiles siguientes.
            <br />
            <WhatsAppLink>Escribirnos por WhatsApp →</WhatsAppLink>
          </>
        ),
      },
      {
        id: "faq-respuesta",
        question: "¿Cuánto tarda en responderse una consulta o presupuesto?",
        answer:
          "Respondemos todas las consultas en un máximo de 24 horas hábiles. Los presupuestos personalizados los enviamos en 24-48 horas tras recibir los detalles del proyecto.",
      },
      {
        id: "faq-proceso",
        question:
          "¿Cómo es el proceso de trabajo desde que contacto hasta que recibo mis creatividades?",
        answer:
          "El proceso es simple: 1) Nos contactas y nos cuentas tu proyecto. 2) Te enviamos un presupuesto en 24-48h. 3) Apruebas y comenzamos. 4) Te enviamos una primera propuesta para revisión. 5) Aplicamos cambios si los hay. 6) Entrega final de archivos. Todo el proceso se gestiona de forma remota y ágil.",
      },
    ],
  },
];

const allFaqs = categories.flatMap((c) => c.faqs);

const nodeToText = (node: ReactNode): string => {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join(" ");
  if (typeof node === "object" && "props" in (node as any)) {
    return nodeToText((node as any).props?.children);
  }
  return "";
};

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const FAQ = () => {
  const [openItem, setOpenItem] = useState<string>("");
  const [highlighted, setHighlighted] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (title: string) =>
    setExpandedCategories((prev) => ({ ...prev, [title]: !prev[title] }));

  const filteredCategories = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return categories;
    return categories
      .map((cat) => {
        const catMatch = normalize(cat.title).includes(q);
        const faqs = cat.faqs.filter((f) => {
          const haystack = normalize(
            `${cat.title} ${f.question} ${nodeToText(f.answer)}`
          );
          return haystack.includes(q);
        });
        if (catMatch && faqs.length === 0) return { ...cat, faqs: cat.faqs };
        return { ...cat, faqs };
      })
      .filter((c) => c.faqs.length > 0);
  }, [query]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const match = allFaqs.find((f) => f.id === hash);
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
        <h2 className="text-3xl md:text-4xl tracking-tight text-foreground mb-8 md:mb-10 text-center">
          Preguntas frecuentes.
        </h2>

        <div className="relative mb-10 md:mb-12 max-w-xl mx-auto">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca por palabra clave (ej. servicios, precios, videos...)"
            className="w-full rounded-full bg-black/40 border border-white/15 pl-10 pr-10 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-all focus:border-white/40 focus:[box-shadow:0_0_18px_rgba(255,255,255,0.25)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {filteredCategories.length === 0 ? (
          <p className="text-center text-white/50 text-sm py-8">
            No encontramos preguntas que coincidan con "{query}".
          </p>
        ) : (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={openItem}
            onValueChange={setOpenItem}
          >
            {filteredCategories.map((category, idx) => (
            <div key={category.title} className={idx === 0 ? "" : "mt-10"}>
              <div className="flex items-center gap-3 mb-4 px-1">
                <span
                  className="uppercase font-medium"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: "#666",
                  }}
                >
                  {category.title}
                </span>
                <span className="flex-1 h-px bg-white/10" />
              </div>

              <div className="space-y-3">
                {category.faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    id={faq.id}
                    value={faq.id}
                    className="border-0 rounded-2xl bg-black/40 backdrop-blur-sm transition-all duration-300 hover:[box-shadow:0_0_18px_rgba(255,255,255,0.55),0_0_36px_rgba(255,255,255,0.3),0_0_54px_rgba(255,255,255,0.15)] scroll-mt-24"
                    style={{
                      border:
                        highlighted === faq.id
                          ? "1px solid rgba(255,255,255,0.9)"
                          : "1px solid rgba(255,255,255,0.4)",
                      boxShadow:
                        highlighted === faq.id
                          ? "0 0 24px rgba(255,255,255,0.7), 0 0 48px rgba(255,255,255,0.35), 0 0 72px rgba(255,255,255,0.2)"
                          : "0 0 12px rgba(255,255,255,0.35), 0 0 24px rgba(255,255,255,0.18), 0 0 36px rgba(255,255,255,0.08)",
                    }}
                  >
                    <AccordionTrigger className="text-left text-base md:text-lg font-medium text-white px-5 md:px-6 py-4 hover:no-underline [&>svg]:text-white/70">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent
                      className="text-sm md:text-[15px] font-normal leading-relaxed px-5 md:px-6 pt-4 pb-5 mt-1 border-t border-white/10"
                      style={{ color: "#a0a0a0" }}
                    >
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            </div>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
};

export default FAQ;
