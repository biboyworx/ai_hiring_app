/**
 * NexHire Design System Tokens
 * Centralized theme constants for consistent styling across the app.
 * Always reference these tokens instead of hardcoding values.
 */

export const Colors = {
  primary: "#024466",
  primaryLight: "#035A85",
  primaryDark: "#013350",
  secondary: "#0487C9",
  secondaryLight: "#35A3DB",
  secondaryDark: "#036BA0",
  accent: "#F47A33",
  accentLight: "#F79A63",
  accentDark: "#D4611F",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  muted: "#94A3B8",
  border: "#E2E8F0",
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
  text: {
    primary: "#0F172A",
    secondary: "#475569",
    muted: "#94A3B8",
    inverse: "#FFFFFF",
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
} as const;

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 9999,
} as const;

export const Typography = {
  h1: { fontSize: 30, fontWeight: "700" as const },
  h2: { fontSize: 24, fontWeight: "600" as const },
  h3: { fontSize: 20, fontWeight: "500" as const },
  body: { fontSize: 16, fontWeight: "400" as const },
  bodySmall: { fontSize: 14, fontWeight: "400" as const },
  caption: { fontSize: 12, fontWeight: "400" as const },
  button: { fontSize: 16, fontWeight: "600" as const },
  label: { fontSize: 14, fontWeight: "500" as const },
} as const;

export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
} as const;
