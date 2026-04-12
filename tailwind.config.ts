import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // EdgeFabric palette
        cyan:        { DEFAULT: "#00D4FF", dark: "#0099BB" },
        violet:      { DEFAULT: "#7C3AED", dark: "#5B21B6" },
        "ef-green":  { DEFAULT: "#10B981" },
        "ef-red":    { DEFAULT: "#EF4444" },
        "ef-orange": { DEFAULT: "#F97316" },
        "ef-amber":  { DEFAULT: "#F59E0B" },
        "ef-gray":   { DEFAULT: "#94A3B8" },
        "ef-lgray":  { DEFAULT: "#CBD5E1" },
        "ef-bg":     { DEFAULT: "#050810" },
        "ef-surface":{ DEFAULT: "#0D1424" },
        "ef-card":   { DEFAULT: "#111827" },
        "ef-border": { DEFAULT: "#1E2D40" },
        "red-alert": { DEFAULT: "#EF4444" },
        "green-success": { DEFAULT: "#10B981" },
        "space-bg":  "#0A0E1A",
        "card-dark": "#111827",
        "card-border":"#1E2D40",
      },
      fontFamily: {
        display:        ["Playfair Display", "Georgia", "Times New Roman", "serif"],
        section:        ["Space Mono", "Consolas", "monospace"],
        body:           ["Inter", "system-ui", "sans-serif"],
        mono:           ["Space Mono", "Consolas", "Courier New", "monospace"],
        "mono-custom":  ["Space Mono", "Consolas", "Courier New", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          "0%":   { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { textShadow: "0 0 20px rgba(0,212,255,0.4)" },
          "50%":      { textShadow: "0 0 40px rgba(0,212,255,1), 0 0 80px rgba(0,212,255,0.5)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%":      { transform: "translateX(-4px)" },
          "40%":      { transform: "translateX(4px)" },
          "60%":      { transform: "translateX(-4px)" },
          "80%":      { transform: "translateX(4px)" },
        },
        "spin-in": {
          "0%":   { opacity: "0", transform: "rotate(-180deg) scale(0)" },
          "100%": { opacity: "1", transform: "rotate(0deg) scale(1)" },
        },
        "drop-in": {
          "0%":   { opacity: "0", transform: "translateY(-60px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        "node-fail": {
          "0%":   { opacity: "1" },
          "30%":  { opacity: "0.2" },
          "50%":  { opacity: "0.8" },
          "70%":  { opacity: "0.1" },
          "100%": { opacity: "0.15" },
        },
        "sweep-line": {
          from: { width: "0" },
          to:   { width: "100%" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-right": {
          from: { opacity: "0", transform: "translateX(60px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "ticker": {
          "0%":   { opacity: "0.3" },
          "50%":  { opacity: "1" },
          "100%": { opacity: "0.3" },
        },
      },
      animation: {
        "accordion-down":  "accordion-down 0.2s ease-out",
        "accordion-up":    "accordion-up 0.2s ease-out",
        "fade-up":         "fade-up 0.6s ease-out forwards",
        "scale-in":        "scale-in 0.5s ease-out forwards",
        "slide-in-left":   "slide-in-left 0.5s ease-out forwards",
        "glow-pulse":      "glow-pulse 2s ease-in-out infinite",
        "float":           "float 3s ease-in-out infinite",
        "shake":           "shake 0.5s ease-in-out",
        "spin-in":         "spin-in 0.6s ease-out forwards",
        "drop-in":         "drop-in 0.6s ease-out forwards",
        "blink":           "blink 1s step-end infinite",
        "node-fail":       "node-fail 2s ease-in-out forwards",
        "sweep-line":      "sweep-line 0.3s ease-out forwards",
        "count-up":        "count-up 0.4s ease-out forwards",
        "slide-right":     "slide-right 0.5s ease-out forwards",
        "ticker":          "ticker 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
