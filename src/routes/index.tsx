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
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Ritrattos",
          description: descripcion,
          priceRange: "$$",
          areaServed: "Chile",
        }),
      },
    ],
  }),
  component: Inicio,
});

const preciosOleo = [
  { medida: "20 × 20 cm", precio: "$75.000 CLP", detalle: "Formato cuadrado, ideal para 1 rostro en primer plano." },
  { medida: "20 × 30 cm", precio: "$95.000 CLP", detalle: "Proporción clásica vertical, perfecto para repisas y dormitorios." },
  { medida: "30 × 40 cm", precio: "$130.000 CLP", detalle: "El formato más pedido. Gran nivel de detalle en mirada y pelaje.", popular: true },
  { medida: "40 × 50 cm", precio: "$170.000 CLP", detalle: "Excelente para 1 o 2 figuras con presencia destacada." },
  { medida: "50 × 60 cm", precio: "$200.000 CLP", detalle: "Gran formato de impacto para salones y livings." },
];

const preciosAcuarela = [
  { medida: "15 × 20 cm", precio: "$70.000 CLP", detalle: "Delicado y luminoso, ideal para regalos íntimos." },
  { medida: "20 × 30 cm", precio: "$90.000 CLP", detalle: "Tamaño estándar perfecto para escritorios o galerías murales." },
  { medida: "30 × 40 cm", precio: "$120.000 CLP", detalle: "La medida favorita en acuarela con gran luminosidad.", popular: true },
  { medida: "40 × 50 cm", precio: "$160.000 CLP", detalle: "Formato amplio para retratos llenos de luz y soltura." },
];

function Inicio() {
  const [tecnica, setTecnica] = useState<"oleo" | "acuarela">("oleo");
  const destacadas = piezas.slice(0, 3);
  const piezaAntesDespues = piezas.find((p) => p.antes) ?? piezas[0];

  return (
    <SiteLayout>
      {/* Hero Principal */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            Retratos hechos a mano en Chile
          </p>
          <h1 className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl text-stone-900">
            Un retrato guarda lo que una foto no alcanza a decir
          </h1>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-muted-foreground">
            Pintamos al óleo a las personas y mascotas que marcaron tu vida. Envías una foto desde tu teléfono
            y nosotros la convertimos en una obra de arte para colgar, heredar y recordar por siempre.
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

      {/* Sección de Medidas y Precios de @memoriaentrazos */}
      <section className="border-t border-stone-200/80 bg-[#FAF8F5] py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Tarifas y Formatos</p>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mt-2">
              Medidas y Valores
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Precios transparentes en pesos chilenos. Cada obra es realizada 100% a mano con materiales de bellas artes de máxima permanencia.
            </p>

            {/* Selector de Técnica */}
            <div className="mt-8 inline-flex rounded-lg border border-stone-300 bg-stone-100 p-1">
              <button
                type="button"
                onClick={() => setTecnica("oleo")}
                className={`rounded-md px-5 py-2 text-xs md:text-sm font-semibold transition-all ${
                  tecnica === "oleo"
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-700 hover:text-stone-950"
                }`}
              >
                Retratos en Óleo
              </button>
              <button
                type="button"
                onClick={() => setTecnica("acuarela")}
                className={`rounded-md px-5 py-2 text-xs md:text-sm font-semibold transition-all ${
                  tecnica === "acuarela"
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-700 hover:text-stone-950"
                }`}
              >
                Retratos en Acuarela
              </button>
            </div>
          </div>

          {/* Ficha descriptiva de la técnica seleccionada */}
          <div className="mt-8 mx-auto max-w-3xl rounded-xl border border-stone-200 bg-white p-5 shadow-xs text-sm">
            {tecnica === "oleo" ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif font-bold text-base text-stone-900">Óleo sobre tela montada en bastidor</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Gran durabilidad, profundidad cromática y textura cremosa y matérica que deja suaves relieves sobre el lienzo.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[#F3ECE4] px-3 py-1 text-xs font-semibold text-stone-900">
                  Bastidor de madera incluido
                </span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif font-bold text-base text-stone-900">Acuarela sobre papel Canson de 300 g</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Papel grueso de alta calidad. Colores suaves, transparentes y luminosos que crean retratos delicados y llenos de vida.
                  </p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
                  <Gift className="h-3.5 w-3.5" /> Incluye marco de regalo
                </span>
              </div>
            )}
          </div>

          {/* Tarjetas de Medidas y Precios */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {(tecnica === "oleo" ? preciosOleo : preciosAcuarela).map((item) => (
              <div
                key={item.medida}
                className={`relative rounded-xl border bg-white p-5 shadow-xs flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-0.5 ${
                  item.popular ? "border-stone-900 ring-2 ring-stone-900/10" : "border-stone-200"
                }`}
              >
                {item.popular && (
                  <span className="absolute -top-2.5 right-4 rounded-full bg-stone-900 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                    Más pedido
                  </span>
                )}
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Formato</p>
                  <p className="font-serif text-2xl font-bold text-stone-900 mt-1">{item.medida}</p>
                  <p className="font-serif text-2xl font-bold text-accent mt-3">{item.precio}</p>
                  <div className="my-3 border-t border-stone-100" />
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.detalle}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100">
                  <Link
                    to="/encargar"
                    className="block w-full rounded-md bg-stone-100 py-2 text-center text-xs font-semibold text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
                  >
                    Encargar este tamaño
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Notas y Condiciones Importantes */}
          <div className="mt-10 mx-auto max-w-4xl rounded-xl border border-stone-200/80 bg-white p-5 text-xs text-stone-700 space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent shrink-0" />
              <span><strong>Figura adicional:</strong> Cada retrato contempla 1 figura (persona o mascota). Cada figura extra: <strong>+$15.000 CLP</strong>.</span>
            </div>
            <div className="flex items-center gap-2">
              <Frame className="h-4 w-4 text-accent shrink-0" />
              <span><strong>Formatos especiales:</strong> Disponible en formato cuadrado, rectangular o redondo. Medidas personalizadas a pedido.</span>
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
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
