"use client";

import { useState, useMemo } from "react";
import {
  Compass,
  Building2,
  Sparkles,
  BookOpen,
  AlertOctagon,
  Trophy,
  BookMarked,
  CheckSquare,
  Square,
  Search,
  ExternalLink,
  Lightbulb,
  CheckCircle2,
  Info,
  AlertTriangle,
  Clock,
  Video,
  Landmark,
  HardHat,
  Briefcase,
} from "lucide-react";

interface ResItem {
  ico: string;
  text: string;
  html?: string | null;
  link?: string | null;
}

interface ResSection {
  title: string;
  items: ResItem[];
}

interface TipBlock {
  title: string;
  items: { ico: string; text: string }[];
}

interface CalloutItem {
  type: string;
  text: string;
  html?: string | null;
}

interface TimelineItem {
  period: string;
  text: string;
}

interface PhaseCard {
  icon: string;
  tags: string[];
  title: string;
  subtitle: string;
  res_sections: ResSection[];
  tips?: TipBlock | null;
  callouts: CalloutItem[];
  timeline: TimelineItem[];
}

interface PhaseSectionData {
  id: string;
  phase_num: string;
  title: string;
  subtitle: string;
  badgeColor?: string;
  accentColor?: string;
  cards: PhaseCard[];
}

