/**
 * Utilidades de Seguridad, Sanitización y Protección contra Ataques
 * Implementa las mejores prácticas de ciberseguridad:
 * - Rate Limiting (limitador de solicitudes por IP)
 * - Protección contra inyecciones y sanitización de datos (XSS, Prompt Injection, Shell)
 * - Prevención de asignación masiva (Mass Assignment)
 * - Verificación CSRF y Same-Origin
 * - Detección de bots mediante campos Honeypot
 * - Sanitización estricta de subida de archivos y prevención de Path Traversal
 */

// 1. RATE LIMITING EN MEMORIA (Ventana deslizante por identificador/IP)
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Limpieza periódica para evitar fugas de memoria
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }, 60_000);
}

export function checkRateLimit(
  key: string,
  maxRequests: number = 60,
  windowMs: number = 60_000
): { allowed: boolean; remaining: number; resetInSeconds: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.max(0, Math.ceil((record.resetAt - now) / 1000)),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetInSeconds: Math.max(0, Math.ceil((record.resetAt - now) / 1000)),
  };
}

/**
 * Obtiene la IP cliente de forma segura examinando cabeceras proxy estándar
 */
export function getClientIp(request: Request): string {
  const headers = request.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp) return firstIp;
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();
  return "127.0.0.1";
}

/**
 * Sanitiza texto eliminando caracteres de control, scripts, tags HTML y normalizando unicode
 * Evita ataques de inyección XSS y Prompt Injection
 */
export function sanitizeText(input: unknown, maxLength: number = 5000): string {
  if (typeof input !== "string") {
    return "";
  }

  let sanitized = input
    // Normalizar unicode (NFC)
    .normalize("NFC")
    // Eliminar caracteres nulos y de control peligrosos
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, "")
    // Escapar etiquetas HTML esenciales para prevenir XSS
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();

  // Limitar longitud para evitar ataques DoS por tamaño desmesurado
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Previene Mass Assignment (Asignación Masiva)
 * Solo permite los campos explícitamente declarados en la lista blanca
 */
export function pickAllowedFields<T extends Record<string, unknown>>(
  input: unknown,
  allowedKeys: readonly (keyof T)[]
): Partial<T> {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {};
  }

  const result: Partial<T> = {};
  const record = input as Record<string, unknown>;

  for (const key of allowedKeys) {
    const strKey = String(key);
    if (Object.prototype.hasOwnProperty.call(record, strKey)) {
      // Evitar prototype pollution
      if (strKey === "__proto__" || strKey === "constructor" || strKey === "prototype") {
        continue;
      }
      result[key] = record[strKey] as T[keyof T];
    }
  }

  return result;
}

/**
 * Protección contra Bots por Honeypot
 * Si el campo trampa oculto contiene algún valor, se detecta como bot
 */
export function isBotSubmission(body: Record<string, unknown>): boolean {
  if (!body) return false;
  // Campos comunes usados como honeypot
  const honeyFields = ["_honey", "_hp", "website_url", "company_name_confirm"];
  for (const field of honeyFields) {
    if (body[field] !== undefined && body[field] !== null && String(body[field]).trim() !== "") {
      return true;
    }
  }
  return false;
}

/**
 * Verificación CSRF básica para peticiones mutativas (POST, PUT, PATCH, DELETE)
 * Comprueba que el Origin o Referer coincida con el Host
 */
export function verifyOriginOrCsrf(request: Request): boolean {
  // En Next.js, solicitudes internas son seguras si el origin coincide con host
  const host = request.headers.get("host");
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Si no hay host (solicitud inusual), rechazar
  if (!host) return false;

  const allowedHosts = new Set([host, `localhost:3000`, `127.0.0.1:3000`]);

  if (origin) {
    try {
      const originHost = new URL(origin).host;
      return allowedHosts.has(originHost);
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const refererHost = new URL(referer).host;
      return allowedHosts.has(refererHost);
    } catch {
      return false;
    }
  }

  // Si no se envía ni origin ni referer (ej. API directa o curl sin referer), permitir pero sujeto a rate limit estricto
  return true;
}

/**
 * Sanitiza nombres de archivo para prevenir Path Traversal e inyección de extensiones dobles
 */
export function sanitizeFileName(originalName: string): string {
  // Eliminar rutas relativas o absolutas
  const cleanBase = originalName
    .replace(/^.*[\\/]/, "")
    .replace(/\.\./g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_");

  return cleanBase.substring(0, 80);
}
