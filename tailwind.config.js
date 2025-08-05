/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  safelist: [
    // Border classes
    "border-gray-200",
    "hover:border-orange-300",
    "border-green-500",
    "border-red-500",
    "border-orange-500",

    // Background classes
    "bg-orange-50",
    "bg-green-50",
    "bg-red-50",
    "bg-gray-100",
    "bg-green-500",
    "bg-red-500",
    "bg-orange-500",

    // Text classes
    "text-gray-800",
    "text-gray-500",
    "text-green-900",
    "text-red-900",
    "text-orange-900",
    "text-white",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
