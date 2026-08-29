"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  Sparkles,
  BookOpen,
  Microscope,
  Stethoscope,
  Brain,
  CheckCircle2,
  Square,
  Compass,
  Zap,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function MedicineRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_medicine_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({ "med-f1": true, "med-f2": true });

  const toggleChecklist = (id: string) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_medicine_checklist", JSON.stringify(updated));
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
    { id: "basicas", label: "🔬 Ciencias Básicas", icon: Microscope },
    { id: "clinica", label: "🩺 Clínica & Semiología", icon: Stethoscope },
    { id: "especialidades", label: "🫀 Especialidades Médicas", icon: HeartPulse },
    { id: "metodologia", label: "🧠 Métodos & Anki", icon: Brain },
    { id: "youtube", label: "▶️ Canales YouTube", icon: YouTubeIcon },
    { id: "libros", label: "📚 Bibliografía Esencial", icon: BookOpen },
    { id: "trucos", label: "⚡ 12 Trucos & Mnemotécnicos", icon: Zap },
    { id: "faq", label: "💡 Preguntas Frecuentes", icon: HelpCircle },
    { id: "plan", label: "🎯 Checklist de Estudio", icon: CheckCircle2 },
  ];

  const phases = [
    {
      id: "med-f1",
      num: "Fase 01",
      duration: "⏱ 3–6 meses",
      title: "Pre-Médico & Cimientos Científicos",
      color: "from-teal-500/20 to-cyan-500/10 border-teal-500/40 text-teal-300",
      badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      desc: "Bases biológicas, químicas y físicas indispensables antes de entrar de lleno a la anatomía y fisiología.",
      topics: [
        "Biología celular: organelos, membrana, replicación y ciclo celular",
        "Química general e inorgánica: enlaces, estequiometría, pH y soluciones",
        "Química orgánica médica: grupos funcionales, biomoléculas y carbohidratos",
        "Física y biofísica médica: presión, fluidos, potenciales eléctricos y óptica",
        "Bioestadística médica y método científico",
      ],
    },
    {
      id: "med-f2",
      num: "Fase 02",
      duration: "⏱ 12–18 meses",
      title: "Ciencias Básicas I (Estructura y Moléculas)",
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/40 text-blue-300",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      desc: "El mapa físico y microscópico del cuerpo humano: anatomía descriptiva y topográfica, histología, embriología y bioquímica.",
      topics: [
        "Anatomía Humana completa: Osteología, Miología, Neuroanatomía y Órganos",
        "Histología & Citología: Tejidos epitelial, conjuntivo, muscular y nervioso",
        "Embriología Humana: Desarrollo de las 3 capas germinales y organogénesis",
        "Bioquímica Médica: Glucólisis, Ciclo de Krebs, Cadena respiratoria y Lípidos",
        "Genética médica y biología molecular: mutaciones y síntesis proteica",
      ],
    },
    {
      id: "med-f3",
      num: "Fase 03",
      duration: "⏱ 12–18 meses",
      title: "Ciencias Básicas II (Función, Patógenos y Fármacos)",
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-300",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      desc: "Cómo funciona el cuerpo sano, cómo reacciona al daño y cómo actúan los medicamentos para restaurar el equilibrio.",
      topics: [
        "Fisiología Médica (Guyton & Hall): Cardiovascular, Renal, Respiratorio, Endocrino y SNC",
        "Microbiología: Bacteriología (Gram+/-), Virología (VIH, Hepatitis), Micología y Parásitos",
        "Inmunología Médica: Inmunidad innata, adaptativa (Linfocitos T/B, anticuerpos) y autoinmunidad",
        "Farmacología General: Farmacocinética (ADME) y Farmacodinamia (Receptores)",
        "Patología General: Lesión celular, necrosis, apoptosis, inflamación y neoplasias (TNM)",
      ],
    },
    {
      id: "med-f4",
      num: "Fase 04",
      duration: "⏱ 12–18 meses",
      title: "Clínica Básica & Semiología",
      color: "from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-300",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      desc: "El arte del examen físico, la historia clínica, la interpretación de análisis de laboratorio e imagenología médica.",
      topics: [
        "Semiología Médica (Argente & Álvarez): Anamnesis, examen físico y regla SOCRATES",
        "Patología Sistémica por órganos y sistemas",
        "Farmacología Clínica aplicada a patologías",
        "Laboratorio Clínico: Hemograma, química sanguínea, electrolitos y gases arteriales",
        "Imagenología básica: Lectura sistemática de Radiografía de tórax, Ecografía y Tomografía (TC)",
        "Electrocardiograma (ECG): Ritmo, eje, hipertrofias, isquemia y arritmias",
      ],
    },
    {
      id: "med-f5",
      num: "Fase 05",
      duration: "⏱ 18–24 meses",
      title: "Especialidades Clínicas Mayores",
      color: "from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-300",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      desc: "Las grandes disciplinas de la medicina práctica del adulto, la mujer, el niño y las emergencias médicas.",
      topics: [
        "Medicina Interna (Harrison's): Cardiología, Neumología, Nefrología, Endocrinología, Gastro, Reuma e Infecto",
        "Cirugía General (Schwartz): Abdomen agudo, hernias, trauma (ATLS) y manejo perioperatorio",
        "Pediatría (Nelson): Crecimiento y desarrollo, neonatología, vacunas y patología pediátrica",
        "Ginecología & Obstetricia (Williams): Control prenatal, parto, preeclampsia y patología ginecológica",
        "Neurología & Psiquiatría: ACV, epilepsia, demencias, depresión, psicosis y trastornos afectivos",
        "Urgencias & Cuidados Críticos: RCP (BLS/ACLS), manejo de shock e intoxicaciones",
      ],
    },
    {
      id: "med-f6",
      num: "Fase 06",
      duration: "⏱ Toda la vida",
      title: "Práctica Clínica, Evidencia & Residencia",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      desc: "Medicina basada en evidencia, lectura crítica de ensayos clínicos, ética médica y actualización continua.",
      topics: [
        "Medicina Basada en Evidencia (MBE): Niveles de evidencia, guías clínicas y metaanálisis",
        "Epidemiología clínica y bioética médica",
        "Preparación para exámenes de residencia médica (USMLE Step 1/2, MIR, Exámenes nacionales)",
        "Razonamiento diagnóstico diferencial complejo y toma de decisiones éticas",
      ],
    },
  ];

  const basicSciences = [
    {
      title: "🦴 Anatomía Humana (Netter & Gray)",
      desc: "El mapa completo del cuerpo: 206 huesos, músculos (origen/inserción/inervación), irrigación vascular, sistema nervioso central y periférico, anatomía topográfica y de superficie.",
      tip: "Estudia por sistemas primero y luego por regiones anatómicas con atlas visuales y modelos 3D.",
    },
    {
      title: "⚡ Fisiología Médica (Guyton & Hall)",
      desc: "La ciencia del funcionamiento normal: potencial de acción, ciclo cardíaco, gasto cardíaco, filtración renal, mecánica respiratoria, regulación endocrina y equilibrio ácido-base.",
      tip: "Pregúntate siempre: '¿Qué pasaría si este mecanismo de feedback falla?' Eso te lleva directo a la enfermedad.",
    },
    {
      title: "🔬 Bioquímica Médica (Harper & Lehninger)",
      desc: "Glucólisis, ciclo de Krebs, fosforilación oxidativa, beta-oxidación de ácidos grasos, ciclo de la urea, síntesis proteica e integración metabólica en ayuno y diabetes.",
      tip: "Conecta cada ruta metabólica con una patología real (ej. cetoacidosis en diabetes tipo 1).",
    },
    {
      title: "🔭 Histología & Citología (Junqueira & Ross)",
      desc: "Estructura microscópica: tejidos epitelial, conjuntivo, muscular y nervioso; histología de cada órgano y reconocimiento de preparados en microscopía virtual.",
      tip: "Identifica los 3 elementos clave que distinguen cada tejido antes de memorizar descripciones.",
    },
    {
      title: "🦠 Microbiología & Inmunología (Murray & Abbas)",
      desc: "Bacterias Gram positivas y negativas, virus de ADN/ARN, hongos y parásitos. Sistema inmune innato, adaptativo (Linfocitos T CD4/CD8, anticuerpos), hipersensibilidades y vacunas.",
      tip: "Crea una tabla con: Microorganismo | Morfología | Virulencia | Enfermedad | Antibiótico de elección.",
    },
    {
      title: "💊 Farmacología Médica (Goodman & Gilman / Katzung)",
      desc: "Farmacocinética (ADME, vida media, clearance), Farmacodinamia (receptores agonistas/antagonistas) y familias de fármacos: antihipertensivos, antibióticos, analgésicos y psicofármacos.",
      tip: "Aprende el mecanismo de acción; los efectos secundarios se deducen directamente de exagerar ese mecanismo.",
    },
  ];

  const clinicalSkills = [
    {
      title: "🩺 Semiología & Historia Clínica (Argente & Álvarez)",
      desc: "El arte de interrogar y examinar al paciente. Anamnesis completa, antecedentes, revisión por sistemas y los 4 pilares: Inspección, Palpación, Percusión y Auscultación.",
    },
    {
      title: "🎯 Regla SOCRATES para Evaluar el Dolor",
      desc: "Site (Sitio), Onset (Inicio), Character (Carácter/tipo), Radiation (Irradiación), Associated symptoms (Síntomas asociados), Time course (Evolución), Exacerbating factors (Qué lo agrava/alivia), Severity (Intensidad 1-10).",
    },
    {
      title: "🧪 Laboratorio Clínico Sistemático",
      desc: "Interpretación de Hemograma completo (leucocitosis, anemia por VCM/HCM), función renal (Creatinina, BUN), perfil hepático (Transaminasas, Bilirrubinas), electrolitos y gasometría arterial.",
    },
    {
      title: "🫀 Lectura Sistemática del Electrocardiograma (ECG)",
      desc: "1. Frecuencia cardíaca · 2. Ritmo (Sinusal vs Arritmia) · 3. Eje eléctrico · 4. Intervalo PR y bloqueos · 5. Complejo QRS · 6. Segmento ST (Infarto/Isquemia) · 7. Onda T e intervalo QT.",
    },
  ];

  const studyMethods = [
    { name: "🧠 Active Recall", desc: "Cierra el libro tras estudiar y reproduce el esquema de memoria en una hoja en blanco. Es el método número 1 para retención médica a largo plazo." },
    { name: "🃏 Repetición Espaciada con Anki", desc: "El software por excelencia de los estudiantes de medicina. Usa mazos como AnKing o Zanki para repasar cientos de tarjetas en intervalos optimizados." },
    { name: "🗣️ Técnica Feynman", desc: "Explica un concepto médico complejo (ej. insuficiencia cardíaca o el sistema renina-angiotensina) en palabras sencillas como a un familiar sin conocimientos." },
    { name: "🔗 Integración Vertical", desc: "Estudia cada enfermedad en cadena: Anatomía → Fisiología → Fisiopatología → Síntomas → Examen Físico → Tratamiento Farmacológico." },
    { name: "📋 Problem-Based Learning (Casos)", desc: "Lee la presentación de un paciente clínico real antes de estudiar la teoría; contextualizar la información multiplica la capacidad diagnóstica." },
    { name: "⏱️ Rutina de Estudio Eficaz (5h)", desc: "30 min Anki matutino → 2h estudio profundo de materia nueva → 1h Active Recall y esquemas → 1h preguntas clínicas / casos." },
  ];

  const youtubeChannels = [
    { name: "Ninja Nerd", focus: "Fisiología, Farmacología y Bioquímica con pizarras ultra detalladas (Top mundial en inglés)." },
    { name: "Osmosis", focus: "Videos animados de alta calidad sobre patología, medicina interna y fisiopatología clínica." },
    { name: "Dr. Najeeb Lectures", focus: "Clases magistrales legendarias de neuroanatomía, histología, embriología y fisiología." },
    { name: "Armando Hasudungan", focus: "Ilustraciones médicas hechas a mano que explican mecanismos de enfermedad paso a paso." },
    { name: "Geeky Medics", focus: "Videos prácticos de examen físico, habilidades clínicas, auscultación y semiología." },
    { name: "Medicina Interna Online", focus: "Clases magistrales en español sobre cardiología, neumología, nefrología y medicina interna." },
    { name: "Dr. Enrique Méndez", focus: "Farmacología médica explicada de forma clara y amena en español." },
    { name: "Dirty Medicine", focus: "Mnemotécnicos de alto rendimiento y repasos rápidos para exámenes médicos." },
  ];

  const medicalTricks = [
    { num: "01", title: "Estudia la fisiopatología, no listas de síntomas", desc: "Si entiendes por qué falla el corazón o el riñón, los síntomas, signos físicos y el tratamiento farmacológico son consecuencias lógicas." },
    { num: "02", title: "El '¿Y si falla?' para farmacología", desc: "Para deducir efectos adversos: pregúntate qué pasa si el efecto terapéutico del medicamento se exagera o actúa en un tejido adyacente." },
    { num: "03", title: "Mnemotécnico AEIOU para diagnósticos diferenciales", desc: "A = Autoinmune · E = Endocrino · I = Infeccioso · O = Oncológico · U = Uremia (tóxico/metabólico). Aplica a casi cualquier síntoma sin causa aparente." },
    { num: "04", title: "MUDPILES para Acidosis Metabólica con Anion Gap alto", desc: "Metanol, Uremia, Diabetes (CAD), Propilenglicol, Isoniazida/Hierro, Lactato, Etilenglicol, Salicilatos." },
    { num: "05", title: "FAST para Reconocimiento de ACV / Ictus", desc: "Face (parálisis facial), Arm (debilidad en un brazo), Speech (dificultad al hablar), Time (tiempo urgente de llamar a emergencias)." },
    { num: "06", title: "Dibuja de memoria en vez de copiar", desc: "Cierra el libro de anatomía o fisiología y dibuja el circuito o la estructura. Cada fallo es una neurona conectando conocimiento real." },
  ];

  const checklistItems = [
    { id: "med_cell_bio", label: "Dominar bases de biología celular y bioquímica básica", stage: "Fase 1" },
    { id: "med_anatomy_netter", label: "Comprender osteología, miología y neuroanatomía en atlas Netter", stage: "Fase 2" },
    { id: "med_physio_guyton", label: "Dominar fisiología cardiovascular, respiratoria y renal en Guyton", stage: "Fase 3" },
    { id: "med_micro_pharm", label: "Crear tablas comparativas de bacterias, virus y familias farmacológicas", stage: "Fase 3" },
    { id: "med_semiology_socrates", label: "Dominar la anamnesis, regla SOCRATES y examen físico sistemático", stage: "Fase 4" },
    { id: "med_ecg_lab", label: "Interpretar electrocardiogramas (ECG) y hemogramas completos", stage: "Fase 4" },
    { id: "med_anki_routine", label: "Mantener una racha diaria de repetición espaciada con Anki", stage: "Continuo" },
    { id: "med_internal_cases", label: "Resolver casos clínicos de medicina interna y cirugía en plataformas", stage: "Fase 5" },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-cyan-950/40 via-blue-950/30 to-black/60 backdrop-blur-xl border border-cyan-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(0,180,216,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <HeartPulse className="w-3.5 h-3.5 text-cyan-400" />
            Guía Médica Integral · De Cero a Clínico
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Aprende </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-300 via-teal-300 to-blue-300">
              Medicina
            </span>
            <span className="text-white"> desde Cero</span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            Ruta exhaustiva y metódica: Ciencias Básicas (Anatomía, Fisiología, Farmaco), Clínica (Semiología, ECG, Lab) y Especialidades Médicas.
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-xl p-4 rounded-2xl bg-white/5 border border-cyan-500/20 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 block">6</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Fases</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-teal-300 block">30+</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Materias</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-300 block">Anki</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Método</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 block">100%</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Gratis</span>
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
                  ? "bg-cyan-500/90 text-black border-cyan-300 shadow-[0_0_15px_rgba(0,180,216,0.4)] scale-102 font-bold"
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
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Ruta por Etapas</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-cyan-400" />
              Las 6 Fases de la Formación Médica
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
                          {p.topics.map((t, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-black/30 border border-white/10 text-xs text-purple-100 font-medium flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
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

      {/* 2. CIENCIAS BÁSICAS */}
      {(activeSubTab === "all" || activeSubTab === "basicas") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Pilares Fundamentales</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Microscope className="w-6 h-6 text-teal-400" />
              Ciencias Básicas Médicas a Fondo
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {basicSciences.map((bs, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2 hover:border-teal-400/40 transition-colors"
              >
                <h4 className="font-bold text-white text-base text-cyan-200">{bs.title}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{bs.desc}</p>
                <div className="pt-2 border-t border-white/5 text-xs text-teal-300 font-medium">
                  💡 <strong>Consejo:</strong> {bs.tip}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 3. CLÍNICA & SEMIOLOGÍA */}
      {(activeSubTab === "all" || activeSubTab === "clinica") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">El Paciente Real</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-amber-400" />
              Semiología, Examen Físico &amp; Diagnóstico
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clinicalSkills.map((cs, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2">
                <h4 className="font-bold text-amber-300 text-base">{cs.title}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{cs.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 4. ESPECIALIDADES */}
      {(activeSubTab === "all" || activeSubTab === "especialidades") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Áreas Mayores</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <HeartPulse className="w-6 h-6 text-rose-400" />
              Las Grandes Ramas de la Medicina
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <span className="text-2xl">🫀</span>
              <h4 className="font-bold text-white text-base">Medicina Interna</h4>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Cardiología (HTA, IAM, IC), Neumología (EPOC, asma), Nefrología, Endocrinología (Diabetes, Tiroides) e Infectología.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <span className="text-2xl">🔪</span>
              <h4 className="font-bold text-white text-base">Cirugía General</h4>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Abdomen agudo (apendicitis, colecistitis), hernias, patología biliar, trauma ATLS y manejo perioperatorio.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <span className="text-2xl">👶</span>
              <h4 className="font-bold text-white text-base">Pediatría</h4>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Crecimiento y desarrollo, neonatología, esquema de vacunas, deshidratación, bronquiolitis y urgencias pediátricas.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <span className="text-2xl">🤰</span>
              <h4 className="font-bold text-white text-base">Ginecología &amp; Obstetricia</h4>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Control prenatal, trabajo de parto, preeclampsia, hemorragias obstétricas, ciclo ovárico y oncología ginecológica.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <span className="text-2xl">🧠</span>
              <h4 className="font-bold text-white text-base">Neurología &amp; Psiquiatría</h4>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Accidente Cerebrovascular (ACV), epilepsia, cefaleas, depresión mayor, trastorno bipolar y esquizofrenia.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <span className="text-2xl">🚑</span>
              <h4 className="font-bold text-white text-base">Urgencias &amp; Cuidados Críticos</h4>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Soporte vital avanzado (ACLS/BLS), manejo de shock (séptico, cardiogénico, hipovolémico) y politrauma.
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* 5. METODOLOGÍA & ANKI */}
      {(activeSubTab === "all" || activeSubTab === "metodologia") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Eficiencia Cognitiva</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-400" />
              Métodos de Estudio &amp; El Poder de Anki
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyMethods.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                <h4 className="font-bold text-purple-300 text-base">{m.name}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 6. YOUTUBE */}
      {(activeSubTab === "all" || activeSubTab === "youtube") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">Educación Audiovisual</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <YouTubeIcon className="w-6 h-6 text-red-500" />
              Canales Médicos de Élite en YouTube
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {youtubeChannels.map((ch, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-1.5">
                <h4 className="font-bold text-white text-sm">{ch.name}</h4>
                <p className="text-xs text-purple-200/75 leading-snug">{ch.focus}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 7. TRUCOS & MNEMOTÉCNICOS */}
      {(activeSubTab === "all" || activeSubTab === "trucos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Atajos Mentales</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-cyan-400" />
              12 Trucos &amp; Mnemotécnicos Clínicos
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {medicalTricks.map((t, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-cyan-950/15 border border-cyan-500/20 space-y-1.5">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Truco {t.num}</span>
                <h4 className="font-bold text-white text-sm sm:text-base">{t.title}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 8. FAQ */}
      {(activeSubTab === "all" || activeSubTab === "faq") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Dudas Comunes</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-teal-400" />
              Preguntas Frecuentes
            </h3>
          </div>

          <div className="space-y-3">
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-1">
              <h4 className="font-bold text-cyan-300 text-sm">¿Puedo aprender medicina de forma autodidacta?</h4>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Puedes adquirir el conocimiento teórico y fisiopatológico profundo de forma autodidacta. Sin embargo, para ejercer legalmente como médico y atender pacientes se requiere un título universitario oficial reconocido por las autoridades sanitarias.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-1">
              <h4 className="font-bold text-cyan-300 text-sm">¿Qué idioma debo priorizar?</h4>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                El español para la comunicación empática con pacientes en Latinoamérica, y el inglés (B2+) como lengua de estudio para acceder a las últimas guías clínicas, papers y plataformas internacionales como UpToDate y USMLE.
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* 9. CHECKLIST DE ESTUDIO */}
      {(activeSubTab === "all" || activeSubTab === "plan") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Seguimiento</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-cyan-400" />
              Checklist de Formación Médica
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
                      ? "bg-cyan-950/30 border-cyan-500/40 shadow-[0_0_15px_rgba(0,180,216,0.2)]"
                      : "bg-white/5 border-purple-500/20 hover:bg-white/8 hover:border-purple-400/40"
                  }`}
                >
                  <div className="mt-0.5">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <Square className="w-5 h-5 text-purple-400/50" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-cyan-300/80 block mb-0.5">
                      {item.stage}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                        isChecked ? "text-cyan-200 line-through opacity-80" : "text-white"
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
