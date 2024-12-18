import type { Config } from 'tailwindcss';

const { nextui } = require('@nextui-org/theme');

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/(button|input|spinner|alert|snippet).js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate'), nextui()],
} satisfies Config;
