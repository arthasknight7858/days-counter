import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { FavoritesData, FavoritePhoto } from "@/types/favorites";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), "data");
const FAVORITES_FILE = path.join(DATA_DIR, "favorites.json");

const DEFAULT_FAVORITES: FavoritesData = {
  axel: [
    {
      albumId: "sofi",
      folder: "Sofi",
      image: "sofi.png",
      albumTitle: "Sofi",
      addedAt: 1724300000000,
    },
    {
      albumId: "sofi",
      folder: "Sofi",
      image: "sofi 19.png",
      albumTitle: "Sofi",
      addedAt: 1724300001000,
    },
    {
      albumId: "juntos",
      folder: "juntos",
      image: "juntos 1.jpeg",
      albumTitle: "Juntos",
      addedAt: 1724300002000,
    },
    {
      albumId: "sofi",
      folder: "Sofi",
      image: "sofi73.jpeg",
      albumTitle: "Sofi",
      addedAt: 1724300003000,
    },
  ],
  sofi: [
    {
      albumId: "axel",
      folder: "axel",
      image: "axel1.jpeg",
      albumTitle: "Axel",
      addedAt: 1724300000000,
    },
    {
      albumId: "juntos",
      folder: "juntos",
      image: "juntos 2.jpeg",
      albumTitle: "Juntos",
      addedAt: 1724300001000,
    },
    {
      albumId: "xv",
      folder: "fiesta de XV",
      image: "xv.png",
      albumTitle: "Tu fiesta de XV",
      addedAt: 1724300002000,
    },
    {
      albumId: "kukis",
      folder: "kukis",
      image: "kukis 1.jpg",
      albumTitle: "Kukiss",
      addedAt: 1724300003000,
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
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FAVORITES_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    const favorites = await readFavoritesFromFile();
    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("Error reading favorites:", error);
    return NextResponse.json({ favorites: DEFAULT_FAVORITES });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
      const safeImage = path.basename(String(rawItem.image)).replace(/[^a-zA-Z0-9_\-.\s]/g, "");
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
