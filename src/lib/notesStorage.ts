import { CustomNote, MediaType } from "@/types/notes";

const DB_NAME = "SofiAxelBoardDB";
const DB_VERSION = 1;
const NOTES_STORE = "notes";
const MEDIA_STORE = "media";

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

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      return reject(new Error("IndexedDB no está disponible en este entorno"));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(NOTES_STORE)) {
        db.createObjectStore(NOTES_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(MEDIA_STORE)) {
        db.createObjectStore(MEDIA_STORE, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getLocalNotesFromIDB(): Promise<CustomNote[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(NOTES_STORE, "readonly");
      const store = tx.objectStore(NOTES_STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const result = req.result as CustomNote[];
        if (Array.isArray(result) && result.length > 0) {
          // Sort by creation or pinned
          resolve(result);
        } else {
          resolve([]);
        }
      };
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

export async function saveLocalNotesToIDB(notes: CustomNote[]): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(NOTES_STORE, "readwrite");
      const store = tx.objectStore(NOTES_STORE);
      store.clear();
      for (const note of notes) {
        store.put(note);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn("Error guardando en IndexedDB:", err);
  }
}

/**
 * Carga las notas del servidor con respaldo local (IndexedDB y localStorage).
 */
export async function fetchAllNotes(): Promise<CustomNote[]> {
  // 1. Intentar cargar del servidor
  try {
    const res = await fetch("/api/notes", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.notes) && data.notes.length > 0) {
        // Guardar copia local en IndexedDB
        saveLocalNotesToIDB(data.notes);
        return data.notes;
      }
    }
  } catch (err) {
    console.warn("No se pudo conectar con el servidor, cargando notas locales:", err);
  }

  // 2. Si falla el servidor, cargar desde IndexedDB
  const localIDB = await getLocalNotesFromIDB();
  if (localIDB.length > 0) {
    return localIDB;
  }

  // 3. Si IndexedDB está vacío, intentar migrar desde localStorage previo
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("sofi_axel_pinboard_notes");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          saveLocalNotesToIDB(parsed);
          // Intentar sincronizar con el servidor
          syncNotesToServer(parsed);
          return parsed;
        }
      }
    } catch {}
  }

  // 4. Si todo está vacío, devolver nota por defecto de Axel
  return [INITIAL_AXEL_NOTE];
}

/**
 * Guarda las notas en el servidor y en IndexedDB + localStorage de respaldo.
 */
export async function syncNotesToServer(notes: CustomNote[]): Promise<boolean> {
  // 1. Guardar en IndexedDB inmediatamente
  await saveLocalNotesToIDB(notes);

  // 2. Guardar versión ligera en localStorage (sin imágenes base64 gigantes para no saturar 5MB)
  if (typeof window !== "undefined") {
    try {
      const safeNotes = notes.map((n) => {
        if (n.imageUrl && n.imageUrl.startsWith("data:")) {
          // Omitir base64 gigante en localStorage
          return { ...n, imageUrl: undefined };
        }
        return n;
      });
      localStorage.setItem("sofi_axel_pinboard_notes", JSON.stringify(safeNotes));
    } catch (e) {
      console.warn("No se pudo guardar en localStorage (cuota llena):", e);
    }
  }

  // 3. Guardar en el servidor
  try {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    return res.ok;
  } catch (err) {
    console.error("Error al sincronizar con el servidor:", err);
    return false;
  }
}

export interface UploadResult {
  url: string;
  mediaType: MediaType;
  mediaName: string;
  size: number;
}

/**
 * Sube un archivo (imagen, audio MP3 o video) al servidor.
 * Si falla la subida al servidor, crea un blob URL de respaldo.
 */
export async function uploadMediaFile(file: File): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      return {
        url: data.url,
        mediaType: data.mediaType,
        mediaName: data.mediaName,
        size: data.size,
      };
    } else {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Error al subir archivo");
    }
  } catch (err) {
    console.warn("Fallo en la subida al servidor, guardando como Blob local:", err);

    // Fallback: Si estamos offline, determinar el tipo y crear un ObjectURL
    let mediaType: MediaType = "image";
    if (file.type.startsWith("audio/") || file.name.match(/\.(mp3|wav|ogg|m4a|aac)$/i)) {
      mediaType = "audio";
    } else if (file.type.startsWith("video/") || file.name.match(/\.(mp4|webm|mov|mkv)$/i)) {
      mediaType = "video";
    }

    const blobUrl = URL.createObjectURL(file);
    return {
      url: blobUrl,
      mediaType,
      mediaName: file.name,
      size: file.size,
    };
  }
}
