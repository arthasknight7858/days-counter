# 💖 Axel & Sofía ✨ Nuestra Historia

Un espacio web interactivo, elegante y moderno diseñado especialmente para compartir recuerdos, canciones, cartas de amor, metas de estudio y rutinas de bienestar.

---

## 🌟 Características Principales

### 1. 🎵 Reproductor de Música Premium
- **39 Canciones Especiales** con carátulas personalizadas y animación de disco de vinilo giratorio.
- **Media Session API**: Integración completa con el sistema operativo (Windows, macOS, Android/iOS) y auriculares Bluetooth para controlar la reproducción (*play/pausa, siguiente, anterior, seek*).
- **Atajos de Teclado Globales**:
  - <kbd>Espacio</kbd>: Play / Pausa
  - <kbd>M</kbd>: Silenciar / Activar audio
  - <kbd>Shift</kbd> + <kbd>→</kbd>: Siguiente canción
  - <kbd>Shift</kbd> + <kbd>←</kbd>: Canción anterior
- **Mini Reproductor Flotante**: Sigue reproduciendo y controlando la música mientras navegas por cualquiera de las otras secciones.
- **Buscador en Playlist**: Filtra canciones al instante.

### 2. ⏳ Contador de Amor & Mesarios
- Contador en tiempo real de días, horas, minutos y segundos desde el **8 de Julio de 2026**.
- Estadísticas románticas: Meses cumplidos, horas compartidas, latidos estimados y días restantes para el próximo mesario.
- **Detección Especial de Mesario**: Notificación festiva animada cuando es el día 8 de cada mes.

### 3. 🖼️ Álbumes de Fotos & Visor Lightbox
- 8 Álbumes organizados (*Juntos, Sofi, Axel, Kukiss, Jacobo, Momentos Especiales, Anime, Tu fiesta de XV*).
- Visor Lightbox a pantalla completa con navegación por teclado (<kbd>←</kbd> / <kbd>→</kbd> / <kbd>Esc</kbd>), soporte táctil (*swipe* en móviles), descarga de fotos y **modo presentación automática**.

### 4. 💌 Tablón Interactivo de Notas & Fotos
- Creación de notas con paletas de colores (Lavanda, Rosa, Miel, Menta, Cielo, Cereza, Medianoche), stickers y fotos adjuntas.
- **Compresión de imágenes automática** en cliente mediante HTML5 Canvas para optimizar el almacenamiento local (*localStorage*).
- **💡 Plantillas Rápidas**: Autocompletado con un solo toque (*"Cartita de Amor"*, *"Meta Juntos"*, *"Idea para Cita"*, *"Recuerdo Bonito"*, *"Recordatorio Dulce"*).
- **💖 Reacciones con Amor**: Botón interactivo de corazón en cada nota.
- **🎛️ Ordenación y Filtros**: Por categorías, fijadas primero, más recientes, más antiguas o solo con fotos.
- **Copia de Seguridad**: Exportación e importación de notas en formato JSON.

### 5. 📚 Espacio Educativo (18 Hojas de Ruta & Guías)
Módulos interactivos completos con temarios, check-lists de progreso, recursos y canales recomendados:
- 🇬🇧 **Inglés** (A1 a B2, pronunciación y recursos)
- 🇰🇷 **Coreano** (Hangul, gramática y vocabulario)
- 🇫🇷 **Francés** (Fonética, frases clave y gramática)
- 🏛️ **Arquitectura** (Planos, diseño espacial, historia y software)
- 🇨🇴 **ICFES Saber 11°** (Simulacro interactivo y cuadernillos de preguntas oficiales)
- 🪙 **Cripto & Trading** (Velas japonesas, gestión de riesgo y análisis técnico)
- 💻 **Full Stack & Sistemas**, 🛡️ **Ciberseguridad**, 📊 **Economía & Finanzas**, 📢 **Marketing**, 📐 **Matemáticas**, 🩺 **Medicina**, 🧠 **Pensamiento Crítico**, 🎙️ **Oratoria**, 💼 **Ventas**, 🎙️ **Comunicación Social**, 🧠 **Hábitos & Productividad** y 🏛️ **Administración Empresarial**.

### 6. ⚡ Rutinas de Ejercicio & Bienestar
- **Cronómetro / HIIT Timer** con selector de presets y **sonido armónico Web Audio** al finalizar.
- Rutinas divididas por objetivos: Cardio Dance, Full Body, Cintura, Abdomen Plano, Brazos/Espalda, Piernas/Glúteos, Estiramientos y Nutrición.
- **Tracker Diario de Hábitos** que se reinicia cada día automáticamente.

### 7. 🎬 A tener en cuenta
- Sección para compartir videos especiales de YouTube y reflexiones con firmas de amor.

---

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) con Turbopack
- **Librería de UI**: [React 19](https://react.dev/)
- **Estilos**: [TailwindCSS v4](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Fechas**: [date-fns](https://date-fns.org/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)

---

## 📁 Estructura del Proyecto

```
├── public/
│   ├── assets/        # Álbumes de fotos organizados por carpeta
│   ├── docs/          # Cuadernillos oficiales del ICFES
│   └── music/         # Canciones en audio (.mp3, .m4a) y carátulas
├── src/
│   ├── app/
│   │   ├── globals.css  # Tema oscuro, animaciones GPU y scrollbar personalizado
│   │   ├── layout.tsx   # Metadatos, fuentes Geist y configuración Viewport
│   │   └── page.tsx     # Página principal con pestañas y code-splitting dinámico
│   ├── components/
│   │   ├── AboutSofi.tsx           # Tarjetas informativas sobre Sofía
│   │   ├── Albums.tsx              # Galería de fotos con lightbox y slideshow
│   │   ├── BackgroundEffects.tsx   # Partículas y orbes con aceleración GPU
│   │   ├── BackToTop.tsx           # Botón volver arriba con indicador circular de scroll
│   │   ├── Counter.tsx             # Contador de aniversario y estadísticas de amor
│   │   ├── EducationalSection.tsx  # Centro de módulos de aprendizaje
│   │   ├── ExerciseSection.tsx     # Tracker de fitness y temporizador HIIT
│   │   ├── FloatingMiniPlayer.tsx  # Mini reproductor flotante persistente
│   │   ├── KeepInMindSection.tsx   # Videos y notas importantes
│   │   ├── LettersAccordion.tsx    # Cartas mensuales
│   │   ├── MusicPlayer.tsx         # Reproductor de música principal
│   │   ├── NotesSection.tsx        # Tablón interactivo de notas y fotos
│   │   ├── SectionTabs.tsx         # Barra de navegación por pestañas
│   │   └── educational/            # 19 Hojas de ruta y componentes temáticos
│   ├── context/
│   │   └── MusicContext.tsx        # Contexto global de audio con Media Session API
│   └── lib/
│       └── utils.ts                # Utilidad cn (clsx + tailwind-merge)
└── types.d.ts                      # Tipos globales del proyecto
```

---

## 🚀 Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción (Next.js + Turbopack)
npm run build

# Iniciar servidor de producción
npm run start

# Ejecutar análisis de linter
npm run lint
```
