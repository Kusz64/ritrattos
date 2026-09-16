import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

const titulo = "Cómo encargar tu retrato: proceso y tiempos | Ritrattos";
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

const faqs = [
  {
    pregunta: "¿Cómo debe ser la fotografía que envío?",
    respuesta:
      "No necesitas una foto de estudio profesional. Una foto tomada con tu teléfono con buena luz natural (donde se distingan con claridad los ojos, el pelaje y la expresión) es ideal. Puedes subir varias fotos y te ayudaremos a elegir la mejor.",
  },
  {
    pregunta: "¿Cómo funciona la forma de pago?",
    respuesta:
      "Para tu tranquilidad, trabajamos con un abono del 50% por transferencia bancaria tras revisar tus fotos y definir el tamaño. El 50% restante se abona únicamente cuando la obra esté completamente terminada y hayas aprobado el resultado final.",
  },
  {
    pregunta: "¿Puedo pedir ajustes o modificaciones?",
    respuesta:
      "Sí. En la etapa de boceto previo revisamos composición, proporciones y tono de fondo. Realizamos los ajustes que nos pidas hasta que estés completamente conforme antes de aplicar las capas finales de pintura.",
  },
  {
    pregunta: "¿Cómo viene presentada la obra?",
    respuesta:
      "Los retratos al óleo se entregan montados en bastidor de madera de pino, listos para colgar en tu pared. Los retratos en acuarela se realizan en papel de alta gama Canson 300 g e incluyen un marco de regalo.",
  },
  {
    pregunta: "¿Hacen envíos a regiones de Chile?",
    respuesta:
      "Sí, enviamos a todo Chile mediante Starken o Chilexpress con número de seguimiento. Cada paquete cuenta con embalaje rígido especial antichoque para garantizar que llegue en óptimas condiciones.",
  },
];

function Proceso() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-5 py-14">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
          Metodología de Trabajo
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mt-2">
          El proceso, paso a paso
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Transparencia absoluta en cada etapa: sabes exactamente cómo avanzamos, cómo revisas y cuándo recibes tu cuadro.
        </p>

        {/* Pasos */}
        <ol className="mt-12 space-y-6">
          {pasos.map((p) => (
            <li key={p.numero} className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-accent">{p.numero}</span>
                <h2 className="font-serif text-2xl text-stone-900 font-semibold">{p.titulo}</h2>
                <span className="rounded-full bg-[#F3ECE4] px-3 py-1 text-xs font-semibold text-stone-800">
                  {p.tiempo}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
            </li>
          ))}
        </ol>

        {/* Preguntas Frecuentes */}
        <div className="mt-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Dudas Comunes</p>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mt-2">
            Preguntas Frecuentes
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.pregunta} className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs">
                <h3 className="font-serif text-lg font-semibold text-stone-900">{faq.pregunta}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.respuesta}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Llamado a la acción */}
        <div className="mt-16 rounded-2xl border border-stone-200 bg-[#FAF8F5] p-8 text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-stone-900 font-semibold">
            ¿Listo para transformar tu foto en una obra?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Sube tu foto en menos de 2 minutos y te responderemos con la cotización exacta.
          </p>
          <div className="mt-6">
            <Link
              to="/encargar"
              className="inline-block rounded-md bg-stone-900 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-stone-800"
            >
              Encargar un Retrato
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
