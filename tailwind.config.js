/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'kip-black': '#000000',
        'kip-dark': '#0a0a0a',
        'kip-gray': '#1a1a1a',
        'kip-green': '#00ff66',
        'kip-green-dark': '#00cc33',
        'kip-green-glow': '#00ff6633',
        'portal-green': '#5cff32',
        'portal-green-dark': '#39c15b',
        'portal-green-glow': '#5cff3233',
        'portal-pink': '#ff36ab',
        'portal-pink-dark': '#c61884',
        'portal-pink-glow': '#ff36ab33',
        'rick-dark': '#1d111f',
        'rick-purple': '#361052',
        'rick-panel': '#220833',
        'morty-yellow': '#f3df3a',
        'alien-blue': '#36d6ff',
      },
      fontFamily: {
        mono: ['var(--font-space-mono)', 'monospace'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 5px rgba(0, 255, 102, 1), 0 0 20px rgba(0, 255, 102, 0.2)',
        'portal': '0 0 10px rgba(92, 255, 50, 1), 0 0 30px rgba(92, 255, 50, 0.3)',
        'portal-inner': 'inset 0 0 8px rgba(92, 255, 50, 0.7)',
        'portal-pink': '0 0 10px rgba(255, 54, 171, 1), 0 0 30px rgba(255, 54, 171, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'portal-float': 'portalFloat 8s ease-in-out infinite',
        'portal-spin': 'portalSpin 8s linear infinite',
        'portal-pulse': 'portalPulse 3s ease-in-out infinite',
        'portal-glitch': 'glitch 0.3s ease infinite',
      },
      keyframes: {
        portalFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        portalSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        portalPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
      },
      backgroundImage: {
        'portal-gradient': 'radial-gradient(circle, rgba(92, 255, 50, 0.8), rgba(255, 54, 171, 0.3))',
        'portal-grid': 'linear-gradient(to right, rgba(54, 16, 82, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(54, 16, 82, 0.3) 1px, transparent 1px)',
      },
      cursor: {
        'portal-gun': 'url("/portal-gun-cursor.png"), pointer',
      },
    },
  },
  plugins: [],
} 