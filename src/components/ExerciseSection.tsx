"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  HeartPulse,
  Activity,
  Droplets,
  Moon,
  Sparkles,
  CheckCircle2,
  Square,
  Timer,
  Smile,
  Zap,
  Footprints,
  Apple,
  Home,
  Target,
  Sun,
  ShieldCheck,
  ExternalLink,
  Tv,
  Dumbbell,
  Music,
} from "lucide-react";

export default function ExerciseSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [completedHabits, setCompletedHabits] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sofi_exercise_habits");
      if (saved) {
        setCompletedHabits(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const toggleHabit = (id: string) => {
    setCompletedHabits((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_exercise_habits", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const categoriesTabs = [
    { id: "all", label: "🌟 Todo el Contenido" },
    { id: "baile", label: "🎵 Cardio Dance & Coreos" },
    { id: "fullbody", label: "✨ Full Body (Cuerpo Completo)" },
    { id: "cintura", label: "⏳ Cintura Pequeña en Casa" },
    { id: "abs", label: "🔥 Abdomen Plano (Abs)" },
    { id: "brazos", label: "💪 Brazos & Espalda Firme" },
    { id: "gluteos", label: "🍑 Piernas & Glúteos (Suelo)" },
    { id: "cardio", label: "💃 Cardio Sin Ruido / Casa" },
    { id: "postura", label: "🧘‍♀️ Estiramientos & Postura" },
    { id: "canales", label: "📺 Canales de YouTube Recomendados" },
    { id: "nutricion", label: "🥑 Snacks & Bienestar" },
    { id: "tracker", label: "✅ Tracker Diario" },
  ];

  const homeWorkouts = [
    {
      id: "baile",
      title: "🎵 Cardio Dance & Coreografías Divertidas (K-Pop & Pop Fitness)",
      tag: "Baile & Ritmo · 100% Diversión",
      color: "from-pink-500/25 to-rose-500/15 border-pink-400/40 text-pink-200",
      desc: "¡La forma más alegre de quemar calorías y tonificar la cintura! Pasos rítmicos y coreografías sencillas para bailar en tu cuarto con canciones de BTS, K-pop y tus hits favoritos.",
      duration: "15-20 min · 3-4 días por semana",
      exercises: [
        { name: "Paso K-Pop Step-Touch con Brazos", reps: "3 canciones seguidas", tip: "Desplázate de lado a lado marcando el compás con movimientos fluidos de brazos." },
        { name: "Ondulación de Torso & Caderas (Hip Rolls)", reps: "3 series x 45 segundos", tip: "Mueve la cadera en círculo suave mientras aíslas el torso; excelente para afinar la cintura." },
        { name: "Sentadilla Dance con Golpe de Cadera", reps: "3 series x 16 repeticiones", tip: "Flexiona rodillas al ritmo del estribillo y acentúa el movimiento lateral con la cadera." },
        { name: "Mambo Latino & Cruce de Pies", reps: "3 series x 40 segundos", tip: "Paso adelante, paso atrás y giro suave de cintura sintiendo el ritmo latino." },
        { name: "Freestyle & Pasos Libres con tu Canción Favorita", reps: "1-2 canciones completas", tip: "¡Déjate llevar y sonríe! El baile libera endorfinas y quema hasta 200 calorías sin sentir que entrenas." },
      ],
      proTip: "💡 Secreto del Baile: El aislamiento de cadera y torso durante las canciones tonifica los oblicuos y moldea la cintura mientras te diviertes y desconectas de todo.",
    },
    {
      id: "fullbody",
      title: "✨ Circuito Full Body (Cuerpo Completo · Quema & Tonificación Global)",
      tag: "Cuerpo Completo · Sin Equipo",
      color: "from-purple-500/25 to-pink-500/15 border-purple-400/40 text-purple-200",
      desc: "Rutina integral de pies a cabeza que trabaja brazos, espalda, cintura, abdomen, piernas y glúteos en un solo circuito fluido para activar tu metabolismo.",
      duration: "18-20 min · 2-3 días por semana",
      exercises: [
        { name: "Sentadilla con Apertura de Brazos", reps: "3 series x 12 reps", tip: "Al bajar flexiona rodillas y al subir abre los brazos estirando la espalda." },
        { name: "Plancha con Toque de Hombros (Plank Shoulder Taps)", reps: "3 series x 16 toques", tip: "Trabaja abdomen, brazos y hombros manteniendo las caderas quietas." },
        { name: "Puente de Glúteos con Extensión de Brazos", reps: "3 series x 15 reps", tip: "Eleva caderas mientras estiras los brazos al techo apretando glúteos y core." },
        { name: "Zancadas Atrás con Alcance Frontal", reps: "3 series x 10 por pierna", tip: "Tonifica piernas y mejora el equilibrio sin impacto en las articulaciones." },
        { name: "Paso de Patinador Suave (Skater Steps)", reps: "3 series x 20 pasos", tip: "Cardio suave de cuerpo entero que estiliza la silueta." },
      ],
      proTip: "💡 Clave Full Body: Activar múltiples grupos musculares a la vez quema más energía y te ayuda a conseguir un cuerpo armónico, fuerte y estilizado.",
    },
    {
      id: "cintura",
      title: "⏳ Rutina Cintura Fina & Silueta Reloj de Arena (100% en Casa)",
      tag: "Cintura · Sin Equipo",
      color: "from-fuchsia-500/20 to-rose-500/10 border-fuchsia-500/40 text-fuchsia-300",
      desc: "Ejercicios en esterilla/suelo estilo Gym Virtual que activan el transverso abdominal para afinar la cintura sin ensanchar la espalda ni los costados.",
      duration: "12-15 min · 3-4 días por semana",
      exercises: [
        { name: "Vacío Abdominal en Suelo (Stomach Vacuum)", reps: "4 series x 15-20 seg", tip: "Tumbada boca arriba, exhala todo el aire y mete el ombligo como si quisieras tocar la colchoneta." },
        { name: "Plancha Frontal con Respiración Activa", reps: "3 series x 30-40 seg", tip: "Apoya antebrazos y puntas de pies manteniendo el cuerpo en línea recta y el abdomen firme." },
        { name: "Giros Rusos Suaves (Russian Twists sin peso)", reps: "3 series x 15 por lado", tip: "Siéntate en el suelo con rodillas flexionadas y gira el torso despacio de un lado a otro." },
        { name: "Elevaciones Laterales de Cadera (Side Leg Lifts)", reps: "3 series x 15 por pierna", tip: "Tumbada de lado, eleva la pierna estirada para activar el glúteo medio y dar forma a la cadera." },
        { name: "Plancha Lateral en Antebrazo", reps: "3 series x 20 seg por lado", tip: "Eleva la cadera alineando todo el cuerpo sin dejar caer la pelvis." },
      ],
      proTip: "💡 Secreto Gym Virtual: No necesitas fajas ni pesas. La combinación de respiración profunda, vacíos abdominales y buena postura afina la cintura de manera natural y saludable.",
    },
    {
      id: "abs",
      title: "🔥 Abdomen Plano & Fuerte (Abs en Colchoneta)",
      tag: "Abdomen · Sin Equipo",
      color: "from-rose-500/20 to-pink-500/10 border-rose-500/40 text-rose-300",
      desc: "Rutina para tonificar abdomen superior, inferior y oblicuos usando solo tu propio peso corporal y una toalla o alfombra.",
      duration: "10-15 min · 3 veces por semana",
      exercises: [
        { name: "Bicicleta Abdominal (Bicycle Crunches)", reps: "3 series x 16 repeticiones", tip: "Lleva el codo hacia la rodilla opuesta de forma pausada, sintiendo la contracción en cada lado." },
        { name: "Elevaciones de Piernas al Techo", reps: "3 series x 12 reps", tip: "Boca arriba con manos bajo los glúteos, sube y baja las piernas sin tocar el suelo." },
        { name: "Tijeras Horizontales (Flutter Kicks)", reps: "3 series x 30 segundos", tip: "Cruza las piernas a ras del suelo apretando el abdomen." },
        { name: "Bichos Muertos (Deadbugs Seguros)", reps: "3 series x 12 por lado", tip: "Extiende brazo y pierna contraria manteniendo la espalda baja pegada al suelo." },
        { name: "Toques de Talón (Heel Touches)", reps: "3 series x 20 toques", tip: "Con rodillas flexionadas, deslízate de lado a lado tocando tus talones con los dedos." },
      ],
      proTip: "💡 Tip: Mantén la barbilla despegada del pecho para no forzar el cuello; la fuerza debe nacer 100% del abdomen.",
    },
    {
      id: "brazos",
      title: "💪 Brazos Delicados, Espalda Firme & Hombros Estilizados",
      tag: "Brazos & Espalda · Sin Pesas",
      color: "from-indigo-500/20 to-blue-500/10 border-indigo-500/40 text-indigo-300",
      desc: "Ejercicios con el peso de tus propios brazos para tonificar tríceps (evitar flacidez), hombros definidos y espalda recta.",
      duration: "12-15 min · 2-3 días por semana",
      exercises: [
        { name: "Fondos de Tríceps en Borde de Cama o Silla (Dips)", reps: "3 series x 10-12 reps", tip: "Apoya las manos en el borde y flexiona los codos hacia atrás despacio." },
        { name: "Flexiones en Pared o de Rodillas (Incline Push-ups)", reps: "3 series x 8-10 reps", tip: "Mantén el cuerpo recto y empuja con el pecho y los brazos firmes." },
        { name: "Círculos de Brazos en Tensión (Arm Circles)", reps: "3 series x 30 seg adelante + 30 seg atrás", tip: "Brazos estirados a los lados a la altura de los hombros haciendo círculos pequeños." },
        { name: "Remo Tumbada Boca Abajo (Nadador / Swimming)", reps: "3 series x 15 reps", tip: "Boca abajo en la alfombra, eleva suavemente pecho y brazos para fortalecer la espalda alta." },
        { name: "Elevaciones Laterales 'W a Y' para Hombros", reps: "3 series x 12 reps", tip: "Forma una W con tus brazos y extiéndelos a una Y apretando la espalda." },
      ],
      proTip: "💡 Tip: No necesitas mancuernas pesadas; la tensión continua con tu propio peso esculpe brazos delgados, firmes y elegantes.",
    },
    {
      id: "gluteos",
      title: "🍑 Piernas & Glúteos Firmes (100% en el Suelo)",
      tag: "Glúteos & Piernas · Suelo",
      color: "from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-300",
      desc: "Ejercicios en 4 apoyos y boca arriba en colchoneta para levantar glúteos y tonificar muslos sin necesidad de cargar peso.",
      duration: "15-20 min · 2-3 días por semana",
      exercises: [
        { name: "Puente de Glúteos Clásico (Glute Bridge)", reps: "4 series x 15 reps (pausa 2 seg arriba)", tip: "Boca arriba, eleva la pelvis y aprieta los glúteos arriba 2 segundos antes de descender." },
        { name: "Patadas de Glúteo en Cuadrupedia (Donkey Kicks)", reps: "3 series x 15 por pierna", tip: "En 4 apoyos sobre la colchoneta, empuja con el talón hacia el techo." },
        { name: "Bocas de Incendio (Fire Hydrants / Aperturas)", reps: "3 series x 12 por pierna", tip: "Eleva la rodilla hacia el lateral para trabajar el glúteo medio y redondear la cadera." },
        { name: "Puente de Glúteos a una Pierna (Opcional)", reps: "3 series x 10 por pierna", tip: "Una pierna estirada arriba mientras la otra empuja el suelo para mayor intensidad." },
        { name: "Sentadillas Sumo Suaves en Pie", reps: "3 series x 12 reps", tip: "Pies separados y puntas hacia afuera, bajando con la espalda recta." },
      ],
      proTip: "💡 Clave de tonificación: Haz los movimientos lentos y controlados. Apretar el músculo al final de cada repetición da resultados increíbles.",
    },
    {
      id: "cardio",
      title: "💃 Cardio Dinámico 'Sin Ruido' & Quema Grasa en Habitación",
      tag: "Cardio Casa · Sin Impacto",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300",
      desc: "Cardio alegre y efectivo que puedes hacer en tu cuarto sin molestar a nadie (apto para pisos y sin saltos bruscos).",
      duration: "15-20 min · 3-4 días por semana",
      exercises: [
        { name: "Paso de Tijera Rápido sin Salto (Step Jacks)", reps: "4 series x 45 segundos", tip: "Abre y cierra brazos y piernas al compás de tu música favorita con ritmo ágil." },
        { name: "Escaladores Suaves en Esterilla (Mountain Climbers)", reps: "3 series x 30 segundos", tip: "En posición de plancha, lleva las rodillas hacia el pecho una a una." },
        { name: "Sentadilla con Elevación de Talones (Squat to Calf Raise)", reps: "3 series x 15 reps", tip: "Baja en sentadilla suave y al subir elévate sobre las puntas de los pies." },
        { name: "Patadas Frontales con Ritmo (Front Kicks)", reps: "3 series x 20 patadas", tip: "Alterna piernas al frente mientras mantienes el abdomen apretado." },
        { name: "Caminata Rápida con Pasos Rítmicos en el Lugar", reps: "5-10 minutos seguidos", tip: "Mueve los brazos en coordinación con tus pasos para quemar más energía." },
      ],
      proTip: "💡 Tip: 15 minutos de cardio con tu música preferida liberan endorfinas que te quitan el estrés de las tareas y mejoran tu ánimo al instante.",
    },
    {
      id: "postura",
      title: "🧘‍♀️ Postura Elegante, Espalda Alineada & Flexibilidad",
      tag: "Postura & Bienestar",
      color: "from-teal-500/20 to-emerald-500/10 border-teal-500/40 text-teal-300",
      desc: "Estiramientos suaves para corregir hombros hacia adelante por el uso del celular o estudio, aliviando la espalda y estilizando tu figura.",
      duration: "10 min · Diario o al despertar/dormir",
      exercises: [
        { name: "Postura del Niño (Balasana)", reps: "2-3 minutos", tip: "Siéntate sobre los talones y estira los brazos al frente sobre el suelo relajando cuello y espalda." },
        { name: "Gato-Vaca para Movilidad de Columna", reps: "2 series x 10 ciclos", tip: "Inhala arqueando suavemente la espalda, exhala redondeando y metiendo el ombligo." },
        { name: "Cobra Suave para Pared Abdominal", reps: "3 series x 15 seg", tip: "Boca abajo, apoya manos y eleva suavemente el pecho sin forzar la cintura." },
        { name: "Apertura de Pecho en Esquina o Pared", reps: "30 segundos por lado", tip: "Abre los hombros hacia atrás para lucir una postura recta y elegante." },
        { name: "Estiramiento de Piernas y Gemelos", reps: "30 segundos por pierna", tip: "Relaja las piernas y mejora tu flexibilidad natural." },
      ],
      proTip: "💡 Beneficio: Una buena postura te hace ver más alta, estilizada, con la cintura más marcada y con una presencia llena de seguridad.",
    },
  ];

  const youtubeChannels = [
    {
      name: "K-Pop Dance Workout",
      creator: "Coreografías K-Pop & Pop",
      desc: "Rutinas de baile al ritmo de BTS, BLACKPINK, NewJeans, TWICE y LE SSERAFIM. ¡Quema calorías bailando tus coreografías favoritas!",
      badge: "K-Pop & Coreos",
      url: "https://www.youtube.com/results?search_query=kpop+dance+workout+bts",
      icon: "💖",
    },
    {
      name: "The Fitness Marshall",
      creator: "Caleb Marshall",
      desc: "El rey del cardio dance en YouTube: coreografías súper cómicas, alegres y llenas de energía con los éxitos del pop mundial.",
      badge: "Dance Pop Divertido",
      url: "https://www.youtube.com/@TheFitnessMarshall",
      icon: "🎉",
    },
    {
      name: "Fitness by Vivi (@FitnessbyVivi)",
      creator: "Viviana Rodríguez",
      desc: "Canal hispano favorito para rutinas en casa: cardio bailable latino, reducción de cintura, abdomen plano y tonificación sin pesas.",
      badge: "Cintura & Cardio Latino",
      url: "https://www.youtube.com/@FitnessbyVivi",
      icon: "💃",
    },
    {
      name: "Gym Virtual (@gymvirtual)",
      creator: "Patry Jordán",
      desc: "El canal número 1 en español para entrenar en casa sin equipo. Rutinas cortas de 10-15 min de cintura, abdomen, glúteos y calendarios mensuales.",
      badge: "Referente Nº 1 en Casa",
      url: "https://www.youtube.com/@gymvirtual",
      icon: "🇪🇸",
    },
    {
      name: "Chloe Ting",
      creator: "Chloe Ting",
      desc: "Famosa mundialmente por sus retos de 2 semanas para cintura pequeña, abdomen plano y tonificación completa en casa sin pesas.",
      badge: "Retos de Cintura & Abs",
      url: "https://www.youtube.com/@ChloeTing",
      icon: "✨",
    },
    {
      name: "Pamela Reif",
      creator: "Pamela Reif",
      desc: "Rutinas al compás de la música moderna, sin hablar, súper dinámicas y con temporizador visual en pantalla (100% en esterilla).",
      badge: "Música & Ritmo",
      url: "https://www.youtube.com/@PamelaRf1",
      icon: "🎵",
    },
  ];

  const nutritionAndCare = [
    {
      title: "💧 Agua = Abdomen Desinflamado",
      desc: "Tomar de 1.5 a 2 litros de agua durante el día desinflama tu vientre, mejora la digestión y deja tu piel radiante.",
      icon: "🌊",
    },
    {
      title: "🍓 Snacks Ricos para Después de Bailar / Entrenar",
      desc: "Un yogurt natural con fresas, un plátano con un toque de crema de maní o una tostada con palta/huevo te darán energía limpia.",
      icon: "🥑",
    },
    {
      title: "✨ Menos Frituras y Gaseosas",
      desc: "Reducir bebidas con mucho gas o frituras previene la hinchazón abdominal y te hace sentir ligera todo el día.",
      icon: "🥗",
    },
    {
      title: "😴 Dormir 8 Horas: El Secreto de Belleza",
      desc: "A los 15 años el cuerpo se regenera, tonifica y crece mientras duermes. El descanso es el 50% de tus resultados.",
      icon: "🌙",
    },
  ];

  const dailyHabits = [
    { id: "water", label: "Tomar 2 Litros de Agua", cat: "Hidratación" },
    { id: "dance", label: "Bailar o Hacer Rutina de 15-20 min en Casa", cat: "Movimiento" },
    { id: "waist", label: "Ejercicios de Cintura / Vacío Abdominal en Suelo", cat: "Cintura & Abs" },
    { id: "posture", label: "Cuidar mi Postura y Estirarme 5 min", cat: "Postura" },
    { id: "healthy_snack", label: "Comer Fruta o Snack Saludable", cat: "Nutrición" },
    { id: "sleep", label: "Dormir 8 Horas Reparadoras", cat: "Descanso" },
  ];

  const weeklySchedule = [
    { day: "Lunes", routine: "🎵 Cardio Dance K-Pop/Pop + ⏳ Cintura Fina (18 min)", focus: "Baile & Cintura" },
    { day: "Martes", routine: "✨ Full Body (Cuerpo Completo) en colchoneta (15 min)", focus: "Tonificación Total" },
    { day: "Miércoles", routine: "🍑 Piernas & Glúteos en el suelo (Donkey kicks, puente) (15 min)", focus: "Tren Inferior" },
    { day: "Jueves", routine: "💃 Coreografías Latinas / Pop con Fitness by Vivi + ⏳ Cintura (15 min)", focus: "Cardio Dance" },
    { day: "Viernes", routine: "🔥 Abdomen Plano + 💪 Brazos & Espalda Firme (15 min)", focus: "Abs & Tren Superior" },
    { day: "Sábado", routine: "🎵 Baile libre con tus canciones favoritas de BTS / paseo activo", focus: "Diversión Libre" },
    { day: "Domingo", routine: "💆‍♀️ Descanso completo, autocuidado y estiramientos suaves", focus: "Recuperación" },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 pb-20 z-10 space-y-12 sm:space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-left"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Home className="w-4 h-4 text-rose-400" />
          100% en Casa · Baile & Fitness · Para Sofi
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold mb-3 flex flex-wrap items-baseline gap-3">
          <span className="text-white">Ejercicio & Baile:</span>
          <span className="text-purple-400 italic font-serif tracking-wide">Cuerpo, Cintura & Ritmo</span>
        </h2>
        <p className="text-purple-200/70 text-base sm:text-lg tracking-wide">
          Coreografías divertidas, tonificación de todo el cuerpo y rutinas de cintura para hacer en tu cuarto con tu música favorita
        </p>
      </motion.div>

      {/* Motivational Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-pink-950/30 via-purple-900/20 to-fuchsia-950/30 backdrop-blur-xl border border-pink-500/30 p-6 sm:p-8 shadow-[0_0_30px_rgba(244,63,94,0.15)] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-pink-300 text-xs font-bold uppercase tracking-wider">
            <Music className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            ¡Baila, Tonifica & Sonríe!
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            El ejercicio no tiene por qué ser aburrido: <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-300 via-purple-300 to-amber-300">
              pon tus canciones favoritas y baila con el corazón
            </span>
          </h3>
          <p className="text-purple-200/80 text-xs sm:text-sm max-w-lg">
            Coreografías de K-pop, baile latino, circuitos de cuerpo entero y rutinas de cintura y abs sin pesas ni complicaciones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/30 text-center min-w-28">
            <Flame className="w-6 h-6 text-pink-400 mx-auto mb-1 animate-bounce" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Dance & Fit</span>
            <span className="block text-[11px] text-purple-200/80">100% en Casa</span>
          </div>
        </div>
      </motion.div>

      {/* Sub-navigation Tabs (Wrapped & Responsive) */}
      <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-2">
        {categoriesTabs.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border select-none ${
                isActive
                  ? "bg-pink-600/90 text-white border-pink-400 shadow-[0_0_15px_rgba(244,63,94,0.4)] scale-102 font-semibold"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Routine Cards Grid */}
      {(activeCategory === "all" ||
        activeCategory === "baile" ||
        activeCategory === "fullbody" ||
        activeCategory === "cintura" ||
        activeCategory === "abs" ||
        activeCategory === "brazos" ||
        activeCategory === "cardio" ||
        activeCategory === "gluteos" ||
        activeCategory === "postura") && (
        <div className="space-y-8">
          <div className="space-y-6">
            {homeWorkouts
              .filter((w) => activeCategory === "all" || activeCategory === w.id)
              .map((w, idx) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className={`rounded-2xl bg-linear-to-br ${w.color} backdrop-blur-md border p-6 sm:p-7 space-y-5`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white">
                        {w.tag}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-purple-200/90 flex items-center gap-1.5">
                      <Timer className="w-4 h-4 text-purple-300" />
                      {w.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{w.title}</h3>
                    <p className="text-xs sm:text-sm text-purple-100/85 leading-relaxed">{w.desc}</p>
                  </div>

                  {/* Exercises List */}
                  <div className="space-y-3 pt-2 border-t border-white/15">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200">
                      Ejercicios / Pasos de la sesión:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {w.exercises.map((ex, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-black/20 border border-white/10 space-y-1 hover:border-white/25 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-white text-xs sm:text-sm">{ex.name}</span>
                            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/10 text-purple-200 shrink-0">
                              {ex.reps}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-purple-200/75 leading-relaxed">{ex.tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-400/30 text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                    {w.proTip}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      )}

      {/* Recommended YouTube Channels */}
      {(activeCategory === "all" || activeCategory === "canales") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Canales de Referencia</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Tv className="w-6 h-6 text-pink-400" />
              Los Mejores Canales de YouTube para Bailar y Entrenar en Casa
            </h3>
            <p className="text-purple-200/70 text-sm">
              Coreografías de K-Pop, baile latino y rutinas de tonificación sin equipo para seguir con música.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeChannels.map((ch) => (
              <div
                key={ch.name}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md flex flex-col justify-between hover:border-pink-400/40 transition-colors space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{ch.icon}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      {ch.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-base font-bold mb-0.5">{ch.name}</h4>
                  <span className="text-xs text-purple-300/80 font-medium block mb-2">{ch.creator}</span>
                  <p className="text-xs text-purple-200/75 leading-relaxed">{ch.desc}</p>
                </div>

                <a
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-300 hover:text-pink-200 transition-colors pt-2 border-t border-white/5"
                >
                  <span>Ver en YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Nutrition & Care */}
      {(activeCategory === "all" || activeCategory === "nutricion") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Nutrición & Desinflamación</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Apple className="w-6 h-6 text-emerald-400" />
              Secretos de Alimentación para Cintura & Energía
            </h3>
            <p className="text-purple-200/70 text-sm">
              Pequeños hábitos de comida que cuidan tu metabolismo a los 15 años sin dietas extremas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nutritionAndCare.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md space-y-2 hover:border-emerald-400/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl block mb-2">{item.icon}</span>
                  <h4 className="font-bold text-white text-sm sm:text-base mb-1">{item.title}</h4>
                  <p className="text-xs text-purple-200/75 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Daily Habits Tracker */}
      {(activeCategory === "all" || activeCategory === "tracker") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Tracker Diario</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <HeartPulse className="w-6 h-6 text-pink-400" />
              Checklist de Bienestar de Sofi en Casa
            </h3>
            <p className="text-purple-200/70 text-sm">Toca cada casilla para registrar tus logros del día.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {dailyHabits.map((habit) => {
              const isDone = completedHabits[habit.id];

              return (
                <button
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className={`p-4 rounded-2xl border backdrop-blur-md transition-all duration-200 text-left flex items-start gap-3 cursor-pointer select-none ${
                    isDone
                      ? "bg-emerald-950/30 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "bg-white/5 border-purple-500/20 hover:bg-white/8 hover:border-purple-400/40"
                  }`}
                >
                  <div className="mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-purple-400/50" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-purple-300/70 block mb-0.5">{habit.cat}</span>
                    <span
                      className={`text-xs sm:text-sm font-semibold leading-tight ${
                        isDone ? "text-emerald-200 line-through opacity-80" : "text-white"
                      }`}
                    >
                      {habit.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Suggested Weekly Schedule */}
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Plan Semanal en Casa</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-purple-400" />
            Horario Semanal Sugerido (15–20 min/día de Baile & Fitness)
          </h3>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md">
          <div className="grid grid-cols-1 divide-y divide-purple-500/20">
            {weeklySchedule.map((item, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 sm:w-64 shrink-0">
                  <span className="font-bold text-pink-300 text-sm sm:text-base">{item.day}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {item.focus}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-purple-100/90 grow leading-relaxed">{item.routine}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inspiring Footer Card */}
      <div className="rounded-3xl bg-linear-to-r from-pink-950/40 via-purple-950/30 to-fuchsia-950/40 border border-pink-400/30 p-8 text-center backdrop-blur-xl space-y-3">
        <span className="text-2xl sm:text-3xl font-serif font-bold text-pink-200 block">
          ¡Vas a brillar y divertirte como nunca, Sofi! ✨
        </span>
        <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mx-auto leading-relaxed">
          &ldquo;Baila, muévete y disfruta de cada paso. No se trata de exigirte de más, sino de celebrar tu cuerpo y llenarte de energía bonita.&rdquo; 💖
        </p>
      </div>
    </section>
  );
}
