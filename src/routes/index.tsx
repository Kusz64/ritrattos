import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { piezas, testimonios } from "@/data/portfolio";
import { AntesDespues } from "@/components/AntesDespues";
import heroEstudio from "@/assets/hero-estudio.jpg";
import { Palette, Eye, Frame, Truck, Check, ArrowRight, Gift, Sparkles } from "lucide-react";

const titulo = "Retratos al óleo personalizados de personas y mascotas | Ritrattos";
const descripcion =
  "Estudio de retratos artísticos Ritrattos: retrato de mascota a pedido, retratos al óleo personalizados, pinturas digitales, certificados y diplomas hechos a mano.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descripcion },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descripcion },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroEstudio },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroEstudio },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["LocalBusiness", "ArtGallery", "ProfessionalService"],
              "@id": "https://ritrattos.cl/#business",
              name: "Ritrattos",
              alternateName: "Estudio de Retratos Ritrattos",
              description: descripcion,
              telephone: "+56966885084",
              priceRange: "$$",
              currenciesAccepted: "CLP",
              paymentAccepted: "Transferencia bancaria",
              areaServed: {
                "@type": "Country",
                name: "Chile",
              },
              knowsAbout: [
                "Retratos al óleo sobre lienzo",
                "Retratos de mascotas al óleo",
                "Retrato al óleo personalizado de personas",
                "Acuarela sobre papel Canson con marco",
                "Pintura digital de alta resolución",
                "Certificados caligráficos y diplomas",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Catálogo de Retratos y Obras Artísticas Ritrattos",
                itemListElement: [
                  {
                    "@type": "Offer",
                    name: "Retrato al Óleo sobre Bastidor de Madera",
                    description: "Pintura al óleo sobre tela montada en bastidor de pino, realizada 100% a mano con pigmentos de alta durabilidad.",
                    priceSpecification: {
                      "@type": "PriceSpecification",
                      priceCurrency: "CLP",
                      minPrice: 75000,
                      maxPrice: 200000,
                    },
                  },
                  {
                    "@type": "Offer",
                    name: "Retrato en Acuarela sobre Papel Canson 300g",
                    description: "Acuarela luminosa sobre papel de bellas artes de 300g, incluye marco de regalo.",
                    priceSpecification: {
                      "@type": "PriceSpecification",
                      priceCurrency: "CLP",
                      minPrice: 70000,
                      maxPrice: 160000,
                    },
                  },
                  {
                    "@type": "Offer",
                    name: "Retrato Digital Artístico",
                    description: "Pintado a mano alzada en alta resolución, apto para gigantografías y redes sociales.",
                    priceSpecification: {
                      "@type": "PriceSpecification",
                      priceCurrency: "CLP",
                      minPrice: 45000,
                      maxPrice: 110000,
                    },
                  },
                  {
                    "@type": "Offer",
                    name: "Certificados y Diplomas de Honor",
                    description: "Diseño caligráfico clásico y vectorial para honores, instituciones y familias.",
                    priceSpecification: {
                      "@type": "PriceSpecification",
                      priceCurrency: "CLP",
                      minPrice: 48000,
                      maxPrice: 90000,
                    },
                  },
                ],
              },
            },
            {
              "@type": "FAQPage",
              "@id": "https://ritrattos.cl/#faq",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "¿Cuánto cuesta un retrato al óleo en Chile en Ritrattos?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Los retratos al óleo sobre lienzo montado en bastidor parten desde 75.000 CLP (20x20 cm), con formatos populares como 30x40 cm a 130.000 CLP y gran formato 50x60 cm a 200.000 CLP. Cada figura adicional tiene un valor de 15.000 CLP.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Cómo funciona la forma de pago para encargar un retrato?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Se abona el 50% inicial al definir la obra e iniciar el boceto, y el 50% restante únicamente cuando la obra esté terminada y aprobada por el cliente mediante fotografía.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Realizan envíos a todo Chile?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sí, Ritrattos realiza envíos a todas las regiones de Chile mediante Starken o Chilexpress con embalaje reforzado antichoque.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: Inicio,
});

