import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',      // Mantener breakpoint original (usado en grids)
      'xl': '1280px',
      'header': '1330px',  // Nuevo breakpoint personalizado para header
      '2xl': '1536px',
    },
  },
} satisfies Config
