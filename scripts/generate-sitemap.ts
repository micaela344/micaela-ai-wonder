// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://micaistudio.com";
const SUPABASE_URL = "https://cbwafgtvrypgnarmwwam.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNid2FmZ3R2cnlwZ25hcm13d2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NTczNzUsImV4cCI6MjA5NDQzMzM3NX0.Pd1OBsPHvrsZSnbk1yZ_Bu8Gzed5GaVQApUQJRkR3gI";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/servicios/imagenes-ia", changefreq: "monthly", priority: "0.9" },
  { path: "/servicios/videos-ia", changefreq: "monthly", priority: "0.9" },
  { path: "/servicios/campanas", changefreq: "monthly", priority: "0.9" },
  { path: "/servicios/branding", changefreq: "monthly", priority: "0.9" },
  { path: "/produccion-visual/ejemplos", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/politica-de-cookies", changefreq: "yearly", priority: "0.3" },
];

async function fetchArticles(): Promise<SitemapEntry[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?select=slug,published_at&order=published_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    if (!res.ok) {
      console.warn(`Could not fetch articles for sitemap (status ${res.status})`);
      return [];
    }
    const articles = (await res.json()) as { slug: string; published_at: string }[];
    return articles.map((a) => ({
      path: `/blog/${a.slug}`,
      lastmod: a.published_at.split("T")[0],
      changefreq: "monthly" as const,
      priority: "0.7",
    }));
  } catch (err) {
    console.warn("Error fetching articles for sitemap:", err);
    return [];
  }
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n")
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

(async () => {
  const articleEntries = await fetchArticles();
  const entries = [...staticEntries, ...articleEntries];
  writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
  console.log(`sitemap.xml written (${entries.length} entries)`);
})();
