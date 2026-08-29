"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  Sparkles,
  Search,
  Mail,
  Share2,
  PenTool,
  BarChart3,
  Rocket,
  Palette,
  Bot,
  ShoppingCart,
  BookOpen,
  Wrench,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Square,
  Compass,
  Zap,
  Target,
  Workflow,
  ChevronDown,
  Award,
} from "lucide-react";

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function MarketingRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_marketing_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({ "mp1": true });

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_marketing_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const togglePhase = (id: string) => {
    setOpenPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "fases", label: "🗺️ 6 Fases (0 a Pro)", icon: Compass },
    { id: "areas", label: "🎯 12 Áreas en Detalle", icon: Target },
    { id: "estrategias", label: "🧠 9 Estrategias de Aprendizaje", icon: Lightbulb },
    { id: "herramientas", label: "🛠️ Stack de Herramientas", icon: Wrench },
    { id: "recursos", label: "📚 Libros & Certificaciones", icon: BookOpen },
    { id: "youtube", label: "▶️ Guía YouTube", icon: YouTubeIcon },
    { id: "errores", label: "⚠️ Errores a Evitar", icon: AlertTriangle },
    { id: "plan", label: "⚡ Plan de Acción & Tracker", icon: Zap },
  ];

  const phases = [
    {
      id: "mp1",
      num: "Fase 1",
      duration: "⏱ 1–2 meses",
      title: "Fundamentos del Marketing",
      color: "from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-300",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      desc: "Antes de aprender herramientas, necesitas entender para qué sirven. Esta fase te da el lenguaje y el pensamiento estratégico que todo lo demás necesita.",
      topics: [
        "¿Qué es el marketing real?",
        "Las 4Ps (Producto, Precio, Plaza, Promoción)",
        "Las 4Cs del consumidor",
        "Buyer Persona e ICP (Perfil de Cliente Ideal)",
        "Customer Journey Map",
        "Embudo de ventas (TOFU, MOFU, BOFU)",
        "Diferencia Marketing vs Publicidad",
        "Marketing B2B vs B2C",
        "Psicología del consumidor",
        "Propuesta Única de Valor (USP)",
        "Investigación de mercado básica",
        "KPIs fundamentales (CAC, LTV, ROAS)",
      ],
    },
    {
      id: "mp2",
      num: "Fase 2",
      duration: "⏱ 2–3 meses",
      title: "Marketing Digital Esencial",
      color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-300",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      desc: "El ecosistema digital completo. Aquí entiendes cómo se mueve la atención en internet y qué canales existen para llegar a tu audiencia.",
      topics: [
        "Ecosistema digital omnicanal",
        "SEO On-page y Off-page básico",
        "Google Ads (SEM y Búsqueda)",
        "Meta Ads (Facebook / Instagram)",
        "Email Marketing & Lead Magnets",
        "Marketing de Contenidos",
        "Redes sociales orgánicas y algoritmos",
        "Analytics básico (GA4)",
        "Landing Pages de alta conversión",
        "Píxeles, cookies y tracking",
        "A/B Testing de creatividades",
        "CRM y gestión de prospectos",
      ],
    },
    {
      id: "mp3",
      num: "Fase 3",
      duration: "⏱ 2–3 meses",
      title: "Contenido y Copywriting Persuasivo",
      color: "from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-300",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      desc: "El contenido es el motor del marketing moderno. Aprendes a escribir para vender, crear estrategias de contenido y comunicar con intención.",
      topics: [
        "Fundamentos de Copywriting",
        "Fórmulas AIDA, PAS, BAB, 4Us",
        "Storytelling de marca (StoryBrand)",
        "Escritura persuasiva y gatillos mentales",
        "Titulares que capturan clics",
        "Emails de venta y secuencias de bienvenida",
        "Llamadas a la acción (CTAs) de impacto",
        "Content Strategy y clusters temáticos",
        "Calendario editorial y flujo de trabajo",
        "Blog y redacción SEO",
        "Video Marketing (Reels, TikTok, YouTube)",
        "Podcasts y formatos de voz",
      ],
    },
    {
      id: "mp4",
      num: "Fase 4",
      duration: "⏱ 2–3 meses",
      title: "Datos, Analítica y Optimización (CRO)",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      desc: "El marketing sin datos es solo opinión. Aquí aprendes a leer números, tomar decisiones basadas en evidencia y optimizar continuamente.",
      topics: [
        "Google Analytics 4 (GA4)",
        "Google Search Console",
        "Métricas clave por canal (CTR, CPC, CPM)",
        "ROAS, CAC, LTV, CPL y Margen",
        "Modelos de atribución de conversiones",
        "Dashboards en Looker Studio",
        "Experimentos de CRO (Conversion Rate)",
        "Heatmaps y grabaciones (Hotjar/Clarity)",
        "Parámetros UTM y tracking URLs",
        "Análisis de cohortes y retención",
        "Excel y Google Sheets para marketers",
      ],
    },
    {
      id: "mp5",
      num: "Fase 5",
      duration: "⏱ 2–3 meses",
      title: "Estrategia de Marca & Growth Hacking",
      color: "from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-300",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      desc: "Cuando ya dominas los canales, aprendes a unirlos bajo una estrategia coherente. Piensas como Director de Marketing (CMO).",
      topics: [
        "Branding y Brand Identity",
        "Posicionamiento estratégico en la mente",
        "Go-To-Market (GTM) Strategy",
        "Estrategia Omnicanal integrada",
        "Growth Hacking & Framework AARRR",
        "Product-Led Growth (PLG)",
        "Inbound vs Outbound marketing",
        "Marketing de Retención y Fidelización",
        "Construcción de comunidad y loyalty",
        "Alineación de Marketing con Ventas",
        "Presupuesto y Plan de Marketing Anual",
      ],
    },
    {
      id: "mp6",
      num: "Fase 6",
      duration: "⏱ Continuo",
      title: "Especialización, Portafolio & Casos Reales",
      color: "from-pink-500/20 to-purple-500/10 border-pink-500/40 text-pink-300",
      badge: "bg-pink-500/20 text-pink-300 border-pink-500/30",
      desc: "Eliges 1–2 áreas donde ser realmente excelente. Construyes casos reales, proyectos propios o para otros y destacas con evidencia.",
      topics: [
        "Elige tu especialidad (SEO, Ads, Copy, etc.)",
        "Proyectos reales propios ('Proyecto Cobaya')",
        "Freelancing inicial y primeros clientes",
        "Portafolio basado en métricas y resultados",
        "Marca personal en LinkedIn y redes",
        "Networking estratégico en la industria",
        "Certificaciones oficiales Google/Meta/HubSpot",
        "Mantenerse actualizado con IA y tendencias",
      ],
    },
  ];

  const deepDiveAreas = [
    {
      icon: Search,
      title: "SEO (Posicionamiento Orgánico)",
      desc: "El arte de aparecer en los primeros resultados de Google sin pagar por clic. El canal con mayor ROI a largo plazo.",
      color: "text-blue-400",
      items: [
        "Keyword Research con volumen e intención de búsqueda",
        "SEO On-page: títulos, metas, estructura H1-H6 y URLs",
        "SEO técnico: velocidad de carga, sitemaps e indexación",
        "Link Building y autoridad de dominio (Backlinks)",
        "SEO Local para negocios con ubicación física",
        "Herramientas: Google Search Console, Ahrefs, SEMrush",
      ],
    },
    {
      icon: Megaphone,
      title: "Publicidad de Pago (PPC & Ads)",
      desc: "Resultados inmediatos comprando visibilidad en plataformas clave. Requiere gestionar presupuesto y optimizar retorno.",
      color: "text-purple-400",
      items: [
        "Google Ads: Search, Display, Shopping y YouTube Ads",
        "Meta Ads: segmentación, creativos y optimización de eventos",
        "TikTok Ads y formatos de contenido nativo viral",
        "Retargeting y audiencias personalizadas (Lookalikes)",
        "Estructura de campañas, Ad Sets y anuncios dinámicos",
        "Métricas esenciales: ROAS, CPA, CTR, Quality Score",
      ],
    },
    {
      icon: Mail,
      title: "Email Marketing & Automatización",
      desc: "El canal con mayor tasa de retorno (ROI) del marketing digital. Una lista propia de suscriptores vale oro.",
      color: "text-emerald-400",
      items: [
        "Construcción de lista con Lead Magnets de alto valor",
        "Segmentación avanzada por comportamiento y compras",
        "Secuencias automáticas de bienvenida y nutrición de leads",
        "Emails de venta directa, lanzamientos y promociones",
        "Métricas: Open Rate, Click Rate, Deliverability",
        "Herramientas: Klaviyo, ActiveCampaign, Mailchimp",
      ],
    },
    {
      icon: Share2,
      title: "Redes Sociales & Comunidad",
      desc: "Más que publicar fotos bonitas: crear comunidad, generar confianza y convertir seguidores en embajadores.",
      color: "text-pink-400",
      items: [
        "Estrategia diferenciada para IG, TikTok, LinkedIn y X",
        "Cómo funcionan los algoritmos de recomendación",
        "Formatos de alto alcance: Reels, Carruseles y Shorts",
        "Community Management y atención empática",
        "User Generated Content (UGC) y marketing de creadores",
        "Medición: engagement rate, alcance y tráfico derivado",
      ],
    },
    {
      icon: PenTool,
      title: "Copywriting Persuasivo",
      desc: "La habilidad de escribir palabras que provocan acción y ventas. La habilidad más transversal y valiosa de todo el marketing.",
      color: "text-amber-400",
      items: [
        "Fórmulas probadas: AIDA, PAS (Problema, Agitación, Solución)",
        "Investigación de la 'voz del cliente' (Customer Voice)",
        "Copy para anuncios cortos de alto impacto",
        "Páginas de aterrizaje (Landing Pages) que convierten",
        "Manejo de objeciones y prueba social (Testimonios)",
        "Redacción de llamadas a la acción irresistibles",
      ],
    },
    {
      icon: BarChart3,
      title: "Analítica & Datos (GA4)",
      desc: "Sin datos, el marketing es solo intuición. Aprender a interpretar métricas te separa del 80% de los profesionales.",
      color: "text-cyan-400",
      items: [
        "Configuración de Google Analytics 4 y eventos clave",
        "Definición de objetivos, conversiones y embudos",
        "Modelos de atribución: primer clic, último clic, multitoque",
        "Optimización de Tasa de Conversión (CRO)",
        "Mapas de calor y grabaciones con Clarity o Hotjar",
        "Construcción de tableros ejecutivos en Looker Studio",
      ],
    },
    {
      icon: Rocket,
      title: "Growth Hacking & Experimentos",
      desc: "Mentalidad de crecimiento rápido mediante pruebas continuas que combinan producto, marketing y datos.",
      color: "text-red-400",
      items: [
        "Framework Pirata AARRR (Adquisición, Activación, Retención, Referido, Ingreso)",
        "Bucles virales (Viral Loops) y sistemas de referidos",
        "Product-Led Growth (el producto como motor de ventas)",
        "Optimización del proceso de bienvenida (Onboarding)",
        "Definición de la Métrica Estrella Norte (North Star Metric)",
        "Casos de estudio históricos: Dropbox, Airbnb, Hotmail",
      ],
    },
    {
      icon: Palette,
      title: "Branding & Posicionamiento",
      desc: "Lo que la gente siente y dice cuando escucha el nombre de tu marca. La base intangible que permite cobrar más.",
      color: "text-indigo-400",
      items: [
        "Identidad, valores, misión y visión auténtica",
        "Voz y tono de marca (Brand Voice)",
        "Posicionamiento competitivo frente a la industria",
        "Arquetipos de marca y resonancia emocional",
        "Naming, eslóganes y manual de identidad",
        "Cómo medir la notoriedad y lealtad de marca",
      ],
    },
    {
      icon: Bot,
      title: "Marketing Impulsado por IA",
      desc: "La IA no reemplaza a los marketers, pero los marketers que dominan la IA reemplazan a los que no la usan.",
      color: "text-teal-400",
      items: [
        "Ingeniería de prompts avanzada para redactores y estrategas",
        "Generación y refinamiento de copys con ChatGPT / Claude",
        "Creación de activos visuales con herramientas generativas",
        "Automatización de flujos de trabajo con IA",
        "Análisis predictivo y personalización a escala",
        "Chatbots de atención y calificación de prospectos",
      ],
    },
    {
      icon: Workflow,
      title: "Automatización & CRM",
      desc: "Hacer que los sistemas trabajen mientras duermes: nutrición de prospectos y conversión en piloto automático.",
      color: "text-orange-400",
      items: [
        "Qué es un CRM y cómo estructura el ciclo comercial",
        "Primeros pasos en HubSpot CRM gratuito",
        "Flujos automatizados y puntuación de leads (Lead Scoring)",
        "Automatizaciones en WhatsApp Business",
        "Conexión de herramientas sin código mediante Zapier / Make",
        "Segmentación dinámica basada en acciones de usuarios",
      ],
    },
    {
      icon: ShoppingCart,
      title: "eCommerce Marketing",
      desc: "Estrategias específicas para tiendas online con ciclos de compra rápidos, catálogos amplios y carritos abandonados.",
      color: "text-rose-400",
      items: [
        "Optimización de fichas de producto para conversión",
        "Marketing para Shopify y WooCommerce",
        "Campañas de Google Shopping y Performance Max",
        "Recuperación automatizada de carritos abandonados",
        "Tácticas de Upsell, Cross-sell y paquetes (Bundles)",
        "Reseñas verificadas y prueba social visual",
      ],
    },
    {
      icon: BookOpen,
      title: "Marketing de Contenidos (Inbound)",
      desc: "Crear valor gratuito que atrae, educa y genera confianza antes de pedir la venta.",
      color: "text-yellow-400",
      items: [
        "Pilares de contenido y grupos temáticos (Topic Clusters)",
        "Estrategia de reciclaje de contenidos (Repurposing)",
        "Newsletters editoriales con audiencia cautiva",
        "Creación de plantillas, guías y recursos descargables",
        "Distribución multicanal estratégica",
        "Métricas de consumo y retención de contenido",
      ],
    },
  ];

  const strategies = [
    {
      num: "01",
      title: "El Método del 'Proyecto Cobaya'",
      desc: "Crea un proyecto ficticio o real desde el mes 2 (un blog, una marca de café, una tienda demo). Aplica CADA cosa que aprendas en ese laboratorio. Sin proyecto real, el conocimiento se desvanece.",
    },
    {
      num: "02",
      title: "El 'Swipe File' del Marketer",
      desc: "Guarda capturas de anuncios, emails, titulares y landing pages que te impacten. Analiza POR QUÉ funcionan: qué gatillo psicológico usan, qué llamada a la acción tienen. Vale más que 10 cursos.",
    },
    {
      num: "03",
      title: "Aprende del Gasto Ajeno",
      desc: "La Biblioteca de Anuncios de Meta es 100% pública y gratuita. Busca las marcas líderes y mira qué anuncios llevan meses activos: si llevan mucho tiempo corriendo, es porque son rentables.",
    },
    {
      num: "04",
      title: "El Sprint de 30 Días",
      desc: "Elige UN solo canal (ej. SEO o Email). Dedícale 30 días intensivos con 1h de estudio y práctica diaria. Al mes sabrás más que el 70% de personas en ese tema antes de saltar al siguiente.",
    },
    {
      num: "05",
      title: "Trabajar Gratis Estratégicamente",
      desc: "Ofrece optimizar las redes o anuncios de un negocio local amigo durante 60 días. Ganas experiencia real en el barro, datos auténticos para tu portafolio y testimonios que valen oro.",
    },
    {
      num: "06",
      title: "Enseñar para Aprender (Técnica Feynman)",
      desc: "Explica lo que acabas de aprender en un post de LinkedIn, un hilo o a un amigo. El acto de sintetizar te obliga a comprender a fondo y construye tu marca personal desde el día 1.",
    },
    {
      num: "07",
      title: "Ingeniería Inversa de Marcas que Amas",
      desc: "Elige 3 marcas que admires. Desglosa su embudo completo: ¿cómo atraen visitas?, ¿qué lead magnet ofrecen?, ¿cómo redactan sus emails? Aprenderás estrategia real de los mejores.",
    },
    {
      num: "08",
      title: "Certificaciones Oficiales como Marco",
      desc: "Las certificaciones gratuitas de Google, Meta y HubSpot estructuran tu aprendizaje y decoran tu CV. Pero recuerda: lo que te contrata es lo que sabes hacer con las manos.",
    },
    {
      num: "09",
      title: "Regla 'Ya lo Vi, Ahora lo Aplico'",
      desc: "¿Viste un video de Google Ads? Abre el simulador y crea una campaña ficticia. ¿Aprendiste una secuencia de emails? Escribe 3 correos hoy mismo. La acción inmediata fija el conocimiento.",
    },
  ];

  const toolsStack = [
    { name: "Google Search Console", cat: "SEO", price: "Gratis", desc: "Monitorea cómo Google ve, indexa y posiciona tus páginas web." },
    { name: "Ahrefs / SEMrush", cat: "SEO", price: "De Pago", desc: "Las herramientas líderes en análisis de palabras clave y competencia." },
    { name: "Google Analytics 4", cat: "Analítica", price: "Gratis", desc: "El estándar mundial para medir el tráfico y las conversiones web." },
    { name: "Looker Studio", cat: "Dashboards", price: "Gratis", desc: "Crea tableros visuales conectando GA4, Google Sheets y anuncios." },
    { name: "Microsoft Clarity", cat: "CRO", price: "Gratis", desc: "Mapas de calor y grabaciones de sesión de usuarios sin costo alguno." },
    { name: "Klaviyo / Mailchimp", cat: "Email", price: "Freemium", desc: "Plataformas excelentes para diseñar y automatizar email marketing." },
    { name: "Meta Ads Manager", cat: "Publicidad", price: "Gratis acceso", desc: "Plataforma oficial para configurar campañas en Instagram y Facebook." },
    { name: "Canva", cat: "Diseño", price: "Freemium", desc: "El estándar para crear creatividades visuales atractivas sin ser diseñador." },
    { name: "HubSpot CRM", cat: "CRM", price: "Gratis", desc: "El mejor CRM gratuito para aprender gestión de prospectos y ventas." },
    { name: "Zapier / Make", cat: "Automatización", price: "Freemium", desc: "Conecta cientos de aplicaciones y automatiza tareas repetitivas." },
    { name: "ChatGPT / Claude", cat: "IA", price: "Freemium", desc: "Generación de ideas, copys, lluvia de ideas y análisis de métricas." },
    { name: "Carrd / Webflow", cat: "Landing Pages", price: "Freemium", desc: "Construye páginas de captura de prospectos rápidas sin programar." },
  ];

  const books = [
    { title: "Influence: The Psychology of Persuasion", author: "Robert Cialdini", tag: "Lectura Suprema", desc: "Los 6 principios de la persuasión humana (reciprocidad, escasez, autoridad, etc.). El libro más citado en marketing." },
    { title: "Esto es Marketing", author: "Seth Godin", tag: "Mentalidad", desc: "Una visión humana del marketing moderno: cómo generar confianza, servir a una tribu y crear cambio positivo." },
    { title: "$100M Offers", author: "Alex Hormozi", tag: "Ofertas Irresistibles", desc: "Cómo crear propuestas de valor tan atractivas que la gente se sienta tonta al rechazarlas. Práctico y directo." },
    { title: "Building a StoryBrand", author: "Donald Miller", tag: "Claridad de Marca", desc: "El framework definitivo para convertir al cliente en el héroe de la historia y a tu marca en el guía sabio." },
    { title: "Hacking Growth", author: "Sean Ellis & Morgan Brown", tag: "Growth Hacking", desc: "El manual con la metodología de crecimiento acelerado utilizada por Dropbox, Airbnb y Facebook." },
    { title: "The Copywriter's Handbook", author: "Robert Bly", tag: "Copywriting Técnico", desc: "La guía paso a paso para redactar textos comerciales que venden en cualquier medio y formato." },
  ];

  const certifications = [
    { name: "Google Skillshop", cert: "Google Ads & Analytics", cost: "100% Gratis", desc: "Certificaciones oficiales de Google reconocidas mundialmente." },
    { name: "HubSpot Academy", cert: "Inbound Marketing & Email", cost: "100% Gratis", desc: "Cursos de altísima calidad con exámenes prácticos y diploma." },
    { name: "Meta Blueprint", cert: "Meta Ads & Digital Marketing", cost: "Gratis estudio", desc: "Cursos oficiales para dominar el ecosistema publicitario de Meta." },
    { name: "Semrush Academy", cert: "SEO & Content Marketing", cost: "100% Gratis", desc: "Entrenamiento directo de los desarrolladores de la herramienta líder de SEO." },
  ];

  const youtubeSpanish = [
    { name: "Vilma Núñez", focus: "Estrategia digital, redes, branding y ventas en español." },
    { name: "Dean Romero", focus: "El canal de referencia en SEO técnico, micronichos y monetización." },
    { name: "Álvaro Gestión & Marketing", focus: "Marketing estratégico, copywriting y modelos de negocio online." },
    { name: "Romuald Fons", focus: "SEO práctico, YouTube marketing y monetización de sitios web." },
    { name: "Nico Mendoza", focus: "Meta Ads práctico y campañas de tráfico pago para Latinoamérica." },
  ];

  const youtubeEnglish = [
    { name: "Ahrefs (Official)", focus: "El mejor canal de SEO del mundo. Basado 100% en datos y sin humo." },
    { name: "HubSpot Marketing", focus: "Inbound marketing, estrategias de email, CRM y ventas." },
    { name: "Alex Hormozi", focus: "Ofertas irresistibles, adquisición de clientes y growth empresarial." },
    { name: "Social Media Examiner", focus: "Tendencias actualizadas de algoritmos en todas las redes sociales." },
    { name: "Exposure Ninja", focus: "Auditorías de páginas web y embudos reales en vivo." },
  ];

  const commonMistakes = [
    { title: "Parálisis por Análisis", desc: "Coleccionar cursos y videos sin lanzar un solo proyecto. 10 cursos sin práctica = cero avance." },
    { title: "Aprender todo a la vez", desc: "Querer dominar SEO + Meta Ads + TikTok + Copywriting la misma semana. Domina un canal primero." },
    { title: "Seguir a 'Gurús de Humo'", desc: "Muchos venden el sueño del enriquecimiento fácil. Sigue a profesionales con casos y clientes demostrables." },
    { title: "No medir métricas", desc: "Publicar contenido o anuncios sin mirar datos. Lo que no se mide no se puede mejorar." },
    { title: "Esperar resultados inmediatos", desc: "El SEO toma 3–6 meses, el email requiere construir lista. El marketing es una maratón de consistencia." },
    { title: "Hablar de ti y no del cliente", desc: "Al cliente no le importa tu producto, le importa resolver su problema. Habla de su dolor y su beneficio." },
    { title: "Obsesión con el diseño antes del copy", desc: "Un anuncio con diseño regular y copy brillante vende. Un diseño hermoso con mensaje vacío fracasa." },
    { title: "Gastar en herramientas caras desde el día 1", desc: "Empieza con herramientas gratuitas (Search Console, GA4, Canva gratis). Las de pago se pagan con ganancias." },
  ];

  const actionChecklist = [
    { id: "mkt_book_godin", label: "Leer 'Esto es Marketing' de Seth Godin o 'Influence' de Cialdini", stage: "Semana 1" },
    { id: "mkt_hubspot_account", label: "Crear cuenta gratuita en HubSpot Academy y empezar curso de Inbound", stage: "Semana 1" },
    { id: "mkt_guinea_pig", label: "Definir tu 'Proyecto Cobaya' (un blog, marca personal o tienda demo)", stage: "Mes 1" },
    { id: "mkt_meta_library", label: "Explorar la Biblioteca de Anuncios de Meta y guardar 5 anuncios exitosos", stage: "Mes 1" },
    { id: "mkt_first_copy", label: "Redactar una página de captura (Landing Page) con fórmula AIDA", stage: "Mes 2" },
    { id: "mkt_ga4_setup", label: "Instalar Google Analytics 4 y Search Console en tu proyecto", stage: "Mes 2" },
    { id: "mkt_email_sequence", label: "Escribir una secuencia de 3 emails de bienvenida automatizados", stage: "Mes 3" },
    { id: "mkt_google_cert", label: "Completar la certificación oficial de Google Ads o HubSpot", stage: "Mes 3" },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-purple-950/40 via-cyan-950/20 to-pink-950/30 backdrop-blur-xl border border-purple-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Megaphone className="w-3.5 h-3.5 text-purple-400" />
            Road Map Completo · De Cero a Estratega
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Aprende </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-300 via-cyan-300 to-pink-300">
              Marketing Digital
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            Una ruta clara, práctica y honesta para convertirte en marketero sin rodeos ni cursos de gurús inflados.
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-xl p-4 rounded-2xl bg-white/5 border border-purple-500/20 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-300 block">6</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Fases</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 block">12+</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Áreas</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-pink-300 block">50+</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Recursos</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 block">12m</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Ruta</span>
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
                  ? "bg-purple-600/90 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-102 font-semibold"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. LAS 6 FASES DEL ROADMAP */}
      {(activeSubTab === "all" || activeSubTab === "fases") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Ruta por Capas</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-purple-400" />
              Las 6 Fases de Aprendizaje
            </h3>
            <p className="text-purple-200/70 text-sm">
              El marketing se aprende en capas: construye base estratégica antes de especializarte en herramientas.
            </p>
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-2">
                          {p.topics.map((t, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-xl bg-black/25 border border-white/10 text-xs text-purple-100 font-medium flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                              <span className="truncate">{t}</span>
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

      {/* 2. LAS 12 ÁREAS EN DETALLE */}
      {(activeSubTab === "all" || activeSubTab === "areas") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Especialidades</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Target className="w-6 h-6 text-cyan-400" />
              12 Áreas del Marketing Desglosadas
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deepDiveAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md space-y-3 hover:border-cyan-400/40 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-white/10">
                        <Icon className={`w-5 h-5 ${area.color}`} />
                      </div>
                      <h4 className="font-bold text-white text-sm sm:text-base">{area.title}</h4>
                    </div>
                    <p className="text-xs text-purple-200/75 leading-relaxed">{area.desc}</p>
                  </div>

                  <ul className="space-y-1 pt-3 border-t border-white/5 text-xs text-purple-100/90">
                    {area.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 shrink-0">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* 3. 9 ESTRATEGIAS DE APRENDIZAJE */}
      {(activeSubTab === "all" || activeSubTab === "estrategias") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Metodología de Estudio</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-amber-400" />
              9 Estrategias para Aprender de Verdad
            </h3>
            <p className="text-purple-200/70 text-sm">
              La regla 70-20-10: 70% haciendo proyectos reales, 20% aprendiendo de otros, 10% teoría.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {strategies.map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2 hover:border-amber-400/40 transition-colors"
              >
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">Estrategia {st.num}</span>
                <h4 className="font-bold text-white text-base">{st.title}</h4>
                <p className="text-xs text-purple-200/75 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 4. STACK DE HERRAMIENTAS */}
      {(activeSubTab === "all" || activeSubTab === "herramientas") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Toolkit Profesional</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Wrench className="w-6 h-6 text-teal-400" />
              Stack de Herramientas Esenciales
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {toolsStack.map((tool, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-1.5 hover:border-teal-400/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-teal-500/20 text-teal-300">
                    {tool.cat}
                  </span>
                  <span className="text-[10px] font-mono text-purple-300 font-semibold">{tool.price}</span>
                </div>
                <h4 className="font-bold text-white text-sm">{tool.name}</h4>
                <p className="text-xs text-purple-200/70 leading-snug">{tool.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 5. LIBROS & CERTIFICACIONES */}
      {(activeSubTab === "all" || activeSubTab === "recursos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Biblioteca Imprescindible</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-pink-400" />
                Libros Fundacionales de Marketing
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.map((b, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md flex flex-col justify-between space-y-2 hover:border-pink-400/40 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      {b.tag}
                    </span>
                    <h4 className="font-bold text-white text-base mt-2 mb-0.5">{b.title}</h4>
                    <span className="text-xs text-purple-300/80 font-medium block mb-2">{b.author}</span>
                    <p className="text-xs text-purple-200/75 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Credibilidad Oficial</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                Plataformas con Certificaciones Gratuitas
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {certifications.map((c, i) => (
                <div key={i} className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 backdrop-blur-md space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase">{c.cost}</span>
                  <h4 className="font-bold text-white text-sm">{c.name}</h4>
                  <span className="text-xs text-emerald-200/80 block font-medium">{c.cert}</span>
                  <p className="text-xs text-purple-200/70 leading-snug">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* 6. GUÍA YOUTUBE */}
      {(activeSubTab === "all" || activeSubTab === "youtube") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">¿Se puede aprender por YouTube?</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <YouTubeIcon className="w-6 h-6 text-red-500" />
              YouTube como Aliado de Aprendizaje
            </h3>
          </div>

          <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Qué SÍ aprenderás bien en YouTube:
                </h5>
                <ul className="space-y-1 text-xs text-purple-200/85">
                  <li>· Tutoriales paso a paso de Google Ads y Meta Ads</li>
                  <li>· Configuración técnica de Google Analytics 4</li>
                  <li>· Casos de estudio y novedades de algoritmos</li>
                  <li>· Manejo de herramientas prácticas (Canva, Notion, CRM)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-bold text-rose-300 text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Qué NO aprenderás solo con YouTube:
                </h5>
                <ul className="space-y-1 text-xs text-purple-200/85">
                  <li>· Pensamiento estratégico y visión de negocio profunda</li>
                  <li>· Orden secuencial (es fácil perderse en videos sueltos)</li>
                  <li>· Feedback real sobre tus propios anuncios y textos</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-purple-100/90 pt-3 border-t border-white/10 leading-relaxed">
              💡 <strong>Veredicto:</strong> Usa libros o cursos estructurados para los fundamentos estratégicos, y usa YouTube para dominar el &ldquo;cómo se hace&rdquo; de cada herramienta específica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-3">
              <h5 className="font-bold text-white text-sm">📺 Canales en Español</h5>
              <div className="space-y-2">
                {youtubeSpanish.map((ch, i) => (
                  <div key={i} className="text-xs">
                    <strong className="text-purple-200 block">{ch.name}</strong>
                    <span className="text-purple-200/70">{ch.focus}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-3">
              <h5 className="font-bold text-white text-sm">📺 Canales en Inglés (Top Mundial)</h5>
              <div className="space-y-2">
                {youtubeEnglish.map((ch, i) => (
                  <div key={i} className="text-xs">
                    <strong className="text-purple-200 block">{ch.name}</strong>
                    <span className="text-purple-200/70">{ch.focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* 7. ERRORES A EVITAR */}
      {(activeSubTab === "all" || activeSubTab === "errores") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Lecciones Preventivas</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-rose-400" />
              Los Errores Más Comunes al Iniciar
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {commonMistakes.map((err, i) => (
              <div key={i} className="p-5 rounded-2xl bg-rose-950/15 border border-rose-500/20 backdrop-blur-md space-y-2">
                <h4 className="font-bold text-rose-200 text-sm">{err.title}</h4>
                <p className="text-xs text-purple-200/75 leading-relaxed">{err.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 8. PLAN DE ACCIÓN & CHECKLIST */}
      {(activeSubTab === "all" || activeSubTab === "plan") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Paso a Paso</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-emerald-400" />
              Tu Plan de Acción Inmediato
            </h3>
            <p className="text-purple-200/70 text-sm">Toca cada tarea cuando la completes para registrar tu progreso.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {actionChecklist.map((task) => {
              const isChecked = !!completedTasks[task.id];
              return (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
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
                      {task.stage}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                        isChecked ? "text-emerald-200 line-through opacity-80" : "text-white"
                      }`}
                    >
                      {task.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-linear-to-r from-purple-950/40 via-cyan-950/30 to-emerald-950/40 border border-purple-400/30 text-center space-y-2">
            <span className="text-xl sm:text-2xl font-bold text-purple-200 block">
              ⏱ ¿Cuánto tiempo necesitas?
            </span>
            <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mx-auto leading-relaxed">
              <strong>1h al día</strong> = Fundamentos sólidos en 12–18 meses.<br />
              <strong>2h al día</strong> = Nivel junior operativo en 8–12 meses.<br />
              Recuerda: <span className="text-cyan-300 font-bold">la constancia amable siempre le gana a la intensidad desmedida.</span>
            </p>
          </div>
        </motion.section>
      )}
    </div>
  );
}
