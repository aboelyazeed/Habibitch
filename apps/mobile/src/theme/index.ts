// Habibi Stream — Mobile Theme (matches web design system)
export const COLORS = {
  // Backgrounds
  bgPrimary: "#09090b",
  bgSecondary: "#121217",
  bgCard: "#181824",
  bgCardHover: "#20202e",
  bgElevated: "#1c1c2a",
  bgInput: "#1e1e2d",
  bgOverlay: "rgba(9, 9, 11, 0.85)",

  // Accent
  primary: "#9d4edd",
  primaryLight: "#c77dff",
  primaryDark: "#7b2cbf",
  primaryGlow: "rgba(157, 78, 221, 0.3)",
  secondary: "#00bfa6",
  secondaryLight: "#34d399",
  accentGold: "#fbbf24",
  accentGoldLight: "#fcd34d",

  // Status
  live: "#ff4757",
  liveGlow: "rgba(255, 71, 87, 0.3)",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",

  // Text
  textPrimary: "#ffffff",
  textSecondary: "#a1a1b5",
  textMuted: "#6b6b80",
  textDisabled: "#4a4a5c",

  // Border
  border: "#2a2a3c",
  borderLight: "#3a3a4c",
  borderFocus: "#a855f7",

  // Misc
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 64,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  full: 9999,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
};

export const FONT_WEIGHTS = {
  light: "300" as const,
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extrabold: "800" as const,
};

export const SHADOWS = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  glow: {
    shadowColor: "#9d4edd",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
};
