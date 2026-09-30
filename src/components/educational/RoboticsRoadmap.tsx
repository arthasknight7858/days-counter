"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Sparkles,
  Cpu,
  Wrench,
  Cog,
  Compass,
  CheckCircle2,
  Square,
  Zap,
  ChevronDown,
  Terminal,
  Activity,
  Code2,
  HelpCircle,
  Briefcase,
  Eye,
  Box,
} from "lucide-react";

export default function RoboticsRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_robotics_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });
  const [openBlocks, setOpenBlocks] = useState<Record<string, boolean>>({
    r1: true,
    r3: true,
  });

  const toggleChecklist = (id: string) => {
    setCompletedMilestones((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_robotics_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleBlock = (id: string) => {
    setOpenBlocks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "fases", label: "🗺️ Ruta por Etapas (1 a 6)", icon: Compass },
    { id: "hardware", label: "⚙️ Hardware & Electrónica", icon: Cpu },
    { id: "software", label: "💻 Software, C++ & ROS 2", icon: Code2 },
    { id: "control", label: "📐 Cinemática & Control PID", icon: Activity },
    { id: "proyectos", label: "🚀 8 Proyectos de Menor a Mayor", icon: Wrench },
    { id: "carrera", label: "💼 Salidas Laborales & Salarios", icon: Briefcase },
    { id: "preguntas", label: "💡 Preguntas Frecuentes", icon: HelpCircle },
    { id: "hitos", label: "✅ Tracker de Hitos", icon: CheckCircle2 },
  ];

  const phases = [
    {
      id: "r1",
      num: "Fase 1",
      level: "Principiante Absoluto",
      weeks: "Semanas 1–8",
      title: "Fundamentos Eléctricos, Electrónica & Arduino",
      hours: "6–10h/semana",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      desc: "Aprende cómo fluye la energía, a soldar circuitos sin quemar componentes y a programar tus primeros sensores y actuadores con Arduino C++.",
      modules: [
        {
          title: "Electricidad & Componentes Pasivos",
          items: [
            "Ley de Ohm (V = I * R), Leyes de Kirchhoff y potencia eléctrica (P = V * I).",
            "Resistencias en serie y paralelo, divisores de tensión.",
            "Condensadores para filtrado de ruido y desacoplo de fuentes.",
            "Uso del multímetro digital: medir voltaje, continuidad, corriente y resistencia.",
          ],
          tip: "Nunca alimentes un motor directamente desde los pines de un microcontrolador; siempre usa una fuente externa y comparte la tierra (GND común).",
        },
        {
          title: "Semiconductores & Actuación",
          items: [
            "Diodos estándar, diodos Zener y diodos Flyback (protección contra picos inductivos de motores).",
            "Transistores BJT (NPN/PNP) y MOSFETs de canal N para conmutación de cargas de alta potencia.",
            "Puente H (L298N, DRV8833, TB6612FNG) para control bidireccional y PWM de velocidad.",
            "Servomotores SG90 y MG996R: control de posición mediante modulación por ancho de pulsos (PWM).",
          ],
          tip: "El chip TB6612FNG es infinitamente superior al L298N porque usa MOSFETs en lugar de transistores bipolares, perdiendo menos calor y energía.",
        },
        {
          title: "Programación de Microcontroladores (Arduino & C++)",
          items: [
            "Estructura básica: setup(), loop(), pinMode(), digitalWrite(), analogRead(), analogWrite().",
            "Manejo de tiempos sin bloquear el procesador usando millis() (adiós a delay()).",
            "Interrupciones externas por hardware (attachInterrupt) para leer encoders de cuadratura.",
            "Lectura de sensores: ultrasónico HC-SR04, infrarrojo seguidor de línea y sensor de temperatura/humedad.",
          ],
          tip: "Descarga 'Arduino IDE 2.x' o la extensión 'PlatformIO' en VS Code para programar como un ingeniero profesional.",
        },
      ],
    },
    {
      id: "r2",
      num: "Fase 2",
      level: "Intermedio I",
      weeks: "Semanas 9–16",
      title: "Microcontroladores Avanzados (ESP32 / STM32) & Protocolos",
      hours: "8–12h/semana",
      color: "from-blue-500/20 to-cyan-500/10 border-blue-500/40 text-blue-300",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      desc: "Da el salto a procesadores de 32 bits de doble núcleo con conectividad WiFi/Bluetooth y comunicación industrial entre placas.",
      modules: [
        {
          title: "El Poder del ESP32 & STM32 (ARM Cortex-M)",
          items: [
            "Arquitectura del ESP32 (Xtensa dual-core a 240MHz, DACs, ADCs de 12 bits, WiFi/BLE integrados).",
            "Introducción a FreeRTOS: creación de tareas paralelas (xTaskCreatePinnedToCore), semáforos y colas (Queues).",
            "STM32 con STM32CubeIDE y HAL: timers de alta resolución y DMA (Direct Memory Access).",
            "Gestión energética: modos Deep Sleep, Light Sleep y optimización para baterías LiPo/Li-Ion 18650.",
          ],
          tip: "Usa el ESP32 para proyectos con control remoto inalámbrico por WebSockets o telemetría MQTT.",
        },
        {
          title: "Buses & Protocolos de Comunicación Serial",
          items: [
            "UART (Universal Asynchronous Receiver-Transmitter): baud rates, buffers de anillo y depuración.",
            "I2C (Inter-Integrated Circuit): protocolo maestro-esclavo, líneas SDA/SCL, resistencias pull-up y escáner de direcciones.",
            "SPI (Serial Peripheral Interface): comunicación de alta velocidad (MISO, MOSI, SCK, CS) para pantallas TFT y tarjetas SD.",
            "CAN Bus: estándar de la industria automotriz y robótica pesada para transmisión inmune al ruido.",
          ],
          tip: "Si tu sensor I2C no responde, el 90% de las veces olvidaste las resistencias pull-up de 4.7kΩ a 3.3V.",
        },
      ],
    },
    {
      id: "r3",
      num: "Fase 3",
      level: "Intermedio II",
      weeks: "Semanas 17–26",
      title: "Mecánica, Diseño CAD 3D & Fabricación Digital",
      hours: "8–14h/semana",
      color: "from-purple-500/20 to-fuchsia-500/10 border-purple-500/40 text-purple-300",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      desc: "Un robot necesita un cuerpo fuerte, balanceado y ligero. Domina el modelado paramétrico y la manufactura de piezas reales.",
      modules: [
        {
          title: "Diseño Mecánico Paramétrico en CAD",
          items: [
            "Autodesk Fusion 360 u Onshape: bocetos con restricciones geométricas, extrusiones, revoluciones y filetes.",
            "Ensamblajes con uniones mecánicas (revolutas, prismáticas, esféricas) para simular movimiento real.",
            "Tolerancias de fabricación (ajustes por holgura y por interferencia de 0.2mm a 0.4mm según impresora).",
            "Cálculo de pares de torsión (Torque = Fuerza * Distancia) para seleccionar la fuerza necesaria de tus motores.",
          ],
          tip: "Siempre diseña tus piezas pensando en la orientación de las capas de impresión 3D para maximizar la resistencia al corte.",
        },
        {
          title: "Manufactura Aditiva & Diseño de PCBs Propias",
          items: [
            "Impresión 3D (FDM): calibración de flujo, altura de capa, relleno (infill gyroidal) y materiales (PLA, PETG, TPU flexible).",
            "Diseño de circuitos impresos (PCB) con EasyEDA o KiCad: esquemático, ruteo de pistas, planos de masa GND.",
            "Generación de archivos Gerber para ordenar fabricación profesional (JLCPCB, PCBWay).",
            "Técnicas de soldadura SMD y through-hole con estación de cautín y pistola de aire caliente.",
          ],
          tip: "Dejar una protoboard en un robot final es receta para fallos por vibración; pasa tus circuitos a una PCB diseñada por ti.",
        },
      ],
    },
    {
      id: "r4",
      num: "Fase 4",
      level: "Avanzado I",
      weeks: "Semanas 27–36",
      title: "Teoría de Control, Cinemática & Fusión Sensorial",
      hours: "10–15h/semana",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      desc: "La matemática que hace que un robot sepa dónde está en el espacio y se mueva suavemente hacia su objetivo sin temblar ni caerse.",
      modules: [
        {
          title: "Cinemática de Brazos & Robots Móviles",
          items: [
            "Matrices de Transformación Homogénea (rotación y traslación en 3D).",
            "Cinemática Directa: Convención Denavit-Hartenberg (DH) para calcular la posición de la pinza a partir de los ángulos.",
            "Cinemática Inversa (IK): resolver qué ángulos dar a los motores para que la pinza llegue a una coordenada (X, Y, Z).",
            "Cinemática diferencial: modelo de tracción diferencial (robots con dos ruedas) y ruedas mecanum omnidireccionales.",
          ],
          tip: "Para brazos de más de 3 grados de libertad, se utilizan métodos analíticos o la matriz Jacobiana invertida.",
        },
        {
          title: "Control PID & Fusión Sensorial (Filtros de Kalman)",
          items: [
            "Control en lazo cerrado: Error = Setpoint - Valor Actual.",
            "Controlador PID: Acción Proporcional (fuerza), Integral (elimina error residual) y Derivativa (amortigua oscilaciones).",
            "Sintonización práctica de ganancias (Kp, Ki, Kd) mediante el método de Ziegler-Nichols.",
            "Fusión sensorial con IMU (MPU6050 / BNO085): mezclar acelerómetro y giroscopio mediante Filtro Complementario o Filtro de Kalman extendido (EKF).",
          ],
          tip: "Un robot de dos ruedas auto-balanceado (como un Segway) es el mejor proyecto para dominar PID y Kalman.",
        },
      ],
    },
    {
      id: "r5",
      num: "Fase 5",
      level: "Avanzado II",
      weeks: "Semanas 37–46",
      title: "ROS 2 (Robot Operating System), Simulación & Percepción",
      hours: "10–16h/semana",
      color: "from-indigo-500/20 to-violet-500/10 border-indigo-500/40 text-indigo-300",
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      desc: "El estándar industrial mundial utilizado por Boston Dynamics, NASA y fabricantes automotrices para coordinar sistemas robóticos masivos.",
      modules: [
        {
          title: "Arquitectura Central de ROS 2 (Iron / Humble)",
          items: [
            "Conceptos DDS (Data Distribution Service): comunicación descentralizada sin master único.",
            "Nodos, Tópicos (Publicador/Suscriptor), Servicios (Cliente/Servidor) y Acciones (para metas de larga duración con feedback).",
            "Creación de paquetes en C++ y Python con colcon build y archivos launch.py.",
            "Transformaciones espaciales continuas con la librería tf2.",
          ],
          tip: "Instala Ubuntu 22.04 LTS (o máquina virtual con VirtualBox/WSL2) para trabajar con ROS 2 Humble de forma nativa y estable.",
        },
        {
          title: "Simulación Fotorrealista (Gazebo / Webots / Isaac Sim)",
          items: [
            "Modelado de robots con URDF (Unified Robot Description Format) y Xacro para reutilizar código.",
            "Definición de inercias, colisiones físicas, fricción y propiedades de materiales.",
            "Simulación de sensores virtuales: cámaras RGB, cámaras de profundidad y LiDAR.",
            "Visualización de nubes de puntos y marcos de referencia en RViz 2.",
          ],
          tip: "Nunca pruebes un algoritmo de navegación directamente en el robot físico sin haberlo validado antes en Gazebo.",
        },
      ],
    },
    {
      id: "r6",
      num: "Fase 6",
      level: "Especialización & Autonomía",
      weeks: "Semanas 47–52",
      title: "SLAM, Navegación Autónoma (Nav2), Visión & Drones",
      hours: "12–18h/semana",
      color: "from-rose-500/20 to-pink-500/10 border-rose-500/40 text-rose-300",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      desc: "El robot percibe su entorno con LiDAR y cámaras, crea mapas del mundo y decide rutas de navegación evitando obstáculos en tiempo real.",
      modules: [
        {
          title: "SLAM (Mapeo y Localización Simultánea) & Nav2",
          items: [
            "Sensores LiDAR 2D (RPLiDAR A1/A2) y sensores de profundidad (Intel RealSense / OAK-D).",
            "SLAM 2D con Cartographer o Slam Toolbox para generar mapas de ocupación (Occupancy Grid Maps).",
            "Configuración del stack Nav2: planificador global (algoritmos A*, Dijkstra) y planificador local (DWB, TEB).",
            "Árboles de comportamiento (Behavior Trees) para toma de decisiones autónomas y recuperación de atascos.",
          ],
          tip: "Nav2 es el stack que usan los robots de almacén de Amazon para mover palets sin chocar entre sí.",
        },
        {
          title: "Visión Artificial en Robótica & Drones",
          items: [
            "Procesamiento de imágenes con OpenCV en Python/C++: detección de bordes, contornos y calibración de cámara.",
            "Marcadores Fiduciales (ArUco y AprilTags) para aterrizajes de precisión y posicionamiento relativo de pinzas.",
            "Modelos de IA ligeros (YOLOv8-nano / MobileNet) ejecutándose en placas embebidas (Raspberry Pi 5 / NVIDIA Jetson Orin Nano).",
            "Robótica aérea: controladoras de vuelo Pixhawk, firmware PX4/ArduPilot y protocolo MAVLink para misiones autónomas.",
          ],
          tip: "La placa NVIDIA Jetson Orin Nano es el cerebro estándar para robótica autónoma avanzada con visión e IA combinadas.",
        },
      ],
    },
  ];

  const hardwareArsenal = [
    {
      category: "Cerebros & Controladores",
      icon: Cpu,
      color: "text-amber-300",
      items: [
        { name: "Arduino Uno / Nano", role: "Aprender lógica básica, pines analógicos/digitales y proyectos sencillos sin SO." },
        { name: "ESP32 (WROOM / S3)", role: "Potencia de 32 bits, WiFi/Bluetooth, FreeRTOS y bajo consumo para robots IoT." },
        { name: "Raspberry Pi 5 / 4", role: "Mini-computador Linux para correr nodos de ROS 2, procesamiento ligero de cámaras y servidor." },
        { name: "NVIDIA Jetson Orin Nano", role: "Potencia de cómputo GPU con núcleos Tensor para correr YOLO, SLAM 3D y redes neuronales en tiempo real." },
      ],
    },
    {
      category: "Actuadores & Motores",
      icon: Cog,
      color: "text-cyan-300",
      items: [
        { name: "Servomotores (SG90, MG996R)", role: "Control de ángulo preciso de 0° a 180° para brazos, pinzas y mecanismos de dirección." },
        { name: "Motores Paso a Paso (NEMA 17)", role: "Alta precisión angular sin encoders, ideal para impresoras 3D y plataformas CNC." },
        { name: "Motores DC con Reductora & Encoders", role: "La base de los robots móviles con ruedas. El encoder mide revoluciones y velocidad angular." },
        { name: "Motores Brushless (BLDC)", role: "Altísima velocidad y eficiencia para hélices de drones y articulaciones de perros robóticos." },
      ],
    },
    {
      category: "Sentidos del Robot (Sensores)",
      icon: Eye,
      color: "text-emerald-300",
      items: [
        { name: "IMU (Inertial Measurement Unit - MPU6050 / BNO085)", role: "Acelerómetro de 3 ejes + Giroscopio de 3 ejes para medir orientación, inclinación y balance." },
        { name: "LiDAR 2D (RPLiDAR A1)", role: "Lanza pulsos láser en 360° para medir distancias y construir el plano de la habitación en tiempo real." },
        { name: "Cámaras de Profundidad (Intel RealSense D435 / OAK-D)", role: "Obtienen color RGB y distancia milimétrica en cada píxel (Point Cloud 3D)." },
        { name: "Encoders de Cuadratura Ópticos/Magnéticos", role: "Miden los giros de cada rueda para calcular la odometría (cuánto avanzó y giró el robot)." },
      ],
    },
    {
      category: "Energía & Alimentación",
      icon: Zap,
      color: "text-rose-300",
      items: [
        { name: "Baterías LiPo (Polímero de Litio 2S/3S/4S)", role: "Descarga de alta corriente instantánea (tasa C alta) requerida por motores y servos potentes." },
        { name: "Celdas 18650 Li-Ion con BMS", role: "Gran densidad energética para rovers terrestres que requieren horas de autonomía continua." },
        { name: "Reguladores Buck Conmutados (DC-DC Step-Down)", role: "Bajan voltajes altos (ej. 11.1V de LiPo) a 5V/3.3V estables sin sobrecalentarse como los reguladores lineales." },
      ],
    },
  ];

  const progressiveProjects = [
    {
      title: "1. Robot Seguidor de Línea de Alta Precisión con PID",
      diff: "Fácil - Semanas 4 a 6",
      tech: "Arduino Nano + Matriz de 5 a 8 sensores IR + Driver TB6612FNG + Algoritmo PID",
      description:
        "No uses simples condicionales if/else. Implementa un controlador PID analógico continuo que mida el error respecto a la línea y ajuste suavemente la velocidad diferencial de los motores.",
      learnings: "Control en lazo cerrado, calibración de sensores ópticos y cálculo de derivadas en tiempo real.",
    },
    {
      title: "2. Rover Evasor de Obstáculos con Mapeo Básico",
      diff: "Fácil / Intermedio - Semanas 7 a 10",
      tech: "ESP32 + Sensor ultrasónico sobre micro-servo + Bluetooth/WiFi telemetría",
      description:
        "El robot avanza, cuando detecta un obstáculo gira la cabeza ultrasónica 45° a la izquierda y 45° a la derecha, calcula la ruta libre óptima y reporta su estado a una app móvil o página web.",
      learnings: "Máquinas de estados finitos (FSM), WebSockets y evitación reactiva de obstáculos.",
    },
    {
      title: "3. Brazo Robótico de 4 o 5 Grados de Libertad (DOF)",
      diff: "Intermedio - Semanas 14 a 18",
      tech: "Diseño impreso en 3D en Fusion 360 + Servos MG996R + Cinemática Inversa (IK)",
      description:
        "Un brazo con pinza capaz de agarrar un objeto en una coordenada (X, Y, Z) especificada. En lugar de mover motor por motor, el usuario le da las coordenadas finales y el código resuelve los ángulos matemáticos.",
      learnings: "Diseño CAD 3D, cinemática inversa trigonométrica y control articular sincronizado.",
    },
    {
      title: "4. Robot de 2 Ruedas Auto-Balanceado (Inverted Pendulum)",
      diff: "Intermedio / Avanzado - Semanas 20 a 24",
      tech: "ESP32 + IMU MPU6050 + Motores con encoder + Filtro Complementario + Doble PID",
      description:
        "El desafío clásico de control: un robot tipo Segway que se mantiene de pie sobre dos ruedas inestables. Un lazo PID controla el ángulo de inclinación y otro la velocidad de traslación para no acelerar indefinidamente.",
      learnings: "Fusión sensorial, control de sistemas inherentemente inestables y modulación rápida de PWM.",
    },
    {
      title: "5. Gemelo Digital en Simulación Gazebo & RViz",
      diff: "Avanzado - Semanas 30 a 34",
      tech: "ROS 2 Humble + Archivos URDF/Xacro + Gazebo Fortress + RViz 2",
      description:
        "Crea el modelo físico de tu robot con masas e inercias reales. Lanza un mundo virtual con rampas y cajas, y comprueba que responde a los comandos de velocidad por tópicos (/cmd_vel).",
      learnings: "Ecosistema ROS 2, especificación de mallas 3D para colisión y cinemática en simulación.",
    },
    {
      title: "6. Rover Autónomo con LiDAR 2D & SLAM",
      diff: "Avanzado - Semanas 38 a 44",
      tech: "Raspberry Pi 5 + RPLiDAR A1 + Slam Toolbox + Nav2 Stack",
      description:
        "El robot recorre tu sala de estar de forma remota, genera un mapa bidimensional perfecto en formato .pgm y .yaml, y después de guardar el mapa, le marcas un punto en RViz y navega solo esquivando muebles y personas.",
      learnings: "Algoritmos SLAM, mapas de ocupación, coste local/global y evitación de obstáculos dinámica.",
    },
    {
      title: "7. Robot Clasificador con Visión Artificial (Pick & Place)",
      diff: "Avanzado / Pro - Semanas 45 a 48",
      tech: "Brazo robótico + Cámara RGB fija + OpenCV + Detección de color/formas o Marcadores ArUco",
      description:
        "Una cámara montada sobre una mesa identifica cubos rojos, azules y verdes. Calcula la posición en píxeles, la convierte a milímetros del mundo real mediante la matriz de calibración de cámara, y el brazo los coloca en recipientes separados.",
      learnings: "Calibración de cámara intrínseca/extrínseca, transformación de píxeles a coordenadas métricas y coordinación ojo-mano.",
    },
    {
      title: "8. Cuadrúpedo Pequeño o Robot Bípedo",
      diff: "Nivel Experto - Semanas 49 a 52+",
      tech: "12 servomotores rápidos + Teensy 4.1 o ESP32-S3 + Generación de trayectorias cicloides",
      description:
        "El robot más complejo: un cuadrúpedo de 12 articulaciones (3 por pata). Implementa cinemática inversa en tiempo real para generar un ciclo de marcha trotando o caminando de forma fluida y manteniendo el centro de masa.",
      learnings: "Planificación de marcha (Gait planning), estabilidad dinámica y sincronización masiva de actuadores.",
    },
  ];

  const milestones = [
    { id: "m1", label: "Medí voltaje, resistencia y corriente con un multímetro real" },
    { id: "m2", label: "Encendí y regulé la velocidad de un motor DC con PWM y un puente H" },
    { id: "m3", label: "Leí un encoder incremental usando interrupciones externas sin perder pulsos" },
    { id: "m4", label: "Programé mi primer ESP32 usando WiFi/WebSockets y FreeRTOS multitarea" },
    { id: "m5", label: "Diseñé una pieza en Fusion 360 o Onshape y la imprimí en 3D con tolerancias correctas" },
    { id: "m6", label: "Diseñé un circuito esquemático y ruteé una PCB propia en KiCad o EasyEDA" },
    { id: "m7", label: "Implementé y sintonizé un lazo de control PID para velocidad o posición" },
    { id: "m8", label: "Filtré datos ruidosos de un acelerómetro y giroscopio con Filtro Complementario o Kalman" },
    { id: "m9", label: "Instalé Ubuntu 22.04 y creé mi primer paquete ROS 2 con nodos publicador/suscriptor" },
    { id: "m10", label: "Construí un robot en URDF y lo puse a caminar/rodar en el simulador Gazebo" },
    { id: "m11", label: "Conecté un sensor LiDAR y mapeé una habitación completa usando SLAM" },
    { id: "m12", label: "Mandé una meta de navegación en Nav2 y el robot llegó de forma 100% autónoma" },
    { id: "m13", label: "Integré visión artificial con OpenCV para detectar y seguir un objeto con la cámara" },
  ];

  const completedCount = Object.values(completedMilestones).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="w-full space-y-8 text-white">
      {/* Hero Header */}
      <div className="p-6 sm:p-10 rounded-3xl bg-linear-to-br from-amber-950/40 via-purple-950/30 to-black/60 border border-amber-500/30 backdrop-blur-xl shadow-[0_10px_40px_rgba(245,158,11,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            Ingeniería & Robótica Autónoma
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-white">
            Guía Maestra de{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-orange-300 to-yellow-200">
              Robótica & Automatización
            </span>
          </h2>
          <p className="text-sm sm:text-base text-amber-100/80 leading-relaxed">
            Desde la primera soldadura con estaño y programación en Arduino hasta el desarrollo de robots móviles autónomos con **ROS 2**, cinemática inversa, sensores LiDAR y visión artificial. Todo explicado a fondo con proyectos reales.
          </p>
        </div>

        {/* Progress bar preview */}
        <div className="mt-6 pt-5 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-amber-300">{progressPercent}%</div>
            <div>
              <p className="text-xs font-semibold text-white">Progreso del Roadmap de Robótica</p>
              <p className="text-[11px] text-amber-200/60">
                {completedCount} de {milestones.length} hitos dominados
              </p>
            </div>
          </div>
          <div className="w-full sm:w-64 h-2.5 bg-black/40 rounded-full overflow-hidden border border-amber-500/30">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-linear-to-r from-amber-500 to-orange-400 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)] font-bold"
                  : "bg-white/5 hover:bg-white/10 text-amber-200/80 hover:text-white border border-amber-500/20"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION: FASES / RUTA POR ETAPAS */}
      {(activeSubTab === "all" || activeSubTab === "fases") && (
        <section className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span>Ruta de Aprendizaje Progresiva (6 Fases)</span>
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
                Aprende de forma sólida: primero hardware y electrónica básica, luego algoritmos de control y finalmente inteligencia y autonomía.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {phases.map((phase) => {
              const isOpen = !!openBlocks[phase.id];
              return (
                <div
                  key={phase.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? "bg-white/5 border-amber-500/40 shadow-[0_4px_20px_rgba(245,158,11,0.1)]"
                      : "bg-black/30 border-white/10 hover:border-amber-500/30"
                  }`}
                >
                  <button
                    onClick={() => toggleBlock(phase.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${phase.badge}`}>
                        {phase.num}
                      </span>
                      <span className="text-xs text-white/50">{phase.weeks}</span>
                      <span className="text-xs text-amber-400/90 font-mono">⏱️ {phase.hours}</span>
                      <span className="text-xs text-orange-300 font-semibold px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                        {phase.level}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white w-full sm:w-auto">
                        {phase.title}
                      </h4>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-400 transition-transform shrink-0 ${
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
                        transition={{ duration: 0.3 }}
                        className="px-4 pb-5 sm:px-5 space-y-4 border-t border-white/5 pt-4"
                      >
                        <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed italic">
                          {phase.desc}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {phase.modules.map((mod, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl bg-black/40 border border-amber-500/20 space-y-2.5"
                            >
                              <h5 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                {mod.title}
                              </h5>
                              <ul className="space-y-1.5 text-xs text-white/80">
                                {mod.items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="flex items-start gap-2">
                                    <span className="text-amber-400 text-xs leading-none mt-1">▸</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                              {mod.tip && (
                                <div className="mt-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-200">
                                  <span className="font-bold text-amber-300">💡 Consejo Pro: </span>
                                  {mod.tip}
                                </div>
                              )}
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
        </section>
      )}

      {/* SECTION: HARDWARE ARSENAL */}
      {(activeSubTab === "all" || activeSubTab === "hardware") && (
        <section className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-400" />
              <span>Arsenal de Hardware & Componentes Esenciales</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
              Guía práctica de qué comprar y para qué sirve cada componente del mundo robótico real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {hardwareArsenal.map((group, idx) => {
              const Icon = group.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 border border-amber-500/25 backdrop-blur-md space-y-4"
                >
                  <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-bold text-white font-serif">{group.category}</h4>
                  </div>
                  <div className="space-y-3">
                    {group.items.map((item, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 hover:border-amber-500/30 transition-colors"
                      >
                        <div className="font-semibold text-xs sm:text-sm text-amber-300">
                          {item.name}
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed">{item.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION: SOFTWARE & ROS 2 */}
      {(activeSubTab === "all" || activeSubTab === "software") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-linear-to-b from-indigo-950/40 via-purple-950/20 to-black/60 border border-indigo-500/30 backdrop-blur-xl space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Terminal className="w-3.5 h-3.5" />
              Stack de Software Industrial
            </div>
            <h3 className="text-xl sm:text-3xl font-bold font-serif text-white">
              C++, Python & el Ecosistema de ROS 2
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 mt-1 max-w-2xl">
              ¿Por qué no basta con programar en Arduino? En robótica avanzada, diferentes programas independientes (nodos) deben comunicarse entre sí a alta velocidad sin saturar el sistema.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-indigo-500/20 space-y-2">
              <div className="text-indigo-400 font-bold text-sm flex items-center gap-1.5">
                <Code2 className="w-4 h-4" /> C++ Moderno (C++17/20)
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                El rey de la velocidad. Se utiliza para lazos de control de motores a 1000Hz, cálculos cinemáticos pesados y lectura ultra rápida de sensores LiDAR. Sin garbage collection, latencia determinista.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-indigo-500/20 space-y-2">
              <div className="text-indigo-400 font-bold text-sm flex items-center gap-1.5">
                <Terminal className="w-4 h-4" /> Python 3 (rclpy)
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Ideal para prototipado rápido, lógica de alto nivel, visión artificial con OpenCV, integración con modelos de IA (PyTorch) y orquestación de comportamiento de robots en ROS 2.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-indigo-500/20 space-y-2">
              <div className="text-indigo-400 font-bold text-sm flex items-center gap-1.5">
                <Box className="w-4 h-4" /> Simulación (Gazebo & Webots)
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Simuladores con motores de física (ODE, Bullet) que permiten reproducir gravedad, fricción y sensores virtuales. Te ahorra miles de dólares en piezas rotas por caídas accidentales.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-indigo-500/30 space-y-2 font-mono text-xs">
            <div className="text-indigo-300 font-semibold flex items-center gap-2">
              <span>🖥️ Comandos Clave en la Terminal de ROS 2</span>
            </div>
            <div className="space-y-1 text-white/70 overflow-x-auto">
              <p><span className="text-emerald-400">ros2 node list</span> # Ver todos los nodos robóticos corriendo</p>
              <p><span className="text-emerald-400">ros2 topic echo /cmd_vel</span> # Escuchar comandos de velocidad (velocidad lineal y angular)</p>
              <p><span className="text-emerald-400">ros2 run rviz2 rviz2</span> # Abrir visualizador 3D de sensores, nubes de puntos y mapas</p>
              <p><span className="text-emerald-400">colcon build --symlink-install</span> # Compilar el workspace de robótica</p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: CINEMÁTICA & CONTROL */}
      {(activeSubTab === "all" || activeSubTab === "control") && (
        <section className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" />
              <span>Cinemática & Teoría de Control Desmitificada</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
              Las matemáticas aplicadas que transforman metal y motores en movimiento inteligente y preciso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-white/5 border border-amber-500/25 space-y-3">
              <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <span>🦾 Cinemática Directa vs Inversa</span>
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                - **Cinemática Directa (FK):** &ldquo;Si roto el hombro 30° y el codo 45°, ¿en qué coordenada exacta (X, Y, Z) termina la pinza?&rdquo; Es una multiplicación de matrices simple y directa.
              </p>
              <p className="text-xs text-white/80 leading-relaxed">
                - **Cinemática Inversa (IK):** &ldquo;Quiero tomar un vaso que está en (X=30cm, Y=15cm, Z=5cm). ¿Qué ángulos deben tener los motores?&rdquo; Es mucho más compleja porque puede tener múltiples soluciones o ninguna (si está fuera del alcance).
              </p>
              <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 text-xs text-amber-200/90 font-mono">
                Transformación = [ Rotación_3x3 | Traslación_3x1 ]
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-amber-500/25 space-y-3">
              <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <span>⚖️ El Algoritmo de Control PID</span>
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                El 95% de los sistemas de automatización en el mundo real usan PID para mantener un valor deseado:
              </p>
              <ul className="space-y-1.5 text-xs text-white/80">
                <li><strong className="text-amber-300">P (Proporcional):</strong> Aplica fuerza proporcional a lo lejos que estés de la meta.</li>
                <li><strong className="text-amber-300">I (Integral):</strong> Si queda un pequeño error que no se quita, va acumulando fuerza en el tiempo hasta corregirlo.</li>
                <li><strong className="text-amber-300">D (Derivativo):</strong> Anticipa el frenado si ve que te acercas muy rápido, evitando que te pases de largo.</li>
              </ul>
              <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 text-xs text-amber-200/90 font-mono">
                u(t) = Kp*e(t) + Ki*∫e(t)dt + Kd*de(t)/dt
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: 8 PROYECTOS PRÁCTICOS */}
      {(activeSubTab === "all" || activeSubTab === "proyectos") && (
        <section className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-amber-400" />
              <span>8 Proyectos Progresivos de Portafolio</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
              Construir proyectos reales es la única manera de aprender robótica de verdad. Sigue esta secuencia paso a paso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progressiveProjects.map((proj, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-amber-500/25 hover:border-amber-500/50 backdrop-blur-md space-y-3 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {proj.diff}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white font-serif">{proj.title}</h4>
                  <p className="text-xs text-white/80 leading-relaxed">{proj.description}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-amber-400 font-semibold">🛠️ Tecnologías: </span>
                    <span className="text-white/70">{proj.tech}</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-semibold">🎯 Lo que dominas: </span>
                    <span className="text-white/70">{proj.learnings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: SALIDAS LABORALES & SALARIOS */}
      {(activeSubTab === "all" || activeSubTab === "carrera") && (
        <section className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-400" />
              <span>Mercado Laboral & Especialidades en Robótica</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
              La robótica combina tres carreras en una (mecánica, electrónica y software). Estas son las ramas mejor pagadas en el mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/20 space-y-2">
              <span className="text-xs font-bold text-amber-400">🚗 Robótica Automotriz & Manufactura</span>
              <h5 className="font-bold text-white text-sm">Ingeniero de Automatización / PLC</h5>
              <p className="text-xs text-white/70 leading-relaxed">
                Programación de brazos industriales (KUKA, ABB, Fanuc), PLC Siemens, líneas de ensamblaje automatizadas y protocolos SCADA.
              </p>
              <div className="text-xs font-semibold text-emerald-400 pt-1">
                💰 Salario Promedio: $60,000 – $110,000 USD/año
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/20 space-y-2">
              <span className="text-xs font-bold text-amber-400">🤖 Robótica Móvil & Logística (AMRs)</span>
              <h5 className="font-bold text-white text-sm">Robotics Software Engineer (ROS 2)</h5>
              <p className="text-xs text-white/70 leading-relaxed">
                Desarrollo de robots móviles autónomos para almacenes (tipo Amazon Kiva), SLAM, flotas colaborativas y navegación Nav2.
              </p>
              <div className="text-xs font-semibold text-emerald-400 pt-1">
                💰 Salario Promedio: $90,000 – $150,000 USD/año
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/20 space-y-2">
              <span className="text-xs font-bold text-amber-400">🚁 Drones & Sistemas No Tripulados</span>
              <h5 className="font-bold text-white text-sm">UAV & Flight Control Engineer</h5>
              <p className="text-xs text-white/70 leading-relaxed">
                Control de vuelo con PX4/ArduPilot, misiones autónomas para agricultura de precisión, inspección energética y defensa.
              </p>
              <div className="text-xs font-semibold text-emerald-400 pt-1">
                💰 Salario Promedio: $85,000 – $140,000 USD/año
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/20 space-y-2">
              <span className="text-xs font-bold text-amber-400">🩺 Robótica Quirúrgica & Médica</span>
              <h5 className="font-bold text-white text-sm">Medical Robotics Specialist</h5>
              <p className="text-xs text-white/70 leading-relaxed">
                Sistemas teleoperados de altísima precisión (como el robot Da Vinci), exoesqueletos de rehabilitación y prótesis biónicas.
              </p>
              <div className="text-xs font-semibold text-emerald-400 pt-1">
                💰 Salario Promedio: $100,000 – $165,000 USD/año
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/20 space-y-2">
              <span className="text-xs font-bold text-amber-400">⚡ Hardware Embebido & Firmware</span>
              <h5 className="font-bold text-white text-sm">Embedded Firmware Engineer</h5>
              <p className="text-xs text-white/70 leading-relaxed">
                Programación en C/Rust en microcontroladores ARM Cortex, diseño de drivers para motores, CAN Bus y optimización en milisegundos.
              </p>
              <div className="text-xs font-semibold text-emerald-400 pt-1">
                💰 Salario Promedio: $80,000 – $135,000 USD/año
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/20 space-y-2">
              <span className="text-xs font-bold text-amber-400">🧠 Robótica Humanoide & AI Embodied</span>
              <h5 className="font-bold text-white text-sm">Embodied AI Researcher</h5>
              <p className="text-xs text-white/70 leading-relaxed">
                El futuro inmediato (Tesla Optimus, Figure AI, Boston Dynamics): entrenamiento de redes neuronales con Sim-to-Real para humanoides.
              </p>
              <div className="text-xs font-semibold text-emerald-400 pt-1">
                💰 Salario Promedio: $130,000 – $220,000+ USD/año
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: PREGUNTAS FRECUENTES */}
      {(activeSubTab === "all" || activeSubTab === "preguntas") && (
        <section className="space-y-4">
          <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>Preguntas Frecuentes de Principiantes</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/20 space-y-1.5">
              <h5 className="font-bold text-amber-300">¿Necesito ser un genio en matemáticas para aprender robótica?</h5>
              <p className="text-white/80 leading-relaxed">
                No. Para la primera mitad de tu aprendizaje (Arduino, electrónica, motores y sensores básicos) solo necesitas aritmética elemental. Cuando llegues a cinemática y control, aprenderás álgebra lineal y trigonometría con ejemplos visuales aplicados directamente a las articulaciones de tu robot.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/20 space-y-1.5">
              <h5 className="font-bold text-amber-300">¿Cuánto dinero cuesta armar un kit básico para empezar?</h5>
              <p className="text-white/80 leading-relaxed">
                Un kit de inicio (Arduino Uno o Nano + protoboard + LEDs + resistencias + servos SG90 + sensor ultrasónico + multímetro económico) cuesta entre **$25 y $40 USD**. Con eso puedes construir tus primeros 3 robots antes de necesitar un ESP32 o una Raspberry Pi.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/20 space-y-1.5">
              <h5 className="font-bold text-amber-300">¿Por qué debo usar ROS 2 en vez de ROS 1?</h5>
              <p className="text-white/80 leading-relaxed">
                ROS 1 ya está obsoleto (EndOfLife en 2025). ROS 2 fue reconstruido desde cero para tiempo real, no requiere un servidor central (roscore), soporta microcontroladores embebidos mediante **micro-ROS** y es el único que contratan las empresas hoy en día.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: TRACKER DE HITOS */}
      {(activeSubTab === "all" || activeSubTab === "hitos") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-amber-500/30 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                <span>Tracker de Hitos & Conquistas de Robótica</span>
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
                Marca cada hito que vayas dominando. Se guarda automáticamente en tu navegador.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-amber-300">{completedCount} / {milestones.length}</span>
              <p className="text-[11px] text-amber-200/60 font-semibold">{progressPercent}% Completado</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {milestones.map((m) => {
              const isDone = !!completedMilestones[m.id];
              return (
                <button
                  key={m.id}
                  onClick={() => toggleChecklist(m.id)}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    isDone
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-200"
                      : "bg-black/30 border-white/10 hover:border-amber-500/30 text-white/70"
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Square className="w-4 h-4 text-white/40" />
                    )}
                  </div>
                  <span className={`text-xs sm:text-sm leading-snug ${isDone ? "line-through opacity-80" : ""}`}>
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
