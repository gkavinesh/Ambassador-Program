/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        loader: 'loader 2s infinite ease-in-out',
      },
      keyframes: {
        loader: {
          '0%, 50%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
