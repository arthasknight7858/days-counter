"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  Layers,
  Network,
  Bot,
  Terminal,
  Activity,
  HelpCircle,
  Briefcase,
  CheckCircle2,
  Square,
  ChevronDown,
  Database,
  Search,
  Zap,
} from "lucide-react";

export default function AiRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_ai_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });
  const [openBlocks, setOpenBlocks] = useState<Record<string, boolean>>({
    ai1: true,
    ai4: true,
  });

  const toggleChecklist = (id: string) => {
    setCompletedMilestones((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_ai_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleBlock = (id: string) => {
    setOpenBlocks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "fases", label: "🗺️ Ruta por Etapas (1 a 6)", icon: Network },
    { id: "matematicas", label: "📐 Matemáticas Clave", icon: Activity },
    { id: "ml_dl", label: "🧠 Machine Learning & PyTorch", icon: Layers },
    { id: "genai_llms", label: "✨ LLMs, Transformers & RAG", icon: BrainCircuit },
    { id: "agentes", label: "🤖 Agentes Autónomos & MCP", icon: Bot },
    { id: "mlops", label: "⚙️ MLOps & Despliegue en Prod", icon: Terminal },
    { id: "proyectos", label: "🚀 8 Proyectos de Alto Impacto", icon: Zap },
    { id: "carrera", label: "💼 Roles en la Industria & Salarios", icon: Briefcase },
    { id: "preguntas", label: "💡 Preguntas Frecuentes", icon: HelpCircle },
    { id: "hitos", label: "✅ Tracker de Hitos", icon: CheckCircle2 },
  ];

  const phases = [
    {
      id: "ai1",
      num: "Fase 1",
      level: "Fundamentos",
      weeks: "Semanas 1–8",
      title: "Python Avanzado, Datos & Matemáticas para IA",
      hours: "8–12h/semana",
      color: "from-blue-500/20 to-cyan-500/10 border-blue-500/40 text-blue-300",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      desc: "Domina el lenguaje universal de la inteligencia artificial y el stack fundamental de manipulación numérica y matricial.",
      modules: [
        {
          title: "Python Moderno para Data & Computación Científica",
          items: [
            "Tipado estático con typing, dataclasses y programación funcional (map, filter, list comprehensions).",
            "NumPy a fondo: arreglos n-dimensionales (ndarrays), broadcasting, vectorización e indexación booleana.",
            "Pandas & Polars: DataFrames, agrupaciones (groupby), combinación de datasets y limpieza de valores nulos.",
            "Visualización de datos: Matplotlib, Seaborn y gráficos interactivos con Plotly.",
          ],
          tip: "Evita los bucles for de Python tradicional cuando proceses datos masivos; las operaciones vectorizadas de NumPy corren en C y son hasta 100 veces más rápidas.",
        },
        {
          title: "Matemáticas Esenciales Aplicadas a IA",
          items: [
            "Álgebra Lineal: vectores, matrices, producto punto, normas L1/L2, valores y vectores propios (Eigenvalues).",
            "Cálculo Multivariable: derivadas parciales, vector gradiente y regla de la cadena (el corazón del Backpropagation).",
            "Probabilidad & Estadística: distribuciones gaussianas, Teorema de Bayes, valor esperado y desviación estándar.",
            "Optimización: función de coste (Loss Function) y Descenso de Gradiente (Stochastic Gradient Descent).",
          ],
          tip: "No necesitas memorizar demostraciones teóricas; lo crucial es entender la intuición geométrica de qué hace un gradiente en el espacio.",
        },
      ],
    },
    {
      id: "ai2",
      num: "Fase 2",
      level: "Intermedio I",
      weeks: "Semanas 9–16",
      title: "Machine Learning Tradicional (Scikit-Learn)",
      hours: "8–14h/semana",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      desc: "Los algoritmos clásicos que mueven la banca, medicina y predicción empresarial antes de entrar en redes neuronales profundas.",
      modules: [
        {
          title: "Aprendizaje Supervisado (Clasificación & Regresión)",
          items: [
            "Regresión Lineal y Regresión Logística con regularización Lasso (L1) y Ridge (L2).",
            "Árboles de Decisión y Ensambles: Random Forest y algoritmos Gradient Boosting (XGBoost, LightGBM, CatBoost).",
            "Máquinas de Vectores de Soporte (SVM) y k-Nearest Neighbors (KNN).",
            "Métricas de evaluación reales: Matriz de Confusión, Precisión, Recall, F1-Score, Curva ROC y AUC.",
          ],
          tip: "En datos tabulares estructurados (hojas de cálculo, bases de datos SQL), XGBoost y LightGBM casi siempre superan a las redes neuronales.",
        },
        {
          title: "Aprendizaje No Supervisado & Preprocesamiento",
          items: [
            "Clustering: K-Means, DBSCAN y clustering jerárquico.",
            "Reducción de Dimensionalidad: PCA (Análisis de Componentes Principales) y t-SNE.",
            "Validación cruzada estratificada (K-Fold Cross-Validation) para evitar fuga de datos (Data Leakage).",
            "Pipelines de Scikit-Learn: escalado (StandardScaler), codificación (OneHotEncoder) e imputación.",
          ],
          tip: "El mayor error de un novato es ajustar (fit) los transformadores de datos usando el conjunto de prueba (test set); siempre haz fit solo en train.",
        },
      ],
    },
    {
      id: "ai3",
      num: "Fase 3",
      level: "Intermedio II",
      weeks: "Semanas 17–26",
      title: "Deep Learning & Redes Neuronales con PyTorch",
      hours: "10–16h/semana",
      color: "from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-300",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      desc: "Aprende a programar neuronas artificiales desde cero y domina PyTorch, el framework estándar de investigación e industria.",
      modules: [
        {
          title: "Fundamentos de Redes Neuronales Profundas (DNN)",
          items: [
            "El Perceptrón multicapa (MLP) y funciones de activación no lineales (ReLU, GELU, Sigmoid, Softmax).",
            "Entropía cruzada (Cross-Entropy Loss), MSE Loss y el algoritmo de Retropropagación (Backpropagation).",
            "Optimizadores modernos: Adam, AdamW y programación de tasas de aprendizaje (Learning Rate Schedulers).",
            "Técnicas de regularización: Dropout, Batch Normalization y Layer Normalization.",
          ],
          tip: "PyTorch construye grafos computacionales dinámicos mediante su motor autograd; cada tensor guarda el gradiente automáticamente.",
        },
        {
          title: "Visión por Computador (CNNs) & Secuencias (RNN/LSTM)",
          items: [
            "Redes Neuronales Convolucionales (CNN): filtros de convolución, stride, padding y max pooling.",
            "Arquitecturas clásicas y modernas: ResNet (conexiones residuales skip-connections) y EfficientNet.",
            "Transfer Learning: congelar capas de modelos preentrenados de torchvision y afinar la última capa.",
            "Redes Recurrentes (RNNs) y LSTMs/GRUs para modelado de series temporales y texto secuencial.",
          ],
          tip: "Transfer Learning te permite lograr un 95% de precisión con solo 50 imágenes por clase usando pesos preentrenados en ImageNet.",
        },
      ],
    },
    {
      id: "ai4",
      num: "Fase 4",
      level: "Avanzado I",
      weeks: "Semanas 27–36",
      title: "Arquitectura Transformer, GenAI & Modelos Masivos (LLMs)",
      hours: "10–18h/semana",
      color: "from-fuchsia-500/20 to-pink-500/10 border-fuchsia-500/40 text-fuchsia-300",
      badge: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
      desc: "El paper que cambió el mundo: 'Attention Is All You Need'. Entiende cómo funcionan GPT, Claude y Llama por dentro.",
      modules: [
        {
          title: "La Mecánica del Transformer & Auto-Atención",
          items: [
            "Mecanismo de Auto-Atención Escalada (Scaled Dot-Product Attention: Q, K, V).",
            "Multi-Head Attention: cómo el modelo atiende a diferentes aspectos gramaticales y contextuales al mismo tiempo.",
            "Codificaciones posicionales (Positional Encodings & RoPE - Rotary Position Embeddings).",
            "Modelos Encoder-only (BERT), Decoder-only (GPT, Llama, Mistral) y Encoder-Decoder (T5).",
          ],
          tip: "La fórmula mágica de atención es: Attention(Q, K, V) = softmax(Q * K^T / √d_k) * V.",
        },
        {
          title: "Tokenización & Embeddings Semánticos",
          items: [
            "Algoritmos de tokenización de subpalabras: Byte-Pair Encoding (BPE), WordPiece y SentencePiece.",
            "Embeddings densos: vectores continuos que capturan similitud semántica (Cosine Similarity).",
            "Ecosistema Hugging Face: AutoModel, AutoTokenizer, Datasets y Transformers Hub.",
            "Generación de texto: muestreo top-k, top-p (nucleus sampling), temperatura y repetición de penalización.",
          ],
          tip: "Un token equivale en promedio a 4 caracteres en inglés o 3 en español; los números y código consumen más tokens por palabra.",
        },
      ],
    },
    {
      id: "ai5",
      num: "Fase 5",
      level: "Avanzado II",
      weeks: "Semanas 37–46",
      title: "RAG Avanzado, Fine-Tuning Eficiente (LoRA) & Vector DBs",
      hours: "12–18h/semana",
      color: "from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-300",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      desc: "Conecta LLMs a datos privados empresariales sin alucinaciones y adapta modelos de código abierto a tu propio dominio.",
      modules: [
        {
          title: "Sistemas RAG (Retrieval-Augmented Generation)",
          items: [
            "Pipeline RAG: Chunking inteligente (semántico y recursivo), generación de embeddings e indexación.",
            "Bases de datos vectoriales: ChromaDB, Pinecone, Qdrant, Milvus y extensión pgvector en PostgreSQL.",
            "Búsqueda Híbrida: combinación de búsqueda vectorial semántica (Dense) con búsqueda por palabras clave BM25 (Sparse).",
            "Reranking con Cross-Encoders (Cohere Rerank, BGE-Reranker) para priorizar los fragmentos más relevantes antes de alimentar al LLM.",
          ],
          tip: "El 80% de los fallos de un RAG vienen de una mala estrategia de chunking o falta de un buen modelo de Reranking.",
        },
        {
          title: "Fine-Tuning Eficiente (PEFT & LoRA / QLoRA)",
          items: [
            "Diferencias entre Prompt Engineering, RAG y Fine-Tuning (cuándo usar cada uno).",
            "LoRA (Low-Rank Adaptation): congelar el modelo base y entrenar únicamente matrices de bajo rango en las capas de atención.",
            "QLoRA: cuantización del modelo a 4 bits con precisión NormalFloat (NF4) para afinar modelos de 7B/13B en una sola GPU de consumo (RTX 3060/4090).",
            "Alineación con feedback humano: DPO (Direct Preference Optimization) y RLHF.",
          ],
          tip: "LoRA reduce los parámetros entrenables en un 99.9%, permitiéndote personalizar un modelo masivo con solo unos pocos gigabytes de VRAM.",
        },
      ],
    },
    {
      id: "ai6",
      num: "Fase 6",
      level: "Especialización & Producción",
      weeks: "Semanas 47–52",
      title: "Agentes Autónomos, Model Context Protocol (MCP) & MLOps",
      hours: "12–20h/semana",
      color: "from-rose-500/20 to-purple-500/10 border-rose-500/40 text-rose-300",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      desc: "La vanguardia absoluta de la IA: sistemas que razonan, usan herramientas externas, se comunican entre sí y corren en servidores de producción.",
      modules: [
        {
          title: "Agentes Autónomos & Frameworks Modernos",
          items: [
            "Patrones de razonamiento agéntico: ReAct (Reasoning + Acting), Reflexion y Plan-and-Solve.",
            "Tool Calling (Function Calling): permitir al modelo ejecutar APIs, consultar SQL y ejecutar código Python en entornos aislados.",
            "Model Context Protocol (MCP): el nuevo estándar de la industria para conectar agentes con bases de datos, herramientas locales y servicios web.",
            "Frameworks: LangGraph (agentes con estado basados en grafos cíclicos), CrewAI y AutoGen para equipos de multi-agentes colaborativos.",
          ],
          tip: "Los mejores agentes no son los que intentan hacer todo en un solo prompt, sino los que siguen un grafo de estados finitos con validaciones intermedias.",
        },
        {
          title: "MLOps, Inferencia Rápida & Despliegue en Servidores",
          items: [
            "Servidores de inferencia de alto rendimiento: vLLM (con PagedAttention para reducir memoria de KV-Cache), Ollama y TGI.",
            "Cuantización de pesos para producción: formatos GGUF, AWQ y GPTQ.",
            "Evaluación de calidad de LLMs y RAG con frameworks automáticos (Ragas, TruLens).",
            "Monitoreo de latencia, coste por token, guardrails de seguridad (NeMo Guardrails) y prevención de Prompt Injection.",
          ],
          tip: "vLLM permite atender hasta 10 veces más usuarios concurrentes en la misma tarjeta gráfica gracias a su gestión dinámica de memoria PagedAttention.",
        },
      ],
    },
  ];

  const mathFoundations = [
    {
      name: "Álgebra Lineal",
      why: "¿Por qué importa?",
      desc: "Todo en IA es una matriz o un vector: las imágenes son tensores de píxeles, las palabras son vectores de embeddings de 1536 dimensiones y los pesos de una red neuronal son matrices de conexiones.",
      keyConcepts: ["Multiplicación de matrices", "Producto escalar (dot product)", "Transpuesta & Inversa", "Espacios vectoriales"],
    },
    {
      name: "Cálculo & Gradientes",
      why: "¿Por qué importa?",
      desc: "Es el motor que permite a la red 'aprender'. Si la red comete un error, el cálculo nos dice exactamente cuánto debe subir o bajar cada uno de los millones de pesos para reducir el error.",
      keyConcepts: ["Derivadas parciales", "Regla de la cadena", "Vector gradiente (∇f)", "Superficies de coste"],
    },
    {
      name: "Probabilidad & Estadística",
      why: "¿Por qué importa?",
      desc: "La IA no predice certezas absolutas, predice probabilidades. Un clasificador te dice 'hay un 94% de probabilidad de que esto sea un tumor benigno'.",
      keyConcepts: ["Teorema de Bayes", "Distribución normal", "Entropía & Divergencia KL", "Inferencia estadística"],
    },
    {
      name: "Optimización Numérica",
      why: "¿Por qué importa?",
      desc: "Buscar los mejores parámetros de un modelo es como bajar de una montaña en la niebla: el algoritmo da pequeños pasos en la dirección donde el terreno desciende más rápido.",
      keyConcepts: ["SGD con Momentum", "Optimizador Adam / AdamW", "Tasa de aprendizaje (Learning Rate)", "Mínimos locales"],
    },
  ];

  const progressiveProjects = [
    {
      title: "1. Predictor de Precios de Viviendas con Pipeline Scikit-Learn",
      diff: "Nivel Inicial - Semanas 4 a 6",
      stack: "Python + Pandas + Scikit-Learn + Matplotlib",
      description:
        "Crea un pipeline completo que reciba datos crudos con valores nulos y categorías de texto, los preprocese automáticamente y entrene un modelo de regresión (Random Forest / XGBoost) evaluando con RMSE y R2.",
      learnings: "Limpieza de datos, prevención de data leakage, ingeniería de características e interpretación de importancias de variables.",
    },
    {
      title: "2. Clasificador de Imágenes con PyTorch & Transfer Learning",
      diff: "Intermedio - Semanas 14 a 18",
      stack: "PyTorch + torchvision (ResNet-50 / EfficientNet) + CUDA",
      description:
        "Entrena una red neuronal para clasificar imágenes médicas (ej. detección de neumonía en radiografías de tórax) o plantas enfermas. Usa técnicas de aumento de datos (Data Augmentation) para evitar sobreajuste.",
      learnings: "Carga eficiente con DataLoader, funciones de pérdida para clases desbalanceadas y visualización con Grad-CAM.",
    },
    {
      title: "3. Generador de Caracteres GPT Mini desde Cero",
      diff: "Intermedio / Avanzado - Semanas 22 a 26",
      stack: "PyTorch puro (sin librerías de alto nivel)",
      description:
        "Programa una arquitectura Transformer Decoder completa (Multi-Head Attention, Feed-Forward, LayerNorm) desde cero en unas 250 líneas de código y entrénala para escribir como Shakespeare o como un autor elegido.",
      learnings: "Entendimiento a bajo nivel de máscaras causales de atención, matrices de proyección QKV y cálculo de perplejidad.",
    },
    {
      title: "4. Asistente RAG Multi-Documental para Manuales o Contratos",
      diff: "Avanzado - Semanas 32 a 36",
      stack: "LangChain / LlamaIndex + Qdrant / ChromaDB + OpenAI / Claude API",
      description:
        "Sube PDFs de 500 páginas (manuales técnicos, leyes o libros). El sistema divide inteligentemente el texto, crea embeddings, busca por similitud semántica y responde citando el número exacto de página y párrafo de donde obtuvo la información.",
      learnings: "Chunking recursivo, almacenamiento vectorial, inyección de contexto y mitigación de alucinaciones con fuentes verificables.",
    },
    {
      title: "5. Fine-Tuning de Modelo Abierto (Llama-3 / Mistral) con QLoRA",
      diff: "Avanzado - Semanas 38 a 42",
      stack: "Hugging Face TRL + PEFT + BitsAndBytes + Google Colab / GPU local",
      description:
        "Toma un modelo de código abierto (Llama 3 8B) y afínalo con un dataset personalizado de instrucciones en español para que hable con un estilo específico, genere código en un framework propietario o responda como un experto legal.",
      learnings: "Cuantización a 4 bits (NF4), configuración de matrices LoRA (r=16, alpha=32) y evaluación comparativa antes y después.",
    },
    {
      title: "6. Agente Autónomo Investigador con Tool Calling & MCP",
      diff: "Avanzado / Pro - Semanas 44 a 48",
      stack: "LangGraph + Model Context Protocol (MCP) + APIs de Búsqueda Web",
      description:
        "Un agente al que le pides: 'Investiga las últimas 5 noticias de robótica en 2026, compara las fuentes, escribe un informe en Markdown y guárdalo en mi disco duro'. El agente planifica, busca en la web, resume y ejecuta llamadas a herramientas locales.",
      learnings: "Patrón ReAct, ejecución segura de herramientas, manejo de errores de APIs y arquitectura de grafos con estado persistente.",
    },
    {
      title: "7. Servidor de Inferencia Ultra Rápido con vLLM & Docker",
      diff: "Nivel Pro / MLOps - Semanas 49 a 50",
      stack: "vLLM + Docker + FastAPI + NGINX + Prometheus",
      description:
        "Empaqueta un modelo de IA en un contenedor Docker, configúralo con vLLM para soportar procesamiento por lotes continuo (Continuous Batching) y exponlo como una API compatible con OpenAI para que cualquier frontend pueda conectarse.",
      learnings: "Optimización de memoria GPU, métricas de tokens por segundo, time-to-first-token (TTFT) y orquestación con Docker.",
    },
    {
      title: "8. Sistema Multi-Agente de Soporte & Operaciones Autónomas",
      diff: "Nivel Experto - Semanas 51 a 52+",
      stack: "CrewAI / LangGraph + Vector DB + Base de datos PostgreSQL + WebSockets",
      description:
        "Un equipo de 3 agentes colaborativos: un Agente de Recepción que clasifica el ticket del cliente, un Agente Técnico que busca soluciones en la base de conocimientos RAG, y un Agente Supervisor que valida la respuesta antes de enviarla.",
      learnings: "Diseño de arquitecturas multi-agente, protocolos de comunicación entre IAs, human-in-the-loop y auditoría de decisiones.",
    },
  ];

  const milestones = [
    { id: "ai_m1", label: "Realicé transformaciones de datos vectorizadas con NumPy y Pandas sin usar bucles for" },
    { id: "ai_m2", label: "Entendí visualmente cómo el Descenso de Gradiente actualiza los pesos de una función" },
    { id: "ai_m3", label: "Entrené y evalué un modelo Random Forest y XGBoost con métricas de Precisión, Recall y F1" },
    { id: "ai_m4", label: "Construí un clasificador con PyTorch creando mi propia clase nn.Module y ciclo de entrenamiento" },
    { id: "ai_m5", label: "Apliqué Transfer Learning con una red convolucional ResNet para clasificar imágenes personalizadas" },
    { id: "ai_m6", label: "Comprendí matemáticamente el mecanismo de atención Q*K^T/√d y la arquitectura Transformer" },
    { id: "ai_m7", label: "Implementé un pipeline RAG con base de datos vectorial (Chroma/Qdrant) para consultar documentos propios" },
    { id: "ai_m8", label: "Realicé Fine-Tuning con LoRA/QLoRA a un modelo de lenguaje abierto (Llama o Mistral)" },
    { id: "ai_m9", label: "Construí un Agente Autónomo usando LangGraph o CrewAI con llamadas a herramientas (Tool Calling)" },
    { id: "ai_m10", label: "Conecté un agente de IA a fuentes externas usando el estándar Model Context Protocol (MCP)" },
    { id: "ai_m11", label: "Desplegué un modelo de lenguaje en producción usando vLLM u Ollama con inferencia optimizada" },
    { id: "ai_m12", label: "Implementé guardrails y métricas de evaluación automática de respuestas (Ragas / TruLens)" },
  ];

  const completedCount = Object.values(completedMilestones).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="w-full space-y-8 text-white">
      {/* Hero Header */}
      <div className="p-6 sm:p-10 rounded-3xl bg-linear-to-br from-fuchsia-950/40 via-purple-950/30 to-black/60 border border-fuchsia-500/30 backdrop-blur-xl shadow-[0_10px_40px_rgba(217,70,239,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-semibold tracking-wider uppercase">
            <BrainCircuit className="w-3.5 h-3.5 text-fuchsia-400" />
            Inteligencia Artificial de Vanguardia
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-white">
            Roadmap Completo de{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-fuchsia-300 via-pink-300 to-purple-200">
              Inteligencia Artificial & LLMs
            </span>
          </h2>
          <p className="text-sm sm:text-base text-fuchsia-100/80 leading-relaxed">
            De cero a creador de sistemas inteligentes: aprende matemáticas aplicadas, **Machine Learning**, **Deep Learning con PyTorch**, arquitectura **Transformer**, sistemas **RAG**, fine-tuning con **LoRA** y **Agentes Autónomos con MCP**.
          </p>
        </div>

        {/* Progress bar preview */}
        <div className="mt-6 pt-5 border-t border-fuchsia-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-fuchsia-300">{progressPercent}%</div>
            <div>
              <p className="text-xs font-semibold text-white">Progreso del Roadmap de IA</p>
              <p className="text-[11px] text-fuchsia-200/60">
                {completedCount} de {milestones.length} hitos completados
              </p>
            </div>
          </div>
          <div className="w-full sm:w-64 h-2.5 bg-black/40 rounded-full overflow-hidden border border-fuchsia-500/30">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-linear-to-r from-fuchsia-500 to-pink-400 rounded-full"
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
                  ? "bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)] font-bold"
                  : "bg-white/5 hover:bg-white/10 text-fuchsia-200/80 hover:text-white border border-fuchsia-500/20"
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
                <Network className="w-5 h-5 text-fuchsia-400" />
                <span>Ruta Estructurada en 6 Fases (52 Semanas)</span>
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
                La secuencia óptima para no perderse en la marea de información y construir bases sólidas de ingeniería en IA.
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
                      ? "bg-white/5 border-fuchsia-500/40 shadow-[0_4px_20px_rgba(217,70,239,0.1)]"
                      : "bg-black/30 border-white/10 hover:border-fuchsia-500/30"
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
                      <span className="text-xs text-fuchsia-300 font-mono">⏱️ {phase.hours}</span>
                      <span className="text-xs text-pink-300 font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20">
                        {phase.level}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white w-full sm:w-auto">
                        {phase.title}
                      </h4>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-fuchsia-400 transition-transform shrink-0 ${
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
                              className="p-4 rounded-xl bg-black/40 border border-fuchsia-500/20 space-y-2.5"
                            >
                              <h5 className="text-sm font-bold text-fuchsia-300 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                                {mod.title}
                              </h5>
                              <ul className="space-y-1.5 text-xs text-white/80">
                                {mod.items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="flex items-start gap-2">
                                    <span className="text-fuchsia-400 text-xs leading-none mt-1">▸</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                              {mod.tip && (
                                <div className="mt-2 p-2.5 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/25 text-[11px] text-fuchsia-200">
                                  <span className="font-bold text-fuchsia-300">💡 Clave Práctica: </span>
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

      {/* SECTION: MATEMÁTICAS CLAVE */}
      {(activeSubTab === "all" || activeSubTab === "matematicas") && (
        <section className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-fuchsia-400" />
              <span>Matemáticas para Inteligencia Artificial (Sin Miedo)</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
              No necesitas una maestría en matemáticas puras. Solo necesitas entender qué representan conceptualmente estos 4 pilares:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mathFoundations.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-fuchsia-500/25 backdrop-blur-md space-y-3"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <h4 className="text-base font-bold text-white font-serif">{pillar.name}</h4>
                  <span className="text-xs font-semibold text-fuchsia-300 bg-fuchsia-500/20 px-2 py-0.5 rounded-full border border-fuchsia-500/30">
                    {pillar.why}
                  </span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">{pillar.desc}</p>
                <div className="pt-2">
                  <span className="text-xs font-semibold text-fuchsia-400">Conceptos imprescindibles:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {pillar.keyConcepts.map((kc, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-lg bg-black/40 border border-white/10 text-purple-200/90"
                      >
                        {kc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: GENAI & LLMs */}
      {(activeSubTab === "all" || activeSubTab === "genai_llms") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-linear-to-b from-purple-950/40 via-fuchsia-950/20 to-black/60 border border-fuchsia-500/30 backdrop-blur-xl space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <BrainCircuit className="w-3.5 h-3.5" />
              La Revolución de la IA Generativa
            </div>
            <h3 className="text-xl sm:text-3xl font-bold font-serif text-white">
              Arquitectura Transformer, Embeddings & RAG
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 mt-1 max-w-2xl">
              ¿Por qué los LLMs son tan poderosos y cómo evitamos que inventen respuestas (alucinaciones)?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-fuchsia-500/20 space-y-2">
              <div className="text-fuchsia-400 font-bold text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Mecanismo de Atención (Q, K, V)
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Cada palabra calcula qué tanta relación tiene con las demás palabras de la oración. En &ldquo;El perro cruzó la calle porque estaba asustado&rdquo;, el modelo sabe matemáticamente que &ldquo;estaba asustado&rdquo; se refiere al perro y no a la calle.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-fuchsia-500/20 space-y-2">
              <div className="text-fuchsia-400 font-bold text-sm flex items-center gap-1.5">
                <Database className="w-4 h-4" /> Embeddings & Bases Vectoriales
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Transforman ideas en coordenadas espaciales. En un espacio de embeddings, el vector de &ldquo;Reina&rdquo; está a la misma distancia de &ldquo;Rey&rdquo; que &ldquo;Mujer&rdquo; de &ldquo;Hombre&rdquo;. Permite búsquedas por significado en vez de palabras clave exactas.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-fuchsia-500/20 space-y-2">
              <div className="text-fuchsia-400 font-bold text-sm flex items-center gap-1.5">
                <Search className="w-4 h-4" /> Arquitectura RAG
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Es como darle un examen a libro abierto a la IA: antes de responderte, busca en tu base de datos interna los 3 párrafos más relevantes, se los pasa al LLM como contexto y genera una respuesta 100% fundamentada con citas verificables.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-fuchsia-500/30 space-y-2 font-mono text-xs">
            <div className="text-fuchsia-300 font-semibold flex items-center gap-2">
              <span>🐍 Ejemplo Mínimo de un Pipeline RAG en Python</span>
            </div>
            <pre className="text-white/80 overflow-x-auto p-2 bg-black/40 rounded-xl leading-relaxed text-[11px]">
{`from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import create_retrieval_chain

# 1. Recuperar los fragmentos semánticamente más cercanos
vectorstore = Chroma(persist_directory="./db", embedding_function=OpenAIEmbeddings())
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# 2. Generar respuesta fundamentada con el LLM
llm = ChatOpenAI(model="gpt-4o", temperature=0.1)
# El modelo responde citando únicamente los documentos recuperados`}
            </pre>
          </div>
        </section>
      )}

      {/* SECTION: AGENTES & MCP */}
      {(activeSubTab === "all" || activeSubTab === "agentes") && (
        <section className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-fuchsia-400" />
              <span>Agentes Autónomos & Model Context Protocol (MCP)</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
              La transición de modelos pasivos de texto a agentes autónomos que actúan en el mundo real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-white/5 border border-fuchsia-500/25 space-y-3">
              <h4 className="font-bold text-fuchsia-300 text-sm flex items-center gap-2">
                <span>🤖 ¿Qué es un Agente de IA y cómo funciona?</span>
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Un modelo normal solo responde a un prompt. Un **Agente** tiene un ciclo continuo de pensamiento:
              </p>
              <div className="space-y-1.5 text-xs text-white/80 pl-2 border-l-2 border-fuchsia-400">
                <p>1. <strong>Pensar (Thought):</strong> &ldquo;Para responder a esta pregunta necesito consultar el clima actual en Bogotá.&rdquo;</p>
                <p>2. <strong>Actuar (Action):</strong> Ejecuta una llamada a la API externa `get_weather(&quot;Bogotá&quot;)`. </p>
                <p>3. <strong>Observar (Observation):</strong> Recibe el JSON <code>&#123; temp: 18, condition: &quot;Nublado&quot; &#125;</code>.</p>
                <p>4. <strong>Evaluar:</strong> Decide si ya tiene suficiente información o si necesita realizar otra acción antes de responder al usuario.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-fuchsia-500/25 space-y-3">
              <h4 className="font-bold text-fuchsia-300 text-sm flex items-center gap-2">
                <span>🔌 El Estándar MCP (Model Context Protocol)</span>
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Antes de MCP, si querías que un modelo interactuara con GitHub, Slack o tu base de datos PostgreSQL, tenías que escribir un conector propietario diferente para cada uno.
              </p>
              <p className="text-xs text-white/80 leading-relaxed">
                **MCP es el USB-C de la Inteligencia Artificial:** un protocolo universal abierto donde cualquier agente puede conectarse a cualquier servidor MCP para leer recursos, ejecutar herramientas y manipular archivos de forma segura y estandarizada.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: 8 PROYECTOS PRÁCTICOS */}
      {(activeSubTab === "all" || activeSubTab === "proyectos") && (
        <section className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-fuchsia-400" />
              <span>8 Proyectos de Portafolio para Destacar</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
              Las empresas ya no contratan por certificados teóricos; contratan por repositorios de GitHub con código funcional y desplegado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progressiveProjects.map((proj, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-fuchsia-500/25 hover:border-fuchsia-500/50 backdrop-blur-md space-y-3 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                    {proj.diff}
                  </span>
                  <h4 className="text-base font-bold text-white font-serif">{proj.title}</h4>
                  <p className="text-xs text-white/80 leading-relaxed">{proj.description}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-fuchsia-400 font-semibold">🛠️ Tecnologías: </span>
                    <span className="text-white/70">{proj.stack}</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-semibold">🎯 Lo que demuestras: </span>
                    <span className="text-white/70">{proj.learnings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: ROLES & SALARIOS */}
      {(activeSubTab === "all" || activeSubTab === "carrera") && (
        <section className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-fuchsia-400" />
              <span>Roles Profesionales en la Industria de la IA</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
              La IA no es una sola profesión. Dependiendo de si te gusta más el software, la investigación matemática o el producto, existen caminos claros.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-fuchsia-500/20 space-y-2">
              <span className="text-xs font-bold text-fuchsia-400">⚡ Rol más demandado en 2026</span>
              <h5 className="font-bold text-white text-sm">AI Engineer (Ingeniero de IA)</h5>
              <p className="text-xs text-white/70 leading-relaxed">
                Integra modelos fundacionales, construye sistemas RAG, agentes con tool calling, evalúa calidad y crea aplicaciones completas conectadas a APIs de IA.
              </p>
              <div className="text-xs font-semibold text-emerald-400 pt-1">
                💰 Salario Promedio: $110,000 – $180,000 USD/año
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-fuchsia-500/20 space-y-2">
              <span className="text-xs font-bold text-fuchsia-400">⚙️ Infraestructura & Servidores</span>
              <h5 className="font-bold text-white text-sm">MLOps Engineer</h5>
              <p className="text-xs text-white/70 leading-relaxed">
                Despliega modelos a gran escala, gestiona clusters de GPUs con Kubernetes, reduce latencia con vLLM/TensorRT y monitorea derivas de datos (drift).
              </p>
              <div className="text-xs font-semibold text-emerald-400 pt-1">
                💰 Salario Promedio: $120,000 – $195,000 USD/año
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-fuchsia-500/20 space-y-2">
              <span className="text-xs font-bold text-fuchsia-400">📊 Análisis de Negocio</span>
              <h5 className="font-bold text-white text-sm">Data Scientist (Científico de Datos)</h5>
              <p className="text-xs text-white/70 leading-relaxed">
                Experimenta con hipótesis de negocio, crea modelos predictivos tradicionales (XGBoost), pruebas A/B y extrae insights de negocio a partir de datos masivos.
              </p>
              <div className="text-xs font-semibold text-emerald-400 pt-1">
                💰 Salario Promedio: $95,000 – $155,000 USD/año
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-fuchsia-500/20 space-y-2">
              <span className="text-xs font-bold text-fuchsia-400">🔬 Investigación Pura</span>
              <h5 className="font-bold text-white text-sm">AI Research Scientist</h5>
              <p className="text-xs text-white/70 leading-relaxed">
                Diseña nuevas arquitecturas neuronales, publica papers en conferencias (NeurIPS, ICML) y entrena modelos fundacionales desde cero (generalmente requiere doctorado o experiencia top).
              </p>
              <div className="text-xs font-semibold text-emerald-400 pt-1">
                💰 Salario Promedio: $160,000 – $350,000+ USD/año
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-fuchsia-500/20 space-y-2">
              <span className="text-xs font-bold text-fuchsia-400">👁️ Visión & Multimedia</span>
              <h5 className="font-bold text-white text-sm">Computer Vision Engineer</h5>
              <p className="text-xs text-white/70 leading-relaxed">
                Especialista en modelos de imagen, video y multimodalidad (YOLO, Segment Anything, Difusión Stable Diffusion para generación visual y vehículos autónomos).
              </p>
              <div className="text-xs font-semibold text-emerald-400 pt-1">
                💰 Salario Promedio: $115,000 – $175,000 USD/año
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-fuchsia-500/20 space-y-2">
              <span className="text-xs font-bold text-fuchsia-400">🛡️ Seguridad & Red Teaming</span>
              <h5 className="font-bold text-white text-sm">AI Safety & Security Specialist</h5>
              <p className="text-xs text-white/70 leading-relaxed">
                Prueba ataques de jailbreak a LLMs, inyección indirecta de prompts en sistemas RAG y asegura que los agentes no ejecuten acciones peligrosas en sistemas reales.
              </p>
              <div className="text-xs font-semibold text-emerald-400 pt-1">
                💰 Salario Promedio: $125,000 – $190,000 USD/año
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: PREGUNTAS FRECUENTES */}
      {(activeSubTab === "all" || activeSubTab === "preguntas") && (
        <section className="space-y-4">
          <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-fuchsia-400" />
            <span>Preguntas Frecuentes sobre Aprender IA</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-white/5 border border-fuchsia-500/20 space-y-1.5">
              <h5 className="font-bold text-fuchsia-300">¿Necesito una tarjeta gráfica cara para aprender IA?</h5>
              <p className="text-white/80 leading-relaxed">
                No al inicio. Plataformas gratuitas como **Google Colab** y **Kaggle** te proporcionan GPUs potentes (NVIDIA T4 y A100) en la nube de forma 100% gratuita para entrenar modelos. Para el 90% de los proyectos de AI Engineer que usan APIs de LLMs y bases de datos vectoriales, cualquier computador moderno es suficiente.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-fuchsia-500/20 space-y-1.5">
              <h5 className="font-bold text-fuchsia-300">¿Debo aprender primero Machine Learning clásico antes de LLMs?</h5>
              <p className="text-white/80 leading-relaxed">
                ¡Sí, totalmente recomendado! Quien solo aprende a llamar APIs de LLMs no entiende conceptos fundamentales como sobreajuste (overfitting), embeddings, matrices de confusión ni regularización. Pasar unas semanas con Scikit-Learn te convierte en un ingeniero con criterio real y no solo en un consumidor de APIs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-fuchsia-500/20 space-y-1.5">
              <h5 className="font-bold text-fuchsia-300">¿Qué diferencia hay entre PyTorch y TensorFlow?</h5>
              <p className="text-white/80 leading-relaxed">
                PyTorch ganó la batalla de la industria y la investigación. Más del 85% de los papers publicados en las mejores conferencias de IA y los repositorios de Hugging Face están escritos en **PyTorch**. Enfoca el 100% de tu energía en PyTorch.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: TRACKER DE HITOS */}
      {(activeSubTab === "all" || activeSubTab === "hitos") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-fuchsia-500/30 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-fuchsia-400" />
                <span>Tracker de Hitos & Dominio de IA</span>
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
                Marca tus logros a medida que avances. Tu progreso se guarda automáticamente en este dispositivo.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-fuchsia-300">{completedCount} / {milestones.length}</span>
              <p className="text-[11px] text-fuchsia-200/60 font-semibold">{progressPercent}% Completado</p>
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
                      ? "bg-fuchsia-500/15 border-fuchsia-500/40 text-fuchsia-200"
                      : "bg-black/30 border-white/10 hover:border-fuchsia-500/30 text-white/70"
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-fuchsia-400" />
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
