/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        advantec: {
          50:  "#eaf4ff",
          100: "#d6e9ff",
          200: "#b0d5ff",
          300: "#84beff",
          400: "#5ca6f2",
          500: "#3c8bda",
          600: "#2c72be",
          700: "#1f5ba1",
          800: "#164883",
          900: "#0f3666"
        },
        ink: {
          900: "#0B1B2B",
          700: "#263241",
          500: "#4b5a6b"
        }
      },
      boxShadow: {
        // <- AQUÍ definimos shadow-card
        card: "0 6px 18px -6px rgba(16,54,102,.25)"
      }
    },
  },
  plugins: [],
}
