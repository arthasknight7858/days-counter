"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Sparkles,
  Layers,
  Palette,
  Server,
  Cloud,
  Network,
  Briefcase,
  BookOpen,
  CheckCircle2,
  Square,
  Compass,
  ChevronDown,
  Globe,
  Zap,
} from "lucide-react";

export default function FullStackRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_fullstack_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({ "fs0": true, "fs1": true });

  const toggleChecklist = (id: string) => {
    setCompletedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_fullstack_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const togglePhase = (id: string) => {
    setOpenPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "fases", label: "🗺️ Las 7 Fases", icon: Compass },
    { id: "frontend", label: "🎨 Frontend & React/Next", icon: Palette },
    { id: "backend", label: "⚙️ Backend & PostgreSQL", icon: Server },
    { id: "devops", label: "🚀 DevOps & Docker", icon: Cloud },
    { id: "sistemas", label: "🏛️ System Design & OSI", icon: Network },
    { id: "empleo", label: "💼 Portafolio & Empleo USD", icon: Briefcase },
    { id: "recursos", label: "📚 Recursos Gratuitos", icon: BookOpen },
    { id: "plan", label: "⚡ Checklist de Aprendizaje", icon: CheckCircle2 },
  ];

  const phases = [
    {
      id: "fs0",
      num: "Fase 0",
      duration: "⏱ 2–4 semanas",
      title: "Fundamentos Computacionales",
      color: "from-slate-500/20 to-zinc-500/10 border-slate-500/40 text-slate-300",
      badge: "bg-slate-500/20 text-slate-300 border-slate-500/30",
      desc: "Antes de programar, entiende cómo funciona la máquina: hardware (CPU, RAM, SSD), sistema binario, terminal y Git básico.",
      topics: [
        "Hardware: CPU, Memoria RAM vs SSD, GPU y Motherboard",
        "Representación de datos: Bits, Bytes, Binario, Hexadecimal y UTF-8",
        "Sistemas Operativos: Kernel, Procesos, Hilos y Permisos en Linux/macOS",
        "Internet & Redes: Direcciones IP, Servidores DNS, TCP/IP y Puertos",
        "Arquitectura Cliente-Servidor & Ciclo Request/Response HTTP",
        "Terminal y Comandos: pwd, ls, cd, mkdir, rm, cp, mv, cat",
        "Control de versiones con Git: git init, add, commit, push, pull y GitHub",
        "Entorno de desarrollo: Configuración de VS Code y extensiones esenciales",
      ],
    },
    {
      id: "fs1",
      num: "Fase 1",
      duration: "⏱ 6–10 semanas",
      title: "Programación desde Cero & Algoritmos",
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/40 text-blue-300",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      desc: "Aprende a pensar como programador con Python o JavaScript: lógica, funciones, estructuras de datos y complejidad Big O.",
      topics: [
        "Variables, tipos de datos primitivos (String, Number, Boolean, Null/Undefined)",
        "Control de flujo: if/else, switch, bucles for/while, break y continue",
        "Funciones, parámetros, retorno, scope léxico y recursión",
        "Estructuras de datos: Arrays, Objetos/Diccionarios, Mapas y Sets",
        "Estructuras avanzadas: Stacks (LIFO), Queues (FIFO) y Árboles binarios",
        "Complejidad algorítmica: Notación Big O (O(1), O(log n), O(n), O(n²))",
        "Algoritmos de búsqueda: Búsqueda lineal, Búsqueda binaria, BFS y DFS",
        "Algoritmos de ordenamiento: Merge Sort, Quick Sort y Array.prototype.sort",
      ],
    },
    {
      id: "fs2",
      num: "Fase 2",
      duration: "⏱ 8–12 semanas",
      title: "Frontend Moderno (HTML, CSS, JS, React & Next.js)",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      desc: "Construye interfaces accesibles, responsivas y de alto rendimiento con Tailwind CSS, React y Next.js App Router.",
      topics: [
        "HTML5 Semántico: header, nav, main, article, section, footer y accesibilidad",
        "CSS Box Model: margin, border, padding, content y especificidad",
        "Layout moderno con CSS Flexbox y CSS Grid (Mobile-First)",
        "CSS Moderno: Variables, animaciones (@keyframes) y Tailwind CSS",
        "JavaScript DOM: querySelector, classList, createElement y eventos",
        "Asincronía en JS: Callbacks, Promesas, async/await y fetch()",
        "React: Componentes, Props, useState, useEffect, useRef y Context API",
        "Next.js App Router: Server Components, SSR, SSG, Routing por carpetas y API Routes",
      ],
    },
    {
      id: "fs3",
      num: "Fase 3",
      duration: "⏱ 8–12 semanas",
      title: "Backend & Bases de Datos (Node, Express & PostgreSQL)",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      desc: "Crea APIs REST robustas, autenticación segura con JWT/OAuth, bases de datos relacionales con PostgreSQL y ORMs como Prisma.",
      topics: [
        "Protocolo HTTP profundo: Métodos CRUD (GET, POST, PUT, DELETE), Headers y Status Codes",
        "Diseño de APIs REST: Endpoints limpios, versionado (/api/v1) y paginación",
        "Node.js Event Loop, módulos ESM y variables de entorno con process.env",
        "Express.js: Enrutamiento, middlewares, validación con Zod y manejo centralizado de errores",
        "Seguridad & Auth: Hashing con Bcrypt, Tokens JWT, Refresh Tokens y CORS",
        "PostgreSQL: Tablas, Primary Keys, Foreign Keys, JOINs, Índices y Transacciones ACID",
        "ORM Prisma: Modelado de datos en schema.prisma y consultas tipadas",
        "Supabase: Backend-as-a-Service con PostgreSQL, Auth y Storage en la nube",
      ],
    },
    {
      id: "fs4",
      num: "Fase 4",
      duration: "⏱ 4–6 semanas",
      title: "DevOps & Despliegue en Producción",
      color: "from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-300",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      desc: "Empaqueta aplicaciones con Docker, automatiza pruebas con GitHub Actions y despliega en Vercel, Railway y la nube.",
      topics: [
        "Git colaborativo avanzado: Estrategias de ramas, Pull Requests y Conventional Commits",
        "Despliegue serverless de Frontend/Fullstack con Vercel",
        "Despliegue de Backend y Bases de datos con Railway y Render",
        "Docker Fundamentos: Dockerfile, Imágenes inmutables y Contenedores en ejecución",
        "Docker Compose: Orquestar App + Base de Datos + Redis con un solo comando",
        "CI/CD con GitHub Actions: Pipelines automatizados de Lint, Test, Build y Deploy",
      ],
    },
    {
      id: "fs5",
      num: "Fase 5",
      duration: "⏱ Continuo",
      title: "Ingeniería de Sistemas & Arquitectura",
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-300",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      desc: "Diseño de sistemas escalables (System Design), Modelo OSI de 7 capas, Clean Code, Testing automatizado y patrones de diseño.",
      topics: [
        "Escalabilidad: Vertical vs Horizontal, Load Balancers, Redis Caching y CDNs",
        "Arquitectura: Monolito vs Microservicios, API Gateway y Colas de mensajes (RabbitMQ/Kafka)",
        "Redes a fondo: Las 7 capas del Modelo OSI, WebSockets, HTTP/2/3 y gRPC",
        "Seguridad Web (OWASP Top 10): Inyección SQL, XSS, CSRF y principio de mínimo privilegio",
        "Calidad de Código: Principios SOLID, Clean Code, DRY y YAGNI",
        "Testing Profesional: Pruebas unitarias (Vitest/Jest), Integración y E2E con Playwright",
        "Patrones de Diseño (GoF): Singleton, Factory, Observer y Repository Pattern",
      ],
    },
    {
      id: "fs6",
      num: "Fase 6",
      duration: "⏱ 2–4 meses",
      title: "Portafolio de Alto Nivel & Empleo Remoto",
      color: "from-cyan-500/20 to-teal-500/10 border-cyan-500/40 text-cyan-300",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      desc: "Construye 3 proyectos estrella en producción, optimiza tu LinkedIn/GitHub y prepárate para entrevistas técnicas en USD.",
      topics: [
        "3 Proyectos Clave: App Full Stack con autenticación, API REST documentada y Proyecto Personal único",
        "Presencia Técnica: Perfil de GitHub con commits continuos y Portfolio Web propio",
        "Preparación para Entrevistas de Algoritmos (LeetCode / NeetCode 150)",
        "Preguntas técnicas comunes de JavaScript, React, Backend y System Design",
        "Entrevistas de Comportamiento con el Método STAR (Situación, Tarea, Acción, Resultado)",
        "Plataformas de Trabajo Remoto en USD desde Colombia: Arc.dev, Turing, Remote.co, We Work Remotely",
        "Freelance profesional en Upwork y Workana con tarifas justas de $15 a $35+ USD/hora",
      ],
    },
  ];

  const codeExample = `// Ejemplo: Arquitectura Limpia en Next.js / Express
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return Response.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const token = signJWT({ userId: user.id, role: user.role });
    return Response.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    return Response.json({ error: "Error en la petición" }, { status: 400 });
  }
}`;

  const resources = [
    { name: "CS50 de Harvard", type: "Curso", desc: "El mejor curso introductorio de computación y programación del mundo.", link: "Gratis en edX" },
    { name: "javascript.info", type: "Guía Web", desc: "La biblia moderna del lenguaje JavaScript, desde cero hasta avanzado.", link: "Gratis" },
    { name: "react.dev", type: "Documentación", desc: "Tutoriales interactivos y documentación oficial de React.", link: "Gratis" },
    { name: "The Odin Project", type: "Currículo", desc: "Ruta de aprendizaje Full Stack completa y orientada a proyectos.", link: "Gratis" },
    { name: "System Design Primer", type: "GitHub", desc: "Repositorio referente para aprender diseño de sistemas a gran escala.", link: "Gratis en GitHub" },
    { name: "NeetCode.io", type: "Algoritmos", desc: "Ruta curada de ejercicios LeetCode para superar entrevistas técnicas.", link: "Gratis" },
  ];

  const checklistItems = [
    { id: "fs_git_terminal", label: "Dominar comandos de terminal Linux y flujo diario de Git/GitHub", phase: "Fase 0" },
    { id: "fs_js_logic", label: "Resolver problemas de lógica, arrays y objetos con JavaScript/Python", phase: "Fase 1" },
    { id: "fs_react_app", label: "Construir una interfaz responsiva con React, Tailwind CSS y hooks", phase: "Fase 2" },
    { id: "fs_api_crud", label: "Crear una API REST con Node.js, Express y base de datos PostgreSQL", phase: "Fase 3" },
    { id: "fs_docker_deploy", label: "Contenedorizar la app con Docker y desplegar en Vercel/Railway", phase: "Fase 4" },
    { id: "fs_clean_arch", label: "Aplicar principios SOLID, Clean Code y pruebas automatizadas", phase: "Fase 5" },
    { id: "fs_remote_ready", label: "Tener 3 proyectos en producción y perfil optimizado para empleos USD", phase: "Fase 6" },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-950/40 via-blue-950/20 to-teal-950/30 backdrop-blur-xl border border-blue-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(79,142,247,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            Guía Completa · De Cero a Ingeniero de Software
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Full Stack &amp; </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-teal-300 to-emerald-300">
              Ingeniería en Sistemas
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            Ruta exhaustiva de 7 fases: fundamentos, algoritmos, Frontend (React/Next), Backend (Node/PostgreSQL), DevOps (Docker/CI-CD), System Design y Empleo Remoto.
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-xl p-4 rounded-2xl bg-white/5 border border-blue-500/20 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-300 block">7</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Fases</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-teal-300 block">120+</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Temas</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-300 block">18–30m</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Ruta Pro</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 block">$USD</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Remoto</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Pills */}
      <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-2 my-4">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border flex items-center gap-2 select-none ${
                isActive
                  ? "bg-blue-600/90 text-white border-blue-400 shadow-[0_0_15px_rgba(79,142,247,0.4)] scale-102 font-semibold"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. LAS 7 FASES */}
      {(activeSubTab === "all" || activeSubTab === "fases") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Ruta de Formación Integral</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-blue-400" />
              Las 7 Fases del Desarrollador a Ingeniero
            </h3>
          </div>

          <div className="space-y-4">
            {phases.map((p) => {
              const isOpen = !!openPhases[p.id];
              return (
                <div
                  key={p.id}
                  className={`rounded-2xl border backdrop-blur-md transition-all overflow-hidden bg-linear-to-br ${p.color}`}
                >
                  <div
                    onClick={() => togglePhase(p.id)}
                    className="p-5 sm:p-6 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className={`text-xs font-mono font-bold uppercase px-3 py-1 rounded-lg border ${p.badge}`}>
                        {p.num}
                      </span>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-white">{p.title}</h4>
                        <span className="text-xs text-purple-200/70 font-mono">{p.duration}</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-purple-300 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 pb-6 sm:px-6 space-y-4 border-t border-white/10"
                      >
                        <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed pt-3">{p.desc}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                          {p.topics.map((t, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-black/30 border border-white/10 text-xs text-purple-100 font-medium flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-1.5" />
                              <span>{t}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* 2. FRONTEND & BACKEND SHOWCASE */}
      {(activeSubTab === "all" || activeSubTab === "frontend" || activeSubTab === "backend") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Stack Full Stack de Élite</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-teal-400" />
              Arquitectura de Aplicaciones Modernas
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-purple-500/30 overflow-hidden font-mono text-xs text-purple-200/90 space-y-2">
            <div className="flex items-center justify-between text-purple-400 pb-2 border-b border-white/10">
              <span>api/auth/route.ts (Next.js &amp; Prisma)</span>
              <span className="text-[10px] text-teal-300">TypeScript</span>
            </div>
            <pre className="overflow-x-auto text-purple-100 leading-relaxed">{codeExample}</pre>
          </div>
        </motion.section>
      )}

      {/* 3. SYSTEM DESIGN */}
      {(activeSubTab === "all" || activeSubTab === "sistemas") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Nivel Senior</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Network className="w-6 h-6 text-purple-400" />
              Diseño de Sistemas Escalables &amp; Modelo OSI
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Server className="w-4 h-4 text-purple-400" /> Escalabilidad
              </h4>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Escalado horizontal mediante Load Balancers (NGINX/AWS ALB), Caching en memoria con Redis y distribución global estática con CDN (Cloudflare).
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-400" /> Modelo OSI 7 Capas
              </h4>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Desde la capa física y enlace (MAC/IP), pasando por transporte (TCP vs UDP) hasta la capa de aplicación (HTTP/2, WebSockets y gRPC).
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" /> Clean Code &amp; SOLID
              </h4>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Código mantenible con bajo acoplamiento y alta cohesión. Pruebas unitarias y E2E que permiten desplegar a producción sin miedo.
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* 4. EMPLEO REMOTO */}
      {(activeSubTab === "all" || activeSubTab === "empleo") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Inserción Laboral</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-emerald-400" />
              Cómo Conseguir Trabajo Remoto en USD desde Colombia
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <h4 className="font-bold text-white text-sm">Los 3 Proyectos que Reclutan</h4>
              <ul className="space-y-1 text-xs text-purple-200/80">
                <li>· <strong>1. App Full Stack con Auth &amp; Roles:</strong> CRUD completo con pagos o permisos.</li>
                <li>· <strong>2. API REST Documentada:</strong> Backend con OpenAPI/Swagger y suite de tests.</li>
                <li>· <strong>3. Proyecto de Problema Real:</strong> Una herramienta que solucione una necesidad auténtica.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <h4 className="font-bold text-white text-sm">Plataformas Clave para LATAM</h4>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                <strong>Arc.dev</strong> y <strong>Turing.com</strong> (empresas de EE.UU. buscando talento en Latinoamérica), <strong>We Work Remotely</strong> y <strong>Remote.co</strong> para posiciones 100% remotas.
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* 5. RECURSOS GRATUITOS */}
      {(activeSubTab === "all" || activeSubTab === "recursos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Autoaprendizaje</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-pink-400" />
              Recursos de Élite 100% Gratuitos
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((r, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                    {r.type}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 font-bold">{r.link}</span>
                </div>
                <h4 className="font-bold text-white text-sm">{r.name}</h4>
                <p className="text-xs text-purple-200/75 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 6. CHECKLIST */}
      {(activeSubTab === "all" || activeSubTab === "plan") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Seguimiento</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              Checklist de Formación Full Stack
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {checklistItems.map((item) => {
              const isChecked = !!completedItems[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-4 rounded-2xl border backdrop-blur-md transition-all text-left flex items-start gap-3 cursor-pointer select-none ${
                    isChecked
                      ? "bg-emerald-950/30 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "bg-white/5 border-purple-500/20 hover:bg-white/8 hover:border-purple-400/40"
                  }`}
                >
                  <div className="mt-0.5">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-purple-400/50" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-purple-300/70 block mb-0.5">
                      {item.phase}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                        isChecked ? "text-emerald-200 line-through opacity-80" : "text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.section>
      )}
    </div>
  );
}
