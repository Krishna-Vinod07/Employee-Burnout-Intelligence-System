/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {

    extend: {

      colors: {

        primary: '#FF6B00',
        secondary: '#FF8C1A',

        dark: '#050505',
        card: '#121212',

        muted: '#A1A1AA',

        border: 'rgba(255,255,255,0.06)',
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },

      backgroundImage: {

  mainGradient: `
    linear-gradient(
      to bottom right,
      #050505,
      #080808,
      #101010
    )
  `,
},

      boxShadow: {

        neon: `
  0 0 20px rgba(255,120,0,0.06)
`,

        card: `
          0 10px 40px rgba(0,0,0,0.35)
        `,
      },

      animation: {

        float: 'float 6s ease-in-out infinite',

        pulseSlow: 'pulseSlow 2.5s infinite',
      },

      keyframes: {

        float: {

          '0%, 100%': {
            transform: 'translateY(0px)',
          },

          '50%': {
            transform: 'translateY(-8px)',
          },
        },

        pulseSlow: {

          '0%, 100%': {
            opacity: 0.5,
          },

          '50%': {
            opacity: 1,
          },
        },
      },
    },
  },

  plugins: [],
}