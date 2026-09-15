import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { piezas, testimonios } from "@/data/portfolio";
import heroEstudio from "@/assets/hero-estudio.jpg";

const titulo = "Retratos al óleo personalizados de personas y mascotas | Estudio Kusz";
const descripcion =
  "Estudio de retratos artísticos: retrato de mascota a pedido, retratos al óleo personalizados, pinturas digitales, certificados y diplomas hechos a mano.";

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
          name: "Estudio Kusz",
          description: descripcion,
          priceRange: "$$",
          areaServed: "Chile",
        }),
      },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  const destacadas = piezas.slice(0, 3);

  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-4 text-xs tracking-[0.2em] text-accent uppercase">
            Retratos hechos a mano
          </p>
          <h1 className="font-serif text-4xl leading-tight md:text-5xl">
            Un retrato guarda lo que una foto no alcanza a decir
          </h1>
          <p className="mt-5 max-w-prose text-muted-foreground">
            Pintamos al óleo a las personas y mascotas que marcaron tu vida. Envías una foto,
            nosotros la convertimos en una obra para colgar y heredar.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              to="/encargar"
              className="rounded-md bg-primary px-6 py-3 text-primary-foreground transition-opacity hover:opacity-90"
            >
              Encargar un Retrato
            </Link>
            <Link
              to="/portafolio"
              search={{ categoria: "certificados" }}
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Ver Certificados y Diplomas
            </Link>
          </div>
        </div>
        <img
          src={heroEstudio}
          alt="Retrato al óleo personalizado de una mujer mayor sobre la mesa de trabajo del estudio"
          width={1600}
          height={1104}
          className="rounded-lg border border-border object-cover shadow-sm"
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="font-serif text-3xl">Obras recientes</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {destacadas.map((p) => (
            <figure key={p.id}>
              <img
                src={p.imagen}
                alt={p.alt}
                loading="lazy"
                width={912}
                height={912}
                className="aspect-square w-full rounded-lg border border-border object-cover"
              />
              <figcaption className="mt-3 text-sm">
                <span className="block font-medium">{p.titulo}</span>
                <span className="text-muted-foreground">{p.tecnica}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <Link
          to="/portafolio"
          className="mt-8 inline-block text-sm underline underline-offset-4 hover:text-accent"
        >
          Ver todo el portafolio
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-serif text-3xl">Lo que dicen quienes ya lo recibieron</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonios.map((t) => (
            <blockquote key={t.nombre} className="rounded-lg border border-border bg-card p-6">
              <img
                src={t.imagen}
                alt={t.alt}
                loading="lazy"
                width={912}
                height={912}
                className="mb-4 h-20 w-20 rounded-full object-cover"
              />
              <p className="text-sm text-muted-foreground">“{t.texto}”</p>
              <footer className="mt-4 text-sm font-medium">{t.nombre}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
