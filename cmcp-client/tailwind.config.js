const taiilwind = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
}

export default taiilwind