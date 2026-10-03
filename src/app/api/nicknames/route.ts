import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { Nickname } from "@/types/nicknames";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  checkRateLimit,
  getClientIp,
  sanitizeText,
  verifyOriginOrCsrf,
  isBotSubmission,
} from "@/lib/security";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), "data");
const NICKNAMES_FILE = path.join(DATA_DIR, "nicknames.json");

const DEFAULT_NICKNAMES: Nickname[] = [
  { id: "nick-axel-1", text: "Amor", target: "sofi", createdAt: 1724300000000, hearts: 12 },
  { id: "nick-axel-2", text: "Mi amor", target: "sofi", createdAt: 1724300010000, hearts: 15 },
  { id: "nick-axel-3", text: "Mi niña", target: "sofi", createdAt: 1724300020000, hearts: 14 },
  { id: "nick-axel-4", text: "Mi chikis", target: "sofi", createdAt: 1724300030000, hearts: 9 },
  { id: "nick-axel-5", text: "My little wifey", target: "sofi", createdAt: 1724300040000, hearts: 16 },
  { id: "nick-axel-6", text: "Mi bebe", target: "sofi", createdAt: 1724300050000, hearts: 10 },
  { id: "nick-axel-7", text: "Mi bebesita", target: "sofi", createdAt: 1724300060000, hearts: 11 },
  { id: "nick-axel-8", text: "Mi cielo", target: "sofi", createdAt: 1724300070000, hearts: 13 },
  { id: "nick-axel-9", text: "Mi corazon", target: "sofi", createdAt: 1724300080000, hearts: 14 },
  { id: "nick-axel-10", text: "Mi vida", target: "sofi", createdAt: 1724300090000, hearts: 17 },
  { id: "nick-axel-11", text: "Mi nalgona", target: "sofi", createdAt: 1724300100000, hearts: 20 },
  { id: "nick-sofi-1", text: "Amor", target: "axel", createdAt: 1724300000000, hearts: 12 },
  { id: "nick-sofi-2", text: "Mi amor", target: "axel", createdAt: 1724300010000, hearts: 15 },
  { id: "nick-sofi-3", text: "Mi nene", target: "axel", createdAt: 1724300020000, hearts: 18 },
  { id: "nick-sofi-4", text: "Mi chiki", target: "axel", createdAt: 1724300030000, hearts: 11 },
  { id: "nick-sofi-5", text: "My husband", target: "axel", createdAt: 1724300040000, hearts: 19 },
  { id: "nick-sofi-6", text: "Mi bebe", target: "axel", createdAt: 1724300050000, hearts: 13 },
  { id: "nick-sofi-7", text: "Mi cielo", target: "axel", createdAt: 1724300060000, hearts: 14 },
  { id: "nick-sofi-8", text: "Mi corazon", target: "axel", createdAt: 1724300070000, hearts: 12 },
  { id: "nick-sofi-9", text: "Mi vida", target: "axel", createdAt: 1724300080000, hearts: 16 },
  { id: "nick-sofi-10", text: "Mi nalgon", target: "axel", createdAt: 1724300090000, hearts: 22 },
];

function toNicknameRow(item: Nickname) {
  return {
    id: item.id,
    text: item.text,
    meaning: item.meaning || null,
    target: item.target,
    created_at: item.createdAt,
    hearts: item.hearts || 1,
    audio_url: item.audioUrl || null,
  };
}

function fromNicknameRow(row: Record<string, unknown>): Nickname {
  return {
    id: String(row.id),
    text: String(row.text),
    meaning: row.meaning ? String(row.meaning) : undefined,
    target: row.target === "axel" ? "axel" : "sofi",
    createdAt: Number(row.created_at || Date.now()),
    hearts: Number(row.hearts || 1),
    audioUrl: row.audio_url ? String(row.audio_url) : undefined,
  };
}

async function readNicknamesFromFile(): Promise<Nickname[]> {
  try {
    const content = await readFile(NICKNAMES_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Return defaults if error
  }
  return DEFAULT_NICKNAMES;
}

async function writeNicknamesToFile(nicknames: Nickname[]): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(NICKNAMES_FILE, JSON.stringify(nicknames, null, 2), "utf-8");
  } catch (err) {
    console.warn("No se pudo escribir archivo local de apodos:", err);
  }
}

export async function GET(request: Request) {
  try {
    const ip = getClientIp(request);
    const rl = checkRateLimit(`get_nicks_${ip}`, 100, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Demasiadas solicitudes" }, { status: 429 });
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("nicknames")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        if (data.length > 0) {
          const nicknames = data.map((r: Record<string, unknown>) => fromNicknameRow(r));
          writeNicknamesToFile(nicknames).catch(() => {});
          return NextResponse.json({ nicknames });
        } else {
          const rows = DEFAULT_NICKNAMES.map(toNicknameRow);
          await supabase.from("nicknames").insert(rows);
          return NextResponse.json({ nicknames: DEFAULT_NICKNAMES });
        }
      } else if (error) {
        console.warn("Supabase nicknames GET error, usando respaldo local:", error.message);
      }
    }

    const nicknames = await readNicknamesFromFile();
    return NextResponse.json({ nicknames });
  } catch (error) {
    console.error("Error reading nicknames:", error);
    return NextResponse.json({ nicknames: DEFAULT_NICKNAMES });
  }
}

