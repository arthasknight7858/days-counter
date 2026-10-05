import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { MediaType } from "@/types/notes";
import { checkRateLimit, getClientIp, sanitizeFileName, verifyOriginOrCsrf } from "@/lib/security";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const ALLOWED_IMAGE_EXTS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".heic",
  ".heif",
  ".avif",
  ".svg",
  ".bmp",
  ".ico",
  ".tiff",
  ".tif",
]);

const ALLOWED_AUDIO_EXTS = new Set([
  ".mp3",
  ".wav",
  ".m4a",
  ".ogg",
  ".aac",
  ".flac",
  ".webm",
  ".weba",
  ".opus",
  ".caf",
  ".wma",
  ".mid",
  ".midi",
]);

const ALLOWED_VIDEO_EXTS = new Set([
  ".mp4",
  ".webm",
  ".mov",
  ".mkv",
  ".avi",
  ".3gp",
  ".m4v",
  ".wmv",
  ".ogv",
  ".flv",
]);

const ALLOWED_DOC_EXTS = new Set([
  ".pdf",
  ".txt",
]);

const ALL_ALLOWED_EXTS = new Set([
  ...ALLOWED_IMAGE_EXTS,
  ...ALLOWED_AUDIO_EXTS,
  ...ALLOWED_VIDEO_EXTS,
  ...ALLOWED_DOC_EXTS,
]);

function getExtensionFromMime(mime: string): string {
  const m = mime.toLowerCase();
  if (m.includes("jpeg") || m.includes("jpg")) return ".jpg";
  if (m.includes("png")) return ".png";
  if (m.includes("webp")) return ".webp";
  if (m.includes("gif")) return ".gif";
  if (m.includes("heic")) return ".heic";
  if (m.includes("heif")) return ".heif";
  if (m.includes("avif")) return ".avif";
  if (m.includes("svg")) return ".svg";
  if (m.includes("bmp")) return ".bmp";
  if (m.includes("mp3") || m.includes("mpeg")) return ".mp3";
  if (m.includes("wav")) return ".wav";
  if (m.includes("ogg")) return ".ogg";
  if (m.includes("m4a") || m.includes("mp4a")) return ".m4a";
  if (m.includes("aac")) return ".aac";
  if (m.includes("flac")) return ".flac";
  if (m.includes("opus")) return ".opus";
  if (m.includes("webm") && m.startsWith("audio/")) return ".webm";
  if (m.includes("mp4")) return ".mp4";
  if (m.includes("quicktime") || m.includes("mov")) return ".mov";
  if (m.includes("webm")) return ".webm";
  if (m.includes("pdf")) return ".pdf";
  if (m.startsWith("image/")) return ".jpg";
  if (m.startsWith("audio/")) return ".mp3";
  if (m.startsWith("video/")) return ".mp4";
  return "";
}

