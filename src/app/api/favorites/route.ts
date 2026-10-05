import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { FavoritesData, FavoritePhoto } from "@/types/favorites";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  checkRateLimit,
  getClientIp,
  verifyOriginOrCsrf,
  isBotSubmission,
} from "@/lib/security";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), "data");
const FAVORITES_FILE = path.join(DATA_DIR, "favorites.json");

const DEFAULT_FAVORITES: FavoritesData = {
  axel: [
    {
      albumId: "sofi",
      folder: "Sofi",
      image: "sofi40.jpeg",
      albumTitle: "Sofi",
      addedAt: 1790735317732,
    },
    {
      albumId: "sofi",
      folder: "Sofi",
      image: "sofi 17.png",
      albumTitle: "Sofi",
      addedAt: 1790735287171,
    },
    {
      albumId: "sofi",
      folder: "Sofi",
      image: "sofi28.png",
      albumTitle: "Sofi",
      addedAt: 1790735283979,
    },
  ],
  sofi: [
    {
      albumId: "sofi",
      folder: "Sofi",
      image: "sofi28.png",
      albumTitle: "Sofi",
      addedAt: 1790736645287,
    },
  ],
};

async function readFavoritesFromFile(): Promise<FavoritesData> {
  try {
    const content = await readFile(FAVORITES_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (parsed && Array.isArray(parsed.axel) && Array.isArray(parsed.sofi)) {
      return parsed;
    }
  } catch {
    // If not found or invalid
  }
  return DEFAULT_FAVORITES;
}

async function writeFavoritesToFile(data: FavoritesData): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(FAVORITES_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("No se pudo escribir archivo local de favoritos:", err);
  }
}

export async function GET(request: Request) {
  try {
    const ip = getClientIp(request);
    const rl = checkRateLimit(`get_favs_${ip}`, 100, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Demasiadas peticiones" }, { status: 429 });
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("favorites")
        .select("data")
        .eq("id", "main")
        .maybeSingle();

      if (!error && data && data.data && typeof data.data === "object") {
        const parsed = data.data as FavoritesData;
        if (Array.isArray(parsed.axel) && Array.isArray(parsed.sofi)) {
          writeFavoritesToFile(parsed).catch(() => {});
          return NextResponse.json({ favorites: parsed });
        }
      } else if (error) {
        console.warn("Supabase favorites GET error, usando respaldo local:", error.message);
      }
    }

    const favorites = await readFavoritesFromFile();
    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("Error reading favorites:", error);
    return NextResponse.json({ favorites: DEFAULT_FAVORITES });
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rl = checkRateLimit(`post_favs_${ip}`, 60, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Límite de solicitudes superado." }, { status: 429 });
    }

    if (!verifyOriginOrCsrf(request)) {
      return NextResponse.json({ error: "Petición no permitida (CORS/Origin)" }, { status: 403 });
    }

    const body = await request.json();

    if (isBotSubmission(body)) {
      return NextResponse.json({ success: true, favorites: DEFAULT_FAVORITES });
    }

    let currentFavorites = await readFavoritesFromFile();

    if (body.favorites && Array.isArray(body.favorites.axel) && Array.isArray(body.favorites.sofi)) {
      currentFavorites = body.favorites;
    } else if (body.person && (body.person === "axel" || body.person === "sofi") && body.item && typeof body.item === "object") {
      const person = body.person as "axel" | "sofi";
      const rawItem = body.item as Partial<FavoritePhoto>;
      if (!rawItem.folder || !rawItem.image) {
        return NextResponse.json({ error: "Datos de foto incompletos" }, { status: 400 });
      }

      const safeFolder = path.basename(String(rawItem.folder)).replace(/[^a-zA-Z0-9_\-\s]/g, "");
      const imgStr = String(rawItem.image).trim();
      const isExternalOrDataUrl =
        imgStr.startsWith("http://") ||
        imgStr.startsWith("https://") ||
        imgStr.startsWith("data:") ||
        imgStr.startsWith("blob:");

      const safeImage = isExternalOrDataUrl
        ? imgStr
        : path.basename(imgStr).replace(/[^a-zA-Z0-9_\-.\s]/g, "");
      const safeTitle = typeof rawItem.albumTitle === "string" ? rawItem.albumTitle.slice(0, 100) : "Álbum";
      const safeAlbumId = typeof rawItem.albumId === "string" ? rawItem.albumId.slice(0, 50) : "album";

      const item: FavoritePhoto = {
        albumId: safeAlbumId,
        folder: safeFolder,
        image: safeImage,
        albumTitle: safeTitle,
        addedAt: typeof rawItem.addedAt === "number" ? rawItem.addedAt : Date.now(),
      };

      const list = currentFavorites[person] || [];
      const index = list.findIndex(
        (f) => f.folder === item.folder && f.image === item.image
      );

      if (body.action === "remove" || (body.action === "toggle" && index >= 0)) {
        currentFavorites[person] = list.filter(
          (f) => !(f.folder === item.folder && f.image === item.image)
        );
      } else {
        if (index < 0) {
          currentFavorites[person] = [
            item,
            ...list,
          ];
        }
      }
    } else {
      return NextResponse.json(
        { error: "Formato de datos no válido" },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured && supabase) {
      await supabase
        .from("favorites")
        .upsert({ id: "main", data: currentFavorites });
    }

    await writeFavoritesToFile(currentFavorites);
    return NextResponse.json({ success: true, favorites: currentFavorites });
  } catch (error) {
    console.error("Error saving favorites:", error);
    return NextResponse.json(
      { error: "Error al guardar favoritos en el servidor" },
      { status: 500 }
    );
  }
}
