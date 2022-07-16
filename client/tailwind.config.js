module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  experimental: {
    darkModeVariant: true,
  },
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        stylish: ['Satisfy', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
