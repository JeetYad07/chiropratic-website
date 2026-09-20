/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#0f172a',
          dark: '#0b1329',
        },
        accent: {
          teal: '#0d9488',
          emerald: '#10b981',
          amber: '#f59e0b',
        },
        neutral: {
          surface: '#fafafa',
          card: '#ffffff',
          darkText: '#0f172a',
          mutedText: '#475569',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.06)',
        'glow': '0 0 25px -5px rgba(2, 132, 199, 0.25)',
        'card-hover': '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