type CategoriaTarifa = "oleo" | "acuarela" | "digital" | "certificados";

interface ItemPrecio {
  nombre: string;
  subtitulo?: string;
  miles: string;
  detalle: string;
  caracteristicas?: string[];
  popular?: boolean;
}

const preciosOleo: ItemPrecio[] = [
  {
    nombre: "50 × 60 cm",
    subtitulo: "Gran Formato (Ancla)",
    miles: "200",
    detalle: "Presencia escénica de gran impacto visual. Óleo con ricos empastes matéricos para salones y livings.",
    caracteristicas: ["Lienzo de lino o algodón montado", "Bastidor reforzado de pino macizo", "Embalaje rígido de alta seguridad"],
  },
  {
    nombre: "40 × 50 cm",
    subtitulo: "Formato Mediano Amplio",
    miles: "175",
    detalle: "Excelente para composiciones de 1 o 2 figuras con un altísimo grado de detalle en piel y pelaje.",
    caracteristicas: ["Bastidor de madera incluido", "Revisiones de boceto previas", "Barniz de protección final"],
  },
  {
    nombre: "30 × 40 cm",
    subtitulo: "Formato Clásico",
    miles: "130",
    detalle: "El tamaño más pedido. Equilibrio perfecto para retratos individuales de personas y mascotas.",
    caracteristicas: ["Máximo detalle en mirada y expresión", "Boceto previo con revisiones", "Listo para colgar"],
    popular: true,
  },
  {
    nombre: "20 × 30 cm",
    subtitulo: "Formato Estándar",
    miles: "95",
    detalle: "Proporción vertical armónica, ideal para repisas, escritorios y dormitorios.",
    caracteristicas: ["Montado en bastidor", "Textura al óleo sobre lienzo", "Listo para colgar"],
  },
  {
    nombre: "20 × 20 cm",
    subtitulo: "Formato Cuadrado",
    miles: "75",
    detalle: "Ideal para 1 rostro en primer plano o retrato íntimo de mascota.",
    caracteristicas: ["Lienzo en bastidor", "Boceto de aprobación", "Listo para colgar"],
  },
];

const preciosAcuarela: ItemPrecio[] = [
  {
    nombre: "40 × 50 cm",
    subtitulo: "Gran Formato",
    miles: "160",
    detalle: "Formato amplio para retratos llenos de luz, soltura y transparencias sutiles.",
    caracteristicas: ["Papel Canson 300 g", "Marco de regalo incluido 🎁", "Pigmentos profesionales"],
  },
  {
    nombre: "30 × 40 cm",
    subtitulo: "Formato Favorito",
    miles: "120",
    detalle: "La medida preferida en acuarela. Gran luminosidad y delicadeza artística.",
    caracteristicas: ["Marco de regalo incluido 🎁", "Boceto previo de aprobación", "Papel Canson 300 g"],
    popular: true,
  },
  {
    nombre: "20 × 30 cm",
    subtitulo: "Formato Estándar",
    miles: "90",
    detalle: "Tamaño equilibrado perfecto para escritorios o galerías murales.",
    caracteristicas: ["Marco de regalo incluido 🎁", "Papel grueso 300 g", "Listo para lucir"],
  },
  {
    nombre: "15 × 20 cm",
    subtitulo: "Formato Íntimo",
    miles: "70",
    detalle: "Delicado y luminoso, ideal para regalos especiales y rincones acogedores.",
    caracteristicas: ["Marco de regalo incluido 🎁", "Papel de bellas artes", "Detalle delicado"],
  },
];

