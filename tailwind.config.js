/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        textPrimary: "var(--primary-text)",
        textSecondary: "var(--secondary-text)",
        theme: {
          bg: {
            black: "#0F1115",
            white: "#F6F7F9",
            surface: "#1A1E25",
            "surface-hover": "#232833",
            elevated: "#262B34",
          },
          text: {
            white: {
              DEFAULT: "#EDF1F6",
              muted: "#8B93A1",
            },
            black: {
              DEFAULT: "#11151C",
              muted: "#5B6472",
            },
          },
          accent: "#306998",
        },
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
      keyframes: {
        "over-bounce": {
          "0%, 80%": {
            transform: "translateY(0%)",
            "animation-timing-function": "ease-in-out",
          },
          "100%": {
            transform: "translateY(100%)",
            "animation-timing-function": "ease-in-out",
          },
        },
        "over-bounce-reverse": {
          "0%, 80%": {
            transform: "translateY(0%)",
            "animation-timing-function": "ease-in-out",
          },
          "100%": {
            transform: "translateY(-100%)",
            "animation-timing-function": "ease-in-out",
          },
        },
      },
      animation: {
        "over-bounce": "over-bounce 1s infinite alternate",
        "over-bounce-reverse": "over-bounce-reverse 1s infinite alternate",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
};
