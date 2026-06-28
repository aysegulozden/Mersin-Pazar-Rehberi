/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fff8f1",
          100: "#feebd6",
          200: "#fdd3a8",
          300: "#fba96a",
          400: "#f87c34",
          500: "#e85a1e",
          600: "#d44414",
          700: "#b03410",
          800: "#8c2a10",
          900: "#6e2010",
        },
        gold: {
          50:  "#fffbeb",
          100: "#fef3c7",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        ink: {
          DEFAULT: "#2c1810",
          soft:    "#6b4f3a",
          faint:   "#a8876e",
        },
        surface: "#fbf7f0",
        card:    "#ffffff",
      },
      borderRadius: {
        xl:  "14px",
        "2xl": "20px",
        "3xl": "28px",
      },
      boxShadow: {
        soft:   "0 1px 3px rgba(44,24,16,0.06), 0 4px 16px rgba(44,24,16,0.08)",
        lift:   "0 8px 32px rgba(44,24,16,0.14)",
        glow:   "0 0 24px rgba(232,90,30,0.25)",
        card:   "0 2px 8px rgba(44,24,16,0.06), 0 1px 2px rgba(44,24,16,0.04)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      maxWidth: {
        app: "480px",
      },
      backgroundImage: {
        "hero-gradient":   "linear-gradient(135deg, #e85a1e 0%, #c23b0f 50%, #9a2d0a 100%)",
        "gold-gradient":   "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        "card-gradient":   "linear-gradient(160deg, #ffffff 0%, #fff8f4 100%)",
        "surface-pattern": "radial-gradient(circle at 20% 80%, rgba(232,90,30,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245,158,11,0.06) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};
