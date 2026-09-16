import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { SiteLayout } from "@/components/SiteLayout";
import { AntesDespues } from "@/components/AntesDespues";
import { categorias, piezas } from "@/data/portfolio";

const titulo = "Portafolio de retratos al óleo y digitales | Ritrattos";
const descripcion =
  "Galería de retratos al óleo personalizados de mascotas y personas, pinturas digitales y certificados. Compara la foto original con la obra terminada.";

const searchSchema = z.object({
  categoria: z
    .enum(["todos", "mascotas", "personas", "digital", "certificados"])
    .catch("todos")
    .optional(),
});

export const Route = createFileRoute("/portafolio")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descripcion },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descripcion },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portafolio,
});

function Portafolio() {
  const { categoria = "todos" } = Route.useSearch();
  const navigate = useNavigate({ from: "/portafolio" });

  const visibles = categoria === "todos" ? piezas : piezas.filter((p) => p.categoria === categoria);
  const conComparador = visibles.filter((p) => p.antes);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-5 py-14">
        <h1 className="font-serif text-4xl">Portafolio</h1>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Cada obra nace de una fotografía enviada por una familia. Filtra por tipo de encargo para
          ver ejemplos parecidos al tuyo.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {categorias.map((c) => (
            <button
              key={c.valor}
              type="button"
              onClick={() => navigate({ search: { categoria: c.valor } })}
              className={
                c.valor === categoria
                  ? "rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
                  : "rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              }
            >
              {c.etiqueta}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((p) => (
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

        {conComparador.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-3xl">Antes y después</h2>
            <p className="mt-2 text-muted-foreground">
              Desliza sobre cada pieza para ver la foto original y el retrato terminado.
            </p>
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              {conComparador.map((p) => (
                <div key={p.id}>
                  <AntesDespues
                    antes={p.antes!}
                    despues={{ imagen: p.imagen, alt: p.alt }}
                  />
                  <p className="mt-3 text-sm font-medium">{p.titulo}</p>
                  <p className="text-sm text-muted-foreground">{p.tecnica}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
