import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { MediaType } from "@/types/notes";

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
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo" },
        { status: 400 }
      );
    }

    // Limit check: 100MB
    const MAX_SIZE = 100 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. El límite máximo es 100MB." },
        { status: 400 }
      );
    }

    const originalName = file.name || "archivo";
    const rawExtension = path.extname(originalName) || "";
    const cleanExtension = rawExtension.toLowerCase().replace(/[^a-z0-9.]/g, "");

    // Validar extensión permitida
    if (!cleanExtension || !ALL_ALLOWED_EXTS.has(cleanExtension)) {
      return NextResponse.json(
        {
          error:
            "Formato de archivo no permitido. Solo se admiten fotos (JPG, PNG, WEBP, GIF), audio (MP3, WAV, M4A, OGG) o video (MP4, WEBM, MOV).",
        },
        { status: 400 }
      );
    }

    await mkdir(UPLOADS_DIR, { recursive: true });

    const baseName = path
      .basename(originalName, rawExtension)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 40);

    const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const fileName = `${uniqueId}_${baseName}${cleanExtension}`;
    
    // Path traversal defense
    const resolvedUploadsDir = path.resolve(UPLOADS_DIR);
    const resolvedFilePath = path.resolve(UPLOADS_DIR, fileName);
    if (!resolvedFilePath.startsWith(resolvedUploadsDir)) {
      return NextResponse.json(
        { error: "Nombre de archivo no válido." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Intentar subir a Supabase Storage (para persistencia global en la nube)
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
        } else {
          console.warn("Aviso: Supabase Storage error, guardando en disco local:", storageError.message);
        }
      } catch (uploadErr) {
        console.warn("Aviso: Fallo conectando con Supabase Storage, usando respaldo local:", uploadErr);
      }
    }

    // 2. Guardar también en disco local como respaldo
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
      { error: "Error al procesar y guardar el archivo en el servidor." },
      { status: 500 }
    );
  }
}
