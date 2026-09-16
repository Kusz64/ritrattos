import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const MAX_BYTES = 20 * 1024 * 1024;

const uploadSchema = z.object({
  filename: z.string().trim().min(1).max(200),
  contentType: z.string().trim().min(3).max(100),
  size: z.number().int().positive().max(MAX_BYTES),
});

export const crearUrlDeSubida = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => uploadSchema.parse(data))
  .handler(async ({ data }) => {
    if (!TIPOS_PERMITIDOS.includes(data.contentType.toLowerCase())) {
      throw new Error("Formato de imagen no permitido");
    }
    const ext = (data.filename.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext || "jpg"}`;

    if (!process.env["SUPABASE_SERVICE_ROLE_KEY"]) {
      console.log("[LOCAL DEV] Subida de foto simulada:", path);
      return { path, token: "local-dev-token" };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error } = await supabaseAdmin.storage
      .from("order-photos")
      .createSignedUploadUrl(path);

    if (error || !signed) throw new Error("No se pudo preparar la subida de la foto");
    return { path: signed.path, token: signed.token };
  });

const pedidoSchema = z.object({
  fullName: z.string().trim().min(2, "Ingresa tu nombre").max(120),
  email: z.string().trim().email("Correo no válido").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  style: z.enum(["oleo", "acuarela", "digital", "certificado"]),
  size: z.string().trim().min(1).max(60),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
  photoPaths: z.array(z.string().trim().min(1).max(300)).min(1, "Sube al menos una foto").max(8),
  consent: z.literal(true),
});

export const crearPedido = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => pedidoSchema.parse(data))
  .handler(async ({ data }) => {
    if (!process.env["SUPABASE_SERVICE_ROLE_KEY"]) {
      console.log("[LOCAL DEV] Pedido recibido en desarrollo local:", data);
      return { id: `local-dev-${Date.now()}` };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("orders")
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || null,
        style: data.style,
        size: data.size,
        message: data.message || null,
        photo_paths: data.photoPaths,
        consent: data.consent,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Error al guardar el pedido", error);
      throw new Error("No se pudo registrar el pedido. Intenta nuevamente.");
    }

    return { id: row.id };
  });
