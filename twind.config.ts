import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      colors: {
        primary: '#be123c',
        secondary: '#fcd34d',
        warning: '#d97706',
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#e0cec7',
          400: '#fcd34d',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        poppins: ['Poppins'],
        sans: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'monospace']
      }
    },
  }
} as Options;
