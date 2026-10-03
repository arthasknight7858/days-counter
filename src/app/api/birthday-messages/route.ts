import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
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
const MESSAGES_FILE = path.join(DATA_DIR, "birthday_messages.json");

const DEFAULT_MESSAGES = {
  axel: "",
  sofi: "",
};

async function readMessagesFromFile(): Promise<{ axel: string; sofi: string }> {
  try {
    const content = await readFile(MESSAGES_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed === "object") {
      return {
        axel: typeof parsed.axel === "string" ? parsed.axel : "",
        sofi: typeof parsed.sofi === "string" ? parsed.sofi : "",
      };
    }
  } catch {
    // ignore
  }
  return DEFAULT_MESSAGES;
}

async function writeMessagesToFile(messages: { axel: string; sofi: string }): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
  } catch (err) {
    console.warn("No se pudo escribir archivo local de mensajes:", err);
  }
}

export async function GET(request: Request) {
  try {
    const ip = getClientIp(request);
    const rl = checkRateLimit(`get_bday_${ip}`, 100, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Demasiadas peticiones" }, { status: 429 });
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("birthday_messages")
        .select("axel, sofi")
        .eq("id", "main")
        .maybeSingle();

      if (!error && data) {
        const messages = {
          axel: typeof data.axel === "string" ? data.axel : "",
          sofi: typeof data.sofi === "string" ? data.sofi : "",
        };
        writeMessagesToFile(messages).catch(() => {});
        return NextResponse.json({ messages });
      } else if (error) {
        console.warn("Supabase birthday-messages GET error, usando respaldo local:", error.message);
      }
    }

    const messages = await readMessagesFromFile();
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error reading birthday messages:", error);
    return NextResponse.json({ messages: DEFAULT_MESSAGES });
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rl = checkRateLimit(`post_bday_${ip}`, 30, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Límite de solicitudes superado." }, { status: 429 });
    }

    if (!verifyOriginOrCsrf(request)) {
      return NextResponse.json({ error: "Petición no permitida (CORS/Origin)" }, { status: 403 });
    }

    const body = await request.json();

    if (isBotSubmission(body)) {
      return NextResponse.json({ success: true, messages: DEFAULT_MESSAGES });
    }

    const current = await readMessagesFromFile();

    if (body.person === "axel" || body.person === "sofi") {
      current[body.person as "axel" | "sofi"] = sanitizeText(body.message, 5000);
    } else if (body.messages && typeof body.messages === "object") {
      if (typeof body.messages.axel === "string") current.axel = sanitizeText(body.messages.axel, 5000);
      if (typeof body.messages.sofi === "string") current.sofi = sanitizeText(body.messages.sofi, 5000);
    } else {
      return NextResponse.json({ error: "Datos de mensaje no válidos" }, { status: 400 });
    }

    if (isSupabaseConfigured && supabase) {
      await supabase
        .from("birthday_messages")
        .upsert({
          id: "main",
          axel: current.axel,
          sofi: current.sofi,
          updated_at: new Date().toISOString(),
        });
    }

    await writeMessagesToFile(current);
    return NextResponse.json({ success: true, messages: current });
  } catch (error) {
    console.error("Error saving birthday message:", error);
    return NextResponse.json({ error: "Error al guardar mensaje" }, { status: 500 });
  }
}
