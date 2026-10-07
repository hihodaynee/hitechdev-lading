/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0a0a0a',
          deep: '#050505',
          card: '#121212',
          subtle: '#18181b',
        },
        lime: {
          DEFAULT: '#ccff00',
          50: '#f9ffe5',
          100: '#f2ffcc',
          200: '#e5ff99',
          300: '#d8ff66',
          400: '#ccff00',
          500: '#b0db00',
          600: '#8ba800',
          glow: 'rgba(204, 255, 0, 0.4)',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'lime-glow': '0 0 25px rgba(204, 255, 0, 0.35)',
        'lime-glow-lg': '0 0 45px rgba(204, 255, 0, 0.45)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-glow': 'pulse-glow 2.5s infinite',
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(204, 255, 0, 0.25)',
          },
          '50%': {
            boxShadow: '0 0 35px rgba(204, 255, 0, 0.55)',
          },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};
