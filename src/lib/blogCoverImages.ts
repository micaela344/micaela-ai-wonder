import iaGenerativaMarketingVisual from "@/assets/blog/ia-generativa-marketing-visual.jpg";
import cartelesPublicitariosIa from "@/assets/blog/carteles-publicitarios-ia.jpg";
import fotografiaProductoEcommerce from "@/assets/blog/fotografia-producto-ecommerce.jpg";
import imagenMarcaPymeIa from "@/assets/blog/imagen-marca-pyme-ia.jpg";
import afichesPublicitariosIaPymesChile from "@/assets/blog/afiches-publicitarios-ia-pymes-chile.jpg";
import fotosProfesionalesRedesSociales from "@/assets/blog/fotos-profesionales-redes-sociales.jpg";

type ArticleCoverSource = {
  slug: string;
  cover_image?: string | null;
};

const fallbackCoversBySlug: Record<string, string> = {
  "ia-generativa-para-marketing-visual-todo-lo-que-necesitas-saber-1776927632422": iaGenerativaMarketingVisual,
  "como-crear-carteles-publicitarios-con-inteligencia-artificial-en-minutos-1777014029225": cartelesPublicitariosIa,
  "fotografia-producto-ecommerce-sin-agencia-1777100429418": fotografiaProductoEcommerce,
  "mejorar-imagen-de-marca-pyme-ia-generativa-1777186825368": imagenMarcaPymeIa,
  "afiches-publicitarios-ia-pymes-chile-1777273231317": afichesPublicitariosIaPymesChile,
  "fotos-profesionales-redes-sociales-sin-contratar-un-fotografo-1777359633740": fotosProfesionalesRedesSociales,
};

export const getBlogCoverImage = (article: ArticleCoverSource) => {
  const storedCover = article.cover_image?.trim();
  return storedCover || fallbackCoversBySlug[article.slug] || null;
};