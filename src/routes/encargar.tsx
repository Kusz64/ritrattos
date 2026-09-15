import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { crearPedido, crearUrlDeSubida } from "@/lib/orders.functions";

const titulo = "Encargar un retrato personalizado | Estudio Kusz";
const descripcion =
  "Encarga tu retrato al óleo, digital o certificado. Sube tus fotos, elige estilo y tamaño y recibe la confirmación por correo.";

const TIPOS = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const MAX_MB = 20;
const MAX_FOTOS = 8;

const estilos = [
  { valor: "oleo", etiqueta: "Óleo sobre lienzo" },
  { valor: "digital", etiqueta: "Pintura digital" },
  { valor: "certificado", etiqueta: "Certificado o diploma" },
] as const;

const tamanos = ["30 × 30 cm", "40 × 40 cm", "50 × 50 cm", "70 × 70 cm", "A consultar"];

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Ingresa tu nombre").max(120),
  email: z.string().trim().email("Revisa tu correo").max(255),
  phone: z.string().trim().max(40),
  style: z.enum(["oleo", "digital", "certificado"]),
  size: z.string().trim().min(1),
  message: z.string().trim().max(1500),
});

export const Route = createFileRoute("/encargar")({
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
  component: Encargar,
});

function Encargar() {
  const pedirUrl = useServerFn(crearUrlDeSubida);
  const enviarPedido = useServerFn(crearPedido);

  const [fotos, setFotos] = useState<{ file: File; preview: string }[]>([]);
  const [consent, setConsent] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
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
        const { error } = await supabase.storage
          .from("order-photos")
          .uploadToSignedUrl(path, token, file);
        if (error) throw new Error(`No se pudo subir ${file.name}`);
        paths.push(path);
      }

      await enviarPedido({
        data: { ...parsed.data, photoPaths: paths, consent: true },
      });

      setListo(true);
      setFotos([]);
      toast.success("¡Pedido recibido! Te escribimos a tu correo.");
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
        <div className="mx-auto max-w-2xl px-5 py-24 text-center">
          <h1 className="font-serif text-4xl">Gracias, recibimos tu pedido</h1>
          <p className="mt-4 text-muted-foreground">
            Revisaremos tus fotos y te responderemos por correo dentro de las próximas 24 horas
            hábiles con el presupuesto y los pasos a seguir.
          </p>
          <Link
            to="/portafolio"
            className="mt-8 inline-block rounded-md bg-primary px-6 py-3 text-primary-foreground"
          >
            Ver el portafolio
          </Link>
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
