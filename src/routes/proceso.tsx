import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

const titulo = "Cómo encargar tu retrato: proceso y tiempos | Estudio Kusz";
const descripcion =
  "Tres pasos para tu retrato personalizado: envías la foto, apruebas el boceto y recibes la obra. Tiempos estimados de cada etapa.";

const pasos = [
  {
    numero: "01",
    titulo: "Sube tu foto",
    tiempo: "5 minutos",
    texto:
      "Completa el formulario con una o varias fotos en buena resolución. Te confirmamos si sirven dentro de las 24 horas hábiles.",
  },
  {
    numero: "02",
    titulo: "Aprueba el boceto",
    tiempo: "3 a 5 días",
    texto:
      "Te enviamos un boceto digital para revisar encuadre, luz y detalles. Incluye dos rondas de ajustes sin costo.",
  },
  {
    numero: "03",
    titulo: "Recibe tu obra",
    tiempo: "2 a 4 semanas",
    texto:
      "Pintamos la obra final, la dejamos secar y la enviamos embalada y protegida. Los retratos digitales y certificados se entregan antes.",
  },
];

export const Route = createFileRoute("/proceso")({
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
  component: Proceso,
});

function Proceso() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-5 py-14">
        <h1 className="font-serif text-4xl">El proceso, paso a paso</h1>
        <p className="mt-3 text-muted-foreground">
          Sin sorpresas: sabes qué pasa en cada etapa y cuánto demora.
        </p>

        <ol className="mt-12 space-y-8">
          {pasos.map((p) => (
            <li key={p.numero} className="rounded-lg border border-border bg-card p-6">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-serif text-3xl text-accent">{p.numero}</span>
                <h2 className="font-serif text-2xl">{p.titulo}</h2>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                  {p.tiempo}
                </span>
              </div>
              <p className="mt-3 text-muted-foreground">{p.texto}</p>
            </li>
          ))}
        </ol>

        <Link
          to="/encargar"
          className="mt-12 inline-block rounded-md bg-primary px-6 py-3 text-primary-foreground transition-opacity hover:opacity-90"
        >
          Encargar un Retrato
        </Link>
      </div>
    </SiteLayout>
  );
}
