/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Black & Gold Theme
        'luxury-black': '#000000',
        'luxury-gold': '#FFD700',
        'gold-light': '#FFF8DC',
        'gold-dark': '#DAA520',
        'charcoal': '#1C1C1C',
        'dark-gray': '#2D2D2D',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'gold-glow': 'goldGlow 2s ease-in-out infinite alternate',
        'particle-float': 'particleFloat 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        goldGlow: {
          '0%': { boxShadow: '0 0 5px #FFD700' },
          '100%': { boxShadow: '0 0 20px #FFD700, 0 0 30px #FFD700' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #DAA520 100%)',
        'black-gradient': 'linear-gradient(135deg, #000000 0%, #1C1C1C 100%)',
        'luxury-gradient': 'linear-gradient(135deg, #000000 0%, #1C1C1C 50%, #000000 100%)',
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(255, 215, 0, 0.39)',
        'gold-lg': '0 10px 25px -3px rgba(255, 215, 0, 0.5)',
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
