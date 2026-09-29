import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { MediaType } from "@/types/notes";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

function getMediaType(mimeType: string, extension: string): MediaType {
  const ext = extension.toLowerCase().replace(".", "");

  if (
    mimeType.startsWith("audio/") ||
    ["mp3", "wav", "m4a", "ogg", "aac", "flac"].includes(ext)
  ) {
    return "audio";
  }

  if (
    mimeType.startsWith("video/") ||
    ["mp4", "webm", "mov", "mkv", "avi"].includes(ext)
  ) {
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

    await mkdir(UPLOADS_DIR, { recursive: true });

    const originalName = file.name || "archivo";
    const extension = path.extname(originalName) || "";
    const baseName = path
      .basename(originalName, extension)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 40);

    const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const fileName = `${uniqueId}_${baseName}${extension.toLowerCase()}`;
    const filePath = path.join(UPLOADS_DIR, fileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    const mediaType = getMediaType(file.type || "", extension);

    return NextResponse.json({
      success: true,
      url: `/uploads/${fileName}`,
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
