"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  BrainCircuit,
  Landmark,
  Loader2,
  TrendingUp,
  Megaphone,
  Award,
  Shield,
  Code2,
  Briefcase,
  HeartPulse,
  Brain,
  Mic,
  Search,
  X,
  Sparkles,
  Calculator,
  Coins,
  Star,
} from "lucide-react";

// Skeletons de carga dinámicos para reducir el bundle JS inicial
const RoadmapSkeleton = ({ title }: { title: string }) => (
  <div className="w-full p-8 sm:p-12 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md flex flex-col items-center justify-center gap-4 min-h-75">
    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
    <p className="text-purple-200/80 font-medium text-sm sm:text-base animate-pulse">
      Cargando guía de {title}...
    </p>
  </div>
);

const EnglishRoadmap = dynamic(() => import("./educational/EnglishRoadmap"), {
  loading: () => <RoadmapSkeleton title="Inglés" />,
});

const KoreanRoadmap = dynamic(() => import("./educational/KoreanRoadmap"), {
  loading: () => <RoadmapSkeleton title="Coreano" />,
});

const FrenchRoadmap = dynamic(() => import("./educational/FrenchRoadmap"), {
  loading: () => <RoadmapSkeleton title="Francés" />,
});

const SocialCommunicationRoadmap = dynamic(
  () => import("./educational/SocialCommunicationRoadmap"),
  {
    loading: () => <RoadmapSkeleton title="Comunicación Social" />,
  }
);

const ArchitectureRoadmap = dynamic(
  () => import("./educational/ArchitectureRoadmap"),
  {
    loading: () => <RoadmapSkeleton title="Arquitectura" />,
  }
);

const HabitsRoadmap = dynamic(() => import("./educational/HabitsRoadmap"), {
  loading: () => <RoadmapSkeleton title="Hábitos & Productividad" />,
});

const EconomyRoadmap = dynamic(() => import("./educational/EconomyRoadmap"), {
  loading: () => <RoadmapSkeleton title="Economía & Inversiones" />,
});

const MarketingRoadmap = dynamic(
  () => import("./educational/MarketingRoadmap"),
  {
    loading: () => <RoadmapSkeleton title="Marketing Digital" />,
  }
);

const IcfesRoadmap = dynamic(() => import("./educational/IcfesRoadmap"), {
  loading: () => <RoadmapSkeleton title="ICFES Saber 11°" />,
});

const CybersecurityRoadmap = dynamic(
  () => import("./educational/CybersecurityRoadmap"),
  {
    loading: () => <RoadmapSkeleton title="Ciberseguridad & Hacking Ético" />,
  }
);

const FullStackRoadmap = dynamic(
  () => import("./educational/FullStackRoadmap"),
  {
    loading: () => <RoadmapSkeleton title="Full Stack & Ingeniería en Sistemas" />,
  }
);

const BusinessManagementRoadmap = dynamic(
  () => import("./educational/BusinessManagementRoadmap"),
  {
    loading: () => (
      <RoadmapSkeleton title="Administración Empresarial & Marco Legal" />
    ),
  }
);

const MedicineRoadmap = dynamic(
  () => import("./educational/MedicineRoadmap"),
  {
    loading: () => <RoadmapSkeleton title="Medicina" />,
  }
);

const CriticalThinkingRoadmap = dynamic(
  () => import("./educational/CriticalThinkingRoadmap"),
  {
    loading: () => <RoadmapSkeleton title="Pensamiento Crítico & Sistemático" />,
  }
);

const PublicSpeakingRoadmap = dynamic(
  () => import("./educational/PublicSpeakingRoadmap"),
  {
    loading: () => <RoadmapSkeleton title="Oratoria, Expresión & Persuasión" />,
  }
);

const SalesRoadmap = dynamic(() => import("./educational/SalesRoadmap"), {
  loading: () => <RoadmapSkeleton title="Ventas & Negociación" />,
});

