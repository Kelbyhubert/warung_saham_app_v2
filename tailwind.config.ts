import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "var(--color-primary-50) ",
          "100": "var(--color-primary-100) ",
          "200": "var(--color-primary-200) ",
          "300": "var(--color-primary-300) ",
          "400": "var(--color-primary-400) ",
          "500": "var(--color-primary-500) ",
          "600": "var(--color-primary-600) ",
          "700": "var(--color-primary-700) ",
          "800": "var(--color-primary-800) ",
          "900": "var(--color-primary-900)",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          "50": "var(--color-secondary-50) ",
          "100": "var(--color-secondary-100) ",
          "200": "var(--color-secondary-200) ",
          "300": "var(--color-secondary-300) ",
          "400": "var(--color-secondary-400) ",
          "500": "var(--color-secondary-500) ",
          "600": "var(--color-secondary-600) ",
          "700": "var(--color-secondary-700) ",
          "800": "var(--color-secondary-800) ",
          "900": "var(--color-secondary-900) ",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        font: {
          primary: "var(--color-font-primary) ",
          secondary: "var(--color-font-secondary) ",
          disabled: "var(--color-font-disabled) ",
        },
        success: {
          "50": "var(--color-success-50) ",
          "100": "var(--color-success-100) ",
          "200": "var(--color-success-200) ",
          "300": "var(--color-success-300) ",
          "400": "var(--color-success-400) ",
          "500": "var(--color-success-500) ",
          "600": "var(--color-success-600) ",
          "700": "var(--color-success-700) ",
          "800": "var(--color-success-800) ",
          "900": "var(--color-success-900) ",
        },
        warning: {
          "50": "var(--color-warning-50)",
          "100": "var(--color-warning-100)",
          "200": "var(--color-warning-200)",
          "300": "var(--color-warning-300)",
          "400": "var(--color-warning-400)",
          "500": "var(--color-warning-500)",
          "600": "var(--color-warning-600)",
          "700": "var(--color-warning-700)",
          "800": "var(--color-warning-800)",
          "900": "var(--color-warning-900)",
        },
        error: {
          "50": "var(--color-error-50)",
          "100": "var(--color-error-100)",
          "200": "var(--color-error-200)",
          "300": "var(--color-error-300)",
          "400": "var(--color-error-400)",
          "500": "var(--color-error-500)",
          "600": "var(--color-error-600)",
          "700": "var(--color-error-700)",
          "800": "var(--color-error-800)",
          "900": "var(--color-error-900)",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
  addUtilities: {
    ".scrollbar-thin::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    ".scrollbar-thin::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    ".scrollbar-thin::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
      borderRadius: "4px",
      border: "2px solid transparent",
    },
    ".scrollbar-thin::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },
  },
};
export default config;