const SECTIONS_DATA: PhaseSectionData[] = [
  {
    "id": "fase0",
    "phase_num": "Fase 0",
    "title": "Fundamentos y mentalidad",
    "subtitle": "Antes de tocar software, construye la base intelectual y manual que sostiene todo lo demás.",
    "cards": [
      {
        "icon": "🧱",
        "tags": [
          "Inicio",
          "YouTube"
        ],
        "title": "¿Qué estudia la arquitectura?",
        "subtitle": "Historia del arte, teoría del espacio, geometría, escala humana, dibujo.",
        "res_sections": [
          {
            "title": "▶ Canales de YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Arquisemana — Historia y cultura arquitectónica en español, muy didáctico.",
                "html": "<strong>Arquisemana</strong> — Historia y cultura arquitectónica en español, muy didáctico.",
                "link": null
              },
              {
                "ico": "🇪🇸",
                "text": "ArquiTerrazas — Análisis de proyectos y conceptos básicos para principiantes.",
                "html": "<strong>ArquiTerrazas</strong> — Análisis de proyectos y conceptos básicos para principiantes.",
                "link": null
              },
              {
                "ico": "🇬🇧",
                "text": "Architecture School (EN) — Explica qué hace un arquitecto en el día a día. Tiene subtítulos.",
                "html": "<strong>Architecture School</strong> (EN) — Explica qué hace un arquitecto en el día a día. Tiene subtítulos.",
                "link": null
              },
              {
                "ico": "🇬🇧",
                "text": "The B1M (EN) — Documentales de arquitectura modernos con visualizaciones excelentes.",
                "html": "<strong>The B1M</strong> (EN) — Documentales de arquitectura modernos con visualizaciones excelentes.",
                "link": null
              }
            ]
          },
          {
            "title": "📖 Lectura esencial",
            "items": [
              {
                "ico": "📘",
                "text": "\"La arquitectura como espacio\" de Bruno Zevi — Lectura corta e imprescindible. Explica qué es el espacio en arquitectura.",
                "html": "<strong>\"La arquitectura como espacio\"</strong> de Bruno Zevi — Lectura corta e imprescindible. Explica qué es el espacio en arquitectura.",
                "link": null
              },
              {
                "ico": "📘",
                "text": "\"Complejidad y contradicción en arquitectura\" de Robert Venturi — Para cuando tengas base.",
                "html": "<strong>\"Complejidad y contradicción en arquitectura\"</strong> de Robert Venturi — Para cuando tengas base.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "✏️",
        "tags": [
          "Práctica diaria",
          "Imprescindible"
        ],
        "title": "Dibujo técnico a mano",
        "subtitle": "Líneas, vistas ortogonales (planta, alzado, sección), escala, achurado, convenciones.",
        "res_sections": [
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Busca \"Dibujo técnico arquitectónico desde cero\" — hay varias series completas en español muy bien explicadas.",
                "html": "Busca <strong>\"Dibujo técnico arquitectónico desde cero\"</strong> — hay varias series completas en español muy bien explicadas.",
                "link": null
              },
              {
                "ico": "🇪🇸",
                "text": "Tutoriales Dibujo Técnico — canal dedicado con ejercicios progresivos.",
                "html": "<strong>Tutoriales Dibujo Técnico</strong> — canal dedicado con ejercicios progresivos.",
                "link": null
              }
            ]
          },
          {
            "title": "📖 El libro fundamental",
            "items": [
              {
                "ico": "📘",
                "text": "\"Manual de dibujo arquitectónico\" de Francis D.K. Ching — La referencia absoluta. Ilustraciones únicas que ningún video puede reemplazar. Consíguelo.",
                "html": "<strong>\"Manual de dibujo arquitectónico\"</strong> de Francis D.K. Ching — La referencia absoluta. Ilustraciones únicas que ningún video puede reemplazar. Consíguelo.",
                "link": null
              }
            ]
          },
          {
            "title": "🛒 Material mínimo",
            "items": [
              {
                "ico": "📐",
                "text": "Escuadra 30/60° y cartabón 45°",
                "html": "Escuadra 30/60° y cartabón 45°",
                "link": null
              },
              {
                "ico": "✏️",
                "text": "Portaminas 0.5 mm y 0.3 mm (no lápiz HB normal)",
                "html": "Portaminas 0.5 mm y 0.3 mm (no lápiz HB normal)",
                "link": null
              },
              {
                "ico": "📄",
                "text": "Papel A3 bond o milimetrado para los primeros ejercicios",
                "html": "Papel A3 bond o milimetrado para los primeros ejercicios",
                "link": null
              },
              {
                "ico": "📏",
                "text": "Escalímetro 1:50, 1:100, 1:200 — fundamental",
                "html": "Escalímetro 1:50, 1:100, 1:200 — fundamental",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "📐",
        "tags": [
          "Técnico"
        ],
        "title": "Geometría descriptiva",
        "subtitle": "Proyecciones ortogonales, vistas en planta y alzado, perspectiva cónica e isométrica.",
        "res_sections": [
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Busca \"Geometría descriptiva\" en el canal Tutoriales Dibujo Técnico — series completas en español.",
                "html": "Busca <strong>\"Geometría descriptiva\"</strong> en el canal <strong>Tutoriales Dibujo Técnico</strong> — series completas en español.",
                "link": null
              },
              {
                "ico": "🇪🇸",
                "text": "Canal de la UNAM en YouTube — clases universitarias completas y gratuitas de geometría descriptiva.",
                "html": "Canal de la <strong>UNAM en YouTube</strong> — clases universitarias completas y gratuitas de geometría descriptiva.",
                "link": null
              }
            ]
          },
          {
            "title": "📖 Libro de referencia",
            "items": [
              {
                "ico": "📘",
                "text": "\"Geometría Descriptiva\" de Izquierdo Asensi — El clásico en universidades latinoamericanas. Exhaustivo.",
                "html": "<strong>\"Geometría Descriptiva\"</strong> de Izquierdo Asensi — El clásico en universidades latinoamericanas. Exhaustivo.",
                "link": null
              }
            ]
          }
        ],
        "tips": {
          "title": "💡 Trucos",
          "items": [
            {
              "ico": "→",
              "text": "Toma objetos cotidianos (un vaso, una silla, una caja) y dibújalos en las tres vistas: planta, alzado y perfil."
            },
            {
              "ico": "→",
              "text": "La geometría descriptiva es la lógica detrás del CAD — quien la domina a mano usa el software mucho mejor."
            }
          ]
        },
        "callouts": [
          {
            "type": "callout-info",
            "text": "Por qué importa: Esta es la base del pensamiento tridimensional. Sin entender cómo representar el espacio en papel, el software 3D se vuelve confuso.",
            "html": "<strong>Por qué importa:</strong> Esta es la base del pensamiento tridimensional. Sin entender cómo representar el espacio en papel, el software 3D se vuelve confuso."
          }
        ],
        "timeline": []
      },
      {
        "icon": "🎨",
        "tags": [
          "YouTube",
          "Cultura"
        ],
        "title": "Historia de la arquitectura",
        "subtitle": "Antigüedad, Grecia y Roma, Gótico, Renacimiento, Barroco, Modernismo, Contemporánea.",
        "res_sections": [
          {
            "title": "▶ Canales gratuitos",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Arquisemana — Episodios temáticos de historia en español, muy entretenidos.",
                "html": "<strong>Arquisemana</strong> — Episodios temáticos de historia en español, muy entretenidos.",
                "link": null
              },
              {
                "ico": "🇪🇸",
                "text": "Canal UNAM — Clases completas de historia del arte y arquitectura, completamente gratuitas.",
                "html": "<strong>Canal UNAM</strong> — Clases completas de historia del arte y arquitectura, completamente gratuitas.",
                "link": null
              },
              {
                "ico": "🇬🇧",
                "text": "ArchDaily YouTube — Proyectos contemporáneos con análisis, subtítulos en español disponibles.",
                "html": "<strong>ArchDaily YouTube</strong> — Proyectos contemporáneos con análisis, subtítulos en español disponibles.",
                "link": null
              },
              {
                "ico": "🇬🇧",
                "text": "The B1M — Documentales de alta producción sobre arquitectura moderna e histórica.",
                "html": "<strong>The B1M</strong> — Documentales de alta producción sobre arquitectura moderna e histórica.",
                "link": null
              }
            ]
          },
          {
            "title": "📖 Libros",
            "items": [
              {
                "ico": "📘",
                "text": "\"Historia de la Arquitectura Occidental\" de Sigfried Giedion — referencia académica estándar.",
                "html": "<strong>\"Historia de la Arquitectura Occidental\"</strong> de Sigfried Giedion — referencia académica estándar.",
                "link": null
              },
              {
                "ico": "📘",
                "text": "\"Espacio, tiempo y arquitectura\" del mismo Giedion — sobre el movimiento moderno.",
                "html": "<strong>\"Espacio, tiempo y arquitectura\"</strong> del mismo Giedion — sobre el movimiento moderno.",
                "link": null
              }
            ]
          },
          {
            "title": "🌐 Web imprescindible",
            "items": [
              {
                "ico": "🔗",
                "text": "ArchDaily.com — El portal de arquitectura más visitado del mundo. Proyectos de todos los períodos históricos y tendencias actuales. Gratis.",
                "html": "<a href=\"https://www.archdaily.com\" target=\"_blank\">ArchDaily.com</a> — El portal de arquitectura más visitado del mundo. Proyectos de todos los períodos históricos y tendencias actuales. Gratis.",
                "link": "https://www.archdaily.com"
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      }
    ]
  },
  {
    "id": "fase1",
    "phase_num": "Fase 1",
    "title": "Software CAD y dibujo digital",
    "subtitle": "Las herramientas que usa la industria. Dominar al menos dos de estas es el mínimo para trabajar en cualquier estudio.",
    "cards": [
      {
        "icon": "💻",
        "tags": [
          "Software",
          "Estándar industria"
        ],
        "title": "AutoCAD — Planos 2D",
        "subtitle": "La herramienta estándar mundial para dibujo técnico de planos arquitectónicos.",
        "res_sections": [
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "CADe SIFO — Serie completa de AutoCAD desde cero en español. Muy clara y progresiva.",
                "html": "<strong>CADe SIFO</strong> — Serie completa de AutoCAD desde cero en español. Muy clara y progresiva.",
                "link": null
              },
              {
                "ico": "🇪🇸",
                "text": "El Mundo del BIM — AutoCAD enfocado a arquitectura e ingeniería.",
                "html": "<strong>El Mundo del BIM</strong> — AutoCAD enfocado a arquitectura e ingeniería.",
                "link": null
              },
              {
                "ico": "🇪🇸",
                "text": "Canal oficial Autodesk ES — Tutoriales paso a paso y actualizados directamente del fabricante.",
                "html": "<strong>Canal oficial Autodesk ES</strong> — Tutoriales paso a paso y actualizados directamente del fabricante.",
                "link": null
              }
            ]
          },
          {
            "title": "💰 Cómo conseguirlo gratis",
            "items": [
              {
                "ico": "🎓",
                "text": "Autodesk Education: autodesk.com/education — 1 año gratis con email universitario. Incluye AutoCAD, Revit, 3ds Max y más.",
                "html": "<strong>Autodesk Education:</strong> <a href=\"https://www.autodesk.com/education/edu-software\" target=\"_blank\">autodesk.com/education</a> — 1 año gratis con email universitario. Incluye AutoCAD, Revit, 3ds Max y más.",
                "link": "https://www.autodesk.com/education/edu-software"
              },
              {
                "ico": "🆓",
                "text": "AutoCAD Web — Versión ligera que corre en el navegador. Ideal para empezar sin instalar nada.",
                "html": "<strong>AutoCAD Web</strong> — Versión ligera que corre en el navegador. Ideal para empezar sin instalar nada.",
                "link": null
              },
              {
                "ico": "🆓",
                "text": "DraftSight — Alternativa gratuita muy similar a AutoCAD. Ideal si no tienes email universitario.",
                "html": "<strong>DraftSight</strong> — Alternativa gratuita muy similar a AutoCAD. Ideal si no tienes email universitario.",
                "link": null
              },
              {
                "ico": "🆓",
                "text": "LibreCAD — Open source, gratuito para siempre. Menos funciones pero suficiente para aprender.",
                "html": "<strong>LibreCAD</strong> — Open source, gratuito para siempre. Menos funciones pero suficiente para aprender.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "🏗️",
        "tags": [
          "Software BIM",
          "Alta demanda"
        ],
        "title": "Revit — Modelado BIM",
        "subtitle": "Building Information Modeling: el estándar para proyectos de mediana y gran escala.",
        "res_sections": [
          {
            "title": "🎓 Cursos de pago (valen la pena)",
            "items": [
              {
                "ico": "💲",
                "text": "Udemy — Busca cursos de Revit con más de 4.5 estrellas. En descuento frecuente quedan entre $10–$15 USD. Invierte ahí.",
                "html": "<strong>Udemy</strong> — Busca cursos de Revit con más de 4.5 estrellas. En descuento frecuente quedan entre $10–$15 USD. Invierte ahí.",
                "link": null
              }
            ]
          },
          {
            "title": "🌐 Comunidad",
            "items": [
              {
                "ico": "👥",
                "text": "Grupos de Facebook: \"Revit Colombia\" y \"BIM Latinoamérica\" — activos, responden dudas técnicas rápido.",
                "html": "Grupos de Facebook: <strong>\"Revit Colombia\"</strong> y <strong>\"BIM Latinoamérica\"</strong> — activos, responden dudas técnicas rápido.",
                "link": null
              },
              {
                "ico": "🔗",
                "text": "Foro oficial Autodesk — para problemas específicos.",
                "html": "<a href=\"https://forums.autodesk.com\" target=\"_blank\">Foro oficial Autodesk</a> — para problemas específicos.",
                "link": "https://forums.autodesk.com"
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [
          {
            "type": "callout-ok",
            "text": "¿Qué es BIM? En lugar de dibujar líneas, modelas un edificio inteligente: cada pared sabe su material, grosor y precio. Los planos, cortes y alzados se generan solos.",
            "html": "<strong>¿Qué es BIM?</strong> En lugar de dibujar líneas, modelas un edificio inteligente: cada pared sabe su material, grosor y precio. Los planos, cortes y alzados se generan solos."
          }
        ],
        "timeline": []
      },
      {
        "icon": "✒️",
        "tags": [
          "Software",
          "El más fácil"
        ],
        "title": "SketchUp — Modelado 3D rápido",
        "subtitle": "Modelado intuitivo ideal para volumetrías, maquetas digitales y primeras ideas en 3D.",
        "res_sections": [
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Canal oficial SketchUp en español — tutoriales gratuitos desde cero, directamente del fabricante. Excelentes.",
                "html": "<strong>Canal oficial SketchUp en español</strong> — tutoriales gratuitos desde cero, directamente del fabricante. Excelentes.",
                "link": null
              },
              {
                "ico": "🇪🇸",
                "text": "Busca \"SketchUp arquitectura desde cero\" — docenas de tutoriales gratuitos en español.",
                "html": "Busca <strong>\"SketchUp arquitectura desde cero\"</strong> — docenas de tutoriales gratuitos en español.",
                "link": null
              }
            ]
          },
          {
            "title": "💰 Cómo conseguirlo gratis",
            "items": [
              {
                "ico": "🆓",
                "text": "SketchUp Free — Corre 100% en el navegador en app.sketchup.com . Sin instalar nada. Ideal para empezar.",
                "html": "<strong>SketchUp Free</strong> — Corre 100% en el navegador en <a href=\"https://app.sketchup.com\" target=\"_blank\">app.sketchup.com</a>. Sin instalar nada. Ideal para empezar.",
                "link": "https://app.sketchup.com"
              }
            ]
          },
          {
            "title": "🔥 Trucos avanzados",
            "items": [
              {
                "ico": "💡",
                "text": "3D Warehouse (incluido gratis): biblioteca con millones de objetos — mobiliario, autos, vegetación, equipos. Drag &amp; drop.",
                "html": "<strong>3D Warehouse</strong> (incluido gratis): biblioteca con millones de objetos — mobiliario, autos, vegetación, equipos. Drag &amp; drop.",
                "link": null
              },
              {
                "ico": "💡",
                "text": "La combinación SketchUp + V-Ray es la favorita de estudios medianos para renders arquitectónicos de calidad sin complejidad.",
                "html": "La combinación <strong>SketchUp + V-Ray</strong> es la favorita de estudios medianos para renders arquitectónicos de calidad sin complejidad.",
                "link": null
              },
              {
                "ico": "💡",
                "text": "Extensiones clave: 1001bit Tools (muros y escaleras automáticas) y Curic Section (cortes en tiempo real).",
                "html": "Extensiones clave: <strong>1001bit Tools</strong> (muros y escaleras automáticas) y <strong>Curic Section</strong> (cortes en tiempo real).",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "🖋️",
        "tags": [
          "Software",
          "Presentación"
        ],
        "title": "Adobe Suite para arquitectos",
        "subtitle": "Photoshop, Illustrator e InDesign para post-producción de renders, collages y láminas.",
        "res_sections": [
          {
            "title": "🆓 Alternativas gratuitas (si no puedes pagar Adobe)",
            "items": [
              {
                "ico": "🆓",
                "text": "GIMP — Equivalente gratuito de Photoshop. gimp.org",
                "html": "<strong>GIMP</strong> — Equivalente gratuito de Photoshop. gimp.org",
                "link": null
              },
              {
                "ico": "🆓",
                "text": "Inkscape — Equivalente gratuito de Illustrator. inkscape.org",
                "html": "<strong>Inkscape</strong> — Equivalente gratuito de Illustrator. inkscape.org",
                "link": null
              },
              {
                "ico": "🆓",
                "text": "Scribus — Equivalente gratuito de InDesign para maquetación.",
                "html": "<strong>Scribus</strong> — Equivalente gratuito de InDesign para maquetación.",
                "link": null
              },
              {
                "ico": "🆓",
                "text": "Canva — Para presentaciones rápidas y portafolios online. canva.com",
                "html": "<strong>Canva</strong> — Para presentaciones rápidas y portafolios online. canva.com",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [
          {
            "type": "callout-warn",
            "text": "Regla de oro: Presentar bien vale tanto como diseñar bien. Un proyecto mediocre bien presentado se vende mejor que un gran proyecto mal presentado.",
            "html": "<strong>Regla de oro:</strong> Presentar bien vale tanto como diseñar bien. Un proyecto mediocre bien presentado se vende mejor que un gran proyecto mal presentado."
          }
        ],
        "timeline": []
      }
    ]
  },
  {
    "id": "fase2",
    "phase_num": "Fase 2",
    "title": "Diseño y proyecto arquitectónico",
    "subtitle": "El corazón de la carrera. Aquí aprendes a pensar como arquitecto: de la idea al plano ejecutivo.",
    "cards": [
      {
        "icon": "🏠",
        "tags": [
          "Teoría",
          "Neufert"
        ],
        "title": "Tipologías arquitectónicas y programas",
        "subtitle": "Vivienda, educación, salud, comercio, cultura, industria. Qué debe contener cada tipo de edificio.",
        "res_sections": [
          {
            "title": "📖 El libro más importante de la carrera",
            "items": [
              {
                "ico": "📘",
                "text": "\"Arte de Proyectar en Arquitectura\" de Ernst Neufert — Dimensiones humanas, programas por tipología, medidas estándar de todo. Consíguelo en físico o PDF. Es tu diccionario de por vida.",
                "html": "<strong>\"Arte de Proyectar en Arquitectura\"</strong> de Ernst Neufert — Dimensiones humanas, programas por tipología, medidas estándar de todo. Consíguelo en físico o PDF. Es tu diccionario de por vida.",
                "link": null
              }
            ]
          },
          {
            "title": "🌐 Referencias online",
            "items": [
              {
                "ico": "🔗",
                "text": "ArchDaily.com — Busca proyectos del tipo que quieres diseñar. Analiza plantas, secciones y conceptos de proyectos ganadores.",
                "html": "<a href=\"https://www.archdaily.com\" target=\"_blank\">ArchDaily.com</a> — Busca proyectos del tipo que quieres diseñar. Analiza plantas, secciones y conceptos de proyectos ganadores.",
                "link": "https://www.archdaily.com"
              },
              {
                "ico": "🔗",
                "text": "Plataforma de Arquitectura (ArchDaily en español) — Lo mismo pero en castellano.",
                "html": "<strong>Plataforma de Arquitectura</strong> (ArchDaily en español) — Lo mismo pero en castellano.",
                "link": null
              }
            ]
          },
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Busca \"Análisis de referentes arquitectónicos\" — canales que desglosan cómo funciona un edificio famoso desde su planta.",
                "html": "Busca <strong>\"Análisis de referentes arquitectónicos\"</strong> — canales que desglosan cómo funciona un edificio famoso desde su planta.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "🌀",
        "tags": [
          "Proceso"
        ],
        "title": "El proceso de diseño arquitectónico",
        "subtitle": "Concepto, partido arquitectónico, boceto, anteproyecto, proyecto básico y ejecutivo.",
        "res_sections": [
          {
            "title": "Las etapas del proceso",
            "items": [
              {
                "ico": "1️⃣",
                "text": "Análisis: Estudio del terreno, entorno, clima, normativa, necesidades del cliente.",
                "html": "<strong>Análisis:</strong> Estudio del terreno, entorno, clima, normativa, necesidades del cliente.",
                "link": null
              },
              {
                "ico": "2️⃣",
                "text": "Concepto: Una idea rectora (puede ser una metáfora, una geometría, un material) que guía todo.",
                "html": "<strong>Concepto:</strong> Una idea rectora (puede ser una metáfora, una geometría, un material) que guía todo.",
                "link": null
              },
              {
                "ico": "3️⃣",
                "text": "Partido arquitectónico: La organización espacial básica — cómo se distribuyen los espacios en la planta.",
                "html": "<strong>Partido arquitectónico:</strong> La organización espacial básica — cómo se distribuyen los espacios en la planta.",
                "link": null
              },
              {
                "ico": "4️⃣",
                "text": "Anteproyecto: Planos preliminares con escala real, fachadas y volumetría. Se muestra al cliente.",
                "html": "<strong>Anteproyecto:</strong> Planos preliminares con escala real, fachadas y volumetría. Se muestra al cliente.",
                "link": null
              },
              {
                "ico": "5️⃣",
                "text": "Proyecto ejecutivo: Todos los planos con detalles constructivos, cotas, materiales. Con esto se construye.",
                "html": "<strong>Proyecto ejecutivo:</strong> Todos los planos con detalles constructivos, cotas, materiales. Con esto se construye.",
                "link": null
              }
            ]
          },
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Busca \"Cómo hacer un partido arquitectónico\" — series completas del proceso real de diseño.",
                "html": "Busca <strong>\"Cómo hacer un partido arquitectónico\"</strong> — series completas del proceso real de diseño.",
                "link": null
              },
              {
                "ico": "🇪🇸",
                "text": "Borromini Arquitectura — Muestra el proceso de diseño de proyectos reales en tiempo real. Muy valioso.",
                "html": "<strong>Borromini Arquitectura</strong> — Muestra el proceso de diseño de proyectos reales en tiempo real. Muy valioso.",
                "link": null
              },
              {
                "ico": "🇬🇧",
                "text": "30X40 Design Workshop (EN) — El mejor canal sobre proceso de diseño y vida de un arquitecto independiente. Subtítulos disponibles.",
                "html": "<strong>30X40 Design Workshop</strong> (EN) — El mejor canal sobre proceso de diseño y vida de un arquitecto independiente. Subtítulos disponibles.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "📏",
        "tags": [
          "Legal",
          "Colombia"
        ],
        "title": "Normativa y reglamentos en Colombia",
        "subtitle": "NSR-10, POT, zonificación, accesibilidad, normas de construcción locales.",
        "res_sections": [
          {
            "title": "🇨🇴 Normativa colombiana clave",
            "items": [
              {
                "ico": "📜",
                "text": "NSR-10 (Reglamento Colombiano de Construcción Sismo Resistente) — Descarga gratuita en el sitio del Ministerio de Vivienda. Es la norma técnica de construcción en Colombia. Obligatoria.",
                "html": "<strong>NSR-10 (Reglamento Colombiano de Construcción Sismo Resistente)</strong> — Descarga gratuita en el sitio del Ministerio de Vivienda. Es la norma técnica de construcción en Colombia. Obligatoria.",
                "link": null
              },
              {
                "ico": "📜",
                "text": "POT (Plan de Ordenamiento Territorial) — Cada municipio tiene el suyo. El POT de Ibagué regula usos del suelo, alturas máximas, aislamientos, ocupación y construcción permitida. Consúltalo en la Alcaldía de Ibagué.",
                "html": "<strong>POT (Plan de Ordenamiento Territorial)</strong> — Cada municipio tiene el suyo. El POT de Ibagué regula usos del suelo, alturas máximas, aislamientos, ocupación y construcción permitida. Consúltalo en la Alcaldía de Ibagué.",
                "link": null
              },
              {
                "ico": "📜",
                "text": "Ley 400 de 1997 y Decreto 926 de 2010 — Marco legal del NSR-10. Útil entender el contexto.",
                "html": "<strong>Ley 400 de 1997 y Decreto 926 de 2010</strong> — Marco legal del NSR-10. Útil entender el contexto.",
                "link": null
              },
              {
                "ico": "♿",
                "text": "Norma de Accesibilidad (NTC 6047) — Diseño universal para personas con discapacidad. Obligatoria en edificios públicos.",
                "html": "<strong>Norma de Accesibilidad (NTC 6047)</strong> — Diseño universal para personas con discapacidad. Obligatoria en edificios públicos.",
                "link": null
              }
            ]
          },
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Busca \"NSR-10 para principiantes\" y \"Cómo leer un POT\" — hay explicaciones accesibles en español sobre cómo aplicar estas normas.",
                "html": "Busca <strong>\"NSR-10 para principiantes\"</strong> y <strong>\"Cómo leer un POT\"</strong> — hay explicaciones accesibles en español sobre cómo aplicar estas normas.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "🌿",
        "tags": [
          "Tendencia",
          "Futuro"
        ],
        "title": "Arquitectura sostenible y bioclimática",
        "subtitle": "Diseño con el clima, materiales sostenibles, eficiencia energética, ventilación natural.",
        "res_sections": [
          {
            "title": "🌐 Certificaciones y comunidades",
            "items": [
              {
                "ico": "🏅",
                "text": "LEED — La certificación de sostenibilidad más reconocida del mundo. usgbc.org/leed",
                "html": "<strong>LEED</strong> — La certificación de sostenibilidad más reconocida del mundo. <a href=\"https://www.usgbc.org/leed\" target=\"_blank\">usgbc.org/leed</a>",
                "link": "https://www.usgbc.org/leed"
              },
              {
                "ico": "🏅",
                "text": "CASA Colombia — Certificación colombiana de construcción sostenible. Cada vez más pedida en proyectos locales.",
                "html": "<strong>CASA Colombia</strong> — Certificación colombiana de construcción sostenible. Cada vez más pedida en proyectos locales.",
                "link": null
              }
            ]
          },
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Busca \"Arquitectura bioclimática ventilación cruzada\" y \"diseño solar pasivo\" — muchos tutoriales aplicados a climas cálidos latinoamericanos.",
                "html": "Busca <strong>\"Arquitectura bioclimática ventilación cruzada\"</strong> y <strong>\"diseño solar pasivo\"</strong> — muchos tutoriales aplicados a climas cálidos latinoamericanos.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [
          {
            "type": "callout-ok",
            "text": "Relevancia en Ibagué: La ciudad tiene clima cálido semiárido (~26°C promedio). Dominar ventilación cruzada, protección solar y materiales de baja inercia térmica te diferencia enormemente en el mercado local.",
            "html": "<strong>Relevancia en Ibagué:</strong> La ciudad tiene clima cálido semiárido (~26°C promedio). Dominar ventilación cruzada, protección solar y materiales de baja inercia térmica te diferencia enormemente en el mercado local."
          }
        ],
        "timeline": []
      }
    ]
  },
  {
    "id": "fase3",
    "phase_num": "Fase 3",
    "title": "Renders, visualización y portafolio",
    "subtitle": "Hacer que tus proyectos se vean increíbles y construir la pieza más importante de tu carrera.",
    "cards": [
      {
        "icon": "🎬",
        "tags": [
          "Software"
        ],
        "title": "Renders con Lumion y Enscape",
        "subtitle": "Visualización arquitectónica fotorrealista en tiempo real. El estándar actual de presentación.",
        "res_sections": [
          {
            "title": "Lumion vs Enscape — ¿cuál elegir?",
            "items": [
              {
                "ico": "🟡",
                "text": "Lumion — Más fácil de usar, interfaz visual muy intuitiva. Ideal para quien empieza. Funciona independiente.",
                "html": "<strong>Lumion</strong> — Más fácil de usar, interfaz visual muy intuitiva. Ideal para quien empieza. Funciona independiente.",
                "link": null
              },
              {
                "ico": "🟣",
                "text": "Enscape — Corre en tiempo real dentro de Revit o SketchUp. Ver el render mientras diseñas es una ventaja enorme.",
                "html": "<strong>Enscape</strong> — Corre en tiempo real dentro de Revit o SketchUp. Ver el render mientras diseñas es una ventaja enorme.",
                "link": null
              },
              {
                "ico": "🔵",
                "text": "V-Ray — El más profesional y fotorrealista. Curva de aprendizaje alta. Para proyectos de alta gama.",
                "html": "<strong>V-Ray</strong> — El más profesional y fotorrealista. Curva de aprendizaje alta. Para proyectos de alta gama.",
                "link": null
              }
            ]
          },
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Canal oficial Lumion en español — tutoriales gratuitos paso a paso desde el nivel cero.",
                "html": "<strong>Canal oficial Lumion en español</strong> — tutoriales gratuitos paso a paso desde el nivel cero.",
                "link": null
              },
              {
                "ico": "🇪🇸",
                "text": "Busca \"Enscape tutorial desde cero\" — hay series completas en español, especialmente combinado con SketchUp.",
                "html": "Busca <strong>\"Enscape tutorial desde cero\"</strong> — hay series completas en español, especialmente combinado con SketchUp.",
                "link": null
              },
              {
                "ico": "🇬🇧",
                "text": "Lumion Official (EN) — Tips avanzados de iluminación y efectos. Subtítulos disponibles.",
                "html": "<strong>Lumion Official</strong> (EN) — Tips avanzados de iluminación y efectos. Subtítulos disponibles.",
                "link": null
              }
            ]
          },
          {
            "title": "🆓 Pruebas gratis",
            "items": [
              {
                "ico": "⏱️",
                "text": "Lumion.com — versión de prueba de 14 días con todas las funciones.",
                "html": "<a href=\"https://lumion.com/try-lumion.html\" target=\"_blank\">Lumion.com</a> — versión de prueba de 14 días con todas las funciones.",
                "link": "https://lumion.com/try-lumion.html"
              },
              {
                "ico": "⏱️",
                "text": "Enscape3D.com — trial gratuito de 14 días.",
                "html": "<a href=\"https://enscape3d.com\" target=\"_blank\">Enscape3D.com</a> — trial gratuito de 14 días.",
                "link": "https://enscape3d.com"
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "📁",
        "tags": [
          "Carrera",
          "Lo más importante"
        ],
        "title": "Tu portafolio profesional",
        "subtitle": "El documento más importante de tu carrera. Cómo armarlo, qué poner y cómo distribuirlo.",
        "res_sections": [
          {
            "title": "🌐 Plataformas para publicar",
            "items": [
              {
                "ico": "🔗",
                "text": "Issuu.com — Publica tu PDF como revista interactiva. Gratis. Ideal para enviar por link en emails y LinkedIn.",
                "html": "<a href=\"https://issuu.com\" target=\"_blank\">Issuu.com</a> — Publica tu PDF como revista interactiva. Gratis. Ideal para enviar por link en emails y LinkedIn.",
                "link": "https://issuu.com"
              },
              {
                "ico": "🔗",
                "text": "Behance.net — La red de portafolios de Adobe. Muy usada en arquitectura y diseño. Gratis.",
                "html": "<a href=\"https://www.behance.net\" target=\"_blank\">Behance.net</a> — La red de portafolios de Adobe. Muy usada en arquitectura y diseño. Gratis.",
                "link": "https://www.behance.net"
              },
              {
                "ico": "🔗",
                "text": "Archinect.com — Portafolios arquitectónicos. Comunidad activa de estudiantes y profesionales.",
                "html": "<a href=\"https://archinect.com\" target=\"_blank\">Archinect.com</a> — Portafolios arquitectónicos. Comunidad activa de estudiantes y profesionales.",
                "link": "https://archinect.com"
              }
            ]
          },
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Busca \"Cómo hacer un portafolio de arquitectura\" — hay guías de estudiantes y recién egresados muy prácticas.",
                "html": "Busca <strong>\"Cómo hacer un portafolio de arquitectura\"</strong> — hay guías de estudiantes y recién egresados muy prácticas.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [
          {
            "type": "callout-warn",
            "text": "Regla de oro: 3 proyectos excelentes &gt; 10 proyectos mediocres. Menos es más. Los estudios ven decenas de portafolios — el tuyo debe ser memorable desde la primera página.",
            "html": "<strong>Regla de oro:</strong> 3 proyectos excelentes &gt; 10 proyectos mediocres. Menos es más. Los estudios ven decenas de portafolios — el tuyo debe ser memorable desde la primera página."
          }
        ],
        "timeline": []
      },
      {
        "icon": "🤖",
        "tags": [
          "Nuevo",
          "IA"
        ],
        "title": "Inteligencia Artificial en arquitectura",
        "subtitle": "Midjourney, Stable Diffusion, Adobe Firefly para conceptos rápidos e imágenes inspiracionales.",
        "res_sections": [
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Busca \"Midjourney para arquitectura\" y \"IA en diseño arquitectónico 2024\" — tendencia en rápido crecimiento con tutoriales en español.",
                "html": "Busca <strong>\"Midjourney para arquitectura\"</strong> y <strong>\"IA en diseño arquitectónico 2024\"</strong> — tendencia en rápido crecimiento con tutoriales en español.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [
          {
            "type": "callout-info",
            "text": "Perspectiva honesta: La IA no reemplaza al arquitecto — reemplaza el tiempo que tardabas en buscar y explorar referencias. Úsala para velocidad, no para evitar aprender.",
            "html": "<strong>Perspectiva honesta:</strong> La IA no reemplaza al arquitecto — reemplaza el tiempo que tardabas en buscar y explorar referencias. Úsala para velocidad, no para evitar aprender."
          }
        ],
        "timeline": []
      },
      {
        "icon": "🎥",
        "tags": [
          "YouTube",
          "Respuesta honesta"
        ],
        "title": "¿Puedo aprender arquitectura por YouTube?",
        "subtitle": "La respuesta completa y honesta sobre qué sí y qué no se puede aprender sin universidad.",
        "res_sections": [],
        "tips": null,
        "callouts": [],
        "timeline": []
      }
    ]
  },
  {
    "id": "fase4",
    "phase_num": "Fase 4",
    "title": "Especialización y carrera profesional",
    "subtitle": "Decisiones de largo plazo: universidad vs. autodidacta, especialidades, red de contactos y plan de acción.",
    "cards": [
      {
        "icon": "🎓",
        "tags": [
          "Decisión clave",
          "Colombia"
        ],
        "title": "Universidad vs. Autodidacta en Colombia",
        "subtitle": "Las diferencias reales, la legalidad y el camino que más te conviene según tu objetivo.",
        "res_sections": [
          {
            "title": "🖥️ Ruta autodidacta (sin título)",
            "items": [
              {
                "ico": "✅",
                "text": "Visualizador 3D / Renderista — se trabaja freelance desde casa, sin título.",
                "html": "Visualizador 3D / Renderista — se trabaja freelance desde casa, sin título.",
                "link": null
              },
              {
                "ico": "✅",
                "text": "Diseñador de interiores — no requiere título en muchos contextos.",
                "html": "Diseñador de interiores — no requiere título en muchos contextos.",
                "link": null
              },
              {
                "ico": "✅",
                "text": "BIM Modeler — muy demandado en proyectos internacionales.",
                "html": "BIM Modeler — muy demandado en proyectos internacionales.",
                "link": null
              },
              {
                "ico": "✅",
                "text": "Cursos con certificado: Coursera , edX — suman al portafolio aunque no equivalen al título.",
                "html": "Cursos con certificado: <a href=\"https://www.coursera.org\" target=\"_blank\">Coursera</a>, <a href=\"https://www.edx.org\" target=\"_blank\">edX</a> — suman al portafolio aunque no equivalen al título.",
                "link": "https://www.coursera.org"
              },
              {
                "ico": "❌",
                "text": "No puede firmar proyectos ante entidades ni ejercer como arquitecto titulado.",
                "html": "No puede firmar proyectos ante entidades ni ejercer como arquitecto titulado.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [
          {
            "type": "callout-warn",
            "text": "Importante en Colombia: Para firmar planos como arquitecto y ejercer legalmente necesitas matrícula profesional del COPNIA. Esto requiere título universitario. Sin título puedes hacer casi todo, pero no firmar proyectos ante entidades gubernamentales.",
            "html": "<strong>Importante en Colombia:</strong> Para firmar planos como arquitecto y ejercer legalmente necesitas <strong>matrícula profesional</strong> del COPNIA. Esto requiere título universitario. Sin título puedes hacer casi todo, pero no firmar proyectos ante entidades gubernamentales."
          }
        ],
        "timeline": []
      },
      {
        "icon": "🔧",
        "tags": [
          "Empleo",
          "Alta demanda"
        ],
        "title": "Especialidades con mayor demanda hoy",
        "subtitle": "Los perfiles que las empresas buscan y cómo diferenciarte en el mercado laboral.",
        "res_sections": [
          {
            "title": "💼 Perfiles más buscados en 2024-2025",
            "items": [
              {
                "ico": "🥇",
                "text": "BIM Manager: gestiona modelos digitales en equipos grandes. Revit avanzado + coordinación de especialidades. Uno de los salarios más altos.",
                "html": "<strong>BIM Manager:</strong> gestiona modelos digitales en equipos grandes. Revit avanzado + coordinación de especialidades. Uno de los salarios más altos.",
                "link": null
              },
              {
                "ico": "🥈",
                "text": "Visualizador 3D / Renderista: se trabaja freelance desde casa, en dólares. Lumion + V-Ray + post en Photoshop.",
                "html": "<strong>Visualizador 3D / Renderista:</strong> se trabaja freelance desde casa, en dólares. Lumion + V-Ray + post en Photoshop.",
                "link": null
              },
              {
                "ico": "🥉",
                "text": "Diseñador de interiores: alta demanda residencial y comercial. SketchUp + renders + buena paleta de materiales.",
                "html": "<strong>Diseñador de interiores:</strong> alta demanda residencial y comercial. SketchUp + renders + buena paleta de materiales.",
                "link": null
              },
              {
                "ico": "4️⃣",
                "text": "Arquitecto sostenible / bioclimático: cada vez más exigido por clientes conscientes y proyectos públicos.",
                "html": "<strong>Arquitecto sostenible / bioclimático:</strong> cada vez más exigido por clientes conscientes y proyectos públicos.",
                "link": null
              },
              {
                "ico": "5️⃣",
                "text": "Diseñador urbano: trabajo con municipios, POTs y proyectos de espacio público. Perfil más técnico-político.",
                "html": "<strong>Diseñador urbano:</strong> trabajo con municipios, POTs y proyectos de espacio público. Perfil más técnico-político.",
                "link": null
              }
            ]
          },
          {
            "title": "🌐 Plataformas para trabajo freelance",
            "items": [
              {
                "ico": "💲",
                "text": "Workana.com — Plataforma latinoamericana para freelance. Pagan en dólares. Muchos proyectos de renders y planos.",
                "html": "<a href=\"https://www.workana.com\" target=\"_blank\">Workana.com</a> — Plataforma latinoamericana para freelance. Pagan en dólares. Muchos proyectos de renders y planos.",
                "link": "https://www.workana.com"
              },
              {
                "ico": "💲",
                "text": "Freelancer.com — Global, proyectos de modelado y renders desde todo el mundo.",
                "html": "<a href=\"https://www.freelancer.com\" target=\"_blank\">Freelancer.com</a> — Global, proyectos de modelado y renders desde todo el mundo.",
                "link": "https://www.freelancer.com"
              },
              {
                "ico": "💲",
                "text": "Upwork.com — Para perfiles más establecidos. Los mejores pagos del mercado freelance.",
                "html": "<a href=\"https://www.upwork.com\" target=\"_blank\">Upwork.com</a> — Para perfiles más establecidos. Los mejores pagos del mercado freelance.",
                "link": "https://www.upwork.com"
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "🌍",
        "tags": [
          "Red"
        ],
        "title": "Comunidades y redes profesionales",
        "subtitle": "Dónde conectar con otros arquitectos, inspirarte y encontrar oportunidades reales.",
        "res_sections": [
          {
            "title": "🌐 Redes sociales y comunidades",
            "items": [
              {
                "ico": "💼",
                "text": "LinkedIn — Sigue a arquitectos colombianos. Publica tus proyectos con proceso y renders. Los reclutadores y clientes están aquí.",
                "html": "<strong>LinkedIn</strong> — Sigue a arquitectos colombianos. Publica tus proyectos con proceso y renders. Los reclutadores y clientes están aquí.",
                "link": null
              },
              {
                "ico": "📸",
                "text": "Instagram — @archdaily, @dezeen, @arquitecturacolombiana. La comunidad visual más grande de arquitectura. Muestra tu trabajo con stories de proceso.",
                "html": "<strong>Instagram</strong> — @archdaily, @dezeen, @arquitecturacolombiana. La comunidad visual más grande de arquitectura. Muestra tu trabajo con stories de proceso.",
                "link": null
              },
              {
                "ico": "💬",
                "text": "Reddit — r/architecture y r/Architectureschool — comunidad de estudiantes y profesionales que responden dudas. En inglés pero muy activa.",
                "html": "<strong>Reddit</strong> — r/architecture y r/Architectureschool — comunidad de estudiantes y profesionales que responden dudas. En inglés pero muy activa.",
                "link": null
              },
              {
                "ico": "👥",
                "text": "Facebook Groups — \"Arquitectura Colombia\", \"Revit Colombia\", \"SketchUp en Español\" — muy activos para resolver dudas técnicas.",
                "html": "<strong>Facebook Groups</strong> — \"Arquitectura Colombia\", \"Revit Colombia\", \"SketchUp en Español\" — muy activos para resolver dudas técnicas.",
                "link": null
              }
            ]
          },
          {
            "title": "🏛️ Instituciones locales en Ibagué / Tolima",
            "items": [
              {
                "ico": "🏛️",
                "text": "Colegio de Arquitectos del Tolima — Organiza eventos, charlas y exposiciones. Asistir te conecta con profesionales locales desde antes de graduarte.",
                "html": "<strong>Colegio de Arquitectos del Tolima</strong> — Organiza eventos, charlas y exposiciones. Asistir te conecta con profesionales locales desde antes de graduarte.",
                "link": null
              },
              {
                "ico": "🏛️",
                "text": "Sociedad Colombiana de Arquitectos (SCA) — sca.org.co — Concursos, publicaciones y eventos nacionales.",
                "html": "<strong>Sociedad Colombiana de Arquitectos (SCA)</strong> — sca.org.co — Concursos, publicaciones y eventos nacionales.",
                "link": null
              },
              {
                "ico": "🏛️",
                "text": "COPNIA — copnia.gov.co — Registro profesional obligatorio para ejercer legalmente en Colombia.",
                "html": "<strong>COPNIA</strong> — <a href=\"https://copnia.gov.co\" target=\"_blank\">copnia.gov.co</a> — Registro profesional obligatorio para ejercer legalmente en Colombia.",
                "link": "https://copnia.gov.co"
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "📅",
        "tags": [
          "Plan",
          "Desde hoy"
        ],
        "title": "Plan de estudio mes a mes — 12 meses",
        "subtitle": "Cómo organizar el tiempo si empiezas desde cero hoy, con 1 hora mínima diaria.",
        "res_sections": [],
        "tips": null,
        "callouts": [
          {
            "type": "callout-ok",
            "text": "Principio clave: 1 hora diaria constante supera a 8 horas un sábado al mes. La constancia es más importante que la intensidad.",
            "html": "<strong>Principio clave:</strong> 1 hora diaria constante supera a 8 horas un sábado al mes. La constancia es más importante que la intensidad."
          }
        ],
        "timeline": []
      }
    ]
  },
  {
    "id": "fase5",
    "phase_num": "Fase 5",
    "title": "Construcción, materiales y estructuras",
    "subtitle": "Un arquitecto que no entiende cómo se construye lo que diseña comete errores graves. Esta fase te conecta con la realidad física de la arquitectura.",
    "cards": [
      {
        "icon": "🧱",
        "tags": [
          "Técnico",
          "Visita de obra"
        ],
        "title": "Materiales de construcción",
        "subtitle": "Concreto, acero, madera, vidrio, ladrillo, prefabricados, materiales sostenibles y locales.",
        "res_sections": [
          {
            "title": "📖 Libros esenciales",
            "items": [
              {
                "ico": "📘",
                "text": "\"Materiales de construcción\" de Aurelio Rojo Vidal — Referencia iberoamericana muy completa. Propiedades, usos y patologías.",
                "html": "<strong>\"Materiales de construcción\"</strong> de Aurelio Rojo Vidal — Referencia iberoamericana muy completa. Propiedades, usos y patologías.",
                "link": null
              },
              {
                "ico": "📘",
                "text": "\"Detail\" (revista alemana en español) — La publicación de referencia mundial sobre detalles constructivos reales. Cada número analiza un material o sistema.",
                "html": "<strong>\"Detail\" (revista alemana en español)</strong> — La publicación de referencia mundial sobre detalles constructivos reales. Cada número analiza un material o sistema.",
                "link": null
              }
            ]
          },
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Busca \"Materiales de construcción arquitectura\" y \"detalle constructivo\" — hay canales de ingeniería civil que explican muy bien las propiedades físicas.",
                "html": "Busca <strong>\"Materiales de construcción arquitectura\"</strong> y <strong>\"detalle constructivo\"</strong> — hay canales de ingeniería civil que explican muy bien las propiedades físicas.",
                "link": null
              },
              {
                "ico": "🇪🇸",
                "text": "Construmática en YouTube — contenido técnico de materiales para construcción en América Latina.",
                "html": "<strong>Construmática</strong> en YouTube — contenido técnico de materiales para construcción en América Latina.",
                "link": null
              },
              {
                "ico": "🇬🇧",
                "text": "Practical Engineering (EN) — Explica cómo funcionan los materiales de forma visual. Subtítulos disponibles.",
                "html": "<strong>Practical Engineering</strong> (EN) — Explica cómo funcionan los materiales de forma visual. Subtítulos disponibles.",
                "link": null
              }
            ]
          },
          {
            "title": "🏗️ Los materiales clave que debes conocer",
            "items": [
              {
                "ico": "🔵",
                "text": "Concreto (hormigón): el más usado en Colombia. Resistencias (f'c), tipos de mezcla, curado, patologías (fisuras, carbonatación).",
                "html": "<strong>Concreto (hormigón):</strong> el más usado en Colombia. Resistencias (f'c), tipos de mezcla, curado, patologías (fisuras, carbonatación).",
                "link": null
              },
              {
                "ico": "⚫",
                "text": "Acero: perfiles estructurales, láminas, tornillería. Ventajas de rapidez de montaje vs. costo.",
                "html": "<strong>Acero:</strong> perfiles estructurales, láminas, tornillería. Ventajas de rapidez de montaje vs. costo.",
                "link": null
              },
              {
                "ico": "🟤",
                "text": "Ladrillo y mampostería: el sistema más común en vivienda colombiana. Ladrillo estructural vs. de fachada.",
                "html": "<strong>Ladrillo y mampostería:</strong> el sistema más común en vivienda colombiana. Ladrillo estructural vs. de fachada.",
                "link": null
              },
              {
                "ico": "🟢",
                "text": "Madera y bambú: materiales con gran potencial en Colombia. El guadua es patrimonio técnico nacional.",
                "html": "<strong>Madera y bambú:</strong> materiales con gran potencial en Colombia. El guadua es patrimonio técnico nacional.",
                "link": null
              },
              {
                "ico": "⚪",
                "text": "Vidrio: tipos (templado, laminado, bajo emisivo), sistemas de fachada, control solar.",
                "html": "<strong>Vidrio:</strong> tipos (templado, laminado, bajo emisivo), sistemas de fachada, control solar.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "⚙️",
        "tags": [
          "Técnico",
          "NSR-10"
        ],
        "title": "Estructuras básicas para arquitectos",
        "subtitle": "Cargas, vigas, columnas, losas, cimentaciones, sistemas estructurales y sismo resistencia.",
        "res_sections": [
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Busca \"Estructuras para arquitectos\" — hay canales de ingeniería estructural con enfoque en lo que necesita saber un arquitecto (no el cálculo completo).",
                "html": "Busca <strong>\"Estructuras para arquitectos\"</strong> — hay canales de ingeniería estructural con enfoque en lo que necesita saber un arquitecto (no el cálculo completo).",
                "link": null
              },
              {
                "ico": "🇬🇧",
                "text": "The Efficient Engineer (EN) — Explica conceptos estructurales con animaciones excepcionales. Subtítulos en español. Muy recomendado.",
                "html": "<strong>The Efficient Engineer</strong> (EN) — Explica conceptos estructurales con animaciones excepcionales. Subtítulos en español. Muy recomendado.",
                "link": null
              }
            ]
          },
          {
            "title": "📖 Libro recomendado",
            "items": [
              {
                "ico": "📘",
                "text": "\"Estructuras para Arquitectos\" de Salvadori y Heller — Escrito específicamente para arquitectos. Sin fórmulas complejas, con mucha intuición visual.",
                "html": "<strong>\"Estructuras para Arquitectos\"</strong> de Salvadori y Heller — Escrito específicamente para arquitectos. Sin fórmulas complejas, con mucha intuición visual.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [
          {
            "type": "callout-warn",
            "text": "Nota importante: El cálculo estructural detallado lo hace un ingeniero civil. El arquitecto debe entender los principios para diseñar con sentido estructural, no calcular armaduras.",
            "html": "<strong>Nota importante:</strong> El cálculo estructural detallado lo hace un ingeniero civil. El arquitecto debe entender los principios para diseñar con sentido estructural, no calcular armaduras."
          }
        ],
        "timeline": []
      },
      {
        "icon": "🔌",
        "tags": [
          "Técnico"
        ],
        "title": "Instalaciones hidráulicas, eléctricas y HVAC",
        "subtitle": "Las redes que hacen funcionar un edificio. El arquitecto debe coordinarlas con el diseño.",
        "res_sections": [
          {
            "title": "🔧 Las instalaciones que debe coordinar el arquitecto",
            "items": [
              {
                "ico": "💧",
                "text": "Hidráulica y sanitaria: redes de agua potable (fría y caliente), aguas residuales, aguas lluvias. El arquitecto define recorridos y espacios técnicos para tuberías.",
                "html": "<strong>Hidráulica y sanitaria:</strong> redes de agua potable (fría y caliente), aguas residuales, aguas lluvias. El arquitecto define recorridos y espacios técnicos para tuberías.",
                "link": null
              },
              {
                "ico": "⚡",
                "text": "Eléctrica: tableros, ductos, tomacorrientes, iluminación. Coordinar con el diseño de cielos y muros desde el inicio.",
                "html": "<strong>Eléctrica:</strong> tableros, ductos, tomacorrientes, iluminación. Coordinar con el diseño de cielos y muros desde el inicio.",
                "link": null
              },
              {
                "ico": "❄️",
                "text": "HVAC (climatización): en Ibagué, con clima cálido, el aire acondicionado es frecuente en comercio y oficinas. El arquitecto debe prever ductos y unidades condensadoras.",
                "html": "<strong>HVAC (climatización):</strong> en Ibagué, con clima cálido, el aire acondicionado es frecuente en comercio y oficinas. El arquitecto debe prever ductos y unidades condensadoras.",
                "link": null
              },
              {
                "ico": "🔥",
                "text": "Gas natural: redes de gas, ventilaciones obligatorias, distancias de seguridad.",
                "html": "<strong>Gas natural:</strong> redes de gas, ventilaciones obligatorias, distancias de seguridad.",
                "link": null
              },
              {
                "ico": "📡",
                "text": "Telecomunicaciones: ductos para datos, fibra óptica, CCTV. Cada vez más importante en diseño moderno.",
                "html": "<strong>Telecomunicaciones:</strong> ductos para datos, fibra óptica, CCTV. Cada vez más importante en diseño moderno.",
                "link": null
              }
            ]
          },
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Busca \"Instalaciones hidráulicas en arquitectura\" e \"instalaciones eléctricas planos\" — hay tutoriales de cómo coordinar e integrar instalaciones en el proyecto arquitectónico.",
                "html": "Busca <strong>\"Instalaciones hidráulicas en arquitectura\"</strong> e <strong>\"instalaciones eléctricas planos\"</strong> — hay tutoriales de cómo coordinar e integrar instalaciones en el proyecto arquitectónico.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "💰",
        "tags": [
          "Profesional",
          "Nadie lo enseña"
        ],
        "title": "Presupuestos y costos de construcción",
        "subtitle": "Cómo estimar cuánto cuesta construir lo que diseñas. Lo que nadie te enseña en YouTube.",
        "res_sections": [
          {
            "title": "🌐 Herramientas y fuentes",
            "items": [
              {
                "ico": "🔗",
                "text": "CAMACOL (camacol.co) — La Cámara Colombiana de la Construcción publica índices de costos de construcción actualizados.",
                "html": "<strong>CAMACOL</strong> (camacol.co) — La Cámara Colombiana de la Construcción publica índices de costos de construcción actualizados.",
                "link": null
              },
              {
                "ico": "🔗",
                "text": "SENA — Cursos gratuitos de presupuestos de construcción en el portal SENA Sofía Plus.",
                "html": "<strong>SENA</strong> — Cursos gratuitos de presupuestos de construcción en el portal SENA Sofía Plus.",
                "link": null
              },
              {
                "ico": "💻",
                "text": "Software S10 — El estándar en Colombia y Latinoamérica para elaborar presupuestos de obra. Hay tutoriales en YouTube.",
                "html": "<strong>Software S10</strong> — El estándar en Colombia y Latinoamérica para elaborar presupuestos de obra. Hay tutoriales en YouTube.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [
          {
            "type": "callout-info",
            "text": "Realidad profesional: El cliente siempre pregunta \"¿cuánto cuesta?\" Si no tienes idea, pierdes credibilidad. No necesitas ser ingeniero de costos, pero debes manejar órdenes de magnitud.",
            "html": "<strong>Realidad profesional:</strong> El cliente siempre pregunta \"¿cuánto cuesta?\" Si no tienes idea, pierdes credibilidad. No necesitas ser ingeniero de costos, pero debes manejar órdenes de magnitud."
          }
        ],
        "timeline": []
      }
    ]
  },
  {
    "id": "errores",
    "phase_num": "Errores",
    "title": "Los 10 errores más comunes al empezar",
    "subtitle": "Lo que hace casi todo principiante y cómo evitarlo desde el principio.",
    "cards": [
      {
        "icon": "",
        "tags": [],
        "title": "",
        "subtitle": "",
        "res_sections": [
          {
            "title": "",
            "items": [
              {
                "ico": "❌",
                "text": "Empezar en el software antes que a mano. El computador limita la creatividad en la fase de ideación. Boceta primero, digitaliza después.",
                "html": "<strong>Empezar en el software antes que a mano.</strong> El computador limita la creatividad en la fase de ideación. Boceta primero, digitaliza después.",
                "link": null
              },
              {
                "ico": "❌",
                "text": "Diseñar sin conocer el lote ni la normativa. Un proyecto que no cumple el POT no se puede construir, sin importar lo bonito que sea.",
                "html": "<strong>Diseñar sin conocer el lote ni la normativa.</strong> Un proyecto que no cumple el POT no se puede construir, sin importar lo bonito que sea.",
                "link": null
              },
              {
                "ico": "❌",
                "text": "No consultar el Neufert. Diseñar baños de 1×1m, pasillos de 60cm o estacionamientos imposibles por no revisar dimensiones mínimas.",
                "html": "<strong>No consultar el Neufert.</strong> Diseñar baños de 1×1m, pasillos de 60cm o estacionamientos imposibles por no revisar dimensiones mínimas.",
                "link": null
              },
              {
                "ico": "❌",
                "text": "Ignorar el sol y el viento. Un edificio con ventanas al occidente en Ibagué será un horno. La orientación es lo primero que se define, no lo último.",
                "html": "<strong>Ignorar el sol y el viento.</strong> Un edificio con ventanas al occidente en Ibagué será un horno. La orientación es lo primero que se define, no lo último.",
                "link": null
              },
              {
                "ico": "❌",
                "text": "Copiar sin analizar. Copiar un proyecto de ArchDaily está bien si entiendes por qué funciona. Copiarlo sin entenderlo produce resultados sin sentido en otro contexto.",
                "html": "<strong>Copiar sin analizar.</strong> Copiar un proyecto de ArchDaily está bien si entiendes por qué funciona. Copiarlo sin entenderlo produce resultados sin sentido en otro contexto.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "",
        "tags": [],
        "title": "",
        "subtitle": "",
        "res_sections": [
          {
            "title": "",
            "items": [
              {
                "ico": "❌",
                "text": "Presentaciones sin escala gráfica. Un plano sin escala es inútil en obra. Siempre incluye escala numérica Y gráfica.",
                "html": "<strong>Presentaciones sin escala gráfica.</strong> Un plano sin escala es inútil en obra. Siempre incluye escala numérica Y gráfica.",
                "link": null
              },
              {
                "ico": "❌",
                "text": "Olvidar la estructura. Diseñar un edificio de 4 pisos sin columnas visibles porque \"arruinan el espacio\". El ingeniero te obliga a ponerlas después de manera peor.",
                "html": "<strong>Olvidar la estructura.</strong> Diseñar un edificio de 4 pisos sin columnas visibles porque \"arruinan el espacio\". El ingeniero te obliga a ponerlas después de manera peor.",
                "link": null
              },
              {
                "ico": "❌",
                "text": "Portafolio con todo lo que hiciste. Meter 15 proyectos mediocres en lugar de 3 excelentes. La cantidad no impresiona — la calidad sí.",
                "html": "<strong>Portafolio con todo lo que hiciste.</strong> Meter 15 proyectos mediocres en lugar de 3 excelentes. La cantidad no impresiona — la calidad sí.",
                "link": null
              },
              {
                "ico": "❌",
                "text": "No guardar versiones del proceso. Diseñar encima de bocetos previos y perder el proceso. Guarda cada etapa — el proceso vale tanto como el resultado.",
                "html": "<strong>No guardar versiones del proceso.</strong> Diseñar encima de bocetos previos y perder el proceso. Guarda cada etapa — el proceso vale tanto como el resultado.",
                "link": null
              },
              {
                "ico": "❌",
                "text": "Estudiar solo. Aprender arquitectura en aislamiento sin crítica externa es el error más costoso. Busca comunidad, comparte tu trabajo, pide retroalimentación constante.",
                "html": "<strong>Estudiar solo.</strong> Aprender arquitectura en aislamiento sin crítica externa es el error más costoso. Busca comunidad, comparte tu trabajo, pide retroalimentación constante.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      }
    ]
  },
  {
    "id": "concursos",
    "phase_num": "Concursos",
    "title": "Concursos de arquitectura para estudiantes",
    "subtitle": "Los concursos son la manera más rápida de crecer, construir portafolio y ganar reconocimiento sin ser titulado.",
    "cards": [
      {
        "icon": "🏆",
        "tags": [
          "Competencia",
          "Portafolio"
        ],
        "title": "Concursos internacionales abiertos",
        "subtitle": "Competencias abiertas a estudiantes y autodidactas de todo el mundo.",
        "res_sections": [
          {
            "title": "🌐 Plataformas de concursos",
            "items": [
              {
                "ico": "🔗",
                "text": "Archmarathon — Concursos de ideas internacionales. Muchos son gratuitos o de bajo costo de inscripción. Abiertos a todos.",
                "html": "<a href=\"https://competitions.archmarathon.com\" target=\"_blank\"><strong>Archmarathon</strong></a> — Concursos de ideas internacionales. Muchos son gratuitos o de bajo costo de inscripción. Abiertos a todos.",
                "link": "https://competitions.archmarathon.com"
              },
              {
                "ico": "🔗",
                "text": "ArchDaily Competitions — Lista actualizada de concursos mundiales. Filtra por \"open to students\".",
                "html": "<a href=\"https://www.archdaily.com/competitions\" target=\"_blank\"><strong>ArchDaily Competitions</strong></a> — Lista actualizada de concursos mundiales. Filtra por \"open to students\".",
                "link": "https://www.archdaily.com/competitions"
              },
              {
                "ico": "🔗",
                "text": "Bustler.net — El directorio más completo de concursos de arquitectura del mundo. Actualizado semanalmente.",
                "html": "<a href=\"https://www.bustler.net/competitions\" target=\"_blank\"><strong>Bustler.net</strong></a> — El directorio más completo de concursos de arquitectura del mundo. Actualizado semanalmente.",
                "link": "https://www.bustler.net/competitions"
              },
              {
                "ico": "🔗",
                "text": "Young Architects Competitions — Exclusivo para jóvenes y estudiantes.",
                "html": "<a href=\"https://www.youngarchitectscompetitions.com\" target=\"_blank\"><strong>Young Architects Competitions</strong></a> — Exclusivo para jóvenes y estudiantes.",
                "link": "https://www.youngarchitectscompetitions.com"
              }
            ]
          },
          {
            "title": "🇨🇴 Concursos en Colombia",
            "items": [
              {
                "ico": "🏛️",
                "text": "Bienal Colombiana de Arquitectura — Organizada por la Sociedad Colombiana de Arquitectos (SCA). El evento más importante del país. Categoría estudiantes.",
                "html": "<strong>Bienal Colombiana de Arquitectura</strong> — Organizada por la Sociedad Colombiana de Arquitectos (SCA). El evento más importante del país. Categoría estudiantes.",
                "link": null
              },
              {
                "ico": "🏛️",
                "text": "Concurso Nacional de Estudiantes de Arquitectura — Convocatoria anual para universidades colombianas.",
                "html": "<strong>Concurso Nacional de Estudiantes de Arquitectura</strong> — Convocatoria anual para universidades colombianas.",
                "link": null
              }
            ]
          }
        ],
        "tips": {
          "title": "💡 Por qué participar aunque no ganes",
          "items": [
            {
              "ico": "→",
              "text": "Participar te obliga a terminar un proyecto con calidad de presentación. Solo eso ya justifica el esfuerzo."
            },
            {
              "ico": "→",
              "text": "Las bases de un concurso son el mejor ejercicio de lectura de un programa arquitectónico real."
            },
            {
              "ico": "→",
              "text": "Una mención honorífica internacional en tu portafolio pesa enormemente, incluso si no ganaste el primer lugar."
            }
          ]
        },
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "📐",
        "tags": [
          "Estrategia"
        ],
        "title": "Cómo preparar una entrega de concurso",
        "subtitle": "La lámina de concurso es diferente a un plano técnico. Aquí el impacto visual es clave.",
        "res_sections": [
          {
            "title": "📋 Estructura de una entrega típica",
            "items": [
              {
                "ico": "1️⃣",
                "text": "Imagen conceptual: Un render o collage que comunique la idea en un vistazo. Es lo primero que ven los jueces.",
                "html": "<strong>Imagen conceptual:</strong> Un render o collage que comunique la idea en un vistazo. Es lo primero que ven los jueces.",
                "link": null
              },
              {
                "ico": "2️⃣",
                "text": "Planta(s) de arquitectura: con escala, norte, leyenda. Claras y limpias.",
                "html": "<strong>Planta(s) de arquitectura:</strong> con escala, norte, leyenda. Claras y limpias.",
                "link": null
              },
              {
                "ico": "3️⃣",
                "text": "Al menos una sección: que muestre relaciones espaciales interiores.",
                "html": "<strong>Al menos una sección:</strong> que muestre relaciones espaciales interiores.",
                "link": null
              },
              {
                "ico": "4️⃣",
                "text": "Texto del concepto: máximo 100 palabras. Directo, sin relleno.",
                "html": "<strong>Texto del concepto:</strong> máximo 100 palabras. Directo, sin relleno.",
                "link": null
              },
              {
                "ico": "5️⃣",
                "text": "Diagrama/axonometría: La axonometría explotada (exploded axo) es la favorita de los concursos contemporáneos para mostrar sistema constructivo.",
                "html": "<strong>Diagrama/axonometría:</strong> La axonometría explotada (exploded axo) es la favorita de los concursos contemporáneos para mostrar sistema constructivo.",
                "link": null
              }
            ]
          },
          {
            "title": "▶ YouTube",
            "items": [
              {
                "ico": "🇪🇸",
                "text": "Busca \"Lámina de concurso arquitectura\" — tutoriales de composición, tipografía y presentación para concursos.",
                "html": "Busca <strong>\"Lámina de concurso arquitectura\"</strong> — tutoriales de composición, tipografía y presentación para concursos.",
                "link": null
              },
              {
                "ico": "🇬🇧",
                "text": "Busca \"Architecture competition board layout\" — en inglés hay muchísimos tutoriales de composición de láminas ganadoras con análisis de por qué funcionan.",
                "html": "Busca <strong>\"Architecture competition board layout\"</strong> — en inglés hay muchísimos tutoriales de composición de láminas ganadoras con análisis de por qué funcionan.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      }
    ]
  },
  {
    "id": "glosario",
    "phase_num": "Glosario",
    "title": "Glosario de términos esenciales",
    "subtitle": "Los términos que vas a escuchar en obra, en el estudio y en clase desde el primer día.",
    "cards": [
      {
        "icon": "",
        "tags": [],
        "title": "",
        "subtitle": "",
        "res_sections": [],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "",
        "tags": [],
        "title": "",
        "subtitle": "",
        "res_sections": [],
        "tips": null,
        "callouts": [],
        "timeline": []
      }
    ]
  },
  {
    "id": "recursos",
    "phase_num": "Recursos",
    "title": "Biblioteca maestra de recursos",
    "subtitle": "Todos los libros, canales, webs y herramientas mencionados en este road map, organizados en un solo lugar.",
    "cards": [
      {
        "icon": "📚",
        "tags": [
          "Libros"
        ],
        "title": "Los 10 libros que todo arquitecto debe tener",
        "subtitle": "Ordenados por prioridad. Los primeros 3 son absolutamente imprescindibles.",
        "res_sections": [],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "▶️",
        "tags": [
          "YouTube"
        ],
        "title": "Todos los canales de YouTube recomendados",
        "subtitle": "Los mejores canales gratuitos para aprender arquitectura, ordenados por idioma y tema.",
        "res_sections": [
          {
            "title": "🇪🇸 En español — Historia y cultura",
            "items": [
              {
                "ico": "⭐",
                "text": "Arquisemana — Historia, proyectos, cultura. El canal de referencia en español.",
                "html": "<strong>Arquisemana</strong> — Historia, proyectos, cultura. El canal de referencia en español.",
                "link": null
              },
              {
                "ico": "✓",
                "text": "ArquiTerrazas — Conceptos básicos, análisis de proyectos para principiantes.",
                "html": "<strong>ArquiTerrazas</strong> — Conceptos básicos, análisis de proyectos para principiantes.",
                "link": null
              },
              {
                "ico": "✓",
                "text": "Canal UNAM — Clases universitarias completas y gratuitas. Geometría, historia, diseño.",
                "html": "<strong>Canal UNAM</strong> — Clases universitarias completas y gratuitas. Geometría, historia, diseño.",
                "link": null
              }
            ]
          },
          {
            "title": "🇪🇸 En español — Software y técnica",
            "items": [
              {
                "ico": "⭐",
                "text": "CADe SIFO — AutoCAD desde cero. El mejor canal en español para CAD.",
                "html": "<strong>CADe SIFO</strong> — AutoCAD desde cero. El mejor canal en español para CAD.",
                "link": null
              },
              {
                "ico": "⭐",
                "text": "BIM Master — Revit desde cero. Muy completo y actualizado.",
                "html": "<strong>BIM Master</strong> — Revit desde cero. Muy completo y actualizado.",
                "link": null
              },
              {
                "ico": "✓",
                "text": "El Mundo del BIM — AutoCAD, Revit, BIM con enfoque profesional.",
                "html": "<strong>El Mundo del BIM</strong> — AutoCAD, Revit, BIM con enfoque profesional.",
                "link": null
              },
              {
                "ico": "✓",
                "text": "Revit desde Cero — Canal dedicado exclusivamente a Revit en español.",
                "html": "<strong>Revit desde Cero</strong> — Canal dedicado exclusivamente a Revit en español.",
                "link": null
              },
              {
                "ico": "✓",
                "text": "Canal oficial SketchUp ES — Tutoriales de SketchUp directamente del fabricante.",
                "html": "<strong>Canal oficial SketchUp ES</strong> — Tutoriales de SketchUp directamente del fabricante.",
                "link": null
              },
              {
                "ico": "✓",
                "text": "Canal oficial Lumion ES — Renders en Lumion paso a paso.",
                "html": "<strong>Canal oficial Lumion ES</strong> — Renders en Lumion paso a paso.",
                "link": null
              }
            ]
          },
          {
            "title": "🇪🇸 En español — Diseño y proceso",
            "items": [
              {
                "ico": "⭐",
                "text": "Borromini Arquitectura — Muestra el proceso real de diseño. Muy valioso.",
                "html": "<strong>Borromini Arquitectura</strong> — Muestra el proceso real de diseño. Muy valioso.",
                "link": null
              },
              {
                "ico": "✓",
                "text": "MasArquitectura — Proceso de diseño y análisis de proyectos en español.",
                "html": "<strong>MasArquitectura</strong> — Proceso de diseño y análisis de proyectos en español.",
                "link": null
              }
            ]
          },
          {
            "title": "🇬🇧 En inglés (con subtítulos disponibles)",
            "items": [
              {
                "ico": "⭐",
                "text": "30X40 Design Workshop — El MEJOR canal de arquitectura del mundo para pensar como arquitecto. Proceso, negocio, vida real. IMPERDIBLE.",
                "html": "<strong>30X40 Design Workshop</strong> — El MEJOR canal de arquitectura del mundo para pensar como arquitecto. Proceso, negocio, vida real. IMPERDIBLE.",
                "link": null
              },
              {
                "ico": "⭐",
                "text": "The B1M — Documentales de construcción y arquitectura de alta producción.",
                "html": "<strong>The B1M</strong> — Documentales de construcción y arquitectura de alta producción.",
                "link": null
              },
              {
                "ico": "✓",
                "text": "ArchDaily — Proyectos contemporáneos con análisis.",
                "html": "<strong>ArchDaily</strong> — Proyectos contemporáneos con análisis.",
                "link": null
              },
              {
                "ico": "✓",
                "text": "MADE Architecture — Proceso de diseño y sketching.",
                "html": "<strong>MADE Architecture</strong> — Proceso de diseño y sketching.",
                "link": null
              },
              {
                "ico": "✓",
                "text": "Architecture School — Vida del estudiante y el arquitecto.",
                "html": "<strong>Architecture School</strong> — Vida del estudiante y el arquitecto.",
                "link": null
              },
              {
                "ico": "✓",
                "text": "The Efficient Engineer — Estructuras y materiales con animaciones excepcionales.",
                "html": "<strong>The Efficient Engineer</strong> — Estructuras y materiales con animaciones excepcionales.",
                "link": null
              },
              {
                "ico": "✓",
                "text": "Practical Engineering — Ingeniería y construcción de forma visual.",
                "html": "<strong>Practical Engineering</strong> — Ingeniería y construcción de forma visual.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "🌐",
        "tags": [
          "Webs"
        ],
        "title": "Webs y plataformas esenciales",
        "subtitle": "Los sitios que debes visitar regularmente como arquitecto.",
        "res_sections": [
          {
            "title": "🏛️ Arquitectura y referentes",
            "items": [
              {
                "ico": "⭐",
                "text": "ArchDaily.com — El portal de arquitectura más visitado del mundo. Proyectos, noticias, concursos. Gratis.",
                "html": "<a href=\"https://www.archdaily.com\" target=\"_blank\"><strong>ArchDaily.com</strong></a> — El portal de arquitectura más visitado del mundo. Proyectos, noticias, concursos. Gratis.",
                "link": "https://www.archdaily.com"
              },
              {
                "ico": "✓",
                "text": "Dezeen.com — Arquitectura, diseño e interiorismo contemporáneo.",
                "html": "<a href=\"https://www.dezeen.com\" target=\"_blank\"><strong>Dezeen.com</strong></a> — Arquitectura, diseño e interiorismo contemporáneo.",
                "link": "https://www.dezeen.com"
              },
              {
                "ico": "✓",
                "text": "Divisare.com — El mejor repositorio de fotografía de arquitectura. Inspiración visual pura.",
                "html": "<a href=\"https://www.divisare.com\" target=\"_blank\"><strong>Divisare.com</strong></a> — El mejor repositorio de fotografía de arquitectura. Inspiración visual pura.",
                "link": "https://www.divisare.com"
              }
            ]
          },
          {
            "title": "💻 Software y educación",
            "items": [
              {
                "ico": "🎓",
                "text": "Autodesk Education — AutoCAD, Revit, 3ds Max gratis para estudiantes.",
                "html": "<a href=\"https://www.autodesk.com/education/edu-software\" target=\"_blank\"><strong>Autodesk Education</strong></a> — AutoCAD, Revit, 3ds Max gratis para estudiantes.",
                "link": "https://www.autodesk.com/education/edu-software"
              },
              {
                "ico": "🆓",
                "text": "SketchUp Free — SketchUp en el navegador, gratis.",
                "html": "<a href=\"https://app.sketchup.com\" target=\"_blank\"><strong>SketchUp Free</strong></a> — SketchUp en el navegador, gratis.",
                "link": "https://app.sketchup.com"
              },
              {
                "ico": "💲",
                "text": "Udemy.com — Cursos de Revit, AutoCAD, Lumion desde $10 en descuento.",
                "html": "<a href=\"https://www.udemy.com\" target=\"_blank\"><strong>Udemy.com</strong></a> — Cursos de Revit, AutoCAD, Lumion desde $10 en descuento.",
                "link": "https://www.udemy.com"
              },
              {
                "ico": "🎓",
                "text": "Coursera.org — Cursos universitarios de arquitectura con certificado internacional.",
                "html": "<a href=\"https://www.coursera.org\" target=\"_blank\"><strong>Coursera.org</strong></a> — Cursos universitarios de arquitectura con certificado internacional.",
                "link": "https://www.coursera.org"
              }
            ]
          },
          {
            "title": "🇨🇴 Colombia específico",
            "items": [
              {
                "ico": "📜",
                "text": "COPNIA.gov.co — Consejo Profesional. Matrícula profesional obligatoria para ejercer.",
                "html": "<a href=\"https://copnia.gov.co\" target=\"_blank\"><strong>COPNIA.gov.co</strong></a> — Consejo Profesional. Matrícula profesional obligatoria para ejercer.",
                "link": "https://copnia.gov.co"
              },
              {
                "ico": "🏗️",
                "text": "CAMACOL.co — Cámara Colombiana de la Construcción. Índices de costos y normativa.",
                "html": "<a href=\"https://camacol.co\" target=\"_blank\"><strong>CAMACOL.co</strong></a> — Cámara Colombiana de la Construcción. Índices de costos y normativa.",
                "link": "https://camacol.co"
              },
              {
                "ico": "🏛️",
                "text": "SCA.org.co — Sociedad Colombiana de Arquitectos. Bienal, concursos y gremio.",
                "html": "<a href=\"https://sca.org.co\" target=\"_blank\"><strong>SCA.org.co</strong></a> — Sociedad Colombiana de Arquitectos. Bienal, concursos y gremio.",
                "link": "https://sca.org.co"
              }
            ]
          },
          {
            "title": "📁 Portafolio y comunidad",
            "items": [
              {
                "ico": "🔗",
                "text": "Behance.net — Publica y comparte tu portafolio. Gratis.",
                "html": "<a href=\"https://www.behance.net\" target=\"_blank\"><strong>Behance.net</strong></a> — Publica y comparte tu portafolio. Gratis.",
                "link": "https://www.behance.net"
              },
              {
                "ico": "🔗",
                "text": "Issuu.com — Portafolio PDF como revista online. Comparte por link.",
                "html": "<a href=\"https://issuu.com\" target=\"_blank\"><strong>Issuu.com</strong></a> — Portafolio PDF como revista online. Comparte por link.",
                "link": "https://issuu.com"
              },
              {
                "ico": "🔗",
                "text": "Archinect.com — Comunidad y portafolios de arquitectos de todo el mundo.",
                "html": "<a href=\"https://archinect.com\" target=\"_blank\"><strong>Archinect.com</strong></a> — Comunidad y portafolios de arquitectos de todo el mundo.",
                "link": "https://archinect.com"
              },
              {
                "ico": "🔗",
                "text": "Bustler.net — Directorio completo de concursos de arquitectura.",
                "html": "<a href=\"https://www.bustler.net/competitions\" target=\"_blank\"><strong>Bustler.net</strong></a> — Directorio completo de concursos de arquitectura.",
                "link": "https://www.bustler.net/competitions"
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      },
      {
        "icon": "🛠️",
        "tags": [
          "Software"
        ],
        "title": "Mapa completo de software por etapa",
        "subtitle": "Qué herramienta usar en cada momento del proceso, de menor a mayor complejidad.",
        "res_sections": [
          {
            "title": "📐 Dibujo y planos 2D",
            "items": [
              {
                "ico": "1",
                "text": "AutoCAD — Estándar industria. Versión educativa gratis. Imprescindible.",
                "html": "<strong>AutoCAD</strong> — Estándar industria. Versión educativa gratis. Imprescindible.",
                "link": null
              },
              {
                "ico": "2",
                "text": "DraftSight — Alternativa gratuita a AutoCAD. Sin registro universitario.",
                "html": "<strong>DraftSight</strong> — Alternativa gratuita a AutoCAD. Sin registro universitario.",
                "link": null
              },
              {
                "ico": "3",
                "text": "LibreCAD — Open source, gratis para siempre. Básico pero funcional.",
                "html": "<strong>LibreCAD</strong> — Open source, gratis para siempre. Básico pero funcional.",
                "link": null
              }
            ]
          },
          {
            "title": "🏗️ Modelado 3D",
            "items": [
              {
                "ico": "1",
                "text": "SketchUp Free — El más fácil. En el navegador. Para empezar en 3D.",
                "html": "<strong>SketchUp Free</strong> — El más fácil. En el navegador. Para empezar en 3D.",
                "link": null
              },
              {
                "ico": "2",
                "text": "Revit — BIM completo. Gratis educación. Para proyectos reales.",
                "html": "<strong>Revit</strong> — BIM completo. Gratis educación. Para proyectos reales.",
                "link": null
              },
              {
                "ico": "3",
                "text": "3ds Max — Modelado avanzado y rendering con V-Ray. Gratis educación.",
                "html": "<strong>3ds Max</strong> — Modelado avanzado y rendering con V-Ray. Gratis educación.",
                "link": null
              },
              {
                "ico": "4",
                "text": "Rhino + Grasshopper — Modelado paramétrico y formas complejas. Nivel avanzado.",
                "html": "<strong>Rhino + Grasshopper</strong> — Modelado paramétrico y formas complejas. Nivel avanzado.",
                "link": null
              }
            ]
          },
          {
            "title": "🎬 Visualización y renders",
            "items": [
              {
                "ico": "1",
                "text": "Lumion — El más fácil. Trial 14 días. Ideal para empezar con renders.",
                "html": "<strong>Lumion</strong> — El más fácil. Trial 14 días. Ideal para empezar con renders.",
                "link": null
              },
              {
                "ico": "2",
                "text": "Enscape — Tiempo real desde Revit/SketchUp. Trial 14 días.",
                "html": "<strong>Enscape</strong> — Tiempo real desde Revit/SketchUp. Trial 14 días.",
                "link": null
              },
              {
                "ico": "3",
                "text": "V-Ray — El más fotorrealista. Plugin para SketchUp, Revit o 3ds Max.",
                "html": "<strong>V-Ray</strong> — El más fotorrealista. Plugin para SketchUp, Revit o 3ds Max.",
                "link": null
              },
              {
                "ico": "4",
                "text": "Twinmotion — De Epic Games. Gratis para uso educativo. Alternativa a Lumion.",
                "html": "<strong>Twinmotion</strong> — De Epic Games. Gratis para uso educativo. Alternativa a Lumion.",
                "link": null
              }
            ]
          },
          {
            "title": "🎨 Presentación y gráficos",
            "items": [
              {
                "ico": "1",
                "text": "Adobe Photoshop — Post-producción renders, collages. GIMP como alternativa gratis.",
                "html": "<strong>Adobe Photoshop</strong> — Post-producción renders, collages. GIMP como alternativa gratis.",
                "link": null
              },
              {
                "ico": "2",
                "text": "Adobe InDesign — Maquetación de portafolios y láminas. Scribus como alternativa gratis.",
                "html": "<strong>Adobe InDesign</strong> — Maquetación de portafolios y láminas. Scribus como alternativa gratis.",
                "link": null
              },
              {
                "ico": "3",
                "text": "Adobe Illustrator — Diagramas y gráficos vectoriales. Inkscape como alternativa gratis.",
                "html": "<strong>Adobe Illustrator</strong> — Diagramas y gráficos vectoriales. Inkscape como alternativa gratis.",
                "link": null
              },
              {
                "ico": "4",
                "text": "Canva — Para presentaciones rápidas. Gratis. No para portafolios profesionales.",
                "html": "<strong>Canva</strong> — Para presentaciones rápidas. Gratis. No para portafolios profesionales.",
                "link": null
              }
            ]
          }
        ],
        "tips": null,
        "callouts": [],
        "timeline": []
      }
    ]
  }
];

// Checklist items for interactive study tracking
const INITIAL_CHECKLIST = [
  { id: 1, label: "Dominar dibujo a mano y croquis rápido (perspectiva a 1 y 2 puntos)", phase: "Fase 0" },
  { id: 2, label: "Entender escala, proporción áurea y vistas ortogonales (1:50, 1:100)", phase: "Fase 0" },
  { id: 3, label: "Estudiar referentes clave (Salmona, Le Corbusier, Wright, Niemeyer)", phase: "Fase 0" },
  { id: 4, label: "Manejar AutoCAD 2D: plantas, cortes, fachadas, capas y layout de impresión", phase: "Fase 1" },
  { id: 5, label: "Aprender SketchUp: modelado rápido 3D, grupos, componentes y texturas", phase: "Fase 1" },
  { id: 6, label: "Iniciarse en Revit / BIM: muros con capas, niveles, tablas de cantidades", phase: "Fase 1" },
  { id: 7, label: "Diagramación y postproducción con Photoshop / Illustrator / InDesign", phase: "Fase 1" },
  { id: 8, label: "Consultar el Neufert para dimensionamiento antropométrico y programas", phase: "Fase 2" },
  { id: 9, label: "Aplicar proceso proyectual: concepto, partido arquitectónico y zonificación", phase: "Fase 2" },
  { id: 10, label: "Aprender normativa colombiana: NSR-10, POT municipal y curadurías", phase: "Fase 2" },
  { id: 11, label: "Incorporar diseño bioclimático: soleamiento, vientos y confort pasivo", phase: "Fase 2" },
  { id: 12, label: "Dominar renderizado en tiempo real (Lumion / Enscape) con iluminación PBR", phase: "Fase 3" },
  { id: 13, label: "Armar portafolio profesional en PDF y publicarlo en Behance / Issuu", phase: "Fase 3" },
  { id: 14, label: "Experimentar con IA en arquitectura (Midjourney, Krea) para concept art", phase: "Fase 3" },
  { id: 15, label: "Definir especialización (BIM Manager, ArchViz, Diseño de Interiores)", phase: "Fase 4" },
  { id: 16, label: "Comprender materiales reales: concreto, acero, ladrillo y acabados", phase: "Fase 5" },
  { id: 17, label: "Entender estructuras básicas: cargas, vigas, columnas y sismorresistencia", phase: "Fase 5" },
  { id: 18, label: "Calcular APU básico y presupuestos de cantidades de obra", phase: "Fase 5" },
];

export default function ArchitectureRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [completedItems, setCompletedItems] = useState<Record<number, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_arch_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  const toggleCheck = (id: number) => {
    setCompletedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_arch_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / INITIAL_CHECKLIST.length) * 100);

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "fase0", label: "🏛️ Fase 0: Fundamentos", icon: Landmark },
    { id: "fase1", label: "📐 Fase 1: CAD & BIM", icon: Compass },
    { id: "fase2", label: "🏠 Fase 2: Diseño & Normas", icon: Building2 },
    { id: "fase3", label: "🎬 Fase 3: Renders & Portafolio", icon: Video },
    { id: "fase4", label: "🎓 Fase 4: Carrera & 12M", icon: Briefcase },
    { id: "fase5", label: "🧱 Fase 5: Construcción", icon: HardHat },
    { id: "errores", label: "❌ 10 Errores a Evitar", icon: AlertOctagon },
    { id: "concursos", label: "🏆 Concursos", icon: Trophy },
    { id: "glosario", label: "📖 Glosario Esencial", icon: BookMarked },
    { id: "recursos", label: "📚 Biblioteca Maestra", icon: BookOpen },
    { id: "checklist", label: "✅ Checklist de Hitos", icon: CheckSquare },
  ];

  // Helper color mappings for badges & sections
  const getPhaseHeaderStyle = (id: string) => {
    switch (id) {
      case "fase0":
        return {
          badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
          title: "text-emerald-300",
          accent: "from-emerald-500/10 to-teal-500/5",
        };
      case "fase1":
        return {
          badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
          title: "text-blue-300",
          accent: "from-blue-500/10 to-cyan-500/5",
        };
      case "fase2":
        return {
          badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
          title: "text-amber-300",
          accent: "from-amber-500/10 to-orange-500/5",
        };
      case "fase3":
        return {
          badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
          title: "text-purple-300",
          accent: "from-purple-500/10 to-pink-500/5",
        };
      case "fase4":
        return {
          badge: "bg-rose-500/20 text-rose-300 border-rose-500/40",
          title: "text-rose-300",
          accent: "from-rose-500/10 to-red-500/5",
        };
      case "fase5":
        return {
          badge: "bg-teal-500/20 text-teal-300 border-teal-500/40",
          title: "text-teal-300",
          accent: "from-teal-500/10 to-emerald-500/5",
        };
      case "errores":
        return {
          badge: "bg-red-500/20 text-red-300 border-red-500/40",
          title: "text-red-300",
          accent: "from-red-500/10 to-orange-500/5",
        };
      case "concursos":
        return {
          badge: "bg-sky-500/20 text-sky-300 border-sky-500/40",
          title: "text-sky-300",
          accent: "from-sky-500/10 to-blue-500/5",
        };
      case "glosario":
        return {
          badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
          title: "text-indigo-300",
          accent: "from-indigo-500/10 to-violet-500/5",
        };
      case "recursos":
      default:
        return {
          badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
          title: "text-purple-300",
          accent: "from-purple-500/10 to-indigo-500/5",
        };
    }
  };

  const getTagStyle = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes("youtube") || t.includes("yt")) {
      return "bg-rose-500/20 text-rose-300 border-rose-500/30";
    }
    if (t.includes("libro") || t.includes("teoría") || t.includes("neufert")) {
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    }
    if (t.includes("software") || t.includes("bim") || t.includes("cad")) {
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    }
    if (t.includes("colombia") || t.includes("legal") || t.includes("nsr-10")) {
      return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    }
    if (t.includes("portafolio") || t.includes("carrera") || t.includes("plan")) {
      return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    }
    if (t.includes("ia") || t.includes("tendencia") || t.includes("nuevo")) {
      return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    }
    return "bg-white/10 text-white/80 border-white/15";
  };

  // Filter sections based on active tab and search query
  const filteredSections = useMemo(() => {
    return SECTIONS_DATA.filter((sec) => {
      // Tab matching
      if (activeSubTab !== "all" && activeSubTab !== "checklist" && sec.id !== activeSubTab) {
        return false;
      }
      // Search matching
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchSectionTitle = sec.title.toLowerCase().includes(q) || sec.subtitle.toLowerCase().includes(q);
      const matchCards = sec.cards.some((c) => {
        return (
          c.title.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)) ||
          c.res_sections.some((r) =>
            r.title.toLowerCase().includes(q) ||
            r.items.some((i) => i.text.toLowerCase().includes(q))
          ) ||
          (c.tips && c.tips.items.some((tip) => tip.text.toLowerCase().includes(q))) ||
          c.callouts.some((call) => call.text.toLowerCase().includes(q)) ||
          c.timeline.some((tl) => tl.text.toLowerCase().includes(q) || tl.period.toLowerCase().includes(q))
        );
      });
      return matchSectionTitle || matchCards;
    });
  }, [activeSubTab, searchQuery]);

  return (
    <div className="w-full space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950/60 via-slate-900/90 to-black border border-purple-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(147,51,234,0.15)]">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-semibold tracking-wide">
              <Landmark className="w-3.5 h-3.5 text-purple-400" />
              Ruta Integral · Arquitectura Desde Cero
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
              🇨🇴 Normativa Colombia: NSR-10 · POT · COPNIA · SCA
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white flex flex-wrap items-baseline gap-2">
              Aprende <span className="text-purple-400 italic font-serif">Arquitectura</span> desde cero
            </h1>
            <p className="text-purple-200/70 text-sm sm:text-base max-w-3xl leading-relaxed">
              Guía maestra estructurada paso a paso: qué estudiar, en qué orden, qué software dominar (CAD, BIM, Renders), libros esenciales, canales de YouTube, normativa colombiana y cómo construir un portafolio profesional de alto impacto.
            </p>
          </div>

          {/* Key Metric Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-300 font-mono">9</span>
              <span className="text-xs text-purple-200/60 font-medium">Fases & Módulos</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-300 font-mono">28</span>
              <span className="text-xs text-purple-200/60 font-medium">Temas Clave</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">100+</span>
              <span className="text-xs text-purple-200/60 font-medium">Recursos & Trucos</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">12</span>
              <span className="text-xs text-purple-200/60 font-medium">Meses al Portafolio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="w-full flex flex-wrap items-center justify-center gap-2">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer border select-none ${
                isActive
                  ? "bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.35)] scale-102"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-purple-400"}`} />
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Live Search & Quick Filter Bar */}
      <div className="relative w-full max-w-xl mx-auto">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-4 h-4 text-purple-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por software (AutoCAD, Revit), tema (NSR-10, Neufert), libro o término..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/5 border border-purple-500/20 text-white placeholder-purple-300/40 text-xs sm:text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 px-2 py-1 text-xs text-purple-300 hover:text-white bg-white/10 rounded-lg cursor-pointer"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Interactive Checklist View */}
      {(activeSubTab === "checklist" || activeSubTab === "all") && (
        <div className="rounded-3xl bg-slate-900/60 border border-purple-500/30 p-6 sm:p-8 backdrop-blur-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
                <CheckSquare className="w-4 h-4 text-purple-400" />
                Seguimiento de Aprendizaje
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Checklist de Hitos Arquitectónicos
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/60">
                Marca cada habilidad y concepto a medida que los domines en tu camino
              </p>
            </div>

            <div className="flex items-center gap-3 bg-purple-950/40 border border-purple-500/30 px-4 py-2 rounded-2xl">
              <div className="text-right">
                <div className="text-xs text-purple-300 font-medium">Progreso</div>
                <div className="text-base font-bold text-white font-mono">
                  {completedCount} / {INITIAL_CHECKLIST.length} ({progressPercent}%)
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-purple-500/30 flex items-center justify-center relative">
                <Sparkles className="w-5 h-5 text-purple-300" />
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Checklist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
            {INITIAL_CHECKLIST.map((item) => {
              const isChecked = Boolean(completedItems[item.id]);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    isChecked
                      ? "bg-purple-950/40 border-purple-400/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                      : "bg-white/5 border-purple-500/15 text-purple-200/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    ) : (
                      <Square className="w-4 h-4 text-purple-400/40" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-purple-300 mr-2">
                      {item.phase}
                    </span>
                    <span className={`text-xs sm:text-sm ${isChecked ? "line-through text-purple-200/50" : ""}`}>
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Roadmap Sections Render */}
      {activeSubTab !== "checklist" && (
        <div className="space-y-12">
          {filteredSections.map((sec) => {
            const style = getPhaseHeaderStyle(sec.id);

            return (
              <section
                key={sec.id}
                id={sec.id}
                className="space-y-6 pt-4"
              >
                {/* Phase Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-purple-500/20 pb-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${style.badge}`}>
                        {sec.phase_num || sec.id}
                      </span>
                      <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${style.title}`}>
                        {sec.title}
                      </h2>
                    </div>
                    {sec.subtitle && (
                      <p className="text-xs sm:text-sm text-purple-200/70 max-w-3xl leading-relaxed">
                        {sec.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {sec.cards.map((card, cIdx) => {
                    const hasTitle = Boolean(card.title && card.title.trim());

                    return (
                      <div
                        key={cIdx}
                        className={`rounded-3xl bg-slate-900/60 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between space-y-4 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] ${
                          !hasTitle ? "md:col-span-1" : ""
                        }`}
                      >
                        <div className="space-y-4">
                          {/* Card Header */}
                          {hasTitle && (
                            <div className="space-y-2.5">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                  {card.icon && (
                                    <span className="text-xl sm:text-2xl p-2 rounded-2xl bg-white/5 border border-white/10 flex-shrink-0">
                                      {card.icon}
                                    </span>
                                  )}
                                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                                    {card.title}
                                  </h3>
                                </div>
                              </div>

                              {card.tags && card.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                  {card.tags.map((tag, tIdx) => (
                                    <span
                                      key={tIdx}
                                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getTagStyle(tag)}`}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {card.subtitle && (
                                <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed pt-1">
                                  {card.subtitle}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Resource Sections */}
                          {card.res_sections && card.res_sections.length > 0 && (
                            <div className="space-y-3.5 pt-1">
                              {card.res_sections.map((resSec, rIdx) => (
                                <div key={rIdx} className="space-y-2">
                                  {resSec.title && (
                                    <div className="text-xs font-bold uppercase tracking-wider text-purple-300/80 flex items-center gap-2 border-b border-white/10 pb-1">
                                      <span>{resSec.title}</span>
                                    </div>
                                  )}
                                  <ul className="space-y-2 text-xs sm:text-sm text-purple-100/80">
                                    {resSec.items.map((item, iIdx) => (
                                      <li key={iIdx} className="flex items-start gap-2.5 leading-relaxed">
                                        <span className="text-purple-400 font-mono flex-shrink-0 text-xs mt-0.5">
                                          {item.ico || "•"}
                                        </span>
                                        <div className="flex-1">
                                          {item.link ? (
                                            <a
                                              href={item.link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-purple-300 hover:text-white underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
                                            >
                                              <span>{item.text}</span>
                                              <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-70" />
                                            </a>
                                          ) : (
                                            <span>{item.text}</span>
                                          )}
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Timeline if any */}
                          {card.timeline && card.timeline.length > 0 && (
                            <div className="space-y-2.5 pt-2 border-t border-white/10">
                              <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Cronograma Mes a Mes</span>
                              </div>
                              <div className="space-y-2">
                                {card.timeline.map((tl, tlIdx) => (
                                  <div key={tlIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                                    <span className="font-mono text-[11px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-lg flex-shrink-0 mt-0.5">
                                      {tl.period}
                                    </span>
                                    <span className="text-purple-100/90 leading-relaxed">
                                      {tl.text}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tips Block */}
                          {card.tips && card.tips.items && card.tips.items.length > 0 && (
                            <div className="rounded-2xl bg-emerald-950/30 border border-emerald-500/30 p-3.5 space-y-2 text-xs sm:text-sm">
                              <div className="font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                                <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                                <span>{card.tips.title}</span>
                              </div>
                              <ul className="space-y-1.5 text-emerald-100/80">
                                {card.tips.items.map((tip, tipIdx) => (
                                  <li key={tipIdx} className="flex items-start gap-2">
                                    <span className="text-emerald-400 flex-shrink-0">{tip.ico || "✓"}</span>
                                    <span>{tip.text}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Callouts */}
                          {card.callouts && card.callouts.length > 0 && (
                            <div className="space-y-2 pt-1">
                              {card.callouts.map((call, clIdx) => {
                                const isWarn = call.type.includes("warn");
                                const isOk = call.type.includes("ok");
                                return (
                                  <div
                                    key={clIdx}
                                    className={`rounded-2xl p-3 text-xs sm:text-sm flex items-start gap-2.5 border ${
                                      isWarn
                                        ? "bg-amber-950/30 border-amber-500/40 text-amber-200"
                                        : isOk
                                        ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                                        : "bg-blue-950/30 border-blue-500/40 text-blue-200"
                                    }`}
                                  >
                                    {isWarn ? (
                                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                    ) : (
                                      <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                    )}
                                    <span className="leading-relaxed">{call.text}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
