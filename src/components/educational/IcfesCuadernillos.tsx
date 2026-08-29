"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Calculator,
  Languages,
  BookOpen,
  FlaskConical,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  BookCheck,
  Lightbulb,
  Download,
} from "lucide-react";

type BookletSubject = "matematicas" | "ingles" | "lectura" | "ciencias";

export default function IcfesCuadernillos() {
  const [selectedBooklet, setSelectedBooklet] = useState<BookletSubject>("matematicas");
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});
  const [activeView, setActiveView] = useState<"practica" | "claves">("practica");

  const bookletsInfo = {
    matematicas: {
      title: "Prueba de Matemáticas",
      badge: "50 Preguntas · Saber 11.°",
      color: "from-blue-500/20 to-cyan-500/10 border-blue-500/40 text-blue-300",
      accent: "text-blue-400 border-blue-400 bg-blue-500/10",
      icon: Calculator,
      description:
        "Evalúa competencias en Interpretación y representación, Formulación y ejecución, y Argumentación en contextos de la vida cotidiana.",
      sampleQuestions: [
        {
          id: 1,
          context:
            "Cuatro cursos, cada uno con igual número de estudiantes, presentan anualmente una prueba de matemáticas.\nPromedios año anterior: Curso I = 63, II = 61, III = 50, IV = 53.\nPromedios año actual: Curso I = 65, II = 45, III = 53, IV = 54.\nAl revisar los puntajes, una persona afirma que hubo un aumento en el puntaje respecto al año anterior.",
          text: "¿Esta afirmación es correcta o incorrecta?",
          options: [
            { label: "A", text: "Correcta, ya que el promedio de la mayoría de los cursos aumentó respecto al año anterior." },
            { label: "B", text: "Incorrecta, ya que el promedio total en el año anterior (227/4 = 56.75) es superior al promedio total en el año actual (217/4 = 54.25)." },
            { label: "C", text: "Correcta, ya que al observar todos los promedios, el mayor corresponde al curso I en el año actual." },
            { label: "D", text: "Incorrecta, ya que se necesita el puntaje de cada estudiante para realizar la comparación." },
          ],
          correctAnswer: "B",
          explanation:
            "El promedio global anterior fue (63+61+50+53)/4 = 56.75, mientras que el actual es (65+45+53+54)/4 = 54.25. Por lo tanto el promedio global disminuyó.",
          competence: "Interpretación y representación",
        },
        {
          id: 2,
          context:
            "Una persona que vive en Colombia tiene inversiones en dólares en EE.UU., con tasa constante de 1 USD = $4.000 COP y ganancia del 3% en dólares. Un amigo le asegura que en pesos sus ganancias también serán del 3%.",
          text: "¿La afirmación de su amigo es correcta?",
          options: [
            { label: "A", text: "Sí, porque sin importar las variaciones en la tasa de cambio, la proporción en dólares es la misma que en pesos." },
            { label: "B", text: "No, porque debería conocerse el valor exacto de la inversión para calcular el dinero que ganará." },
            { label: "C", text: "Sí, porque el 3 % representa una proporción fija en cualquiera de las dos monedas, puesto que la tasa de cambio permanecerá constante." },
            { label: "D", text: "No, porque el 3 % representa un incremento que será mayor en pesos colombianos, pues cada dólar vale $4.000." },
          ],
          correctAnswer: "C",
          explanation:
            "El porcentaje de incremento es una razón adimensional. Si el capital en USD aumenta 3% y la tasa de cambio no varía, el valor equivalente en COP también aumenta exactamente 3%.",
          competence: "Argumentación",
        },
        {
          id: 14,
          text: "Si en un rectángulo se aumenta la longitud de uno de sus lados en 100%, ¿qué se puede concluir de su área?",
          options: [
            { label: "A", text: "Aumenta en un 50 %." },
            { label: "B", text: "Se duplica (aumenta al 200%, es decir, se multiplica por 2)." },
            { label: "C", text: "No cambia." },
            { label: "D", text: "Aumenta en 100 unidades." },
          ],
          correctAnswer: "B",
          explanation:
            "Área inicial = base × altura. Si un lado aumenta 100%, pasa a ser 2L. La nueva área = (2L) × h = 2(L × h), por lo que el área total se duplica exactamente.",
          competence: "Formulación y ejecución",
        },
        {
          id: 21,
          context:
            "En una tienda se venden mesas a $40.000 y sillas a $20.000. Los ingresos fueron $1.400.000 y se vendieron 3 veces más sillas que mesas.\nEcuación 1: 40.000M + 20.000S = 1.400.000\nEcuación 2: M = 3S",
          text: "¿Las ecuaciones representan correctamente la situación?",
          options: [
            { label: "A", text: "No, porque aunque la ecuación 1 relaciona cada precio adecuadamente, la ecuación 2 (M = 3S) significa que se venden 3 veces más mesas que sillas cuando en realidad S = 3M." },
            { label: "B", text: "Sí, porque la ecuación 1 relaciona cada precio y la ecuación 2 tiene en cuenta que las sillas son 3 veces más." },
            { label: "C", text: "No, porque los precios deberían estar dividiendo y no multiplicando." },
            { label: "D", text: "Sí, porque al resolver se obtiene un número entero." },
          ],
          correctAnswer: "A",
          explanation:
            "Si se vendieron 3 veces más sillas que mesas, la relación correcta es S = 3M. Escribir M = 3S invierte la relación proporcional.",
          competence: "Interpretación y representación",
        },
      ],
      answersKey: [
        "1: B", "2: C", "3: B", "4: C", "5: B", "6: D", "7: C", "8: C", "9: C", "10: C",
        "11: B", "12: B", "13: D", "14: B", "15: C", "16: D", "17: D", "18: C", "19: B", "20: A",
        "21: A", "22: C", "23: B", "24: D", "25: A", "26: C", "27: A", "28: A", "29: C", "30: B",
        "31: B", "32: B", "33: D", "34: C", "35: B", "36: C", "37: B", "38: C", "39: C", "40: B",
        "41: B", "42: D", "43: B", "44: B", "45: D", "46: C", "47: D", "48: B", "49: D", "50: A",
      ],
    },
    ingles: {
      title: "Prueba de Inglés",
      badge: "Examen 1 & Examen 2 · 50 Preguntas",
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-300",
      accent: "text-purple-400 border-purple-400 bg-purple-500/10",
      icon: Languages,
      description:
        "Estructurada según el MCER (Marco Común Europeo): Partes 1 a 7 evaluando vocabulario, avisos, diálogos, textos con espacios y comprensión lectora (Pre A1 hasta B1).",
      sampleQuestions: [
        {
          id: 1,
          context: "Part 1 · Clothes and Accessories\nDescription: 'A person can carry things in one of these.'",
          text: "Which word matches this description?",
          options: [
            { label: "A", text: "glasses" },
            { label: "B", text: "handbags" },
            { label: "C", text: "hat" },
            { label: "D", text: "pajamas" },
          ],
          correctAnswer: "B",
          explanation: "A handbag (bolso de mano) is used to carry personal items and belongings.",
          competence: "Vocabulary (Pre A1)",
        },
        {
          id: 6,
          context: "Part 2 · Notices\nNotice: 'Draw a line to complete the snake and color it'",
          text: "Where can you see this notice?",
          options: [
            { label: "A", text: "on a rug" },
            { label: "B", text: "on a test / worksheet" },
            { label: "C", text: "on a bookcase" },
          ],
          correctAnswer: "B",
          explanation: "Instructions like 'draw a line' and 'color it' are typical tasks found on an exam or children's worksheet.",
          competence: "Pragmatic comprehension (Pre A1)",
        },
        {
          id: 10,
          context: "Part 4 · Coffee text\n'Coffee has been well-known ________ the beginning of the 14th century...'",
          text: "Choose the correct preposition:",
          options: [
            { label: "A", text: "during" },
            { label: "B", text: "until" },
            { label: "C", text: "since" },
          ],
          correctAnswer: "C",
          explanation: "We use 'since' + specific point in time in the past (the beginning of the 14th century) with present perfect tense.",
          competence: "Grammar & prepositions (A2)",
        },
        {
          id: 20,
          context: "Part 6 · Reading text 'Jonathan's Trip to Colombia'\n'I went to Colombia last summer... Coffee and plantain grow as far as the eye can see... Hector who runs the farm is happy to show guests around... For those who wish to escape, Villa Maria is the answer...'",
          text: "What is the writer trying to do in this article?",
          options: [
            { label: "A", text: "Encouraging tourists to visit Colombia and enjoy its landscapes and farm stays." },
            { label: "B", text: "Convincing people to buy a Colombian coffee farm." },
            { label: "C", text: "Telling readers to run a coffee business in Colombia." },
            { label: "D", text: "Inviting tourists to write about places they visit." },
          ],
          correctAnswer: "A",
          explanation: "The author shares his wonderful vacation experience to inspire readers to travel and visit Colombia.",
          competence: "Reading comprehension & inference (B1)",
        },
      ],
      answersKey: [
        "Examen 1 - 1: B (Pre A1)", "Examen 1 - 2: D (Pre A1)", "Examen 1 - 3: E (A1)", "Examen 1 - 4: A (Pre A1)", "Examen 1 - 5: G (A1)",
        "Examen 1 - 6: B (Pre A1)", "Examen 1 - 7: C (A1)", "Examen 1 - 8: B (A1)", "Examen 1 - 9: C (A1)", "Examen 1 - 10: C (A2)",
        "Examen 1 - 11: A (A1)", "Examen 1 - 12: A (A2)", "Examen 1 - 13: B (A1)", "Examen 1 - 14: B (A1)", "Examen 1 - 15: A (A2)",
        "Examen 1 - 16: A (A2)", "Examen 1 - 17: A (A2)", "Examen 1 - 18: C (A2)", "Examen 1 - 19: B (A2)", "Examen 1 - 20: C (A2)",
        "Examen 1 - 21: A (A2)", "Examen 1 - 22: C (A2)", "Examen 1 - 23: C (A2)", "Examen 1 - 24: D (B1)", "Examen 1 - 25: C (B1)",
        "Examen 2 - 1: C (A1)", "Examen 2 - 2: D (A1)", "Examen 2 - 3: F (A1)", "Examen 2 - 4: B (Pre A1)", "Examen 2 - 5: B (Pre A1)",
        "Examen 2 - 6: C (Pre A1)", "Examen 2 - 7: B (A1)", "Examen 2 - 8: A (A1)", "Examen 2 - 9: C (A1)", "Examen 2 - 10: B (A2)",
        "Examen 2 - 11: A (A2)", "Examen 2 - 12: C (A2)", "Examen 2 - 13: B (A2)", "Examen 2 - 14: A (A2)", "Examen 2 - 15: C (A2)",
        "Examen 2 - 16: A (A2)", "Examen 2 - 17: B (A2)", "Examen 2 - 18: B (A2)", "Examen 2 - 19: B (A2)", "Examen 2 - 20: A (B1)",
        "Examen 2 - 21: A (B1)", "Examen 2 - 22: B (B1)", "Examen 2 - 23: B (B1)", "Examen 2 - 24: D (B1)", "Examen 2 - 25: A (B1)",
      ],
    },
    lectura: {
      title: "Prueba de Lectura Crítica",
      badge: "49 Preguntas · 18 Textos e Infografías",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300",
      accent: "text-emerald-400 border-emerald-400 bg-emerald-500/10",
      icon: BookOpen,
      description:
        "Evalúa: 1. Identificar contenidos locales, 2. Comprender la articulación de las partes en un sentido global, y 3. Reflexionar y evaluar el contenido y la forma del texto.",
      sampleQuestions: [
        {
          id: 4,
          context:
            "Texto 'Instinto en lugar de lógica' (Dean E. Woolridge):\n'La rutina de la avispa Sphex consiste en llevar al grillo hacia la madriguera, dejarlo en la entrada, ir adentro a revisar que todo esté bien, salir y luego dejar el grillo adentro. Si mientras está adentro el grillo es movido unos centímetros, la avispa vuelve a repetir la inspección desde cero... En una ocasión, este procedimiento fue repetido cuarenta veces, siempre con el mismo resultado.'",
          text: "¿Cuál de las citas refuerza la idea de que el comportamiento de la avispa Sphex no resulta de un pensamiento racional?",
          options: [
            { label: "A", text: "“La avispa lleva al grillo a su madriguera, deja sus huevos, cierra la madriguera y luego se va para no volver”." },
            { label: "B", text: "“La avispa nunca piensa en llevar al grillo directamente a su madriguera. En una ocasión, este procedimiento fue repetido cuarenta veces, siempre con el mismo resultado”." },
            { label: "C", text: "“Para la mente humana, tal rutina tan organizada y aparentemente llena de propósitos lleva consigo un sabor de lógica y de pensamiento”." },
            { label: "D", text: "“Por ejemplo, la rutina de la avispa consiste en llevar al grillo hacia la madriguera...”" },
          ],
          correctAnswer: "B",
          explanation:
            "La repetición ciega e invariable de la misma rutina 40 veces demuestra que actúa por un programa de instinto rígido y no por un análisis racional de la situación.",
          competence: "Sentido global y argumentación",
        },
        {
          id: 15,
          context:
            "Texto '1984' de George Orwell (Gran Hermano):\n'No habrá lealtad; no existirá más fidelidad que la que se debe al Partido, ni más amor que el amor al Gran Hermano... Todos los placeres serán destruidos... Si quieres hacerte una idea de cómo será el futuro, figúrate una bota aplastando un rostro humano... incesantemente.'",
          text: "¿Cuál de las siguientes afirmaciones es compatible con las políticas del Partido?",
          options: [
            { label: "A", text: "El pueblo debe mantenerse unido por el afecto mutuo." },
            { label: "B", text: "La individualidad debe ser eliminada por completo en favor del control estatal absoluto." },
            { label: "C", text: "El poder está en ser fiel a uno mismo." },
            { label: "D", text: "Un pueblo ignorante es más poderoso." },
          ],
          correctAnswer: "B",
          explanation:
            "El régimen totalitario de 1984 destruye todo rasgo de individualidad, arte, libre pensamiento y placer personal para subordinar al individuo a la dominación del Partido.",
          competence: "Sentido global e inferencia",
        },
        {
          id: 34,
          context:
            "Texto 'El matrimonio: más allá del amor' (Miguel Ángel Sabadell):\n'En nuestra sociedad se tiende a pensar que el matrimonio se sostiene por amor... No obstante, la idea de que este deba ser la razón del enlace es bastante reciente: aparece en el siglo XVIII y se afianza en el XIX con el movimiento romántico. Hasta entonces, el matrimonio era ante todo una institución económica y política...'",
          text: "Para el autor, el amor o el enamoramiento son:",
          options: [
            { label: "A", text: "La base fundamental del matrimonio y de la familia en todas las épocas." },
            { label: "B", text: "Una atracción que amenaza la solidaridad familiar." },
            { label: "C", text: "Unas ideas vinculadas recientemente al matrimonio y la familia (desde el siglo XVIII)." },
            { label: "D", text: "Unos sentimientos irracionales que contradicen el deber ser del matrimonio." },
          ],
          correctAnswer: "C",
          explanation:
            "El texto argumenta históricamente que fundamentar el matrimonio en el amor es una construcción cultural reciente que data del siglo XVIII.",
          competence: "Comprensión e identificación de tesis",
        },
      ],
      answersKey: [
        "1: C", "2: D", "3: A", "4: B", "5: A", "6: B", "7: C", "8: B", "9: A", "10: A",
        "11: C", "12: B", "13: D", "14: B", "15: B", "16: D", "17: B", "18: B", "19: C", "20: B",
        "21: C", "22: A", "23: C", "24: C", "25: B", "26: C", "27: B", "28: C", "29: A", "30: B",
        "31: D", "32: B", "33: B", "34: C", "35: D", "36: C", "37: D", "38: B", "39: A", "40: B",
        "41: C", "42: A", "43: C", "44: D", "45: C", "46: C", "47: A", "48: A", "49: C",
      ],
    },
    ciencias: {
      title: "Prueba de Ciencias Naturales",
      badge: "50 Preguntas · Biología, Física & Química",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300",
      accent: "text-amber-400 border-amber-400 bg-amber-500/10",
      icon: FlaskConical,
      description:
        "Evalúa uso comprensivo del conocimiento científico, explicación de fenómenos e indagación experimental en Biología, Química y Física.",
      sampleQuestions: [
        {
          id: 4,
          text: "Un bloque de hielo seco (CO2 sólido) cambia del estado sólido al gaseoso en condiciones ambientales (sublimación). Este cambio determina una disminución en la densidad del CO2. ¿Por qué ocurre esto?",
          options: [
            { label: "A", text: "Porque la masa de CO2 disminuye." },
            { label: "B", text: "Porque la distancia entre partículas y el volumen aumentan mientras la masa se conserva (d = m / V)." },
            { label: "C", text: "Porque la distancia entre partículas disminuye." },
            { label: "D", text: "Porque la distancia aumenta y la masa disminuye." },
          ],
          correctAnswer: "B",
          explanation:
            "En el estado gaseoso, las partículas se separan mucho más, ocupando un volumen significativamente mayor. Dado que la densidad es masa dividida por volumen (d = m/V), al aumentar el volumen conservando la masa, la densidad disminuye.",
          competence: "Explicación de fenómenos físicos",
        },
        {
          id: 18,
          context:
            "Reacción química: P4 + 6 Cl2 → 4 PCl3\nMasas molares: P4 = 124 g/mol, Cl2 = 70 g/mol, PCl3 = 137 g/mol.\nSe hacen reaccionar 124 g de P4 (1 mol) con 210 g de Cl2 (3 moles).",
          text: "¿Cuál es el reactivo límite?",
          options: [
            { label: "A", text: "El Cl2, porque según la estequiometría 1 mol de P4 requiere 6 moles de Cl2 (420 g), pero solo se tienen 3 moles (210 g), por lo que el Cl2 se agota primero." },
            { label: "B", text: "El P4, porque su masa en gramos es menor que la del Cl2." },
            { label: "C", text: "El Cl2, porque según la relación siempre se necesitan 6 moles de Cl2 sin importar el P4." },
            { label: "D", text: "El P4, porque su masa molar es casi el doble que la del Cl2." },
          ],
          correctAnswer: "A",
          explanation:
            "Para consumir 1 mol de P4 (124 g) se requieren 6 moles de Cl2 (6 × 70 g = 420 g). Al disponer únicamente de 210 g de Cl2 (3 moles), el cloro se consume por completo primero.",
          competence: "Uso comprensivo del conocimiento (Química)",
        },
        {
          id: 38,
          context:
            "En una especie de patos, el cuello largo es dominante sobre el cuello corto. Se aparearon un macho y una hembra ambos de cuello largo; de sus descendientes 3/4 tienen cuello largo y 1/4 tienen cuello corto.",
          text: "¿Cuál afirmación es correcta sobre el genotipo de los padres?",
          options: [
            { label: "A", text: "Ambos padres eran heterocigotos (Ll x Ll), produciendo proporciones genotípicas 1 LL : 2 Ll : 1 ll (75% fenotipo dominante y 25% recesivo)." },
            { label: "B", text: "El macho era heterocigoto y la hembra homocigoto recesivo." },
            { label: "C", text: "El macho era heterocigoto y la hembra homocigoto dominante." },
            { label: "D", text: "Ambos padres eran homocigotos dominantes." },
          ],
          correctAnswer: "A",
          explanation:
            "Según las leyes de Mendel, la única forma de que dos progenitores con fenotipo dominante tengan un 25% (1/4) de descendencia con fenotipo recesivo es que ambos sean portadores heterocigotos (Ll × Ll → 1 LL, 2 Ll, 1 ll).",
          competence: "Indagación y modelación biológica",
        },
      ],
      answersKey: [
        "1: B", "2: C", "3: C", "4: B", "5: D", "6: C", "7: B", "8: A", "9: D", "10: B",
        "11: D", "12: B", "13: C", "14: B", "15: B", "16: C", "17: D", "18: A", "19: A", "20: B",
        "21: A", "22: C", "23: B", "24: B", "25: D", "26: D", "27: A", "28: A", "29: A", "30: D",
        "31: B", "32: C", "33: A", "34: D", "35: B", "36: A", "37: C", "38: A", "39: A", "40: A",
        "41: B", "42: A", "43: D", "44: C", "45: D", "46: B", "47: D", "48: B", "49: A", "50: C",
      ],
    },
  };

  const currentData = bookletsInfo[selectedBooklet];

  const handleSelectOption = (qId: number, optionLabel: string) => {
    const key = `${selectedBooklet}_${qId}`;
    setUserAnswers((prev) => ({ ...prev, [key]: optionLabel }));
  };

  const handleCheckAnswer = (qId: number) => {
    const key = `${selectedBooklet}_${qId}`;
    setShowResults((prev) => ({ ...prev, [key]: true }));
  };

  const handleReset = (qId: number) => {
    const key = `${selectedBooklet}_${qId}`;
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
    setShowResults((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-indigo-950/40 via-purple-950/20 to-black/60 border border-indigo-500/30 backdrop-blur-xl shadow-[0_0_35px_rgba(99,102,241,0.15)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-2">
              <BookCheck className="w-3.5 h-3.5 text-indigo-400" />
              Banco Oficial de Preguntas
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-white flex items-center gap-2">
              Cuadernillos de Preguntas Saber 11.°
            </h3>
            <p className="text-purple-200/80 text-xs sm:text-sm mt-1 max-w-2xl">
              Practica con preguntas reales de aplicaciones anteriores, revisa las justificaciones pedagógicas y consulta las tablas oficiales de respuestas.
            </p>
          </div>

          {/* Selector de modo */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-purple-500/20 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setActiveView("practica")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === "practica" ? "bg-indigo-600 text-white shadow-md" : "text-purple-300 hover:text-white"
              }`}
            >
              Simulador Interactivo
            </button>
            <button
              onClick={() => setActiveView("claves")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === "claves" ? "bg-indigo-600 text-white shadow-md" : "text-purple-300 hover:text-white"
              }`}
            >
              Tabla de Respuestas (1-50)
            </button>
          </div>
        </div>
      </div>

      {/* Selector de Cuadernillo */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {[
          { id: "matematicas" as BookletSubject, label: "📐 Matemáticas", count: "50 Preguntas" },
          { id: "ingles" as BookletSubject, label: "🇬🇧 Inglés", count: "50 Preguntas" },
          { id: "lectura" as BookletSubject, label: "📖 Lectura Crítica", count: "49 Preguntas" },
          { id: "ciencias" as BookletSubject, label: "🔬 Ciencias Naturales", count: "50 Preguntas" },
        ].map((item) => {
          const isSelected = selectedBooklet === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedBooklet(item.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer select-none ${
                isSelected
                  ? "bg-indigo-600/90 text-white border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-102 font-bold"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-sm sm:text-base font-bold">{item.label}</span>
              <span className={`text-[11px] font-mono mt-1 ${isSelected ? "text-indigo-200" : "text-purple-300/60"}`}>
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Contenido del Cuadernillo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedBooklet + "_" + activeView}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Banner informativo de la prueba */}
          <div className={`p-5 sm:p-6 rounded-2xl border bg-linear-to-r ${currentData.color} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
            <div className="max-w-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 block mb-1">
                {currentData.badge}
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white">{currentData.title}</h4>
              <p className="text-xs sm:text-sm text-purple-200/80 mt-1">{currentData.description}</p>
            </div>

            <a
              href={
                selectedBooklet === "matematicas"
                  ? "/docs/icfes/Cuadernillo-Matematicas-Saber-11-2026.pdf"
                  : selectedBooklet === "ingles"
                  ? "/docs/icfes/Cuadernillo-Ingles-Saber-11-2024.pdf"
                  : selectedBooklet === "lectura"
                  ? "/docs/icfes/Cuadernillo-Lectura-Critica-Saber-11-2026.pdf"
                  : "/docs/icfes/Cuadernillo-Ciencias-Naturales-Saber-11-2026.pdf"
              }
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4 text-purple-300" />
              <span>Descargar PDF Oficial</span>
            </a>
          </div>

          {/* VISTA 1: SIMULADOR INTERACTIVO */}
          {activeView === "practica" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Preguntas Seleccionadas para Practicar
                </span>
                <span className="text-xs text-purple-300/70 font-mono">
                  {currentData.sampleQuestions.length} Preguntas con retroalimentación
                </span>
              </div>

              <div className="space-y-6">
                {currentData.sampleQuestions.map((q) => {
                  const key = `${selectedBooklet}_${q.id}`;
                  const selected = userAnswers[key];
                  const revealed = !!showResults[key];
                  const isCorrect = selected === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className="p-5 sm:p-7 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-4"
                    >
                      {/* Header de Pregunta */}
                      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 font-mono font-bold text-xs">
                            Pregunta #{q.id}
                          </span>
                          {q.competence && (
                            <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-purple-200">
                              {q.competence}
                            </span>
                          )}
                        </div>

                        {revealed && (
                          <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                            {isCorrect ? (
                              <span className="text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Correcta
                              </span>
                            ) : (
                              <span className="text-rose-400 flex items-center gap-1">
                                <XCircle className="w-4 h-4" /> Incorrecta (Respuesta: {q.correctAnswer})
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Contexto del texto o problema */}
                      {q.context && (
                        <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/20 text-xs sm:text-sm text-purple-100/90 leading-relaxed font-sans whitespace-pre-line">
                          {q.context}
                        </div>
                      )}

                      {/* Enunciado */}
                      <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                        {q.text}
                      </p>

                      {/* Opciones A, B, C, D */}
                      <div className="space-y-2.5 pt-1">
                        {q.options.map((opt) => {
                          const isOptionSelected = selected === opt.label;
                          let optionStyle =
                            "bg-white/5 border-purple-500/20 text-purple-100 hover:bg-white/10 hover:border-purple-400/40";

                          if (isOptionSelected) {
                            optionStyle = "bg-indigo-600/30 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]";
                          }

                          if (revealed) {
                            if (opt.label === q.correctAnswer) {
                              optionStyle = "bg-emerald-950/50 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                            } else if (isOptionSelected && !isCorrect) {
                              optionStyle = "bg-rose-950/50 border-rose-500 text-rose-200";
                            }
                          }

                          return (
                            <button
                              key={opt.label}
                              disabled={revealed}
                              onClick={() => handleSelectOption(q.id, opt.label)}
                              className={`w-full p-3 sm:p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${optionStyle}`}
                            >
                              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                {opt.label}
                              </span>
                              <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Botones de acción */}
                      <div className="flex items-center justify-between pt-2">
                        {!revealed ? (
                          <button
                            disabled={!selected}
                            onClick={() => handleCheckAnswer(q.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              selected
                                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                                : "bg-white/5 text-purple-300/40 cursor-not-allowed"
                            }`}
                          >
                            Verificar Respuesta
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReset(q.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-purple-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Reintentar
                          </button>
                        )}
                      </div>

                      {/* Explicación desplegable */}
                      {revealed && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5 text-xs sm:text-sm text-purple-100"
                        >
                          <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                            <Lightbulb className="w-4 h-4 text-amber-400" />
                            Justificación & Razonamiento Oficial:
                          </div>
                          <p className="leading-relaxed text-purple-200/90">{q.explanation}</p>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VISTA 2: TABLA DE CLAVES Y RESPUESTAS (1 A 50) */}
          {activeView === "claves" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Clave Oficial de Respuestas del Cuadernillo
                </span>
                <span className="text-xs text-purple-300/70 font-mono">Total: {currentData.answersKey.length} Ítems</span>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md">
                <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2 font-mono text-xs">
                  {currentData.answersKey.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-center text-purple-100 hover:border-indigo-400 transition-colors"
                    >
                      <span className="font-bold text-indigo-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
