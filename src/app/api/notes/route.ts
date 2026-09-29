import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { CustomNote } from "@/types/notes";

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

async function readNotesFromFile(): Promise<CustomNote[]> {
  try {
    const content = await readFile(NOTES_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // File doesn't exist or is invalid JSON
  }
  return [INITIAL_AXEL_NOTE];
}

async function writeNotesToFile(notes: CustomNote[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(NOTES_FILE, JSON.stringify(notes, null, 2), "utf-8");
}

export async function GET() {
  try {
    const notes = await readNotesFromFile();
    return NextResponse.json({ notes });
  } catch (error) {
    console.error("Error reading notes:", error);
    return NextResponse.json({ notes: [INITIAL_AXEL_NOTE] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let updatedNotes: CustomNote[] = [];

    if (Array.isArray(body.notes)) {
      updatedNotes = body.notes;
    } else if (body.note && typeof body.note === "object") {
      const currentNotes = await readNotesFromFile();
      const existingIndex = currentNotes.findIndex((n) => n.id === body.note.id);
      if (existingIndex >= 0) {
        currentNotes[existingIndex] = body.note;
        updatedNotes = currentNotes;
      } else {
        updatedNotes = [body.note, ...currentNotes];
      }
    } else {
      return NextResponse.json(
        { error: "Formato de datos no válido" },
        { status: 400 }
      );
    }

    await writeNotesToFile(updatedNotes);
    return NextResponse.json({ success: true, count: updatedNotes.length });
  } catch (error) {
    console.error("Error saving notes:", error);
    return NextResponse.json(
      { error: "Error al guardar notas en el servidor" },
      { status: 500 }
    );
  }
}
