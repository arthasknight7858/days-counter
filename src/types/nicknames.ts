export interface Nickname {
  id: string;
  text: string;
  meaning?: string;
  target: "sofi" | "axel"; // "sofi" = Axel's nickname for Sofi; "axel" = Sofi's nickname for Axel
  createdAt: number;
  hearts?: number;
  audioUrl?: string;
}
