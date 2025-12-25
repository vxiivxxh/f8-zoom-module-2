/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yt: {
          black: '#030303',
          base: '#030303',
          sidebar: '#030303',
          player: '#212121',
          hover: '#2a2a2a',
          text: {
            primary: '#FFFFFF',
            secondary: '#AAAAAA',
            muted: '#717171',
          },
          red: '#FF0000',
        }
      },
      spacing: {
        'header': '64px',
        'player': '72px',
        'sidebar': '240px',
      },
      zIndex: {
        'header': '20',
        'sidebar': '10',
        'player': '30',
        'modal': '50',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['"YouTube Sans"', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
