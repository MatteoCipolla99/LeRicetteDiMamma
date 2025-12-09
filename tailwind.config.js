// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Importante: Usare 'extend' per aggiungere i nostri colori senza cancellare 'gray', 'red', ecc.
    extend: {
      colors: {
        primary: {
          50: "#fff7ed",
          100: "#ffedd5",
          // ... tutti i colori primary
          500: "#f97316",
          600: "#ea580c",
          // ...
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ['"Playfair Display"', "serif"],
        display: ['"Playfair Display"', "serif"],
      },
      // ... animazioni e keyframes
    },
  },
  plugins: [],
};
