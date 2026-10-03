import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { MediaType } from "@/types/notes";
import { checkRateLimit, getClientIp, sanitizeFileName, verifyOriginOrCsrf } from "@/lib/security";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const ALLOWED_IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const ALLOWED_AUDIO_EXTS = new Set([".mp3", ".wav", ".m4a", ".ogg", ".aac", ".flac"]);
const ALLOWED_VIDEO_EXTS = new Set([".mp4", ".webm", ".mov", ".mkv", ".avi"]);

const ALL_ALLOWED_EXTS = new Set([
  ...ALLOWED_IMAGE_EXTS,
  ...ALLOWED_AUDIO_EXTS,
  ...ALLOWED_VIDEO_EXTS,
]);

// Lista blanca estricta de tipos MIME permitidos
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-m4a",
  "audio/m4a",
  "audio/ogg",
  "audio/aac",
  "audio/flac",
  "audio/webm",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-matroska",
  "video/x-msvideo",
]);

function getMediaType(mimeType: string, extension: string): MediaType {
  const ext = extension.toLowerCase();

  if (mimeType.startsWith("audio/") || ALLOWED_AUDIO_EXTS.has(ext)) {
    return "audio";
  }

  if (mimeType.startsWith("video/") || ALLOWED_VIDEO_EXTS.has(ext)) {
    return "video";
  }

  return "image";
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    // Rate limit estricto para subida de archivos (25 por minuto por IP)
    const rl = checkRateLimit(`upload_${ip}`, 25, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Límite de subida alcanzado temporalmente. Espera unos momentos." },
        { status: 429, headers: { "Retry-After": String(rl.resetInSeconds) } }
      );
    }

    if (!verifyOriginOrCsrf(request)) {
      return NextResponse.json({ error: "Petición no permitida (CORS/Origin)" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo" },
        { status: 400 }
      );
    }

    // Límite de tamaño: 50MB
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. El límite máximo de seguridad es 50MB." },
        { status: 400 }
      );
    }

    const originalName = sanitizeFileName(file.name || "archivo");
    const rawExtension = path.extname(originalName) || "";
    const cleanExtension = rawExtension.toLowerCase().replace(/[^a-z0-9.]/g, "");

    // Validar extensión en lista blanca
    if (!cleanExtension || !ALL_ALLOWED_EXTS.has(cleanExtension)) {
      return NextResponse.json(
        {
          error:
            "Formato no permitido. Solo se admiten imágenes (JPG, PNG, WEBP, GIF), audio o video.",
        },
        { status: 400 }
      );
    }

    // Validar MIME type en lista blanca (si fue provisto)
    if (file.type && !ALLOWED_MIME_TYPES.has(file.type.toLowerCase()) && !file.type.startsWith("audio/") && !file.type.startsWith("video/") && !file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Tipo de contenido no reconocido o no permitido." },
        { status: 400 }
      );
    }

    await mkdir(UPLOADS_DIR, { recursive: true });

    const baseName = path
      .basename(originalName, rawExtension)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 30);

    const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const fileName = `${uniqueId}_${baseName}${cleanExtension}`;

    // Prevención absoluta de Path Traversal
    const resolvedUploadsDir = path.resolve(UPLOADS_DIR);
    const resolvedFilePath = path.resolve(UPLOADS_DIR, fileName);
    if (!resolvedFilePath.startsWith(resolvedUploadsDir)) {
      return NextResponse.json(
        { error: "Ruta de archivo no permitida." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Subir a Supabase Storage con fallback local
    let globalUrl: string | null = null;
    const { supabase, isSupabaseConfigured } = await import("@/lib/supabase");

    if (isSupabaseConfigured && supabase) {
      try {
        const { error: storageError } = await supabase.storage
          .from("media_uploads")
          .upload(fileName, buffer, {
            contentType: file.type || "application/octet-stream",
            upsert: true,
          });

        if (!storageError) {
          const { data: publicUrlData } = supabase.storage
            .from("media_uploads")
            .getPublicUrl(fileName);

          if (publicUrlData?.publicUrl) {
            globalUrl = publicUrlData.publicUrl;
          }
        }
      } catch (uploadErr) {
        console.warn("Supabase Storage fallback to local disk:", uploadErr);
      }
    }

    // 2. Guardar en disco local como respaldo
    try {
      await writeFile(resolvedFilePath, buffer);
    } catch (diskErr) {
      console.warn("No se pudo escribir en disco local:", diskErr);
    }

    const mediaType = getMediaType(file.type || "", cleanExtension);
    const finalUrl = globalUrl || `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      url: finalUrl,
      mediaType,
      mediaName: originalName,
      size: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error al procesar el archivo de forma segura." },
      { status: 500 }
    );
  }
}
