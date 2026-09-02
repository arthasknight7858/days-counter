"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Search,
  BookOpen,
  DollarSign,
  Clock,
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Brain,
  Layers,
  ArrowLeftRight,
} from "lucide-react";

interface Career {
  id: string;
  icon: string;
  area: string;
  acc: string;
  name: string;
  tagline: string;
  duracion: string;
  salario_min: number;
  salario_max: number;
  salario_senior: number;
  demanda: string;
  modalidad: string;
  study: string[];
  jobs: string[];
  daily: string[];
  oblig: string[];
  skills: { n: string; v: number }[];
  salaries: { role: string; co: string; global: string }[];
  specs: string[];
  outlook: { l: string; v: number; c: string }[];
  pros: string[];
  cons: string[];
  curiosity: string;
}

const CAREERS: Career[] = [
  {
    id: "sistemas",
    icon: "💻",
    area: "Tecnología",
    acc: "#4F9CF9",
    name: "Ingeniería en Sistemas / Informática",
    tagline:
      "La carrera que construye el mundo digital. Enseña a descomponer problemas complejos en instrucciones que las computadoras ejecutan. Mezcla de lógica matemática, creatividad de diseño y pragmatismo de ingeniería.",
    duracion: "4–5 años",
    salario_min: 800,
    salario_max: 5000,
    salario_senior: 8000,
    demanda: "Muy alta — déficit global permanente de talento",
    modalidad: "Remoto / Híbrido / Presencial",
    study: [
      "Algoritmos y estructuras de datos — el corazón de la computación eficiente.",
      "Bases de datos relacionales (SQL) y NoSQL (MongoDB, Redis) para almacenamiento masivo.",
      "Sistemas operativos — gestión de memoria, procesos, Linux por dentro y filesystems.",
      "Redes y comunicaciones — protocolos TCP/IP, HTTP, DNS y seguridad en transmisión.",
      "Ingeniería de software — metodologías ágiles (Scrum), patrones de diseño y arquitectura limpia.",
      "Lenguajes de programación — C, Java, Python, JavaScript/TypeScript, Go y Rust.",
      "Sistemas distribuidos y Cloud Computing — microservicios, AWS, Docker y Kubernetes.",
      "Seguridad informática y buenas prácticas (OWASP Top 10).",
    ],
    jobs: [
      "Desarrollador Backend / Frontend / Full Stack.",
      "Arquitecto de Software y Sistemas Distribuidos.",
      "DevOps & Site Reliability Engineer (SRE).",
      "Ingeniero de Datos y Cloud Platform Engineer.",
      "CTO (Chief Technology Officer) en startups y scale-ups.",
    ],
    daily: [
      "Escribir, depurar y optimizar código limpio (4–6 horas diarias).",
      "Participar en Daily standup (15 min) para sincronizar avances del sprint.",
      "Hacer Code Review (PRs) a compañeros de equipo con retroalimentación técnica.",
      "Investigar y solucionar bugs críticos reportados en entornos de producción.",
      "Diseñar contratos de APIs y arquitecturas técnicas para nuevas funcionalidades.",
    ],
    oblig: [
      "Entregar funcionalidades a tiempo según los compromisos de sprint.",
      "Garantizar cobertura de pruebas unitarias y de integración.",
      "Rotación en guardias técnicas (on-call) para incidentes en producción.",
      "Cuidado riguroso de la privacidad y cifrado de datos sensibles de usuarios.",
      "Autoaprendizaje continuo: frameworks y herramientas evolucionan cada 2–3 años.",
    ],
    skills: [
      { n: "Programación y Algoritmos", v: 95 },
      { n: "Resolución Lógica de Problemas", v: 92 },
      { n: "Inglés Técnico / Remoto", v: 88 },
      { n: "Arquitectura de Software", v: 80 },
      { n: "Trabajo en Equipo (Git/CI/CD)", v: 85 },
    ],
    salaries: [
      { role: "Junior (0–2 años)", co: "$600–1,200/mes", global: "$2,000–4,000/mes" },
      { role: "Mid (2–5 años)", co: "$1,200–2,500/mes", global: "$5,000–9,000/mes" },
      { role: "Senior (5+ años)", co: "$2,500–5,000/mes", global: "$10,000–18,000/mes" },
      { role: "Tech Lead / Arquitecto", co: "$4,000–8,000/mes", global: "$15,000–25,000/mes" },
    ],
    specs: ["Backend", "Frontend", "Cloud/DevOps", "Mobile (Flutter/Swift)", "Data Engineering", "Videojuegos", "Blockchain"],
    outlook: [
      { l: "Impacto Automatización IA", v: 25, c: "#ef4444" },
      { l: "Crecimiento del Sector", v: 95, c: "#22c55e" },
      { l: "Acceso a Trabajo Remoto USD", v: 92, c: "#4F9CF9" },
    ],
    pros: [
      "La mayor oferta de empleo remoto internacional en dólares desde Colombia.",
      "Meritocracia alta: un portafolio sólido en GitHub pesa tanto o más que el diploma.",
      "Salarios crecen de forma exponencial con experiencia e inglés.",
      "Alta flexibilidad de horarios y proyectos globales.",
    ],
    cons: [
      "Síndrome del impostor recurrente por la velocidad de avance tecnológico.",
      "Guardias nocturnas (on-call) cuando caen servidores en producción.",
      "Sedentarismo prolongado frente al monitor.",
    ],
    curiosity:
      "El 60% de los desarrolladores contratados en empresas tech internacionales no tienen un título formal de informática según encuestas de StackOverflow. El portafolio, el dominio de inglés y la capacidad de resolver problemas reales son la clave de entrada.",
  },
  {
    id: "ciberseguridad",
    icon: "🔒",
    area: "Tecnología",
    acc: "#f472b6",
    name: "Ciberseguridad & Hacking Ético",
    tagline:
      "Los guardianes de la infraestructura digital. Piensan como atacantes para defender sistemas, datos y personas. Una de las ramas más demandadas y mejor remuneradas del planeta.",
    duracion: "4–5 años (o sistemas + certificaciones)",
    salario_min: 1200,
    salario_max: 6500,
    salario_senior: 12000,
    demanda: "Crítica — déficit global de más de 3.5 millones de especialistas",
    modalidad: "Remoto / Híbrido / Presencial en sectores clave",
    study: [
      "Redes y protocolos avanzados — TCP/IP, firewalls, DNS poisoning, proxies.",
      "Criptografía aplicada — algoritmos simétricos/asimétricos, PKI, TLS, hashing.",
      "Hacking ético y pruebas de penetración (Pentesting) con Metasploit y Burp Suite.",
      "Forense digital — adquisición de evidencia y análisis de memoria volátil.",
      "Análisis de malware e ingeniería inversa de ransomware.",
      "Seguridad en la Nube (Cloud Security) y arquitectura Zero Trust en AWS/Azure.",
      "Normativas y cumplimiento legal: ISO 27001, NIST, SOC 2 y GDPR.",
    ],
    jobs: [
      "Analista SOC (Security Operations Center) Nivel 1/2/3.",
      "Penetration Tester / Red Teamer (Hacker Ético).",
      "Ingeniero de Seguridad Cloud y Aplicaciones (AppSec).",
      "Perito en Informática Forense y Respuesta a Incidentes.",
      "CISO (Chief Information Security Officer) corporativo.",
    ],
    daily: [
      "Monitorear alertas de seguridad y anomalías en plataformas SIEM (Splunk/Sentinel).",
      "Ejecutar escaneos de vulnerabilidades y pruebas controladas de intrusión.",
      "Analizar logs de cortafuegos y tráfico de red en búsqueda de amenazas activas.",
      "Redactar reportes ejecutivos de mitigación y riesgos para directivos.",
      "Diseñar simulaciones de phishing y concientización para empleados.",
    ],
    oblig: [
      "Disponibilidad 24/7 en incidentes de brechas o ataques activos de ransomware.",
      "Confidencialidad absoluta sobre las vulnerabilidades de los clientes.",
      "Mantener certificaciones internacionales vigentes (OSCP, CISSP, CEH, Security+).",
      "Actuar siempre bajo autorización expresa y contratos de pentesting legal.",
    ],
    skills: [
      { n: "Redes y Protocolos", v: 95 },
      { n: "Pentesting y Hacking Ofensivo", v: 90 },
      { n: "Forense y Análisis de Logs", v: 85 },
      { n: "Scripting en Python/Bash", v: 82 },
      { n: "Comunicación Ejecutiva de Riesgos", v: 75 },
    ],
    salaries: [
      { role: "SOC Analyst Junior", co: "$800–1,500/mes", global: "$3,000–5,000/mes" },
      { role: "Pentester Mid", co: "$1,500–3,000/mes", global: "$6,000–10,000/mes" },
      { role: "Senior Security Engineer", co: "$3,000–6,000/mes", global: "$12,000–18,000/mes" },
      { role: "CISO Corporativo", co: "$5,000–12,000/mes", global: "$20,000–40,000/mes" },
    ],
    specs: ["Red Team (Ataque)", "Blue Team (Defensa)", "Cloud Security", "AppSec", "Forense Digital", "Bug Bounty"],
    outlook: [
      { l: "Aumento de Ciberataques", v: 98, c: "#ef4444" },
      { l: "Escasez de Profesionales", v: 95, c: "#22c55e" },
      { l: "Salarios en Alza Global", v: 92, c: "#f472b6" },
    ],
    pros: [
      "Escasez de talento extrema genera los salarios más altos para recién egresados certificados.",
      "El trabajo nunca es monótono; cada vector de ataque es un acertijo nuevo.",
      "Oportunidades de ganar recompensas en dólares cazando bugs (Bug Bounty) desde casa.",
    ],
    cons: [
      "Nivel de estrés alto durante ataques reales a servidores bancarios o de salud.",
      "Actualización de vulnerabilidades (CVEs) diaria obligatoria.",
    ],
    curiosity:
      "El ciberataque de ransomware a Colonial Pipeline en 2021 paralizó el suministro de gasolina en la costa este de EE.UU. por 5 días. Ocurrió por una sola contraseña reutilizada y sin autenticación de dos pasos. Un solo profesional bien posicionado habría prevenido una crisis de seguridad nacional.",
  },
  {
    id: "ia",
    icon: "🤖",
    area: "Tecnología",
    acc: "#a78bfa",
    name: "Inteligencia Artificial y Ciencia de Datos",
    tagline:
      "La disciplina más transformadora del siglo XXI. Combina estadística, programación y modelado para entrenar algoritmos que aprenden de datos y automatizan decisiones complejas.",
    duracion: "4–5 años (+ posgrado recomendado)",
    salario_min: 1500,
    salario_max: 8000,
    salario_senior: 15000,
    demanda: "Explosiva — roles de Machine Learning e IA crecieron 200% recientemente",
    modalidad: "Remoto / Híbrido",
    study: [
      "Probabilidad y estadística multivariada, inferencia y cálculo matricial.",
      "Machine Learning supervisado y no supervisado (scikit-learn, XGBoost).",
      "Deep Learning y redes neuronales profundas (PyTorch, TensorFlow).",
      "Modelos de Lenguaje (NLP / LLMs), Transformers, embeddings y fine-tuning.",
      "Visión por Computadora (Computer Vision), detección de objetos (YOLO, OpenCV).",
      "MLOps — despliegue, monitoreo y reentrenamiento de modelos en producción.",
      "Big Data y arquitecturas distribuidas con Apache Spark y Databricks.",
    ],
    jobs: [
      "Machine Learning Engineer / AI Engineer.",
      "Data Scientist & AI Consultant.",
      "Data Engineer & Pipeline Architect.",
      "Investigador en Laboratorios de IA (Research Scientist).",
      "Prompt Engineer & Especialista en LLMs.",
    ],
    daily: [
      "Explorar, limpiar y estructurar grandes datasets (el 60% del tiempo real).",
      "Entrenar y evaluar modelos predictivos ajustando hiperparámetros.",
      "Escribir pipelines de datos automatizados en Python y SQL.",
      "Presentar métricas de negocio derivadas de modelos a gerencias.",
      "Desplegar modelos como APIs escalables en la nube.",
    ],
    oblig: [
      "Validar que los modelos no tengan sesgos discriminatorios en decisiones sensibles.",
      "Garantizar la reproducibilidad de experimentos mediante herramientas como MLflow.",
      "Cumplir con regulaciones de privacidad y anonimización de datos de clientes.",
    ],
    skills: [
      { n: "Python (pandas, PyTorch, sklearn)", v: 95 },
      { n: "Estadística y Álgebra Lineal", v: 92 },
      { n: "SQL y Data Warehouses", v: 88 },
      { n: "Storytelling y Visualización", v: 82 },
      { n: "MLOps y Despliegue", v: 75 },
    ],
    salaries: [
      { role: "Data Analyst Junior", co: "$800–1,500/mes", global: "$3,500–5,000/mes" },
      { role: "Data Scientist Mid", co: "$1,800–3,500/mes", global: "$8,000–12,000/mes" },
      { role: "Senior ML Engineer", co: "$4,000–7,000/mes", global: "$15,000–22,000/mes" },
      { role: "Head of AI / Data Director", co: "$6,000–12,000/mes", global: "$20,000–35,000/mes" },
    ],
    specs: ["LLMs & NLP", "Computer Vision", "MLOps", "Fintech & Trading Algorítmico", "Bioinformática", "Sistemas de Recomendación"],
    outlook: [
      { l: "Adopción de IA en Empresas", v: 99, c: "#a78bfa" },
      { l: "Crecimiento Salarial", v: 97, c: "#22c55e" },
      { l: "Nuevos Roles Emergentes", v: 95, c: "#4F9CF9" },
    ],
    pros: [
      "Los salarios más elevados de la industria tecnológica contemporánea.",
      "Impacto directo y cuantificable en la rentabilidad de las empresas.",
      "Se aplica a salud, finanzas, entretenimiento, comercio, satélites y robótica.",
    ],
    cons: [
      "Exigencia matemática y estadística profunda de base.",
      "La mayor parte del tiempo diario se gasta en depurar datos sucios, no en crear algoritmos.",
    ],
    curiosity:
      "Aunque modelos colosales como GPT-4 costaron decenas de millones en cómputo, el 90% del valor comercial real en empresas se genera hoy con modelos medianos de código abierto adaptados con datos propios de la empresa.",
  },
  {
    id: "medicina",
    icon: "🩺",
    area: "Salud",
    acc: "#34d399",
    name: "Medicina Humana",
    tagline:
      "La carrera de mayor trascendencia y responsabilidad con la vida. Un médico analiza síntomas, interpreta exámenes y toma decisiones que salvan vidas bajo presión constante.",
    duracion: "6–7 años + 3–5 años de residencia médica",
    salario_min: 800,
    salario_max: 6000,
    salario_senior: 12000,
    demanda: "Alta — escasez de especialistas en regiones y ciudades intermedias",
    modalidad: "Presencial obligatoria en clínicas y hospitales",
    study: [
      "Anatomía humana completa y disección en laboratorio.",
      "Fisiología y bioquímica clínica de todos los sistemas corporales.",
      "Semiología médica: arte del interrogatorio y examen físico exhaustivo.",
      "Farmacología: dosis, mecanismos de acción, interacciones y toxicología.",
      "Medicina Interna, Cirugía General, Pediatría y Ginecobstetricia.",
      "Medicina de Urgencias, cuidados intensivos y soporte vital avanzado.",
    ],
    jobs: [
      "Médico General en consulta y urgencias hospitalarias.",
      "Médico Especialista (Cardiólogo, Pediatra, Neurólogo, etc.).",
      "Cirujano General o Subespecialista.",
      "Investigador Clínico y Epidemiólogo.",
      "Director Médico o Gerente de Instituciones Hospitalarias.",
    ],
    daily: [
      "Pase de visita matutina a pacientes internados para ajustar tratamientos.",
      "Atender consultas de pacientes, diagnosticar y ordenar planes terapéuticos.",
      "Interpretar imágenes diagnósticas (TAC, Resonancias, Rayos X) y laboratorios.",
      "Diligenciar minuciosamente la historia clínica electrónica con valor médico-legal.",
      "Turnos de guardia hospitalaria de 12 a 24 horas continuas.",
    ],
    oblig: [
      "Secreto médico absoluto y custodia de la intimidad del paciente.",
      "Obtención y firma del Consentimiento Informado antes de procedimientos.",
      "Educación médica continua obligatoria para mantener certificaciones profesionales.",
      "Responsabilidad ética y legal en cada formulación y decisión clínica.",
    ],
    skills: [
      { n: "Criterio Clínico y Diagnóstico", v: 98 },
      { n: "Toma de Decisiones Bajo Presión", v: 95 },
      { n: "Empatía y Comunicación Asertiva", v: 92 },
      { n: "Resistencia Física y Emocional", v: 88 },
      { n: "Trabajo Multidisciplinario", v: 85 },
    ],
    salaries: [
      { role: "Médico Interno / Residente", co: "$300–700/mes", global: "$1,500–3,000/mes" },
      { role: "Médico General Graduado", co: "$800–1,500/mes", global: "$3,000–6,000/mes" },
      { role: "Especialista Clínico", co: "$2,500–6,000/mes", global: "$10,000–20,000/mes" },
      { role: "Subespecialista / Cirujano Privado", co: "$5,000–15,000/mes", global: "$20,000–50,000/mes" },
    ],
    specs: ["Cardiología", "Neurología", "Cirugía Plástica", "Dermatología", "Anestesiología", "Pediatría", "Radiología"],
    outlook: [
      { l: "Envejecimiento Poblacional", v: 96, c: "#22c55e" },
      { l: "Demanda de Especialistas", v: 92, c: "#34d399" },
      { l: "Telemedicina e IA de Apoyo", v: 75, c: "#4F9CF9" },
    ],
    pros: [
      "Satisfacción incomparable de salvar vidas y aliviar el sufrimiento humano.",
      "Respeto social y prestigio profesional intrínseco.",
      "Diversidad inmensa de especialidades clínicas, quirúrgicas y diagnósticas.",
    ],
    cons: [
      "Camino de formación más largo que cualquier otra profesión (10 a 14 años).",
      "Guardias de 24–36 horas y privación crónica de sueño durante la residencia.",
      "Alto riesgo de agotamiento emocional (burnout).",
    ],
    curiosity:
      "La residencia médica exige jornadas de hasta 80 horas semanales durante años. Sin embargo, los médicos especialistas privados más cotizados tienen una de las mayores estabilidades económicas a largo plazo.",
  },
  {
    id: "civil",
    icon: "🏗️",
    area: "Ingeniería",
    acc: "#fb923c",
    name: "Ingeniería Civil",
    tagline:
      "Los constructores de la infraestructura que sostiene la sociedad: puentes, rascacielos, túneles, acueductos y carreteras calculadas para durar generaciones.",
    duracion: "5 años",
    salario_min: 700,
    salario_max: 4500,
    salario_senior: 8000,
    demanda: "Alta y constante en desarrollo de infraestructura urbana y vial",
    modalidad: "Obra en terreno + Oficina técnica de diseño",
    study: [
      "Mecánica de suelos, geotecnia y diseño de cimentaciones profundas.",
      "Análisis estructural y diseño sismo-resistente en concreto y acero (NSR-10).",
      "Hidráulica, hidrología, plantas de tratamiento de agua y alcantarillados.",
      "Topografía satelital, SIG y diseño geométrico de vías y carreteras.",
      "Gerencia de proyectos de construcción, presupuestos (APU) y programación (BIM).",
    ],
    jobs: [
      "Ingeniero Calculista Estructural.",
      "Director y Residente de Obra.",
      "Interventor de Proyectos de Infraestructura Pública y Privada.",
      "Especialista en Geotecnia y Mecánica de Suelos.",
      "Gerente de Proyectos de Construcción.",
    ],
    daily: [
      "Supervisar en obra que la fundición y armado coincida con los planos estructurales.",
      "Modelar y simular esfuerzos sísmicos en software especializado (ETABS / SAP2000).",
      "Controlar cronogramas, rendimientos de mano de obra y costos de materiales.",
      "Resolver imprevistos geológicos o del terreno en tiempo real.",
      "Redactar bitácoras de obra e informes para la interventoría.",
    ],
    oblig: [
      "Cumplimiento obligatorio de las normas de sismorresistencia (NSR-10 en Colombia).",
      "Firma y sello profesional con responsabilidad civil y penal en obras.",
      "Garantizar la seguridad y salud en el trabajo (SST) de los obreros en campo.",
    ],
    skills: [
      { n: "Cálculo Estructural (ETABS/SAP)", v: 92 },
      { n: "Gestión de Obras y Presupuestos", v: 88 },
      { n: "Normas Técnicas y de Sismo", v: 90 },
      { n: "Modelado BIM (Revit/Navisworks)", v: 82 },
      { n: "Liderazgo de Personal de Obra", v: 80 },
    ],
    salaries: [
      { role: "Ingeniero Residente Junior", co: "$800–1,500/mes", global: "$2,500–4,500/mes" },
      { role: "Diseñador Estructural Mid", co: "$1,500–3,000/mes", global: "$5,000–8,000/mes" },
      { role: "Director de Obra Senior", co: "$3,000–6,000/mes", global: "$8,000–14,000/mes" },
      { role: "Gerente de Proyectos / Socio", co: "$5,000–12,000/mes", global: "$12,000–20,000/mes" },
    ],
    specs: ["Estructuras", "Geotecnia", "Vías y Transporte", "Hidráulica", "Gerencia de Construcción", "BIM Management"],
    outlook: [
      { l: "Infraestructura en LATAM", v: 88, c: "#22c55e" },
      { l: "Construcción Sostenible", v: 82, c: "#fb923c" },
      { l: "Adopción BIM Obligatoria", v: 80, c: "#4F9CF9" },
    ],
    pros: [
      "Satisfacción tangible de ver construcciones monumentales que perduran décadas.",
      "Proyección para liderar grandes equipos y presupuestos a edad temprana.",
      "Estabilidad en contratación con el Estado y el sector inmobiliario.",
    ],
    cons: [
      "Exposición a sol, lluvia y condiciones de obra demandantes.",
      "Responsabilidad penal directa sobre la estabilidad de las estructuras.",
    ],
    curiosity:
      "En ingeniería civil, las memorias de cálculo y planos récord deben guardarse por décadas. La norma sismo-resistente exige que una estructura proteja la vida de los ocupantes incluso en terremotos de máxima magnitud.",
  },
  {
    id: "electrica",
    icon: "⚡",
    area: "Ingeniería",
    acc: "#fbbf24",
    name: "Ingeniería Eléctrica y Electrónica",
    tagline:
      "La ingeniería que domina la energía y los microchips. Desde las redes de alta tensión y granjas solares hasta los circuitos embebidos de vehículos autónomos.",
    duracion: "5 años",
    salario_min: 800,
    salario_max: 5000,
    salario_senior: 9000,
    demanda: "Muy alta por la transición energética mundial y vehículos eléctricos",
    modalidad: "Industria / Laboratorio / Campo",
    study: [
      "Circuitos eléctricos, electromagnetismo y electrónica de potencia.",
      "Sistemas de control automático, instrumentación y PLCs industriales.",
      "Energías renovables: solar fotovoltaica, eólica y almacenamiento en baterías.",
      "Sistemas embebidos y microcontroladores (ARM, ESP32, FPGA).",
      "Diseño de tarjetas de circuito impreso (PCB) con Altium y KiCad.",
    ],
    jobs: [
      "Ingeniero de Automatización Industrial y Robótica.",
      "Especialista en Energías Renovables y Parques Solares.",
      "Diseñador de Hardware y Sistemas Embebidos (IoT).",
      "Ingeniero de Redes de Potencia y Subestaciones Eléctricas.",
    ],
    daily: [
      "Diseñar y simular circuitos en MATLAB, Simulink o Altium.",
      "Programar controladores lógicos (PLCs Siemens/Rockwell) en plantas.",
      "Supervisar el mantenimiento y protecciones eléctricas en subestaciones.",
      "Diagnosticar fallas con osciloscopios y analizadores de redes.",
    ],
    oblig: [
      "Cumplimiento riguroso del reglamento técnico de instalaciones eléctricas (RETIE).",
      "Protocolos estrictos de seguridad eléctrica de bloqueo y etiquetado (LOTO).",
    ],
    skills: [
      { n: "Electrónica y Potencia", v: 92 },
      { n: "Automatización y PLC", v: 88 },
      { n: "Diseño de PCB / Hardware", v: 85 },
      { n: "Normativas Eléctricas (RETIE)", v: 86 },
    ],
    salaries: [
      { role: "Ingeniero Junior", co: "$800–1,400/mes", global: "$2,500–4,000/mes" },
      { role: "Especialista en Automatización Mid", co: "$1,500–3,000/mes", global: "$5,000–9,000/mes" },
      { role: "Senior en Energía / Hardware", co: "$3,000–6,000/mes", global: "$9,000–15,000/mes" },
      { role: "Gerente Técnico / Consultor", co: "$5,000–10,000/mes", global: "$14,000–22,000/mes" },
    ],
    specs: ["Energías Renovables", "Automatización Industrial", "Sistemas Embebidos IoT", "Vehículos Eléctricos", "Microelectrónica"],
    outlook: [
      { l: "Transición Energética / Solar", v: 96, c: "#fbbf24" },
      { l: "Vehículos Eléctricos (EV)", v: 94, c: "#22c55e" },
      { l: "Industria 4.0 / IoT", v: 88, c: "#4F9CF9" },
    ],
    pros: [
      "Gran demanda impulsada por la energía solar y los autos eléctricos.",
      "Salarios industriales muy sólidos y posibilidad de consultoría independiente.",
    ],
    cons: [
      "Riesgo físico inherente a trabajos en alta tensión sin protocolos.",
      "Requiere constante actualización en estándares de automatización.",
    ],
    curiosity:
      "Cada vehículo eléctrico moderno contiene más de 1,500 componentes electrónicos y cerca de un kilómetro de cableado interno coordinado por microcontroladores diseñados por ingenieros electrónicos.",
  },
  {
    id: "industrial",
    icon: "⚙️",
    area: "Ingeniería",
    acc: "#f97316",
    name: "Ingeniería Industrial",
    tagline:
      "Los optimizadores del mundo empresarial. Analizan cómo fluyen personas, materiales, información y dinero dentro de una organización para eliminar desperdicios y maximizar rentabilidad.",
    duracion: "5 años",
    salario_min: 700,
    salario_max: 4000,
    salario_senior: 7000,
    demanda: "Alta en manufactura, logística, supply chain y consultoría",
    modalidad: "Planta industrial / Oficina / Consultoría",
    study: [
      "Investigación de operaciones, optimización y modelos matemáticos.",
      "Gestión de la cadena de suministro (Supply Chain) y logística integral.",
      "Control estadístico de procesos y metodología Six Sigma.",
      "Lean Manufacturing, eliminación de cuellos de botella y 5S.",
      "Costos industriales, presupuestación y evaluación de proyectos de inversión.",
    ],
    jobs: [
      "Jefe de Operaciones y Planta de Producción.",
      "Gerente de Logística y Cadena de Suministro (Supply Chain).",
      "Consultor en Mejora Continua y Eficiencia de Procesos.",
      "Gerente de Calidad (ISO 9001) y Seguridad Ocupacional.",
    ],
    daily: [
      "Monitorear indicadores de rendimiento (KPIs, OEE, tiempos de ciclo y mermas).",
      "Liderar sesiones Kaizen para optimizar tiempos de fabricación y despacho.",
      "Diseñar layouts de planta y flujos de inventario en almacenes.",
      "Coordinar turnos operativos y recursos con jefes de línea.",
    ],
    oblig: [
      "Cumplimiento de metas de producción mensuales y anuales.",
      "Garantizar normas internacionales de calidad y seguridad industrial.",
    ],
    skills: [
      { n: "Optimización de Procesos", v: 92 },
      { n: "Estadística y Six Sigma", v: 88 },
      { n: "Liderazgo de Equipos", v: 86 },
      { n: "Gestión de Supply Chain", v: 85 },
    ],
    salaries: [
      { role: "Ingeniero Junior", co: "$700–1,300/mes", global: "$2,500–4,000/mes" },
      { role: "Jefe de Operaciones / Calidad", co: "$1,400–2,800/mes", global: "$4,500–7,000/mes" },
      { role: "Gerente de Logística Senior", co: "$3,000–6,000/mes", global: "$8,000–12,000/mes" },
      { role: "Consultor Black Belt", co: "$4,000–8,000/mes", global: "$10,000–18,000/mes" },
    ],
    specs: ["Supply Chain", "Lean Six Sigma", "Logística E-commerce", "Calidad e ISO", "Gerencia de Proyectos"],
    outlook: [
      { l: "Logística y E-commerce", v: 92, c: "#22c55e" },
      { l: "Automatización de Procesos", v: 88, c: "#f97316" },
      { l: "Nearshoring en LATAM", v: 80, c: "#4F9CF9" },
    ],
    pros: [
      "Empleabilidad versátil: toda empresa fabrica, despacha o presta servicios.",
      "Puente directo a cargos de alta gerencia por la visión integral del negocio.",
    ],
    cons: [
      "Presión constante por reducir costos y cumplir metas numéricas estrictas.",
      "En algunas industrias tradicionales el crecimiento inicial puede ser más lento.",
    ],
    curiosity:
      "El sistema de producción de Toyota (Lean Manufacturing), creado por un ingeniero industrial, redujo tiempos de ensamblaje en un 75% y hoy es aplicado por Amazon en sus gigantescos centros de distribución logística.",
  },
  {
    id: "mecanica",
    icon: "🔧",
    area: "Ingeniería",
    acc: "#60a5fa",
    name: "Ingeniería Mecánica",
    tagline:
      "La ingeniería de todo lo que se mueve, transfiere fuerza o transforma energía: turbinas de aviación, motores, robots de manufactura y prótesis biomecánicas.",
    duracion: "5 años",
    salario_min: 750,
    salario_max: 4500,
    salario_senior: 8000,
    demanda: "Estable en industria energética, automotriz, aeroespacial y manufactura",
    modalidad: "Planta / Laboratorio / Software CAD 3D",
    study: [
      "Mecánica de sólidos, resistencia de materiales y fatiga de metales.",
      "Termodinámica, transferencia de calor y dinámica de fluidos (CFD).",
      "Diseño paramétrico 3D (SolidWorks, CATIA) y simulación por elementos finitos (FEA).",
      "Procesos de manufactura: mecanizado CNC, soldadura, fundición e impresión 3D.",
    ],
    jobs: [
      "Ingeniero Diseñador de Maquinaria y Productos.",
      "Especialista en Mantenimiento Industrial y Confiabilidad.",
      "Ingeniero en Industria Automotriz o Aeroespacial.",
      "Diseñador de Dispositivos Médicos y Biomecánicos.",
    ],
    daily: [
      "Modelar piezas mecánicas en CAD 3D y generar planos de fabricación con tolerancias GD&T.",
      "Correr simulaciones computacionales de esfuerzo y temperatura en ANSYS.",
      "Supervisar el mecanizado o ensamble de prototipos en taller.",
    ],
    oblig: [
      "Garantizar factores de seguridad calculados para evitar fallas catastróficas.",
      "Validación rigurosa de materiales bajo estándares internacionales (ASME/ISO).",
    ],
    skills: [
      { n: "CAD 3D y Simulación FEA", v: 94 },
      { n: "Termodinámica y Fluidos", v: 86 },
      { n: "Materiales y Manufactura", v: 84 },
    ],
    salaries: [
      { role: "Diseñador Junior", co: "$800–1,400/mes", global: "$3,000–5,000/mes" },
      { role: "Ingeniero de Manufactura Mid", co: "$1,500–3,000/mes", global: "$5,500–9,000/mes" },
      { role: "Senior FEA / Confiabilidad", co: "$3,000–5,500/mes", global: "$9,000–15,000/mes" },
    ],
    specs: ["Aeroespacial", "Automotriz", "Biomecánica", "Energía y Turbomaquinaria", "Robótica"],
    outlook: [
      { l: "Impresión 3D Industrial", v: 88, c: "#22c55e" },
      { l: "Robótica y Automatización", v: 85, c: "#60a5fa" },
    ],
    pros: [
      "Trabajo tangible donde diseñas máquinas reales que puedes ver funcionar.",
      "Alta demanda en países con fuerte sector industrial (Alemania, EE.UU., México).",
    ],
    cons: [
      "En países con poca manufactura pesada la oferta se concentra en mantenimiento.",
    ],
    curiosity:
      "SpaceX utiliza simulaciones mecánicas de mecánica de fluidos y resistencia de materiales para lograr que sus cohetes Falcon 9 aterricen de manera autónoma y se reutilicen decenas de veces.",
  },
  {
    id: "admin",
    icon: "📊",
    area: "Negocios",
    acc: "#818cf8",
    name: "Administración de Empresas",
    tagline:
      "La ciencia de liderar organizaciones. Enseña a orquestar estrategia, finanzas, personas, marketing y operaciones para crear empresas sostenibles y rentables.",
    duracion: "4–5 años",
    salario_min: 600,
    salario_max: 5000,
    salario_senior: 15000,
    demanda: "Alta cuando se complementa con posgrado (MBA) o especialización",
    modalidad: "Oficina / Híbrido / Remoto",
    study: [
      "Dirección estratégica empresarial, análisis DOFA y modelos de Porter.",
      "Finanzas corporativas, valoración de empresas y presupuesto.",
      "Marketing estratégico, investigación de mercados y ventas.",
      "Gestión del talento humano, liderazgo y clima organizacional.",
      "Emprendimiento, modelos de negocio e innovación (Lean Startup).",
    ],
    jobs: [
      "Director General (CEO) / Gerente de Área.",
      "Consultor de Estrategia y Negocios.",
      "Gerente de Producto (Product Manager).",
      "Emprendedor y Fundador de Empresas.",
    ],
    daily: [
      "Analizar estados de resultados (P&G), balances y flujos de caja.",
      "Liderar comités de seguimiento de objetivos estratégicos (OKRs).",
      "Negociar acuerdos con clientes clave, proveedores o inversionistas.",
    ],
    oblig: [
      "Rendir cuentas del desempeño financiero a juntas directivas y accionistas.",
      "Garantizar el cumplimiento de normas laborales y éticas en la organización.",
    ],
    skills: [
      { n: "Liderazgo y Estrategia", v: 92 },
      { n: "Análisis Financiero", v: 88 },
      { n: "Negociación y Comunicación", v: 90 },
    ],
    salaries: [
      { role: "Analista Junior", co: "$600–1,200/mes", global: "$2,500–4,000/mes" },
      { role: "Gerente de Área Mid", co: "$1,500–3,000/mes", global: "$5,000–9,000/mes" },
      { role: "Director / Vicepresidente", co: "$4,000–9,000/mes", global: "$12,000–22,000/mes" },
      { role: "CEO / Socio Consultor", co: "$8,000–25,000/mes", global: "$25,000–100,000+/mes" },
    ],
    specs: ["MBA", "Consultoría", "Startups", "Finanzas Corporativas", "Product Management"],
    outlook: [
      { l: "Demanda de MBAs", v: 85, c: "#818cf8" },
      { l: "Ecosistema Startups", v: 88, c: "#22c55e" },
    ],
    pros: [
      "Versatilidad total para trabajar en cualquier industria o fundar tu propio negocio.",
      "Los profesionales con MBA y buen networking alcanzan los salarios corporativos más altos.",
    ],
    cons: [
      "Título genérico: sin especialización o maestría el inicio laboral es muy competido.",
    ],
    curiosity:
      "El 65% de los directores ejecutivos de las 500 empresas más grandes del mundo cuentan con un título de posgrado en administración de empresas (MBA).",
  },
  {
    id: "finanzas",
    icon: "💰",
    area: "Negocios",
    acc: "#2dd4bf",
    name: "Finanzas y Contabilidad",
    tagline:
      "El lenguaje universal de los negocios. Los financieros analizan riesgos y rentabilidades de millones de dólares, mientras los contadores certifican la veracidad de los números ante el mundo.",
    duracion: "4–5 años",
    salario_min: 700,
    salario_max: 6000,
    salario_senior: 12000,
    demanda: "Muy alta y constante: toda empresa registrada por ley necesita contadores y analistas",
    modalidad: "Oficina / Banca / Remoto",
    study: [
      "Contabilidad financiera bajo estándares internacionales NIIF / IFRS.",
      "Auditoría interna y externa, control antifraude y contabilidad forense.",
      "Finanzas corporativas, costo de capital (WACC) y valoración por flujo de caja descontado.",
      "Tributación, impuestos corporativos y planeación fiscal legal.",
      "Mercados de capitales, bolsa de valores, bonos, derivados y divisas.",
    ],
    jobs: [
      "Auditor en firmas Big 4 (Deloitte, PwC, EY, KPMG).",
      "Analista de Inversiones y Banca Privada.",
      "Controller Financiero / Gerente de Contabilidad.",
      "Director Financiero (CFO).",
    ],
    daily: [
      "Elaborar y auditar estados financieros mensuales (Balance, P&G, Flujo).",
      "Modelar proyecciones financieras complejas en Excel.",
      "Calcular y presentar declaraciones de impuestos ante la DIAN o entes fiscales.",
    ],
    oblig: [
      "Firma con fe pública y responsabilidad legal en estados financieros.",
      "Custodia estricta de la confidencialidad financiera del cliente.",
    ],
    skills: [
      { n: "Análisis Financiero y NIIF", v: 96 },
      { n: "Modelado en Excel Avanzado", v: 92 },
      { n: "Tributaria y Auditoría", v: 88 },
    ],
    salaries: [
      { role: "Analista / Auxiliar Junior", co: "$700–1,200/mes", global: "$2,000–3,500/mes" },
      { role: "Contador / Analista Mid", co: "$1,400–2,800/mes", global: "$4,500–7,000/mes" },
      { role: "Auditor Senior / Controller", co: "$3,000–6,000/mes", global: "$8,000–14,000/mes" },
      { role: "CFO (Director Financiero)", co: "$6,000–20,000/mes", global: "$20,000–60,000+/mes" },
    ],
    specs: ["Banca de Inversión", "Auditoría Big 4", "Tributaria", "FP&A", "Trading"],
    outlook: [
      { l: "Fintech y Banca Digital", v: 88, c: "#2dd4bf" },
      { l: "Estabilidad Laboral", v: 92, c: "#22c55e" },
    ],
    pros: [
      "Certeza total de empleo: la contabilidad es una exigencia legal para toda empresa.",
      "Escuela de negocios de primer nivel al ingresar a las firmas Big 4.",
    ],
    cons: [
      "Épocas de cierres de balance o temporadas fiscales exigen jornadas de 70 horas.",
    ],
    curiosity:
      "La ley Sarbanes-Oxley (SOX) se creó tras la quiebra de Enron y elevó la responsabilidad penal de los auditores y directores financieros a niveles históricos: una firma contable en un balance falso puede costar penas de prisión.",
  },
  {
    id: "biotecnologia",
    icon: "🔬",
    area: "Ciencias",
    acc: "#4ade80",
    name: "Biotecnología & Genética",
    tagline:
      "La fusión de la biología celular y la ingeniería. Diseña medicamentos biológicos en células vivas, terapias de edición genética (CRISPR) y cultivos agrícolas resistentes al cambio climático.",
    duracion: "5 años (+ posgrado)",
    salario_min: 700,
    salario_max: 5000,
    salario_senior: 10000,
    demanda: "Creciente en farmacéutica, diagnóstico molecular y agricultura de precisión",
    modalidad: "Laboratorios de bioseguridad / Industria farmacéutica",
    study: [
      "Biología molecular, replicación de ADN, ARN y síntesis de proteínas.",
      "Genética avanzada y edición genómica con CRISPR-Cas9.",
      "Cultivos celulares, bioreactores y fermentación industrial.",
      "Bioinformática: análisis computacional de genomas y secuencias.",
    ],
    jobs: [
      "Científico de I+D en Biopharma.",
      "Especialista en Diagnóstico Molecular (PCR, secuenciación).",
      "Bioinformático y Analista Genómico.",
      "Director Científico (CSO) en Startups Biotech.",
    ],
    daily: [
      "Ejecutar protocolos de PCR, geles de electroforesis y purificación de proteínas.",
      "Analizar datos genéticos con Python y bases de datos como NCBI.",
      "Supervisar el crecimiento de líneas celulares en biorreactores.",
    ],
    oblig: [
      "Cumplimiento riguroso de protocolos de bioseguridad según nivel BSL.",
      "Documentación trazable bajo Buenas Prácticas de Laboratorio (GLP).",
    ],
    skills: [
      { n: "Técnicas de Laboratorio (PCR/ELISA)", v: 95 },
      { n: "Rigor Científico", v: 94 },
      { n: "Bioinformática", v: 80 },
    ],
    salaries: [
      { role: "Investigador Junior", co: "$700–1,200/mes", global: "$2,500–4,500/mes" },
      { role: "Científico Mid", co: "$1,400–2,800/mes", global: "$5,500–9,000/mes" },
      { role: "Senior Scientist / Lead", co: "$3,000–5,500/mes", global: "$10,000–18,000/mes" },
    ],
    specs: ["Terapia Génica", "Anticuerpos Monoclonales", "Bioinformática", "Biotecnología Agrícola"],
    outlook: [
      { l: "Inversión en Biopharma", v: 92, c: "#4ade80" },
      { l: "CRISPR y Terapias", v: 95, c: "#22c55e" },
    ],
    pros: [
      "Contribución directa a curar enfermedades complejas como el cáncer y virus.",
      "Sector con alta inversión internacional de capital de riesgo.",
    ],
    cons: [
      "Requiere posgrados (Maestría/Doctorado) para acceder a cargos de liderazgo en laboratorios.",
    ],
    curiosity:
      "Las vacunas de ARN mensajero fueron desarrolladas en tiempo récord gracias a décadas de investigación previa en biotecnología celular acumulada por científicos en laboratorios universitarios.",
  },
  {
    id: "derecho",
    icon: "⚖️",
    area: "Derecho",
    acc: "#a8a29e",
    name: "Derecho y Abogacía",
    tagline:
      "Los guardianes del orden jurídico y las reglas del juego social. Defienden derechos, estructuran contratos corporativos millonarios y median en litigios de alto impacto.",
    duracion: "5 años (+ habilitación profesional)",
    salario_min: 600,
    salario_max: 7000,
    salario_senior: 20000,
    demanda: "Alta en áreas corporativas, tributarias, tecnología y arbitraje internacional",
    modalidad: "Firmas de abogados / Juzgados / Empresas (In-house)",
    study: [
      "Derecho Constitucional, derechos fundamentales y acciones de tutela.",
      "Derecho Civil, contratos, obligaciones, sucesiones y responsabilidad civil.",
      "Derecho Comercial, sociedades, fusiones y adquisiciones (M&A).",
      "Derecho Penal y sistema acusatorio oral.",
      "Técnicas de argumentación jurídica, oratoria forense y redacción de demandas.",
    ],
    jobs: [
      "Abogado Litigante en juzgados y tribunales.",
      "Asesor Jurídico Corporativo (In-House Counsel).",
      "Árbitro en Cámaras de Comercio y Arbitraje Internacional.",
      "Juez, Fiscal o Magistrado del sistema judicial.",
    ],
    daily: [
      "Redactar demandas, recursos de reposición, apelaciones y conceptos legales.",
      "Revisar y negociar contratos comerciales y cláusulas de responsabilidad.",
      "Asistir a audiencias judiciales orales representando a clientes.",
    ],
    oblig: [
      "Secreto profesional inviolable sobre la información del cliente.",
      "Cumplimiento inexorable de los términos y plazos procesales legales.",
    ],
    skills: [
      { n: "Argumentación y Lógica Jurídica", v: 96 },
      { n: "Redacción Legal y Contratos", v: 94 },
      { n: "Negociación y Persuasión", v: 88 },
    ],
    salaries: [
      { role: "Abogado Junior", co: "$600–1,100/mes", global: "$2,500–4,000/mes" },
      { role: "Asociado Mid", co: "$1,500–3,000/mes", global: "$5,000–9,000/mes" },
      { role: "Socio / Abogado In-house Senior", co: "$4,000–10,000/mes", global: "$15,000–30,000/mes" },
      { role: "Socio BigLaw / Arbitraje", co: "$8,000–25,000+/mes", global: "$30,000–100,000+/mes" },
    ],
    specs: ["Corporativo / M&A", "Arbitraje Internacional", "Derecho Tributario", "Tecnología & Privacidad", "Penal Económico"],
    outlook: [
      { l: "Arbitraje Comercial", v: 88, c: "#22c55e" },
      { l: "Compliance y Anticorrupción", v: 90, c: "#a8a29e" },
      { l: "LegalTech / IA Legal", v: 70, c: "#f59e0b" },
    ],
    pros: [
      "Gran versatilidad e influencia en esferas políticas, comerciales y sociales.",
      "Especialistas corporativos y en arbitraje cobran honorarios de clase mundial.",
    ],
    cons: [
      "Mercado saturado en litigio común: la especialización rigurosa es indispensable.",
      "Presión de términos procesales fatales donde un día de retraso anula un caso.",
    ],
    curiosity:
      "En firmas internacionales de élite ('BigLaw') en Nueva York o Londres, un asociado de primer año recién graduado gana más de $225,000 USD al año.",
  },
  {
    id: "arquitectura",
    icon: "🏛️",
    area: "Arte y Diseño",
    acc: "#f9a8d4",
    name: "Arquitectura & Urbanismo",
    tagline:
      "La fusión de arte, ingeniería y humanismo para dar forma a los espacios habitables. La única profesión donde tus obras pueden durar siglos y transformar ciudades enteras.",
    duracion: "5–6 años",
    salario_min: 600,
    salario_max: 5000,
    salario_senior: 10000,
    demanda: "Moderada a alta en desarrollo inmobiliario, diseño sostenible y BIM",
    modalidad: "Estudio de diseño / Obra / Remoto parcial",
    study: [
      "Taller de diseño y composición espacial semestre a semestre.",
      "Historia y teoría de la arquitectura universal y contemporánea.",
      "Modelado digital y BIM (Revit, Rhino, Grasshopper, SketchUp).",
      "Renderizado fotorrealista y animación arquitectónica (Lumion, D5 Render).",
      "Estructuras, bioclimática, iluminación natural y eficiencia energética.",
    ],
    jobs: [
      "Arquitecto Proyectista y Diseñador.",
      "Director de Obra y Acabados Arquitectónicos.",
      "BIM Manager y Coordinador de Proyectos.",
      "Diseñador de Interiores y Retail.",
      "Urbanista y Planificador Territorial.",
    ],
    daily: [
      "Diseñar y modelar proyectos en Revit o Rhino.",
      "Generar planimetría técnica detallada (cortes, fachadas, detalles).",
      "Visitar obra para verificar que los acabados coincidan con el diseño.",
      "Presentar renders a clientes y comités técnicos.",
    ],
    oblig: [
      "Cumplir normas de accesibilidad, POT y sismorresistencia (NSR-10).",
      "Firmar planos como diseñador responsable ante curadurías urbanas.",
    ],
    skills: [
      { n: "Diseño y Visión Espacial", v: 95 },
      { n: "Software BIM / Render 3D", v: 92 },
      { n: "Normativas Urbanísticas", v: 85 },
    ],
    salaries: [
      { role: "Dibujante / Junior", co: "$600–1,200/mes", global: "$2,000–3,500/mes" },
      { role: "Arquitecto de Proyectos Mid", co: "$1,400–2,800/mes", global: "$4,500–7,500/mes" },
      { role: "Director de Proyectos Senior", co: "$3,000–6,000/mes", global: "$8,000–15,000/mes" },
      { role: "Socio / Estudio Propio", co: "$6,000–20,000+/mes", global: "$15,000–100,000+/mes" },
    ],
    specs: ["Residencial", "Comercial / Retail", "Diseño de Interiores", "BIM Management", "Sostenibilidad LEED", "Urbanismo"],
    outlook: [
      { l: "Arquitectura Sostenible LEED", v: 88, c: "#22c55e" },
      { l: "BIM en Construcción", v: 85, c: "#f9a8d4" },
    ],
    pros: [
      "Dejar un legado físico y estético que perdura en el tiempo.",
      "Amplia libertad creativa combinada con rigor técnico.",
    ],
    cons: [
      "Jornadas de entrega extenuantes durante la carrera y en concurso de proyectos.",
    ],
    curiosity:
      "A diferencia de la tecnología donde los logros ocurren a edad temprana, en arquitectura la madurez creativa y los grandes encargos de edificios suelen llegar a partir de los 45–50 años de experiencia acumulada.",
  },
];

