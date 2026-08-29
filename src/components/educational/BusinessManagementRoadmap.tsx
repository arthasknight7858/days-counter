"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Sparkles,
  Building2,
  Scale,
  DollarSign,
  PieChart,
  Users,
  Target,
  FileText,
  ShieldCheck,
  TrendingUp,
  Award,
  CheckCircle2,
  Square,
  AlertTriangle,
  Lightbulb,
  Compass,
  Zap,
  Globe,
} from "lucide-react";

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function BusinessManagementRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_business_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  const toggleChecklist = (id: string) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_business_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "timeline", label: "🗺️ Cronograma (Mes 1–24)", icon: Compass },
    { id: "admin", label: "🏛️ 12 Áreas de Administración", icon: Building2 },
    { id: "legal", label: "⚖️ 10 Áreas del Marco Legal", icon: Scale },
    { id: "metodologia", label: "🧠 Cómo Aprender de Verdad", icon: Lightbulb },
    { id: "youtube", label: "▶️ Canales YouTube", icon: YouTubeIcon },
    { id: "trucos", label: "⚡ 8 Trucos & Atajos", icon: Zap },
    { id: "errores", label: "🚫 Errores Comunes", icon: AlertTriangle },
    { id: "habilidades", label: "💡 Habilidades & Checklist", icon: CheckCircle2 },
  ];

  const timelineMilestones = [
    { month: "Mes 1 – 2", title: "Fundamentos: Cómo funciona una empresa", desc: "Áreas funcionales, tipos de organizaciones, diferencia entre emprender y administrar. Entender la lógica de un sistema empresarial.", tag: "Admin", color: "border-amber-400/40 text-amber-300" },
    { month: "Mes 2 – 4", title: "Finanzas Básicas & Contabilidad", desc: "Balance general, estado de resultados, flujo de caja. Lectura e interpretación de estados financieros reales.", tag: "Finanzas", color: "border-amber-400/40 text-amber-300" },
    { month: "Mes 3 – 5", title: "Introducción al Marco Legal Empresarial", desc: "Tipos de personas jurídicas (SAS, S.A.), constitución de empresas, contratos básicos y obligaciones fiscales.", tag: "Legal", color: "border-indigo-400/40 text-indigo-300" },
    { month: "Mes 4 – 7", title: "Marketing, Ventas & Estrategia Comercial", desc: "Propuesta de valor, segmentación de mercado, canales de distribución y embudo de conversión.", tag: "Comercial", color: "border-amber-400/40 text-amber-300" },
    { month: "Mes 6 – 9", title: "Gestión de Personas & Derecho Laboral", desc: "Contratación, cultura organizacional, liderazgo, salarios, prestaciones y desvinculaciones legales.", tag: "Talento", color: "border-indigo-400/40 text-indigo-300" },
    { month: "Mes 7 – 10", title: "Derecho Comercial & Contratos Avanzados", desc: "Contratos de prestación, arrendamiento, cláusulas penales, propiedad intelectual y resolución de conflictos.", tag: "Legal", color: "border-indigo-400/40 text-indigo-300" },
    { month: "Mes 8 – 12", title: "Estrategia Empresarial & Planificación", desc: "Análisis FODA, 5 Fuerzas de Porter, Canvas de modelo de negocio, OKRs y Balanced Scorecard.", tag: "Estrategia", color: "border-emerald-400/40 text-emerald-300" },
    { month: "Mes 10 – 14", title: "Operaciones, Procesos & Tecnología", desc: "Cadena de suministro, optimización de procesos (Lean), ERPs, CRM y automatización digital.", tag: "Operaciones", color: "border-emerald-400/40 text-emerald-300" },
    { month: "Mes 12 – 16", title: "Derecho Tributario & Cumplimiento Fiscal", desc: "IVA, Impuesto de Renta, retenciones en la fuente, DIAN y planeación tributaria legal.", tag: "Impuestos", color: "border-indigo-400/40 text-indigo-300" },
    { month: "Mes 14 – 18", title: "Proyecto Integrador & Práctica Real", desc: "Estructurar un plan de negocios completo: modelo financiero, estructura jurídica y estrategia de mercado.", tag: "Práctica", color: "border-teal-400/40 text-teal-300" },
    { month: "Mes 18 – 24", title: "Especialización & Profundidad", desc: "Elegir rama de maestría: finanzas corporativas, derecho societario, dirección ejecutiva o escalamiento.", tag: "Maestría", color: "border-purple-400/40 text-purple-300" },
  ];

  const adminAreas = [
    { num: "01", icon: Building2, title: "Fundamentos de Administración", desc: "Funciones PODC (Planear, Organizar, Dirigir, Controlar), escuelas de Drucker y Fayol, organigramas y cultura organizacional." },
    { num: "02", icon: DollarSign, title: "Finanzas Empresariales", desc: "Balance general, P&L, Cash Flow, cálculo de ROI, ROE, margen neto, punto de equilibrio y valor del dinero en el tiempo (VPN, TIR)." },
    { num: "03", icon: FileText, title: "Contabilidad Gerencial", desc: "Ecuación contable (Activo = Pasivo + Patrimonio), registros débito/crédito, normas NIIF y análisis de reportes contables." },
    { num: "04", icon: Target, title: "Marketing & Mercadeo", desc: "Las 4Ps (Producto, Precio, Plaza, Promoción), propuesta de valor única (USP), segmentación de clientes y marketing digital." },
    { num: "05", icon: TrendingUp, title: "Ventas & Gestión Comercial", desc: "Proceso de ventas de prospección a cierre, negociación comercial, métricas (LTV, CAC, ticket promedio) y estrategias B2B vs B2C." },
    { num: "06", icon: Users, title: "Gestión del Talento Humano", desc: "Reclutamiento y selección por competencias, inducción, evaluación de desempeño, compensaciones y liderazgo situacional." },
    { num: "07", icon: Briefcase, title: "Operaciones & Procesos", desc: "Flujogramas de procesos, gestión de cadena de suministro (Supply Chain), control de calidad (ISO) y metodología Lean." },
    { num: "08", icon: PieChart, title: "Estrategia Empresarial", desc: "Análisis FODA, 5 Fuerzas de Porter, Business Model Canvas, planeación estratégica por OKRs y Balanced Scorecard." },
    { num: "09", icon: Zap, title: "Emprendimiento & Plan de Negocio", desc: "Metodología Lean Startup, creación de Producto Mínimo Viable (MVP), pitch de inversión y financiamiento (Bootstrapping vs VC)." },
    { num: "10", icon: Sparkles, title: "Tecnología & Transformación Digital", desc: "Sistemas ERP (SAP, Odoo, Siigo), CRMs, automatización sin código, análisis de datos en Excel y aplicaciones de IA en negocios." },
    { num: "11", icon: Globe, title: "Comercio Internacional", desc: "Términos Incoterms (FOB, CIF, DDP), regímenes arancelarios, acuerdos TLC, documentación de aduanas y riesgo cambiario." },
    { num: "12", icon: ShieldCheck, title: "Sostenibilidad & Ética Empresarial", desc: "Responsabilidad Social Empresarial (RSE), criterios ESG (Ambiental, Social, Gobernanza) y juntas directivas de gobierno corporativo." },
  ];

  const legalAreas = [
    { num: "01", icon: Building2, title: "Constitución de Empresas & Sociedades", desc: "Estructuras jurídicas (SAS, S.A., LTDA), responsabilidad limitada, estatutos sociales y registro mercantil en Cámara de Comercio." },
    { num: "02", icon: FileText, title: "Derecho de Contratos Comerciales", desc: "Elementos de validez, contratos de prestación de servicios, compraventa, arrendamiento, cláusulas penales y de confidencialidad (NDA)." },
    { num: "03", icon: Users, title: "Derecho Laboral & Contratación", desc: "Contratos a término fijo/indefinido, prestaciones sociales, seguridad social, jornada laboral, causales de despido e indemnizaciones." },
    { num: "04", icon: DollarSign, title: "Derecho Tributario & Fiscal", desc: "Impuesto de Renta, IVA, Retención en la fuente (ReteFuente), ICA municipal, régimen simple y planeación fiscal ante la DIAN." },
    { num: "05", icon: Award, title: "Propiedad Intelectual & Marcas", desc: "Registro de marcas y nombres comerciales ante la SIC (Superintendencia), derechos de autor sobre software, patentes y licencias." },
    { num: "06", icon: ShieldCheck, title: "Protección de Datos (Habeas Data)", desc: "Ley 1581 de 2012 en Colombia, autorización para tratamiento de datos personales, políticas de privacidad y estándar GDPR." },
    { num: "07", icon: Scale, title: "Derecho Comercial & Títulos Valores", desc: "Código de Comercio, actos mercantiles, libros oficiales, títulos valores (pagarés, cheques, facturas electrónicas) y competencia desleal." },
    { num: "08", icon: Briefcase, title: "Derecho Societario & Acuerdos de Socios", desc: "Asamblea de accionistas, juntas directivas, reparto de dividendos, reformas estatutarias y pactos de socios (Shareholders Agreement)." },
    { num: "09", icon: Target, title: "Resolución de Conflictos & Arbitraje", desc: "Negociación directa, centros de conciliación extrajudicial, cláusulas compromisorias de arbitraje comercial y cobros ejecutivos." },
    { num: "10", icon: Globe, title: "Compliance & Regulaciones Sectoriales", desc: "Sistemas SARLAFT (prevención de lavado de activos), regulación de comercio electrónico, licencias sanitarias y normatividad anticorrupción." },
  ];

  const strategies = [
    { title: "Aprendizaje en Espiral", desc: "Aprende las bases de administración, finanzas y derecho en paralelo. Los conceptos se retroalimentan: las finanzas explican los impuestos y los contratos explican las sociedades." },
    { title: "Aprende → Enseña → Aplica", desc: "Explica cada concepto en voz alta con palabras sencillas como si fueras el profesor. La retención se multiplica por 4x comparado con la lectura pasiva." },
    { title: "Sistema 60 / 30 / 10", desc: "60% estudio de contenido nuevo (libros, cursos), 30% aplicación en casos o simulaciones reales y 10% repaso de notas anteriores." },
    { title: "Caso de Estudio Propio", desc: "Elige una empresa real o proyecto personal y úsalo como laboratorio: calcula sus márgenes, redacta sus contratos hipotéticos y define su estructura jurídica." },
    { title: "Bloques de 90 Minutos", desc: "Estudia en bloques de 90 minutos de enfoque profundo sin celular, seguidos de 20 minutos de descanso activo para máxima consolidación neuronal." },
    { title: "Repetición Espaciada con Anki", desc: "Crea tarjetas digitales para memorizar terminología jurídica y fórmulas financieras clave a largo plazo sin esfuerzo." },
  ];

  const youtubeChannels = [
    { name: "Platzi", desc: "Cursos estructurados de administración, finanzas, marketing y modelos de negocio en español.", badge: "Negocios & Tech" },
    { name: "Economía Simple", desc: "Explicaciones visuales y animadas de conceptos económicos, financieros y de mercado para principiantes.", badge: "Finanzas Claras" },
    { name: "Khan Academy en Español", desc: "El mejor recurso gratuito para aprender contabilidad básica, finanzas y matemáticas empresariales desde cero.", badge: "Contabilidad Base" },
    { name: "Harvard Business Review (HBR)", desc: "Casos de estudio ejecutivos, estrategia global, gestión de equipos y liderazgo corporativo de élite.", badge: "Estrategia Global" },
    { name: "Abogado Responde / Canales Jurídicos", desc: "Explicaciones prácticas de derecho laboral, redacción de contratos, títulos valores y leyes comerciales.", badge: "Derecho Práctico" },
    { name: "Emprender Fácil / Pymes", desc: "Estructuración de planes de negocio, validación de ideas comerciales y administración de pequeñas y medianas empresas.", badge: "Emprendimiento" },
  ];

  const tricks = [
    { num: "01", title: "Lee documentos y contratos reales desde el día 1", desc: "Consigue modelos reales de estatutos de una SAS, contratos de servicios y balances públicos. Ver el documento real le da sentido inmediato a la teoría." },
    { num: "02", title: "Usa la IA como tu asesor y tutor 24/7", desc: "Pídele a Claude o ChatGPT que actúe como director financiero o abogado corporativo: haz que te haga preguntas trampa y revise tus contratos simulados." },
    { num: "03", title: "Crea tu propio diccionario de términos empresariales", desc: "Anota cada término nuevo (EBITDA, Habeas Data, SARLAFT, ROI, NIIF) con tu propia definición con ejemplos cotidianos." },
    { num: "04", title: "Inmersión en noticias económicas y de negocios", desc: "Dedica 15 minutos diarios a leer Portafolio, La República o Bloomberg. Conectarás la teoría con fusiones, sanciones y leyes del mundo real." },
    { num: "05", title: "Descarga plantillas antes de memorizar fórmulas", desc: "Rellena hojas de cálculo de flujo de caja y modelos de contratos antes de entrar a la teoría densa. La estructura se graba mejor en la práctica." },
    { num: "06", title: "Cuantifica todo lo que aprendas", desc: "No pienses 'los contratos son útiles'; piensa 'un contrato sin cláusula penal puede impedir cobrar una deuda de $20 millones de pesos'." },
  ];

  const mistakes = [
    { err: "Estudiar solo teoría sin simulaciones", reason: "Falsa sensación de dominio", fix: "Aplica cada tema en un ejercicio o caso práctico real." },
    { err: "Ignorar el marco legal hasta tener un problema", reason: "Parece aburrido o lejano", fix: "El error legal más costoso es el que se comete por desconocimiento previo." },
    { err: "Depender únicamente de videos sueltos de YouTube", reason: "Falta de orden secuencial", fix: "Usa libros y cursos estructurados como columna vertebral y YouTube de apoyo." },
    { err: "Pensar que un contador o abogado lo resuelve todo sin supervisión", reason: "Delegación a ciegas", fix: "Delega la ejecución, pero comprende los fundamentos para auditar y decidir." },
    { err: "Estudiar leyes genéricas sin contrastar la legislación local", reason: "Material internacional", fix: "Verifica siempre las normas vigentes en Colombia (Código de Comercio, DIAN, SIC)." },
  ];

  const checklistItems = [
    { id: "adm_podc", label: "Comprender las 4 funciones PODC (Planear, Organizar, Dirigir, Controlar)", stage: "Mes 1" },
    { id: "adm_financials", label: "Saber leer un Balance General, Estado de Resultados (P&L) y Flujo de Caja", stage: "Mes 2" },
    { id: "adm_sas_creation", label: "Conocer los requisitos y estatutos para constituir una SAS en Cámara de Comercio", stage: "Mes 3" },
    { id: "adm_contracts_nda", label: "Identificar cláusulas esenciales en contratos de servicios y acuerdos de confidencialidad", stage: "Mes 4" },
    { id: "adm_labor_law", label: "Entender tipos de contratos laborales, prestaciones sociales y liquidaciones justas", stage: "Mes 6" },
    { id: "adm_canvas_strategy", label: "Elaborar un Business Model Canvas completo con propuesta de valor y canales", stage: "Mes 8" },
    { id: "adm_dian_taxes", label: "Dominar los conceptos de IVA, Retención en la fuente e Impuesto de Renta ante la DIAN", stage: "Mes 12" },
    { id: "adm_business_plan", label: "Completar un plan de negocios integral con proyecciones y estructura legal", stage: "Mes 16" },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-950/40 via-indigo-950/30 to-black/60 backdrop-blur-xl border border-amber-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(245,158,11,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            Guía Integral · De Cero a Competente
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Administración &amp; </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-300 via-indigo-300 to-emerald-300">
              Marco Legal
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            Todo lo que necesitas para dirigir una empresa con éxito y seguridad jurídica: finanzas, operaciones, contratos, talento y cumplimiento legal.
          </p>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg p-4 rounded-2xl bg-white/5 border border-amber-500/20 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 block">12</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Áreas Admin</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-300 block">10</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Áreas Legales</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-300 block">18–24m</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Ruta Pro</span>
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
                  ? "bg-amber-500/90 text-black border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-102 font-bold"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. CRONOGRAMA POR MESES */}
      {(activeSubTab === "all" || activeSubTab === "timeline") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Ruta Temporal</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-amber-400" />
              Cronograma Progresivo (Mes 1 al 24)
            </h3>
          </div>

          <div className="space-y-3">
            {timelineMilestones.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-400/40 transition-colors"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-300">{m.month}</span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${m.color}`}>
                      {m.tag}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-base">{m.title}</h4>
                  <p className="text-xs text-purple-200/75 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 2. LAS 12 ÁREAS DE ADMINISTRACIÓN */}
      {(activeSubTab === "all" || activeSubTab === "admin") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Gestión Empresarial</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-amber-400" />
              Las 12 Áreas de la Administración
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2 hover:border-amber-400/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-300">{area.num}</span>
                  </div>
                  <h4 className="font-bold text-white text-base mt-2">{area.title}</h4>
                  <p className="text-xs text-purple-200/75 leading-relaxed">{area.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* 3. LAS 10 ÁREAS DEL MARCO LEGAL */}
      {(activeSubTab === "all" || activeSubTab === "legal") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Seguridad Jurídica</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-indigo-400" />
              Las 10 Áreas del Derecho Empresarial
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {legalAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2 hover:border-indigo-400/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-300">{area.num}</span>
                  </div>
                  <h4 className="font-bold text-white text-base mt-2">{area.title}</h4>
                  <p className="text-xs text-purple-200/75 leading-relaxed">{area.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* 4. METODOLOGÍA DE APRENDIZAJE */}
      {(activeSubTab === "all" || activeSubTab === "metodologia") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Pedagogía Activa</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-emerald-400" />
              Metodología para Aprender y Retener
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategies.map((st, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                <h4 className="font-bold text-emerald-300 text-base">{st.title}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 5. CANALES YOUTUBE */}
      {(activeSubTab === "all" || activeSubTab === "youtube") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">Audiovisual de Calidad</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <YouTubeIcon className="w-6 h-6 text-red-500" />
              Canales Recomendados para Aprender Negocios y Leyes
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeChannels.map((ch, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                    {ch.badge}
                  </span>
                </div>
                <h4 className="font-bold text-white text-base">{ch.name}</h4>
                <p className="text-xs text-purple-200/75 leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 6. 8 TRUCOS & ATAJOS */}
      {(activeSubTab === "all" || activeSubTab === "trucos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Sabiduría Práctica</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-400" />
              8 Trucos &amp; Atajos que Pocos Comparten
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tricks.map((t, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-1.5">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">Truco {t.num}</span>
                <h4 className="font-bold text-white text-sm sm:text-base">{t.title}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 7. ERRORES COMUNES */}
      {(activeSubTab === "all" || activeSubTab === "errores") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Lecciones Preventivas</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-rose-400" />
              Errores Críticos a Evitar
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mistakes.map((m, i) => (
              <div key={i} className="p-5 rounded-2xl bg-rose-950/15 border border-rose-500/20 space-y-2">
                <h4 className="font-bold text-rose-200 text-sm">{m.err}</h4>
                <p className="text-xs text-purple-200/70"><strong>Causa:</strong> {m.reason}</p>
                <p className="text-xs text-emerald-300 font-medium"><strong>Solución:</strong> {m.fix}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 8. HABILIDADES & CHECKLIST */}
      {(activeSubTab === "all" || activeSubTab === "habilidades") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Metas &amp; Hitos</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-teal-400" />
              Checklist de Competencias Clave
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {checklistItems.map((item) => {
              const isChecked = !!completedTasks[item.id];
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
                    <span className="text-[10px] uppercase font-mono font-bold text-amber-300/80 block mb-0.5">
                      {item.stage}
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
