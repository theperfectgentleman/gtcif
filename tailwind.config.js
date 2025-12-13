module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: 'var(--brand-black)',
          gold: 'var(--brand-gold)',
          green: 'var(--brand-green)',
        },
        primary: '#156082',
        secondary: '#BF4E14',
        accent: '#0F4761',
        background: '#F9FAFB',
      },
      fontFamily: {
        sans: ['Aptos', 'sans-serif'],
        serif: ['Times New Roman', 'serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideIn: 'slideIn 0.5s ease-in-out',
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        kenBurns: 'kenBurns 18s ease-out both',
        floatSlow: 'floatSlow 12s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(18px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate3d(0, 0, 0)' },
          '100%': { transform: 'scale(1.08) translate3d(0, -1.5%, 0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
      },
    },
  },
  plugins: [],
}