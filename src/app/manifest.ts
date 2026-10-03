import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Axel & Sofía ✨ Nuestra Historia de Amor",
    short_name: "Axel & Sofía",
    description: "Un espacio especial lleno de recuerdos, canciones, amor y metas juntos.",
    start_url: "/",
    display: "standalone",
    background_color: "#070514",
    theme_color: "#a855f7",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
