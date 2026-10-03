import Link from "next/link";
import { Heart, Home, Music } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#070514] text-white text-center relative overflow-hidden">
      {/* Glow ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full flex flex-col items-center gap-6 p-8 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-xl shadow-2xl">
        <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-400 shadow-inner">
          <Heart className="w-10 h-10 fill-purple-400/40 animate-pulse text-purple-300" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">
            Error 404 • Página No Encontrada
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-300">
            ¡Nos perdimos en el camino!
          </h1>
          <p className="text-sm text-purple-200/70 leading-relaxed">
            Parece que este recuerdo o página no existe, pero nuestro amor sigue intacto. Regresemos al lugar donde empezó todo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-600/30 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>
          <Link
            href="/#musica"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-purple-200 border border-purple-500/20 font-medium text-sm transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <Music className="w-4 h-4 text-purple-300" />
            <span>Nuestra Música</span>
          </Link>
        </div>

        <div className="pt-2 text-xs text-purple-300/40">
          Axel & Sofía ✨ Juntos siempre
        </div>
      </div>
    </main>
  );
}
