"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Sparkles,
  Bug,
  Search,
  Wrench,
  HelpCircle,
  CheckCircle2,
  Square,
  AlertTriangle,
  Compass,
  Zap,
  Lock,
  ChevronDown,
  Globe,
  FileCode,
  Flag,
} from "lucide-react";

export default function CybersecurityRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_cybersec_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });
  const [openBlocks, setOpenBlocks] = useState<Record<string, boolean>>({ "b1": true, "b4": true });

  const toggleChecklist = (id: string) => {
    setCompletedMilestones((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_cybersec_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleBlock = (id: string) => {
    setOpenBlocks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "bloques", label: "🗺️ Ruta 52 Semanas", icon: Compass },
    { id: "webhacking", label: "🐛 Web Hacking & OWASP", icon: Bug },
    { id: "recon", label: "🔍 Reconocimiento & OSINT", icon: Search },
    { id: "hackerone", label: "🎯 HackerOne & Bounties", icon: Flag },
    { id: "herramientas", label: "🛠️ Arsenal de Herramientas", icon: Wrench },
    { id: "reglas", label: "⚡ 6 Reglas del Hacker Ético", icon: Zap },
    { id: "preguntas", label: "💡 Preguntas & Monetización", icon: HelpCircle },
    { id: "hitos", label: "🚀 Hitos & Tracker", icon: CheckCircle2 },
  ];

  const blocks = [
    {
      id: "b1",
      num: "Bloque I",
      weeks: "Semanas 1–2",
      title: "Orientación & Entorno de Trabajo",
      hours: "7–12h/sem",
      color: "from-lime-500/20 to-emerald-500/10 border-lime-500/40 text-lime-300",
      badge: "bg-lime-500/20 text-lime-300 border-lime-500/30",
      desc: "Entiende qué es la ciberseguridad ética y monta tu laboratorio virtual seguro.",
      weeksList: [
        {
          week: "Semana 1",
          title: "¿Qué es esto y cómo funciona?",
          tasks: [
            "Aprende sobre hacking ético (White Hat vs Black Hat vs Grey Hat)",
            "Descubre qué es un Bug Bounty y cómo funciona HackerOne",
            "Crea tu cuenta gratuita en TryHackMe.com",
            "Entiende qué es una IP, un puerto y un servidor a nivel conceptual",
          ],
          resource: "TryHackMe — 'Pre-Security' Path (Gratis)",
        },
        {
          week: "Semana 2",
          title: "Configuración del Laboratorio Virtual",
          tasks: [
            "Instala VirtualBox en tu computador",
            "Descarga e instala Kali Linux como máquina virtual (VM)",
            "Abre la terminal por primera vez y pierde el miedo",
            "Aprende navegación básica: pwd, ls, cd, mkdir, rm, cp, mv",
          ],
          resource: "YouTube: 'Kali Linux VirtualBox install step by step' (Gratis)",
        },
      ],
    },
    {
      id: "b2",
      num: "Bloque II",
      weeks: "Semanas 3–6",
      title: "Linux — Tu Nuevo Idioma Nativo",
      hours: "7–12h/sem",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      desc: "Domina la línea de comandos, permisos, tuberías y scripts de automatización en Bash.",
      weeksList: [
        {
          week: "Semana 3",
          title: "Terminal Básica & Permisos",
          tasks: [
            "Comandos de archivos: cat, less, head, tail, file, find",
            "Permisos en Linux: chmod, chown y significado de rwxr-xr-x",
            "Usuarios y grupos: whoami, id, su, sudo",
            "Tuberías (pipes) y redirecciones: |, >, >>, 2>&1",
          ],
          resource: "TryHackMe — Linux Fundamentals 1 & 2 (Gratis)",
        },
        {
          week: "Semana 4",
          title: "Terminal Avanzada & Procesos",
          tasks: [
            "Búsqueda con grep y manipulación con awk / sed",
            "Gestión de procesos: ps, top, htop, kill, jobs, bg/fg",
            "Servicios del sistema: systemctl start/stop/status",
            "Tareas programadas con Cron Jobs",
          ],
          resource: "Libro: 'The Linux Command Line' por William Shotts (PDF Gratis)",
        },
        {
          week: "Semana 5–6",
          title: "Bash Scripting & Wargame Bandit",
          tasks: [
            "Variables, condicionales if/else y bucles for/while en Bash",
            "Automatizar la creación de carpetas para reportes de targets",
            "Juega los primeros 10–15 niveles de Bandit en OverTheWire.org",
            "Crea tu cheat sheet personal de comandos de Linux",
          ],
          resource: "OverTheWire — Bandit Wargame (Gratis)",
        },
      ],
    },
    {
      id: "b3",
      num: "Bloque III",
      weeks: "Semanas 7–11",
      title: "Redes — Cómo se Comunican las Máquinas",
      hours: "7–12h/sem",
      color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-300",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      desc: "Protocolos TCP/IP, HTTP a fondo, captura de paquetes con Wireshark y escaneo con Nmap.",
      weeksList: [
        {
          week: "Semana 7–8",
          title: "Protocolos Core, DNS & HTTP",
          tasks: [
            "IPv4, IPv6, Subnets, Gateway y Máscaras de red",
            "Puertos clave: 22 (SSH), 80 (HTTP), 443 (HTTPS), 3306 (MySQL)",
            "Diferencia TCP (confiable) vs UDP (rápido sin estado)",
            "HTTP profundo: métodos GET/POST/PUT/DELETE, Headers y Códigos 200/403/404/500",
          ],
          resource: "TryHackMe — 'How The Web Works' & 'Network Fundamentals'",
        },
        {
          week: "Semana 9–10",
          title: "Wireshark & Nmap",
          tasks: [
            "Captura tu tráfico HTTP en Wireshark y analiza paquetes",
            "Aplica filtros en Wireshark: ip.addr, tcp.port, http",
            "Nmap básico: nmap -sV (versiones), nmap -sC (scripts de enumeración)",
            "Escanea tu propia red local para mapear dispositivos conectados",
          ],
          resource: "YouTube: 'Wireshark & Nmap for Beginners' — David Bombal / NetworkChuck",
        },
        {
          week: "Semana 11",
          title: "Consolidación de Redes",
          tasks: [
            "Completa el path completo de 'Pre-Security' en TryHackMe",
            "Explica con tus palabras qué pasa desde que escribes una URL hasta que carga la web",
            "Documenta tu flujo de red en apuntes técnicos",
          ],
          resource: "TryHackMe — Certificado de Pre-Security (Gratis)",
        },
      ],
    },
    {
      id: "b4",
      num: "Bloque IV",
      weeks: "Semanas 12–28",
      title: "Web Hacking — El Core de los Bounties",
      hours: "10–18h/sem",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      desc: "Burp Suite, OWASP Top 10: XSS, SQLi, IDOR, SSRF, CSRF, File Upload, APIs y lógica de negocio.",
      weeksList: [
        {
          week: "Semana 12–13",
          title: "Burp Suite — Tu Arma Principal",
          tasks: [
            "Instala Burp Suite Community y configura el proxy en tu navegador",
            "Intercepta y modifica peticiones HTTP en tiempo real",
            "Aprende a usar Burp Repeater para reenviar requests modificadas",
            "Practica en aplicaciones locales vulnerables como DVWA",
          ],
          resource: "PortSwigger Web Security Academy — 'Burp Suite Essentials' (Gratis)",
        },
        {
          week: "Semana 14–17",
          title: "XSS & SQL Injection",
          tasks: [
            "XSS Reflected, Stored y DOM-based: robo de cookies y session hijacking",
            "SQL Injection: ' OR 1=1--, UNION-based y Blind SQLi",
            "Uso comprensivo de sqlmap para automatizar explotación demostrativa",
            "Resuelve todos los laboratorios de XSS y SQLi en PortSwigger Academy",
          ],
          resource: "PortSwigger Academy — 35+ labs prácticos de XSS & SQLi (Gratis)",
        },
        {
          week: "Semana 18–21",
          title: "IDOR, Broken Auth, SSRF & CSRF",
          tasks: [
            "IDOR (Insecure Direct Object Reference): alterar IDs numéricos o UUIDs en APIs",
            "Fallas de autenticación: tokens JWT débiles y restablecimiento de contraseña",
            "SSRF (Server-Side Request Forgery): forzar al servidor a consultar recursos internos o metadata de AWS",
            "CSRF (Cross-Site Request Forgery) y bypass de protecciones",
          ],
          resource: "PortSwigger Academy — Access Control, Authentication, SSRF & CSRF",
        },
        {
          week: "Semana 22–28",
          title: "File Upload, APIs & Apps Vulnerables",
          tasks: [
            "File Upload bypasses: subir shells disfrazadas de imagen para ejecutar código (RCE)",
            "Seguridad en APIs REST & GraphQL: Mass Assignment, falta de rate limit",
            "Fallas de lógica de negocio (Business Logic Flaws): omitir pagos o pasos",
            "Completa OWASP Juice Shop y DVWA en dificultad alta",
          ],
          resource: "OWASP Juice Shop + DVWA (Instalación local gratuita)",
        },
      ],
    },
    {
      id: "b5",
      num: "Bloque V",
      weeks: "Semanas 29–34",
      title: "Reconocimiento & Automatización (Recon)",
      hours: "10–14h/sem",
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-300",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      desc: "Encuentra activos olvidados antes que los demás mediante OSINT, enumeración y fuzzing.",
      weeksList: [
        {
          week: "Semana 29–30",
          title: "OSINT & Reconocimiento Pasivo",
          tasks: [
            "Google Dorks: site:, filetype:env, inurl:admin para encontrar secretos expuestos",
            "Shodan.io: descubrir servidores, puertos y servicios expuestos a internet",
            "crt.sh: certificados SSL/TLS para descubrir subdominios históricos",
            "Wayback Machine: encontrar endpoints antiguos que siguen respondiendo",
          ],
          resource: "TryHackMe — Google Dorking & OSINT Rooms",
        },
        {
          week: "Semana 31–34",
          title: "Subdominios & Fuzzing con Ffuf",
          tasks: [
            "Herramientas de subdominios: subfinder, amass y httprobe para filtrar activos vivos",
            "Fuzzing de directorios y parámetros con ffuf y la librería SecLists",
            "Construye tu primer pipeline en Bash: subfinder | httprobe | gowitness",
          ],
          resource: "GitHub: SecLists (Daniel Miessler) & Jason Haddix Bug Hunter Methodology",
        },
      ],
    },
    {
      id: "b6",
      num: "Bloque VI",
      weeks: "Semanas 35–52",
      title: "HackerOne — Primeros Reportes & Bounties",
      hours: "12–20h/sem",
      color: "from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-300",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      desc: "Aplica en programas reales (VDPs y con recompensa), escribe reportes impecables y cobra tus primeros bounties.",
      weeksList: [
        {
          week: "Semana 35–38",
          title: "Perfil HackerOne & Redacción de Reportes",
          tasks: [
            "Crea cuenta profesional en HackerOne y completa el curso oficial Hacker101",
            "Estructura de reporte ganador: Título conciso + Resumen + Pasos de reproducción + Impacto real",
            "Estudia 20 reportes reales divulgados en HackerOne Hacktivity",
          ],
          resource: "Hacker101 (Curso oficial gratuito de HackerOne)",
        },
        {
          week: "Semana 39–52",
          title: "Caza en VDPs, Bounties & Cobro desde Colombia",
          tasks: [
            "Caza en programas VDP (sin recompensa monetaria) para ganar reputación inicial",
            "Transiciona a programas con bounty enfocándote en tu vulnerabilidad estrella (ej. IDOR)",
            "Configura tu cobro mediante PayPal o transferencia bancaria",
            "Lee 1 reporte público de Hacktivity diario como hábito sagrado",
          ],
          resource: "Libro: 'Real-World Bug Hunting' por Peter Yaworski (~$30 USD)",
        },
      ],
    },
  ];

  const tools = [
    { name: "Burp Suite", cat: "Proxy Web", desc: "Interpreta, intercepta y modifica peticiones HTTP. Tu herramienta diaria para web hacking.", stage: "Semana 12+" },
    { name: "Nmap", cat: "Escáner de Red", desc: "Descubre puertos abiertos, servicios y versiones en servidores objetivo.", stage: "Semana 10+" },
    { name: "ffuf", cat: "Fuzzing Web", desc: "Fuzzer ultrarrápido para encontrar directorios, archivos ocultos y parámetros en URLs.", stage: "Semana 33+" },
    { name: "subfinder", cat: "Recon Subdominios", desc: "Descubre subdominios pasivos usando múltiples fuentes y APIs públicas.", stage: "Semana 31+" },
    { name: "Wireshark", cat: "Sniffer de Red", desc: "Analiza paquetes y protocolos de red en tiempo real a nivel de bits.", stage: "Semana 9+" },
    { name: "sqlmap", cat: "Automatización SQLi", desc: "Herramienta para comprobar y extraer datos de bases de datos vulnerables a SQLi.", stage: "Semana 16+" },
    { name: "Kali Linux", cat: "Sistema Operativo", desc: "Distribución de seguridad con más de 600 herramientas preinstaladas.", stage: "Semana 2+" },
    { name: "Nuclei", cat: "Escaneo por Plantillas", desc: "Escáner rápido de vulnerabilidades basado en plantillas YAML comunitarias.", stage: "Semana 40+" },
  ];

  const rules = [
    { icon: "⚡", title: "1. Haz antes de leer", desc: "Instala, rompe y experimenta. Los tutoriales sin práctica se olvidan en 24 horas. Cada concepto nuevo que veas, pruébalo en tu terminal ese mismo día." },
    { icon: "📓", title: "2. Documenta todo en tu propio Notion", desc: "Crea tu base de conocimiento personal con payloads, comandos y conceptos. Tu documentación es tu verdadero portafolio y certificado." },
    { icon: "🔍", title: "3. Google y los errores son tus maestros", desc: "La habilidad de buscar mensajes de error exactos en Google y GitHub Issues es la habilidad técnica número uno de un hacker." },
    { icon: "🧩", title: "4. Nunca te saltes las bases", desc: "Es tentador ir directo a atacar páginas. Pero sin Linux y Redes (HTTP, DNS, TCP), te quedarás bloqueado en la primera semana." },
    { icon: "🌐", title: "5. Únete a comunidades activas", desc: "Participa en el Discord de TryHackMe y subreddits r/netsec y r/bugbounty. Aprender viendo las dudas y logros de otros acelera tu progreso." },
    { icon: "🛡️", title: "6. Siempre con autorización formal", desc: "Hackea únicamente en tus máquinas virtuales, plataformas autorizadas (TryHackMe, PortSwigger) y programas con scope de HackerOne." },
  ];

  const faq = [
    { q: "¿Cuánto tiempo hasta ganar dinero?", a: "De 8 a 14 meses con consistencia diaria de 1 a 2 horas. Los primeros 6 meses son de laboratorio y cimientos. Tus primeros reportes cerrados como duplicados o informativos son parte natural del aprendizaje." },
    { q: "¿Necesito saber inglés?", a: "Sí, nivel básico-intermedio. Los reportes en HackerOne y las mejores documentaciones están en inglés. Puedes ayudarte de traductores, pero debes comprender y escribir con claridad técnica." },
    { q: "¿Cuánto dinero necesito para empezar?", a: "Los primeros 6 meses son $0 USD. VirtualBox, Kali Linux, TryHackMe (nivel gratis), PortSwigger Academy y Hacker101 son 100% gratuitos." },
    { q: "¿Cómo se cobran las recompensas desde Colombia?", a: "HackerOne paga mediante PayPal o transferencia bancaria directa en USD. PayPal es el método más común y sencillo para transferir luego a bancos locales." },
    { q: "¿Qué pasa si nunca encuentro un bug?", a: "El conocimiento adquirido te capacita para trabajar como Pentester Junior, Analista SOC, Auditor de Ciberseguridad o Desarrollador seguro, roles con altísima demanda y excelentes sueldos." },
  ];

  const milestones = [
    { id: "cs_kali", label: "Semana 2: Kali Linux instalado en VirtualBox y terminal dominada", stage: "Hito 1" },
    { id: "cs_bandit", label: "Semana 6: Bandit nivel 10 completado en OverTheWire", stage: "Hito 2" },
    { id: "cs_presec", label: "Semana 11: Path de Pre-Security completado en TryHackMe", stage: "Hito 3" },
    { id: "cs_burp_xss", label: "Semana 20: Burp Suite dominado + laboratorios de XSS y SQLi resueltos", stage: "Hito 4" },
    { id: "cs_owasp_juice", label: "Semana 28: OWASP Juice Shop y DVWA completados", stage: "Hito 5" },
    { id: "cs_recon_pipeline", label: "Semana 34: Pipeline de reconocimiento automatizado en Bash funcionando", stage: "Hito 6" },
    { id: "cs_h1_report", label: "Semana 40: Primer reporte enviado y aceptado en programa VDP de HackerOne", stage: "Hito 7" },
    { id: "cs_first_bounty", label: "Semana 52: Primer bounty monetario cobrado con éxito", stage: "Hito 8" },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-lime-950/40 via-emerald-950/20 to-black/60 backdrop-blur-xl border border-lime-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(200,255,0,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-500/15 border border-lime-400/30 text-lime-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Shield className="w-3.5 h-3.5 text-lime-400" />
            De Cero Absoluto a Bug Bounty Hunter en HackerOne
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Ciberseguridad &amp; </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-lime-300 via-emerald-300 to-cyan-300">
              Hacking Ético
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            Ruta paso a paso de 52 semanas: Linux, Redes, Web Hacking (OWASP Top 10), Reconocimiento y primeros reportes reales.
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-xl p-4 rounded-2xl bg-white/5 border border-lime-500/20 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-lime-300 block">52</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Semanas</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-300 block">1–2h</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Al día</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 block">$0</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Para iniciar</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 block">H1</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Destino</span>
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
                  ? "bg-lime-500/90 text-black border-lime-300 shadow-[0_0_15px_rgba(200,255,0,0.4)] scale-102 font-bold"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. RUTA 52 SEMANAS */}
      {(activeSubTab === "all" || activeSubTab === "bloques") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-lime-400">Plan de 52 Semanas</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-lime-400" />
              Los 6 Bloques de Aprendizaje Estructurado
            </h3>
          </div>

          <div className="space-y-4">
            {blocks.map((b) => {
              const isOpen = !!openBlocks[b.id];
              return (
                <div
                  key={b.id}
                  className={`rounded-2xl border backdrop-blur-md transition-all overflow-hidden bg-linear-to-br ${b.color}`}
                >
                  <div
                    onClick={() => toggleBlock(b.id)}
                    className="p-5 sm:p-6 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className={`text-xs font-mono font-bold uppercase px-3 py-1 rounded-lg border ${b.badge}`}>
                        {b.num}
                      </span>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-white">{b.title}</h4>
                        <span className="text-xs text-purple-200/70 font-mono">{b.weeks} · {b.hours}</span>
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
                        <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed pt-3">{b.desc}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          {b.weeksList.map((w, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono text-lime-300 font-bold">{w.week}</span>
                              </div>
                              <h5 className="font-bold text-white text-xs sm:text-sm">{w.title}</h5>
                              <ul className="space-y-1 text-xs text-purple-200/80">
                                {w.tasks.map((task, i) => (
                                  <li key={i} className="flex items-start gap-1.5">
                                    <span className="text-lime-400 shrink-0 mt-0.5">○</span>
                                    <span>{task}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="pt-2 border-t border-white/5 text-[11px] text-cyan-300 font-medium">
                                📖 {w.resource}
                              </div>
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

      {/* 2. WEB HACKING */}
      {(activeSubTab === "all" || activeSubTab === "webhacking") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Vulnerabilidades de Alto Impacto</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Bug className="w-6 h-6 text-amber-400" />
              OWASP Top 10 &amp; Técnicas de Explotación
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Lock className="w-4 h-4" /> 1. IDOR (Insecure Direct Object Reference)
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Cambiar <code className="text-lime-300 bg-black/40 px-1.5 py-0.5 rounded">/api/users/100</code> por <code className="text-lime-300 bg-black/40 px-1.5 py-0.5 rounded">/api/users/101</code> para acceder a datos privados de otros usuarios sin autorización.
              </p>
              <span className="text-[11px] text-purple-300 block pt-1">🎯 La vulnerabilidad más común y mejor pagada en Bug Bounties modernos.</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <FileCode className="w-4 h-4" /> 2. XSS (Cross-Site Scripting)
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Inyectar código JavaScript malicioso en inputs que se ejecutan en el navegador de la víctima para robar cookies de sesión o redirigir tráfico.
              </p>
              <span className="text-[11px] text-purple-300 block pt-1">🎯 Reflected, Stored y DOM-based XSS.</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <Globe className="w-4 h-4" /> 3. SSRF (Server-Side Request Forgery)
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Hacer que el servidor web realice peticiones HTTP a su propia red interna o a la metadata de la nube (<code className="text-lime-300 bg-black/40 px-1.5 py-0.5 rounded">169.254.169.254</code> en AWS).
              </p>
              <span className="text-[11px] text-purple-300 block pt-1">🎯 Crítica para acceder a credenciales de infraestructura.</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" /> 4. SQL Injection (SQLi)
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Manipular consultas de bases de datos mediante inputs no sanitizados (<code className="text-lime-300 bg-black/40 px-1.5 py-0.5 rounded">&apos; OR 1=1--</code>) para extraer tablas enteras.
              </p>
              <span className="text-[11px] text-purple-300 block pt-1">🎯 UNION-based, Error-based y Blind SQLi.</span>
            </div>
          </div>
        </motion.section>
      )}

      {/* 3. RECONOCIMIENTO & OSINT */}
      {(activeSubTab === "all" || activeSubTab === "recon") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Recon Pipeline</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Search className="w-6 h-6 text-cyan-400" />
              Reconocimiento: Mapear la Superficie de Ataque
            </h3>
            <p className="text-purple-200/70 text-sm">
              El 90% del éxito en Bug Bounty radica en encontrar subdominios y endpoints olvidados que otros no escanearon.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Paso 1</span>
              <h4 className="font-bold text-white text-sm">Subdominios Pasivos</h4>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Usa <code className="text-lime-300">subfinder</code> y <code className="text-lime-300">crt.sh</code> para listar todos los subdominios de un dominio sin enviar paquetes directos.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Paso 2</span>
              <h4 className="font-bold text-white text-sm">Filtrado de Vivos</h4>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Pasa la lista por <code className="text-lime-300">httprobe</code> para saber cuáles responden en puertos 80 y 443.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Paso 3</span>
              <h4 className="font-bold text-white text-sm">Fuzzing de Rutas</h4>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Ejecuta <code className="text-lime-300">ffuf</code> con wordlists de SecLists para descubrir paneles de admin y APIs no enlazadas.
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* 4. HACKERONE */}
      {(activeSubTab === "all" || activeSubTab === "hackerone") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Plataforma Profesional</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Flag className="w-6 h-6 text-rose-400" />
              Estructura de un Reporte Ganador en HackerOne
            </h3>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-purple-500/30 space-y-4 text-xs sm:text-sm">
            <div className="space-y-2">
              <span className="font-mono text-lime-300 font-bold block">1. Título Conciso &amp; Profesional</span>
              <p className="text-purple-200/80 bg-white/5 p-2 rounded-lg font-mono">
                [IDOR en /api/v1/orders] Permite a usuarios autenticados descargar recibos de otros clientes
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-lime-300 font-bold block">2. Pasos Exactos de Reproducción</span>
              <p className="text-purple-200/80">
                1. Inicia sesión con la cuenta de prueba A.<br />
                2. Captura la petición GET /api/v1/orders/1029 con Burp Suite.<br />
                3. Modifica el ID a 1030 (cuenta de prueba B).<br />
                4. Observa que el servidor responde con 200 OK y los datos personales de la cuenta B.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-lime-300 font-bold block">3. Impacto en el Negocio</span>
              <p className="text-purple-200/80">
                Un atacante puede iterar IDs para descargar la base completa de órdenes con nombres, direcciones y métodos de pago de todos los clientes.
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* 5. HERRAMIENTAS */}
      {(activeSubTab === "all" || activeSubTab === "herramientas") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Kit del Auditor</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Wrench className="w-6 h-6 text-teal-400" />
              Arsenal de Herramientas Esenciales
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {tools.map((t, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-lime-500/20 text-lime-300">
                    {t.cat}
                  </span>
                  <span className="text-[10px] font-mono text-purple-300">{t.stage}</span>
                </div>
                <h4 className="font-bold text-white text-sm">{t.name}</h4>
                <p className="text-xs text-purple-200/75 leading-snug">{t.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 6. REGLAS */}
      {(activeSubTab === "all" || activeSubTab === "reglas") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-lime-400">Mentalidad</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-lime-400" />
              Las 6 Reglas del Hacker Ético Autodidacta
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rules.map((r, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                <span className="text-2xl">{r.icon}</span>
                <h4 className="font-bold text-white text-base">{r.title}</h4>
                <p className="text-xs text-purple-200/75 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 7. PREGUNTAS FRECUENTES */}
      {(activeSubTab === "all" || activeSubTab === "preguntas") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Claridad</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-cyan-400" />
              Preguntas Frecuentes &amp; Monetización
            </h3>
          </div>

          <div className="space-y-3">
            {faq.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-1.5">
                <h4 className="font-bold text-lime-300 text-sm">{item.q}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 8. HITOS & TRACKER */}
      {(activeSubTab === "all" || activeSubTab === "hitos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-lime-400">Progreso Real</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-lime-400" />
              Hitos de Tu Carrera en Ciberseguridad
            </h3>
            <p className="text-purple-200/70 text-sm">Marca tus logros cumplidos a lo largo de las 52 semanas.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {milestones.map((m) => {
              const isChecked = !!completedMilestones[m.id];
              return (
                <button
                  key={m.id}
                  onClick={() => toggleChecklist(m.id)}
                  className={`p-4 rounded-2xl border backdrop-blur-md transition-all text-left flex items-start gap-3 cursor-pointer select-none ${
                    isChecked
                      ? "bg-lime-950/30 border-lime-500/40 shadow-[0_0_15px_rgba(200,255,0,0.2)]"
                      : "bg-white/5 border-purple-500/20 hover:bg-white/8 hover:border-purple-400/40"
                  }`}
                >
                  <div className="mt-0.5">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-lime-400" />
                    ) : (
                      <Square className="w-5 h-5 text-purple-400/50" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-lime-300/80 block mb-0.5">
                      {m.stage}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                        isChecked ? "text-lime-200 line-through opacity-80" : "text-white"
                      }`}
                    >
                      {m.label}
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
