import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import heroEstudio from "@/assets/hero-estudio.jpg";

const titulo = "Términos y Política de Privacidad | Ritrattos";
const descripcion =
  "Cómo tratamos las fotos que nos envías, plazos de entrega, política de reembolso y formas de coordinar el pago de tu retrato personalizado.";

export const Route = createFileRoute("/legal")({
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
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Legal,
});

function Legal() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-5 py-14">
        <h1 className="font-serif text-4xl">Términos y Política de Privacidad</h1>

        <section className="mt-10 space-y-3">
          <h2 className="font-serif text-2xl">Qué hacemos con tus fotos</h2>
          <p className="text-muted-foreground">
            Las fotografías que envías se usan únicamente para crear la obra encargada. Se guardan
            en un almacenamiento privado al que solo accede el estudio y se eliminan a los 12 meses
            de entregado el pedido, o antes si nos lo pides por escrito.
          </p>
          <p className="text-muted-foreground">
            No publicamos ninguna foto ni obra en el portafolio o en redes sociales sin tu
            autorización expresa. Si la imagen incluye a menores de edad o a personas distintas de
            ti, declaras contar con su autorización (o la de su representante legal) para
            enviárnosla.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="font-serif text-2xl">Plazos de entrega</h2>
          <p className="text-muted-foreground">
            Boceto en 3 a 5 días hábiles. Obra al óleo terminada en 2 a 4 semanas según tamaño y
            complejidad. Retratos digitales y certificados en 5 a 10 días hábiles. Los plazos se
            cuentan desde la aprobación del boceto y no incluyen el tiempo de envío.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="font-serif text-2xl">Reembolsos y cancelaciones</h2>
          <p className="text-muted-foreground">
            Puedes cancelar sin costo antes de la aprobación del boceto y se devuelve el 100% de lo
            pagado. Una vez iniciada la pintura, se devuelve el 50%. Terminada la obra no hay
            reembolso, pero corregimos cualquier error atribuible al estudio sin costo.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="font-serif text-2xl">Pagos</h2>
          <p className="text-muted-foreground">
            Por ahora no hay pasarela de pago en línea. El pago se coordina por correo una vez
            aprobado el boceto: 50% de anticipo para comenzar y 50% antes del envío, por
            transferencia bancaria.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="font-serif text-2xl">Derechos sobre la obra</h2>
          <p className="text-muted-foreground">
            La obra física o el archivo digital es tuyo. El estudio conserva los derechos de autor
            de la pieza y puede solicitar tu permiso para mostrarla como referencia de trabajo.
          </p>
        </section>
      </div>
    </SiteLayout>
  );
}