function sanitizeNickname(raw: unknown): Nickname | null {
  if (!raw || typeof raw !== "object") return null;
  const n = raw as Record<string, unknown>;
  if (typeof n.text !== "string" || !n.text.trim()) return null;

  const rawAudio = typeof n.audioUrl === "string" ? n.audioUrl.trim() : undefined;
  const safeAudio =
    rawAudio &&
    (rawAudio.startsWith("/uploads/") ||
      rawAudio.startsWith("blob:") ||
      rawAudio.startsWith("https://"))
      ? rawAudio.slice(0, 500)
      : undefined;

  return {
    id: String(n.id || `nick-${Date.now()}`).slice(0, 60),
    text: sanitizeText(n.text, 80),
    meaning: typeof n.meaning === "string" ? sanitizeText(n.meaning, 300) : undefined,
    target: n.target === "axel" ? "axel" : "sofi",
    createdAt: typeof n.createdAt === "number" ? n.createdAt : Date.now(),
    hearts: typeof n.hearts === "number" ? Math.max(0, n.hearts) : 0,
    audioUrl: safeAudio,
  };
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rl = checkRateLimit(`post_nicks_${ip}`, 45, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Límite de solicitudes superado." }, { status: 429 });
    }

    if (!verifyOriginOrCsrf(request)) {
      return NextResponse.json({ error: "Petición no permitida (CORS/Origin)" }, { status: 403 });
    }

    const body = await request.json();

    if (isBotSubmission(body)) {
      return NextResponse.json({ success: true, nicknames: [] });
    }

    let currentNicknames = await readNicknamesFromFile();

    if (body.action === "add" && body.nickname && typeof body.nickname === "object") {
      const sanitizedText = sanitizeText(body.nickname.text || "", 80);
      const capitalizedText = sanitizedText ? sanitizedText.charAt(0).toUpperCase() + sanitizedText.slice(1) : "";

      if (!capitalizedText) {
        return NextResponse.json(
          { error: "El apodo no puede estar vacío" },
          { status: 400 }
        );
      }

      const rawMeaning = body.nickname.meaning ? sanitizeText(body.nickname.meaning, 300) : undefined;
      const rawAudio = body.nickname.audioUrl ? String(body.nickname.audioUrl).trim() : undefined;
      const safeAudio =
        rawAudio &&
        (rawAudio.startsWith("/uploads/") ||
          rawAudio.startsWith("blob:") ||
          rawAudio.startsWith("https://"))
          ? rawAudio.slice(0, 500)
          : undefined;

      const newNickname: Nickname = {
        id: `nick-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        text: capitalizedText,
        meaning: rawMeaning,
        target: body.nickname.target === "axel" ? "axel" : "sofi",
        createdAt: Date.now(),
        hearts: 1,
        audioUrl: safeAudio,
      };

      if (isSupabaseConfigured && supabase) {
        await supabase.from("nicknames").insert(toNicknameRow(newNickname));
      }

      currentNicknames = [newNickname, ...currentNicknames];
    } else if (body.action === "delete" && typeof body.id === "string") {
      const cleanId = String(body.id).trim().slice(0, 80);
      if (isSupabaseConfigured && supabase) {
        await supabase.from("nicknames").delete().eq("id", cleanId);
      }
      currentNicknames = currentNicknames.filter((n) => n.id !== cleanId);
    } else if (body.action === "like" && typeof body.id === "string") {
      const cleanId = String(body.id).trim().slice(0, 80);
      currentNicknames = currentNicknames.map((n) =>
        n.id === cleanId ? { ...n, hearts: Math.min(9999, (n.hearts || 0) + 1) } : n
      );
      const updatedItem = currentNicknames.find((n) => n.id === cleanId);
      if (isSupabaseConfigured && supabase && updatedItem) {
        await supabase
          .from("nicknames")
          .update({ hearts: updatedItem.hearts, updated_at: new Date().toISOString() })
          .eq("id", cleanId);
      }
    } else if (Array.isArray(body.nicknames)) {
      currentNicknames = body.nicknames
        .map((item: unknown) => sanitizeNickname(item))
        .filter((n: Nickname | null): n is Nickname => n !== null)
        .slice(0, 300);

      if (isSupabaseConfigured && supabase && currentNicknames.length > 0) {
        const rows = currentNicknames.map(toNicknameRow);
        await supabase.from("nicknames").upsert(rows);
      }
    } else {
      return NextResponse.json(
        { error: "Acción o datos inválidos" },
        { status: 400 }
      );
    }

    await writeNicknamesToFile(currentNicknames);
    return NextResponse.json({ success: true, nicknames: currentNicknames });
  } catch (error) {
    console.error("Error updating nicknames:", error);
    return NextResponse.json(
      { error: "Error al actualizar apodos" },
      { status: 500 }
    );
  }
}
