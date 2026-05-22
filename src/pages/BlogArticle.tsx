import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getBlogCoverImage } from "@/lib/blogCoverImages";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  category: string;
  published_at: string;
  cover_image: string | null;
};

const articleSeoMap: Record<string, { keyword: string; secondary: string[] }> = {
  "que-es-la-ia-generativa-y-como-esta-cambiando-la-fotografia-de-producto": { keyword: "IA generativa fotografía producto", secondary: ["fotografía de producto IA", "inteligencia artificial imágenes"] },
  "como-crear-fotografia-publicitaria-profesional-sin-estudio-fotografico": { keyword: "fotografía publicitaria sin estudio", secondary: ["fotografía publicitaria IA", "fotos profesionales sin fotógrafo"] },
  "herramientas-de-ia-generativa-para-crear-imagenes-de-producto-en-2026": { keyword: "herramientas IA imágenes producto 2026", secondary: ["Midjourney producto", "herramientas IA marketing visual"] },
  "fotografia-de-producto-sin-sesion-fotografica-la-guia-completa-con-ia": { keyword: "fotografía de producto sin sesión fotográfica", secondary: ["foto producto IA", "fotografía ecommerce sin fotógrafo"] },
  "como-usar-ia-generativa-para-crear-fotos-profesionales-de-tu-marca": { keyword: "fotos profesionales marca con IA", secondary: ["fotos profesionales IA", "imágenes marca pequeña empresa"] },
  "animacion-de-imagenes-con-ia-como-darle-vida-a-tu-contenido-visual": { keyword: "animación de imágenes con IA", secondary: ["animación digital IA", "animar imágenes inteligencia artificial"] },
  "ia-generativa-para-marketing-visual-todo-lo-que-necesitas-saber": { keyword: "IA generativa marketing visual", secondary: ["marketing visual inteligencia artificial", "contenido visual IA"] },
  "como-crear-carteles-publicitarios-con-inteligencia-artificial-en-minutos": { keyword: "carteles publicitarios con IA", secondary: ["afiches publicitarios IA", "carteles digitales inteligencia artificial"] },
  "fotografia-de-producto-para-e-commerce-sin-presupuesto-de-agencia": { keyword: "fotografía producto ecommerce sin agencia", secondary: ["foto producto ecommerce", "fotografía ecommerce Chile España"] },
  "como-mejorar-la-imagen-de-marca-de-tu-pyme-con-ia-generativa": { keyword: "mejorar imagen de marca PYME IA", secondary: ["imagen de marca PYME", "identidad visual pequeña empresa IA"] },
  "afiches-publicitarios-con-ia-para-pymes-chilenas-guia-practica": { keyword: "afiches publicitarios IA PYMEs Chile", secondary: ["afiches publicitarios Chile", "propaganda IA pequeña empresa"] },
  "fotos-profesionales-para-redes-sociales-sin-contratar-un-fotografo": { keyword: "fotos profesionales redes sociales sin fotógrafo", secondary: ["fotos redes sociales IA", "imágenes Instagram profesionales"] },
  "publicidad-de-producto-en-instagram-con-imagenes-generadas-con-ia": { keyword: "publicidad de producto Instagram IA", secondary: ["publicidad producto redes sociales", "imágenes publicitarias IA"] },
  "estrategia-de-contenido-visual-para-e-commerce-en-chile-y-espana": { keyword: "estrategia contenido visual ecommerce Chile España", secondary: ["contenido visual ecommerce", "marketing visual tienda online"] },
  "como-crear-una-campana-visual-completa-sin-agencia-de-publicidad": { keyword: "campaña visual sin agencia publicidad", secondary: ["campaña publicitaria IA", "campaña visual pequeña empresa"] },
  "que-es-un-estudio-creativo-con-ia-y-por-que-tu-marca-lo-necesita": { keyword: "estudio creativo con IA", secondary: ["estudio creativo inteligencia artificial", "agencia IA contenido"] },
  "direccion-de-arte-con-ia-generativa-creatividad-con-criterio-estrategico": { keyword: "dirección de arte IA generativa", secondary: ["dirección de arte inteligencia artificial", "arte IA marcas"] },
  "como-producir-videos-cortos-para-redes-sociales-con-ia-generativa": { keyword: "videos cortos redes sociales IA", secondary: ["videos IA redes sociales", "reels con inteligencia artificial"] },
  "animacion-digital-para-redes-sociales-como-hacerlo-con-ia": { keyword: "animación digital redes sociales IA", secondary: ["animación digital IA", "animaciones para Instagram TikTok"] },
  "produccion-audiovisual-con-ia-rapida-profesional-y-sin-equipo-tecnico": { keyword: "producción audiovisual con IA", secondary: ["producción contenido IA Chile", "audiovisual inteligencia artificial"] },
  "como-crear-campanas-publicitarias-completas-con-inteligencia-artificial": { keyword: "campañas publicitarias inteligencia artificial", secondary: ["campaña completa IA", "publicidad digital inteligencia artificial"] },
  "tendencias-de-marketing-visual-para-pymes-en-2026": { keyword: "tendencias marketing visual PYMEs 2026", secondary: ["marketing visual 2026", "tendencias contenido digital 2026"] },
  "el-futuro-de-la-fotografia-publicitaria-en-la-era-de-la-ia": { keyword: "futuro fotografía publicitaria IA", secondary: ["fotografía publicitaria futuro", "IA fotografía comercial"] },
  "como-esta-cambiando-la-publicidad-digital-con-inteligencia-artificial": { keyword: "publicidad digital inteligencia artificial cambios", secondary: ["publicidad digital IA", "marketing digital inteligencia artificial"] },
  "ia-generativa-en-agencias-creativas-el-nuevo-estandar-del-sector": { keyword: "IA generativa agencias creativas", secondary: ["agencias creativas IA", "estudio creativo inteligencia artificial"] },
  "por-que-las-marcas-que-no-usan-ia-en-su-contenido-visual-estan-perdiendo-clientes": { keyword: "marcas sin IA contenido visual pierden clientes", secondary: ["contenido visual IA ventas", "marketing IA resultados"] },
  "antes-y-despues-como-transformamos-la-fotografia-de-producto-con-ia": { keyword: "antes después fotografía producto IA", secondary: ["resultados fotografía IA", "casos reales IA fotografía"] },
  "casos-reales-de-marcas-que-mejoraron-sus-ventas-con-contenido-visual-ia": { keyword: "casos reales marcas contenido visual IA", secondary: ["marcas IA resultados", "contenido visual IA ventas reales"] },
  "resultados-reales-de-usar-ia-generativa-en-fotografia-publicitaria": { keyword: "resultados IA fotografía publicitaria", secondary: ["resultados fotografía IA", "casos reales IA fotografía"] },
  "de-brief-a-campana-completa-asi-trabaja-mic-ai-studio": { keyword: "MIC AI Studio cómo trabaja campaña completa", secondary: ["estudio creativo IA Chile España", "MIC AI Studio servicios"] },
};