const AREAS = ["Todos", "Tecnología", "Salud", "Ingeniería", "Negocios", "Ciencias", "Derecho", "Arte y Diseño"];

export default function UniversityCareersRoadmap() {
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCareerId, setSelectedCareerId] = useState("sistemas");
  const [viewMode, setViewMode] = useState<"detail" | "compare">("detail");
  const [compareCareerId, setCompareCareerId] = useState<string>("medicina");

  const filteredCareers = useMemo(() => {
    return CAREERS.filter((c) => {
      const matchArea = selectedArea === "Todos" || c.area === selectedArea;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.area.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.jobs.some((j) => j.toLowerCase().includes(q));
      return matchArea && matchSearch;
    });
  }, [selectedArea, searchQuery]);

  const activeCareer = CAREERS.find((c) => c.id === selectedCareerId) || CAREERS[0];
  const compareCareer = CAREERS.find((c) => c.id === compareCareerId) || CAREERS[1];

  return (
    <div className="w-full space-y-8 text-left">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#121426] via-[#0f111c] to-[#1a1738] border border-blue-500/30 shadow-[0_0_40px_rgba(79,156,249,0.15)]"
      >
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-mono font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
            Guía Exhaustiva de Carreras
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            13 Carreras Universitarias <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-300 bg-clip-text text-transparent">
              Análisis Profundo & Salarios Reales
            </span>
          </h1>
          <p className="text-sm sm:text-base text-purple-200/70 leading-relaxed">
            Descubre qué se estudia, qué se hace realmente en el día a día, responsabilidades legales, sueldos en Colombia vs. remoto global en USD, proyección ante la IA y lo que nadie te cuenta.
          </p>
        </div>

        {/* Quick Summary Pill count */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-purple-500/20 text-xs font-mono text-purple-300">
          <span>📚 13 Carreras Analizadas</span>
          <span>•</span>
          <span>💰 Comparativa Salarial COP vs USD</span>
          <span>•</span>
          <span>🤖 Impacto de Automatización IA</span>
        </div>
      </motion.div>

      {/* Mode Switcher: Individual Card vs Face-to-Face Comparator */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setViewMode("detail")}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all border cursor-pointer select-none flex items-center gap-2 ${
            viewMode === "detail"
              ? "bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Ficha Detallada</span>
        </button>

        <button
          onClick={() => setViewMode("compare")}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all border cursor-pointer select-none flex items-center gap-2 ${
            viewMode === "compare"
              ? "bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
          }`}
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Comparador Cara a Cara</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="relative w-full max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar carrera, especialidad o cargo..."
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-purple-500/25 focus:border-blue-400 rounded-2xl text-sm text-white placeholder:text-purple-300/50 outline-none backdrop-blur-md transition-all shadow-inner"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {AREAS.map((area) => {
            const isSelected = selectedArea === area;
            return (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer select-none ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                    : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
                }`}
              >
                {area}
              </button>
            );
          })}
        </div>
      </div>

      {/* Career Select Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {filteredCareers.map((c) => {
          const isSelected = selectedCareerId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCareerId(c.id)}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-2 select-none ${
                isSelected
                  ? "bg-blue-600/30 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-102"
                  : "bg-white/5 border-purple-500/20 hover:bg-white/10 hover:border-purple-400/40 text-purple-200/80"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{c.icon}</span>
                <span className="text-[10px] font-mono text-purple-300/60 uppercase">{c.area}</span>
              </div>
              <div className="text-xs font-bold text-white line-clamp-2 leading-tight">
                {c.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Career In-Depth Card View OR Dual Comparison Mode */}
      <AnimatePresence mode="wait">
        {viewMode === "compare" ? (
          <motion.div
            key="compare-mode"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            {/* Career Selector Bar for Comparison */}
            <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/25 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-blue-400 font-semibold flex items-center gap-1.5">
                  Carrera A:
                </label>
                <select
                  value={selectedCareerId}
                  onChange={(e) => setSelectedCareerId(e.target.value)}
                  className="w-full p-3 bg-black/40 border border-blue-500/30 rounded-2xl text-sm font-semibold text-white outline-none cursor-pointer"
                >
                  {CAREERS.map((c) => (
                    <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                      {c.icon} {c.name} ({c.area})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-purple-400 font-semibold flex items-center gap-1.5">
                  Carrera B:
                </label>
                <select
                  value={compareCareerId}
                  onChange={(e) => setCompareCareerId(e.target.value)}
                  className="w-full p-3 bg-black/40 border border-purple-500/30 rounded-2xl text-sm font-semibold text-white outline-none cursor-pointer"
                >
                  {CAREERS.map((c) => (
                    <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                      {c.icon} {c.name} ({c.area})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Side-by-Side Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Carrera A */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950/20 to-purple-950/30 border border-blue-500/40 space-y-5 shadow-xl">
                <div className="flex items-center gap-3 border-b border-blue-500/20 pb-4">
                  <span className="text-3xl p-2 rounded-xl bg-blue-500/20 border border-blue-400/40">{activeCareer.icon}</span>
                  <div>
                    <span className="text-[10px] font-mono text-blue-300 uppercase font-bold">{activeCareer.area}</span>
                    <h3 className="text-xl font-bold text-white">{activeCareer.name}</h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between p-2.5 rounded-xl bg-white/5">
                    <span className="text-purple-200/70">Duración:</span>
                    <span className="font-bold text-white">{activeCareer.duracion}</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-white/5">
                    <span className="text-purple-200/70">Demanda:</span>
                    <span className="font-bold text-emerald-300">{activeCareer.demanda}</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-white/5">
                    <span className="text-purple-200/70">Modalidad:</span>
                    <span className="font-bold text-purple-200">{activeCareer.modalidad}</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-white/5">
                    <span className="text-purple-200/70">Salario Inicial:</span>
                    <span className="font-mono font-bold text-purple-300">${activeCareer.salario_min.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-white/5">
                    <span className="text-purple-200/70">Salario Medio:</span>
                    <span className="font-mono font-bold text-blue-300">
                      ${Math.round((activeCareer.salario_min + activeCareer.salario_max) / 2).toLocaleString()} USD
                    </span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-emerald-200">Senior / Lead:</span>
                    <span className="font-mono font-bold text-emerald-300">${activeCareer.salario_senior.toLocaleString()}+ USD</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/30 border border-blue-500/20 space-y-2">
                  <div className="text-xs font-bold text-blue-300">Mayor Ventaja:</div>
                  <div className="text-xs text-purple-200/80">{activeCareer.pros[0]}</div>
                  <div className="text-xs font-bold text-red-300 pt-2">Mayor Desafío:</div>
                  <div className="text-xs text-purple-200/80">{activeCareer.cons[0]}</div>
                </div>
              </div>

              {/* Card Carrera B */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/20 to-pink-950/30 border border-purple-500/40 space-y-5 shadow-xl">
                <div className="flex items-center gap-3 border-b border-purple-500/20 pb-4">
                  <span className="text-3xl p-2 rounded-xl bg-purple-500/20 border border-purple-400/40">{compareCareer.icon}</span>
                  <div>
                    <span className="text-[10px] font-mono text-purple-300 uppercase font-bold">{compareCareer.area}</span>
                    <h3 className="text-xl font-bold text-white">{compareCareer.name}</h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between p-2.5 rounded-xl bg-white/5">
                    <span className="text-purple-200/70">Duración:</span>
                    <span className="font-bold text-white">{compareCareer.duracion}</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-white/5">
                    <span className="text-purple-200/70">Demanda:</span>
                    <span className="font-bold text-emerald-300">{compareCareer.demanda}</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-white/5">
                    <span className="text-purple-200/70">Modalidad:</span>
                    <span className="font-bold text-purple-200">{compareCareer.modalidad}</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-white/5">
                    <span className="text-purple-200/70">Salario Inicial:</span>
                    <span className="font-mono font-bold text-purple-300">${compareCareer.salario_min.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-white/5">
                    <span className="text-purple-200/70">Salario Medio:</span>
                    <span className="font-mono font-bold text-pink-300">
                      ${Math.round((compareCareer.salario_min + compareCareer.salario_max) / 2).toLocaleString()} USD
                    </span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-emerald-200">Senior / Lead:</span>
                    <span className="font-mono font-bold text-emerald-300">${compareCareer.salario_senior.toLocaleString()}+ USD</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/30 border border-purple-500/20 space-y-2">
                  <div className="text-xs font-bold text-purple-300">Mayor Ventaja:</div>
                  <div className="text-xs text-purple-200/80">{compareCareer.pros[0]}</div>
                  <div className="text-xs font-bold text-red-300 pt-2">Mayor Desafío:</div>
                  <div className="text-xs text-purple-200/80">{compareCareer.cons[0]}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={activeCareer.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            {/* Main Title & Tagline Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-purple-500/25 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl p-2.5 rounded-2xl bg-white/10 border border-purple-500/30">
                    {activeCareer.icon}
                  </span>
                  <div>
                    <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
                      {activeCareer.area} · {activeCareer.duracion}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {activeCareer.name}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                    {activeCareer.demanda}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
                    {activeCareer.modalidad}
                  </span>
                </div>
              </div>

              <p className="text-sm text-purple-200/80 leading-relaxed font-normal">
                {activeCareer.tagline}
              </p>
            </div>

            {/* Salary Grid */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121226] to-[#181636] border border-purple-500/30 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                <div>
                  <div className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    Rango Salarial Mensual (USD)
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    Evolución Salarial Colombia vs. Remoto Global
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/20">
                  <div className="text-xs text-purple-200/60 uppercase font-mono">Salario Entrada (Junior)</div>
                  <div className="text-2xl font-mono font-bold text-purple-300 mt-1">
                    ${activeCareer.salario_min.toLocaleString()} <span className="text-xs font-normal text-purple-400">USD/mes</span>
                  </div>
                  <div className="text-[11px] text-purple-300/50 mt-1">
                    ≈ ${(activeCareer.salario_min * 4150).toLocaleString()} COP
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/20">
                  <div className="text-xs text-purple-200/60 uppercase font-mono">Salario Medio (Mid-Level)</div>
                  <div className="text-2xl font-mono font-bold text-blue-400 mt-1">
                    ${Math.round((activeCareer.salario_min + activeCareer.salario_max) / 2).toLocaleString()} <span className="text-xs font-normal text-blue-300">USD/mes</span>
                  </div>
                  <div className="text-[11px] text-blue-300/50 mt-1">
                    ≈ ${(Math.round((activeCareer.salario_min + activeCareer.salario_max) / 2) * 4150).toLocaleString()} COP
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-purple-500/10 border border-emerald-500/30">
                  <div className="text-xs text-emerald-200/80 uppercase font-mono">Senior / Lead (5+ Años)</div>
                  <div className="text-2xl font-mono font-bold text-emerald-300 mt-1">
                    ${activeCareer.salario_senior.toLocaleString()}+ <span className="text-xs font-normal text-emerald-400">USD/mes</span>
                  </div>
                  <div className="text-[11px] text-emerald-300/60 mt-1">
                    ≈ ${(activeCareer.salario_senior * 4150).toLocaleString()}+ COP
                  </div>
                </div>
              </div>

              {/* Salary Breakdown Table */}
              <div className="overflow-x-auto rounded-2xl border border-purple-500/20">
                <table className="w-full text-left text-xs text-purple-200">
                  <thead className="bg-white/5 text-purple-300 font-mono text-[11px] uppercase border-b border-purple-500/20">
                    <tr>
                      <th className="p-3.5">Nivel de Experiencia</th>
                      <th className="p-3.5">Salario en Colombia</th>
                      <th className="p-3.5">Salario Global / Remoto USD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {activeCareer.salaries.map((s, idx) => (
                      <tr key={idx}>
                        <td className="p-3.5 font-bold text-white">{s.role}</td>
                        <td className="p-3.5 text-purple-300 font-mono">{s.co}</td>
                        <td className="p-3.5 font-mono text-emerald-400 font-bold">{s.global}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2-Column Content Grid: What you study vs Jobs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/25 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  ¿Qué se estudia realmente?
                </h3>
                <ul className="space-y-2.5 text-xs text-purple-200/80">
                  {activeCareer.study.map((st, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/25 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  Empleos & Roles Reales en el Mercado
                </h3>
                <ul className="space-y-2.5 text-xs text-purple-200/80">
                  {activeCareer.jobs.map((jb, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{jb}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Day in the Life & Obligations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/25 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  Día a Día: ¿Qué se hace en la práctica?
                </h3>
                <ul className="space-y-2.5 text-xs text-purple-200/80">
                  {activeCareer.daily.map((dl, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5" />
                      <span>{dl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/25 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-orange-400" />
                  Obligaciones & Responsabilidad Legal
                </h3>
                <ul className="space-y-2.5 text-xs text-purple-200/80">
                  {activeCareer.oblig.map((ob, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5" />
                      <span>{ob}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Skills Bars & Specializations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/25 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Brain className="w-4 h-4 text-pink-400" />
                  Habilidades Clave Exigidas
                </h3>
                <div className="space-y-3">
                  {activeCareer.skills.map((sk, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs text-purple-200">
                        <span>{sk.n}</span>
                        <span className="font-mono text-purple-400 font-bold">{sk.v}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                          style={{ width: `${sk.v}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/25 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  Especializaciones & Proyección IA
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {activeCareer.specs.map((sp, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-purple-500/20 text-xs text-purple-300 font-mono"
                    >
                      {sp}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-purple-500/20">
                  <div className="text-xs font-mono text-purple-300/70">Tendencias del Mercado:</div>
                  {activeCareer.outlook.map((out, i) => (
                    <div key={i} className="flex items-center justify-between text-xs text-purple-200">
                      <span>{out.l}:</span>
                      <span className="font-mono font-bold" style={{ color: out.c }}>
                        {out.v}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pros vs Cons Realistas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Ventajas Reales
                </h3>
                <ul className="space-y-2 text-xs text-purple-200/80">
                  {activeCareer.pros.map((pr, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{pr}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-red-500/10 border border-red-500/30 space-y-3">
                <h3 className="text-base font-bold text-red-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  Desafíos & Sacrificios Reales
                </h3>
                <ul className="space-y-2 text-xs text-purple-200/80">
                  {activeCareer.cons.map((cn, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">✗</span>
                      <span>{cn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Curiosity Block */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 space-y-2">
              <div className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                El Dato que Nadie te Cuenta
              </div>
              <p className="text-xs sm:text-sm text-purple-100 italic leading-relaxed">
                &ldquo;{activeCareer.curiosity}&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
