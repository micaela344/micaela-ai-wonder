import iaGenerativaMarketingVisual from "@/assets/blog/ia-generativa-marketing-visual.jpg";
import cartelesPublicitariosIa from "@/assets/blog/carteles-publicitarios-ia.jpg";
import fotografiaProductoEcommerce from "@/assets/blog/fotografia-producto-ecommerce.jpg";
import imagenMarcaPymeIa from "@/assets/blog/imagen-marca-pyme-ia.jpg";
import afichesPublicitariosIaPymesChile from "@/assets/blog/afiches-publicitarios-ia-pymes-chile.jpg";
import fotosProfesionalesRedesSociales from "@/assets/blog/fotos-profesionales-redes-sociales.jpg";
import publicidadProductoInstagramIa from "@/assets/blog/publicidad-producto-instagram-ia.jpg";
import estrategiaContenidoVisualEcommerce from "@/assets/blog/estrategia-contenido-visual-ecommerce.jpg";
import campanaVisualSinAgencia from "@/assets/blog/campana-visual-sin-agencia.jpg";
import estudioCreativoIa from "@/assets/blog/estudio-creativo-ia.jpg";
import direccionArteIaGenerativa from "@/assets/blog/direccion-arte-ia-generativa.jpg";
import videosCortosRedesSocialesIa from "@/assets/blog/videos-cortos-redes-sociales-ia.jpg";
import animacionDigitalRedesSocialesIa from "@/assets/blog/animacion-digital-redes-sociales-ia.jpg";

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
  "publicidad-producto-instagram-ia-1777446033081": publicidadProductoInstagramIa,
  "estrategia-contenido-visual-ecommerce-chile-espana-1777532425822": estrategiaContenidoVisualEcommerce,
  "como-crear-una-campana-visual-completa-sin-agencia-de-publicidad-1777618832393": campanaVisualSinAgencia,
  "que-es-un-estudio-creativo-con-ia-y-por-que-tu-marca-lo-necesita-1777705257177": estudioCreativoIa,
  "direccion-de-arte-con-ia-generativa-creatividad-con-criterio-estrategico-1777791630707": direccionArteIaGenerativa,
  "como-producir-videos-cortos-para-redes-sociales-con-ia-generativa-1777878027949": videosCortosRedesSocialesIa,
  "animacion-digital-redes-sociales-ia-1777964426278": animacionDigitalRedesSocialesIa,
};

export const getBlogCoverImage = (article: ArticleCoverSource) => {
  const storedCover = article.cover_image?.trim();
  return storedCover || fallbackCoversBySlug[article.slug] || null;
};
