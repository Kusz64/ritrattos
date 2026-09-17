import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { crearPedido, crearUrlDeSubida } from "@/lib/orders.functions";
import heroEstudio from "@/assets/hero-estudio.jpg";

const titulo = "Encargar un retrato personalizado | Ritrattos";
const descripcion =
  "Encarga tu retrato al óleo, digital o certificado. Sube tus fotos, elige estilo y tamaño y recibe la confirmación por correo.";

const TIPOS = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const MAX_MB = 20;
const MAX_FOTOS = 8;

const estilos = [
  { valor: "oleo", etiqueta: "Óleo sobre lienzo (bastidor de madera)" },
  { valor: "acuarela", etiqueta: "Acuarela sobre papel Canson 300g (marco de regalo)" },
  { valor: "digital", etiqueta: "Pintura digital de alta resolución" },
  { valor: "certificado", etiqueta: "Certificado o diploma caligráfico" },
] as const;

const tamanos = [
  "15 × 20 cm ($70.000 Acuarela)",
  "20 × 20 cm ($75.000 Óleo)",
  "20 × 30 cm ($90.000 Acuarela / $95.000 Óleo)",
  "30 × 40 cm ($120.000 Acuarela / $130.000 Óleo) — Más elegido",
  "40 × 50 cm ($160.000 Acuarela / $170.000 Óleo)",
  "50 × 60 cm ($200.000 Óleo)",
  "Medida especial personalizada (A consultar)",
];

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Ingresa tu nombre").max(120),
  email: z.string().trim().email("Revisa tu correo").max(255),
  phone: z.string().trim().max(40),
  style: z.enum(["oleo", "acuarela", "digital", "certificado"]),
  size: z.string().trim().min(1),
  message: z.string().trim().max(1500),
  website: z.string().max(100).optional(),
});

export const Route = createFileRoute("/encargar")({
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
  }),
  component: Encargar,
});

