/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C5530',
          dark: '#1E3A20',
          darker: '#163018',
          light: 'rgba(44, 85, 48, 0.1)',
          lighter: 'rgba(44, 85, 48, 0.05)',
        }
      },
      fontFamily: {
        'title': ['American Oak Script', 'cursive'],
        'heading': ['American Oak Serif', 'serif'],
        'body': ['Olympian Roman', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '44': '11rem',   // 176px - mobile couple image height
        '45': '11.25rem', // 180px - mobile couple image height
        '50': '12.5rem',  // 200px - tablet couple image height
        '88': '22rem',
      },
      height: {
        'mobile-couple': '11.25rem', // 180px
        'tablet-couple': '12.5rem',  // 200px
      }
    },
  },
  plugins: [],
}