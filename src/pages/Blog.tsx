import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Article = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  published_at: string;
  cover_image: string | null;
};

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from("articles")
        .select("id, title, slug, description, category, published_at, cover_image")
        .order("published_at", { ascending: false });
      if (data) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
        >
          Blog
        </motion.h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
          Ideas, tendencias y casos de uso sobre IA generativa y contenido visual.
        </p>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-border bg-secondary/30 h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/blog/${article.slug}`}
                  className="group block rounded-2xl border border-border bg-secondary/20 overflow-hidden h-full hover:border-foreground/30 transition-colors duration-300"
                >
                  {article.cover_image && (
                    <div className="w-full aspect-video overflow-hidden">
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="inline-block text-[11px] font-medium tracking-wide uppercase text-muted-foreground border border-border rounded-full px-3 py-1 mb-4">
                      {article.category}
                    </span>
                    <h2 className="text-lg font-semibold leading-snug mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                      {article.description}
                    </p>
                    <time className="text-xs text-muted-foreground">
                      {new Date(article.published_at).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
