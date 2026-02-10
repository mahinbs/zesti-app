/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0EA5E9",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#0284C7",
          foreground: "#FFFFFF",
        },
        background: {
          DEFAULT: "#E0F2FE", // Light Background Blue
          alt: "#F8FAFC", // Slightly off-white for cards?
        },
        text: {
          DEFAULT: "#0F172A", // Dark Text (Navy)
          muted: "#64748B",   // Text Gray (Slate Gray)
          inverted: "#FFFFFF",
        },
        accent: {
          green: "#22C55E", // Accent Green
        },
        // Direct color references from proposal
        zesti: {
          blue: "#0EA5E9",
          white: "#FFFFFF",
          darkBlue: "#0284C7",
          lightBlue: "#E0F2FE",
          navy: "#0F172A",
          slate: "#64748B",
          green: "#22C55E",
        }
      },
    },
  },
  plugins: [],
}
