import type { NextConfig } from "next";

const securityHeaders = [
  // 1. HSTS (Strict-Transport-Security) - Fuerza HTTPS por 2 años incluyendo subdominios y precarga
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // 2. Prevenir detección errónea de tipo MIME (evita ataques XSS vía uploads)
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // 3. Prevenir Clickjacking embebiendo en IFRAME externo
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // 4. Política de Referrer estricta
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // 5. Permisos de Hardware controlados
  {
    key: "Permissions-Policy",
    value: "camera=(self), microphone=(self), geolocation=(), interest-cohort=()",
  },
  // 6. Protección XSS heredada para navegadores más antiguos
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // 7. Aislamiento de ventana (Cross-Origin-Opener-Policy)
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
  // 8. Content Security Policy (CSP) robusta y compatible con Next.js, Supabase y YouTube
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
      "style-src 'self' 'unsafe-inline' https:",
      "img-src 'self' blob: data: https:",
      "font-src 'self' data: https:",
      "connect-src 'self' https: wss: https://*.supabase.co wss://*.supabase.co",
      "media-src 'self' blob: data: https: https://*.supabase.co",
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://youtube.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
