import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#0F0A1F",
        "card-bg": "#1A1333",
        primary: "#7C3AED",
        "light-purple": "#A78BFA",
        "accent-glow": "#C4B5FD",
        "highlight-pink": "#F472B6",
        "text-primary": "#F9FAFB",
        "text-secondary": "#A1A1AA",
        success: "#10B981",
        error: "#EF4444",
        warning: "#F59E0B",
        info: "#3B82F6",
      },
      boxShadow: {
        panel: "0 16px 40px rgba(124, 58, 237, 0.15)",
        glow: "0 0 20px rgba(124, 58, 237, 0.3)",
      },
    },
  },
  plugins: [typography],
};