const preciosDigital: ItemPrecio[] = [
  {
    nombre: "Pack Familiar / Comercial Premium",
    subtitulo: "Máxima Resolución (Ancla)",
    miles: "110",
    detalle: "Hasta 4 rostros / Mascotas integradas + Archivo Máxima Resolución (Apto para gigantografías) + Paleta de colores comercial.",
    caracteristicas: ["Hasta 4 figuras integradas", "Apto para gigantografías / imprenta", "Paleta de colores comercial"],
  },
  {
    nombre: "Retrato de Pareja / Dúo",
    subtitulo: "Mascota + Dueño o Pareja",
    miles: "75",
    detalle: "2 figuras detalladas + Fondos personalizados + Formato optimizado para redes y fondo de pantalla.",
    caracteristicas: ["2 figuras detalladas", "Fondos personalizados", "Optimizado para redes y wallpaper"],
    popular: true,
  },
  {
    nombre: "Retrato Individual",
    subtitulo: "Primer Plano / Avatar",
    miles: "45",
    detalle: "1 rostro estilo avatar o primer plano conceptual con acabado artístico digital.",
    caracteristicas: ["1 figura / rostro", "Estilo conceptual / avatar", "Entrega digital alta fidelidad"],
  },
];

const preciosCertificados: ItemPrecio[] = [
  {
    nombre: "Pack Institucional / Corporativo",
    subtitulo: "Diseño Completo (Ancla)",
    miles: "90",
    detalle: "Diseño a medida con heráldica/logotipos vectoriales + Formato editable + Plantilla de impresión en alta fidelidad + Firma digital integrada.",
    caracteristicas: ["Heráldica y vectores a medida", "Plantilla imprenta alta fidelidad", "Firma digital y formato editable"],
  },
  {
    nombre: "Rediseño Premium con Acabado Físico",
    subtitulo: "Caligráfico Clásico",
    miles: "55",
    detalle: "Diseño personalizado + Selección de tipografía caligráfica clásica + Archivo optimizado listo para imprenta.",
    caracteristicas: ["Tipografía caligráfica clásica", "Diseño personalizado exclusivo", "Archivo optimizado para imprenta"],
    popular: true,
  },
  {
    nombre: "Plantilla Base Estándar",
    subtitulo: "Estructura Preexistente (Señuelo)",
    miles: "48",
    detalle: "Modificación de datos sobre estructura preexistente estándar.",
    caracteristicas: ["Modificación de datos y nombres", "Estructura preestablecida", "Exportación lista para imprimir"],
  },
];

function PrecioTipografico({ miles }: { miles: string }) {
  return (
    <span className="font-serif text-3xl font-bold tracking-tight text-[#222222] inline-flex items-baseline">
      {miles}
      <sup className="text-[0.48em] font-semibold text-[#222222] ml-0.5 relative -top-2">000</sup>
    </span>
  );
}

