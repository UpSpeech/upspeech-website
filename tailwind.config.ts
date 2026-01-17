import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // Primary fonts (synced with app-frontend)
        heading: ["Outfit", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        accent: ["Bricolage Grotesque", "system-ui", "sans-serif"],
        // Legacy fallback
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Primary color scale (Navy Blue)
        primary: {
          25: "#f5f6fc",
          50: "#eceefb",
          100: "#d9ddf7",
          200: "#b3bbef",
          300: "#8d99e7",
          400: "#6777df",
          DEFAULT: "#293587",
          500: "#293587",
          600: "#242f78",
          700: "#1f2969",
          800: "#1a235a",
          900: "#151d4b",
          950: "#0a0e25",
          foreground: "#FFFFFF",
        },

        // Secondary (Charcoal)
        secondary: {
          DEFAULT: "#4B4E4E",
          foreground: "#FFFFFF",
        },

        // Accent (Lavender)
        accent: {
          DEFAULT: "#98A5FE",
          foreground: "#293587",
        },

        // Semantic colors
        success: {
          DEFAULT: "#10b981",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#f59e0b",
          foreground: "#FFFFFF",
        },
        danger: {
          DEFAULT: "#ef4444",
          foreground: "#FFFFFF",
        },
        info: {
          DEFAULT: "#3b82f6",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#FFFFFF",
        },

        // Therapeutic/Calming colors
        calm: {
          navy: "#293587",
          charcoal: "#4B4E4E",
          lavender: "#98A5FE",
          light: "#F6F6F6",
          sky: "#e0f2fe",
          mint: "#d1fae5",
          peach: "#fef3c7",
          rose: "#fce7f3",
        },

        // Celebration/Achievement colors
        celebrate: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },

        // Warm accent colors
        warm: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
        },

        muted: {
          DEFAULT: "#F6F6F6",
          foreground: "#4B4E4E",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(41, 53, 135, 0.04)",
        sm: "0 2px 4px rgba(41, 53, 135, 0.06)",
        md: "0 4px 12px rgba(41, 53, 135, 0.08)",
        lg: "0 8px 24px rgba(41, 53, 135, 0.12)",
        xl: "0 16px 48px rgba(41, 53, 135, 0.16)",
        "2xl": "0 24px 64px rgba(41, 53, 135, 0.2)",
        glow: "0 0 40px rgba(152, 165, 254, 0.3)",
        "glow-sm": "0 0 20px rgba(152, 165, 254, 0.2)",
        card: "0 2px 8px rgba(41, 53, 135, 0.06), 0 1px 2px rgba(41, 53, 135, 0.04)",
        "card-hover":
          "0 12px 40px rgba(41, 53, 135, 0.12), 0 4px 12px rgba(41, 53, 135, 0.08)",
        button: "0 2px 8px rgba(41, 53, 135, 0.15)",
        "button-hover": "0 4px 16px rgba(41, 53, 135, 0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-up": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "notification-pop": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "notification-pulse": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "success-pop": {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "50%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(152, 165, 254, 0.2)" },
          "100%": { boxShadow: "0 0 40px rgba(152, 165, 254, 0.4)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-gentle": "float-gentle 8s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "slide-up": "slide-up 0.5s cubic-bezier(0, 0, 0.15, 1) forwards",
        "slide-down": "slide-down 0.5s cubic-bezier(0, 0, 0.15, 1) forwards",
        "scale-up": "scale-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "notification-pop": "notification-pop 0.5s ease-out forwards",
        "notification-pulse": "notification-pulse 2s infinite",
        breathe: "breathe 4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "success-pop":
          "success-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        shimmer: "shimmer 2s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      transitionTimingFunction: {
        "in-soft": "cubic-bezier(0.45, 0, 1, 1)",
        "out-soft": "cubic-bezier(0, 0, 0.15, 1)",
        "in-out-soft": "cubic-bezier(0.45, 0, 0.15, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
