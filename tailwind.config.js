import TWSB from 'tailwind-scrollbar';
import daisyui from 'daisyui';
import TWM from 'tailwindcss-motion';
/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./public/**/*.html", "./views/**/*.ejs"],
  theme: {
    extend: {},
  },
  variants: {
    scrollbar: ['rounded'], // Add variants if needed
  },
  daisyui: {
    themes: [
      "winter",
      "dark"
    ],
  },
  plugins: [daisyui, TWM, TWSB],
}