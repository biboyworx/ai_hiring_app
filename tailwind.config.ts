import type { Config } from "tailwindcss";

/**
 * Tailwind CSS configuration for NativeWind.
 * Extends the default theme with NexHire brand colors and design tokens.
 */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#024466",
          light: "#035A85",
          dark: "#013350",
        },
        secondary: {
          DEFAULT: "#0487C9",
          light: "#35A3DB",
          dark: "#036BA0",
        },
        accent: {
          DEFAULT: "#F47A33",
          light: "#F79A63",
          dark: "#D4611F",
        },
        background: "#F8FAFC",
        surface: "#FFFFFF",
        muted: "#94A3B8",
        border: "#E2E8F0",
        success: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",
      },
      fontFamily: {
        sans: ["SpaceMono"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        full: "9999px",
      },
    },
  },
  plugins: [],
} satisfies Config;
