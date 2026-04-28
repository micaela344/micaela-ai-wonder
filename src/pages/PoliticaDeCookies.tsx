import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PoliticaDeCookies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Política de Cookies | MIC AI Studio";
  }, []);

  const lastUpdate = "28 de abril de 2026";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3">
              Política de Cookies
            </h1>
            <p className="text-sm text-muted-foreground">
              Última actualización: {lastUpdate}
            </p>
          </header>

          <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                1. Responsable del tratamiento
              </h2>
              <p>
                El responsable del sitio web y del tratamiento de los datos
                obtenidos a través de las cookies es:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>
                  <strong className="text-foreground">Titular:</strong> MIC AI Studio
                </li>
                <li>
                  <strong className="text-foreground">Correo de contacto:</strong>{" "}
                  <a
                    href="mailto:micaistudio1@gmail.com"
                    className="text-foreground underline hover:opacity-80"
                  >
                    micaistudio1@gmail.com
                  </a>
                </li>
                <li>
                  <strong className="text-foreground">Sitio web:</strong>{" "}
                  micaistudio.com
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                2. ¿Qué son las cookies?
              </h2>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web
                que visitas almacenan en tu dispositivo (ordenador, tableta o
                teléfono móvil) a través de tu navegador. Permiten que la web
                recuerde información sobre tu visita, como tu idioma preferido,
                tu sesión iniciada o tus preferencias de navegación, lo que
                facilita y mejora tu experiencia de uso.
              </p>
              <p className="mt-3">
                Las cookies pueden ser propias (instaladas por MIC AI Studio) o
                de terceros (instaladas por servicios externos que utilizamos),
                y pueden ser de sesión (se eliminan al cerrar el navegador) o
                persistentes (permanecen durante un periodo definido).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                3. Tipos de cookies que utilizamos
              </h2>

              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    3.1. Cookies técnicas (necesarias)
                  </h3>
                  <p>
                    Son imprescindibles para el funcionamiento del sitio web y
                    no pueden desactivarse. Permiten la navegación, el uso de
                    funciones básicas como el inicio de sesión, el almacenamiento
                    de tu consentimiento de cookies o el funcionamiento del chat
                    de atención. No requieren consentimiento previo.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    3.2. Cookies analíticas
                  </h3>
                  <p>
                    Nos permiten medir y analizar de forma agregada y anónima la
                    actividad de los usuarios en el sitio: páginas visitadas,
                    tiempo de permanencia, origen del tráfico y comportamiento
                    de navegación. Esta información se utiliza únicamente para
                    mejorar nuestros servicios y contenidos.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    3.3. Cookies de terceros
                  </h3>
                  <p>
                    Algunos servicios externos integrados en el sitio pueden
                    instalar sus propias cookies. Entre ellos:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>
                      Proveedores de infraestructura y backend (por ejemplo,
                      Supabase / Lovable Cloud).
                    </li>
                    <li>
                      Plataformas de redes sociales enlazadas (por ejemplo,
                      Instagram).
                    </li>
                    <li>
                      Servicios de mensajería externos (por ejemplo, WhatsApp).
                    </li>
                  </ul>
                  <p className="mt-3">
                    Estas cookies se rigen por las políticas de privacidad de
                    sus respectivos proveedores y MIC AI Studio no controla su
                    contenido ni su finalidad.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                4. Base legal y consentimiento
              </h2>
              <p>
                La instalación de cookies no técnicas requiere tu consentimiento
                previo, expreso e informado, conforme a:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>
                  El{" "}
                  <strong className="text-foreground">
                    Reglamento (UE) 2016/679 (RGPD)
                  </strong>{" "}
                  y la Ley Orgánica 3/2018 de Protección de Datos Personales y
                  Garantía de los Derechos Digitales (LOPDGDD), en España y la
                  Unión Europea.
                </li>
                <li>
                  La{" "}
                  <strong className="text-foreground">
                    Ley 19.628 sobre Protección de la Vida Privada
                  </strong>{" "}
                  de Chile, así como la normativa que regula el tratamiento
                  de datos personales en territorio chileno.
                </li>
                <li>
                  Las normativas internacionales aplicables en materia de
                  privacidad y protección de datos (entre ellas la CCPA en
                  California, la LGPD en Brasil y otras regulaciones
                  equivalentes), aplicadas a usuarios de cualquier país.
                </li>
              </ul>
              <p className="mt-3">
                Al aceptar el banner de cookies, autorizas el uso de cookies
                analíticas y de terceros. Si las rechazas, solo se utilizarán
                las cookies estrictamente necesarias para el funcionamiento del
                sitio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                5. ¿Cómo desactivar o eliminar las cookies?
              </h2>
              <p>
                Puedes retirar tu consentimiento en cualquier momento, así como
                bloquear o eliminar las cookies ya instaladas, a través de la
                configuración de tu navegador. A continuación encontrarás los
                enlaces a las instrucciones oficiales de los principales
                navegadores:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline hover:opacity-80"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline hover:opacity-80"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline hover:opacity-80"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline hover:opacity-80"
                  >
                    Microsoft Edge
                  </a>
                </li>
                <li>
                  <a
                    href="https://help.opera.com/en/latest/web-preferences/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline hover:opacity-80"
                  >
                    Opera
                  </a>
                </li>
              </ul>
              <p className="mt-3">
                También puedes restablecer tu preferencia de cookies en este
                sitio borrando los datos de navegación almacenados por tu
                navegador para este dominio. La próxima vez que visites la web,
                volverá a aparecer el banner de cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                6. Tus derechos
              </h2>
              <p>
                De acuerdo con la normativa aplicable, tienes derecho a acceder,
                rectificar, suprimir, oponerte, limitar el tratamiento y, cuando
                proceda, a la portabilidad de tus datos personales, así como a
                retirar el consentimiento otorgado. Puedes ejercer estos
                derechos enviando una solicitud a{" "}
                <a
                  href="mailto:micaistudio1@gmail.com"
                  className="text-foreground underline hover:opacity-80"
                >
                  micaistudio1@gmail.com
                </a>
                .
              </p>
              <p className="mt-3">
                Si consideras que tus derechos no han sido atendidos, puedes
                presentar una reclamación ante la autoridad de control
                competente en tu país (por ejemplo, la Agencia Española de
                Protección de Datos en España).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                7. Cambios en la política de cookies
              </h2>
              <p>
                MIC AI Studio podrá modificar esta Política de Cookies en
                función de exigencias legislativas, reglamentarias o con la
                finalidad de adaptar dicha política a las instrucciones
                dictadas por las autoridades competentes. Cualquier cambio será
                publicado en esta misma página, indicando la fecha de la última
                actualización.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                8. Contacto
              </h2>
              <p>
                Si tienes cualquier duda sobre esta Política de Cookies, puedes
                escribirnos a{" "}
                <a
                  href="mailto:micaistudio1@gmail.com"
                  className="text-foreground underline hover:opacity-80"
                >
                  micaistudio1@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PoliticaDeCookies;
