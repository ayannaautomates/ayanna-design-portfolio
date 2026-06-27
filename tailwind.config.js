/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A0E14",
          light: "#111822",
          deep: "#060910",
        },
        cyan: {
          DEFAULT: "#7DF9FF",
          dim: "#7DF9FF80",
        },
        violet: {
          DEFAULT: "#9D4EFF",
          dim: "#9D4EFF80",
        },
        pink: {
          DEFAULT: "#FF6EC7",
          dim: "#FF6EC780",
        },
        ghost: {
          DEFAULT: "#EEF2F6",
          muted: "#8B93A3",
          dim: "#5A6270",
        },
      },
      fontFamily: {
        display: ["var(--font-audiowide)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        hud: "0.18em",
        wide: "0.12em",
      },
      borderRadius: {
        none: "0",
      },
      boxShadow: {
        "neon-cyan": "0 0 12px #7DF9FF50, 0 0 24px #7DF9FF25",
        "neon-violet": "0 0 12px #9D4EFF50, 0 0 24px #9D4EFF25",
        "neon-pink": "0 0 12px #FF6EC750, 0 0 24px #FF6EC725",
        "neon-cyan-sm": "0 0 6px #7DF9FF40",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
