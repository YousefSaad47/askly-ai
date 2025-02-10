import type { Config } from 'tailwindcss';

const { heroui } = require('@heroui/theme');

import daisyui from 'daisyui';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/components/(button|input|spinner|alert|snippet|navbar|modal|user|skeleton|card|checkbox|divider|dropdown|accordion).js',
  ],
  theme: {
    extend: {
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  daisyui: {
    base: false,
  },
  plugins: [require('tailwindcss-animate'), heroui({}), daisyui],
} satisfies Config;
