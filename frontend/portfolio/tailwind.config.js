module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // Include all JS/JSX files in the src folder
    "./public/index.html", // Include your HTML file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: ["bg-yellow-400", "bg-blue-400", "bg-green-400", "bg-purple-400"],
};
