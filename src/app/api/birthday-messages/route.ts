import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

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
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
}

export async function GET() {
  try {
    const messages = await readMessagesFromFile();
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error reading birthday messages:", error);
    return NextResponse.json({ messages: DEFAULT_MESSAGES });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const current = await readMessagesFromFile();

    if (body.person === "axel" || body.person === "sofi") {
      current[body.person as "axel" | "sofi"] = String(body.message || "").trim().slice(0, 5000);
    } else if (body.messages && typeof body.messages === "object") {
      if (typeof body.messages.axel === "string") current.axel = body.messages.axel.trim().slice(0, 5000);
      if (typeof body.messages.sofi === "string") current.sofi = body.messages.sofi.trim().slice(0, 5000);
    } else {
      return NextResponse.json({ error: "Datos de mensaje no válidos" }, { status: 400 });
    }

    await writeMessagesToFile(current);
    return NextResponse.json({ success: true, messages: current });
  } catch (error) {
    console.error("Error saving birthday message:", error);
    return NextResponse.json({ error: "Error al guardar mensaje" }, { status: 500 });
  }
}