const MathRoadmap = dynamic(() => import("./educational/MathRoadmap"), {
  loading: () => <RoadmapSkeleton title="Matemáticas" />,
});

const CryptoTradingRoadmap = dynamic(
  () => import("./educational/CryptoTradingRoadmap"),
  {
    loading: () => <RoadmapSkeleton title="Cripto & Trading" />,
  }
);

export type EducationalTopic =
  | "ingles"
  | "coreano"
  | "frances"
  | "comunicacion"
  | "arquitectura"
  | "desarrollo"
  | "economia"
  | "marketing"
  | "icfes"
  | "ciberseguridad"
  | "fullstack"
  | "administracion"
  | "medicina"
  | "pensamiento"
  | "oratoria"
  | "ventas"
  | "matematicas"
  | "cripto";

type CategoryFilter =
  | "all"
  | "favoritos"
  | "idiomas"
  | "tecnologia"
  | "negocios"
  | "salud"
  | "academia";

export default function EducationalSection() {
  const [activeTopic, setActiveTopic] = useState<EducationalTopic>("ingles");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");

  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_edu_favorites");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return ["ingles", "arquitectura"];
  });

  useEffect(() => {
    try {
      localStorage.setItem("sofi_edu_favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const toggleFavorite = (topicId: string) => {
    setFavorites((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const categories = [
    { id: "all" as CategoryFilter, label: "🌟 Todos los Módulos" },
    {
      id: "favoritos" as CategoryFilter,
      label: `⭐ Mi Plan (${favorites.length})`,
    },
    { id: "idiomas" as CategoryFilter, label: "🌐 Idiomas" },
    { id: "tecnologia" as CategoryFilter, label: "💻 Tecnología & Sistemas" },
    { id: "negocios" as CategoryFilter, label: "📊 Negocios & Finanzas" },
    { id: "salud" as CategoryFilter, label: "🩺 Salud & Bienestar" },
    { id: "academia" as CategoryFilter, label: "🎓 Academia & ICFES" },
  ];

  const topics = useMemo(
    () => [
      {
        id: "ingles" as EducationalTopic,
        label: "🇬🇧 Inglés",
        category: "idiomas",
        keywords: "english listening speaking vocabulario gramatica bts a1 b2",
        icon: BookOpen,
      },
      {
        id: "coreano" as EducationalTopic,
        label: "🇰🇷 Coreano",
        category: "idiomas",
        keywords: "hangul corea kpop kdrama bts idioma hanguk",
        icon: BookOpen,
      },
      {
        id: "frances" as EducationalTopic,
        label: "🇫🇷 Francés",
        category: "idiomas",
        keywords: "french vocabulaire prononciation paris langue",
        icon: BookOpen,
      },
      {
        id: "comunicacion" as EducationalTopic,
        label: "🎙️ Comunicación Social",
        category: "academia",
        keywords: "periodismo medios redes storytelling redaccion oratoria",
        icon: BookOpen,
      },
      {
        id: "arquitectura" as EducationalTopic,
        label: "🏛️ Arquitectura",
        category: "academia",
        keywords:
          "diseño planos autocad sketchup construccion estructuras espacio",
        icon: Landmark,
      },
      {
        id: "desarrollo" as EducationalTopic,
        label: "🧠 Hábitos & Productividad",
        category: "salud",
        keywords: "rutinas disciplina organizacion pomodoro concentracion mente",
        icon: BrainCircuit,
      },
      {
        id: "economia" as EducationalTopic,
        label: "📊 Economía & Finanzas",
        category: "negocios",
        keywords: "dinero finanzas inversiones acciones bolsa ahorro presupuesto",
        icon: TrendingUp,
      },
      {
        id: "marketing" as EducationalTopic,
        label: "📢 Marketing Digital",
        category: "negocios",
        keywords: "redes sociales publicidad marcas branding contenido ventas",
        icon: Megaphone,
      },
      {
        id: "icfes" as EducationalTopic,
        label: "🇨🇴 ICFES Saber 11°",
        category: "academia",
        keywords:
          "simulacro matematicas lectura critica ciencias naturales ingles cuadernillos preguntas",
        icon: Award,
      },
      {
        id: "ciberseguridad" as EducationalTopic,
        label: "🛡️ Ciberseguridad & Hacking",
        category: "tecnologia",
        keywords:
          "seguridad informatica linux redes hacking etico proteccion datos",
        icon: Shield,
      },
      {
        id: "fullstack" as EducationalTopic,
        label: "💻 Full Stack & Sistemas",
        category: "tecnologia",
        keywords:
          "programacion software web frontend backend react javascript python bases datos",
        icon: Code2,
      },
      {
        id: "administracion" as EducationalTopic,
        label: "🏛️ Administración & Legal",
        category: "negocios",
        keywords: "empresas derecho contratos gestion liderazgo emprendimiento",
        icon: Briefcase,
      },
      {
        id: "medicina" as EducationalTopic,
        label: "🩺 Medicina",
        category: "salud",
        keywords:
          "anatomia salud primeros auxilios fisiologia cuerpo humano bienestar",
        icon: HeartPulse,
      },
      {
        id: "pensamiento" as EducationalTopic,
        label: "🧠 Pensamiento Crítico",
        category: "academia",
        keywords: "logica analisis argumentos debate sesgos toma decisiones",
        icon: Brain,
      },
      {
        id: "oratoria" as EducationalTopic,
        label: "🎙️ Oratoria & Persuasión",
        category: "academia",
        keywords:
          "hablar en publico voz expresion carisma discursos presentaciones",
        icon: Mic,
      },
      {
        id: "ventas" as EducationalTopic,
        label: "💼 Ventas & Negociación",
        category: "negocios",
        keywords: "negociar clientes persuadir acuerdos cierres comercio",
        icon: TrendingUp,
      },
      {
        id: "matematicas" as EducationalTopic,
        label: "📐 Matemáticas",
        category: "academia",
        keywords:
          "matematicas calculo algebra geometria trigonometria formulas funciones derivadas integrales",
        icon: Calculator,
      },
      {
        id: "cripto" as EducationalTopic,
        label: "🪙 Cripto & Trading",
        category: "negocios",
        keywords:
          "cripto criptomonedas trading bitcoin btc eth blockchain velas gestion riesgo patrones",
        icon: Coins,
      },
    ],
    []
  );

  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      const matchesCategory =
        selectedCategory === "all"
          ? true
          : selectedCategory === "favoritos"
          ? favorites.includes(t.id)
          : t.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.label.toLowerCase().includes(q) ||
        t.keywords.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [topics, selectedCategory, favorites, searchQuery]);

  const activeTopicObj = topics.find((t) => t.id === activeTopic);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 pb-20 z-10 space-y-8">
      {/* Educational Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <GraduationCap className="w-4 h-4 text-purple-400" />
            Rincón de Aprendizaje
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold flex flex-wrap items-baseline gap-3">
            <span className="text-white">Espacio</span>
            <span className="text-purple-400 italic font-serif tracking-wide">
              Educativo
            </span>
          </h2>
          <p className="text-purple-200/70 text-base sm:text-lg tracking-wide mt-1">
            18 guías interactivas, hojas de ruta y simulacros preparados con amor para tu crecimiento
          </p>
        </div>

        {/* Favorite Active Topic Toggle Button */}
        {activeTopicObj && (
          <button
            onClick={() => toggleFavorite(activeTopic)}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              favorites.includes(activeTopic)
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                : "bg-white/5 text-purple-300/80 border-purple-500/25 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Star
              className={`w-4 h-4 ${
                favorites.includes(activeTopic)
                  ? "fill-amber-400 text-amber-400"
                  : "text-purple-400"
              }`}
            />
            <span>
              {favorites.includes(activeTopic)
                ? "En tu Plan de Estudio ⭐"
                : "+ Guardar en Mi Plan"}
            </span>
          </button>
        )}
      </motion.div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative w-full max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar tema, materia o habilidad..."
            className="w-full pl-11 pr-10 py-3 bg-white/5 border border-purple-500/25 focus:border-purple-400 rounded-2xl text-sm text-white placeholder:text-purple-300/50 outline-none backdrop-blur-md transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-purple-300/60 hover:text-white rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer select-none ${
                  isSelected
                    ? "bg-purple-600 text-white border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                    : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Switcher Buttons */}
      <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((t) => {
            const isActive = activeTopic === t.id;
            const isFav = favorites.includes(t.id);
            const Icon = t.icon;

            return (
              <button
                key={t.id}
                onClick={() => setActiveTopic(t.id)}
                className={`relative px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer border select-none ${
                  isActive
                    ? "bg-purple-600/90 text-white border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-102"
                    : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-white" : "text-purple-400"
                  }`}
                />
                <span className="whitespace-nowrap">{t.label}</span>
                {isFav && (
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 ml-0.5" />
                )}
              </button>
            );
          })
        ) : (
          <div className="p-8 text-center text-purple-300/70 text-sm flex flex-col items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <p>No se encontraron módulos con &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-xs text-purple-300 underline mt-1 cursor-pointer"
            >
              Ver todos los módulos
            </button>
          </div>
        )}
      </div>

      {/* Topic Content Switcher */}
      <AnimatePresence mode="wait">
        {activeTopic === "ingles" && (
          <motion.div
            key="ingles"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <EnglishRoadmap />
          </motion.div>
        )}

        {activeTopic === "coreano" && (
          <motion.div
            key="coreano"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <KoreanRoadmap />
          </motion.div>
        )}

        {activeTopic === "frances" && (
          <motion.div
            key="frances"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <FrenchRoadmap />
          </motion.div>
        )}

        {activeTopic === "comunicacion" && (
          <motion.div
            key="comunicacion"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <SocialCommunicationRoadmap />
          </motion.div>
        )}

        {activeTopic === "arquitectura" && (
          <motion.div
            key="arquitectura"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <ArchitectureRoadmap />
          </motion.div>
        )}

        {activeTopic === "desarrollo" && (
          <motion.div
            key="desarrollo"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <HabitsRoadmap />
          </motion.div>
        )}

        {activeTopic === "economia" && (
          <motion.div
            key="economia"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <EconomyRoadmap />
          </motion.div>
        )}

        {activeTopic === "marketing" && (
          <motion.div
            key="marketing"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <MarketingRoadmap />
          </motion.div>
        )}

        {activeTopic === "icfes" && (
          <motion.div
            key="icfes"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <IcfesRoadmap />
          </motion.div>
        )}

        {activeTopic === "ciberseguridad" && (
          <motion.div
            key="ciberseguridad"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <CybersecurityRoadmap />
          </motion.div>
        )}

        {activeTopic === "fullstack" && (
          <motion.div
            key="fullstack"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <FullStackRoadmap />
          </motion.div>
        )}

        {activeTopic === "administracion" && (
          <motion.div
            key="administracion"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <BusinessManagementRoadmap />
          </motion.div>
        )}

        {activeTopic === "medicina" && (
          <motion.div
            key="medicina"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <MedicineRoadmap />
          </motion.div>
        )}

        {activeTopic === "pensamiento" && (
          <motion.div
            key="pensamiento"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <CriticalThinkingRoadmap />
          </motion.div>
        )}

        {activeTopic === "oratoria" && (
          <motion.div
            key="oratoria"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <PublicSpeakingRoadmap />
          </motion.div>
        )}

        {activeTopic === "ventas" && (
          <motion.div
            key="ventas"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <SalesRoadmap />
          </motion.div>
        )}

        {activeTopic === "matematicas" && (
          <motion.div
            key="matematicas"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <MathRoadmap />
          </motion.div>
        )}

        {activeTopic === "cripto" && (
          <motion.div
            key="cripto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <CryptoTradingRoadmap />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
