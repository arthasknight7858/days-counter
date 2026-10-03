import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { CustomNote } from "@/types/notes";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  checkRateLimit,
  getClientIp,
  sanitizeText,
  isBotSubmission,
  verifyOriginOrCsrf,
} from "@/lib/security";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), "data");
const NOTES_FILE = path.join(DATA_DIR, "notes.json");

const INITIAL_AXEL_NOTE: CustomNote = {
  id: "axel-consejos-inicial",
  title: "Consejos & Rutas para tu Aprendizaje 🌟",
  content: `Mi amor, todas las rutas y recursos que están aquí son para ti. Si quieres aprender más cosas o quieres cambios, no dudes en decirme. Mi recomendación es que aprendas inglés y a la par arquitectura dividiéndote el tiempo, y también hagas un poco de ejercicio, a diario si puedes o 3 veces a la semana.

Quiero que no te rindas y le des la oportunidad a todo lo que quieres hacer y lograr mi amor. Cuentas con mi apoyo siempre y te ayudaré en todo lo que te propongas. Aprende el inglés poco a poco; el canal de Inglés con el Güero me pareció bastante bueno para ir iniciando, y cuando ya te vayas acostumbrando al idioma puedes recurrir a mí para practicar escribir y hablar juntos.

Si quieres aún más ayuda usa ChatGPT y Claude para buscar y aprender la información. Los módulos de estudio que te di tienen los temarios, así que ve por cada uno en orden: estúdialo, entiéndelo y continúa con el siguiente. Para los idiomas usa Duolingo.

Para hacer ejercicio son geniales los videos de cardio (20 a 30 min) y abdominales (10 a 20 min).

Recuerda que siempre estaré ahí para ti y escucharte, y te ayudaré en todo lo que necesites y te propongas mi amor. ¡Te amo con toda mi alma! ❤️`,
  date: "22 de Agosto de 2026",
  color: "amber",
  category: "amor",
  emoji: "🌟",
  isPinned: true,
  isAxelSpecial: true,
  createdAt: 1724300000000,
  reactions: 5,
};

function toNoteRow(note: CustomNote) {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    date: note.date,
    color: note.color,
    category: note.category,
    emoji: note.emoji,
    image_url: note.imageUrl || null,
    media_url: note.mediaUrl || null,
    media_type: note.mediaType || null,
    media_name: note.mediaName || null,
    media_size: note.mediaSize || null,
    is_pinned: note.isPinned || false,
    is_axel_special: note.isAxelSpecial || false,
    created_at: note.createdAt,
    reactions: note.reactions || 0,
  };
}

function fromNoteRow(row: Record<string, unknown>): CustomNote {
  return {
    id: String(row.id),
    title: String(row.title),
    content: String(row.content),
    date: String(row.date || ""),
    color: (row.color as CustomNote["color"]) || "purple",
    category: (row.category as CustomNote["category"]) || "amor",
    emoji: String(row.emoji || "🌟"),
    imageUrl: row.image_url ? String(row.image_url) : undefined,
    mediaUrl: row.media_url ? String(row.media_url) : undefined,
    mediaType: (row.media_type as CustomNote["mediaType"]) || undefined,
    mediaName: row.media_name ? String(row.media_name) : undefined,
    mediaSize: typeof row.media_size === "number" || typeof row.media_size === "string" ? Number(row.media_size) : undefined,
    isPinned: Boolean(row.is_pinned),
    isAxelSpecial: Boolean(row.is_axel_special),
    createdAt: Number(row.created_at || Date.now()),
    reactions: Number(row.reactions || 0),
  };
}

async function readNotesFromFile(): Promise<CustomNote[]> {
  try {
    const content = await readFile(NOTES_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // File doesn't exist or is invalid JSON
  }
  return [INITIAL_AXEL_NOTE];
}

async function writeNotesToFile(notes: CustomNote[]): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(NOTES_FILE, JSON.stringify(notes, null, 2), "utf-8");
  } catch (err) {
    console.warn("No se pudo escribir archivo local de notas:", err);
  }
}

export async function GET(request: Request) {
  try {
    // Rate limit para prevenir scraping o saturación
    const ip = getClientIp(request);
    const rl = checkRateLimit(`get_notes_${ip}`, 120, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Por favor espera unos momentos." },
        { status: 429, headers: { "Retry-After": String(rl.resetInSeconds) } }
      );
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        if (data.length > 0) {
          const notes = data.map((r: Record<string, unknown>) => fromNoteRow(r));
          writeNotesToFile(notes).catch(() => {});
          return NextResponse.json({ notes });
        } else {
          // Si la tabla está vacía, sembrar la nota de Axel
          await supabase.from("notes").insert(toNoteRow(INITIAL_AXEL_NOTE));
          return NextResponse.json({ notes: [INITIAL_AXEL_NOTE] });
        }
      } else if (error) {
        console.warn("Supabase notes GET error, usando respaldo local:", error.message);
      }
    }

    const notes = await readNotesFromFile();
    return NextResponse.json({ notes });
  } catch (error) {
    console.error("Error reading notes:", error);
    return NextResponse.json({ notes: [INITIAL_AXEL_NOTE] });
  }
}

const VALID_COLORS = new Set(["purple", "pink", "amber", "emerald", "cyan", "rose", "indigo"]);
const VALID_CATEGORIES = new Set(["amor", "metas", "recuerdos", "recordatorios", "citas"]);

