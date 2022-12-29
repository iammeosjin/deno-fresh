import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      colors: {
        primary: '#be123c',
        secondary: '#fcd34d',
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
