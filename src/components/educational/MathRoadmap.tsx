"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Compass,
  Brain,
  Wrench,
  Zap,
  Calendar,
  HelpCircle,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Target,
  Lightbulb,
  AlertTriangle,
  Flame,
  RotateCcw,
} from "lucide-react";

export default function MathRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [openStages, setOpenStages] = useState<Record<number, boolean>>({ 0: true });
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});
  const [formulaCategory, setFormulaCategory] = useState<string>("arith");

  // Diagnostic Quiz State
  const [diagState, setDiagState] = useState<{
    started: boolean;
    current: number;
    score: number;
    answers: number[];
    selectedAnswer: number | null;
    isAnswered: boolean;
  }>({
    started: false,
    current: 0,
    score: 0,
    answers: [],
    selectedAnswer: null,
    isAnswered: false,
  });

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "temario", label: "📚 Temario por Etapas", icon: BookOpen },
    { id: "roadmap", label: "🗺️ Roadmap Visual", icon: Compass },
    { id: "estrategias", label: "🧠 Estrategias & Métodos", icon: Brain },
    { id: "recursos", label: "🔧 Recursos & Canales", icon: Wrench },
    { id: "trucos", label: "⚡ Trucos & Cálculo Mental", icon: Zap },
    { id: "formulas", label: "📐 Hoja de Fórmulas", icon: Calculator },
    { id: "plan", label: "📅 Plan Semanal", icon: Calendar },
    { id: "diagnostico", label: "🎯 Test de Nivel", icon: Target },
    { id: "faq", label: "❓ Preguntas Frecuentes", icon: HelpCircle },
  ];

  const stages = [
    {
      num: "1",
      title: "Fundamentos numéricos y aritmética",
      time: "Semanas 1–4 · ~20–28h",
      level: "Principiante",
      badge: "Base absoluta",
      color: "from-emerald-500/20 to-teal-500/10",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-300",
      badgeClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      dotBg: "bg-emerald-400",
      desc: "Todo parte aquí. Si hay huecos en esta etapa, todo lo demás tambaleará. Aunque creas que 'ya sabes esto', haz el diagnóstico — muchos adultos tienen brechas ocultas en aritmética.",
      topics: [
        { title: "Números naturales", sub: "Contar, ordenar, comparar, recta numérica" },
        { title: "Suma y resta", sub: "Algoritmos, reagrupación, propiedad conmutativa" },
        { title: "Multiplicación", sub: "Tablas del 1 al 12, propiedad distributiva" },
        { title: "División", sub: "Exacta e inexacta, residuo, algoritmo largo" },
        { title: "Números enteros", sub: "Negativos, recta numérica, valor absoluto" },
        { title: "Orden de operaciones", sub: "PEMDAS / BODMAS, paréntesis anidados" },
        { title: "Factores y múltiplos", sub: "MCD, MCM, criba de Eratóstenes" },
        { title: "Números primos", sub: "Definición, factorización prima" },
        { title: "Divisibilidad", sub: "Criterios del 2, 3, 5, 7, 9, 11" },
        { title: "Potencias enteras", sub: "Base, exponente, potencias de 10" },
        { title: "Raíces cuadradas", sub: "Exactas e irracionales, estimación" },
        { title: "Cálculo mental", sub: "Estrategias de estimación y redondeo" },
      ],
    },
    {
      num: "2",
      title: "Fracciones, decimales y porcentajes",
      time: "Semanas 5–8 · ~20–28h",
      level: "Básico",
      badge: "Aritmética racional",
      color: "from-blue-500/20 to-cyan-500/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-300",
      badgeClass: "bg-blue-500/10 text-blue-300 border-blue-500/30",
      dotBg: "bg-blue-400",
      desc: "El área donde más adultos tienen lagunas. Las fracciones son la base del álgebra y el cálculo. Dedícale tiempo real — no las subestimes.",
      topics: [
        { title: "Concepto de fracción", sub: "Numerador, denominador, fracciones equivalentes" },
        { title: "Simplificación", sub: "Reducir fracciones a su mínima expresión" },
        { title: "Comparar fracciones", sub: "Con igual/diferente denominador, mínimo común" },
        { title: "Suma y resta", sub: "Mismo y distinto denominador, números mixtos" },
        { title: "Multiplicación de fracciones", sub: "Regla directa, simplificación cruzada" },
        { title: "División de fracciones", sub: "Fracción inversa, divide = multiplica por inverso" },
        { title: "Números mixtos", sub: "Convertir, operar, interpretar" },
        { title: "Fracciones impropias", sub: "Conversión doble sentido" },
        { title: "Decimales", sub: "Valor posicional, operaciones, notación" },
        { title: "Fracciones ↔ Decimales", sub: "Conversión fluida, decimales periódicos" },
        { title: "Porcentajes", sub: "Cálculo, descuentos, aumentos, impuestos" },
        { title: "Razones y proporciones", sub: "Regla de tres directa e inversa" },
        { title: "Interés simple", sub: "Fórmula I=Prt, aplicaciones" },
        { title: "Interés compuesto", sub: "Fórmula A=P(1+r/n)^nt, interpretación" },
      ],
    },
    {
      num: "3",
      title: "Álgebra básica",
      time: "Semanas 9–14 · ~30–42h",
      level: "Intermedio bajo",
      badge: "Pensamiento abstracto",
      color: "from-amber-500/20 to-yellow-500/10",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-300",
      badgeClass: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      dotBg: "bg-amber-400",
      desc: "El puente entre aritmética y matemáticas avanzadas. Aquí empieza el verdadero razonamiento. El álgebra no es un conjunto de trucos — es un lenguaje para describir relaciones.",
      topics: [
        { title: "Variables y constantes", sub: "Qué representan, cómo usarlas" },
        { title: "Expresiones algebraicas", sub: "Simplificar, evaluar, términos semejantes" },
        { title: "Ecuaciones lineales", sub: "Una variable, verificar solución" },
        { title: "Ecuaciones con fracciones", sub: "Estrategia del mínimo común denominador" },
        { title: "Ecuaciones con valor absoluto", sub: "Casos positivo y negativo" },
        { title: "Inecuaciones lineales", sub: "Resolución, gráfica en recta, notación intervalo" },
        { title: "Sistemas de ecuaciones", sub: "Sustitución, eliminación, gráfico" },
        { title: "Sistemas con 3 variables", sub: "Eliminación progresiva" },
        { title: "Potencias y exponentes", sub: "Leyes, potencias negativas y fraccionarias" },
        { title: "Notación científica", sub: "Operaciones, aplicaciones" },
        { title: "Polinomios", sub: "Grado, suma, resta, multiplicación" },
        { title: "Productos notables", sub: "Binomio cuadrado, suma por diferencia" },
        { title: "Factorización", sub: "Factor común, trinomios, diferencia de cuadrados" },
        { title: "Fracciones algebraicas", sub: "Simplificación, operaciones" },
        { title: "Problemas de aplicación", sub: "Movimiento, mezclas, edad, trabajo" },
      ],
    },
    {
      num: "4",
      title: "Geometría y trigonometría",
      time: "Semanas 15–20 · ~30–42h",
      level: "Intermedio",
      badge: "Espacio y formas",
      color: "from-teal-500/20 to-emerald-500/10",
      borderColor: "border-teal-500/30",
      textColor: "text-teal-300",
      badgeClass: "bg-teal-500/10 text-teal-300 border-teal-500/30",
      dotBg: "bg-teal-400",
      desc: "Matemáticas visuales. Muy importante para física, ingeniería y comprensión espacial. La geometría entrena el razonamiento lógico formal; la trigonometría conecta ángulos con el análisis.",
      topics: [
        { title: "Puntos, rectas, planos", sub: "Conceptos básicos, notación" },
        { title: "Ángulos", sub: "Tipos, complementarios, suplementarios, vértice" },
        { title: "Triángulos", sub: "Clasificación, suma de ángulos, congruencia" },
        { title: "Triángulos semejantes", sub: "Criterios, proporciones" },
        { title: "Teorema de Pitágoras", sub: "Demostración, ternas pitagóricas, aplicaciones" },
        { title: "Polígonos", sub: "Perímetro, área, ángulos internos y externos" },
        { title: "Círculo", sub: "Radio, diámetro, arco, sector, cuerda" },
        { title: "Área y perímetro", sub: "Cuadrado, rectángulo, triángulo, trapecio" },
        { title: "Figuras 3D", sub: "Prisma, pirámide, cilindro, cono, esfera" },
        { title: "Volumen y superficie", sub: "Fórmulas y aplicaciones" },
        { title: "Razones trigonométricas", sub: "Seno, coseno, tangente en triángulo rectángulo" },
        { title: "Ángulos especiales", sub: "30°, 45°, 60° y sus valores exactos" },
        { title: "Círculo trigonométrico", sub: "Radianes, conversión, cuadrantes" },
        { title: "Identidades fundamentales", sub: "Pitagórica, recíprocas, cociente" },
        { title: "Ley de senos y cosenos", sub: "Resolución de triángulos oblicuángulos" },
        { title: "Funciones trig básicas", sub: "Gráfica de sin, cos, tan y sus periodos" },
      ],
    },
    {
      num: "5",
      title: "Álgebra intermedia y funciones",
      time: "Semanas 21–28 · ~40–56h",
      level: "Intermedio alto",
      badge: "Análisis funcional",
      color: "from-rose-500/20 to-red-500/10",
      borderColor: "border-rose-500/30",
      textColor: "text-rose-300",
      badgeClass: "bg-rose-500/10 text-rose-300 border-rose-500/30",
      dotBg: "bg-rose-400",
      desc: "El corazón de la matemática de bachillerato. Las funciones son el lenguaje del cálculo — entenderlas bien es el pasaporte a todo lo demás.",
      topics: [
        { title: "Concepto de función", sub: "Definición, relación, regla de correspondencia" },
        { title: "Dominio y rango", sub: "Notación de intervalo, restricciones" },
        { title: "Gráficas de funciones", sub: "Plano cartesiano, intercepción, intersecciones" },
        { title: "Función lineal", sub: "Pendiente, forma pendiente-intercepto, y=mx+b" },
        { title: "Función cuadrática", sub: "Parábola, vértice, discriminante, forma canónica" },
        { title: "Fórmula cuadrática", sub: "Derivación, uso, interpretación del discriminante" },
        { title: "Función polinomial", sub: "Grado, raíces, comportamiento extremo" },
        { title: "Función exponencial", sub: "f(x)=aˣ, crecimiento y decrecimiento" },
        { title: "Número e", sub: "Número de Euler, función natural eˣ" },
        { title: "Logaritmos", sub: "Definición, propiedades, cambio de base" },
        { title: "Ecuaciones logarítmicas", sub: "Resolución, aplicaciones" },
        { title: "Función racional", sub: "Asíntotas, dominio, simplificación" },
        { title: "Función radical", sub: "Dominio, gráfica, simplificación" },
        { title: "Composición de funciones", sub: "f(g(x)), descomposición" },
        { title: "Función inversa", sub: "Definición, cálculo, gráfica especular" },
        { title: "Transformaciones", sub: "Traslaciones, reflexiones, escalado, compresión" },
        { title: "Inecuaciones cuadráticas", sub: "Signos, tabla de valores, gráfica" },
        { title: "Modelización", sub: "Crear funciones a partir de situaciones reales" },
      ],
    },
    {
      num: "6",
      title: "Precálculo, estadística y probabilidad",
      time: "Semanas 29–40 · ~60–84h",
      level: "Avanzado",
      badge: "Puente al cálculo",
      color: "from-purple-500/20 to-indigo-500/10",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-300",
      badgeClass: "bg-purple-500/10 text-purple-300 border-purple-500/30",
      dotBg: "bg-purple-400",
      desc: "La gran antesala del cálculo. Esta etapa también incluye estadística completa — esencial para ciencia de datos, biología, economía y casi cualquier carrera universitaria.",
      topics: [
        { title: "Sucesiones aritméticas", sub: "Término n-ésimo, suma de n términos" },
        { title: "Sucesiones geométricas", sub: "Razón común, suma, progresión infinita" },
        { title: "Series infinitas", sub: "Convergencia, criterios básicos" },
        { title: "Binomio de Newton", sub: "Triángulo de Pascal, coeficientes binomiales" },
        { title: "Combinatoria", sub: "Principio multiplicativo, diagramas de árbol" },
        { title: "Permutaciones", sub: "Con y sin repetición, permutaciones parciales" },
        { title: "Combinaciones", sub: "Número combinatorio C(n,k)" },
        { title: "Probabilidad clásica", sub: "Espacio muestral, eventos, regla de Laplace" },
        { title: "Probabilidad condicional", sub: "P(A|B), independencia, multiplicación" },
        { title: "Teorema de Bayes", sub: "Actualización de probabilidades" },
        { title: "Variables aleatorias", sub: "Discretas, continuas, esperanza, varianza" },
        { title: "Distribución binomial", sub: "Fórmula, cálculo, media y varianza" },
        { title: "Distribución normal", sub: "Curva de Gauss, z-scores, percentiles" },
        { title: "Estadística descriptiva", sub: "Media, mediana, moda, rango" },
        { title: "Dispersión", sub: "Varianza, desviación estándar, coeficiente variación" },
        { title: "Cuartiles y percentiles", sub: "Box plot, IQR, outliers" },
        { title: "Correlación y regresión", sub: "Diagrama de dispersión, r de Pearson, recta" },
        { title: "Límites (introducción)", sub: "Concepto intuitivo, límites laterales" },
        { title: "Continuidad", sub: "Definición, discontinuidades" },
        { title: "Vectores 2D y 3D", sub: "Componentes, magnitud, dirección" },
        { title: "Operaciones con vectores", sub: "Suma, escalar, producto punto y cruz" },
        { title: "Números complejos", sub: "Forma binómica, operaciones, conjugado" },
        { title: "Forma polar", sub: "Módulo, argumento, fórmula de De Moivre" },
      ],
    },
    {
      num: "7",
      title: "Cálculo diferencial e integral",
      time: "Semanas 41–56 · ~80–112h",
      level: "Universitario",
      badge: "Lenguaje de la ciencia",
      color: "from-fuchsia-500/20 to-pink-500/10",
      borderColor: "border-fuchsia-500/30",
      textColor: "text-fuchsia-300",
      badgeClass: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30",
      dotBg: "bg-fuchsia-400",
      desc: "El pico de las matemáticas de bachillerato/universidad. El cálculo describe cómo cambian las cosas — es el lenguaje de la física, ingeniería, economía y prácticamente toda la ciencia moderna.",
      topics: [
        { title: "Límites formales", sub: "Definición ε-δ, propiedades, indeterminaciones" },
        { title: "Límites al infinito", sub: "Asíntotas horizontales, comportamiento" },
        { title: "L'Hôpital", sub: "Regla para indeterminaciones 0/0 y ∞/∞" },
        { title: "Continuidad formal", sub: "Teorema del valor intermedio" },
        { title: "Derivada: definición", sub: "Límite del cociente diferencial, tasa de cambio" },
        { title: "Reglas de derivación", sub: "Potencia, suma, producto, cociente" },
        { title: "Regla de la cadena", sub: "Composición de funciones, interpretación" },
        { title: "Derivadas implícitas", sub: "Diferenciación implícita" },
        { title: "Derivadas de orden superior", sub: "Segunda derivada, concavidad" },
        { title: "Análisis de funciones", sub: "Monotonía, extremos, puntos de inflexión" },
        { title: "Optimización", sub: "Máximos y mínimos en problemas reales" },
        { title: "Problemas de razón de cambio", sub: "Velocidad, aceleración, contexto físico" },
        { title: "Diferenciales", sub: "Aproximación lineal, dy y dx" },
        { title: "Integral indefinida", sub: "Antiderivada, constante de integración" },
        { title: "Reglas de integración", sub: "Potencia, exponencial, trigonométricas" },
        { title: "Sustitución (u-substitution)", sub: "Técnica de cambio de variable" },
        { title: "Integración por partes", sub: "Fórmula, selección de u y dv (LIATE)" },
        { title: "Fracciones parciales", sub: "Descomposición, factores lineales/cuadráticos" },
        { title: "Integral definida", sub: "Sumas de Riemann, definición geométrica" },
        { title: "Teorema fundamental", sub: "Parte 1 y 2, evaluación exacta" },
        { title: "Área bajo la curva", sub: "Área entre funciones" },
        { title: "Volúmenes de revolución", sub: "Método del disco y arandelas" },
        { title: "Integrales impropias", sub: "Límites infinitos, discontinuidades" },
        { title: "Series de Taylor / Maclaurin", sub: "Aproximaciones de funciones analíticas" },
      ],
    },
    {
      num: "+",
      title: "Álgebra lineal y cálculo multivariable (Bonus)",
      time: "Post-cálculo · Abierto",
      level: "Universitario Avanzado",
      badge: "Especialización",
      color: "from-cyan-500/20 to-blue-500/10",
      borderColor: "border-cyan-500/30",
      textColor: "text-cyan-300",
      badgeClass: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      dotBg: "bg-cyan-400",
      desc: "Para quienes quieran ir más lejos: ingeniería, ciencia de datos, machine learning, física teórica. Esta etapa ya es propiamente matemática universitaria de primer y segundo año.",
      topics: [
        { title: "Matrices", sub: "Operaciones, determinante, inversa" },
        { title: "Sistemas matriciales", sub: "Eliminación de Gauss, Gauss-Jordan" },
        { title: "Espacios vectoriales", sub: "Base, dimensión, independencia lineal" },
        { title: "Transformaciones lineales", sub: "Núcleo, imagen, representación matricial" },
        { title: "Valores y vectores propios", sub: "Eigenvalues, eigenvectors, diagonalización" },
        { title: "Funciones de varias variables", sub: "Dominio en ℝ², curvas de nivel" },
        { title: "Derivadas parciales", sub: "Regla de la cadena multivariable" },
        { title: "Gradiente y optimización", sub: "Multiplicadores de Lagrange" },
        { title: "Integrales dobles y triples", sub: "Orden de integración, coordenadas polares" },
        { title: "Ecuaciones diferenciales", sub: "EDO de 1er orden, variables separables" },
        { title: "EDO lineales de 2do orden", sub: "Coeficientes constantes, aplicaciones" },
        { title: "Transformada de Laplace", sub: "Definición, propiedades, inversas" },
      ],
    },
  ];

  const strategies = [
    {
      icon: "📅",
      title: "Práctica distribuida",
      desc: "Estudia 30–60 min al día en lugar de sesiones maratónicas el fin de semana. El cerebro consolida conexiones neuronales durante el sueño.",
      points: [
        "5 días/semana (1h/día) > 1 día de 5 horas seguidas",
        "Dedica 10 min al inicio para repasar el día anterior",
        "Estudia a la misma hora para consolidar el hábito",
        "El aprendizaje distribuido genera memoria duradera",
      ],
    },
    {
      icon: "🎯",
      title: "Recuperación activa",
      desc: "No releer apuntes de forma pasiva: cerrar el libro e intentar resolver ejercicios. El esfuerzo deliberado de recordar es lo que fortalece la sinapsis.",
      points: [
        "Resuelve el problema antes de ver la solución",
        "Explica el concepto en voz alta sin mirar apuntes",
        "Usa flashcards de fórmulas y definiciones (Anki)",
        "Haz mini-tests de autoevaluación tras cada tema",
      ],
    },
    {
      icon: "📒",
      title: "Cuaderno de errores",
      desc: "Cada error es una oportunidad de oro. Llevar un registro sistemático de errores frecuentes acelera el progreso exponencialmente.",
      points: [
        "Anota el ejercicio, tu fallo específico y la corrección",
        "Revisa el cuaderno una vez por semana",
        "Repite ejercicios del mismo tipo hasta dominar el patrón",
        "Los errores revelan vacíos conceptuales que debes parchar",
      ],
    },
    {
      icon: "🔀",
      title: "Práctica intercalada",
      desc: "Mezcla distintos tipos de problemas en una misma sesión en vez de hacer 50 del mismo tipo exacto. Es más retador pero mucho más efectivo.",
      points: [
        "Combina ejercicios de álgebra con aritmética o fracciones",
        "Entrena el cerebro para identificar qué método aplicar",
        "Evita la trampa del piloto automático en ejercicios idénticos",
        "Simula situaciones reales de examen o aplicación",
      ],
    },
    {
      icon: "🧑‍🏫",
      title: "Técnica Feynman",
      desc: "Si no puedes explicar un concepto en palabras simples, no lo has entendido con profundidad. Enseñar es la prueba de fuego del conocimiento.",
      points: [
        "Explica el tema como si fuera para alguien sin experiencia",
        "Identifica con precisión el punto exacto donde te trabas",
        "Regresa al material, aclara la laguna y vuelve a explicar",
        "Grábate o dibuja esquemas explicativos en papel",
      ],
    },
    {
      icon: "🧩",
      title: "Comprensión > Memorización",
      desc: "Pregunta siempre '¿por qué funciona esto?' antes de memorizar el procedimiento. Las fórmulas que entiendes jamás se olvidan.",
      points: [
        "Intenta deducir o derivar las fórmulas por tu cuenta",
        "Busca la intuición visual o geométrica de cada concepto",
        "Conecta la abstracción matemática con un ejemplo tangible",
        "La memorización ciega colapsa ante el menor cambio de contexto",
      ],
    },
    {
      icon: "🌱",
      title: "Mentalidad de crecimiento",
      desc: "La neurociencia demuestra que la habilidad matemática no es un talento genético fijo, sino un músculo que se desarrolla con práctica deliberada.",
      points: [
        "Cambia 'No soy bueno en esto' por 'Aún no lo domino'",
        "Celebra el esfuerzo y la estrategia, no solo el acierto",
        "La frustración inicial es señal de que estás creando nuevas redes",
        "Cualquier persona puede aprender matemáticas con el método adecuado",
      ],
    },
    {
      icon: "🔗",
      title: "Conexión con la realidad",
      desc: "Conecta cada tema con disciplinas que te interesen. Las matemáticas cobran vida cuando resuelven preguntas reales.",
      points: [
        "Finanzas: fracciones, porcentajes, interés compuesto",
        "Música: frecuencias, armonías, fracciones y ondas",
        "Tecnología: álgebra booleana, grafos y lógica computacional",
        "Ciencia de datos: estadística, cálculo y matrices",
      ],
    },
    {
      icon: "😴",
      title: "El rol sagrado del descanso",
      desc: "El cerebro procesa y reordena las estructuras matemáticas complejas mientras descansas o duermes.",
      points: [
        "Dormir 7–8 horas es una parte obligatoria del entrenamiento mental",
        "Si te bloqueas con un problema, déjalo para mañana — funciona",
        "Usa bloques de 25–30 min con 5 min de descanso activo (Pomodoro)",
        "Estudiar con fatiga mental extrema reduce la retención a cero",
      ],
    },
  ];

  const tricks = [
    {
      num: "01",
      category: "Resolución",
      title: "El truco del '¿Qué me piden?'",
      desc: "Antes de hacer cualquier cálculo, escribe en tu cuaderno: '1) Me piden: X. 2) Tengo: Y. 3) El puente lógico es: Z'. Esto elimina el 70% de los errores por lectura apresurada.",
      example: "Problema: 'Un tren viaja a 60 km/h y recorre 180 km...' → Me piden: tiempo. Tengo: distancia (180) y velocidad (60). Puente: t = d / v = 180 / 60 = 3h.",
    },
    {
      num: "02",
      category: "Resolución",
      title: "Verificación hacia atrás (Back-substitution)",
      desc: "Al llegar a la solución de una ecuación o problema, reemplázala en el enunciado original. Si la igualdad se cumple, está garantizado; si no, busca en qué línea se alteró el equilibrio.",
      example: "Si 3x + 5 = 20 te dio x = 5, comprueba: 3(5) + 5 = 15 + 5 = 20 ✓. ¡Verificación instantánea!",
    },
    {
      num: "03",
      category: "Resolución",
      title: "Estimación rápida antes de calcular",
      desc: "Calcula mentalmente un orden de magnitud aproximado antes de operar con números exactos. Si tu cálculo da 2400 y tu estimación era ~25, detectas el error antes de escribir la respuesta final.",
      example: "47 × 19 → Redondea a 50 × 20 = 1000. Si en papel te sale 893, estás cerca y tiene sentido (el resultado exacto es 893).",
    },
    {
      num: "04",
      category: "Resolución",
      title: "Cambio de representación",
      desc: "Cuando una ecuación no tenga sentido en símbolos, dibújala como una gráfica, tradúcela a una recta numérica, crea una tabla de valores o exprésala con formas geométricas.",
      example: "Si x² - 4 = 0 te confunde, dibuja la parábola y = x² - 4 y observa los dos puntos donde corta el eje X (en -2 y 2).",
    },
    {
      num: "05",
      category: "Cálculo Mental",
      title: "Multiplicar por 11 en 1 segundo",
      desc: "Para cualquier número de 2 dígitos: suma ambos dígitos y coloca el resultado en el medio. Si la suma supera 9, lleva 1 a la izquierda.",
      example: "35 × 11 → 3 + 5 = 8 → 385. | 78 × 11 → 7 + 8 = 15 → llevas 1 al 7 → 858.",
    },
    {
      num: "06",
      category: "Cálculo Mental",
      title: "Cuadrados de números terminados en 5",
      desc: "Toma el dígito que precede al 5, multiplícalo por su consecutivo (n × (n+1)), y pon '25' al final de la cifra.",
      example: "35² → 3 × 4 = 12 → 1225. | 75² → 7 × 8 = 56 → 5625. | 95² → 9 × 10 = 90 → 9025.",
    },
    {
      num: "07",
      category: "Cálculo Mental",
      title: "Porcentajes reversibles (X% de Y = Y% de X)",
      desc: "Los porcentajes son conmutativos: calcular el 18% de 50 es idéntico a calcular el 50% de 18, pero diez veces más fácil de resolver en la cabeza.",
      example: "¿18% de 50? Es igual al 50% de 18 = 9. | ¿4% de 75? Es igual al 75% de 4 = 3/4 de 4 = 3.",
    },
    {
      num: "08",
      category: "Estudio",
      title: "Escribe siempre a mano en hoja cuadriculada",
      desc: "La escritura manual estimula la corteza parietal del cerebro, encargada del procesamiento espacial y numérico. Evita hacer cálculos en notas digitales durante el aprendizaje inicial.",
      example: "Un cuaderno cuadriculado A4 con márgenes amplios para anotaciones laterales y cajas de colores para fórmulas.",
    },
  ];

  const formulaGroups: Record<string, { title: string; desc: string; formula: string }[]> = {
    arith: [
      { title: "MCD y MCM", desc: "Relación fundamental para dos números a y b", formula: "MCD(a,b) × MCM(a,b) = a × b" },
      { title: "Interés simple", desc: "P: capital inicial, r: tasa de interés, t: tiempo", formula: "I = P · r · t" },
      { title: "Interés compuesto", desc: "n: periodos de capitalización por año", formula: "A = P · (1 + r/n)^(n·t)" },
      { title: "Porcentaje básico", desc: "Calcular qué fracción porcentual representa una parte", formula: "% = (Parte / Total) × 100" },
      { title: "Regla de tres directa", desc: "Si a produce b, entonces c producirá x", formula: "x = (b · c) / a" },
      { title: "Valor absoluto", desc: "Distancia euclidiana al origen en la recta real", formula: "|a| = a si a ≥ 0 ; -a si a < 0" },
    ],
    algebra: [
      { title: "Fórmula cuadrática", desc: "Soluciones universales para ax² + bx + c = 0", formula: "x = (-b ± √(b² - 4ac)) / (2a)" },
      { title: "Discriminante", desc: "Δ > 0 (2 reales), Δ = 0 (1 real), Δ < 0 (complejas)", formula: "Δ = b² - 4ac" },
      { title: "Binomio al cuadrado", desc: "Desarrollo del producto notable cuadrático", formula: "(a ± b)² = a² ± 2ab + b²" },
      { title: "Diferencia de cuadrados", desc: "Factorización indispensable en simplificación", formula: "a² - b² = (a + b)(a - b)" },
      { title: "Leyes de exponentes", desc: "Multiplicación, potencias de potencias y negativos", formula: "aᵐ · aⁿ = aᵐ⁺ⁿ  |  (aᵐ)ⁿ = aᵐⁿ  |  a⁻ⁿ = 1/aⁿ" },
      { title: "Relaciones de Viète", desc: "Suma y producto de las raíces de un polinomio", formula: "x₁ + x₂ = -b/a  |  x₁ · x₂ = c/a" },
      { title: "Progresión aritmética", desc: "Término n-ésimo y suma acumulada de n términos", formula: "aₙ = a₁ + (n-1)d  |  Sₙ = n(a₁ + aₙ) / 2" },
      { title: "Progresión geométrica", desc: "Término n-ésimo y suma para razón r ≠ 1", formula: "aₙ = a₁ · rⁿ⁻¹  |  Sₙ = a₁(1 - rⁿ) / (1 - r)" },
    ],
    geo: [
      { title: "Teorema de Pitágoras", desc: "Relación entre catetos e hipotenusa en triángulo rect.", formula: "c² = a² + b²  ⟹  c = √(a² + b²)" },
      { title: "Área del triángulo", desc: "Base por altura o mediante fórmula de Herón", formula: "A = (b · h) / 2  |  A = √(s(s-a)(s-b)(s-c))" },
      { title: "Círculo", desc: "Área y perímetro (circunferencia) en función del radio", formula: "Área = π·r²  |  Perímetro = 2·π·r" },
      { title: "Cilindro recto", desc: "Volumen interior y área de superficie total", formula: "V = π·r²·h  |  S = 2πr(r + h)" },
      { title: "Esfera", desc: "Volumen y área superficial total", formula: "V = (4/3)·π·r³  |  S = 4·π·r²" },
      { title: "Distancia entre dos puntos", desc: "Distancia cartesiana en el plano 2D", formula: "d = √((x₂ - x₁)² + (y₂ - y₁)²)" },
    ],
    trig: [
      { title: "Razones básicas (SOH-CAH-TOA)", desc: "Seno, coseno y tangente en triángulo rectángulo", formula: "sin(θ) = op/hip | cos(θ) = ad/hip | tan(θ) = op/ad" },
      { title: "Identidad pitagórica fundamental", desc: "La identidad más importante de la trigonometría", formula: "sin²(θ) + cos²(θ) = 1" },
      { title: "Identidades secundarias", desc: "Relación con secante, cosecante y cotangente", formula: "1 + tan²(θ) = sec²(θ)  |  1 + cot²(θ) = csc²(θ)" },
      { title: "Ángulo doble", desc: "Fórmulas de duplicación de ángulo", formula: "sin(2θ) = 2·sin(θ)cos(θ)  |  cos(2θ) = cos²(θ) - sin²(θ)" },
      { title: "Ley de senos", desc: "Para resolver cualquier triángulo oblicuángulo", formula: "a / sin(A) = b / sin(B) = c / sin(C)" },
      { title: "Ley de cosenos", desc: "Generalización del Teorema de Pitágoras", formula: "c² = a² + b² - 2ab · cos(C)" },
    ],
    func: [
      { title: "Función lineal y pendiente", desc: "Ecuación explícita y cálculo de pendiente m", formula: "y = mx + b  |  m = (y₂ - y₁) / (x₂ - x₁)" },
      { title: "Vértice de una parábola", desc: "Coordenada x del vértice en f(x) = ax² + bx + c", formula: "xᵥ = -b / (2a)  |  yᵥ = f(xᵥ)" },
      { title: "Propiedades de logaritmos", desc: "Logaritmo de un producto, cociente y potencia", formula: "log(xy) = log x + log y  |  log(xⁿ) = n · log x" },
      { title: "Cambio de base logarítmica", desc: "Para evaluar logaritmos en cualquier base b", formula: "log_b(x) = ln(x) / ln(b) = log₁₀(x) / log₁₀(b)" },
      { title: "Función exponencial natural", desc: "Base de Euler con tasa de cambio continua", formula: "f(t) = P₀ · e^(kt)" },
    ],
    calc: [
      { title: "Definición formal de derivada", desc: "Tasa de cambio instantánea como límite del cociente", formula: "f'(x) = lim[h→0] (f(x+h) - f(x)) / h" },
      { title: "Regla de la potencia", desc: "Derivada e integral elemental de xⁿ", formula: "d/dx[xⁿ] = n·xⁿ⁻¹  |  ∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C" },
      { title: "Regla del producto y cociente", desc: "Derivación de multiplicaciones y divisiones", formula: "(fg)' = f'g + fg'  |  (f/g)' = (f'g - fg') / g²" },
      { title: "Regla de la cadena", desc: "Derivación de composición de funciones f(g(x))", formula: "d/dx [f(g(x))] = f'(g(x)) · g'(x)" },
      { title: "Teorema Fundamental del Cálculo", desc: "Conexión exacta entre antiderivada e integral", formula: "∫ₐᵇ f(x) dx = F(b) - F(a)" },
      { title: "Integración por partes", desc: "Técnica LIATE (Log, Inv trig, Alg, Trig, Exp)", formula: "∫ u dv = u·v - ∫ v du" },
    ],
    stat: [
      { title: "Media aritmética (Promedio)", desc: "Suma de todos los valores dividido entre n", formula: "x̄ = (Σ xᵢ) / n" },
      { title: "Varianza y Desviación estándar", desc: "Medidas de dispersión poblacional / muestral", formula: "σ² = Σ(xᵢ - x̄)² / n  |  σ = √(σ²)" },
      { title: "Puntuación Z (Z-Score)", desc: "Número de desviaciones estándar respecto a la media", formula: "z = (x - μ) / σ" },
      { title: "Probabilidad clásica (Laplace)", desc: "Cociente entre casos favorables y totales", formula: "P(A) = Casos Favorables / Casos Posibles" },
      { title: "Probabilidad condicional", desc: "Probabilidad del suceso A dado que ocurrió B", formula: "P(A|B) = P(A ∩ B) / P(B)" },
      { title: "Combinatoria C(n, k)", desc: "Formas de elegir k elementos sin importar el orden", formula: "C(n, k) = n! / (k! · (n - k)!)" },
    ],
  };

  const diagQuestions = [
    { q: "¿Cuánto es 7 × 8?", opts: ["54", "56", "48", "64"], ans: 1, level: 1 },
    { q: "¿Cuál es el Máximo Común Divisor (MCD) de 12 y 18?", opts: ["3", "6", "9", "12"], ans: 1, level: 1 },
    { q: "Simplifica la fracción: 18 / 24", opts: ["3/4", "2/3", "6/8", "9/12"], ans: 0, level: 2 },
    { q: "¿Cuánto es el 15% de 80?", opts: ["10", "12", "15", "20"], ans: 1, level: 2 },
    { q: "Resuelve la ecuación lineal: 3x + 7 = 22", opts: ["x = 3", "x = 4", "x = 5", "x = 6"], ans: 2, level: 3 },
    { q: "¿Cuánto mide la hipotenusa de un triángulo rectángulo de catetos 3 y 4?", opts: ["5", "6", "7", "√7"], ans: 0, level: 4 },
    { q: "¿Cuál es el dominio real de la función f(x) = √(x − 3)?", opts: ["x > 3", "x ≥ 3", "x < 3", "Todos los números reales"], ans: 1, level: 5 },
    { q: "¿Cuál es el valor exacto de log₂(32)?", opts: ["4", "5", "6", "16"], ans: 1, level: 5 },
    { q: "¿Cuál es la derivada de la función f(x) = x³ − 2x?", opts: ["3x² − 2", "3x² + 2", "x² − 2", "3x − 2"], ans: 0, level: 7 },
    { q: "¿Cuál es el valor de la integral definida ∫₀² x² dx?", opts: ["4/3", "8/3", "4", "8"], ans: 1, level: 7 },
  ];

  const handleSelectAnswer = (optIndex: number) => {
    if (diagState.isAnswered) return;
    const q = diagQuestions[diagState.current];
    const isCorrect = optIndex === q.ans;
    setDiagState((prev) => ({
      ...prev,
      selectedAnswer: optIndex,
      isAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: [...prev.answers, optIndex],
    }));

    setTimeout(() => {
      setDiagState((prev) => ({
        ...prev,
        current: prev.current + 1,
        selectedAnswer: null,
        isAnswered: false,
      }));
    }, 750);
  };

  const resetDiagnostic = () => {
    setDiagState({
      started: false,
      current: 0,
      score: 0,
      answers: [],
      selectedAnswer: null,
      isAnswered: false,
    });
  };

  const getDiagResultInfo = (score: number) => {
    if (score <= 2) {
      return {
        title: "Recomendación: Empieza en la Etapa 1",
        desc: "Refuerza los fundamentos aritméticos y números enteros. Construir cimientos sólidos ahora te ahorrará cientos de horas de confusión en álgebra y cálculo.",
        badge: "Etapa 1 · Aritmética",
      };
    } else if (score <= 4) {
      return {
        title: "Recomendación: Empieza en la Etapa 2",
        desc: "Dominas lo más básico, pero requieres afianzar fracciones, decimales, porcentajes y regla de tres antes de dar el salto al álgebra formal.",
        badge: "Etapa 2 · Fracciones & %",
      };
    } else if (score <= 6) {
      return {
        title: "Recomendación: Empieza en las Etapas 3 y 4",
        desc: "Buena base de cálculo. Es el momento perfecto para profundizar en ecuaciones, sistemas, productos notables, geometría euclidiana y trigonometría.",
        badge: "Etapa 3–4 · Álgebra & Geometría",
      };
    } else if (score <= 8) {
      return {
        title: "Recomendación: Empieza en las Etapas 5 y 6",
        desc: "Sólido nivel intermedio. Concéntrate en funciones avanzadas, exponenciales, logaritmos, vectores, estadística descriptiva y límites intuitivos.",
        badge: "Etapa 5–6 · Funciones & Precálculo",
      };
    } else {
      return {
        title: "¡Listo para Cálculo Universitario!",
        desc: "¡Excelente nivel matemático! Tienes una base de álgebra y funciones impecable. Puedes abordar límites formales, derivadas, integrales y optimización sin miedo.",
        badge: "Etapa 7 · Cálculo Integral & Diferencial",
      };
    }
  };

  const faqs = [
    {
      q: "¿Cuánto tiempo al día debo dedicarle para ver resultados reales?",
      a: "30 a 60 minutos diarios de práctica concentrada es inmensamente más efectivo que hacer 4 horas seguidas un solo día. La regularidad permite al cerebro consolidar sinapsis durante el descanso nocturno. Si solo dispones de 25 minutos, úsalos con la técnica Pomodoro.",
    },
    {
      q: "¿Se necesita un talento innato o 'cerebro matemático' para aprender?",
      a: "No. La psicología cognitiva (investigaciones de la Dra. Carol Dweck en Stanford) ha demostrado que la habilidad matemática se entrena mediante práctica deliberada y buenas estrategias. El mito del 'talento natural' es la principal causa de abandono; con método y paciencia, cualquiera puede llegar a cálculo universitario.",
    },
    {
      q: "¿Es suficiente aprender solo viendo videos en YouTube?",
      a: "Los videos son fantásticos para entender la intuición y el 'por qué', pero son pasivos. La verdadera fluidez se adquiere resolviendo problemas con lápiz y papel. La fórmula ganadora es: Video explicativo + Plataforma interactiva (como Khan Academy) + Ejercicios a mano sin calculadora.",
    },
    {
      q: "¿Cuándo sé que estoy listo para avanzar a la siguiente etapa?",
      a: "Cuando puedas resolver con soltura al menos el 80–85% de los ejercicios prácticos de un tema sin consultar apuntes ni ver soluciones previas, idealmente 24 horas después de haberlo estudiado por primera vez.",
    },
    {
      q: "¿Qué debo hacer cuando me quedo completamente bloqueado en un ejercicio?",
      a: "1) Intenta durante 10 minutos en soledad. 2) Escribe en papel lo que sí sabes con certeza. 3) Consulta un ejemplo similar resuelto (no la respuesta directa del tuyo). 4) Mira una explicación alternativa en otro canal. 5) Si persiste el bloqueo, descansa y retómalo al día siguiente.",
    },
    {
      q: "¿Debo memorizar todas las fórmulas o solo entenderlas?",
      a: "Las fórmulas más frecuentes (área del círculo, Pitágoras, fórmula cuadrática, derivadas básicas) conviene tenerlas automáticas para no interrumpir el flujo de pensamiento. Sin embargo, siempre debes comprender su deducción lógica para saber cuándo aplican y cuándo no.",
    },
    {
      q: "¿Para qué me sirven las matemáticas en el mundo moderno y profesional?",
      a: "Entrenan el pensamiento analítico y la resolución estructurada de problemas complejos. Son indispensables en finanzas personales e inversiones, análisis de datos, inteligencia artificial, programación, diseño arquitectónico, ciencias de la salud y toma racional de decisiones.",
    },
  ];

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-purple-900/40 via-indigo-900/30 to-purple-900/40 border border-purple-500/30 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5 text-purple-300" />
              Ruta Autodidacta Completa
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Aprende Matemáticas <span className="text-purple-400 italic font-serif">desde Cero</span>
            </h1>
            <p className="text-purple-200/80 text-sm sm:text-base max-w-2xl leading-relaxed">
              Desde aritmética y fracciones elementales hasta cálculo universitario y álgebra lineal.
              Temario detallado, fórmulas interactivas, diagnóstico de nivel y estrategias basadas en neurociencia.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 border border-purple-500/20 rounded-2xl p-3.5 backdrop-blur-md shrink-0">
            <div className="text-center px-2">
              <span className="block text-xl font-bold text-emerald-400">7+1</span>
              <span className="text-[11px] text-purple-200/70 font-medium">Etapas</span>
            </div>
            <div className="text-center px-2 border-l border-white/10">
              <span className="block text-xl font-bold text-purple-300">~12</span>
              <span className="text-[11px] text-purple-200/70 font-medium">Meses</span>
            </div>
            <div className="text-center px-2 border-l border-white/10">
              <span className="block text-xl font-bold text-amber-400">100%</span>
              <span className="text-[11px] text-purple-200/70 font-medium">Gratis</span>
            </div>
            <div className="text-center px-2 border-l border-white/10">
              <span className="block text-xl font-bold text-cyan-400">1 h/d</span>
              <span className="text-[11px] text-purple-200/70 font-medium">Constante</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtabs Navigator */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer select-none border ${
                isActive
                  ? "bg-purple-600 text-white border-purple-400 shadow-[0_0_16px_rgba(168,85,247,0.35)] scale-102"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-purple-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: TEMARIO POR ETAPAS */}
      {(activeSubTab === "all" || activeSubTab === "temario") && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Estructura Progresiva
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              Temario Completo por Etapas
            </h2>
            <p className="text-purple-200/70 text-sm">
              Cada etapa se apoya sólidamente en la anterior. Haz clic en cada etapa para desplegar sus subtemas y conceptos clave.
            </p>
          </div>

          <div className="space-y-4">
            {stages.map((st, idx) => {
              const isOpen = !!openStages[idx];
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border ${st.borderColor} bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-200`}
                >
                  <button
                    onClick={() =>
                      setOpenStages((prev) => ({ ...prev, [idx]: !prev[idx] }))
                    }
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base ${st.badgeClass} shrink-0`}
                      >
                        {st.num}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                          {st.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="text-purple-300/80 font-medium">{st.time}</span>
                          <span className="text-purple-500">•</span>
                          <span className={`px-2 py-0.5 rounded-md border text-[11px] font-semibold ${st.badgeClass}`}>
                            {st.level}
                          </span>
                          <span className="px-2 py-0.5 rounded-md border text-[11px] font-semibold bg-white/5 border-white/10 text-purple-200/80">
                            {st.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-purple-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/5"
                      >
                        <p className="text-xs sm:text-sm text-purple-200/80 mb-5 leading-relaxed">
                          {st.desc}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {st.topics.map((tp, tpIdx) => (
                            <div
                              key={tpIdx}
                              className="rounded-xl bg-white/5 border border-purple-500/15 p-3.5 hover:border-purple-400/40 hover:bg-white/8 transition-all"
                            >
                              <strong className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1">
                                {tp.title}
                              </strong>
                              <span className="text-xs text-purple-100/80 leading-snug block">
                                {tp.sub}
                              </span>
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

          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/25 text-xs sm:text-sm text-purple-200 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-semibold">Consejo pedagógico: </strong>
              No necesitas dominar cada etapa al 100% para empezar la siguiente. Con un 80–85% de fluidez es momento de avanzar. Los conceptos pendientes se consolidarán de forma natural al aplicarlos en niveles superiores.
            </div>
          </div>
        </motion.section>
      )}

      {/* SECTION 2: ROADMAP VISUAL */}
      {(activeSubTab === "all" || activeSubTab === "roadmap") && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Línea de Tiempo
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-cyan-400" />
              Roadmap Visual: Tu Camino Completo
            </h2>
            <p className="text-purple-200/70 text-sm">
              Visualiza cada hito del viaje desde la base numérica hasta las ramas universitarias.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-linear-to-b before:from-emerald-400 before:via-purple-500 before:to-cyan-400">
            {stages.map((st, i) => (
              <div key={i} className="relative group">
                {/* Dot */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-4 w-4 h-4 rounded-full ${st.dotBg} border-4 border-black/80 shadow-[0_0_10px_currentColor] z-10 transition-transform group-hover:scale-125`}
                />

                <div className="rounded-2xl bg-white/5 border border-purple-500/20 hover:border-purple-400/40 p-5 sm:p-6 backdrop-blur-md transition-all duration-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                        Etapa {st.num}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">{st.title}</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-purple-500/30 text-purple-200 self-start sm:self-auto">
                      {st.time}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">{st.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {st.topics.slice(0, 5).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-purple-500/10 border border-purple-500/20 text-purple-300"
                      >
                        {t.title}
                      </span>
                    ))}
                    {st.topics.length > 5 && (
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/5 text-purple-300/70">
                        +{st.topics.length - 5} más
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <h4 className="text-emerald-300 font-bold text-sm sm:text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Tiempo Total Estimado
              </h4>
              <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                Estudiando de <strong>1 a 2 horas diarias (5 días por semana)</strong>, completarás el recorrido de cero a cálculo diferencial e integral en <strong>10 a 14 meses</strong>. Si dispones de 30 min al día, toma aproximadamente 24 meses.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <h4 className="text-amber-300 font-bold text-sm sm:text-base flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                Señales Claras de Avance Real
              </h4>
              <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                Resuelves ejercicios de etapas anteriores sin dudar, identificas patrones comunes, cometes errores nuevos en vez de repetir los mismos, y logras explicar el concepto a otra persona con naturalidad.
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* SECTION 3: ESTRATEGIAS */}
      {(activeSubTab === "all" || activeSubTab === "estrategias") && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Ciencia del Aprendizaje
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-amber-400" />
              Cómo Aprender Matemáticas (de Verdad)
            </h2>
            <p className="text-purple-200/70 text-sm">
              La metodología correcta multiplica tu velocidad y retención por diez. Estas técnicas están respaldadas por investigación neurocognitiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategies.map((st, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md hover:border-amber-400/40 hover:bg-white/8 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{st.icon}</span>
                    <h3 className="text-base font-bold text-white">{st.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">{st.desc}</p>
                  <ul className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-purple-300/90">
                    {st.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Warning Alert */}
          <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-3">
            <h3 className="text-rose-300 font-bold text-sm sm:text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              7 Errores Comunes que Bloquean a la Mayoría
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-purple-200/90">
              <div className="flex items-center gap-2">
                <span className="text-rose-400 font-bold">1.</span> Ver videos pasivamente sin resolver ejercicios en papel.
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-400 font-bold">2.</span> Saltar temas básicos asumiendo que &ldquo;ya los sabías&rdquo;.
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-400 font-bold">3.</span> Rendirse ante la primera duda en lugar de buscar otra explicación.
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-400 font-bold">4.</span> Memorizar fórmulas sin comprender de dónde nacen.
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-400 font-bold">5.</span> Usar calculadora para todo en etapas iniciales.
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-400 font-bold">6.</span> Hacer solo ejercicios fáciles evitando el reto cognitivo.
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <span className="text-rose-400 font-bold">7.</span> Estudiar sin un plan estructurado, perdiendo semanas en temas dispersos.
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* SECTION 4: RECURSOS */}
      {(activeSubTab === "all" || activeSubTab === "recursos") && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Ecosistema Gratuito
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Wrench className="w-6 h-6 text-emerald-400" />
              Recursos, Canales de YouTube & Plataformas
            </h2>
            <p className="text-purple-200/70 text-sm">
              El 90% de lo necesario hasta cálculo avanzado está disponible gratis en internet si sabes combinar los mejores recursos.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm text-purple-200">
            <strong className="text-emerald-300 font-semibold">La Tripleta Ganadora: </strong>
            Canal de YouTube (para intuición y conceptos) + Plataforma interactiva (para práctica inmediata y feedback) + Libro de texto PDF (para rigor y profundidad).
          </div>

          {/* YouTube en Español */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
              <span>▶️</span> YouTube · En Español
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { name: "Matefácil", tag: "Gratis", desc: "Catálogo monumental de cursos completos. Desde aritmética básica hasta cálculo avanzado y EDO con explicaciones paso a paso." },
                { name: "Julio Profe", tag: "Gratis", desc: "Referente indiscutible en Latinoamérica para álgebra, trigonometría, geometría analítica y precálculo." },
                { name: "Profesor10de3", tag: "Gratis", desc: "Didáctica excepcional y ritmo pausado, ideal para afianzar las etapas 1 a 4 con claridad cristalina." },
                { name: "MatemáticasBachiller", tag: "Gratis", desc: "Enfocado en bachillerato y preparación universitaria, con gran nivel en funciones, matrices y cálculo." },
                { name: "Cibermatex", tag: "Gratis", desc: "Excelente para etapas 6 y 7: límites, derivadas, integrales y álgebra universitaria con demostraciones claras." },
                { name: "EDteam", tag: "Gratis", desc: "Cursos de matemáticas con enfoque directo en programación, algoritmia y ciencia de datos." },
              ].map((c, i) => (
                <div key={i} className="rounded-xl bg-white/5 border border-purple-500/20 p-4 hover:border-purple-400/40 transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-bold text-white text-sm">{c.name}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {c.tag}
                    </span>
                  </div>
                  <p className="text-xs text-purple-200/70 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* YouTube en Inglés */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
              <span>🌐</span> YouTube · En Inglés (Los Mejores del Mundo)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { name: "3Blue1Brown", tag: "Visual", desc: "Las animaciones visuales de álgebra lineal y cálculo ('Essence of Linear Algebra' / 'Calculus') son la cumbre de la intuición matemática." },
                { name: "Professor Leonard", tag: "Universitario", desc: "Clases universitarias completas grabadas en vivo. Posiblemente las explicaciones más completas y amenas del planeta." },
                { name: "Khan Academy", tag: "Global", desc: "La plataforma de referencia mundial con miles de lecciones organizadas por grado y ejercicios interactivos." },
                { name: "The Organic Chemistry Tutor", tag: "Práctica", desc: "A pesar del nombre, tiene cientos de horas de resolución de problemas paso a paso de precálculo y cálculo." },
                { name: "PatrickJMT", tag: "Directo", desc: "Videos cortos y al grano ('Just Math Tutorials') perfectos para repasar un método específico en 5 minutos." },
                { name: "Numberphile", tag: "Inspiración", desc: "Videos entretenidos sobre curiosidades, teoremas fascinantes e historia para mantener la curiosidad viva." },
              ].map((c, i) => (
                <div key={i} className="rounded-xl bg-white/5 border border-purple-500/20 p-4 hover:border-purple-400/40 transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-bold text-white text-sm">{c.name}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {c.tag}
                    </span>
                  </div>
                  <p className="text-xs text-purple-200/70 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Plataformas de Práctica y Software */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
              <span>💻</span> Software & Plataformas de Práctica
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { name: "Khan Academy", type: "Gratis", desc: "Ejercicios adaptativos con pistas, puntos y seguimiento de nivel." },
                { name: "GeoGebra", type: "Gratis", desc: "Graficadora geométrica y calculadora 3D interactiva para visualizar conceptos." },
                { name: "Desmos", type: "Gratis", desc: "La mejor graficadora en línea para entender el comportamiento de funciones." },
                { name: "Wolfram Alpha", type: "Mixto", desc: "Motor de cómputo para verificar desarrollos paso a paso y gráficas complejas." },
                { name: "Brilliant.org", type: "Mixto", desc: "Aprende pensando de forma interactiva con acertijos y principios visuales." },
                { name: "OpenStax", type: "Gratis PDF", desc: "Libros universitarios oficiales de álgebra, precálculo, cálculo y estadística." },
                { name: "Paul's Online Notes", type: "Gratis Web", desc: "Notas de clase magistrales de cálculo I, II, III y EDO." },
                { name: "Symbolab", type: "Mixto", desc: "Calculadora paso a paso útil para auditar errores en ejercicios largos." },
              ].map((p, i) => (
                <div key={i} className="rounded-xl bg-white/5 border border-purple-500/20 p-3.5 hover:border-purple-400/40 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-white text-xs sm:text-sm">{p.name}</h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-purple-200 font-semibold">{p.type}</span>
                  </div>
                  <p className="text-xs text-purple-200/70 leading-snug">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* SECTION 5: TRUCOS */}
      {(activeSubTab === "all" || activeSubTab === "trucos") && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Agilidad & Eficiencia
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-400" />
              Trucos, Hacks & Cálculo Mental Rápido
            </h2>
            <p className="text-purple-200/70 text-sm">
              Técnicas prácticas para no bloquearte, evitar fallos tontos y calcular mentalmente con rapidez.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tricks.map((tr, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md hover:border-amber-400/40 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {tr.category}
                  </span>
                  <span className="text-xl font-black text-amber-400/60 font-mono">{tr.num}</span>
                </div>
                <h3 className="text-base font-bold text-white">{tr.title}</h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">{tr.desc}</p>
                {tr.example && (
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 font-mono leading-relaxed">
                    💡 <strong className="text-amber-300">Ejemplo: </strong>
                    {tr.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* SECTION 6: FORMULAS */}
      {(activeSubTab === "all" || activeSubTab === "formulas") && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Formulario de Consulta
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Calculator className="w-6 h-6 text-purple-400" />
              Hoja de Fórmulas Esenciales
            </h2>
            <p className="text-purple-200/70 text-sm">
              Las fórmulas clave ordenadas por disciplina. Úsalas como referencia rápida mientras dominas su deducción.
            </p>
          </div>

          {/* Formula Category Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: "arith", label: "Aritmética" },
              { id: "algebra", label: "Álgebra" },
              { id: "geo", label: "Geometría" },
              { id: "trig", label: "Trigonometría" },
              { id: "func", label: "Funciones" },
              { id: "calc", label: "Cálculo" },
              { id: "stat", label: "Estadística" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFormulaCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                  formulaCategory === cat.id
                    ? "bg-purple-600 text-white border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                    : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Formula Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {(formulaGroups[formulaCategory] || []).map((f, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-4 backdrop-blur-md hover:border-purple-400/40 hover:bg-white/8 transition-all flex flex-col justify-between gap-2.5"
              >
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                    {f.title}
                  </h4>
                  <p className="text-xs text-purple-200/70 leading-snug mb-2">{f.desc}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs sm:text-sm font-mono text-purple-200 font-bold overflow-x-auto text-center">
                  {f.formula}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* SECTION 7: PLAN SEMANAL */}
      {(activeSubTab === "all" || activeSubTab === "plan") && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Estructura de Estudio
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-cyan-400" />
              Plan Semanal Modelo (1 Hora al Día)
            </h2>
            <p className="text-purple-200/70 text-sm">
              La regla de oro es <strong>70% resolución de problemas en papel</strong> y <strong>30% asimilación de conceptos nuevos</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {[
              { day: "Lunes", tag: "Concepto Nuevo", color: "text-blue-300 border-blue-500/30 bg-blue-500/10", time: "60 min", desc: "Video explicativo + apuntes a mano + 5 ejemplos guiados." },
              { day: "Martes", tag: "Práctica Guiada", color: "text-amber-300 border-amber-500/30 bg-amber-500/10", time: "60 min", desc: "10–15 ejercicios en papel del tema del lunes (de menor a mayor dificultad)." },
              { day: "Miércoles", tag: "Repaso + Nuevo", color: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10", time: "60 min", desc: "15 min de repaso activo previo + 45 min del siguiente concepto." },
              { day: "Jueves", tag: "Práctica Mixta", color: "text-amber-300 border-amber-500/30 bg-amber-500/10", time: "60 min", desc: "Problemas intercalados mezclando los temas de la semana." },
              { day: "Viernes", tag: "Retos & Errores", color: "text-rose-300 border-rose-500/30 bg-rose-500/10", time: "60 min", desc: "2–3 problemas desafiantes + auditoría en tu cuaderno de errores." },
              { day: "Sábado", tag: "Aplicación", color: "text-purple-300 border-purple-500/30 bg-purple-500/10", time: "45 min", desc: "Visualización en GeoGebra, caso aplicado o juego de lógica." },
              { day: "Domingo", tag: "Descanso Activo", color: "text-gray-300 border-gray-500/30 bg-white/5", time: "15 min", desc: "Lectura relajada de fórmulas y planificación de la siguiente semana." },
            ].map((d, idx) => (
              <div key={idx} className="rounded-2xl bg-white/5 border border-purple-500/20 p-3.5 flex flex-col justify-between gap-2 text-center">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 block mb-1">{d.day}</span>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border mb-2 ${d.color}`}>{d.tag}</span>
                  <p className="text-[11px] text-purple-200/70 leading-snug">{d.desc}</p>
                </div>
                <span className="text-[11px] font-semibold text-purple-300/80">{d.time}</span>
              </div>
            ))}
          </div>

          {/* Session Breakdown */}
          <div className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Estructura de una Sesión Ideal de 60 Minutos
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <strong className="text-purple-300 block mb-1">1. Calentamiento (10 min)</strong>
                <p className="text-purple-200/70">Resuelve 3 ejercicios del tema anterior de memoria para reactivar el recuerdo.</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <strong className="text-purple-300 block mb-1">2. Asimilación (20 min)</strong>
                <p className="text-purple-200/70">Aprende el concepto nuevo mediante un video o lectura anotando esquemas visuales.</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <strong className="text-purple-300 block mb-1">3. Práctica Deliberada (25 min)</strong>
                <p className="text-purple-200/70">Resuelve ejercicios variados en papel sin mirar la solución hasta el final.</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 sm:col-span-2 md:col-span-3">
                <strong className="text-purple-300 block mb-1">4. Cierre & Cuaderno de Errores (5 min)</strong>
                <p className="text-purple-200/70">Anota cualquier fallo conceptual o duda que requiera repaso al día siguiente.</p>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* SECTION 8: TEST DIAGNOSTICO */}
      {(activeSubTab === "all" || activeSubTab === "diagnostico") && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Evaluación Inicial
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-400" />
              Test de Nivel Diagnóstico: ¿Dónde Empiezo?
            </h2>
            <p className="text-purple-200/70 text-sm">
              Responde estas 10 preguntas de dificultad progresiva sin calculadora para descubrir en qué etapa te conviene arrancar.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-purple-500/25 p-6 sm:p-8 backdrop-blur-xl">
            {!diagState.started ? (
              <div className="text-center max-w-lg mx-auto space-y-4 py-4">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-300">
                  <Calculator className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Diagnóstico Rápido de 10 Preguntas
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                  Evalúa aritmética, fracciones, álgebra, geometría, funciones y cálculo. Al terminar, recibirás tu puntuación y una recomendación personalizada.
                </p>
                <button
                  onClick={() => setDiagState((prev) => ({ ...prev, started: true }))}
                  className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Comenzar el Test Ahora
                </button>
              </div>
            ) : diagState.current < diagQuestions.length ? (
              <div className="space-y-6 max-w-xl mx-auto">
                {/* Progress Dots */}
                <div className="flex items-center gap-1.5">
                  {diagQuestions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        i < diagState.current
                          ? "bg-purple-500"
                          : i === diagState.current
                          ? "bg-purple-300 shadow-[0_0_8px_rgba(216,180,254,0.6)]"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-purple-300/80">
                    <span>Pregunta {diagState.current + 1} de {diagQuestions.length}</span>
                    <span className="font-semibold">Nivel Etapa {diagQuestions[diagState.current].level}</span>
                  </div>

                  <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                    {diagQuestions[diagState.current].q}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {diagQuestions[diagState.current].opts.map((opt, optIdx) => {
                      const isSelected = diagState.selectedAnswer === optIdx;
                      const isCorrect = optIdx === diagQuestions[diagState.current].ans;
                      const showFeedback = diagState.isAnswered;

                      let btnStyle = "bg-white/5 border-purple-500/20 text-purple-100 hover:bg-white/10 hover:border-purple-400/40";
                      if (showFeedback) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.3)]";
                        } else if (isSelected && !isCorrect) {
                          btnStyle = "bg-rose-500/20 border-rose-400 text-rose-200";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={diagState.isAnswered}
                          onClick={() => handleSelectAnswer(optIdx)}
                          className={`p-4 rounded-2xl border text-left text-sm font-semibold transition-all duration-200 cursor-pointer ${btnStyle}`}
                        >
                          <span className="font-mono text-purple-400 mr-2">
                            {String.fromCharCode(65 + optIdx)})
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center max-w-lg mx-auto space-y-4 py-4 animate-fadeIn">
                <div className="text-4xl sm:text-5xl font-black text-purple-300 font-mono tracking-tight">
                  {diagState.score} / {diagQuestions.length}
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-200 text-xs font-bold">
                  {getDiagResultInfo(diagState.score).badge}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {getDiagResultInfo(diagState.score).title}
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                  {getDiagResultInfo(diagState.score).desc}
                </p>
                <div className="pt-3">
                  <button
                    onClick={resetDiagnostic}
                    className="px-5 py-2.5 rounded-xl border border-purple-500/30 bg-white/5 hover:bg-white/10 text-purple-200 text-xs font-semibold inline-flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reiniciar Test
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* SECTION 9: FAQ */}
      {(activeSubTab === "all" || activeSubTab === "faq") && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Dudas Resueltas
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-purple-400" />
              Preguntas Frecuentes
            </h2>
            <p className="text-purple-200/70 text-sm">
              Las inquietudes más comunes al emprender el viaje matemático autodidacta.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = !!openFaqs[i];
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-purple-500/20 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() =>
                      setOpenFaqs((prev) => ({ ...prev, [i]: !prev[i] }))
                    }
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {faq.q}
                    </span>
                    <span className="text-purple-400 text-lg font-bold shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-purple-200/80 leading-relaxed border-t border-white/5"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* Footer Encouragement Card */}
      <div className="rounded-3xl bg-linear-to-r from-purple-900/40 via-fuchsia-900/30 to-purple-900/40 border border-purple-400/30 p-8 text-center backdrop-blur-xl space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-white">
          &ldquo;Las matemáticas no son sobre números, ecuaciones o algoritmos: son sobre <span className="text-purple-300">comprender el mundo</span>.&rdquo;
        </h3>
        <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mx-auto">
          Confía en tu razonamiento, Sofi. Cada problema resuelto es una victoria para tu mente brillante. 💖
        </p>
      </div>
    </div>
  );
}