function sanitizeNote(n: unknown): CustomNote | null {
  if (!n || typeof n !== "object") return null;
  const raw = n as Record<string, unknown>;

  if (typeof raw.id !== "string" || !raw.id.trim()) return null;
  if (typeof raw.title !== "string") return null;
  if (typeof raw.content !== "string") return null;

  const color = typeof raw.color === "string" && VALID_COLORS.has(raw.color)
    ? (raw.color as CustomNote["color"])
    : "purple";

  const category = typeof raw.category === "string" && VALID_CATEGORIES.has(raw.category)
    ? (raw.category as CustomNote["category"])
    : "amor";

  return {
    id: raw.id.trim().slice(0, 100),
    title: sanitizeText(raw.title, 300),
    content: sanitizeText(raw.content, 50000),
    date: typeof raw.date === "string" ? sanitizeText(raw.date, 100) : "",
    color,
    category,
    emoji: typeof raw.emoji === "string" ? sanitizeText(raw.emoji, 10) : "📝",
    imageUrl: typeof raw.imageUrl === "string" ? raw.imageUrl.slice(0, 2000) : undefined,
    mediaUrl: typeof raw.mediaUrl === "string" ? raw.mediaUrl.slice(0, 2000) : undefined,
    mediaType: raw.mediaType === "audio" || raw.mediaType === "video" || raw.mediaType === "image" ? raw.mediaType : undefined,
    mediaName: typeof raw.mediaName === "string" ? sanitizeText(raw.mediaName, 200) : undefined,
    mediaSize: typeof raw.mediaSize === "number" ? raw.mediaSize : undefined,
    isPinned: Boolean(raw.isPinned),
    isAxelSpecial: Boolean(raw.isAxelSpecial),
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now(),
    reactions: typeof raw.reactions === "number" ? Math.max(0, Math.floor(raw.reactions)) : 0,
  };
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    // Rate limit: 45 mutaciones por minuto por IP
    const rl = checkRateLimit(`post_notes_${ip}`, 45, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Límite de solicitudes superado. Por favor espera." },
        { status: 429, headers: { "Retry-After": String(rl.resetInSeconds) } }
      );
    }

    if (!verifyOriginOrCsrf(request)) {
      return NextResponse.json({ error: "Petición no autorizada (CSRF/Origin)" }, { status: 403 });
    }

    const body = await request.json();

    // Detección de bots
    if (isBotSubmission(body)) {
      return NextResponse.json({ success: true, count: 0, notes: [] });
    }

    let updatedNotes: CustomNote[] = [];

    if (body.action === "delete" && typeof body.id === "string") {
      const cleanId = String(body.id).trim().slice(0, 100);
      if (isSupabaseConfigured && supabase) {
        await supabase.from("notes").delete().eq("id", cleanId);
      }
      const currentNotes = await readNotesFromFile();
      updatedNotes = currentNotes.filter((n) => n.id !== cleanId);
    } else if (Array.isArray(body.notes)) {
      const sanitized = body.notes
        .map((item: unknown) => sanitizeNote(item))
        .filter((n: CustomNote | null): n is CustomNote => n !== null);
      updatedNotes = sanitized.slice(0, 500);

      if (isSupabaseConfigured && supabase && updatedNotes.length > 0) {
        const rows = updatedNotes.map(toNoteRow);
        await supabase.from("notes").upsert(rows);
      }
    } else if (body.note && typeof body.note === "object") {
      const sanitized = sanitizeNote(body.note);
      if (!sanitized) {
        return NextResponse.json({ error: "Datos de nota inválidos" }, { status: 400 });
      }

      if (isSupabaseConfigured && supabase) {
        await supabase.from("notes").upsert(toNoteRow(sanitized));
      }

      const currentNotes = await readNotesFromFile();
      const existingIndex = currentNotes.findIndex((n) => n.id === sanitized.id);
      if (existingIndex >= 0) {
        currentNotes[existingIndex] = sanitized;
        updatedNotes = currentNotes;
      } else {
        updatedNotes = [sanitized, ...currentNotes];
      }
    } else {
      return NextResponse.json(
        { error: "Formato de datos no válido" },
        { status: 400 }
      );
    }

    await writeNotesToFile(updatedNotes);
    return NextResponse.json({ success: true, count: updatedNotes.length, notes: updatedNotes });
  } catch (error) {
    console.error("Error saving notes:", error);
    return NextResponse.json(
      { error: "Error al guardar notas en el servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const ip = getClientIp(request);
    const rl = checkRateLimit(`delete_notes_${ip}`, 30, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Límite de solicitudes superado." },
        { status: 429 }
      );
    }

    if (!verifyOriginOrCsrf(request)) {
      return NextResponse.json({ error: "Petición no autorizada" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID de nota requerido" }, { status: 400 });
    }
    const cleanId = id.trim().slice(0, 100);

    if (isSupabaseConfigured && supabase) {
      await supabase.from("notes").delete().eq("id", cleanId);
    }

    const currentNotes = await readNotesFromFile();
    const updatedNotes = currentNotes.filter((n) => n.id !== cleanId);
    await writeNotesToFile(updatedNotes);
    return NextResponse.json({ success: true, count: updatedNotes.length, notes: updatedNotes });
  } catch (error) {
    console.error("Error deleting note from server:", error);
    return NextResponse.json(
      { error: "Error al eliminar nota en el servidor" },
      { status: 500 }
    );
  }
}
