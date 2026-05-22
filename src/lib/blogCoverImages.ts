import iaGenerativaMarketingVisual from "@/assets/blog/ia-generativa-marketing-visual.webp";
import cartelesPublicitariosIa from "@/assets/blog/carteles-publicitarios-ia.webp";
import fotografiaProductoEcommerce from "@/assets/blog/fotografia-producto-ecommerce.webp";
import imagenMarcaPymeIa from "@/assets/blog/imagen-marca-pyme-ia.webp";
import afichesPublicitariosIaPymesChile from "@/assets/blog/afiches-publicitarios-ia-pymes-chile.webp";
import fotosProfesionalesRedesSociales from "@/assets/blog/fotos-profesionales-redes-sociales.webp";
import publicidadProductoInstagramIa from "@/assets/blog/publicidad-producto-instagram-ia.webp";
import estrategiaContenidoVisualEcommerce from "@/assets/blog/estrategia-contenido-visual-ecommerce.webp";
import campanaVisualSinAgencia from "@/assets/blog/campana-visual-sin-agencia.webp";
import estudioCreativoIa from "@/assets/blog/estudio-creativo-ia.webp";
import direccionArteIaGenerativa from "@/assets/blog/direccion-arte-ia-generativa.webp";
import videosCortosRedesSocialesIa from "@/assets/blog/videos-cortos-redes-sociales-ia.webp";
import animacionDigitalRedesSocialesIa from "@/assets/blog/animacion-digital-redes-sociales-ia.webp";
import produccionAudiovisualIa from "@/assets/blog/produccion-audiovisual-ia.webp";
import campanasPublicitariasIa from "@/assets/blog/campanas-publicitarias-ia.webp";
import tendenciasMarketingPymes2026 from "@/assets/blog/tendencias-marketing-pymes-2026.webp";
import futuroFotografiaPublicitariaIa from "@/assets/blog/futuro-fotografia-publicitaria-ia.webp";
import publicidadDigitalIa from "@/assets/blog/publicidad-digital-ia.webp";
import iaGenerativaAgenciasCreativas from "@/assets/blog/ia-generativa-agencias-creativas.webp";
import marcasSinIaPierdenClientes from "@/assets/blog/marcas-sin-ia-pierden-clientes.webp";
import queEsIaGenerativaFotografiaProducto from "@/assets/blog/que-es-la-ia-generativa-fotografia-producto.webp";
import fotografiaPublicitariaSinEstudio from "@/assets/blog/fotografia-publicitaria-sin-estudio.webp";
import herramientasIaImagenesProducto2026 from "@/assets/blog/herramientas-ia-imagenes-producto-2026.webp";
import fotografiaProductoSinSesion from "@/assets/blog/fotografia-producto-sin-sesion.webp";
import fotosProfesionalesMarcaIa from "@/assets/blog/fotos-profesionales-marca-ia.webp";
import animacionImagenesIa from "@/assets/blog/animacion-imagenes-ia.webp";
import antesDespuesFotografiaProductoIa from "@/assets/blog/antes-despues-fotografia-producto-ia.webp";
import casosRealesMarcasContenidoVisualIa from "@/assets/blog/casos-reales-marcas-contenido-visual-ia.webp";
import resultadosIaFotografiaPublicitaria from "@/assets/blog/resultados-ia-fotografia-publicitaria.webp";
import micAiStudioBriefCampana from "@/assets/blog/mic-ai-studio-brief-campana.webp";

type ArticleCoverSource = {
  slug: string;
  cover_image?: string | null;
};

const fallbackCoversBySlug: Record<string, string> = {
  "que-es-la-ia-generativa-y-como-esta-cambiando-la-fotografia-de-producto": queEsIaGenerativaFotografiaProducto,
  "como-crear-fotografia-publicitaria-profesional-sin-estudio-fotografico": fotografiaPublicitariaSinEstudio,
  "herramientas-de-ia-generativa-para-crear-imagenes-de-producto-en-2026": herramientasIaImagenesProducto2026,
  "fotografia-de-producto-sin-sesion-fotografica-la-guia-completa-con-ia": fotografiaProductoSinSesion,
  "como-usar-ia-generativa-para-crear-fotos-profesionales-de-tu-marca": fotosProfesionalesMarcaIa,
  "animacion-de-imagenes-con-ia-como-darle-vida-a-tu-contenido-visual": animacionImagenesIa,
  "ia-generativa-para-marketing-visual-todo-lo-que-necesitas-saber": iaGenerativaMarketingVisual,
  "como-crear-carteles-publicitarios-con-inteligencia-artificial-en-minutos": cartelesPublicitariosIa,
  "fotografia-de-producto-para-e-commerce-sin-presupuesto-de-agencia": fotografiaProductoEcommerce,
  "como-mejorar-la-imagen-de-marca-de-tu-pyme-con-ia-generativa": imagenMarcaPymeIa,
  "afiches-publicitarios-con-ia-para-pymes-chilenas-guia-practica": afichesPublicitariosIaPymesChile,
  "fotos-profesionales-para-redes-sociales-sin-contratar-un-fotografo": fotosProfesionalesRedesSociales,
  "publicidad-de-producto-en-instagram-con-imagenes-generadas-con-ia": publicidadProductoInstagramIa,
  "estrategia-de-contenido-visual-para-e-commerce-en-chile-y-espana": estrategiaContenidoVisualEcommerce,
  "como-crear-una-campana-visual-completa-sin-agencia-de-publicidad": campanaVisualSinAgencia,
  "que-es-un-estudio-creativo-con-ia-y-por-que-tu-marca-lo-necesita": estudioCreativoIa,
  "direccion-de-arte-con-ia-generativa-creatividad-con-criterio-estrategico": direccionArteIaGenerativa,
  "como-producir-videos-cortos-para-redes-sociales-con-ia-generativa": videosCortosRedesSocialesIa,
  "animacion-digital-para-redes-sociales-como-hacerlo-con-ia": animacionDigitalRedesSocialesIa,
  "produccion-audiovisual-con-ia-rapida-profesional-y-sin-equipo-tecnico": produccionAudiovisualIa,
  "como-crear-campanas-publicitarias-completas-con-inteligencia-artificial": campanasPublicitariasIa,
  "tendencias-de-marketing-visual-para-pymes-en-2026": tendenciasMarketingPymes2026,
  "el-futuro-de-la-fotografia-publicitaria-en-la-era-de-la-ia": futuroFotografiaPublicitariaIa,
  "como-esta-cambiando-la-publicidad-digital-con-inteligencia-artificial": publicidadDigitalIa,
  "ia-generativa-en-agencias-creativas-el-nuevo-estandar-del-sector": iaGenerativaAgenciasCreativas,
  "por-que-las-marcas-que-no-usan-ia-en-su-contenido-visual-estan-perdiendo-clientes": marcasSinIaPierdenClientes,
  "antes-y-despues-como-transformamos-la-fotografia-de-producto-con-ia": antesDespuesFotografiaProductoIa,
  "casos-reales-de-marcas-que-mejoraron-sus-ventas-con-contenido-visual-ia": casosRealesMarcasContenidoVisualIa,
  "resultados-reales-de-usar-ia-generativa-en-fotografia-publicitaria": resultadosIaFotografiaPublicitaria,
  "de-brief-a-campana-completa-asi-trabaja-mic-ai-studio": micAiStudioBriefCampana,
};

export const getBlogCoverImage = (article: ArticleCoverSource) => {
  const storedCover = article.cover_image?.trim();
  return storedCover || fallbackCoversBySlug[article.slug] || null;
};
