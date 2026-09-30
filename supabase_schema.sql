-- ==============================================================================
-- 💖 AXEL & SOFÍA — ESQUEMA COMPLETO DE BASE DE DATOS Y STORAGE (SUPABASE)
-- ==============================================================================
-- Ejecuta este script en el SQL Editor de tu panel de Supabase (https://supabase.com).
-- Crea todas las tablas, configura políticas de seguridad abiertas para anon,
-- crea el bucket de almacenamiento público para fotos y audios, e inserta
-- los datos actuales de Axel y Sofía.
-- ==============================================================================

-- 1. TABLA: NOTAS DEL TABLÓN
CREATE TABLE IF NOT EXISTS public.notes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT,
  color TEXT DEFAULT 'purple',
  category TEXT DEFAULT 'amor',
  emoji TEXT DEFAULT '🌟',
  image_url TEXT,
  media_url TEXT,
  media_type TEXT,
  media_name TEXT,
  media_size BIGINT,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_axel_special BOOLEAN DEFAULT FALSE,
  created_at BIGINT NOT NULL,
  reactions INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLA: APODOS
CREATE TABLE IF NOT EXISTS public.nicknames (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  meaning TEXT,
  target TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  hearts INTEGER DEFAULT 1,
  audio_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA: FOTOS FAVORITAS (JSONB para Axel y Sofi)
CREATE TABLE IF NOT EXISTS public.favorites (
  id TEXT PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLA: MENSAJES DE CUMPLEAÑOS
CREATE TABLE IF NOT EXISTS public.birthday_messages (
  id TEXT PRIMARY KEY DEFAULT 'main',
  axel TEXT DEFAULT '',
  sofi TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- POLÍTICAS DE ACCESO (Row Level Security abierto para la clave pública anon)
-- ==============================================================================
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nicknames ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.birthday_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public full access on notes" ON public.notes;
CREATE POLICY "Public full access on notes" ON public.notes FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access on nicknames" ON public.nicknames;
CREATE POLICY "Public full access on nicknames" ON public.nicknames FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access on favorites" ON public.favorites;
CREATE POLICY "Public full access on favorites" ON public.favorites FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access on birthday_messages" ON public.birthday_messages;
CREATE POLICY "Public full access on birthday_messages" ON public.birthday_messages FOR ALL USING (true) WITH CHECK (true);

-- Habilitar Realtime para reflejar cambios instantáneamente (idempotente)
DO $$ 
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.notes;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.nicknames;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.favorites;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.birthday_messages;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END $$;

-- ==============================================================================
-- 5. BUCKET DE ALMACENAMIENTO PARA FOTOS, AUDIOS Y VIDEOS (media_uploads)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('media_uploads', 'media_uploads', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public access to media_uploads" ON storage.objects;
CREATE POLICY "Public access to media_uploads" ON storage.objects
  FOR ALL
  USING (bucket_id = 'media_uploads')
  WITH CHECK (bucket_id = 'media_uploads');

-- ==============================================================================
-- 6. DATOS INICIALES (MIGRACIÓN DE AXEL Y SOFÍA)
-- ==============================================================================

-- Nota inicial de Axel
INSERT INTO public.notes (
  id, title, content, date, color, category, emoji, is_pinned, is_axel_special, created_at, reactions
) VALUES (
  'axel-consejos-inicial',
  'Consejos & Rutas para tu Aprendizaje 🌟',
  'Mi amor, todas las rutas y recursos que están aquí son para ti. Si quieres aprender más cosas o quieres cambios, no dudes en decirme. Mi recomendación es que aprendas inglés y a la par arquitectura dividiéndote el tiempo, y también hagas un poco de ejercicio, a diario si puedes o 3 veces a la semana.

Quiero que no te rindas y le des la oportunidad a todo lo que quieres hacer y lograr mi amor. Cuentas con mi apoyo siempre y te ayudaré en todo lo que te propongas. Aprende el inglés poco a poco; el canal de Inglés con el Güero me pareció bastante bueno para ir iniciando, y cuando ya te vayas acostumbrando al idioma puedes recurrir a mí para practicar escribir y hablar juntos.

Si quieres aún más ayuda usa ChatGPT y Claude para buscar y aprender la información. Los módulos de estudio que te di tienen los temarios, así que ve por cada uno en orden: estúdialo, entiéndelo y continúa con el siguiente. Para los idiomas usa Duolingo.

Para hacer ejercicio son geniales los videos de cardio (20 a 30 min) y abdominales (10 a 20 min).

Recuerda que siempre estaré ahí para ti y escucharte, y te ayudaré en todo lo que necesites y te propongas mi amor. ¡Te amo con toda mi alma! ❤️',
  '22 de Agosto de 2026',
  'amber',
  'amor',
  '🌟',
  true,
  true,
  1724300000000,
  5
) ON CONFLICT (id) DO NOTHING;

-- Apodos iniciales
INSERT INTO public.nicknames (id, text, target, created_at, hearts) VALUES
  ('nick-1790736699816-qdt1k', 'Mi princesa', 'sofi', 1790736699816, 1),
  ('nick-1790736693921-ifqve', 'Mi reina', 'sofi', 1790736693921, 1),
  ('nick-axel-2', 'Mi amor', 'sofi', 1724300010000, 15),
  ('nick-axel-10', 'Mi vida', 'sofi', 1724300090000, 17),
  ('nick-axel-3', 'Mi niña', 'sofi', 1724300020000, 14),
  ('nick-axel-11', 'Mi nalgona', 'sofi', 1724300100000, 21),
  ('nick-axel-4', 'Mi chikis', 'sofi', 1724300030000, 10),
  ('nick-axel-5', 'My little wifey', 'sofi', 1724300040000, 16),
  ('nick-axel-1', 'Amor', 'sofi', 1724300000000, 12),
  ('nick-axel-6', 'Mi bebe', 'sofi', 1724300050000, 10),
  ('nick-axel-7', 'Mi bebesita', 'sofi', 1724300060000, 11),
  ('nick-axel-8', 'Mi cielo', 'sofi', 1724300070000, 13),
  ('nick-axel-9', 'Mi corazon', 'sofi', 1724300080000, 14),
  ('nick-sofi-5', 'Mi vida', 'axel', 1724300040000, 20),
  ('nick-sofi-2', 'Mi amor', 'axel', 1724300010000, 18),
  ('nick-sofi-1', 'Amor', 'axel', 1724300000000, 12),
  ('nick-sofi-3', 'Mi niño', 'axel', 1724300020000, 15),
  ('nick-sofi-4', 'Mi cielo', 'axel', 1724300030000, 13)
ON CONFLICT (id) DO NOTHING;

-- Favoritos actuales
INSERT INTO public.favorites (id, data) VALUES (
  'main',
  '{
    "axel": [
      { "albumId": "sofi", "folder": "Sofi", "image": "sofi40.jpeg", "albumTitle": "Sofi", "addedAt": 1790735317732 },
      { "albumId": "sofi", "folder": "Sofi", "image": "sofi 17.png", "albumTitle": "Sofi", "addedAt": 1790735287171 },
      { "albumId": "sofi", "folder": "Sofi", "image": "sofi28.png", "albumTitle": "Sofi", "addedAt": 1790735283979 },
      { "albumId": "sofi", "folder": "Sofi", "image": "sofi46.jpeg", "albumTitle": "Sofi", "addedAt": 1790735279019 },
      { "albumId": "sofi", "folder": "Sofi", "image": "sofi62.jpeg", "albumTitle": "Sofi", "addedAt": 1790735275195 },
      { "albumId": "sofi", "folder": "Sofi", "image": "sofi70.jpeg", "albumTitle": "Sofi", "addedAt": 1790735266939 },
      { "albumId": "sofi", "folder": "Sofi", "image": "sofi73.jpeg", "albumTitle": "Sofi", "addedAt": 1724300003000 }
    ],
    "sofi": [
      { "albumId": "sofi", "folder": "Sofi", "image": "sofi28.png", "albumTitle": "Sofi", "addedAt": 1790736645287 }
    ]
  }'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Mensajes de cumpleaños
INSERT INTO public.birthday_messages (id, axel, sofi) VALUES (
  'main', '', ''
) ON CONFLICT (id) DO NOTHING;
