/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        "dune-alive": "#936b79",
        "dune-dead": "#85616d",
      },
      fontFamily: {
        varela: ["Varela Round", "sans-serif"],
      },
    },
  },
  plugins: [],
}