function Inicio() {
  const [tecnica, setTecnica] = useState<CategoriaTarifa>("oleo");
  const destacadas = piezas.slice(0, 3);
  const piezaAntesDespues = piezas.find((p) => p.antes) ?? piezas[0];

  return (
    <SiteLayout>
      {/* Hero Principal */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#DDD5C7] bg-[#F3ECE4]/80 px-3.5 py-1 text-xs font-semibold tracking-[0.2em] text-[#8B6822] uppercase">
            <span>Estudio Ritrattos</span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-600 font-medium">Arte al óleo en Chile</span>
          </div>
          <h1 className="font-serif text-4xl leading-[1.12] md:text-5xl lg:text-[3.5rem] font-bold text-stone-900">
            Un retrato guarda lo que una foto no alcanza a decir
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-stone-600">
            Esa foto que guardas con cariño puede convertirse en un óleo para colgar, heredar y recordar por siempre. ¿Qué rostro querido merece dejar de vivir solo en una pantalla?
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/encargar"
              className="rounded-md bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-stone-800 hover:shadow-lg"
            >
              Encargar un Retrato
            </Link>
            <Link
              to="/portafolio"
              className="rounded-md border border-stone-300 bg-white/80 px-5 py-3.5 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-100"
            >
              Ver Portafolio Completo
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroEstudio}
            alt="Retrato al óleo personalizado de una mujer mayor sobre la mesa de trabajo del estudio"
            width={1600}
            height={1104}
            className="rounded-xl border border-stone-300/80 object-cover shadow-lg"
          />
          <div className="absolute -bottom-4 -left-4 rounded-lg border border-stone-200 bg-white/95 p-3.5 shadow-md hidden sm:flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3ECE4] text-stone-900 font-serif font-bold">
              100%
            </div>
            <div className="text-xs">
              <p className="font-semibold text-stone-900">Pintado a mano</p>
              <p className="text-muted-foreground">Óleo tradicional sobre lienzo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Franja de 4 Pilares de Confianza */}
      <section className="border-y border-stone-200/90 bg-[#F9F7F4] py-10">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3.5">
            <div className="rounded-lg bg-white p-2.5 shadow-2xs border border-stone-200 text-stone-900">
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-stone-900">100% Hecho a Mano</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Óleo sobre lienzo con pigmentos de alta permanencia y textura real.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="rounded-lg bg-white p-2.5 shadow-2xs border border-stone-200 text-stone-900">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-stone-900">Boceto con Revisiones</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Apruebas el boceto previo antes de pintar para garantizar parecido total.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="rounded-lg bg-white p-2.5 shadow-2xs border border-stone-200 text-stone-900">
              <Frame className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-stone-900">Listo para Colgar</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Montado en bastidor de madera maciza, listo para tu pared.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="rounded-lg bg-white p-2.5 shadow-2xs border border-stone-200 text-stone-900">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-stone-900">Envíos a Todo Chile</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Embalaje rígido de máxima seguridad directo a tu domicilio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformación Interactiva Antes y Después */}
      {piezaAntesDespues && piezaAntesDespues.antes && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                De foto a obra de arte
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mt-2">
                Mira cómo cobra vida tu recuerdo
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                No necesitas una fotografía de estudio profesional. Tomamos fotos cotidianas de tu celular,
                rescatamos su expresión única y la convertimos en una pintura al óleo rica en matices, luz y textura.
              </p>
              <div className="mt-6 space-y-2.5 text-sm text-stone-700">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Rescate de fotos antiguas o con baja luz</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Posibilidad de combinar personas o mascotas de fotos distintas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Elección de fondos personalizados</span>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  to="/proceso"
                  className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 underline underline-offset-4 hover:text-accent"
                >
                  Conoce el proceso paso a paso <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-stone-300/80 bg-white p-4 shadow-md">
              <AntesDespues antes={piezaAntesDespues.antes} despues={{ imagen: piezaAntesDespues.imagen, alt: piezaAntesDespues.alt }} />
              <p className="mt-3 text-center text-xs text-muted-foreground italic">
                {piezaAntesDespues.titulo} — {piezaAntesDespues.tecnica}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Sección de Tarifas y Catálogo Psicológico */}
      <section className="border-t border-stone-200/80 bg-[#FAF8F5] py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Tarifas y Paquetes</p>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mt-2 font-semibold">
              Catálogo de Valores
            </h2>
            <p className="mt-1.5 text-xs text-stone-500 font-medium tracking-wide uppercase">
              Valores expresados en pesos chilenos
            </p>

            {/* Selector de Línea de Producto */}
            <div className="mt-8 inline-flex flex-wrap justify-center gap-1 rounded-xl border border-stone-300/80 bg-stone-100 p-1.5">
              <button
                type="button"
                onClick={() => setTecnica("oleo")}
                className={`rounded-lg px-4 py-2 text-xs md:text-sm font-semibold transition-all ${
                  tecnica === "oleo"
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-700 hover:text-stone-950 hover:bg-stone-200/60"
                }`}
              >
                Retratos al Óleo
              </button>
              <button
                type="button"
                onClick={() => setTecnica("acuarela")}
                className={`rounded-lg px-4 py-2 text-xs md:text-sm font-semibold transition-all ${
                  tecnica === "acuarela"
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-700 hover:text-stone-950 hover:bg-stone-200/60"
                }`}
              >
                Retratos en Acuarela
              </button>
              <button
                type="button"
                onClick={() => setTecnica("digital")}
                className={`rounded-lg px-4 py-2 text-xs md:text-sm font-semibold transition-all ${
                  tecnica === "digital"
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-700 hover:text-stone-950 hover:bg-stone-200/60"
                }`}
              >
                Retratos Digitales
              </button>
              <button
                type="button"
                onClick={() => setTecnica("certificados")}
                className={`rounded-lg px-4 py-2 text-xs md:text-sm font-semibold transition-all ${
                  tecnica === "certificados"
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-700 hover:text-stone-950 hover:bg-stone-200/60"
                }`}
              >
                Certificados y Diplomas
              </button>
            </div>
          </div>

          {/* Ficha descriptiva de la técnica seleccionada */}
          <div className="mt-8 mx-auto max-w-3xl rounded-xl border border-stone-200 bg-white p-5 shadow-xs text-sm">
            {tecnica === "oleo" && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif font-bold text-base text-stone-900">Óleo sobre tela montada en bastidor</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Gran durabilidad, profundidad cromática y textura cremosa y matéricamente rica que deja suaves relieves sobre el lienzo.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[#F3ECE4] px-3.5 py-1 text-xs font-semibold text-stone-900">
                  Bastidor de madera incluido
                </span>
              </div>
            )}
            {tecnica === "acuarela" && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif font-bold text-base text-stone-900">Acuarela sobre papel Canson de 300 g</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Papel grueso de alta calidad. Colores suaves, transparentes y luminosos que crean retratos delicados y llenos de vida.
                  </p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-semibold text-emerald-800">
                  <Gift className="h-3.5 w-3.5" /> Incluye marco de regalo
                </span>
              </div>
            )}
            {tecnica === "digital" && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif font-bold text-base text-stone-900">Pintura Digital Artística</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Pintado digital a mano alzada. Archivo máster en máxima resolución listo para gigantografías, cuadros o uso en redes.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-stone-900 px-3.5 py-1 text-xs font-semibold text-white">
                  Cero costo de envío • Entrega digital
                </span>
              </div>
            )}
            {tecnica === "certificados" && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif font-bold text-base text-stone-900">Certificados, Diplomas y Caligrafía</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Diseños heráldicos y tipográficos de honor para instituciones, premiaciones corporativas o diplomas familiares.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[#F3ECE4] px-3.5 py-1 text-xs font-semibold text-stone-900">
                  Vectores listos para imprenta
                </span>
              </div>
            )}
          </div>

          {/* Grilla de Tarjetas con Orden Inverso (Mayor a Menor) */}
          <div
            className={`mt-8 grid gap-5 ${
              tecnica === "oleo"
                ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                : tecnica === "acuarela"
                ? "sm:grid-cols-2 lg:grid-cols-4"
                : "sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto"
            }`}
          >
            {(tecnica === "oleo"
              ? preciosOleo
              : tecnica === "acuarela"
              ? preciosAcuarela
              : tecnica === "digital"
              ? preciosDigital
              : preciosCertificados
            ).map((item) => {
              const esPopular = item.popular;
              return (
                <div
                  key={item.nombre}
                  className={`relative rounded-xl bg-white p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 ${
                    esPopular
                      ? "border-2 border-[#C5A059] shadow-md ring-4 ring-[#C5A059]/15"
                      : "border border-stone-200 shadow-xs hover:border-stone-300 hover:shadow-md"
                  }`}
                >
                  {esPopular && (
                    <span className="absolute -top-3 right-4 rounded-full bg-[#C5A059] px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-xs">
                      Más pedido
                    </span>
                  )}
                  <div>
                    {item.subtitulo && (
                      <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                        {item.subtitulo}
                      </p>
                    )}
                    <p className="font-serif text-xl font-bold text-stone-900 mt-1 leading-snug">
                      {item.nombre}
                    </p>

                    <div className="mt-3 flex items-baseline">
                      <PrecioTipografico miles={item.miles} />
                    </div>

                    <div className="my-3 border-t border-stone-100" />
                    <p className="text-xs leading-relaxed text-muted-foreground">{item.detalle}</p>

                    {item.caracteristicas && (
                      <ul className="mt-3.5 space-y-1.5 border-t border-stone-100 pt-3 text-xs text-stone-600">
                        {item.caracteristicas.map((car, idx) => (
                          <li key={`${item.nombre}-${idx}`} className="flex items-start gap-1.5">
                            <Check className="h-3.5 w-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                            <span>{car}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-6 pt-3 border-t border-stone-100">
                    <Link
                      to="/encargar"
                      className={`block w-full rounded-md py-2.5 text-center text-xs font-semibold transition-all ${
                        esPopular
                          ? "bg-[#C5A059] text-white shadow-xs hover:bg-[#b08e4c]"
                          : "bg-stone-100 text-stone-900 hover:bg-stone-900 hover:text-white"
                      }`}
                    >
                      Encargar esta opción
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Notas y Condiciones Importantes */}
          <div className="mt-10 mx-auto max-w-4xl rounded-xl border border-stone-200/80 bg-white p-5 text-xs text-stone-700 space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#C5A059] shrink-0" />
              <span>
                <strong>Figura adicional:</strong> Cada retrato contempla 1 figura (persona o mascota). Cada figura extra:{" "}
                <span className="font-serif font-bold text-stone-900 inline-flex items-baseline">
                  15<sup className="text-[0.55em] font-semibold ml-0.5">000</sup>
                </span>.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Frame className="h-4 w-4 text-[#C5A059] shrink-0" />
              <span>
                <strong>Formatos especiales:</strong> Medidas personalizadas a pedido • Bastidor redondo o cuadrado disponible.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Obras Recientes */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Galería</p>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mt-1">Obras recientes</h2>
          </div>
          <Link
            to="/portafolio"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 underline underline-offset-4 hover:text-accent"
          >
            Ver todo el portafolio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {destacadas.map((p) => (
            <figure key={p.id} className="group overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs">
              <div className="aspect-square overflow-hidden bg-stone-100">
                <img
                  src={p.imagen}
                  alt={p.alt}
                  loading="lazy"
                  width={912}
                  height={912}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-4 text-sm">
                <span className="block font-serif font-semibold text-base text-stone-900">{p.titulo}</span>
                <span className="text-xs text-muted-foreground">{p.tecnica}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/portafolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 underline underline-offset-4"
          >
            Ver todo el portafolio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Testimonios */}
      <section className="border-t border-stone-200/80 bg-stone-100/50 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Testimonios</p>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mt-1">Lo que dicen quienes ya lo recibieron</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonios.map((t) => (
              <blockquote key={t.nombre} className="rounded-xl border border-stone-200/90 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <img
                    src={t.imagen}
                    alt={t.alt}
                    loading="lazy"
                    width={912}
                    height={912}
                    className="mb-4 h-16 w-16 rounded-full object-cover border-2 border-[#F3ECE4] shadow-xs"
                  />
                  <p className="text-sm leading-relaxed text-muted-foreground">“{t.texto}”</p>
                </div>
                <footer className="mt-5 text-sm font-semibold text-stone-900 pt-3 border-t border-stone-100">
                  {t.nombre}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Banner de Contacto y Asesoría */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-2xl border border-stone-300 bg-[#F3ECE4] p-8 md:p-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-semibold">
            ¿Tienes una foto especial pero dudas si sirve?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-700">
            Envíanosla sin compromiso a través de nuestro formulario. Te asesoraremos personalmente
            sobre la iluminación, el tamaño ideal y la mejor composición para tu obra.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/encargar"
              className="rounded-md bg-stone-900 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-stone-800"
            >
              Subir Foto y Cotizar
            </Link>
            <a
              href="https://wa.me/56966885084?text=Hola%20Ritrattos,%20tengo%20una%20duda%20con%20mi%20foto%20para%20un%20retrato"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-md border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-stone-800 shadow-xs transition-all hover:bg-stone-50"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#25D366]" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
