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
  }, [slug]);

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