function Encargar() {
  const pedirUrl = useServerFn(crearUrlDeSubida);
  const enviarPedido = useServerFn(crearPedido);

  const [fotos, setFotos] = useState<{ file: File; preview: string }[]>([]);
  const [consent, setConsent] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [nombreCliente, setNombreCliente] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const agregarFotos = (files: FileList | null) => {
    if (!files) return;
    const nuevas: { file: File; preview: string }[] = [];
    for (const file of Array.from(files)) {
      if (!TIPOS.includes(file.type.toLowerCase())) {
        toast.error(`${file.name}: formato no admitido (usa JPG, PNG, WEBP o HEIC).`);
        continue;
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        toast.error(`${file.name}: supera los ${MAX_MB} MB.`);
        continue;
      }
      nuevas.push({ file, preview: URL.createObjectURL(file) });
    }
    setFotos((prev) => [...prev, ...nuevas].slice(0, MAX_FOTOS));
    if (inputRef.current) inputRef.current.value = "";
  };

  const quitarFoto = (i: number) => {
    setFotos((prev) => {
      URL.revokeObjectURL(prev[i]!.preview);
      return prev.filter((_, idx) => idx !== i);
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = formSchema.safeParse({
      fullName: fd.get("fullName"),
      email: fd.get("email"),
      phone: fd.get("phone") ?? "",
      style: fd.get("style"),
      size: fd.get("size"),
      message: fd.get("message") ?? "",
    });

    const website = fd.get("website") as string | null;
    if (website && website.trim().length > 0) {
      // Honeypot: descarta el envío de bots de spam silenciosamente
      setListo(true);
      return;
    }

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revisa los datos del formulario.");
      return;
    }
    if (fotos.length === 0) {
      toast.error("Sube al menos una foto de referencia.");
      return;
    }
    if (!consent) {
      toast.error("Necesitamos tu autorización para tratar las fotos.");
      return;
    }

    setEnviando(true);
    try {
      const paths: string[] = [];
      for (const { file } of fotos) {
        const { path, token } = await pedirUrl({
          data: { filename: file.name, contentType: file.type, size: file.size },
        });
        if (token !== "local-dev-token") {
          const { error } = await supabase.storage
            .from("order-photos")
            .uploadToSignedUrl(path, token, file);
          if (error) throw new Error(`No se pudo subir ${file.name}`);
        }
        paths.push(path);
      }

      await enviarPedido({
        data: { ...parsed.data, photoPaths: paths, consent: true },
      });

      setNombreCliente(parsed.data.fullName);
      setListo(true);
      setFotos([]);
      toast.success("¡Solicitud recibida! Te contactaremos a la brevedad.");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "No pudimos enviar el pedido.");
    } finally {
      setEnviando(false);
    }
  };

  if (listo) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-5 py-20 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            ¡Recibimos tu solicitud con éxito!
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            Revisaremos tus fotos y te contactaremos por WhatsApp o correo electrónico para confirmar
            los detalles del encuadre, la técnica y coordinar el boceto inicial.
          </p>

          <div className="mt-8 rounded-xl border border-stone-200 bg-[#F9F7F4] p-6 text-left">
            <h3 className="font-serif font-bold text-stone-900 text-lg">¿Quieres agilizar la revisión?</h3>
            <p className="text-sm text-stone-600 mt-1 leading-relaxed">
              Puedes escribirnos directamente a nuestro WhatsApp oficial para avisarnos de tu solicitud o hacernos cualquier pregunta previa.
            </p>
            <a
              href={`https://wa.me/56966885084?text=${encodeURIComponent(
                `Hola Ritrattos, acabo de enviar mi solicitud desde la página web a nombre de ${nombreCliente || "un cliente"}. Quisiera confirmar si la recibieron bien.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#20bd5a] transition-all"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Avisar por WhatsApp (+56 9 6688 5084)
            </a>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/portafolio"
              className="rounded-md border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 shadow-xs hover:bg-stone-50"
            >
              Ver más trabajos en el Portafolio
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-5 py-14">
        <h1 className="font-serif text-4xl">Encargar un Retrato</h1>
        <p className="mt-3 text-muted-foreground">
          Cuéntanos qué quieres pintar y sube las fotos de referencia. Te respondemos con
          presupuesto y plazo.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Nombre y apellido</span>
              <input
                name="fullName"
                required
                maxLength={120}
                className="w-full rounded-md border border-input bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Correo electrónico</span>
              <input
                name="email"
                type="email"
                required
                maxLength={255}
                className="w-full rounded-md border border-input bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Teléfono (opcional)</span>
              <input
                name="phone"
                maxLength={40}
                className="w-full rounded-md border border-input bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Estilo</span>
              <select
                name="style"
                defaultValue="oleo"
                className="w-full rounded-md border border-input bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              >
                {estilos.map((e) => (
                  <option key={e.valor} value={e.valor}>
                    {e.etiqueta}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block font-medium">Tamaño</span>
              <select
                name="size"
                defaultValue="40 × 40 cm"
                className="w-full rounded-md border border-input bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              >
                {tamanos.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="text-sm">
            <span className="mb-1 block font-medium">Fotos de referencia</span>
            <p className="mb-2 text-muted-foreground">
              Hasta {MAX_FOTOS} imágenes, máximo {MAX_MB} MB cada una. JPG, PNG, WEBP o HEIC.
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
              multiple
              onChange={(e) => agregarFotos(e.target.files)}
              className="block w-full rounded-md border border-dashed border-input bg-card px-3 py-6 text-sm"
            />
            {fotos.length > 0 && (
              <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {fotos.map((f, i) => (
                  <li key={f.preview} className="relative">
                    <img
                      src={f.preview}
                      alt={`Foto de referencia ${i + 1}: ${f.file.name}`}
                      loading="lazy"
                      className="aspect-square w-full rounded-md border border-border object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => quitarFoto(i)}
                      aria-label={`Quitar ${f.file.name}`}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-xs text-primary-foreground"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <label className="block text-sm">
            <span className="mb-1 block font-medium">Cuéntanos sobre el retrato (opcional)</span>
            <textarea
              name="message"
              rows={4}
              maxLength={1500}
              className="w-full rounded-md border border-input bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <div className="rounded-lg border border-border bg-secondary/40 p-4 text-sm">
            <p className="text-muted-foreground">
              Tus fotos se guardan en un almacenamiento privado, se usan solo para crear tu obra y
              no se publican sin tu permiso. Puedes pedir su eliminación cuando quieras. Más
              detalles en{" "}
              <Link to="/legal" className="underline underline-offset-4">
                Términos y Privacidad
              </Link>
              .
            </p>
            <label className="mt-3 flex items-start gap-2">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1"
              />
              <span>
                Autorizo al estudio a usar estas fotos para crear el retrato y declaro contar con el
                permiso de las personas que aparecen en ellas.
              </span>
            </label>
          </div>

          {/* Campo Honeypot anti-spam (invisible para personas, detecta bots) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-md bg-primary px-6 py-3 text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {enviando ? "Enviando…" : "Enviar pedido"}
          </button>
        </form>
      </div>
    </SiteLayout>
  );
}
