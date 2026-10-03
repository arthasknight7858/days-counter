"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log seguro del error sin filtrar secretos
    console.error("Client Error boundary captured:", error.message);
  }, [error]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#070514] text-white text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full flex flex-col items-center gap-6 p-8 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-xl shadow-2xl">
        <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-400/30 flex items-center justify-center text-rose-400 shadow-inner">
          <AlertCircle className="w-10 h-10 animate-pulse text-rose-400" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-rose-400 font-semibold">
            Ocurrió un contratiempo
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-rose-100 to-purple-200">
            Algo no cargó correctamente
          </h1>
          <p className="text-sm text-purple-200/70 leading-relaxed">
            No te preocupes, tus recuerdos y notas siguen a salvo. Puedes intentar recargar la vista o volver a la página de inicio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-600/30 active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reintentar</span>
          </button>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-purple-200 border border-purple-500/20 font-medium text-sm transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <Home className="w-4 h-4 text-purple-300" />
            <span>Inicio</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
