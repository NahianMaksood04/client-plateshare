/** @type {import('tailwindcss').Config} /
export default {
content: ["./index.html", "./src/**/.{js,jsx}"],
theme: {
extend: {
fontFamily: {
display: ["Inter", "ui-sans-serif", "system-ui"],
body: ["Inter", "ui-sans-serif", "system-ui"]
},
colors: {
// Custom palette
aubergine: "#3B1C32",
peach: "#FFAD9B",
mint: "#9FE7D4",
cream: "#FFF0E5",
charcoal: "#1E1E1E"
}
}
},
plugins: [require("daisyui")],
daisyui: {
themes: [
{
plateshare: {
primary: "#FF7C6E",
secondary: "#6EE7B7",
accent: "#F59E0B",
neutral: "#2B2D31",
"base-100": "#0F172A",
"base-200": "#111827",
"base-300": "#0B1220",
info: "#38BDF8",
success: "#22C55E",
warning: "#F59E0B",
error: "#EF4444"
}
}
],
darkTheme: "plateshare"
}
};