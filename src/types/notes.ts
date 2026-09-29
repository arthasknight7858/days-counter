export type NoteColor =
  | "purple"
  | "pink"
  | "amber"
  | "emerald"
  | "cyan"
  | "rose"
  | "indigo";

export type NoteCategory =
  | "all"
  | "amor"
  | "metas"
  | "recuerdos"
  | "recordatorios"
  | "citas";

export type MediaType = "image" | "audio" | "video";

export interface CustomNote {
  id: string;
  title: string;
  content: string;
  date: string;
  color: NoteColor;
  category: "amor" | "metas" | "recuerdos" | "recordatorios" | "citas";
  emoji: string;
  imageUrl?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
  mediaName?: string;
  mediaSize?: number;
  isPinned?: boolean;
  isAxelSpecial?: boolean;
  createdAt: number;
  reactions?: number;
}