const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (data) setArticle(data as Article);
      setLoading(false);
    };
    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!article) return;
    const seo = articleSeoMap[article.slug];
    const keywordsList = seo ? [seo.keyword, ...seo.secondary].join(", ") : "";
    document.title = `${article.title} | MIC AI Studio`;
    setMeta("description", article.description);
    if (keywordsList) setMeta("keywords", keywordsList);
    setMeta("og:title", article.title, "property");
    setMeta("og:description", article.description, "property");
    setMeta("og:type", "article", "property");
    setMeta("og:url", `https://micaistudio.com/blog/${article.slug}`, "property");
    return () => {
      document.title = "MIC AI Studio";
    };
  }, [article]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
          <div className="h-8 w-48 bg-secondary/30 rounded animate-pulse mb-6" />
          <div className="h-12 w-full bg-secondary/30 rounded animate-pulse mb-4" />
          <div className="h-4 w-32 bg-secondary/30 rounded animate-pulse mb-12" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 w-full bg-secondary/30 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 pt-28 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Artículo no encontrado</h1>
          <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors underline">
            Volver al blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <article className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Volver al blog
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block text-[11px] font-medium tracking-wide uppercase text-muted-foreground border border-border rounded-full px-3 py-1 mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            {article.title}
          </h1>
          <time className="text-sm text-muted-foreground block mb-8">
            {new Date(article.published_at).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {getBlogCoverImage(article) && (
            <img
              src={getBlogCoverImage(article)!}
              alt={article.title}
              width={1344}
              height={768}
              className="w-full rounded-2xl mb-12 aspect-video object-cover"
            />
          )}

          <div
            className="prose prose-invert prose-lg max-w-none [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-6 [&>h2]:text-foreground [&>h2]:font-bold [&>h2]:text-2xl [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-foreground [&>h3]:font-semibold [&>h3]:text-xl [&>h3]:mt-6 [&>h3]:mb-3 [&>ul]:text-muted-foreground [&>ol]:text-muted-foreground [&>strong]:text-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogArticle;