function getMediaType(mimeType: string, extension: string): MediaType {
  const ext = extension.toLowerCase();
  const mime = mimeType.toLowerCase();

  if (mime.startsWith("audio/") || ALLOWED_AUDIO_EXTS.has(ext)) {
    return "audio";
  }

  if (mime.startsWith("video/") || ALLOWED_VIDEO_EXTS.has(ext)) {
    return "video";
  }

  return "image";
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    // Rate limit generoso para permitir subidas múltiples en álbumes (100 por minuto por IP)
    const rl = checkRateLimit(`upload_${ip}`, 100, 60_000);
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
        { error: "No se proporcionó ningún archivo para subir" },
        { status: 400 }
      );
    }

    // Límite de tamaño: 75MB
    const MAX_SIZE = 75 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. El límite máximo admitido es 75MB." },
        { status: 400 }
      );
    }

    const originalName = sanitizeFileName(file.name || "archivo");
    const rawExtension = path.extname(originalName) || "";
    let cleanExtension = rawExtension.toLowerCase().replace(/[^a-z0-9.]/g, "");

    // Si el nombre no traía extensión (común en fotos de cámara web o móviles), deducirla del MIME type
    if (!cleanExtension && file.type) {
      cleanExtension = getExtensionFromMime(file.type);
    }

    // Si aún no tiene extensión, pero el MIME es conocido, asignar por defecto
    const isImageMime = file.type && file.type.startsWith("image/");
    const isAudioMime = file.type && file.type.startsWith("audio/");
    const isVideoMime = file.type && file.type.startsWith("video/");

    if (!cleanExtension) {
      if (isImageMime) cleanExtension = ".jpg";
      else if (isAudioMime) cleanExtension = ".mp3";
      else if (isVideoMime) cleanExtension = ".mp4";
      else cleanExtension = ".bin";
    }

    // Validar extensión o tipo MIME
    const isKnownExtension = ALL_ALLOWED_EXTS.has(cleanExtension);
    const isAllowedMime = isImageMime || isAudioMime || isVideoMime || file.type === "application/pdf";

    if (!isKnownExtension && !isAllowedMime) {
      return NextResponse.json(
        {
          error:
            "Formato de archivo no reconocido. Puedes subir fotos (JPG, PNG, WEBP, HEIC, GIF, AVIF), audios o videos.",
        },
        { status: 400 }
      );
    }

    const baseName = path
      .basename(originalName, rawExtension)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 30) || "foto";

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

    // 1. Subir a Supabase Storage con soporte para todos los tipos de media
    let globalUrl: string | null = null;
    try {
      const { supabase, isSupabaseConfigured } = await import("@/lib/supabase");

      if (isSupabaseConfigured && supabase) {
        let contentType = file.type;
        if (!contentType || contentType === "application/octet-stream") {
          if (cleanExtension === ".jpg" || cleanExtension === ".jpeg") contentType = "image/jpeg";
          else if (cleanExtension === ".png") contentType = "image/png";
          else if (cleanExtension === ".webp") contentType = "image/webp";
          else if (cleanExtension === ".gif") contentType = "image/gif";
          else if (cleanExtension === ".heic") contentType = "image/heic";
          else if (cleanExtension === ".heif") contentType = "image/heif";
          else if (cleanExtension === ".avif") contentType = "image/avif";
          else if (cleanExtension === ".mp3") contentType = "audio/mpeg";
          else if (cleanExtension === ".wav") contentType = "audio/wav";
          else if (cleanExtension === ".ogg") contentType = "audio/ogg";
          else if (cleanExtension === ".m4a") contentType = "audio/m4a";
          else if (cleanExtension === ".mp4") contentType = "video/mp4";
          else if (cleanExtension === ".webm") contentType = isAudioMime ? "audio/webm" : "video/webm";
          else contentType = "application/octet-stream";
        }

        const { error: storageError } = await supabase.storage
          .from("media_uploads")
          .upload(fileName, buffer, {
            contentType,
            upsert: true,
          });

        if (!storageError) {
          const { data: publicUrlData } = supabase.storage
            .from("media_uploads")
            .getPublicUrl(fileName);

          if (publicUrlData?.publicUrl) {
            globalUrl = publicUrlData.publicUrl;
          }
        } else {
          console.warn("Supabase Storage aviso:", storageError.message);
        }
      }
    } catch (uploadErr) {
      console.warn("Aviso al contactar Supabase Storage:", uploadErr);
    }

    // 2. Guardar en disco local como respaldo (de forma segura contra sistemas de archivos de solo lectura)
    let localSaved = false;
    try {
      await mkdir(UPLOADS_DIR, { recursive: true });
      await writeFile(resolvedFilePath, buffer);
      localSaved = true;
    } catch (diskErr) {
      // En entornos Serverless como Vercel el disco raíz es read-only; esto es esperado y seguro
      console.warn("Almacenamiento en disco local no disponible (posible entorno de solo lectura):", diskErr);
    }

    const mediaType = getMediaType(file.type || "", cleanExtension);

    // 3. Determinar URL final garantizada
    let finalUrl: string;
    if (globalUrl) {
      finalUrl = globalUrl;
    } else if (localSaved) {
      finalUrl = `/uploads/${fileName}`;
    } else {
      // 4. Si falló Supabase y el disco local es de solo lectura, generar Data URL para que NUNCA falle la subida
      const mime = file.type || (cleanExtension === ".png" ? "image/png" : "image/jpeg");
      finalUrl = `data:${mime};base64,${buffer.toString("base64")}`;
    }

    return NextResponse.json({
      success: true,
      url: finalUrl,
      mediaType,
      mediaName: originalName,
      size: file.size,
    });
  } catch (error) {
    console.error("Upload error general:", error);
    return NextResponse.json(
      { error: "Error al procesar el archivo. Por favor intenta nuevamente." },
      { status: 500 }
    );
  }
}
