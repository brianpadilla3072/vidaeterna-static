/**
 * Configuración central del sitio.
 * Modifica este archivo para adaptar la plantilla a una iglesia diferente.
 */

export const siteConfig = {
  // ── Identidad ──────────────────────────────────────────────────────────
  name: 'Epic Church',
  shortName: 'Epic Church',
  description: 'Epic Church — A community of faith in Sayreville, NJ',
  url: 'https://epicchurchintl.org',

  // ── Colores de marca (deben coincidir con @theme en tailwind.css) ───────
  themeColor: '#10375B',
  backgroundColor: '#ffffff',

  // ── Contacto ────────────────────────────────────────────────────────────
  address: {
    street: '100 Main Street',
    city: 'Sayreville',
    state: 'NJ',
    zip: '08872',
    full: '100 Main Street, Sayreville, NJ 08872',
  },
  phone: '(732) 555-0100',
  email: 'info@epicchurchintl.org',

  // ── Redes sociales ──────────────────────────────────────────────────────
  social: {
    facebook: 'https://facebook.com/epicchurchintl',
    instagram: 'https://instagram.com/epicchurchintl',
    youtube: 'https://youtube.com/@epicchurchintl',
    twitter: 'https://twitter.com/epicchurchintl',
  },

  // ── Horarios de servicio ────────────────────────────────────────────────
  serviceTimes: [
    'Sundays at 9:00 AM',
    'Sundays at 11:00 AM',
    'Wednesdays at 7:00 PM',
  ],

  // ── SEO / Open Graph ────────────────────────────────────────────────────
  ogImage:
    'https://www.epicchurchintl.org/images/r/275936823_5602693846427151_3347189066762514707_n/460xg2-26-1364-913/275936823_5602693846427151_3347189066762514707_n.jpg',

  // ── Integración PayPal Donaciones ────────────────────────────────────────
  // Valor leído desde variable de entorno (ver .env.example)
  paypalId: import.meta.env.PUBLIC_PAYPAL_ID ?? '',
} as const;
