export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070514] text-white overflow-hidden">
      {/* Glow ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-purple-500/20 border-t-purple-400 animate-spin" />
          <span className="absolute text-2xl select-none animate-pulse">💖</span>
        </div>

        <p className="text-sm font-medium tracking-widest text-purple-200/80 uppercase animate-pulse">
          Cargando nuestra historia...
        </p>

        {/* Skeleton lines preview */}
        <div className="w-48 flex flex-col gap-2 mt-2 opacity-50">
          <div className="h-1.5 bg-purple-500/30 rounded-full w-full animate-pulse" />
          <div className="h-1.5 bg-purple-500/20 rounded-full w-3/4 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}
