import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/index.html", "./src/**/*.{js,html}"],
  theme: {
    extend: {},
  },
  plugins: [forms],
};
